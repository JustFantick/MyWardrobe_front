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
		});
	}
}