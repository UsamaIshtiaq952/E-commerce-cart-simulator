
                // RENDER ORDERS

function renderOrders(){

    ordersContainer.innerHTML = "";

    if(orders.length===0){

        ordersContainer.innerHTML=`

            <div class="empty-orders">

                <h3>No Orders Yet</h3>

                <p>

                    Your completed orders will appear here.

                </p>

            </div>

        `;

        return;

    }

    orders.forEach(order=>{

        ordersContainer.innerHTML += `

            <div class="order-card">

                <div class="order-top">

                    <h3>${order.orderNumber}</h3>

                    <span>${order.orderDate}</span>

                </div>

                <div class="order-info">

                    <p>

                        <strong>Items:</strong>

                        ${order.items.length}

                    </p>

                    <p>

                        <strong>Total:</strong>

                        $${order.total.toFixed(2)}

                    </p>

                </div>

                <div class="order-actions">

                    <button
                        class="view-order-btn"
                        onclick="viewOrder('${order.orderNumber}')"
                    >

                        View Details

                    </button>

                </div>

            </div>

        `;

    });

}





            // VIEW ORDER DETAILS


function viewOrder(orderNumber){

    const order = orders.find(item=>{

        return item.orderNumber===orderNumber;

    });

    if(!order){

        return;

    }

    orderDetailsContent.innerHTML = "";

    orderDetailsContent.innerHTML += `

        <div class="order-summary-box">

            <p>

                <strong>Order Number :</strong>

                ${order.orderNumber}

            </p>

            <p>

                <strong>Date :</strong>

                ${order.orderDate}

            </p>

            <p>

                <strong>Total :</strong>

                $${order.total.toFixed(2)}

            </p>

        </div>

    `;
    /*==================================================
            ORDER ITEMS
==================================================*/

order.items.forEach(item=>{

    orderDetailsContent.innerHTML += `

        <div class="order-product">

            <div class="order-product-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>

            <div class="order-product-info">

                <h3>

                    ${item.name}

                </h3>

                <p>

                    Price :
                    $${item.price}

                </p>

                <p>

                    Quantity :
                    ${item.quantity}

                </p>

                <p>

                    Subtotal :
                    $${(item.price*item.quantity).toFixed(2)}

                </p>

            </div>

        </div>

    `;

});
orderDetailsModal.classList.add("active");}



        // CLOSE ORDER DETAILS MODAL


closeOrderModal.addEventListener("click",()=>{

    orderDetailsModal.classList.remove("active");

});

window.addEventListener("click",(event)=>{

    if(event.target===orderDetailsModal){

        orderDetailsModal.classList.remove("active");

    }

});

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        orderDetailsModal.classList.remove("active");

    }

});