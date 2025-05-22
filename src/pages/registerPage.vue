<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Retro Background Elements (same as login page) -->
      <div class="retro-background">
        <div class="grid-overlay"></div>
        <div class="retro-circle circle-1"></div>
        <div class="retro-circle circle-2"></div>
        <div class="retro-lines"></div>
      </div>
      
      <div class="auth-container">
        <!-- Logo Section -->
        <div class="logo-section">
          <div class="logo">
            <div class="logo-inner"></div>
          </div>
          <h1 class="app-title">SEVEN<span>LIBRARY</span></h1>
        </div>
        
        <!-- Register Form Card -->
        <div class="auth-card">
          <h2 class="card-title">REGISTER</h2>
          
          <form @submit.prevent="handleRegister" class="auth-form">
            <!-- Username Field -->
            <div class="form-group" :class="{ 'has-error': errors.username }">
              <label for="username">USERNAME</label>
              <div class="input-wrapper">
                <ion-icon :icon="personOutline" class="input-icon"></ion-icon>
                <input
                  v-model="form.username"
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  @focus="clearError('username')"
                  @input="checkUsername"
                />
              </div>
              <div class="error-text" v-if="errors.username">{{ errors.username }}</div>
            </div>
            
            <!-- Password Field -->
            <div class="form-group" :class="{ 'has-error': errors.password }">
              <label for="password">PASSWORD</label>
              <div class="input-wrapper">
                <ion-icon :icon="lockClosedOutline" class="input-icon"></ion-icon>
                <input
                  v-model="form.password"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Create a password"
                  @focus="clearError('password')"
                  @input="checkPasswordStrength"
                />
                <ion-icon 
                  :icon="showPassword ? eyeOffOutline : eyeOutline" 
                  class="toggle-password"
                  @click="showPassword = !showPassword"
                ></ion-icon>
              </div>
              <div class="password-strength" v-if="form.password">
                <div class="strength-text">Strength: {{ passwordStrength.text }}</div>
                <div class="strength-bar">
                  <div 
                    class="strength-indicator" 
                    :style="{ width: passwordStrength.percentage + '%', backgroundColor: passwordStrength.color }"
                  ></div>
                </div>
              </div>
              <div class="error-text" v-if="errors.password">{{ errors.password }}</div>
            </div>
            
            <!-- Confirm Password Field -->
            <div class="form-group" :class="{ 'has-error': errors.confirmPassword }">
              <label for="confirmPassword">CONFIRM PASSWORD</label>
              <div class="input-wrapper">
                <ion-icon :icon="lockClosedOutline" class="input-icon"></ion-icon>
                <input
                  v-model="form.confirmPassword"
                  id="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm your password"
                  @focus="clearError('confirmPassword')"
                  @input="checkPasswordMatch"
                />
                <ion-icon 
                  :icon="showConfirmPassword ? eyeOffOutline : eyeOutline" 
                  class="toggle-password"
                  @click="showConfirmPassword = !showConfirmPassword"
                ></ion-icon>
              </div>
              <div class="error-text" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</div>
            </div>
            
            <!-- Role Selection -->
            <div class="form-group" :class="{ 'has-error': errors.role }">
              <label>ROLE</label>
              <div class="role-selector">
                <div 
                  class="role-option" 
                  :class="{ 'selected': form.role === 'user' }"
                  @click="form.role = 'user'"
                >
                  <ion-icon :icon="personOutline"></ion-icon>
                  <span>User</span>
                </div>
                <div 
                  class="role-option" 
                  :class="{ 'selected': form.role === 'admin' }"
                  @click="form.role = 'admin'"
                >
                  <ion-icon :icon="shieldOutline"></ion-icon>
                  <span>Admin</span>
                </div>
              </div>
              <div class="error-text" v-if="errors.role">{{ errors.role }}</div>
            </div>
            
            <!-- Terms and Conditions -->
            <div class="form-group" :class="{ 'has-error': errors.terms }">
              <label class="checkbox-container">
                <input type="checkbox" v-model="form.acceptTerms" @change="clearError('terms')" />
                <span class="checkmark"></span>
                <span>I accept the <a href="#" @click.prevent="showTerms">Terms and Conditions</a></span>
              </label>
              <div class="error-text" v-if="errors.terms">{{ errors.terms }}</div>
            </div>
            
            <!-- Register Button -->
            <button 
              type="submit" 
              class="auth-button" 
              :disabled="isLoading"
            >
              <span v-if="!isLoading">REGISTER</span>
              <ion-spinner v-else name="dots" class="button-spinner"></ion-spinner>
            </button>
            
            <!-- Status Messages -->
            <div class="status-message" v-if="statusMessage.text">
              <ion-icon :icon="statusMessage.icon" class="status-icon"></ion-icon>
              <span :class="statusMessage.type">{{ statusMessage.text }}</span>
            </div>
          </form>
          
          <!-- Login Link -->
          <div class="auth-footer">
            <p>Already have an account?</p>
            <button @click="goToLogin" class="secondary-button">LOGIN</button>
          </div>
        </div>
      </div>
      
      <!-- Terms Modal -->
      <ion-modal :is-open="showTermsModal" @didDismiss="showTermsModal = false">
        <div class="terms-modal">
          <div class="terms-header">
            <h3>Terms and Conditions</h3>
            <ion-icon :icon="closeOutline" class="close-icon" @click="showTermsModal = false"></ion-icon>
          </div>
          <div class="terms-content">
            <p>Welcome to our application. By using our services, you agree to the following terms:</p>
            <ol>
              <li>You must be at least 18 years old to use this service.</li>
              <li>You are responsible for maintaining the confidentiality of your account.</li>
              <li>You agree not to use the service for any illegal or unauthorized purpose.</li>
              <li>We reserve the right to modify or terminate the service for any reason.</li>
              <li>Your use of the service is at your sole risk.</li>
            </ol>
            <p>These terms may be updated from time to time. It is your responsibility to check for updates.</p>
          </div>
          <button class="auth-button" @click="acceptTerms">I ACCEPT</button>
        </div>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { 
  IonContent, 
  IonPage,
  IonIcon,
  IonSpinner,
  IonModal
} from '@ionic/vue';
import { 
  personOutline, 
  lockClosedOutline, 
  eyeOutline, 
  eyeOffOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  shieldOutline,
  closeOutline
} from 'ionicons/icons';

const router = useRouter();

// Form state
const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  role: 'user',
  acceptTerms: false
});

const errors = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  role: '',
  terms: ''
});

const isLoading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showTermsModal = ref(false);
const usernameAvailable = ref(true);
const usernameChecking = ref(false);

const statusMessage = reactive({
  text: '',
  type: '',
  icon: alertCircleOutline
});

// Password strength calculation
const passwordStrength = computed(() => {
  if (!form.password) {
    return { text: 'None', percentage: 0, color: '#e0218a' };
  }
  
  let strength = 0;
  let feedback = '';
  
  // Length check
  if (form.password.length >= 8) {
    strength += 25;
  }
  
  // Contains lowercase
  if (/[a-z]/.test(form.password)) {
    strength += 25;
  }
  
  // Contains uppercase
  if (/[A-Z]/.test(form.password)) {
    strength += 25;
  }
  
  // Contains number or special char
  if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
    strength += 25;
  }
  
  // Determine text and color based on strength
  let color = '';
  if (strength < 25) {
    feedback = 'Weak';
    color = '#e0218a'; // Pink
  } else if (strength < 50) {
    feedback = 'Fair';
    color = '#ffd166'; // Yellow
  } else if (strength < 75) {
    feedback = 'Good';
    color = '#00b4d8'; // Blue
  } else {
    feedback = 'Strong';
    color = '#06d6a0'; // Teal
  }
  
  return {
    text: feedback,
    percentage: strength,
    color: color
  };
});

// Add entrance animation on mount
onMounted(() => {
  document.querySelector('.auth-container')?.classList.add('fade-in');
});

// Clear error when user focuses on a field
const clearError = (field: string) => {
  errors[field as keyof typeof errors] = '';
  statusMessage.text = '';
};

// Check if username is available
const checkUsername = async () => {
  if (form.username.length < 3) return;
  
  // Debounce the API call
  clearTimeout(window.usernameTimeout);
  usernameChecking.value = true;
  
  window.usernameTimeout = setTimeout(async () => {
    try {
      // This is a mock check - in a real app, you'd call an API endpoint
      // that checks if the username exists
      const response = await axios.post('http://localhost/belajar-api/check-username.php', {
        username: form.username
      });
      
      // Since the API might not exist, we'll simulate a response
      // In a real app, you'd use the actual response
      usernameAvailable.value = true;
      
      if (!usernameAvailable.value) {
        errors.username = 'Username is already taken';
      }
    } catch (error) {
      console.error('Error checking username:', error);
      // For demo purposes, we'll assume the username is available
      usernameAvailable.value = true;
    } finally {
      usernameChecking.value = false;
    }
  }, 500);
};

// Check password strength
const checkPasswordStrength = () => {
  // The computed property handles this
  if (form.confirmPassword) {
    checkPasswordMatch();
  }
};

// Check if passwords match
const checkPasswordMatch = () => {
  if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  } else {
    errors.confirmPassword = '';
  }
};

// Show terms modal
const showTerms = () => {
  showTermsModal.value = true;
};

// Accept terms from modal
const acceptTerms = () => {
  form.acceptTerms = true;
  showTermsModal.value = false;
  clearError('terms');
};

// Form validation
const validateForm = () => {
  let isValid = true;
  
  if (!form.username.trim()) {
    errors.username = 'Username is required';
    isValid = false;
  } else if (form.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
    isValid = false;
  } else if (!usernameAvailable.value) {
    errors.username = 'Username is already taken';
    isValid = false;
  }
  
  if (!form.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  } else if (passwordStrength.value.percentage < 50) {
    errors.password = 'Password is too weak';
    isValid = false;
  }
  
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
    isValid = false;
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }
  
  if (!form.role) {
    errors.role = 'Please select a role';
    isValid = false;
  }
  
  if (!form.acceptTerms) {
    errors.terms = 'You must accept the terms and conditions';
    isValid = false;
  }
  
  return isValid;
};

// Handle registration submission
const handleRegister = async () => {
  // Reset status and errors
  statusMessage.text = '';
  statusMessage.type = '';
  
  // Validate form
  if (!validateForm()) {
    shakeForm();
    return;
  }
  
  isLoading.value = true;
  
  try {
    const response = await axios.post('http://localhost/belajar-api/register.php', {
      username: form.username,
      password: form.password,
      role: form.role
    });

    const result = response.data;

    if (result.status === 'success') {
      // Show success message
      statusMessage.text = result.msg || 'Registration successful!';
      statusMessage.type = 'success';
      statusMessage.icon = checkmarkCircleOutline;
      
      // Navigate after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      // Show error message
      statusMessage.text = result.msg || 'Registration failed';
      statusMessage.type = 'error';
      statusMessage.icon = alertCircleOutline;
      shakeForm();
    }
  } catch (error) {
    console.error("Error on posting data:", error);
    statusMessage.text = 'Server error or connection failed';
    statusMessage.type = 'error';
    statusMessage.icon = alertCircleOutline;
    shakeForm();
  } finally {
    isLoading.value = false;
  }
};

// Navigate to login page
const goToLogin = () => {
  router.push('/login');
};

// Animation for form validation errors
const shakeForm = () => {
  const form = document.querySelector('.auth-form');
  form?.classList.add('shake');
  setTimeout(() => {
    form?.classList.remove('shake');
  }, 500);
};
</script>

<style scoped>
/* Import the same base styles from LoginPage.vue */
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
ion-content {
  --background: #0f0326;
  font-family: 'Chakra Petch', 'Courier New', monospace;
}

/* Retro Background Elements */
.retro-background {
  position: fixed;
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

/* Main Container */
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 2rem;
  position: relative;
  z-index: 10;
  opacity: 0;
  transform: translateY(20px);
}

.fade-in {
  animation: fadeIn 0.8s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo Section */
.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.logo {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background: var(--retro-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--neon-glow), 0 10px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
}

.logo-inner {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #fff;
  position: relative;
}

.logo-inner::before, .logo-inner::after {
  content: '';
  position: absolute;
  background: var(--retro-gradient);
}

.logo-inner::before {
  width: 20px;
  height: 20px;
  top: 10px;
  left: 10px;
  border-radius: 4px;
}

.app-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  text-shadow: var(--neon-glow);
  letter-spacing: 3px;
  margin: 0;
}

.app-title span {
  color: var(--retro-teal);
}

/* Auth Card */
.auth-card {
  width: 100%;
  max-width: 400px;
  background: rgba(15, 3, 38, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(123, 44, 191, 0.3);
  position: relative;
  overflow: hidden;
}

.auth-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: var(--retro-gradient);
}

.card-title {
  font-size: 1.8rem;
  color: #fff;
  text-align: center;
  margin-top: 0;
  margin-bottom: 2rem;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
  width: 100%;
}

.card-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: var(--retro-gradient);
  border-radius: 3px;
}

/* Form Styling */
.auth-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.form-group.has-error .input-wrapper {
  border-color: var(--retro-pink);
}

label {
  display: block;
  color: var(--retro-teal);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid rgba(123, 44, 191, 0.5);
  border-radius: 8px;
  background: rgba(15, 3, 38, 0.5);
  transition: all 0.3s ease;
}

.input-wrapper:focus-within {
  border-color: var(--retro-teal);
  box-shadow: 0 0 0 3px rgba(6, 214, 160, 0.2);
}

.input-icon {
  margin: 0 10px;
  font-size: 1.2rem;
  color: var(--retro-teal);
}

input {
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  padding: 12px 10px;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.toggle-password {
  margin: 0 10px;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.error-text {
  color: var(--retro-pink);
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
}

/* Password Strength */
.password-strength {
  margin-top: 0.5rem;
  font-size: 0.8rem;
}

.strength-text {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.25rem;
}

.strength-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.strength-indicator {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
}

/* Role Selector */
.role-selector {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.role-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 2px solid rgba(123, 44, 191, 0.5);
  border-radius: 8px;
  background: rgba(15, 3, 38, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.role-option:hover {
  background: rgba(123, 44, 191, 0.1);
}

.role-option.selected {
  border-color: var(--retro-teal);
  background: rgba(6, 214, 160, 0.1);
}

.role-option ion-icon {
  font-size: 1.5rem;
  color: var(--retro-teal);
  margin-bottom: 0.5rem;
}

.role-option span {
  color: #fff;
  font-size: 0.9rem;
}

/* Checkbox Container */
.checkbox-container {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  background-color: rgba(15, 3, 38, 0.8);
  border: 2px solid var(--retro-teal);
  border-radius: 4px;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: rgba(6, 214, 160, 0.1);
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--retro-teal);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-container a {
  color: var(--retro-teal);
  text-decoration: none;
}

.checkbox-container a:hover {
  text-decoration: underline;
}

/* Buttons */
.auth-button {
  width: 100%;
  padding: 14px;
  background: var(--retro-gradient);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(123, 44, 191, 0.4);
}

.auth-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(45deg);
  transition: transform 0.6s ease;
  z-index: 1;
}

.auth-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(123, 44, 191, 0.6);
}

.auth-button:hover::before {
  transform: rotate(45deg) translate(100%, 100%);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-spinner {
  color: white;
}

.secondary-button {
  background: transparent;
  border: 2px solid var(--retro-teal);
  color: var(--retro-teal);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.secondary-button:hover {
  background: rgba(6, 214, 160, 0.1);
  transform: translateY(-2px);
}

/* Status Message */
.status-message {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.9rem;
  animation: fadeIn 0.3s ease;
}

.status-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}

.status-message .error {
  color: var(--retro-pink);
}

.status-message .success {
  color: var(--retro-teal);
}

.status-message .info {
  color: var(--retro-blue);
}

/* Auth Footer */
.auth-footer {
  margin-top: 2rem;
  text-align: center;
}

.auth-footer p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
}

/* Terms Modal */
.terms-modal {
  background: var(--retro-dark);
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  margin: 2rem auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(123, 44, 191, 0.5);
  color: #fff;
}

.terms-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid rgba(123, 44, 191, 0.5);
  padding-bottom: 1rem;
}

.terms-header h3 {
  margin: 0;
  color: var(--retro-teal);
  font-size: 1.5rem;
}

.close-icon {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.close-icon:hover {
  color: var(--retro-pink);
}

.terms-content {
  margin-bottom: 2rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 1rem;
}

.terms-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.terms-content ol {
  padding-left: 1.5rem;
}

.terms-content li {
  margin-bottom: 0.5rem;
}

/* Animations */
.shake {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

/* Responsive Adjustments */
@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
  }
  
  .app-title {
    font-size: 2rem;
  }
  
  .card-title {
    font-size: 1.5rem;
  }
  
  .role-selector {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>