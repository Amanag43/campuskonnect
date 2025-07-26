// This script should be placed in a file named `script.js`
// and linked at the bottom of `index.html`.

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const pageContainer = document.getElementById('page-container');
    const allPages = pageContainer.querySelectorAll('.page-section');
    
    const mainNav = document.getElementById('main-nav');
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');

    const logoLink = document.getElementById('logo-link');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const loginFromSignup = document.getElementById('login-from-signup');
    const signupFromLogin = document.getElementById('signup-from-login');
    const loginSubmitButton = document.getElementById('login-submit-button');
    const profileLink = document.getElementById('profile-link');
    const postGigLink = document.getElementById('post-gig-link');
    const postGigFromProfile = document.getElementById('post-gig-from-profile');
    const logoutLink = document.getElementById('logout-link');

    // New Feature Links
    const squadUpLink = document.getElementById('squad-up-link');
    const workshopsLink = document.getElementById('workshops-link');
    const mainPageSquadUpLink = document.getElementById('main-page-squad-up-link');
    const postProjectLink = document.getElementById('post-project-link');
    const hostWorkshopLink = document.getElementById('host-workshop-link');
    const mainNavSquadUp = document.getElementById('main-nav-squad-up');
    const mobileNavSquadUp = document.getElementById('mobile-nav-squad-up');
    const footerSquadUp = document.getElementById('footer-squad-up');
    const footerWorkshops = document.getElementById('footer-workshops');


    const profileButton = document.getElementById('profile-button');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- Page Navigation Logic ---
    function showPage(pageId) {
        allPages.forEach(page => {
            if (page.id === pageId) {
                page.classList.remove('page-hidden');
                // Trigger reflow to apply transition
                void page.offsetWidth; 
                page.style.opacity = 1;
            } else {
                page.style.opacity = 0;
                setTimeout(() => page.classList.add('page-hidden'), 300);
            }
        });
        window.scrollTo(0, 0); // Scroll to top on page change
        
        // Adjust nav visibility based on page and auth state
        const isLoggedIn = !userMenu.classList.contains('hidden');
        if (pageId === 'main-page') {
            mainNav.style.display = 'flex';
        } else if (isLoggedIn) {
            mainNav.style.display = 'none';
        } else {
             mainNav.style.display = 'flex';
        }

        mobileMenu.classList.add('hidden'); // Close mobile menu on nav
    }

    // --- Auth State Logic ---
    function setLoggedInState(isLoggedIn) {
        if (isLoggedIn) {
            authButtons.classList.add('hidden');
            userMenu.classList.remove('hidden');
            userMenu.classList.add('flex');
            mainNavSquadUp.classList.add('hidden'); // Hide from main nav when logged in
        } else {
            authButtons.classList.remove('hidden');
            userMenu.classList.add('hidden');
            userMenu.classList.remove('flex');
            mainNavSquadUp.classList.remove('hidden'); // Show in main nav when logged out
        }
    }

    // --- Event Listeners ---
    logoLink.addEventListener('click', (e) => { e.preventDefault(); showPage('main-page'); });
    loginLink.addEventListener('click', (e) => { e.preventDefault(); showPage('login-page'); });
    signupLink.addEventListener('click', (e) => { e.preventDefault(); showPage('signup-page'); });
    loginFromSignup.addEventListener('click', (e) => { e.preventDefault(); showPage('login-page'); });
    signupFromLogin.addEventListener('click', (e) => { e.preventDefault(); showPage('signup-page'); });
    profileLink.addEventListener('click', (e) => { e.preventDefault(); showPage('profile-page'); profileDropdown.classList.add('hidden'); });
    postGigLink.addEventListener('click', (e) => { e.preventDefault(); showPage('post-gig-page'); });
    postGigFromProfile.addEventListener('click', (e) => { e.preventDefault(); showPage('post-gig-page'); });
    
    // New Feature Listeners
    squadUpLink.addEventListener('click', (e) => { e.preventDefault(); showPage('squad-up-page'); });
    workshopsLink.addEventListener('click', (e) => { e.preventDefault(); showPage('workshops-page'); });
    mainPageSquadUpLink.addEventListener('click', (e) => { e.preventDefault(); showPage('squad-up-page'); });
    postProjectLink.addEventListener('click', (e) => { e.preventDefault(); showPage('post-project-page'); });
    hostWorkshopLink.addEventListener('click', (e) => { e.preventDefault(); /* showPage('host-workshop-page'); */ alert('Host workshop form coming soon!'); });
    mainNavSquadUp.addEventListener('click', (e) => { e.preventDefault(); showPage('squad-up-page'); });
    mobileNavSquadUp.addEventListener('click', (e) => { e.preventDefault(); showPage('squad-up-page'); });
    footerSquadUp.addEventListener('click', (e) => { e.preventDefault(); showPage('squad-up-page'); });
    footerWorkshops.addEventListener('click', (e) => { e.preventDefault(); showPage('workshops-page'); });

    // Simulate login
    loginSubmitButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission
        setLoggedInState(true);
        showPage('profile-page');
    });

    // Simulate logout
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        setLoggedInState(false);
        showPage('main-page');
        profileDropdown.classList.add('hidden');
    });

    // Profile dropdown toggle
    profileButton.addEventListener('click', () => {
        profileDropdown.classList.toggle('hidden');
    });

    // Close dropdown if clicking outside
    document.addEventListener('click', (e) => {
        if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.add('hidden');
        }
    });

    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for main page nav links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Check if it's an internal anchor
            if (href && href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    // If not on the main page, switch to it first
                    if (document.getElementById('main-page').classList.contains('page-hidden')) {
                        showPage('main-page');
                        // Wait for page to show then scroll
                        setTimeout(() => {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }, 350);
                    } else {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // --- Initial Setup ---
    lucide.createIcons();
    showPage('main-page'); // Start on the main landing page
    setLoggedInState(false); // Start as logged out
});
