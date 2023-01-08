export function footerBtnActivate() {
	const scrollTotopBtn = document.querySelector('.scroll-top-btn');

	scrollTotopBtn.onclick = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};
}