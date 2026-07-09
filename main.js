/*==================================================
                DOM ELEMENTS
==================================================*/

const backToTop = document.getElementById("backToTop");



/*==================================================
            SHOW BUTTON
==================================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY > 300){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

});




/*==================================================
            SCROLL TO TOP
==================================================*/

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});