let currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    alert("You must be logged in to proceed with checkout.");
    window.location.href = "/";
}

let cart = [];

// Fetch cart from backend API
fetch(`/api/cart/${currentUser._id}`)
    .then(res => res.json())
    .then(data => {
        cart = data || [];
        fetch('/products.json')
            .then(res => res.json())
            .then(data => {
                products = data;
                renderCart();
            });
    })
    .catch(err => {
        console.error("Error fetching cart:", err);
        cart = [];
    });
let products = [];

let discountApplied = false;

function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id == item.product_id);
        if (!product) return;

        const price = product.price * item.quantity;
        total += price;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.style.display = 'flex';
        itemDiv.style.gap = '1rem';
        itemDiv.style.marginBottom = '1rem';

        itemDiv.innerHTML = `
            <img src="${product.images[item.color]}" alt="${product.name}" style="width: 100px; height: auto; border-radius: 8px;">
            <div>
                <strong>${product.name}</strong><br>
                Size: ${item.size}<br>
                Color: ${item.color}<br>
                Quantity: ${item.quantity}<br>
                Price: ₹${price}
            </div>
        `;
        cartContainer.appendChild(itemDiv);
    });

    if (discountApplied) {
        total *= 0.85;
    }

    totalAmount.innerText = Math.round(total);
}

function applyDiscount() {
    const code = document.getElementById('discountCode').value;
    const msg = document.getElementById('discountMessage');

    if (code === 'save15') {
        discountApplied = true;
        msg.innerText = '15% discount applied!';
    } else {
        discountApplied = false;
        msg.innerText = 'Invalid code';
    }
    renderCart();
}

document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    //  Corrected cart mapping
    const enrichedItems = cart.map(item => {
        const product = products.find(p => p.id == item.product_id);
        if (!product) return null;
        return {
            name: product.name,
            price: product.price,
            image: product.images[item.color],
            quantity: item.quantity,
            size: item.size,
            color: item.color
        };
    }).filter(item => item !== null); // Remove nulls

    const order = {
        user: currentUser._id,
        fullName: formData.get('fullName'),
        address: formData.get('address'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        items: enrichedItems, //  updated
        total: document.getElementById('totalAmount').innerText,
        date: new Date()
    };

    fetch('/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    }).then(res => {
        if (res.ok) {
            // Clear cart from backend
            fetch(`/api/cart/${currentUser._id}`, {
                method: 'DELETE'
            }).then(() => {
                alert('Order placed successfully!');
                window.location.href = `/home?userId=${currentUser._id}`;
            }).catch(err => {
                console.error("Error clearing cart:", err);
                alert('Order placed successfully!');
                window.location.href = `/home?userId=${currentUser._id}`;
            });
        }
    });

});
