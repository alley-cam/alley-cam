<script>
    const pricesInUSD = {
        'Turtle Keychains': 0.94,
        'Dice Keychain': 0.63,
        'Tennis Racket & Ball Keychain': 0.63,
        'Exfoliating Gloves': 1.88,
        'Large Hair Bow': 3.13,
        'Cherry Lip Oil': 2.19,
        'Elf Crystal Clear Lip Oil': 5.00,
        'Elf Grape Squeeze Me Lip Balm': 7.50,
        'Elf Peach Squeeze Me Lip Balm': 7.50,
        'NK Strawberry Lip Gloss': 2.19,
        'NK Mint Lip Gloss': 2.19,
        'NK Bubble-gum Lip Gloss': 2.19,
        'Vaseline Lip Therapy Balm': 2.19,
        'Bow Tie Bonnets': 4.69,
        'Flower Claw Clips': 7.50,
        'Tote Bags': 14.07,
    };
    
    document.addEventListener('DOMContentLoaded', () => {
        // Get references to all the sections and navigation links
        const homeLink = document.getElementById('home-link');
        const shopLink = document.getElementById('shop-link');
        const aboutLink = document.getElementById('about-link');
        const contactLink = document.getElementById('contact-link');
        const cartLink = document.getElementById('cart-link');

        const homeSection = document.getElementById('home-section');
        const shopAllSection = document.getElementById('shop-all-section');
        const aboutSection = document.getElementById('about-section');
        const cartSection = document.getElementById('cart-section');
        const contactSection = document.getElementById('contact-section');

        const shopNowButton = document.getElementById('hero-shop-all-button');

        // All the pages on the site.
        const allSections = [homeSection, shopAllSection, aboutSection, cartSection, contactSection];
        // Function to show a specific section and hide all others
        const showSection = (sectionToShow) => {
            allSections.forEach(section => {
                if (section.id === sectionToShow.id) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        };

        // Event listeners for navigation links
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(homeSection);
        });
        shopLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(shopAllSection);
        });
        aboutLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(aboutSection);
        });
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(contactSection);
        });
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(cartSection);
            updateCartDisplay();
        });
        shopNowButton.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(shopAllSection);
        });
        // Modal elements
        const messageModal = document.getElementById('message-modal');
        const confirmModal = document.getElementById('confirm-modal');
        const modalText = document.getElementById('modal-text');

        const showModal = (modalElement, message, autoHide = false) => {
            if (message) {
                modalText.textContent = message;
            }
            modalElement.style.display = 'block';
            setTimeout(() => {
                modalElement.style.opacity = 1;
            }, 10);
            // Start transition
            if (autoHide) {
                setTimeout(() => {
                    modalElement.style.opacity = 0;
                    setTimeout(() => {
                        modalElement.style.display = 'none';
                    }, 500); // Wait for fade-out to finish
                }, 2500);
            }
        };
        const hideModal = (modalElement) => {
            modalElement.style.opacity = 0;
            setTimeout(() => {
                modalElement.style.display = 'none';
            }, 500);
        }

        // Click outside dropdowns to close them
        document.addEventListener('click', (e) => {
            const filterSelector = document.getElementById('filter-selector');
            const currencySelector = document.getElementById('currency-selector');
            
            if (!filterSelector.contains(e.target)) {
                filterSelector.classList.remove('active');
            }
            
            if (!currencySelector.contains(e.target)) {
                currencySelector.classList.remove('active');
            }
        });
        // Filter and currency dropdown logic
        const filterSelector = document.getElementById('filter-selector');
        const currencySelector = document.getElementById('currency-selector');
        const filterButton = filterSelector.querySelector('.filter-button');
        const currencyButton = currencySelector.querySelector('.currency-button');
        filterButton.addEventListener('click', (e) => {
            e.stopPropagation();
            filterSelector.classList.toggle('active');
        });
        currencyButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currencySelector.classList.toggle('active');
        });
        const conversionRates = {
            usd: 1,
            jmd: 155.00 
        };
        let currentCurrency = 'jmd'; 
        
        const currencyLinks = document.querySelectorAll('.currency-dropdown a');
        const updatePrices = () => {
            const productCards = document.querySelectorAll('.card');
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.trim();
                const priceElement = card.querySelector('.price');
                const usdPrice = pricesInUSD[productName];
                if (usdPrice !== undefined) {
                    let convertedPrice = usdPrice * conversionRates[currentCurrency];
                    let currencySymbol = currentCurrency === 'usd' ? '$' : 'JMD$';
                    priceElement.textContent = `${currencySymbol}${convertedPrice.toFixed(2)}`;
                }
            });
        };

        currencyLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const newCurrency = e.target.getAttribute('data-currency');
                currentCurrency = newCurrency;
                currencyButton.textContent = newCurrency.toUpperCase();
                updatePrices();
                updateCartDisplay();
            });
        });
        updatePrices();

        // Cart functionality
        const cartItemsList = document.querySelector('.cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        const checkoutButton = document.getElementById('checkout-button');
        const cartCountElement = document.querySelector('.cart-count');
        let cart = [];
        const updateCartDisplay = () => {
            cartItemsList.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.classList.add('cart-item');
                
                let priceText = '';
                let convertedPrice = item.price * conversionRates[currentCurrency];
                let currencySymbol = currentCurrency === 'usd' ? '$' : 'JMD$';
                priceText = `${currencySymbol}${convertedPrice.toFixed(2)}`;

                li.innerHTML = `
                    <div class="cart-item-info">
                        <span>${item.name}</span>
                        <span>${priceText}</span>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn increase-btn" data-index="${index}">+</button>
                        </div>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                `;
                cartItemsList.appendChild(li);
                total += item.price * item.quantity;
            });

            const convertedTotal = total * conversionRates[currentCurrency];
            let currencySymbol = currentCurrency === 'usd' ? '$' : 'JMD$';
            cartTotalElement.textContent = `Total: ${currencySymbol}${convertedTotal.toFixed(2)}`;
            
            // Show/hide checkout button and update count
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            if (totalItems > 0) {
                checkoutButton.style.display = 'block';
                cartCountElement.textContent = totalItems;
                cartCountElement.style.display = 'flex';
            } else {
                checkoutButton.style.display = 'none';
                cartCountElement.style.display = 'none';
            }
        };
        document.querySelectorAll('.add-to-cart-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.card');
                const productName = card.querySelector('h3').textContent.trim();
                console.log(productName);
                const usdPrice = pricesInUSD[productName];

                if (usdPrice !== undefined) {
                    const existingItem = cart.find(item => item.name === productName);
                    if (existingItem) {
                        existingItem.quantity++;
                    } else {
                        cart.push({ name: productName, price: usdPrice, quantity: 1 });
                    }
                    showModal(messageModal, `${productName} added to cart!`, true);
                    updateCartDisplay();
                }
            });
        });

        cartItemsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                updateCartDisplay();
            }
            
            if (e.target.classList.contains('increase-btn')) {
                const index = e.target.getAttribute('data-index');
                cart[index].quantity++;
                updateCartDisplay();
            }
            
            if (e.target.classList.contains('decrease-btn')) {
                const index = e.target.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCartDisplay();
            }
        });
        // Checkout logic
        const confirmOrderButton = document.getElementById('confirm-order-button');
        const cancelOrderButton = document.getElementById('cancel-order-button');
        
        checkoutButton.addEventListener('click', () => {
            showModal(confirmModal);
        });
        confirmOrderButton.addEventListener('click', () => {
            hideModal(confirmModal);
            showModal(messageModal, "Order placed, thanks!", true);
            cart = [];
            updateCartDisplay();
        });
        cancelOrderButton.addEventListener('click', () => {
            hideModal(confirmModal);
        });
        // Color swatch functionality for products
        const setupColorSwatches = (containerId, imageId) => {
            const container = document.getElementById(containerId);
            const image = document.getElementById(imageId);
            if (container && image) {
                container.addEventListener('click', (e) => {
                    const button = e.target.closest('.color-swatch');
                    if (button) {
                        // Remove active class from all swatches in this container
                        Array.from(container.children).forEach(swatch => {
                            swatch.classList.remove('active');
                        });
                        // Add active class to the clicked swatch
                        button.classList.add('active');
                        // Change the main product image based on the data-image attribute
                        image.src = button.getAttribute('data-image');
                        image.alt = `A ${button.getAttribute('data-color')} version of the product.`;
                    }
                });
            }
        };
        // Flavour swatch functionally for products
        const setupFlavourSwatches = (containerId, imageId) => {
            const container = document.getElementById(containerId);
            const image = document.getElementById(imageId);
            if (container && image) {
                container.addEventListener('click', (e) => {
                    const button = e.target.closest('.flavour-swatch');
                    if (button) {
                        Array.from(container.children).forEach(swatch => {
                            swatch.classList.remove('active');
                        });
                      
                        button.classList.add('active');
                        image.src = button.getAttribute('data-image');
                        image.alt = `A ${button.getAttribute('data-flavour')} version of the product.`;
                    }
                });
            }
        };
        // All function calls to make the swatches interactive
        setupColorSwatches('turtle-keychain-colors', 'turtle-keychain-image');
        setupColorSwatches('bow-tie-bonnets-colors', 'bow-tie-bonnets-image');
        setupColorSwatches('exfoliating-gloves-colors', 'exfoliating-gloves-image');
        setupColorSwatches('large-hair-bow-colors', 'large-hair-bow-image');
        setupColorSwatches('tote-bags-colors', 'tote-bags-image');
        setupFlavourSwatches('vaseline-lip-therapy-balm-flavours', 'vaseline-lip-therapy-balm-image');
    });
</script>
