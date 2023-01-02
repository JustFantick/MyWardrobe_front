import * as flsFunctions from "./modules/functions.js";
import * as header from "./modules/header.js";
import { useDynamicAdapt } from "./modules/dinamicAdaptive.js"

flsFunctions.isWebp();
useDynamicAdapt();

if (window.innerWidth < 1390) {
	header.menuBurgerActivate();
}
header.cartActivate();

/*
import Swiper, { Navigation, Pagination } from 'swiper';
const swiper = new Swiper();
*/