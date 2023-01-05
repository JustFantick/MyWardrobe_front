export function footerBtnActivate() {
	const scrollTotopBtn = document.querySelector('.scroll-top-btn');

	scrollTotopBtn.onclick = () => {
		console.log('click');
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};
}