export function menuBurgerActivate() {
	const menuIcon = document.querySelector('.menu-burger');
	const navigation = document.querySelector('.navigation');

	menuIcon.onclick = function () {
		menuIcon.classList.toggle('active');
		navigation.classList.toggle('active');
	}

	navigation.onclick = function () {
		menuIcon.classList.remove('active');
		navigation.classList.remove('active');
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

export function cartActivate() {
	const myCartBtn = document.querySelector('.mycart');
	const myCartBtnMb = document.querySelector('.mycart_mb');
	const myCartBody = document.querySelector('.mycart-popup');

	if (window.innerWidth > 420) {
		myCartBtn.onclick = function () {
			myCartBody.classList.add('active');

			myCartBody.onclick = function (e) {
				let target = e.target;

				if (target.closest('.mycart-popup__goback') || target == myCartBody) {
					myCartBody.classList.remove('active');
				}
			}
		}
	} else {
		myCartBtnMb.onclick = function () {
			myCartBody.classList.add('active');

			myCartBody.onclick = function (e) {
				let target = e.target;

				if (target.closest('.mycart-popup__goback') || target == myCartBody) {
					myCartBody.classList.remove('active');
				}
			}
		}
	}


}