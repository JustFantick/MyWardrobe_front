export function sizesActivate() {
	const sizesContainer = document.querySelector('.sizes');
	const sizesOptions = document.querySelectorAll('.sizes__section');
	sizesContainer.addEventListener('click', (e) => {
		let target = e.target;

		sizesOptions.forEach(option => {
			option.classList.remove('selected');
		});

		target.classList.add('selected');
	})
}

export function amountActivate() {
	let counter = 1;
	const minusBlock = document.querySelector('.amount__minus');
	const plusBlock = document.querySelector('.amount__plus');

	minusBlock.onclick = () => {
		if (counter > 1) counter--;
		updateNumber(counter);
	};
	plusBlock.onclick = () => {
		if (counter < 9) counter++;
		updateNumber(counter);
	}

	function updateNumber(n) {
		document.querySelector('.amount__number').textContent = n;
	}
}