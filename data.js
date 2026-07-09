
                // PRODUCTS DATABASE


const products = [

    {
        id:1,
        name:"iPhone 11 Pro",
        category:"electronics",
        price:1299,
        stock:18,
        image:"iphone.jpg",
        description:"Apple flagship smartphone with A18 chip."
    },

    {
        id:2,
        name:"Gaming Laptop",
        category:"electronics",
        price:1499,
        stock:15,
        image:"laptop.jpg",
        description:"High-performance laptop for gaming and work."
    },

    {
        id:3,
        name:"Wireless Headphones",
        category:"electronics",
        price:199,
        stock:19,
        image:"headphones.jpg",
        description:"Noise cancelling premium headphones."
    },

    {
        id:4,
        name:"Smart Watch",
        category:"electronics",
        price:299,
        stock:26,
        image:"watch.jpg",
        description:"Track health, fitness and notifications."
    },

    {
        id:5,
        name:"DSLR Camera",
        category:"electronics",
        price:899,
        stock:4,
        image:"camera.jpg",
        description:"Capture professional quality photos."
    },

    {
        id:6,
        name:"Classic T-Shirt",
        category:"clothing",
        price:35,
        stock:15,
        image:"tshirt.jpg",
        description:"Comfortable premium cotton t-shirt."
    },

    {
        id:7,
        name:"iPhone 12 Pro",
        category:"electronics",
        price:1299,
        stock:18,
        image:"iphone.jpg",
        description:"Apple flagship smartphone with A18 chip."
    },
    {
        id:8,
        name:"Winter Hoodie",
        category:"clothing",
        price:70,
        stock:7,
        image:"hoodie.jpg",
        description:"Warm fleece hoodie for winter."
    },

    {
        id:9,
        name:"Running Shoes",
        category:"clothing",
        price:120,
        stock:12,
        image:"shoes.jpg",
        description:"Lightweight shoes for everyday running."
    },

    {
        id:10,
        name:"Denim Jacket",
        category:"clothing",
        price:95,
        stock:5,
        image:"jacket.jpg",
        description:"Stylish denim jacket for casual wear."
    },

    {
        id:11,
        name:"JavaScript Mastery",
        category:"books",
        price:40,
        stock:20,
        image:"javascript-book.jpg",
        description:"Complete guide to modern JavaScript."
    },
       
    {
        id:12,
        name:"iPhone 13 Pro",
        category:"electronics",
        price:1299,
        stock:18,
        image:"iphone.jpg",
        description:"Apple flagship smartphone with A18 chip."
    },
    {
        id:13,
        name:"CSS Complete Guide",
        category:"books",
        price:32,
        stock:14,
        image:"css-book.jpg",
        description:"Master CSS from beginner to advanced."
    },
    
    {
        id:14,
        name:"iPhone 14 Pro",
        category:"electronics",
        price:1299,
        stock:18,
        image:"/iphone.jpg",
        description:"Apple flagship smartphone with A18 chip."
    },
    {
        id:15,
        name:"React Handbook",
        category:"books",
        price:45,
        stock:9,
        image:"react-book.jpg",
        description:"Learn React with practical projects."
    },
       
    {
        id:16,
        name:"iPhone 17 Pro",
        category:"electronics",
        price:1299,
        stock:18,
        image:"iphone.jpg",
        description:"Apple flagship smartphone with A18 chip."
    },
      
];



            // ALL PRODUCTS


let allProducts = JSON.parse(

    localStorage.getItem("products")

) || [...products];



                // COUPON DATABASE


const coupons = {

    SAVE10:{
        type:"percentage",
        value:10
    },

    SAVE20:{
        type:"percentage",
        value:20
    },

    FLAT50:{
        type:"fixed",
        value:50
    }

};



                // SHIPPING


const SHIPPING_COST = 0;


                // PAYMENT FAILURE RATE

const PAYMENT_FAILURE_RATE = 0.20;



                // FAKE API


function loadProducts(){

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            const success=true;

            if(success){

                resolve(allProducts);

            }

            else{

                reject(new Error("Unable to load products."));

            }

        },2000);

    });

}



  






function loadProductsFromStorage(){

    const savedProducts = JSON.parse(

        localStorage.getItem("products")

    );

    if(savedProducts){

        allProducts = savedProducts;

    }

}


            // PRODUCT STORAGE


function saveProducts(){

    localStorage.setItem(

        "products",

        JSON.stringify(allProducts)

    );

}



function resetProducts(){

    localStorage.removeItem("products");

}


                // ORDER STORAGE


let orders = JSON.parse(

    localStorage.getItem("orders")

) || [];



                // SAVE ORDERS


function saveOrders(){

    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

}
