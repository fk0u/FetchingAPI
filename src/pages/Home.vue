<template>
  <!-- Splash Screen -->
  <div class="splash-screen" ref="splashScreen">
    <div class="splash-content">
      <div class="splash-logo">
        <div class="splash-logo-inner"></div>
      </div>
      <h1 class="splash-title">SEVEN<span>LIBRARY</span></h1>
      <div class="splash-loader">
        <div class="splash-loader-bar"></div>
      </div>
    </div>
  </div>

  <!-- Main App -->
  <ion-page class="main-app" ref="mainApp">
    <!-- Header -->
    <ion-header class="ion-no-border">
      <ion-toolbar class="custom-toolbar">
        <div class="header-content">
          <div class="logo-container">
            <div class="app-logo">
              <div class="app-logo-inner"></div>
            </div>
            <h2 class="app-name">SEVEN<span>LIBRARY</span></h2>
          </div>
          
          <div class="nav-buttons">
            <ion-button fill="clear" class="nav-link" @click="scrollToSection('features')">Features</ion-button>
            <ion-button fill="clear" class="nav-link" @click="scrollToSection('categories')">Categories</ion-button>
            <ion-button fill="clear" class="nav-link" @click="scrollToSection('testimonials')">Testimonials</ion-button>
            <ion-button class="auth-btn login-btn" @click="navigateTo('/login')">Login</ion-button>
            <ion-button class="auth-btn register-btn" @click="navigateTo('/register')">Register</ion-button>
          </div>
          
          <ion-button fill="clear" class="menu-toggle" @click="toggleMobileMenu">
            <ion-icon :icon="menuOutline" size="large"></ion-icon>
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-header>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'active': mobileMenuOpen }" ref="mobileMenu">
      <div class="mobile-menu-header">
        <h3>Menu</h3>
        <ion-button fill="clear" class="close-menu" @click="toggleMobileMenu">
          <ion-icon :icon="closeOutline" size="large"></ion-icon>
        </ion-button>
      </div>
      <div class="mobile-menu-items">
        <ion-button expand="block" fill="clear" class="mobile-nav-link" @click="scrollToSectionMobile('features')">Features</ion-button>
        <ion-button expand="block" fill="clear" class="mobile-nav-link" @click="scrollToSectionMobile('categories')">Categories</ion-button>
        <ion-button expand="block" fill="clear" class="mobile-nav-link" @click="scrollToSectionMobile('testimonials')">Testimonials</ion-button>
        <ion-button expand="block" class="mobile-auth-btn login-btn" @click="navigateTo('/login')">Login</ion-button>
        <ion-button expand="block" class="mobile-auth-btn register-btn" @click="navigateTo('/register')">Register</ion-button>
      </div>
    </div>

    <ion-content class="ion-padding custom-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="retro-background">
          <div class="grid-overlay"></div>
          <div class="retro-circle circle-1"></div>
          <div class="retro-circle circle-2"></div>
          <div class="retro-lines"></div>
        </div>
        
        <div class="hero-content">
          <div class="hero-text" ref="heroText">
            <h1 class="hero-title">Discover a New <span>Reading</span> Experience</h1>
            <p class="hero-subtitle">Your gateway to thousands of digital books, magazines, and resources</p>
            <div class="hero-buttons">
              <ion-button class="get-started-btn" @click="navigateTo('/register')">
                Get Started
                <ion-icon slot="end" :icon="arrowForwardOutline"></ion-icon>
              </ion-button>
              <ion-button fill="clear" class="learn-more-btn" @click="scrollToSection('features')">
                Learn More
                <ion-icon slot="end" :icon="informationCircleOutline"></ion-icon>
              </ion-button>
            </div>
          </div>
          
          <div class="hero-image" ref="heroImage">
            <div class="book-stack">
              <div class="book book-1"></div>
              <div class="book book-2"></div>
              <div class="book book-3"></div>
              <div class="floating-elements">
                <div class="floating-element element-1">
                  <ion-icon :icon="bookOutline"></ion-icon>
                </div>
                <div class="floating-element element-2">
                  <ion-icon :icon="headsetOutline"></ion-icon>
                </div>
                <div class="floating-element element-3">
                  <ion-icon :icon="tabletPortraitOutline"></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="scroll-indicator" @click="scrollToSection('features')">
          <div class="mouse">
            <div class="wheel"></div>
          </div>
          <div>
            <span class="scroll-arrow"></span>
            <span class="scroll-arrow"></span>
            <span class="scroll-arrow"></span>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="features-section">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Amazing <span>Features</span></h2>
          <p class="section-subtitle">Discover what makes SevenLibrary special</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="100">
            <div class="feature-icon">
              <ion-icon :icon="bookOutline"></ion-icon>
            </div>
            <h3>Vast Collection</h3>
            <p>Access thousands of books across all genres and categories</p>
          </div>
          
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="200">
            <div class="feature-icon">
              <ion-icon :icon="headsetOutline"></ion-icon>
            </div>
            <h3>Audio Books</h3>
            <p>Listen to your favorite books narrated by professional voice actors</p>
          </div>
          
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="300">
            <div class="feature-icon">
              <ion-icon :icon="tabletPortraitOutline"></ion-icon>
            </div>
            <h3>Multi-Device</h3>
            <p>Seamlessly switch between devices while keeping your progress</p>
          </div>
          
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="400">
            <div class="feature-icon">
              <ion-icon :icon="cloudDownloadOutline"></ion-icon>
            </div>
            <h3>Offline Reading</h3>
            <p>Download books to read without an internet connection</p>
          </div>
          
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="500">
            <div class="feature-icon">
              <ion-icon :icon="bookmarksOutline"></ion-icon>
            </div>
            <h3>Bookmarks</h3>
            <p>Save your favorite passages and easily return to them later</p>
          </div>
          
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="600">
            <div class="feature-icon">
              <ion-icon :icon="peopleOutline"></ion-icon>
            </div>
            <h3>Reading Groups</h3>
            <p>Join communities of readers who share your interests</p>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section id="categories" class="categories-section">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Book <span>Categories</span></h2>
          <p class="section-subtitle">Explore our extensive collection of genres</p>
        </div>
        
        <div class="categories-slider" ref="categoriesSlider">
          <div class="category-card" data-aos="fade-right" data-aos-delay="100">
            <div class="category-icon fiction"></div>
            <h3>Fiction</h3>
            <p>2,500+ Books</p>
          </div>
          
          <div class="category-card" data-aos="fade-right" data-aos-delay="200">
            <div class="category-icon science"></div>
            <h3>Science</h3>
            <p>1,800+ Books</p>
          </div>
          
          <div class="category-card" data-aos="fade-right" data-aos-delay="300">
            <div class="category-icon history"></div>
            <h3>History</h3>
            <p>1,200+ Books</p>
          </div>
          
          <div class="category-card" data-aos="fade-right" data-aos-delay="400">
            <div class="category-icon biography"></div>
            <h3>Biography</h3>
            <p>950+ Books</p>
          </div>
          
          <div class="category-card" data-aos="fade-right" data-aos-delay="500">
            <div class="category-icon fantasy"></div>
            <h3>Fantasy</h3>
            <p>1,500+ Books</p>
          </div>
        </div>
        
        <div class="slider-controls">
          <ion-button fill="clear" class="slider-arrow prev" @click="slideCategories('prev')">
            <ion-icon :icon="chevronBackOutline"></ion-icon>
          </ion-button>
          <ion-button fill="clear" class="slider-arrow next" @click="slideCategories('next')">
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </ion-button>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section id="testimonials" class="testimonials-section">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">What Our <span>Readers</span> Say</h2>
          <p class="section-subtitle">Join thousands of satisfied readers</p>
        </div>
        
        <div class="testimonials-container" ref="testimonialsContainer">
          <div class="testimonial" data-aos="fade-up" data-aos-delay="100">
            <div class="testimonial-content">
              <div class="quote-icon">
                <ion-icon :icon="chatbubbleOutline"></ion-icon>
              </div>
              <p>"SevenLibrary has completely transformed how I read. The vast collection and intuitive interface make finding new books a joy."</p>
              <div class="testimonial-author">
                <div class="author-avatar avatar-1"></div>
                <div class="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Avid Reader</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="testimonial" data-aos="fade-up" data-aos-delay="200">
            <div class="testimonial-content">
              <div class="quote-icon">
                <ion-icon :icon="chatbubbleOutline"></ion-icon>
              </div>
              <p>"As a student, SevenLibrary has been invaluable for my research. The ability to access academic resources anywhere is game-changing."</p>
              <div class="testimonial-author">
                <div class="author-avatar avatar-2"></div>
                <div class="author-info">
                  <h4>Michael Chen</h4>
                  <p>Graduate Student</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="testimonial" data-aos="fade-up" data-aos-delay="300">
            <div class="testimonial-content">
              <div class="quote-icon">
                <ion-icon :icon="chatbubbleOutline"></ion-icon>
              </div>
              <p>"The audiobook feature is fantastic! I can now enjoy literature during my commute. The narration quality is superb."</p>
              <div class="testimonial-author">
                <div class="author-avatar avatar-3"></div>
                <div class="author-info">
                  <h4>Emily Rodriguez</h4>
                  <p>Busy Professional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section" data-aos="fade-up">
        <div class="cta-content">
          <h2>Ready to Start Your Reading Journey?</h2>
          <p>Join SevenLibrary today and get access to our entire collection</p>
          <div class="cta-buttons">
            <ion-button class="cta-btn register-btn" @click="navigateTo('/register')">
              Sign Up Now
              <ion-icon slot="end" :icon="personAddOutline"></ion-icon>
            </ion-button>
            <ion-button class="cta-btn login-btn" @click="navigateTo('/login')">
              Login
              <ion-icon slot="end" :icon="logInOutline"></ion-icon>
            </ion-button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="app-footer">
        <div class="footer-content">
          <div class="footer-logo">
            <div class="app-logo">
              <div class="app-logo-inner"></div>
            </div>
            <h3 class="footer-app-name">SEVEN<span>LIBRARY</span></h3>
          </div>
          
          <div class="footer-links">
            <div class="footer-column">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#" @click.prevent="scrollToSection('features')">Features</a></li>
                <li><a href="#" @click.prevent="scrollToSection('categories')">Categories</a></li>
                <li><a href="#" @click.prevent="scrollToSection('testimonials')">Testimonials</a></li>
              </ul>
            </div>
            
            <div class="footer-column">
              <h4>Account</h4>
              <ul>
                <li><a href="#" @click.prevent="navigateTo('/login')">Login</a></li>
                <li><a href="#" @click.prevent="navigateTo('/register')">Register</a></li>
                <li><a href="#">Forgot Password</a></li>
              </ul>
            </div>
            
            <div class="footer-column">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2023 SevenLibrary. All rights reserved.</p>
          <div class="social-icons">
            <a href="#" class="social-icon"><ion-icon :icon="logoFacebook"></ion-icon></a>
            <a href="#" class="social-icon"><ion-icon :icon="logoTwitter"></ion-icon></a>
            <a href="#" class="social-icon"><ion-icon :icon="logoInstagram"></ion-icon></a>
          </div>
        </div>
      </footer>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonContent, 
  IonButton,
  IonIcon
} from '@ionic/vue';
import { 
  menuOutline, 
  closeOutline,
  arrowForwardOutline,
  informationCircleOutline,
  bookOutline,
  headsetOutline,
  tabletPortraitOutline,
  cloudDownloadOutline,
  bookmarksOutline,
  peopleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  chatbubbleOutline,
  personAddOutline,
  logInOutline,
  logoFacebook,
  logoTwitter,
  logoInstagram
} from 'ionicons/icons';
import gsap from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const router = useRouter();
const splashScreen = ref(null);
const mainApp = ref(null);
const heroText = ref(null);
const heroImage = ref(null);
const mobileMenu = ref(null);
const categoriesSlider = ref(null);
const testimonialsContainer = ref(null);
const mobileMenuOpen = ref(false);

// Navigation functions
const navigateTo = (path) => {
  router.push(path);
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToSectionMobile = (sectionId) => {
  toggleMobileMenu();
  setTimeout(() => {
    scrollToSection(sectionId);
  }, 400);
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  
  if (mobileMenuOpen.value) {
    gsap.to(mobileMenu.value, {
      x: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  } else {
    gsap.to(mobileMenu.value, {
      x: '100%',
      duration: 0.4,
      ease: 'power2.in'
    });
  }
};

// Category slider functionality
const slideCategories = (direction) => {
  const slider = categoriesSlider.value;
  const scrollAmount = slider.offsetWidth * 0.8;
  
  if (direction === 'next') {
    gsap.to(slider, {
      scrollLeft: `+=${scrollAmount}`,
      duration: 0.8,
      ease: 'power2.out'
    });
  } else {
    gsap.to(slider, {
      scrollLeft: `-=${scrollAmount}`,
      duration: 0.8,
      ease: 'power2.out'
    });
  }
};

// Splash screen animation
const animateSplashScreen = () => {
  const tl = gsap.timeline();
  
  // Animate the splash screen elements
  tl.from('.splash-logo', { 
    scale: 0, 
    duration: 0.8, 
    ease: 'elastic.out(1, 0.5)' 
  })
  .from('.splash-title', { 
    y: 20, 
    opacity: 0, 
    duration: 0.5 
  }, '-=0.3')
  .from('.splash-loader-bar', { 
    scaleX: 0, 
    duration: 1.5, 
    ease: 'power1.inOut' 
  }, '-=0.2');
  
  // Hide splash screen and show main app
  setTimeout(() => {
    gsap.to(splashScreen.value, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        splashScreen.value.style.display = 'none';
        animateHeroSection();
      }
    });
  }, 2500);
};

// Hero section animation
const animateHeroSection = () => {
  const tl = gsap.timeline();
  
  tl.from('.header-content', { 
    y: -50, 
    opacity: 0, 
    duration: 0.8 
  })
  .from(heroText.value.children, { 
    y: 30, 
    opacity: 0, 
    stagger: 0.2, 
    duration: 0.8 
  }, '-=0.4')
  .from(heroImage.value, { 
    x: 100, 
    opacity: 0, 
    duration: 0.8 
  }, '-=0.6')
  .from('.book', { 
    y: 50, 
    opacity: 0, 
    stagger: 0.15, 
    duration: 0.8 
  }, '-=0.4')
  .from('.floating-element', { 
    scale: 0, 
    opacity: 0, 
    stagger: 0.2, 
    duration: 0.6,
    ease: 'back.out(1.7)'
  }, '-=0.6')
  .from('.scroll-indicator', { 
    y: 20, 
    opacity: 0, 
    duration: 0.5 
  }, '-=0.2');
  
  // Animate floating elements continuously
  gsap.to('.element-1', {
    y: -15,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  gsap.to('.element-2', {
    y: -10,
    duration: 1.5,
    delay: 0.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  gsap.to('.element-3', {
    y: -12,
    duration: 2.2,
    delay: 0.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
};

onMounted(() => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: false
  });
  
  // Start splash screen animation
  animateSplashScreen();
  
  // Set initial position of mobile menu
  if (mobileMenu.value) {
    gsap.set(mobileMenu.value, { x: '100%' });
  }
  
  // Handle scroll events for header
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const toolbar = document.querySelector('.custom-toolbar');
    
    if (scrollPosition > 50) {
      toolbar.classList.add('scrolled');
    } else {
      toolbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});
</script>

<style scoped>
/* Modern Retro Theme Colors */
:root {
  --retro-purple: #7b2cbf;
  --retro-pink: #e0218a;
  --retro-blue: #00b4d8;
  --retro-teal: #06d6a0;
  --retro-yellow: #ffd166;
  --retro-dark: #240046;
  --retro-light: #f8f9fa;
  --retro-gradient: linear-gradient(135deg, #7b2cbf 0%, #e0218a 100%);
  --neon-glow: 0 0 5px rgba(224, 33, 138, 0.8), 0 0 10px rgba(224, 33, 138, 0.6), 0 0 15px rgba(224, 33, 138, 0.4);
}

/* Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Chakra Petch', 'Courier New', monospace;
  color: #fff;
  background-color: var(--retro-dark);
  overflow-x: hidden;
}

.custom-content {
  --background: var(--retro-dark);
  --padding-bottom: 0;
}

/* Splash Screen */
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--retro-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.splash-logo {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: var(--retro-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--neon-glow), 0 10px 20px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
}

.splash-logo-inner {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: #fff;
  position: relative;
}

.splash-logo-inner::before, .splash-logo-inner::after {
  content: '';
  position: absolute;
  background: var(--retro-gradient);
}

.splash-logo-inner::before {
  width: 25px;
  height: 25px;
  top: 12.5px;
  left: 12.5px;
  border-radius: 5px;
}

.splash-title {
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  text-shadow: var(--neon-glow);
  letter-spacing: 3px;
  margin-bottom: 2rem;
}

.splash-title span {
  color: var(--retro-teal);
}

.splash-loader {
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.splash-loader-bar {
  height: 100%;
  width: 100%;
  background: var(--retro-gradient);
  transform-origin: left;
}

/* Header Styles */
.custom-toolbar {
  --background: transparent;
  --border-style: none;
  padding: 10px 0;
  transition: all 0.3s ease;
}

.custom-toolbar.scrolled {
  --background: rgba(36, 0, 70, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  width: 100%;
}

.logo-container {
  display: flex;
  align-items: center;
}

.app-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--retro-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--neon-glow);
  margin-right: 10px;
}

.app-logo-inner {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: #fff;
  position: relative;
}

.app-logo-inner::before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  top: 5px;
  left: 5px;
  border-radius: 2px;
  background: var(--retro-gradient);
}

.app-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  text-shadow: var(--neon-glow);
  letter-spacing: 2px;
  margin: 0;
}

.app-name span {
  color: var(--retro-teal);
}

.nav-buttons {
  display: flex;
  align-items: center;
}

.nav-link {
  --color: rgba(255, 255, 255, 0.8);
  --color-hover: var(--retro-teal);
  --background-hover: transparent;
  font-weight: 600;
  margin: 0 5px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  --color: var(--retro-teal);
  text-shadow: 0 0 5px rgba(6, 214, 160, 0.5);
}

.auth-btn {
  --border-radius: 8px;
  --padding-start: 16px;
  --padding-end: 16px;
  font-weight: 600;
  margin: 0 5px;
}

.login-btn {
  --background: transparent;
  --background-hover: rgba(6, 214, 160, 0.1);
  --color: var(--retro-teal);
  --color-hover: var(--retro-teal);
  --border-style: solid;
  --border-color: var(--retro-teal);
  --border-width: 2px;
}

.register-btn {
  --background: var(--retro-gradient);
  --background-hover: linear-gradient(135deg, #8a2be2 0%, #ff1493 100%);
  --color: white;
  --color-hover: white;
  box-shadow: 0 4px 10px rgba(123, 44, 191, 0.4);
}

.menu-toggle {
  display: none;
  --color: #fff;
  --padding-start: 8px;
  --padding-end: 8px;
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background: rgba(36, 0, 70, 0.95);
  backdrop-filter: blur(10px);
  z-index: 9998;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.5);
  padding: 20px;
  transform: translateX(100%);
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu-header h3 {
  color: var(--retro-teal);
  font-size: 1.5rem;
  margin: 0;
}

.close-menu {
  --color: rgba(255, 255, 255, 0.8);
  --padding-start: 8px;
  --padding-end: 8px;
}

.mobile-menu-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-nav-link {
  --color: rgba(255, 255, 255, 0.8);
  --background-hover: rgba(255, 255, 255, 0.1);
  font-weight: 600;
  text-align: left;
  --padding-start: 0;
}

.mobile-auth-btn {
  margin-top: 10px;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  overflow: hidden;
}

.retro-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(123, 44, 191, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(123, 44, 191, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: 1;
  perspective: 1000px;
  transform-style: preserve-3d;
  transform: rotateX(60deg) translateZ(-100px);
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 30px 30px;
  }
}

.retro-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: rgba(224, 33, 138, 0.3);
  top: -100px;
  right: -100px;
  animation: floatAnimation 8s ease-in-out infinite alternate;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: rgba(6, 214, 160, 0.2);
  bottom: -150px;
  left: -150px;
  animation: floatAnimation 10s ease-in-out infinite alternate-reverse;
}

.retro-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(90deg, transparent 49.5%, rgba(255, 209, 102, 0.1) 50%, transparent 50.5%),
    linear-gradient(180deg, transparent 49.5%, rgba(255, 209, 102, 0.1) 50%, transparent 50.5%);
  background-size: 100px 100px;
  opacity: 0.5;
  z-index: 0;
}

@keyframes floatAnimation {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, 30px);
  }
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero-text {
  flex: 1;
  padding-right: 40px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 20px;
  line-height: 1.2;
  text-shadow: var(--neon-glow);
}

.hero-title span {
  color: var(--retro-teal);
  position: relative;
  display: inline-block;
}

.hero-title span::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--retro-gradient);
  border-radius: 2px;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  max-width: 500px;
}

.hero-buttons {
  display: flex;
  gap: 15px;
}

.get-started-btn {
  --background: var(--retro-gradient);
  --background-hover: linear-gradient(135deg, #8a2be2 0%, #ff1493 100%);
  --color: white;
  --border-radius: 8px;
  --padding-start: 20px;
  --padding-end: 20px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(123, 44, 191, 0.5);
  height: 48px;
}

.learn-more-btn {
  --color: var(--retro-teal);
  --background-hover: rgba(6, 214, 160, 0.1);
  --border-radius: 8px;
  font-weight: 600;
  height: 48px;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
}

.book-stack {
  position: relative;
  width: 300px;
  height: 400px;
}

.book {
  position: absolute;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.book-1 {
  width: 200px;
  height: 300px;
  background: linear-gradient(135deg, #7b2cbf 0%, #3c096c 100%);
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) rotate(-5deg);
  z-index: 1;
}

.book-2 {
  width: 220px;
  height: 320px;
  background: linear-gradient(135deg, #e0218a 0%, #9d0191 100%);
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) rotate(5deg);
  z-index: 2;
}

.book-3 {
  width: 240px;
  height: 340px;
  background: linear-gradient(135deg, #06d6a0 0%, #1b9aaa 100%);
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.floating-element {
  position: absolute;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.floating-element ion-icon {
  font-size: 24px;
  color: #fff;
}

.element-1 {
  top: 20%;
  left: 0;
  background: rgba(123, 44, 191, 0.3);
}

.element-2 {
  top: 60%;
  right: 0;
  background: rgba(224, 33, 138, 0.3);
}

.element-3 {
  top: 30%;
  right: 20%;
  background: rgba(6, 214, 160, 0.3);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 2;
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  position: relative;
  margin-bottom: 10px;
}

.wheel {
  width: 6px;
  height: 10px;
  background: var(--retro-teal);
  border-radius: 3px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollWheel 1.5s infinite;
}

@keyframes scrollWheel {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(15px);
  }
}

.scroll-arrow {
  display: block;
  width: 10px;
  height: 10px;
  border-right: 2px solid rgba(255, 255, 255, 0.5);
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  transform: rotate(45deg);
  margin: -5px;
  animation: scrollArrow 1.5s infinite;
}

.scroll-arrow:nth-child(2) {
  animation-delay: 0.2s;
}

.scroll-arrow:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes scrollArrow {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* Section Styles */
section {
  padding: 80px 20px;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 15px;
  text-shadow: 0 0 10px rgba(123, 44, 191, 0.5);
}

.section-title span {
  color: var(--retro-teal);
  position: relative;
}

.section-title span::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--retro-gradient);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
}

/* Features Section */
.features-section {
  background: linear-gradient(180deg, var(--retro-dark) 0%, #1a0033 100%);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(36, 0, 70, 0.5);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(123, 44, 191, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: var(--retro-teal);
}

.feature-icon {
  width: 70px;
  height: 70px;
  background: var(--retro-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 5px 15px rgba(123, 44, 191, 0.5);
}

.feature-icon ion-icon {
  font-size: 32px;
  color: #fff;
}

.feature-card h3 {
  font-size: 1.5rem;
  color: var(--retro-teal);
  margin-bottom: 15px;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* Categories Section */
.categories-section {
  background: linear-gradient(180deg, #1a0033 0%, var(--retro-dark) 100%);
  overflow: hidden;
}

.categories-slider {
  display: flex;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto 30px;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scroll-behavior: smooth;
  padding: 20px 0;
}

.categories-slider::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.category-card {
  min-width: 250px;
  background: rgba(36, 0, 70, 0.5);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(123, 44, 191, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: var(--retro-teal);
}

.category-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 20px;
  background-position: center;
  background-size: cover;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.fiction {
  background: linear-gradient(135deg, #7b2cbf 0%, #3c096c 100%);
}

.science {
  background: linear-gradient(135deg, #06d6a0 0%, #1b9aaa 100%);
}

.history {
  background: linear-gradient(135deg, #ffd166 0%, #ef476f 100%);
}

.biography {
  background: linear-gradient(135deg, #e0218a 0%, #9d0191 100%);
}

.fantasy {
  background: linear-gradient(135deg, #00b4d8 0%, #0077b6 100%);
}

.category-card h3 {
  font-size: 1.5rem;
  color: var(--retro-teal);
  margin-bottom: 10px;
}

.category-card p {
  color: rgba(255, 255, 255, 0.7);
}

.slider-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.slider-arrow {
  --background: rgba(123, 44, 191, 0.3);
  --background-hover: var(--retro-gradient);
  --color: #fff;
  --border-radius: 50%;
  width: 50px;
  height: 50px;
  --padding-start: 0;
  --padding-end: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Testimonials Section */
.testimonials-section {
  background: linear-gradient(180deg, var(--retro-dark) 0%, #1a0033 100%);
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial {
  height: 100%;
}

.testimonial-content {
  background: rgba(36, 0, 70, 0.5);
  border-radius: 16px;
  padding: 30px;
  height: 100%;
  transition: all 0.3s ease;
  border: 1px solid rgba(123, 44, 191, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
}

.testimonial-content:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: var(--retro-teal);
}

.quote-icon {
  position: absolute;
  top: -20px;
  left: 30px;
  width: 40px;
  height: 40px;
  background: var(--retro-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(123, 44, 191, 0.5);
}

.quote-icon ion-icon {
  font-size: 20px;
  color: #fff;
}

.testimonial-content p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: 20px;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  background-color: var(--retro-teal);
  background-position: center;
  background-size: cover;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.avatar-1 {
  background-color: var(--retro-pink);
}

.avatar-2 {
  background-color: var(--retro-blue);
}

.avatar-3 {
  background-color: var(--retro-yellow);
}

/* CTA Section */
.cta-section {
  background: var(--retro-gradient);
  padding: 80px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 1;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.cta-section h2 {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 15px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.cta-section p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.cta-btn {
  --border-radius: 8px;
  --padding-start: 25px;
  --padding-end: 25px;
  font-weight: 600;
  height: 50px;
}

.cta-btn.register-btn {
  --background: #fff;
  --background-hover: rgba(255, 255, 255, 0.9);
  --color: var(--retro-purple);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.cta-btn.login-btn {
  --background: transparent;
  --background-hover: rgba(255, 255, 255, 0.1);
  --color: #fff;
  --border-style: solid;
  --border-color: #fff;
  --border-width: 2px;
}

/* Footer */
.app-footer {
  background: #1a0033;
  padding: 60px 20px 30px;
  color: rgba(255, 255, 255, 0.7);
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto 40px;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.footer-app-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  text-shadow: var(--neon-glow);
  letter-spacing: 2px;
  margin: 0 0 0 10px;
}

.footer-app-name span {
  color: var(--retro-teal);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.footer-column h4 {
  color: var(--retro-teal);
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 10px;
}

.footer-column a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-column a:hover {
  color: var(--retro-teal);
  text-shadow: 0 0 5px rgba(6, 214, 160, 0.5);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.7);
}

.social-icon:hover {
  background: var(--retro-gradient);
  color: #fff;
  transform: translateY(-3px);
}

.social-icon ion-icon {
  font-size: 20px;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-text {
    padding-right: 0;
    margin-bottom: 50px;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .nav-buttons {
    display: none;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .footer-content {
    flex-direction: column;
  }
  
  .footer-links {
    margin-top: 30px;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 20px;
  }
  
  .splash-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .feature-card, .category-card, .testimonial-content {
    padding: 20px;
  }
  
  .app-name, .footer-app-name {
    font-size: 1.2rem;
  }
  
  .splash-title {
    font-size: 2rem;
  }
  
  .splash-logo {
    width: 80px;
    height: 80px;
  }
  
  .splash-logo-inner {
    width: 40px;
    height: 40px;
  }
  
  .splash-logo-inner::before {
    width: 20px;
    height: 20px;
    top: 10px;
    left: 10px;
  }
}
</style>