// Scroll reveals and number count-up.
// The inline script in Layout.astro adds `js` to <html> only when the visitor
// has not asked for reduced motion. Without it, nothing here runs and every
// element stays visible.
const root = document.documentElement;

function countUp(el: HTMLElement) {
	const target = parseFloat(el.dataset.count ?? "0");
	const decimals = Number(el.dataset.decimals ?? 0);
	const format = (v: number) => v.toFixed(decimals).replace(".", ",");
	const duration = 1200;
	const start = performance.now();

	function step(now: number) {
		const p = Math.min(1, (now - start) / duration);
		const eased = 1 - Math.pow(1 - p, 3);
		el.textContent = format(target * eased);
		if (p < 1) requestAnimationFrame(step);
	}
	requestAnimationFrame(step);
}

if (root.classList.contains("js") && "IntersectionObserver" in window) {
	// Hiding starts only now, so a failed script never leaves content invisible
	root.classList.add("motion");

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const el = entry.target as HTMLElement;
				el.classList.add("is-in");
				if (el.dataset.count) countUp(el);
				io.unobserve(el);
			}
		},
		{ threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
	);

	document.querySelectorAll("[data-reveal], [data-count]").forEach((el) => io.observe(el));
}
