export function getCartWorked() {
	let itemsList = [];//list of cart-items

	const addToCartBtn = document.querySelector('.description__add-to-cart-btn .button');

	addToCartBtn.onclick = () => {
		let title = document.querySelector('.item-description__title').textContent;
		let size = document.querySelector('.sizes__section.selected').textContent;
		let amount = parseInt(document.querySelector('.amount__number').textContent);
		let price = parseInt(document.querySelector('.description__price span').textContent.slice(1));

		let item = {
			"title": title,//text
			"size": size,//text
			"amount": amount,//int
			"price": price,//int
		};

		addCartItem(item);
		itemsList.push(item);

		updateTotalCost();
	};


	function addCartItem(item) {
		const insertItemTmp = cartItemTempl.content.cloneNode(true);
		const itemsContainer = document.querySelector('.mycart-popup__items-list');

		//set atribute 'index' to item`s container
		const insertingBlock = insertItemTmp.querySelector('.mycart-item');
		insertingBlock.setAttribute('index', itemsList.length);

		//deleteBtn onClickListener
		insertItemTmp.querySelector('.mycart-item__close-btn').onclick = () => {
			removeCartItem(insertingBlock);
		}

		//insert title
		insertItemTmp.querySelector('.mycart-item__name').textContent = item.title;
		//insert size
		let listItems = insertItemTmp.querySelectorAll('.sizes-list__item');
		listItems.forEach(li => {
			if (li.textContent == item.size) li.classList.add('selected');
		});
		//insert amount
		insertItemTmp.querySelector('.mycart-amount__number').textContent = item.amount;
		//insert price
		insertItemTmp.querySelector('.mycart-item__price').textContent = '$' + item.price;

		sizesGetWorked(insertItemTmp);
		amountGetWorked(insertItemTmp);

		itemsContainer.append(insertItemTmp);
	}

	function removeCartItem(itemContainer) {
		//delete from ItemsList
		itemsList.splice(itemContainer.getAttribute('index'), 1);
		//delete from html
		itemContainer.remove();

		//overwriting items indexes
		let list = document.querySelectorAll('.mycart-item');
		let counter = 0;
		list.forEach(item => item.setAttribute('index', counter++));
	}

	function sizesGetWorked(itemWrapper) {
		const itemsArrayIndex = itemWrapper.querySelector('.mycart-item').getAttribute('index');
		const sizesList = itemWrapper.querySelector('.sizes-list');

		sizesList.onclick = (event) => {
			if (event.target.closest('.sizes-list__item')) {
				let listItems = sizesList.querySelectorAll('.sizes-list__item');
				listItems.forEach(li => li.classList.remove('selected'));

				event.target.classList.add('selected');

				itemsList[itemsArrayIndex].size = event.target.textContent;
			}
		}
	}
	function amountGetWorked(itemWrapper) {
		const itemsArrayIndex = itemWrapper.querySelector('.mycart-item').getAttribute('index');

		const amountList = itemWrapper.querySelector('.mycart-amount');
		const numberBlock = amountList.querySelector('.mycart-amount__number');

		let amountCounter = parseInt(numberBlock.textContent);

		amountList.onclick = (event) => {
			if (event.target.closest('.mycart-amount__add')) {
				if (amountCounter < 9) amountCounter++;
				numberBlock.textContent = amountCounter;
				itemsList[itemsArrayIndex].amount = amountCounter;

				updateTotalCost();

			} else if (event.target.closest('.mycart-amount__diff')) {
				if (amountCounter > 1) amountCounter--;
				numberBlock.textContent = amountCounter;
				itemsList[itemsArrayIndex].amount = amountCounter;

				updateTotalCost();
			}
		}
	}

	function updateTotalCost() {
		let totalCost = 0;
		itemsList.forEach(item => totalCost += item.price * item.amount);

		document.querySelector('.mycart-popup__sum span').textContent = '$' + totalCost;
	}
}