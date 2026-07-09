
                // DOM ELEMENTS


const loader = document.getElementById("loader");

const productContainer = document.getElementById("productContainer");

const cartCount = document.getElementById("cartCount");

const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toastMessage");


const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");

const sortProducts = document.getElementById("sortProducts");
const modalTitle = document.getElementById("modalTitle");

const saveProductBtn = document.getElementById("saveProductBtn");



                // LOADER


function hideLoader(){

    loader.classList.add("hide");

}




                // TOAST


function showToast(message,type="success"){

    toastMessage.textContent = message;

    toast.className = "";

    toast.classList.add(type);

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}



/*==================================================
            PRODUCT TEMPLATE
==================================================*/

function createProductCard(product){

    return `

        <div class="product-card">

            <div class="product-image">

                <img src="${product.image}" alt="${product.name}">

            </div>

            <div class="product-content">

                <span class="product-category">

                    ${product.category}

                </span>

                <h3 class="product-title">

                    ${product.name}

                </h3>

                <p class="product-description">

                    ${product.description}

                </p>

                <div class="product-footer">

                    <h2 class="product-price">

                        $${product.price}

                    </h2>

                   <span class="stock ${product.stock>0 ? "in-stock":"out-stock"}">

    ${
        product.stock>0
        ? `In Stock (${product.stock} Left)`
        : "Out of Stock"
    }

</span>
                </div>

                <button
                    class="add-cart"
                    data-id="${product.id}"
                    ${product.stock===0 ? "disabled":""}
                >

                    Add To Cart

                </button>


                

            </div>

            <div class="product-actions">

    <button
        class="edit-product"
        data-id="${product.id}"
    >
        ✏ Edit
    </button>

    <button
        class="delete-product"
        data-id="${product.id}"
    >
        🗑 Delete
    </button>

</div>

        </div>

    `;

}



/*==================================================
            RENDER PRODUCTS
==================================================*/

function renderProducts(products){

    productContainer.innerHTML = "";

    products.forEach(product=>{

        productContainer.innerHTML += createProductCard(product);

    });

    initializeCartButtons();
   initializeProductActions();
}



function deleteProduct(productId){

    const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if(!confirmDelete) return;

    allProducts = allProducts.filter(product=>{

        return product.id !== productId;

    });

    cart = cart.filter(item=>{

        return item.id !== productId;

    });

    saveProducts();

    saveCart();

    updateCartCount();

    renderProducts(allProducts);

    renderCart();

    showToast("Product deleted successfully.","success");

}

function editProduct(productId){

    const product = allProducts.find(product=>{

        return product.id === productId;

    });

    if(!product){

        showToast("Product not found.","error");

        return;

    }

    editProductId = productId;

    document.getElementById("productName").value = product.name;

    document.getElementById("productImage").value = product.image;

    document.getElementById("productDescription").value = product.description;

    document.getElementById("productPrice").value = product.price;

    document.getElementById("productStock").value = product.stock;

    document.getElementById("productCategory").value = product.category;

    modalTitle.textContent = "Edit Product";

    saveProductBtn.textContent = "Update Product";

    productModal.classList.add("active");

}


