//start of javascript
//view cart item in add to cart section
const cart_btn = document.querySelector('.nav_shop');
const close_cart = document.querySelector('.close_cart');
const clear_cart = document.querySelector('.clear_cart');
const cart_dom = document.querySelector('.cart');
const cart_overlay = document.querySelector('.cart_item_cointainer');
const cart_items = document.querySelector('.cart_items');
const cart_total = document.querySelector('.cart_total');
const cart_content = document.querySelector('.cart_content');
const product_dom = document.querySelector('.middle_products');

//cart
let cart = [];

//getting the products
class Products {
    async get_products(){
        try {
            let result = await fetch('product_items.json');
            let d = await result.json();
            let p = d.items;
            p = p.map(item => {
                const{title, price} = item.fields;
                const{id} = item.sys;
                const{image} = item.fields;
                return{title, price, id, image};
            })
            return p;
        } catch (error) {
            console.log(error);
        }
    }
}

//display the products
class UI {
    display_products(products){
        let result = '';
        products.forEach(product => {
            result += `
            
            <article class="single_product">
            <div class="img_container">
                <img src=${product.image} alt="Sofa" class="product">
                <button class="add_to_cart" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    Add-to-cart
                </button>
            </div>
            <h3 class="product_name">${product.title}</h3>
            <p class="cost"><span><i class="fas fa-rupee-sign"></i></span> ${product.price}</p>
        </article>
            
            `;
        });
        product_dom.innerHTML = result;
    }
}

//local storage
class Storage {}

document.addEventListener('DOMContentLoaded', ()=>{
    const ui = new UI();
    const products = new Products();
    products.get_products().then(products => ui.display_products(products));
});