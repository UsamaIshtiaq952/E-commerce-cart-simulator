
                // CART STATE


let cart = [];




            // FIND CART ITEM


function getCartItem(productId){

    return cart.find(item => item.id === productId);

}




            // ADD TO CART


function addToCart(productId){

    const product = allProducts.find(item => item.id === productId);

    if(!product){

        showToast("Product not found.","error");

        return;

    }

    const cartItem = getCartItem(productId);

    if(cartItem){

        if(cartItem.quantity >= product.stock){

            showToast("Stock limit reached.","warning");

            return;

        }

        cartItem.quantity++;

    }

    else{

        cart.push({

            id:product.id,

            name:product.name,

            price:product.price,

            image:product.image,

            stock:product.stock,

            quantity:1

        });

    }

    product.stock--;
    saveProducts();
    renderProducts(allProducts);
    updateCartCount();

renderCart();

saveCart();




showToast("Item added.","success");

}




        // TOTAL CART ITEMS


function getTotalItems(){

    return cart.reduce((total,item)=>{

        return total + item.quantity;

    },0);

}




        // UPDATE CART COUNT


function updateCartCount(){

    const totalItems = getTotalItems();

    cartCount.textContent = totalItems;

}




        // ADD BUTTON EVENTS


function initializeCartButtons(){

    const buttons = document.querySelectorAll(".add-cart");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            const productId = Number(button.dataset.id);

            addToCart(productId);

        });

    });

}




            // CART DOM ELEMENTS


const cartSidebar = document.getElementById("cartSidebar");

const cartItemsContainer = document.getElementById("cartItems");

const closeCart = document.getElementById("closeCart");

const cartButton = document.querySelector(".cart-btn");

const subtotal = document.getElementById("subtotal");

const discount = document.getElementById("discount");

const grandTotal = document.getElementById("grandTotal");




                // OPEN CART


cartButton.addEventListener("click",()=>{

    cartSidebar.classList.add("active");

});




                // CLOSE CART


closeCart.addEventListener("click",()=>{

    cartSidebar.classList.remove("active");

});




            // CALCULATE SUBTOTAL


function getCartSubtotal(){

    return cart.reduce((total,item)=>{

        return total + (item.price * item.quantity);

    },0);

}



            // UPDATE SUMMARY


function updateSummary(){

    const total = getCartSubtotal();

    discountAmount = calculateDiscount(total);

const finalTotal = total - discountAmount;

    subtotal.textContent = `$${total.toFixed(2)}`;

   discount.textContent=`-$${discountAmount.toFixed(2)}`;

grandTotal.textContent=`$${finalTotal.toFixed(2)}`;

}




            // RENDER CART


function renderCart(){

    if(cart.length===0){

        cartItemsContainer.innerHTML=`

            <div class="empty-cart">

                <img src="images/empty-cart.png" alt="Empty Cart">

                <h3>Your Cart is Empty</h3>

                <p>

                    Looks like you haven't added
                    any products yet.

                </p>

            </div>

        `;

        updateSummary();

        return;

    }

    cartItemsContainer.innerHTML="";

    cart.forEach(item=>{

        cartItemsContainer.innerHTML+=`

            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">

                    <h4>${item.name}</h4>

                    <p class="cart-price">

                        $${item.price}

                    </p>

                    <div class="quantity-controls">

                        <button
                             class="decrease-btn"
                              data-id="${item.id}"
                                   >
                                -
                      </button>

                        <span class="quantity">

                            ${item.quantity}

                        </span>

                        <button
                          class="increase-btn"
                        data-id="${item.id}"
                          >
                            +
                       </button>

                    </div>

                    <button
                         class="remove-btn"
                         data-id="${item.id}"
                          >
                        Remove
                     </button>

                </div>

            </div>

        `;

    });

    updateSummary();
    initializeCartEvents();

}




            // INCREASE QUANTITY


function increaseQuantity(productId){

    const item = getCartItem(productId);

    if(!item) return;

    if(item.quantity >= item.stock){

        showToast("Stock limit reached.","warning");

        return;

    }
const product = allProducts.find(product => product.id === productId);

product.stock--;
 saveProducts();
    item.quantity++;

    updateCartCount();
renderProducts(allProducts);
    renderCart();
    saveCart();

}




            // DECREASE QUANTITY


function decreaseQuantity(productId){

    const item = getCartItem(productId);

    if(!item) return;


    const product = allProducts.find(product => product.id === productId);

product.stock++;

saveProducts();

    item.quantity--;

    if(item.quantity<=0){

        removeCartItem(productId);

        return;

    }

    updateCartCount();
  renderProducts(allProducts);
    renderCart();

    saveCart();

}




            // REMOVE ITEM

                // APPLICATION STATE


// let allProducts = [];




                // INITIALIZE APP


async function initializeApp(){

    try{

        const data = await loadProducts();

        allProducts = data;

        renderProducts(allProducts);

        hideLoader();

    }

    catch(error){

        hideLoader();

        showToast(error.message,"error");

    }

}




                // START APPLICATION


document.addEventListener("DOMContentLoaded",()=>{

    initializeApp();

});


            // SEARCH & FILTER


function filterProducts(){

    let filteredProducts = [...allProducts];



    /*-----------------------------
            SEARCH
    -----------------------------*/

    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    if(searchValue){

        filteredProducts = filteredProducts.filter(product=>{

            return product.name
                .toLowerCase()
                .includes(searchValue);

        });

    }



    /*-----------------------------
            CATEGORY
    -----------------------------*/

    const category = categoryFilter.value;

    if(category !== "all"){

        filteredProducts = filteredProducts.filter(product=>{

            return product.category === category;

        });

    }



    /*-----------------------------
            SORT
    -----------------------------*/

    switch(sortProducts.value){

        case "low-high":

            filteredProducts.sort((a,b)=>a.price-b.price);

            break;

        case "high-low":

            filteredProducts.sort((a,b)=>b.price-a.price);

            break;

        case "name":

            filteredProducts.sort((a,b)=>{

                return a.name.localeCompare(b.name);

            });

            break;

    }



    renderProducts(filteredProducts);

}



            // EVENTS


searchInput.addEventListener("input",filterProducts);

categoryFilter.addEventListener("change",filterProducts);

sortProducts.addEventListener("change",filterProducts);

function removeCartItem(productId){
    const removedItem = getCartItem(productId);

const product = allProducts.find(product => product.id === productId);

product.stock += removedItem.quantity;


    cart = cart.filter(item=>item.id!==productId);

    
    saveProducts();
    updateCartCount();

    renderCart();

    showToast("Item removed.","success");


    saveCart();

}



/*==================================================
            CART EVENTS
==================================================*/

function initializeCartEvents(){

    document.querySelectorAll(".increase-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            increaseQuantity(Number(button.dataset.id));

        });

    });

    document.querySelectorAll(".decrease-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            decreaseQuantity(Number(button.dataset.id));

        });

    });

    document.querySelectorAll(".remove-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            removeCartItem(Number(button.dataset.id));

        });

    });

}



/*==================================================
            SAVE CART
==================================================*/

function saveCart(){

    localStorage.setItem("cart",JSON.stringify(cart));

}



/*==================================================
            LOAD CART
==================================================*/

function loadCart(){

    const savedCart = localStorage.getItem("cart");

    if(savedCart){

        cart = JSON.parse(savedCart);

    }

}