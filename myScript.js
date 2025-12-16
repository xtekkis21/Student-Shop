//HAMBURGER MENU
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
//toggle visibility when clicked
if (hamburger && mobileMenu){
	hamburger.addEventListener('click', () => {
	mobileMenu.classList.toggle('show');
});
}
