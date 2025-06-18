// Product data
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 999.99,
        category: "smartphone",
        image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-pink-witb-202309_FMT_WHH?wid=560&hei=744&fmt=jpeg&qlt=90&.v=YkxjYy9WVUhoKzlXSUFWTHJ3WUt6MndDMHozVEpwb1QwL3JKbXRvVmlTT1RBYytua0NEalk2ckdxbTYxRXZKbFFzSzE1ViswYzNCWDZvT3prV0hram9DN2FneDVscGhiL09zN3loWmI4YS9KN1h3UVVuR3V0T3lzT3V3MC9JMmQ",
        description: "The latest iPhone with advanced camera system and A17 Pro chip.",
        features: ["6.1-inch Super Retina XDR display", "A17 Pro chip", "Pro camera system", "5G connectivity"],
        inStock: true
    },
    {
        id: 2,
        name: "MacBook Pro 16\"",
        price: 2499.99,
        category: "laptop",
        image: "https://intaglaptops.com/cdn/shop/files/s-l1600.webp?v=1730468299",
        description: "Powerful laptop for professionals with M3 Pro chip.",
        features: ["16-inch Liquid Retina XDR display", "M3 Pro chip", "Up to 22 hours battery life", "Advanced thermal design"],
        inStock: true
    },
    {
        id: 3,
        name: "AirPods Pro",
        price: 249.99,
        category: "accessory",
        image: "https://m-cdn.phonearena.com/images/hub/274-wide-two_1200/Apple-AirPods-Pro-3-release-date-predictions-price-specs-and-must-know-features.jpg",
        description: "Premium wireless earbuds with active noise cancellation.",
        features: ["Active Noise Cancellation", "Transparency mode", "Spatial audio", "Up to 6 hours listening time"],
        inStock: true
    },
    {
        id: 4,
        name: "iPad Air",
        price: 599.99,
        category: "accessory",
        image: "https://i0.wp.com/www.icenter-iraq.com/wp-content/uploads/2024/05/iPad_Air_11_M2_WiFi_Space_Gray_PDP_Image_Position_1b__en-ME-scaled.jpg?fit=2560%2C2560&ssl=1",
        description: "Versatile tablet perfect for work and creativity.",
        features: ["10.9-inch Liquid Retina display", "M1 chip", "12MP cameras", "All-day battery life"],
        inStock: true
    },
    {
        id: 5,
        name: "PlayStation 5",
        price: 499.99,
        category: "gaming",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_wiXtDC_sFVGChrIYwvOtPOQQC1Ttldm2g&s",
        description: "Next-generation gaming console with 4K gaming.",
        features: ["4K gaming", "Ray tracing", "3D audio", "Ultra-fast SSD"],
        inStock: false
    },
    {
        id: 6,
        name: "Samsung Galaxy S24",
        price: 899.99,
        category: "smartphone",
        image: "https://images.samsung.com/is/image/samsung/assets/ph/smartphones/galaxy-s24/buy/01_S24Series-Group-KV_Exclusive-MO_0527_final.jpg",
        description: "Flagship Android smartphone with AI features.",
        features: ["6.2-inch Dynamic AMOLED display", "Snapdragon 8 Gen 3", "AI-powered camera", "5G connectivity"],
        inStock: true
    },
    {
        id: 7,
        name: "Dell XPS 13",
        price: 1299.99,
        category: "laptop",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt75hCLc-ySEW9YyN3vQvSHlyrNyvX9OsH9g&s",
        description: "Ultra-portable laptop with stunning display.",
        features: ["13.4-inch InfinityEdge display", "Intel Core i7", "16GB RAM", "512GB SSD"],
        inStock: true
    },
    {
        id: 8,
        name: "Nintendo Switch OLED",
        price: 349.99,
        category: "gaming",
        image: "https://www.toysrus.com.sg/dw/image/v2/BDGJ_PRD/on/demandware.static/-/Sites-master-catalog-toysrus/default/dw1fb91a2a/e/d/6/b/ed6bc8376af36588f85569f8537514e2a070159c_12270_i1.jpg?sw=500&sh=500&q=75",
        description: "Hybrid gaming console with OLED screen.",
        features: ["7-inch OLED screen", "Enhanced audio", "Wide adjustable stand", "64GB internal storage"],
        inStock: true
    }
];

// Cart functionality
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartCount();
                this.renderCart();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cart-count');
        const count = this.getItemCount();
        cartCountElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartContainer = document.getElementById('empty-cart');
        
        if (!cartItemsContainer) return;

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '';
            if (emptyCartContainer) {
                emptyCartContainer.classList.remove('hidden');
            }
            this.updateCartSummary();
            return;
        }

        if (emptyCartContainer) {
            emptyCartContainer.classList.add('hidden');
        }

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="flex items-center py-4 border-b border-gray-200">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1 ml-4">
                    <h3 class="font-semibold">${item.name}</h3>
                    <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})" class="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center">
                        <i class="fas fa-minus text-sm"></i>
                    </button>
                    <span class="w-8 text-center">${item.quantity}</span>
                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})" class="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center">
                        <i class="fas fa-plus text-sm"></i>
                    </button>
                </div>
                <div class="ml-4">
                    <p class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
                    <button onclick="cart.removeItem(${item.id})" class="text-red-500 hover:text-red-700 text-sm">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `).join('');

        this.updateCartSummary();
    }

    updateCartSummary() {
        const subtotal = this.getTotal();
        const shipping = subtotal > 50 ? 0 : 10;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        const subtotalElement = document.getElementById('subtotal');
        const shippingElement = document.getElementById('shipping');
        const taxElement = document.getElementById('tax');
        const totalElement = document.getElementById('total');
        const checkoutBtn = document.getElementById('checkout-btn');

        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingElement) shippingElement.textContent = `$${shipping.toFixed(2)}`;
        if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
        
        if (checkoutBtn) {
            checkoutBtn.disabled = this.items.length === 0;
        }
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Product rendering functions
function renderProductCard(product) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-4 text-sm">${product.description}</p>
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-blue-600">$${product.price.toFixed(2)}</span>
                    <div class="flex space-x-2">
                        <button onclick="viewProduct(${product.id})" class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded transition">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="cart.addItem(${product.id})" 
                                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}"
                                ${!product.inStock ? 'disabled' : ''}>
                            ${product.inStock ? '<i class="fas fa-cart-plus"></i>' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
                ${!product.inStock ? '<p class="text-red-500 text-sm mt-2">Currently out of stock</p>' : ''}
            </div>
        </div>
    `;
}

function renderProducts(productsToRender = products) {
    const productsGrid = document.getElementById('products-grid');
    const featuredProducts = document.getElementById('featured-products');
    
    if (productsGrid) {
        productsGrid.innerHTML = productsToRender.map(renderProductCard).join('');
    }
    
    if (featuredProducts) {
        const featured = productsToRender.slice(0, 4);
        featuredProducts.innerHTML = featured.map(renderProductCard).join('');
    }
}

function viewProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

function renderProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('product-detail').innerHTML = '<p class="text-center text-gray-600">Product not found.</p>';
        return;
    }

    // Update breadcrumb
    const breadcrumb = document.getElementById('breadcrumb-product');
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }

    // Update page title
    document.title = `TechStore - ${product.name}`;

    const productDetailContainer = document.getElementById('product-detail');
    if (productDetailContainer) {
        productDetailContainer.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.name}" class="w-full rounded-lg shadow-lg">
            </div>
            <div>
                <h1 class="text-3xl font-bold mb-4">${product.name}</h1>
                <p class="text-4xl font-bold text-blue-600 mb-6">$${product.price.toFixed(2)}</p>
                <p class="text-gray-600 mb-6">${product.description}</p>
                
                <div class="mb-6">
                    <h3 class="text-xl font-semibold mb-3">Features:</h3>
                    <ul class="space-y-2">
                        ${product.features.map(feature => `<li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>${feature}</li>`).join('')}
                    </ul>
                </div>

                <div class="flex items-center space-x-4 mb-6">
                    <div class="flex items-center border border-gray-300 rounded">
                        <button onclick="updateQuantity(-1)" class="px-3 py-2 hover:bg-gray-100">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" id="quantity" value="1" min="1" class="w-16 text-center border-0 focus:outline-none">
                        <button onclick="updateQuantity(1)" class="px-3 py-2 hover:bg-gray-100">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button onclick="addToCartFromDetail(${product.id})" 
                            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}"
                            ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus mr-2"></i>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>

                <div class="border-t pt-6">
                    <div class="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <i class="fas fa-shipping-fast text-2xl text-blue-600 mb-2"></i>
                            <p class="text-sm font-semibold">Free Shipping</p>
                            <p class="text-xs text-gray-600">On orders over $50</p>
                        </div>
                        <div>
                            <i class="fas fa-undo text-2xl text-blue-600 mb-2"></i>
                            <p class="text-sm font-semibold">30-Day Returns</p>
                            <p class="text-xs text-gray-600">Easy returns policy</p>
                        </div>
                        <div>
                            <i class="fas fa-shield-alt text-2xl text-blue-600 mb-2"></i>
                            <p class="text-sm font-semibold">Warranty</p>
                            <p class="text-xs text-gray-600">1-year manufacturer warranty</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Render related products
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const relatedContainer = document.getElementById('related-products');
    if (relatedContainer) {
        relatedContainer.innerHTML = relatedProducts.map(renderProductCard).join('');
    }
}

function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        const currentValue = parseInt(quantityInput.value);
        const newValue = Math.max(1, currentValue + change);
        quantityInput.value = newValue;
    }
}

function addToCartFromDetail(productId) {
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    cart.addItem(productId, quantity);
}

// Filter and sort functions
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (!categoryFilter || !sortFilter) return;

    let filteredProducts = [...products];

    // Filter by category
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    // Sort products
    const sortBy = sortFilter.value;
    switch (sortBy) {
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
    }

    renderProducts(filteredProducts);
}

// Contact form handling
function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }, 1000);
        });
    }
}

// Checkout handling
function handleCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.items.length === 0) return;
            
            showQRCodeModal();
        });
    }
}

// QR Code Modal functionality
function showQRCodeModal() {
    // Remove any existing modal first
    const existingModal = document.getElementById('qr-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const total = cart.getTotal() + (cart.getTotal() > 50 ? 0 : 10) + (cart.getTotal() * 0.08);
    
    // Create modal HTML
    const modalHTML = `
        <div id="qr-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div class="text-center">
                    <h2 class="text-2xl font-bold mb-4">Complete Your Payment</h2>
                    <p class="text-gray-600 mb-4">Scan the QR code below to complete your payment</p>
                    
                    <div class="bg-gray-50 p-6 rounded-lg mb-4">
                        <img src="image.png" alt="Payment QR Code" class="w-48 h-48 mx-auto mb-4">
                        <p class="text-lg font-semibold">Total: $${total.toFixed(2)}</p>
                    </div>
                    
                    <div class="text-sm text-gray-500 mb-6">
                        <p>• Scan with your mobile banking app</p>
                        <p>• Payment will be processed instantly</p>
                        <p>• You'll receive a confirmation email</p>
                    </div>
                    
                    <div class="flex space-x-4">
                        <button id="cancel-payment-btn" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition">
                            Cancel
                        </button>
                        <button id="complete-payment-btn" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">
                            Payment Complete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add event listeners after modal is created
    document.getElementById('cancel-payment-btn').addEventListener('click', closeQRModal);
    document.getElementById('complete-payment-btn').addEventListener('click', simulatePayment);
    
    // Close modal when clicking outside
    document.getElementById('qr-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeQRModal();
        }
    });
}

function closeQRModal() {
    const modal = document.getElementById('qr-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

function simulatePayment() {
    // Simulate payment processing
    const modal = document.getElementById('qr-modal');
    if (modal) {
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div class="text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-2xl text-green-600"></i>
                    </div>
                    <h2 class="text-2xl font-bold mb-2">Payment Successful!</h2>
                    <p class="text-gray-600 mb-4">Thank you for your purchase. Your order has been confirmed.</p>
                    <p class="text-sm text-gray-500 mb-6">Order confirmation has been sent to your email.</p>
                    <button id="continue-shopping-btn" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition">
                        Continue Shopping
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener for the continue shopping button
        document.getElementById('continue-shopping-btn').addEventListener('click', completeCheckout);
    }
}

function completeCheckout() {
    // Clear cart
    cart.items = [];
    cart.saveCart();
    cart.updateCartCount();
    
    // Close modal
    closeQRModal();
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Add modal styles
const modalStyles = `
    <style>
        #qr-modal {
            animation: fadeIn 0.3s ease-out;
        }
        
        #qr-modal > div {
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    </style>
`;

// Add styles to head
document.head.insertAdjacentHTML('beforeend', modalStyles);

// Mobile menu toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Initialize page-specific functionality
jQuery(document).ready(function($) {
    setupMobileMenu();
    
    // Check which page we're on and initialize accordingly
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            renderProducts();
            break;
            
        case 'products.html':
            renderProducts();
            // Setup filters
            $('#category-filter, #sort-filter').on('change', filterProducts);
            break;
            
        case 'product-detail.html':
            renderProductDetail();
            break;
            
        case 'cart.html':
            cart.renderCart();
            handleCheckout();
            break;
            
        case 'contact.html':
            handleContactForm();
            break;
    }
    
    // Update cart count on all pages
    cart.updateCartCount();
});

// Smooth scrolling for anchor links
jQuery(document).ready(function($) {
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
});

// Add loading animation
function showLoading() {
    $('body').append('<div id="loading" class="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50"><div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div></div>');
}

function hideLoading() {
    $('#loading').remove();
}

// Simulate loading for demo purposes
jQuery(window).on('load', function() {
    hideLoading();
});
document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = function (e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(e.key)) || 
        (e.ctrlKey && e.key === 'U')) {
        return false;
    }
};
