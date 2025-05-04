
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let hamburgerMenu = document.querySelector('.hamburger-menu');
let mobileMenu = document.querySelector('.mobile-menu');

let products = [];
let cart = [];

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    alert("You must be logged in to EVO TREK to view Products!");
    window.location.href = "/signup";
} else {
    // Fetch cart from backend API
    fetch(`/api/cart/${currentUser._id}`)
        .then(res => res.json())
        .then(data => {
            cart = data || [];
            addCartToHTML();
        })
        .catch(err => {
            console.error("Error fetching cart:", err);
            cart = [];
        });
}

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Hamburger menu toggle
if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open'); // Prevent scrolling when menu is open
    });
}

// Close menu when clicking on a link
if (mobileMenu) {
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Add a back link to the mobile menu
    const backLink = document.createElement('a');
    backLink.href = '/home';
    backLink.textContent = 'Back to Home';
    backLink.classList.add('back-link');
    backLink.addEventListener('click', (e) => {
        e.preventDefault();

        // Use the same animation as the back icon
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        const randomRotation = Math.random() * 720 - 360;
        const randomScale = 0.5 + Math.random() * 2;

        // Animate list products
        const listProducts = document.querySelectorAll('.listProduct .item');
        gsap.to(listProducts, {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => {
                window.location.href = '/home';
            }
        });
    });

    // Insert at the beginning of the menu
    mobileMenu.insertBefore(backLink, mobileMenu.firstChild);
}

const addDataToHTML = () => {
    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.images['Red']}" class="productImage" alt="">
                <h2>${product.name}</h2>
                <div class="price">₹${product.price}</div>
                <select class="sizeSelect">
                    <option value="6">Size 6</option>
                    <option value="7">Size 7</option>
                    <option value="8">Size 8</option>
                    <option value="9">Size 9</option>
                    <option value="10">Size 10</option>
                </select>
                <select class="colorSelect">
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Purple">Purple</option>
                </select>
                <button class="addCart">Add To Cart</button>
                <button class="view-detailes" data-id="${product.id}">View Details</button>
            `;
            listProductHTML.appendChild(newProduct);

            newProduct.querySelector('.view-detailes').addEventListener('click', () => {
                localStorage.setItem('viewDetailsProductId', product.id);
                window.location.href = '/view-details';
            });

            newProduct.querySelector('.colorSelect').addEventListener('change', function () {
                let selectedColor = this.value;
                newProduct.querySelector('.productImage').src = product.images[selectedColor];
            });
        });
    }
};

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let productCard = positionClick.parentElement;
        let id_product = productCard.dataset.id;
        let size = productCard.querySelector('.sizeSelect').value;
        let color = productCard.querySelector('.colorSelect').value;

        // Animate the product image
        let productImage = productCard.querySelector('.productImage');
        productImage.style.transition = 'all 0.4s ease';
        productImage.style.transform = 'scale(1.1)';
        productImage.style.boxShadow = '0 0 20px rgba(243, 163, 17, 0.78)';
        productImage.style.border = '1px solid black';

        setTimeout(() => {
            productImage.style.transform = 'scale(1)';
            productImage.style.boxShadow = 'none';
            productImage.style.border = 'none'; // remove border after animation
        }, 400);

        addToCart(id_product, size, color);

        // Alert
        alert("Added to cart! Please check out.");
    }
});

const addToCart = (product_id, size, color) => {
    let index = cart.findIndex(item => item.product_id == product_id && item.size == size && item.color == color);
    if (index < 0) {
        cart.push({ product_id, size, color, quantity: 1 });
    } else {
        cart[index].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    if (currentUser) {
        // Save cart to backend API
        fetch(`/api/cart/${currentUser._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: cart })
        })
        .catch(err => {
            console.error("Error saving cart:", err);
        });
    }
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        // Show empty cart message
        let emptyCartMsg = document.createElement('div');
        emptyCartMsg.classList.add('empty-cart-message');
        emptyCartMsg.innerHTML = `
            <p>Your cart is empty</p>
            <p>Add some products to your cart</p>
        `;
        listCartHTML.appendChild(emptyCartMsg);
    } else {
        // Show cart items
        cart.forEach(item => {
            let product = products.find(p => p.id == item.product_id);
            if (!product) return;

            totalQuantity += item.quantity;
            totalPrice += product.price * item.quantity;

            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;
            newItem.dataset.size = item.size;
            newItem.dataset.color = item.color;
            newItem.innerHTML = `
                <div class="image"><img src="${product.images[item.color]}"></div>
                <div class="name">${product.name} (Size: ${item.size}, Color: ${item.color})</div>
                <div class="totalPrice">₹${product.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;

            listCartHTML.appendChild(newItem);
        });

        // Add clear cart button
        let clearBtn = document.createElement('button');
        clearBtn.innerText = 'Clear Cart';
        clearBtn.classList.add('clearCartBtn');
        clearBtn.addEventListener('click', () => {
            cart = [];
            addCartToHTML();
            addCartToMemory();
        });
        listCartHTML.appendChild(clearBtn);

        // Add total price
        let finalPriceEl = document.createElement('div');
        finalPriceEl.classList.add('finalPrice');
        finalPriceEl.innerHTML = `<strong>Total Price: ₹${totalPrice}</strong>`;
        listCartHTML.appendChild(finalPriceEl);
    }

    // Update cart icon quantity
    iconCartSpan.innerText = totalQuantity;

    // Add animation to cart icon when quantity changes
    if (totalQuantity > 0) {
        iconCart.classList.add('has-items');

        // Add pulse animation
        iconCart.style.animation = 'none';
        setTimeout(() => {
            iconCart.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);

        // Make sure the cart quantity is visible
        iconCartSpan.style.display = 'flex';
    } else {
        iconCart.classList.remove('has-items');
        // Still show the span but with 0
        iconCartSpan.style.display = 'flex';
    }
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let parentItem = positionClick.closest('.item');
        let product_id = parentItem.dataset.id;
        let size = parentItem.dataset.size;
        let color = parentItem.dataset.color;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(product_id, size, color, type);
    }
});

const changeQuantityCart = (product_id, size, color, type) => {
    let index = cart.findIndex(item => item.product_id == product_id && item.size == size && item.color == color);
    if (index >= 0) {
        if (type === 'plus') {
            cart[index].quantity++;
        } else {
            cart[index].quantity--;
            if (cart[index].quantity <= 0) cart.splice(index, 1);
        }
        addCartToHTML();
        addCartToMemory();
    }
};

const initApp = () => {
    fetch('products.json')
        .then(res => res.json())
        .then(data => {
            products = data;
            addDataToHTML();
            addCartToHTML();
        });
};

initApp();



// Back icon animation (only for desktop and tablet)
document.addEventListener('DOMContentLoaded', () => {
    const backIcon = document.querySelector('#back-icon');

    if (backIcon) {
        // Add initial animation to make it noticeable
        gsap.to(backIcon, {
            x: 10,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        backIcon.addEventListener('click', () => {
            // Stop the initial animation
            gsap.killTweensOf(backIcon);

            // Generate random position within viewport
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;

            // Random rotation and scale
            const randomRotation = Math.random() * 720 - 360;
            const randomScale = 0.5 + Math.random() * 2;

            // Remove any existing inline styles that might conflict
            backIcon.removeAttribute('style');

            // Create a timeline for the animation sequence
            const tl = gsap.timeline();

            // Rocket takeoff effect
            tl.to(backIcon, {
                scale: 1.5,
                y: -20,
                rotation: -45,
                duration: 0.3,
                ease: "power2.in"
            })
            .to(backIcon, {
                x: randomX,
                y: randomY,
                scale: randomScale,
                rotation: randomRotation,
                duration: 0.8,
                ease: "power1.in",
                onComplete: () => {
                    // After animation completes, redirect
                    setTimeout(() => {
                        window.location.href = '/home';
                    }, 200);
                }
            });

            // Add rocket trail effect
            const trail = document.createElement('div');
            trail.style.position = 'absolute'; // Fixed typo: 'absoulte' -> 'absolute'
            trail.style.width = '10px';
            trail.style.height = '10px';
            trail.style.backgroundColor = 'rgba(255,165,0,0.6)';
            trail.style.borderRadius = '50%';
            trail.style.pointerEvents = 'none';
            trail.style.left = backIcon.getBoundingClientRect().left + 'px';
            trail.style.top = backIcon.getBoundingClientRect().top + 'px';
            trail.style.zIndex = '100';
            document.body.appendChild(trail);

            gsap.to(trail, {
                width: '3px',
                height: '3px',
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: () => trail.remove()
            });

            // Animate list products
            const listProducts = document.querySelectorAll('.listProduct .item');
            gsap.to(listProducts, {
                y: 100,
                opacity: 0,
                stagger: 0.05,
                duration: 0.8,
                ease: "power2.in"
            });
        });
    }
});