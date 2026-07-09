
                // DOM ELEMENTS


const processingModal = document.getElementById("processingModal");

const successModal = document.getElementById("successModal");

const checkoutBtn = document.getElementById("checkoutBtn");

const continueShopping = document.getElementById("continueShopping");

const orderNumber = document.getElementById("orderNumber");

const paidAmount = document.getElementById("paidAmount");


            // PROCESS PAYMENT


function processPayment(){

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            const paymentSuccess = Math.random() > PAYMENT_FAILURE_RATE;

            if(paymentSuccess){

                resolve();

            }

            else{

                reject(new Error("Payment failed. Please try again."));

            }

        },2000);

    });

}



            // ORDER NUMBER


function generateOrderNumber(){

    return "#" + Math.floor(100000 + Math.random() * 900000);

}


/*==================================================
                CHECKOUT
==================================================*/

async function checkout(){

    if(cart.length===0){

        showToast("Your cart is empty.","warning");

        return;

    }

    checkoutBtn.disabled = true;

    processingModal.classList.add("active");

    try{

        await processPayment();

        processingModal.classList.remove("active");

        const total = getCartSubtotal() - discountAmount;

          const order = {

    orderNumber: generateOrderNumber(),

    orderDate: new Date().toLocaleString(),

    items: [...cart],

    subtotal: getCartSubtotal(),

    discount: discountAmount,

    total: total

};


        orderNumber.textContent = order.orderNumber;

paidAmount.textContent = order.total.toFixed(2);


orders.push(order);

saveOrders();
renderOrders();

        successModal.classList.add("active");

        

        cart = [];

saveCart();

appliedCoupon = null;

discountAmount = 0;

couponInput.value = "";

couponMessage.textContent = "";

renderCart();

updateCartCount();

showToast("Order placed successfully.");

    }

    catch(error){

        processingModal.classList.remove("active");

        showToast(error.message,"error");

    }

    finally{

        checkoutBtn.disabled = false;

    }

}



        // CONTINUE SHOPPING


continueShopping.addEventListener("click",()=>{

    successModal.classList.remove("active");

});


                // EVENTS


checkoutBtn.addEventListener("click",checkout);