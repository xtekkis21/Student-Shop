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

//PRODUCT PAGE

const products= document.getElementById('products'); //Get the product with id "products"
const stockFilter= document.getElementById('stock-filter'); //Get the stock filter with id "stock"
if(products){ //only running if we are on the products page
	function showProducts(filter){ //render all products filtered by stock status
		products.innerHTML=''; //clear existing cards
		//loop through each tshirt in the array
		tshirts.forEach(([name, color, price, stock, imgSrc, desc], index)=>{
			const stockLower = stock.toLowerCase();
			let show = true;
			//filter through in stock
			if(filter === 'in'){
				show = !stockLower.includes('out');
			//filter through out of stock
			} else if (filter === 'out'){
				show = stockLower.includes('out')
			}
			if(!show)return; 
			
			//create the product card
			const card=document.createElement('div');
			card.className='product-itself';
			
			//build the html inside of js
			card.innerHTML=`
			<img src="${imgSrc}" alt="${name} - ${color}">
			<h3>${name} - ${color}</h3>
			<p>${desc}
			<a href="item.html" class= "read-more"
			onclick="sessionStorage.setItem('selectedProduct', ${index})">View more</a>
			</p>
			<p><strong>${price}</strong></p>
			<p class="stock-status ${stock}">${stock.replace(/-/g, ' ')}</p>
			<button class="buy-button" onclick="addToCart(${index})">Add to Cart</button>
			`;
			
			//Add this card into the products
			products.appendChild(card)
			});
	}
	//load the products
	showProducts('all');
	//refilter products when selection changes
	if(stockFilter){
		stockFilter.addEventListener('change', (e) => {
		showProducts(e.target.value);
		});
	}
}

//back to top button
const backToTop = document.querySelector('.back-to-top');
//show and hide the button
if(backToTop){
	window.addEventListener('scroll', ()=> {
		if (window.scrollY > 300){
			backToTop.style.display = 'block';
		} else {
			backToTop.style.display = 'none';
		}
	});
}
