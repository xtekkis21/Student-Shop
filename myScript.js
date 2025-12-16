//HAMBURGER MENU
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
//toggle visibility when clicked
if (hamburger && mobileMenu){
	hamburger.addEventListener('click', () => {
	mobileMenu.classList.toggle('show');
});
}

//list of tshirts
const tshirts = [
['Legacy T-Shirt','Red','£7.99','good-stock','resources_2025/resources/images/tshirts/tshirt1.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
['Legacy T-Shirt','Green','£7.99','last-few','resources_2025/resources/images/tshirts/tshirt2.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
['Legacy T-Shirt','Blue','£7.99','out-of-stock','resources_2025/resources/images/tshirts/tshirt3.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
['Legacy T-Shirt','Cyan','£7.99','good-stock','resources_2025/resources/images/tshirts/tshirt4.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
['Legacy T-Shirt','Magenta','£7.99','out-of-stock','resources_2025/resources/images/tshirts/tshirt5.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
['Legacy T-Shirt','Yellow','£7.99','last-few','resources_2025/resources/images/tshirts/tshirt6.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
['Legacy T-Shirt','Black','£7.99','out-of-stock','resources_2025/resources/images/tshirts/tshirt7.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
['Legacy T-Shirt','Grey','£7.99','good-stock','resources_2025/resources/images/tshirts/tshirt8.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
['Legacy T-Shirt','Burgundy','£7.99','last-few','resources_2025/resources/images/tshirts/tshirt9.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
];
