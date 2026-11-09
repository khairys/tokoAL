// Scroll motion that follows the visitor both ways: content eases in as it enters
// from the bottom of the screen and drifts out as it leaves at the top, and plays
// again when scrolled back. Driven from scroll position (not a one-off trigger), so
// it works the same in every browser, including Safari on iPhone.
//
// Writes only CSS variables; site.css turns them into opacity / translate / clip-path,
// which the browser animates cheaply. Skipped entirely for reduced motion, and the
// page reads normally if this script never runs (nothing is hidden until it does).
const root = document.documentElement;
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');

type Item = { el: HTMLElement; kind: string; offset: number };

if (!preference.matches) {
	const items: Item[] = [];
	document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
		const kind = el.dataset.reveal ?? 'up';
		if (kind === 'stagger') {
			// Children of one row would enter together: offset each a little for a cascade
			[...el.children].forEach((child, i) =>
				items.push({ el: child as HTMLElement, kind: 'up', offset: (i % 4) * 36 }),
			);
		} else items.push({ el, kind, offset: 0 });
	});
	const parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
	const clamp = (n: number) => Math.min(1, Math.max(0, n));
	let frame = 0;

	// About 50 elements: measuring them all per frame is cheap, and needs no observer
	function update() {
		if (frame) cancelAnimationFrame(frame);
		frame = 0;
		const vh = window.innerHeight;
		for (const it of items) {
			const r = it.el.getBoundingClientRect();
			if (r.bottom < -vh || r.top > vh * 2) continue; // far off screen: leave as is
			// In: element top travels through the bottom 22% of the screen
			const enter = clamp((vh - r.top - it.offset) / (vh * 0.22));
			// Out: element bottom travels through the top 16% of the screen
			const leave = clamp(r.bottom / (vh * 0.16));
			const v = Math.min(enter, leave);
			const y = enter < 1 ? (1 - enter) * 36 : -(1 - leave) * 20;
			it.el.style.setProperty('--rv', v.toFixed(3));
			it.el.style.setProperty('--ry', `${y.toFixed(1)}px`);
			if (it.kind === 'wipe') it.el.style.setProperty('--rw', enter.toFixed(3));
		}
		for (const el of parallax) {
			const r = el.getBoundingClientRect();
			if (r.bottom < -vh || r.top > vh * 2) continue;
			const speed = Number(el.dataset.parallax) || 0.08;
			const d = r.top + r.height / 2 - vh / 2;
			el.style.setProperty('--py', `${(-d * speed).toFixed(1)}px`);
		}
	}
	function schedule() {
		if (!frame) frame = requestAnimationFrame(update);
	}

	// Measure first, then switch hiding on, so nothing on screen flashes
	update();
	root.classList.add('motion');
	window.addEventListener('scroll', schedule, { passive: true });
	window.addEventListener('scrollend', update, { passive: true });
	window.addEventListener('resize', schedule, { passive: true });
	window.addEventListener('load', update);

	// Keyboard focus must never land on faded content
	document.addEventListener('focusin', (event) => {
		const target = event.target as Element;
		for (const it of items) {
			if (it.el.contains(target)) {
				it.el.style.setProperty('--rv', '1');
				it.el.style.setProperty('--ry', '0px');
			}
		}
	});

	// Switching reduced motion on while the page is open: show everything at rest
	preference.addEventListener('change', (event) => {
		if (!event.matches) return;
		window.removeEventListener('scroll', schedule);
		window.removeEventListener('scrollend', update);
		root.classList.remove('motion', 'js');
	});
}
