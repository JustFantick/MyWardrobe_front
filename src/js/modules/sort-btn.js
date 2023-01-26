export function sortBtnActivate() {
	const selectSingle = document.querySelector('.sort-btn');
	const selectSingle_title = selectSingle.querySelector('.sort-btn__title');
	const selectSingle_title_p = selectSingle.querySelector('.sort-btn__title p');
	const selectSingle_labels = selectSingle.querySelectorAll('.sort-btn__label');

	// Toggle menu
	selectSingle_title.addEventListener('click', () => {
		if ('active' === selectSingle.getAttribute('data-state')) {
			selectSingle.setAttribute('data-state', '');
		} else {
			selectSingle.setAttribute('data-state', 'active');
		}
	});

	// Close when click to option
	for (let i = 0; i < selectSingle_labels.length; i++) {
		selectSingle_labels[i].addEventListener('click', (evt) => {
			selectSingle_title_p.textContent = evt.target.textContent;
			selectSingle.setAttribute('data-state', '');

			if (evt.target.textContent == 'Rising price') {
				sortPriceRising();
			} else if (evt.target.textContent == 'Falling price') {
				sortPriceFalling();
			} else if (evt.target.textContent == 'Alphabet') {
				sortAlphabet();
			}
		});
	}

	sortAlphabet();//default sorting



	function sortPriceRising() {
		let itemsCntr = document.querySelector('.items-container__container');

		for (let i = 0; i < itemsCntr.children.length; i++) {
			for (let j = i; j < itemsCntr.children.length; j++) {
				let priceText_i = itemsCntr.children[i].querySelector('.item-cart__price').textContent;
				let price_i = priceText_i.slice(1, priceText_i.length - 3);

				let priceText_j = itemsCntr.children[j].querySelector('.item-cart__price').textContent;
				let price_j = priceText_j.slice(1, priceText_j.length - 3);

				if (+price_i > +price_j) {
					let replaceNode = itemsCntr.replaceChild(itemsCntr.children[j], itemsCntr.children[i]);
					insertAfter(replaceNode, itemsCntr.children[i]);
				}
			}
		}
	}

	function sortPriceFalling() {
		let itemsCntr = document.querySelector('.items-container__container');

		for (let i = 0; i < itemsCntr.children.length; i++) {
			for (let j = i; j < itemsCntr.children.length; j++) {
				let priceText_i = itemsCntr.children[i].querySelector('.item-cart__price').textContent;
				let price_i = priceText_i.slice(1, priceText_i.length - 3);

				let priceText_j = itemsCntr.children[j].querySelector('.item-cart__price').textContent;
				let price_j = priceText_j.slice(1, priceText_j.length - 3);

				if (+price_i < +price_j) {
					let replaceNode = itemsCntr.replaceChild(itemsCntr.children[j], itemsCntr.children[i]);
					insertAfter(replaceNode, itemsCntr.children[i]);
				}
			}
		}
	}

	function sortAlphabet() {
		let itemsCntr = document.querySelector('.items-container__container');

		for (let i = 0; i < itemsCntr.children.length; i++) {
			for (let j = i; j < itemsCntr.children.length; j++) {
				let title_i = itemsCntr.children[i].querySelector('.item-cart__name').textContent;

				let title_j = itemsCntr.children[j].querySelector('.item-cart__name').textContent;

				if (title_i > title_j) {
					let replaceNode = itemsCntr.replaceChild(itemsCntr.children[j], itemsCntr.children[i]);
					insertAfter(replaceNode, itemsCntr.children[i]);
				}
			}
		}
	}

	function insertAfter(newNode, refNode) {
		refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
	}
}