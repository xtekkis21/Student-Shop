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
			//check if it should have a buy/add to cart button
			const canBuy = !stockLower.includes('out');
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
			${canBuy ? `<button class="buy-button" onclick="addToCart(${index})">Add to Cart</button>`:``}
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

//ITEM PAGE

const detailContainer = document.getElementById('product-detail');
//Run if container exists
if(detailContainer){
	//read selected product index from sessionStorage
	const selectedIndex = parseInt(sessionStorage.getItem('selectedProduct'), 10);
	//makes sure the index is valid
	if(!Number.isNaN(selectedIndex)){
		//Read that product from the array
		const[name,color,price,stock,imgSrc,desc] = tshirts[selectedIndex];
		//check if it should have a buy/add to cart button
		const canBuy = !stock.toLowerCase().includes('out');
		//Build the detail card
		detailContainer.innerHTML=`
		<div class="product-detail-card">
			<img src="${imgSrc}" alt="${name} - ${color}">
			<h3>${name} - ${color}</h3>
			<p>${desc}</p>
			<p><strong>${price}</strong></p>
			<p class="stock-status ${stock}"> ${stock.replace(/-/g, ' ')}</p>
			${canBuy ? `<button class="buy-button"
			onclick="addToCart(${selectedIndex})">Add to Cart</button>` : ``}
		</div>`;
	}
	else{
		//If no product was selected
		detailContainer.innerHTML = '<p> No product selected</p>';
	}
}

//CART STORAGE

//read card array from localStorage or return the empty array
function getCart(){
	const raw = localStorage.getItem('cart');
	return raw ? JSON.parse(raw) : [];
}

//save the card array on the localStorage
function saveCart(cart){
	localStorage.setItem('cart', JSON.stringify(cart));
}

//add a product to the cart or increase quantity if it already exists
function addToCart(index){
	const cart = getCart();
	const itemIndex = cart.findIndex(entry => entry.index === index);
	//if it already exists in cart, increase quantity
	if(itemIndex>=0){
		cart[itemIndex].qty +=1;
	}else{
		//add a new line with quantiry of 1
		cart.push({ index: index, qty: 1});
	}
	//update cart
	saveCart(cart);
	//pop up window for user
	const [name,color] = tshirts [index];
	alert(`${name} - ${color} added to cart.`);
}

//CART PAGE

const cartBody = document.getElementById('cart-body');
const cartTotal = document.getElementById('cart-total');
const discountInput = document.getElementById('discount-code');
const applyDiscountBtn = document.getElementById('apply-discount');

//Run only while on cart page
if(cartBody && cartTotal){
	let currentDiscountCode = '';
	//complete row data for a cart item
	function calculateRow(item){
		const [name, color, priceStr, , imgSrc] = tshirts[item.index];
		const unitPrice = parseFloat(priceStr.replace('£', ''));
		let qty = item.qty;
		let discountText = '';
		
		//code BOGO = buy one get one free
		
		if(currentDiscountCode === 'BOGO'){
			const free = Math.floor(qty/2);
			const chargeQty = qty - free;
			if(free > 0){
				discountText = `Buy one get one free (${free} free)`;
			}
			//in case of dicount
			return {name, color, imgSrc, unitPrice, qty, discountText, lineTotal: chargeQty * unitPrice};
		}
		//no discount 
		return{name, color, imgSrc, unitPrice, qty, discountText, lineTotal: qty * unitPrice};
	}
	
	//render the cart table and total
	function renderCart(){
		const cart = getCart();
		cartBody.innerHTML = '';
		let orderTotal = 0;
		//if cart is empty, show the message and the total
		if(cart.length === 0){
			cartBody.innerHTML ='<tr><td colspan="7">Your cart is empty.</td></tr>';
			cartTotal.textContent = 'Order total: £0.00';
			return;
		}
		
		//build a row per cart item
		cart.forEach((item, idx) => {
			const rowData = calculateRow(item);
			const tr = document.createElement('tr');
			//ordertotal will be added at the end
			orderTotal += rowData.lineTotal;
			
			tr.innerHTML =`
			<td>
				<button class="qty-btn minus" data-index="${idx}">-</button>
				<span class="qty-value">${rowData.qty}</span>
				<button class="qty-btn plus" data-index="${idx}">+</button>
			</td>
			<td>
			<a href="item.html" onclick="sessionStorage.setItem('selectedProduct', ${item.index})">
			<img src="${rowData.imgSrc}" alt="${rowData.name} - ${rowData.color}"><br>${rowData.color}</a>
			</td>
			<td>${rowData.name}</td>
			<td>£${rowData.unitPrice.toFixed(2)}</td>
			<td>${rowData.discountText}</td>
			<td>£${rowData.lineTotal.toFixed(2)}</td>
			<td><button data-remove="${idx}">Remove</button></td>
			`;
			cartBody.appendChild(tr);
		});
		
		//update order total text
		cartTotal.textContent = `Order total: £${orderTotal.toFixed(2)}`;
	}
	
	//discount code
	if(applyDiscountBtn){
		applyDiscountBtn.addEventListener('click', () => {
			//store the code in uppercase and re-render
			currentDiscountCode = discountInput.value.trim().toUpperCase();
			renderCart();
		});
	}
	
	//remove item button
	cartBody.addEventListener('click', (e) => {
		const removeBtn = e.target.closest('button[data-remove]');
		if(removeBtn){
			const indexInCart = parseInt(removeBtn.getAttribute('data-remove'), 10);
			const cart = getCart();
			cart.splice(indexInCart, 1);
			saveCart(cart);
			renderCart();
			return;
		}
		
		//qty +/- buttons
		const qtyBtn = e.target.closest('.qty-btn');
		if(!qtyBtn) return;
		
		const index = parseInt(qtyBtn.dataset.index, 10);
		const cart = getCart();
		if(!cart[index]) return;
		
		if(qtyBtn.classList.contains('plus')){
			//increase quantity
			cart[index].qty += 1;
		} else if (qtyBtn.classList.contains('minus')){
			//decrease quantity or remove line if it's 1
			if(cart[index].qty > 1){
				cart[index].qty -= 1;
			} else {
				cart.splice(index,1)
			}
		}
		saveCart(cart);
		renderCart();
	});
	
	//initial render when page loads
	renderCart();
}

//clear card button
const clearCartBtn = document.getElementById('clear-cart');
if(clearCartBtn){
	clearCartBtn.addEventListener('click', () => {
		localStorage.removeItem('cart');
		renderCart();
	});
}
