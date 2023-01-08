import * as flsFunctions from "./modules/functions.js";
import * as header from "./modules/header.js";
import { useDynamicAdapt } from "./modules/dinamicAdaptive.js"
import { footerBtnActivate } from "./modules/footer.js";
import { sortBtnActivate } from "./modules/sort-btn.js";

flsFunctions.isWebp();
header.menuBurgerActivate();
header.cartActivate();

useDynamicAdapt();
footerBtnActivate();
//sortBtnActivate();

// const swiper = new Swiper('.main-slider', {
// 	allowTouchMove: false,
// 	autoplay: {
// 		delay: 5000,
// 	},
// 	pagination: {
// 		el: ".swiper-pagination",
// 		clickable: true,
// 	},
// });