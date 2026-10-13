// Product Data
const products = [
    { id: 1, name: "Classic Denim Jacket", category: "Outerwear", price: 700, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3bQyAXDpvRDrupXWJ_N-x2t4CI4uq8n0nDETAxvRW4pWsx9illvztfJI&s=10" },
    { 
    id: 2, 
    name: "Classic White Cotton T-Shirt", 
    category: "Tops", 
    price: 524.99, 
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&auto=format&fit=crop" 
}
   , { 
        id: 3, 
        name: "Floral Summer Dress", 
        category: "Dresses", 
        price: 400, 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvDszBVm6NqY6-ntZ8BCyIsBgYY-N1Br_4tS24Ihjj89ax1v6kWSVwqfNM&s=10" 
    },
    { 
        id: 4, 
        name: "High-Waist Vintage Jeans", 
        category: "Bottoms", 
        price: 500, 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFsu4I2z-wNatKClOK38YOoMWtA4Zce7EVtmjJNg3C1xxie9ozl2C9cA&s=10" 
    },
    { 
        id: 5, 
        name: "Leather Biker Jacket", 
        category: "Outerwear", 
        price: 1149.99, 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzpWvXFPVFi3sMUEHzWJQy4ORZ7Up6t3phhak5t6Yy9mtlU1CBQI5tzfI&s=10" 
    },
    { 
        id: 6, 
        name: "Oversized Knit Sweater", 
        category: "Tops", 
        price: 679.99, 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxhAW6ywRN-uigfmPa5VlKYlBNItPZ124I_Y4S01XF3EPTjwe1kol1tyup&s=10" 
    },
    { 
        id: 7, 
        name: "Silk Slip Midi Dress", 
        category: "Dresses", 
        price: 995.00, 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3XeuwHpEn8sTxUBY1HPQOUvXyeCINSPROQS7fW0ubbwc2HzNbVNpdEcz&s=10" 
    }
    ,
    { id: 8, name: "Tailored Wide-Leg Trousers", category: "Bottoms", price: 784.99, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format&fit=crop" }
];

    

let cartCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupMobileMenu();
    setupNavbarScroll();
});

function renderProducts() {
    const container = document.getElementById('product-container');
    if (!container) return;
    
    container.innerHTML = products.map(product => {
        
        const safeName = (product.name || 'Product').replace(/'/g, "\\'");

        return `
            <div class="group relative flex flex-col">
                <!-- Image Container with Hover Effect -->
                <div class="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden mb-4 rounded-sm">
                    <img src="${product.image}" alt="${product.name || 'Product'}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out" loading="lazy">
                    
                    <!-- Quick Add Button -->
                    <div class="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 sm:opacity-0 transition-opacity duration-300">
                        <button onclick="addToCart(${product.id}, '${safeName}')" class="w-full bg-white text-black font-medium text-sm py-3 shadow-lg hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
                
                <!-- Product Details -->
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-xs text-gray-500 mb-1 uppercase tracking-wider">${product.category}</p>
                        <h3 class="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                            <a href="#">
                                <span aria-hidden="true" class="absolute inset-0 z-0"></span>
                                ${product.name || ''}
                            </a>
                        </h3>
                    </div>
                    <p class="text-sm font-semibold text-gray-900">Rs ${product.price.toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Add to Cart Logic
function addToCart(productId, productName) {
    cartCount++;
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = cartCount;
        
        if (cartCount === 1) {
            badge.classList.remove('opacity-0');
        }
        
        badge.classList.add('scale-125');
        setTimeout(() => badge.classList.remove('scale-125'), 200);
    }

    showToast(`${productName} added to cart.`);
}

// Toast Notification System
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'bg-black text-white px-6 py-3 shadow-lg rounded-sm text-sm font-medium flex items-center gap-3 toast-enter';
    toast.innerHTML = `
        <svg class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        ${message}
    `;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.replace('toast-enter', 'toast-exit');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

// Navbar Styling on Scroll
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('shadow-sm');
            } else {
                navbar.classList.remove('shadow-sm');
            }
        });
    }
}