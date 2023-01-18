export function menuBurgerActivate() {
	if (window.innerWidth < 1390) {
		const menuIcon = document.querySelector('.menu-burger');
		const navigation = document.querySelector('.navigation');
		const body = document.querySelector('body');

		menuIcon.onclick = function () {
			menuIcon.classList.toggle('active');
			navigation.classList.toggle('active');
			body.classList.toggle('lock');
		}

		navigation.onclick = function () {
			menuIcon.classList.remove('active');
			navigation.classList.remove('active');
			body.classList.remove('lock');
		}

		const item = document.querySelector('.header__body');
		const search = document.querySelector('.search_mb');
		const closeBtn = document.querySelector('.searchbar__close-icon');
		search.onclick = function () {
			item.classList.add('active');
		}

		closeBtn.onclick = function () {
			item.classList.remove('active');
		}
	}
}

export function cartActivate() {
	const myCartBtn = document.querySelector('.mycart');
	const myCartBtnMb = document.querySelector('.mycart_mb');
	const myCartBody = document.querySelector('.mycart-popup');
	const body = document.querySelector('body');

	//openPopup
	myCartBtn.onclick = () => {
		myCartBody.classList.add('active');
		body.classList.add('lock');
	};
	myCartBtnMb.onclick = () => {
		myCartBody.classList.add('active');
		body.classList.add('lock');
	};

	//closePopup
	myCartBody.onclick = function (e) {
		let target = e.target;

		if (target.closest('.mycart-popup__goback') || target == myCartBody) {
			myCartBody.classList.remove('active');
			body.classList.remove('lock');
		}
	}

	sizesGetWorked();
	amountGetWorked();
}

function sizesGetWorked() {
	const sizesList = document.querySelectorAll('.sizes-list');
	sizesList.forEach(sizesLi => {
		sizesLi.addEventListener('click', (event) => {
			if (event.target.closest('.sizes-list__item')) {
				let listItems = sizesLi.querySelectorAll('.sizes-list__item');
				listItems.forEach(li => {
					li.classList.remove('selected');
				});
				event.target.classList.add('selected');
			}
		});
	});
}

function amountGetWorked() {
	const amountList = document.querySelectorAll('.mycart-amount');
	amountList.forEach(amountLi => {
		amountLi.addEventListener('click', (event) => {
			const amountBlock = amountLi.querySelector('.mycart-amount__number');
			let amountNumber = parseInt(amountBlock.textContent);

			if (event.target.closest('.mycart-amount__add')) {
				if (amountNumber < 9) amountNumber++;
				amountBlock.textContent = amountNumber;
			} else if (event.target.closest('.mycart-amount__diff')) {
				if (amountNumber > 1) amountNumber--;
				amountBlock.textContent = amountNumber;
			}
		});
	});
}
