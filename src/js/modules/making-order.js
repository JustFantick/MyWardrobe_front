export function formValidationActivate() {
	//validation vars
	let formBtn = document.querySelector('.make-order-btn');
	let form = document.querySelector('form');

	//popup vars
	const popup = document.querySelector('.message-popup');
	const popupOpenBtn = document.querySelector('.make-order-btn');
	const body = document.querySelector('body');

	popup.addEventListener('click', (e) => {
		popup.classList.remove('active');
		body.classList.remove('lock');
	});
	formBtn.addEventListener('click', formSend);


	function formSend(event) {
		event.preventDefault();

		let error = formValidate(form);
		if (error === 0) {
			//при успешной проверке полей нужно шото делать 
			popup.classList.add('active');
			body.classList.add('lock');
		}
	}

	function formValidate(form) {
		let error = 0;

		//класс "_req" должен показывать поля обязательные для ввода
		let formReq = document.querySelectorAll('._req');
		for (const elem of formReq) {
			const input = elem;
			formRemoveError(input);

			//валидация Имэйла, должен иметь '_email';
			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.classList.contains('_phone')) {
				if (phoneTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			}
			else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
	function phoneTest(input) {
		return !(input.value.length === input.maxLength);
	}
}