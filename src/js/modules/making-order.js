export function formValidationActivate() {
	console.log();
}

export function popupOrdeSucceedActivate() {
	const popup = document.querySelector('.popup-order-succeed');
	const popupOpenBtn = document.querySelector('.make-order-btn');
	const body = document.querySelector('body');

	popupOpenBtn.addEventListener('click', () => {
		popup.classList.add('active');
		body.classList.add('lock');
	});

	popup.addEventListener('click', (e) => {
		popup.classList.remove('active');
		body.classList.remove('lock');
	})
}