const swiper1 = new Swiper(".swiper1", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,

    navigation: {
        nextEl: ".next1",
        prevEl: ".prev1",
    }
});


const swiper2 = new Swiper(".swiper2", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,

    navigation: {
        nextEl: ".next2",
        prevEl: ".prev2",
    }
});


const swiper3 = new Swiper(".swiper3", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,

    navigation: {
        nextEl: ".next3",
        prevEl: ".prev3",
    }
});
// cart-sidebar
let cartButton = document.getElementById("cartButton");
let cartSidebar = document.getElementById("cartSidebar");
let closeCart = document.getElementById("closeCart");

if(cartButton && cartSidebar){
    cartButton.addEventListener("click", function(e){
e.preventDefault();
cartSidebar.classList.add("active");
    })
}
if(closeCart && cartSidebar){
    closeCart.addEventListener("click", function(e){
e.preventDefault();
cartSidebar.classList.remove("active");
    })
}
// 

let addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const image = button.dataset.image;
        const id = button.dataset.id;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let existingBook = cart.find(function(book) {
            return book.name === name;
        });

        if (existingBook) {
            existingBook.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();

        alert("Added To Cart ❤️");
    });
 
});
// items cart
function getImagePath(imagePath) {

    if (imagePath.startsWith("imgrom/")) {
        return "../romance/" + imagePath;
    }

    if (imagePath.startsWith("imgcrime/")) {
        return "../crime/" + imagePath;
    }

    if (imagePath.startsWith("imgfan/")) {
        return "../fantasy/" + imagePath;
    }

    if (imagePath.startsWith("imgPys/")) {
        return "../psychology/" + imagePath;
    }

    return imagePath;
}


function displayCart() {

    try {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let cartItems = document.getElementById("cartItems");

        cartItems.innerHTML = "";

        let total = 0;

        cart.forEach(function(book) {

            if (!book.quantity) {
                book.quantity = 1;
            }

            total += book.price * book.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <img src="${getImagePath(book.image)}" alt="${book.name}">

                    <div class="cart-info">

                        <h3>${book.name}</h3>

                        <p>${book.price} L.E</p>

                        <div class="quantity">

                            <button 
                                class="minus-btn"
                                data-name="${book.name}">
                                -
                            </button>

                            <span>${book.quantity}</span>

                            <button 
                                class="plus-btn"
                                data-name="${book.name}">
                                +
                            </button>

                        </div>

                        <button 
                            class="remove-btn"
                            data-name="${book.name}">
                            Remove
                        </button>

                    </div>

                </div>
            `;
        });


        // 
        document.getElementById("cartTotal").textContent = total;


        // 
        document.querySelectorAll(".plus-btn").forEach(function(button) {

            button.addEventListener("click", function() {

                let book = cart.find(function(book) {
                    return book.name === button.dataset.name;
                });

                if (book) {
                    book.quantity += 1;
                }

                localStorage.setItem("cart", JSON.stringify(cart));

                displayCart();
            });

        });


        // 
        document.querySelectorAll(".minus-btn").forEach(function(button) {

            button.addEventListener("click", function() {

                let book = cart.find(function(book) {
                    return book.name === button.dataset.name;
                });

                if (book && book.quantity > 1) {
                    book.quantity -= 1;
                }

                localStorage.setItem("cart", JSON.stringify(cart));

                displayCart();
            });

        });


        // 
        document.querySelectorAll(".remove-btn").forEach(function(button) {

            button.addEventListener("click", function() {

                cart = cart.filter(function(book) {
                    return book.name !== button.dataset.name;
                });

                localStorage.setItem("cart", JSON.stringify(cart));

                displayCart();
            });

        });


    } catch (error) {

        console.log("There is an error:", error);

    }

}




// 

displayCart();
let clearCart = document.getElementById("clearCart");

if (clearCart) {

    clearCart.addEventListener("click", function() {

        localStorage.removeItem("cart");

        displayCart();

    });

}