
            // COUPON DOM


const couponInput = document.getElementById("couponInput");

const applyCoupon = document.getElementById("applyCoupon");

const couponMessage = document.getElementById("couponMessage");




            // COUPON STATE


let appliedCoupon = null;

let discountAmount = 0;


            // VALIDATE COUPON


function validateCoupon(code){

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            const coupon = coupons[code.toUpperCase()];

            if(coupon){

                resolve(coupon);

            }

            else{

                reject(new Error("Invalid coupon code."));

            }

        },1000);

    });

}






function calculateDiscount(subtotal){

    if(!appliedCoupon){

        return 0;

    }

    if(appliedCoupon.type==="percentage"){

        return subtotal * appliedCoupon.value / 100;

    }

    return Math.min(appliedCoupon.value, subtotal);

}



            // APPLY COUPON


async function applyCouponCode(){

    const code = couponInput.value.trim();

    if(cart.length===0){

    showToast("Your cart is empty.","warning");

    return;

}

    if(!code){

        showToast("Enter a coupon code.","warning");

        return;

    }

    applyCoupon.disabled = true;

    applyCoupon.textContent = "Checking...";

    try{

        const coupon = await validateCoupon(code);

        appliedCoupon = coupon;

        couponMessage.textContent = "Coupon applied successfully.";

        couponMessage.style.color = "green";

        renderCart();

        showToast("Coupon Applied.");

    }

    catch(error){

        appliedCoupon = null;

        couponMessage.textContent = error.message;

        couponMessage.style.color = "red";

        showToast(error.message,"error");

    }

    finally{

        applyCoupon.disabled = false;

        applyCoupon.textContent = "Apply";

    }

}




            // EVENT


applyCoupon.addEventListener("click",applyCouponCode);