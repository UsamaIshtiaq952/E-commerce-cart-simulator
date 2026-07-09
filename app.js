let editProductId = null;

const productModal = document.getElementById("productModal");

const addProductBtn = document.getElementById("addProductBtn");

const closeProductModal = document.getElementById("closeProductModal");

const productForm = document.getElementById("productForm");





productForm.addEventListener("submit",saveProduct);




function saveProduct(e){

    e.preventDefault();

    const name = document.getElementById("productName").value.trim();

    const image = document.getElementById("productImage").value.trim();

    const description = document.getElementById("productDescription").value.trim();

    const price = Number(document.getElementById("productPrice").value);

    const stock = Number(document.getElementById("productStock").value);

    const category = document.getElementById("productCategory").value;

    const newProduct = {

        id: Date.now(),

        name,

        image,

        description,

        price,

        stock,

        category

    };

    if(editProductId === null){

        allProducts.push(newProduct);

        showToast("Product added successfully.","success");

    }

    else{

        const product = allProducts.find(product=>{

            return product.id === editProductId;

        });

        product.name = name;
        product.image = image;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.category = category;

        showToast("Product updated successfully.","success");

    }

    saveProducts();

    renderProducts(allProducts);

    resetProductForm();

    productModal.classList.remove("active");

}

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

    renderOrders();

});




            // SEARCH & FILTER


function filterProducts(){

    let filteredProducts = [...allProducts];



    
            // SEARCH
    

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





addProductBtn.addEventListener("click",()=>{

    resetProductForm();

    productModal.classList.add("active");

});


closeProductModal.addEventListener("click",()=>{

    productModal.classList.remove("active");

    resetProductForm();

});

    window.addEventListener("click",(e)=>{

    if(e.target===productModal){

        productModal.classList.remove("active");

        resetProductForm();

    }

});



function initializeProductActions(){

    const deleteButtons = document.querySelectorAll(".delete-product");

    const editButtons = document.querySelectorAll(".edit-product");



    deleteButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const productId = Number(button.dataset.id);

        deleteProduct(productId);

    });

});


editButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const productId = Number(button.dataset.id);

        editProduct(productId);

    });

});}


function resetProductForm(){

    productForm.reset();

    editProductId = null;

    modalTitle.textContent = "Add Product";

    saveProductBtn.textContent = "Add Product";

}