// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.classList.remove('bg-[#2F5D48]/95');
            navbar.classList.add('bg-[#2F5D48]');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.remove('bg-[#2F5D48]');
            navbar.classList.add('bg-[#2F5D48]/95');
        }
    }
});

// Back to Top Button Logic
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Carousel Logic
function scrollCarousel(containerId, direction) {
    const container = document.getElementById(containerId);
    if (container) {
        const scrollAmount = 300; // Adjust scroll distance as needed
        
        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
}

// Guide Modal Logic
const guideModal = document.getElementById('guide-modal');
const modalTitle = document.getElementById('modal-title');
const modalRole = document.getElementById('modal-role');
const modalDesc = document.getElementById('modal-desc');
const modalImg = document.getElementById('modal-img');

function openGuideModal(btn) {
    if (guideModal && modalTitle && modalRole && modalDesc && modalImg) {
        modalTitle.innerText = btn.dataset.name;
        modalRole.innerText = btn.dataset.role;
        modalDesc.innerText = btn.dataset.desc;
        modalImg.src = btn.dataset.img;
        
        guideModal.classList.remove('hidden');
        lucide.createIcons();
    }
}

function closeGuideModal() {
    if (guideModal) {
        guideModal.classList.add('hidden');
    }
}

// Adventure Modal Logic
const advModal = document.getElementById('adventure-modal');
const advTitle = document.getElementById('adv-modal-title');
const advDesc = document.getElementById('adv-modal-desc');
const advImg = document.getElementById('adv-modal-img');
const advActivities = document.getElementById('adv-modal-activities');

function openAdventureModal(title, desc, img, activities = []) {
    if (advModal && advTitle && advDesc && advImg && advActivities) {
        advTitle.innerText = title;
        advDesc.innerText = desc;
        advImg.src = img;
        
        // Populate Activities
        advActivities.innerHTML = '';
        if (activities && activities.length > 0) {
            activities.forEach(activity => {
                const li = document.createElement('li');
                li.className = 'flex items-center gap-2';
                li.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-[#D4A373]"></i> <span>${activity}</span>`;
                advActivities.appendChild(li);
            });
            document.getElementById('adv-modal-activities-container').classList.remove('hidden');
        } else {
            document.getElementById('adv-modal-activities-container').classList.add('hidden');
        }
        
        advModal.classList.remove('hidden');
        lucide.createIcons();
    }
}

function closeAdventureModal() {
    if (advModal) {
        advModal.classList.add('hidden');
    }
}

// Stay Modal Logic
const stayModal = document.getElementById('stay-modal');
const stayTitle = document.getElementById('stay-modal-title');
const stayImg = document.getElementById('stay-modal-img');
const stayPrice = document.getElementById('stay-modal-price');
const stayAllowed = document.getElementById('stay-modal-allowed');
const stayNotAllowed = document.getElementById('stay-modal-not-allowed');
const stayContact = document.getElementById('stay-modal-contact');
const stayMap = document.getElementById('stay-modal-map');
const stayPerks = document.getElementById('stay-modal-perks');
const stayPhoneBtn = document.getElementById('stay-modal-phone-btn');
const stayMessengerBtn = document.getElementById('stay-modal-messenger-btn');

function openStayModal(btn) {
    if (stayModal) {
        stayTitle.innerText = btn.dataset.name;
        stayImg.src = btn.dataset.img;
        stayPrice.innerText = btn.dataset.price;
        stayContact.innerText = btn.dataset.contact;
        
        const cleanNumber = btn.dataset.contact.replace(/[^0-9+]/g, ''); 
        if (stayPhoneBtn) stayPhoneBtn.href = `tel:${cleanNumber}`;

        // Update Messenger Button
        if (stayMessengerBtn) {
            if (btn.dataset.messenger && btn.dataset.messenger !== "#") {
                stayMessengerBtn.href = btn.dataset.messenger;
                stayMessengerBtn.classList.remove('hidden');
                stayMessengerBtn.classList.add('flex'); 
            } else {
                stayMessengerBtn.classList.add('hidden');
                stayMessengerBtn.classList.remove('flex');
            }
        }

        // Update Map Iframe
        if (stayMap) {
            const mapQuery = btn.dataset.mapQuery || btn.dataset.name;
            stayMap.src = `https://maps.google.com/maps?q=$${encodeURIComponent(mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        }

        // Populate Perks
        if (stayPerks) {
            stayPerks.innerHTML = '';
            if (btn.dataset.perks) {
                btn.dataset.perks.split(',').forEach(perk => {
                    const li = document.createElement('li');
                    li.className = 'text-xs bg-green-100 text-[#2F5D48] px-2 py-1 rounded-full border border-green-200';
                    li.innerText = perk.trim();
                    stayPerks.appendChild(li);
                });
            }
        }

        const fillList = (element, data) => {
            if (element) {
                element.innerHTML = '';
                if(data) {
                    data.split(',').forEach(item => {
                        const li = document.createElement('li');
                        li.innerText = item.trim();
                        element.appendChild(li);
                    });
                }
            }
        };

        fillList(stayAllowed, btn.dataset.allowed);
        fillList(stayNotAllowed, btn.dataset.notAllowed);

        stayModal.classList.remove('hidden');
        lucide.createIcons();
    }
}

function closeStayModal() {
    if (stayModal) {
        stayModal.classList.add('hidden');
    }
}

// Feedback Modal Logic
const feedbackModal = document.getElementById('feedback-modal');

function openFeedbackModal() {
    if (feedbackModal) {
        feedbackModal.classList.remove('hidden');
    }
}

function closeFeedbackModal() {
    if (feedbackModal) {
        feedbackModal.classList.add('hidden');
        // Reset form and errors when closing
        const form = document.getElementById('feedback-form');
        if (form) form.reset();
        document.querySelectorAll('.text-red-500.text-xs').forEach(el => el.classList.add('hidden'));
    }
}

// Route Toggle Logic
function toggleRoute(origin) {
    const manilaContent = document.getElementById('route-manila');
    const bicolContent = document.getElementById('route-bicol');
    const btnManila = document.getElementById('btn-manila');
    const btnBicol = document.getElementById('btn-bicol');

    // Reset classes
    const activeClass = ['bg-[#2F5D48]', 'text-white', 'shadow-sm'];
    const inactiveClass = ['text-gray-500', 'hover:text-[#2F5D48]'];

    if (manilaContent && bicolContent && btnManila && btnBicol) {
        if (origin === 'manila') {
            manilaContent.classList.remove('hidden');
            bicolContent.classList.add('hidden');
            
            btnManila.classList.add(...activeClass);
            btnManila.classList.remove(...inactiveClass);
            
            btnBicol.classList.remove(...activeClass);
            btnBicol.classList.add(...inactiveClass);
        } else {
            manilaContent.classList.add('hidden');
            bicolContent.classList.remove('hidden');

            btnBicol.classList.add(...activeClass);
            btnBicol.classList.remove(...inactiveClass);
            
            btnManila.classList.remove(...activeClass);
            btnManila.classList.add(...inactiveClass);
        }
    }
}

// Attach listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.view-profile-btn').forEach(btn => {
        btn.addEventListener('click', function() { openGuideModal(this); });
    });

    document.querySelectorAll('.view-stay-btn').forEach(btn => {
        btn.addEventListener('click', function() { openStayModal(this); });
    });

    // Feedback Form Validation & Submission
    const feedbackForm = document.getElementById('feedback-form');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');
            
            // Helper to show/hide errors
            const showError = (element, message) => {
                element.textContent = message;
                element.classList.remove('hidden');
            };
            const hideError = (element) => {
                element.classList.add('hidden');
            };

            // Reset errors
            hideError(nameError);
            hideError(emailError);
            hideError(messageError);

            let isValid = true;

            // 1. Sanitize Function (XSS Prevention)
            const sanitizeInput = (str) => {
                const temp = document.createElement('div');
                temp.textContent = str;
                return temp.innerHTML;
            };

            // 2. Validate Name
            const nameValue = nameInput.value.trim();
            const nameRegex = /^[a-zA-Z\u00C0-\u024F\s\.\-']{2,}$/; 
            
            if (!nameValue) {
                showError(nameError, "Name is required.");
                isValid = false;
            } else if (!nameRegex.test(nameValue)) {
                showError(nameError, "Please enter a valid name (at least 2 letters, no numbers/special symbols).");
                isValid = false;
            }

            // 3. Validate Email
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailValue) {
                showError(emailError, "Email is required.");
                isValid = false;
            } else if (!emailRegex.test(emailValue)) {
                showError(emailError, "Please enter a valid email address.");
                isValid = false;
            }

            // 4. Validate Message & Check for Scripts
            const messageValue = messageInput.value.trim();
            const scriptRegex = /<script\b[^>]*>|javascript:|on\w+=/i;

            if (!messageValue) {
                showError(messageError, "Message is required.");
                isValid = false;
            } else if (scriptRegex.test(messageValue) || scriptRegex.test(nameValue)) {
                showError(messageError, "Security Alert: Input contains forbidden characters or scripts.");
                isValid = false;
            }

            if (isValid) {
                const safeName = sanitizeInput(nameValue);
                const safeEmail = sanitizeInput(emailValue);
                const safeMessage = sanitizeInput(messageValue);

                const recipient = "web.rbbjr@gmail.com";
                const subject = `Feedback from Visit Sta. Lucia Website - ${safeName}`;
                const body = `Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`;
                
                const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                window.location.href = mailtoUrl;
                
                alert(`Thank you for your feedback, ${safeName}! Your email client will now open to send the message.`);
                closeFeedbackModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            if(guideModal && !guideModal.classList.contains('hidden')) closeGuideModal();
            if(stayModal && !stayModal.classList.contains('hidden')) closeStayModal();
            if(advModal && !advModal.classList.contains('hidden')) closeAdventureModal();
            if(feedbackModal && !feedbackModal.classList.contains('hidden')) closeFeedbackModal();
        }
    });
});
