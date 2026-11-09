// Content stays readable unless the reveal observer is ready. Store facts such
// as ratings are rendered immediately and never animated through other values.
const root = document.documentElement;
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!preference.matches && 'IntersectionObserver' in window) {
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-in');
				io.unobserve(entry.target);
			}
		},
		{ threshold: 0, rootMargin: '0px 0px -24px 0px' },
	);
	root.classList.add('motion');
	document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

	// Keyboard focus may reach a section before its scroll reveal fires.
	document.addEventListener('focusin', (event) => {
		if (!(event.target instanceof Element)) return;
		let el: Element | null = event.target;
		while (el) {
			if (el.matches('[data-reveal]')) {
				el.classList.add('is-in');
				io.unobserve(el);
			}
			el = el.parentElement;
		}
	});

	// Cancel existing hidden states when the preference changes. Do not replay
	// the page if motion is subsequently enabled again.
	preference.addEventListener('change', (event) => {
		if (!event.matches) return;
		io.disconnect();
		root.classList.remove('motion', 'js');
		document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
	});
}
