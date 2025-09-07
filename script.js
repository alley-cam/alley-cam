
<script>
    document.addEventListener('DOMContentLoaded', () => {
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

        const outputDiv = document.getElementById('output');
        if (outputDiv) {
            for (const item in pricesInUSD) {
                const price = pricesInUSD[item];
                const outputLine = document.createElement('p');
                outputLine.textContent = `${item}: $${price.toFixed(2)}`;
                outputDiv.appendChild(outputLine);
            }
        } else {
            console.error("Error: element with id 'output' not found.");
        }
    });
    
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


            // Select the specific dropdown containers and their buttons
            const filterContainer = document.getElementById('filter-selector');
            const currencyContainer = document.getElementById('currency-selector');

            const filterButton = filterContainer.querySelector('.filter-button');
            const currencyButton = currencyContainer.querySelector('.currency-button');

            const filterDropdown = filterContainer.querySelector('.dropdown-content');
            const currencyDropdown = currencyContainer.querySelector('.dropdown-content');

            const toggleDropdown = (button, container) => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    container.classList.toggle('active');
                });  
            };

            document.addEventListener('click', (event) => {
                if (!filterContainer.contains(event.target) && filterContainer.classList.contains('active')) {
                    filterContainer.classList.remove('active');
                }
                if (!currencyContainer.contains(event.target) && currencyContainer.classList.contains('active')) {
                    currencyContainer.classList.remove('active');
                }
            });

            // Call the function for each dropdown
            toggleDropdown(filterButton, filterContainer);
            toggleDropdown(currencyButton, currencyContainer);
        
            const conversionRates = {
                usd: 1,
                jmd: 160.39
            };
            let currentCurrency = 'jmd'; 
        
            const currencyLinks = document.querySelectorAll('.currency-dropdown     
            const updatePrices = () => {
                const productGrid = document.querySelector('.products-grid');
                if (productGrid) {
                    const productCards = productGrid.querySelectorAll('.card');
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
                }
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
             // Consolidated function for both color and flavor swatches
             const setupProductSwatches = (containerId, imageId, dataAttributeName) => {
                const container = document.getElementById(containerId);
                const image = document.getElementById(imageId);
                if (container && image) {
                    container.addEventListener('click', (e) => {
                        const button = e.target.closest(`[data-${dataAttributeName}]`);
                        if (button) {
                            Array.from(container.children).forEach(swatch => {
                                swatch.classList.remove('active');
                            });
                            button.classList.add('active');
                            image.src = button.getAttribute('data-image');
                            image.alt = `A ${button.getAttribute(`data-${dataAttributeName}`)} version of the product.`;
                        }
                    });
                }
            };

            // All function calls to make the swatches interactive
            setupProductSwatches('turtle-keychain-colors', 'turtle-keychain-image', 'color');
            setupProductSwatches('bow-tie-bonnets-colors', 'bow-tie-bonnets-image', 'color');
            setupProductSwatches('exfoliating-gloves-colors', 'exfoliating-gloves-image', 'color');
            setupProductSwatches('large-hair-bow-colors', 'large-hair-bow-image', 'color');
            setupProductSwatches('tote-bags-colors', 'tote-bags-image', 'color');
            setupProductSwatches('vaseline-lip-therapy-balm-flavours', 'vaseline-lip-therapy-balm-image', 'flavour');

            const hamburger = document.getElementById('hamburger-menu');
            const sidebar = document.getElementById('sidebar-menu');

            hamburger.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });

            document.queryselectorAll('.sidebar-link').forEach(link => {
                link.addEventListener('click', () => {
                    sidebar.classList.remove('active');
                });
            });
        });
    </script>
