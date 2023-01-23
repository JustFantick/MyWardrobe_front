export function getCartWorked() {
	let itemsList = [];

	//check existence in localStorage
	if (localStorage.getItem('itemsList')) {
		let raw = JSON.parse(localStorage.getItem('itemsList'));

		let n = 0;
		raw.forEach(item => {
			itemsList[n] = item;
			n++;
		});
		console.log(itemsList);
	} else console.log('There`s no items in LocalStorage');

	//insert items to cart
	itemsList.forEach(listItem => addCartItem(listItem, itemsList.indexOf(listItem)));
	updateTotalCost();

	//on making-order page insert items to 'order-list'
	if (document.querySelector('.making-order')) {
		let sum = 0;
		itemsList.forEach(listItem => {
			const insertItemTmp = orderItemTempl.content.cloneNode(true);
			const itemsContainer = document.querySelector('.order-summary__items-container');

			//insert title
			insertItemTmp.querySelector('.order-summary-item__title').textContent = listItem.title;

			if (listItem.size) {
				//insert size
				insertItemTmp.querySelector('.order-summary-item__size span').textContent = listItem.size;
			} else {
				insertItemTmp.querySelector('.order-summary-item__size').remove();
			}

			//insert amount
			insertItemTmp.querySelector('.order-summary-item__amount span').textContent = listItem.amount;

			//insert price
			insertItemTmp.querySelector('.order-summary-item__price').textContent = '$' + listItem.price;

			sum += listItem.price * listItem.amount;

			itemsContainer.append(insertItemTmp);
		});

		document.querySelector('.order-summary__total-cost span').textContent = '$' + sum;
	}

	//on item-description page activate 'adding cart'
	if (document.querySelector('.description__add-to-cart-btn .button')) {
		addCartListener();
	}

	//upload 'itemsList' to LocalStorage onWindowClose
	window.onbeforeunload = () => localStorage.setItem('itemsList', JSON.stringify(itemsList));

	function addCartListener() {
		const addToCartBtn = document.querySelector('.description__add-to-cart-btn .button');

		addToCartBtn.onclick = () => {
			let item = new Object();

			item.title = document.querySelector('.item-description__title').textContent;
			item.amount = parseInt(document.querySelector('.amount__number').textContent);
			item.price = parseInt(document.querySelector('.description__price span').textContent.slice(1));

			if (document.querySelector('.sizes')) {
				item.size = document.querySelector('.sizes__section.selected').textContent;
			}

			if (!itemsList.find(e => e.title === item.title)) {
				addCartItem(item, itemsList.length);
				itemsList.push(item);
				updateTotalCost();
			} else {
				const popup = document.querySelector('.message-popup');
				const body = document.querySelector('body');

				popup.classList.add('active');
				body.classList.add('lock');

				popup.addEventListener('click', (e) => {
					popup.classList.remove('active');
					body.classList.remove('lock');
				});
			}

			console.log(item);
		};
	}

	function addCartItem(item, index) {
		const insertItemTmp = cartItemTempl.content.cloneNode(true);
		const itemsContainer = document.querySelector('.mycart-popup__items-list');

		//set atribute 'index' to item`s container
		const insertingBlock = insertItemTmp.querySelector('.mycart-item');
		insertingBlock.setAttribute('index', index);

		//deleteBtn onClickListener
		insertItemTmp.querySelector('.mycart-item__close-btn').onclick = () => {
			removeCartItem(insertingBlock);
		}

		//insert title
		insertItemTmp.querySelector('.mycart-item__name').textContent = item.title;


		if (item.size) {
			//insert size
			let listItems = insertItemTmp.querySelectorAll('.sizes-list__item');
			listItems.forEach(li => {
				if (li.textContent == item.size) li.classList.add('selected');
			});

			sizesGetWorked(insertItemTmp);
		} else {
			insertItemTmp.querySelector('.mycart-item__size').remove();
		}

		//insert amount
		insertItemTmp.querySelector('.mycart-amount__number').textContent = item.amount;
		//insert price
		insertItemTmp.querySelector('.mycart-item__price').textContent = '$' + item.price;

		amountGetWorked(insertItemTmp);

		itemsContainer.append(insertItemTmp);
	}

	function removeCartItem(itemContainer) {
		//delete from ItemsList
		itemsList.splice(itemContainer.getAttribute('index'), 1);
		console.log(itemsList);
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