<template>
  <div class="user-management" :class="{ 'dark': isDarkMode }">
    <div class="overlay" @click="$emit('close')"></div>
    
    <div class="management-container">
      <div class="management-header">
        <div class="header-title">
          <h2>User Management</h2>
          <p>Add, edit, and manage user accounts</p>
        </div>
        
        <div class="header-actions">
          <div class="search-box">
            <ion-icon :icon="searchOutline"></ion-icon>
            <input 
              type="text" 
              placeholder="Search users..." 
              v-model="searchQuery"
              @input="filterUsers"
            />
            <button v-if="searchQuery" class="clear-search" @click="clearSearch">
              <ion-icon :icon="closeCircleOutline"></ion-icon>
            </button>
          </div>
          
          <ion-button class="add-button" @click="openAddModal">
            <ion-icon :icon="addOutline" slot="start"></ion-icon>
            Add User
          </ion-button>
          
          <ion-button fill="clear" class="close-button" @click="$emit('close')">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </div>
      </div>
      
      <div class="management-content">
        <!-- Loading State -->
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <p>Loading users...</p>
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="error-container">
          <div class="error-icon">
            <ion-icon :icon="alertCircleOutline"></ion-icon>
          </div>
          <h3>Oops! Something went wrong</h3>
          <p>{{ error }}</p>
          <button class="retry-btn" @click="fetchUsers">
            <ion-icon :icon="refreshOutline"></ion-icon>
            Retry
          </button>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="users.length === 0 && !isLoading" class="empty-container">
          <div class="empty-icon">
            <ion-icon :icon="peopleOutline"></ion-icon>
          </div>
          <h3>No Users Found</h3>
          <p>Get started by adding your first user</p>
          <button class="add-user-btn" @click="openAddModal">
            <ion-icon :icon="addOutline"></ion-icon>
            Add User
          </button>
        </div>
        
        <!-- Users Table -->
        <div v-else class="users-table-container">
          <table class="users-table">
            <thead>
              <tr>
                <th>
                  <div class="th-content">
                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                  </div>
                </th>
                <th>
                  <div class="th-content">
                    <span>Name</span>
                    <div class="sort-icons">
                      <ion-icon :icon="caretUpOutline" @click="sortUsers('full_name', 'asc')"></ion-icon>
                      <ion-icon :icon="caretDownOutline" @click="sortUsers('full_name', 'desc')"></ion-icon>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="th-content">
                    <span>Username</span>
                    <div class="sort-icons">
                      <ion-icon :icon="caretUpOutline" @click="sortUsers('username', 'asc')"></ion-icon>
                      <ion-icon :icon="caretDownOutline" @click="sortUsers('username', 'desc')"></ion-icon>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="th-content">
                    <span>Role</span>
                    <div class="sort-icons">
                      <ion-icon :icon="caretUpOutline" @click="sortUsers('role', 'asc')"></ion-icon>
                      <ion-icon :icon="caretDownOutline" @click="sortUsers('role', 'desc')"></ion-icon>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="th-content">
                    <span>Class</span>
                    <div class="sort-icons">
                      <ion-icon :icon="caretUpOutline" @click="sortUsers('class', 'asc')"></ion-icon>
                      <ion-icon :icon="caretDownOutline" @click="sortUsers('class', 'desc')"></ion-icon>
                    </div>
                  </div>
                </th>
                <th>
                  <div class="th-content">
                    <span>Email</span>
                    <div class="sort-icons">
                      <ion-icon :icon="caretUpOutline" @click="sortUsers('email', 'asc')"></ion-icon>
                      <ion-icon :icon="caretDownOutline" @click="sortUsers('email', 'desc')"></ion-icon>
                    </div>
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in paginatedUsers" :key="user.id" :class="{ 'selected': selectedUsers.includes(user.id) }">
                <td>
                  <input 
                    type="checkbox" 
                    :checked="selectedUsers.includes(user.id)" 
                    @change="toggleUserSelection(user.id)" 
                  />
                </td>
                <td>
                  <div class="user-info">
                    <div class="user-avatar" :style="{ backgroundColor: getUserColor(user.full_name) }">
                      {{ getUserInitials(user.full_name) }}
                    </div>
                    <span>{{ user.full_name }}</span>
                  </div>
                </td>
                <td>{{ user.username }}</td>
                <td>
                  <span class="role-badge" :class="user.role">{{ user.role }}</span>
                </td>
                <td>{{ user.class }}</td>
                <td>
                  <span class="email-cell">{{ user.email }}</span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="action-btn view" @click="viewUserDetails(user)" title="View Details">
                      <ion-icon :icon="eyeOutline"></ion-icon>
                    </button>
                    <button class="action-btn edit" @click="openEditModal(user)" title="Edit User">
                      <ion-icon :icon="createOutline"></ion-icon>
                    </button>
                    <button class="action-btn delete" @click="openDeleteModal(user)" title="Delete User">
                      <ion-icon :icon="trashOutline"></ion-icon>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredUsers.length === 0">
                <td colspan="7" class="no-results">
                  <div class="no-data">
                    <ion-icon :icon="searchOutline" size="large"></ion-icon>
                    <p>No users found matching your search criteria.</p>
                    <button class="clear-filter-btn" @click="clearSearch">Clear Search</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Bulk Actions -->
        <div v-if="selectedUsers.length > 0" class="bulk-actions">
          <div class="selected-count">
            {{ selectedUsers.length }} user{{ selectedUsers.length > 1 ? 's' : '' }} selected
          </div>
          <div class="bulk-buttons">
            <button class="bulk-btn delete" @click="openBulkDeleteModal">
              <ion-icon :icon="trashOutline"></ion-icon>
              Delete
            </button>
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="!isLoading && users.length > 0" class="pagination">
          <div class="pagination-info">
            Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ totalUsers }} users
          </div>
          <div class="pagination-controls">
            <button 
              class="pagination-btn" 
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              <ion-icon :icon="chevronBackOutline"></ion-icon>
            </button>
            
            <div class="pagination-pages">
              <button 
                v-for="page in displayedPages" 
                :key="page" 
                class="page-btn" 
                :class="{ 'active': currentPage === page }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              class="pagination-btn" 
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
            >
              <ion-icon :icon="chevronForwardOutline"></ion-icon>
            </button>
          </div>
          
          <div class="items-per-page">
            <span>Items per page:</span>
            <select v-model="itemsPerPage" @change="changePage(1)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Add/Edit User Modal -->
    <div class="modal" v-if="showModal">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-container" data-aos="zoom-in" data-aos-duration="300">
        <div class="modal-header">
          <h3>{{ isEditing ? 'Edit User' : 'Add New User' }}</h3>
          <button class="modal-close" @click="closeModal">
            <ion-icon :icon="closeOutline"></ion-icon>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="form-grid">
            <div class="form-group">
              <label for="fullName">Full Name <span class="required">*</span></label>
              <input 
                type="text" 
                id="fullName" 
                v-model="formData.full_name" 
                placeholder="Enter full name"
                :class="{ 'error': formErrors.full_name }"
              />
              <span class="error-message" v-if="formErrors.full_name">{{ formErrors.full_name }}</span>
            </div>
            
            <div class="form-group">
              <label for="username">Username <span class="required">*</span></label>
              <input 
                type="text" 
                id="username" 
                v-model="formData.username" 
                placeholder="Enter username"
                :class="{ 'error': formErrors.username }"
              />
              <span class="error-message" v-if="formErrors.username">{{ formErrors.username }}</span>
            </div>
            
            <div class="form-group" v-if="!isEditing">
              <label for="password">Password <span class="required">*</span></label>
              <div class="password-input">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="formData.password" 
                  placeholder="Enter password"
                  :class="{ 'error': formErrors.password }"
                />
                <button class="toggle-password" @click="showPassword = !showPassword">
                  <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline"></ion-icon>
                </button>
              </div>
              <span class="error-message" v-if="formErrors.password">{{ formErrors.password }}</span>
              <div class="password-strength" v-if="formData.password">
                <div class="strength-meter">
                  <div 
                    class="strength-value" 
                    :style="{ width: passwordStrength.score * 25 + '%' }"
                    :class="passwordStrength.class"
                  ></div>
                </div>
                <span class="strength-text" :class="passwordStrength.class">{{ passwordStrength.text }}</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="role">Role <span class="required">*</span></label>
              <select 
                id="role" 
                v-model="formData.role"
                :class="{ 'error': formErrors.role }"
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="librarian">Librarian</option>
                <option value="user">User</option>
              </select>
              <span class="error-message" v-if="formErrors.role">{{ formErrors.role }}</span>
            </div>
            
            <div class="form-group">
              <label for="class">Class <span class="required">*</span></label>
              <input 
                type="text" 
                id="class" 
                v-model="formData.class" 
                placeholder="Enter class"
                :class="{ 'error': formErrors.class }"
              />
              <span class="error-message" v-if="formErrors.class">{{ formErrors.class }}</span>
            </div>
            
            <div class="form-group">
              <label for="email">Email <span class="required">*</span></label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                placeholder="Enter email address"
                :class="{ 'error': formErrors.email }"
              />
              <span class="error-message" v-if="formErrors.email">{{ formErrors.email }}</span>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeModal">Cancel</button>
          <button class="save-btn" @click="saveUser" :disabled="isSubmitting">
            <span v-if="isSubmitting">
              <ion-icon :icon="refreshOutline" class="spin"></ion-icon>
              {{ isEditing ? 'Updating...' : 'Adding...' }}
            </span>
            <span v-else>{{ isEditing ? 'Update User' : 'Add User' }}</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- View User Details Modal -->
    <div class="modal" v-if="showViewModal">
      <div class="modal-overlay" @click="closeViewModal"></div>
      <div class="modal-container view-modal" data-aos="zoom-in" data-aos-duration="300">
        <div class="modal-header">
          <h3>User Details</h3>
          <button class="modal-close" @click="closeViewModal">
            <ion-icon :icon="closeOutline"></ion-icon>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="user-profile" v-if="selectedUser">
            <div class="user-profile-header">
              <div class="user-avatar large" :style="{ backgroundColor: getUserColor(selectedUser.full_name) }">
                {{ getUserInitials(selectedUser.full_name) }}
              </div>
              <div class="user-profile-info">
                <h2>{{ selectedUser.full_name }}</h2>
                <div class="user-badges">
                  <span class="role-badge" :class="selectedUser.role">{{ selectedUser.role }}</span>
                </div>
              </div>
            </div>
            
            <div class="user-details-grid">
              <div class="detail-item">
                <div class="detail-label">
                  <ion-icon :icon="personOutline"></ion-icon>
                  <span>Username</span>
                </div>
                <div class="detail-value">{{ selectedUser.username }}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">
                  <ion-icon :icon="mailOutline"></ion-icon>
                  <span>Email</span>
                </div>
                <div class="detail-value">{{ selectedUser.email }}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">
                  <ion-icon :icon="bookOutline"></ion-icon>
                  <span>Class</span>
                </div>
                <div class="detail-value">{{ selectedUser.class }}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">
                  <ion-icon :icon="calendarOutline"></ion-icon>
                  <span>Joined Date</span>
                </div>
                <div class="detail-value">{{ formatDate(selectedUser.created_at) }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeViewModal">Close</button>
          <button class="edit-btn" @click="editFromViewModal">
            <ion-icon :icon="createOutline"></ion-icon>
            Edit User
          </button>
        </div>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div class="modal" v-if="showDeleteModal">
      <div class="modal-overlay" @click="closeDeleteModal"></div>
      <div class="modal-container delete-modal" data-aos="zoom-in" data-aos-duration="300">
        <div class="modal-header">
          <h3>Delete User</h3>
          <button class="modal-close" @click="closeDeleteModal">
            <ion-icon :icon="closeOutline"></ion-icon>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="delete-icon">
            <ion-icon :icon="warningOutline"></ion-icon>
          </div>
          <h4>Are you sure you want to delete this user?</h4>
          <p>This action cannot be undone. All data associated with this user will be permanently removed.</p>
          
          <div class="user-to-delete" v-if="userToDelete">
            <div class="user-avatar" :style="{ backgroundColor: getUserColor(userToDelete.full_name) }">
              {{ getUserInitials(userToDelete.full_name) }}
            </div>
            <div class="user-details">
              <h5>{{ userToDelete.full_name }}</h5>
              <p>{{ userToDelete.username }} • {{ userToDelete.role }}</p>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeDeleteModal">Cancel</button>
          <button class="delete-btn" @click="deleteUser" :disabled="isDeleting">
            <span v-if="isDeleting">
              <ion-icon :icon="refreshOutline" class="spin"></ion-icon>
              Deleting...
            </span>
            <span v-else>
              <ion-icon :icon="trashOutline"></ion-icon>
              Delete User
            </span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Bulk Delete Confirmation Modal -->
    <div class="modal" v-if="showBulkDeleteModal">
      <div class="modal-overlay" @click="closeBulkDeleteModal"></div>
      <div class="modal-container delete-modal" data-aos="zoom-in" data-aos-duration="300">
        <div class="modal-header">
          <h3>Delete Multiple Users</h3>
          <button class="modal-close" @click="closeBulkDeleteModal">
            <ion-icon :icon="closeOutline"></ion-icon>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="delete-icon">
            <ion-icon :icon="warningOutline"></ion-icon>
          </div>
          <h4>Are you sure you want to delete {{ selectedUsers.length }} users?</h4>
          <p>This action cannot be undone. All data associated with these users will be permanently removed.</p>
          
          <div class="selected-users-list">
            <div v-for="userId in selectedUsers.slice(0, 3)" :key="userId" class="selected-user-item">
              <div class="user-avatar small" :style="{ backgroundColor: getUserColor(getUserById(userId).full_name) }">
                {{ getUserInitials(getUserById(userId).full_name) }}
              </div>
              <span>{{ getUserById(userId).full_name }}</span>
            </div>
            <div v-if="selectedUsers.length > 3" class="more-users">
              And {{ selectedUsers.length - 3 }} more users...
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeBulkDeleteModal">Cancel</button>
          <button class="delete-btn" @click="bulkDeleteUsers" :disabled="isBulkDeleting">
            <span v-if="isBulkDeleting">
              <ion-icon :icon="refreshOutline" class="spin"></ion-icon>
              Deleting...
            </span>
            <span v-else>
              <ion-icon :icon="trashOutline"></ion-icon>
              Delete Users
            </span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Toast Notification -->
    <div class="toast" :class="{ 'show': toast.show, [toast.type]: true }">
      <div class="toast-icon">
        <ion-icon :icon="toast.type === 'success' ? checkmarkCircleOutline : alertCircleOutline"></ion-icon>
      </div>
      <div class="toast-content">
        <p>{{ toast.message }}</p>
      </div>
      <button class="toast-close" @click="hideToast">
        <ion-icon :icon="closeOutline"></ion-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { 
  IonButton,
  IonIcon
} from '@ionic/vue';
import { 
  closeOutline,
  closeCircleOutline,
  searchOutline,
  addOutline,
  createOutline,
  trashOutline,
  caretUpOutline,
  caretDownOutline,
  chevronBackOutline,
  chevronForwardOutline,
  eyeOutline,
  eyeOffOutline,
  refreshOutline,
  warningOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  personOutline,
  mailOutline,
  calendarOutline,
  peopleOutline,
  bookOutline
} from 'ionicons/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

// Check if dark mode is enabled
const isDarkMode = ref(localStorage.getItem('theme') === 'dark' || 
  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches));

// API endpoints
const API_ENDPOINTS = {
  GET_ALL: 'http://localhost/belajar-api/get-all-data.php',
  CREATE: 'http://localhost/belajar-api/insert-data.php',
  UPDATE: (id) => `http://localhost/belajar-api/update-data.php?id=${id}`,
  DELETE: (id) => `http://localhost/belajar-api/delete-user.php?id=${id}`
};

// State variables
const users = ref([]);
const isLoading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const filteredUsers = ref([]);
const selectedUsers = ref([]);
const selectAll = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showModal = ref(false);
const showViewModal = ref(false);
const showDeleteModal = ref(false);
const showBulkDeleteModal = ref(false);
const isEditing = ref(false);
const userToEdit = ref(null);
const userToDelete = ref(null);
const selectedUser = ref(null);
const showPassword = ref(false);
const isSubmitting = ref(false);
const isDeleting = ref(false);
const isBulkDeleting = ref(false);
const toast = ref({
  show: false,
  message: '',
  type: 'success'
});

// Form data and validation
const formData = ref({
  full_name: '',
  username: '',
  password: '',
  role: '',
  email: '',
  class: ''
});

const formErrors = ref({
  full_name: '',
  username: '',
  password: '',
  role: '',
  email: '',
  class: ''
});

// Computed properties
const totalUsers = computed(() => filteredUsers.value.length);
const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage.value));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalUsers.value));
const paginatedUsers = computed(() => {
  return filteredUsers.value.slice(startIndex.value, endIndex.value);
});

const displayedPages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  
  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages.value) {
      endPage = totalPages.value;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

const passwordStrength = computed(() => {
  if (!formData.value.password) {
    return { score: 0, text: '', class: '' };
  }
  
  const password = formData.value.password;
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Normalize score to 0-4 range
  score = Math.min(4, score);
  
  const strengthMap = {
    0: { text: 'Very Weak', class: 'very-weak' },
    1: { text: 'Weak', class: 'weak' },
    2: { text: 'Fair', class: 'fair' },
    3: { text: 'Good', class: 'good' },
    4: { text: 'Strong', class: 'strong' }
  };
  
  return { 
    score, 
    text: strengthMap[score].text, 
    class: strengthMap[score].class 
  };
});

// Methods
const fetchUsers = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const response = await axios.get(API_ENDPOINTS.GET_ALL);
    
    if (response.data && Array.isArray(response.data)) {
      users.value = response.data;
      filterUsers();
    } else if (response.data && response.data.status === 'fail') {
      throw new Error(response.data.msg || 'Failed to load users');
    } else {
      throw new Error('Invalid data format received from API');
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    error.value = err.response?.data?.msg || err.message || 'Failed to load users. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const filterUsers = () => {
  if (!searchQuery.value) {
    filteredUsers.value = [...users.value];
  } else {
    const query = searchQuery.value.toLowerCase();
    filteredUsers.value = users.value.filter(user => 
      (user.full_name && user.full_name.toLowerCase().includes(query)) ||
      (user.username && user.username.toLowerCase().includes(query)) ||
      (user.role && user.role.toLowerCase().includes(query)) ||
      (user.email && user.email.toLowerCase().includes(query)) ||
      (user.class && user.class.toLowerCase().includes(query))
    );
  }
  currentPage.value = 1;
  
  // Update selectAll state
  if (filteredUsers.value.length > 0) {
    selectAll.value = filteredUsers.value.every(user => selectedUsers.value.includes(user.id));
  } else {
    selectAll.value = false;
  }
};

const clearSearch = () => {
  searchQuery.value = '';
  filterUsers();
};

const sortUsers = (field, direction) => {
  filteredUsers.value.sort((a, b) => {
    let valueA = a[field] || '';
    let valueB = b[field] || '';
    
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    if (direction === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
};

const toggleUserSelection = (userId) => {
  const index = selectedUsers.value.indexOf(userId);
  if (index === -1) {
    selectedUsers.value.push(userId);
  } else {
    selectedUsers.value.splice(index, 1);
  }
  
  // Update selectAll state
  selectAll.value = filteredUsers.value.every(user => selectedUsers.value.includes(user.id));
};

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedUsers.value = filteredUsers.value.map(user => user.id);
  } else {
    selectedUsers.value = [];
  }
};

const changePage = (page) => {
  currentPage.value = page;
};

const getUserInitials = (name) => {
  if (!name) return '';
  return name.split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const getUserColor = (name) => {
  if (!name) return '#e0218a';
  
  const colors = [
    '#7b2cbf', '#e0218a', '#06d6a0', '#00b4d8', '#ffd166',
    '#ef476f', '#118ab2', '#073b4c', '#9d0191', '#3c096c'
  ];
  
  // Simple hash function to get consistent color for the same name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (e) {
    return dateString;
  }
};

const getUserById = (id) => {
  return users.value.find(user => user.id === id) || { full_name: 'Unknown User' };
};

const viewUserDetails = (user) => {
  selectedUser.value = user;
  showViewModal.value = true;
};

const closeViewModal = () => {
  showViewModal.value = false;
  selectedUser.value = null;
};

const editFromViewModal = () => {
  if (selectedUser.value) {
    closeViewModal();
    openEditModal(selectedUser.value);
  }
};

const openAddModal = () => {
  isEditing.value = false;
  userToEdit.value = null;
  resetForm();
  showModal.value = true;
};

const openEditModal = (user) => {
  isEditing.value = true;
  userToEdit.value = user;
  
  // Populate form with user data
  formData.value = {
    full_name: user.full_name || '',
    username: user.username || '',
    password: '',
    role: user.role || '',
    email: user.email || '',
    class: user.class || ''
  };
  
  resetFormErrors();
  showModal.value = true;
};

const openDeleteModal = (user) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const openBulkDeleteModal = () => {
  if (selectedUsers.value.length > 0) {
    showBulkDeleteModal.value = true;
  }
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  userToDelete.value = null;
};

const closeBulkDeleteModal = () => {
  showBulkDeleteModal.value = false;
};

const resetForm = () => {
  formData.value = {
    full_name: '',
    username: '',
    password: '',
    role: '',
    email: '',
    class: ''
  };
  
  resetFormErrors();
};

const resetFormErrors = () => {
  formErrors.value = {
    full_name: '',
    username: '',
    password: '',
    role: '',
    email: '',
    class: ''
  };
};

const validateForm = () => {
  resetFormErrors();
  let isValid = true;
  
  if (!formData.value.full_name) {
    formErrors.value.full_name = 'Full name is required';
    isValid = false;
  }
  
  if (!formData.value.username) {
    formErrors.value.username = 'Username is required';
    isValid = false;
  }
  
  if (!isEditing.value && !formData.value.password) {
    formErrors.value.password = 'Password is required';
    isValid = false;
  } else if (!isEditing.value && formData.value.password.length < 6) {
    formErrors.value.password = 'Password must be at least 6 characters';
    isValid = false;
  }
  
  if (!formData.value.role) {
    formErrors.value.role = 'Role is required';
    isValid = false;
  }
  
  if (!formData.value.class) {
    formErrors.value.class = 'Class is required';
    isValid = false;
  }
  
  if (!formData.value.email) {
    formErrors.value.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    formErrors.value.email = 'Email is invalid';
    isValid = false;
  }
  
  return isValid;
};

const saveUser = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  
  try {
    if (isEditing.value && userToEdit.value) {
      // Update existing user - API expects PATCH method
      const response = await axios({
        method: 'PATCH',
        url: API_ENDPOINTS.UPDATE(userToEdit.value.id),
        data: formData.value,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.status === 'success') {
        // Refresh user list to get updated data
        await fetchUsers();
        showToast('User updated successfully', 'success');
        closeModal();
      } else {
        throw new Error(response.data?.msg || 'Failed to update user');
      }
    } else {
      // Add new user
      const response = await axios.post(API_ENDPOINTS.CREATE, formData.value);
      
      if (response.data && response.data.status === 'success') {
        // Refresh user list to get the newly added user
        await fetchUsers();
        showToast('User added successfully', 'success');
        closeModal();
      } else {
        throw new Error(response.data?.msg || 'Failed to add user');
      }
    }
  } catch (err) {
    console.error('Error saving user:', err);
    showToast(err.response?.data?.msg || err.message || 'An error occurred. Please try again.', 'error');
  } finally {
    isSubmitting.value = false;
  }
};

const deleteUser = async () => {
  if (!userToDelete.value) return;
  
  isDeleting.value = true;
  
  try {
    // API expects DELETE method
    const response = await axios({
      method: 'DELETE',
      url: API_ENDPOINTS.DELETE(userToDelete.value.id)
    });
    
    if (response.data && response.data.status === 'success') {
      // Remove from local users array
      users.value = users.value.filter(user => user.id !== userToDelete.value.id);
      
      // Remove from selected users if present
      const selectedIndex = selectedUsers.value.indexOf(userToDelete.value.id);
      if (selectedIndex !== -1) {
        selectedUsers.value.splice(selectedIndex, 1);
      }
      
      filterUsers();
      showToast('User deleted successfully', 'success');
      closeDeleteModal();
    } else {
      throw new Error(response.data?.msg || 'Failed to delete user');
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    showToast(err.response?.data?.msg || err.message || 'An error occurred. Please try again.', 'error');
  } finally {
    isDeleting.value = false;
  }
};

const bulkDeleteUsers = async () => {
  if (selectedUsers.value.length === 0) return;
  
  isBulkDeleting.value = true;
  
  try {
    // Delete users one by one
    const deletePromises = selectedUsers.value.map(userId => 
      axios({
        method: 'DELETE',
        url: API_ENDPOINTS.DELETE(userId)
      })
    );
    
    const results = await Promise.allSettled(deletePromises);
    const successCount = results.filter(result => 
      result.status === 'fulfilled' && 
      result.value.data?.status === 'success'
    ).length;
    
    if (successCount > 0) {
      // Remove deleted users from local array
      users.value = users.value.filter(user => !selectedUsers.value.includes(user.id));
      selectedUsers.value = [];
      selectAll.value = false;
      
      filterUsers();
      showToast(`Successfully deleted ${successCount} users`, 'success');
      closeBulkDeleteModal();
    } else {
      throw new Error('Failed to delete users');
    }
  } catch (err) {
    console.error('Error bulk deleting users:', err);
    showToast(err.message || 'An error occurred. Please try again.', 'error');
  } finally {
    isBulkDeleting.value = false;
  }
};

const showToast = (message, type = 'success') => {
  toast.value = {
    show: true,
    message,
    type
  };
  
  // Auto hide after 3 seconds
  setTimeout(() => {
    hideToast();
  }, 3000);
};

const hideToast = () => {
  toast.value.show = false;
};

// Watch for changes in users to update filtered users
watch(users, () => {
  filterUsers();
}, { deep: true });

// Initialize
onMounted(() => {
  // Initialize AOS
  AOS.init({
    once: true,
    duration: 300,
    easing: 'ease-out-cubic'
  });
  
  // Fetch users from API
  fetchUsers();
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
  --retro-light: #f8fafc;
  
  /* Dashboard Colors */
  --bg-light: #f8fafc;
  --bg-dark: #0f172a;
  --card-light: #ffffff;
  --card-dark: #1e293b;
  --text-light: #1e293b;
  --text-dark: #f8fafc;
  --border-light: #e2e8f0;
  --border-dark: #334155;
  
  /* Password Strength Colors */
  --very-weak: #ff4d4d;
  --weak: #ff9966;
  --fair: #ffcc00;
  --good: #66cc66;
  --strong: #00cc99;
}

/* User Management */
.user-management {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.management-container {
  position: relative;
  width: 90%;
  max-width: 1200px;
  height: 90%;
  background-color: var(--bg-light);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
}

.dark .management-container {
  background-color: var(--bg-dark);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Management Header */
.management-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark .management-header {
  border-bottom: 1px solid var(--border-dark);
}

.header-title h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-light);
  margin-bottom: 4px;
}

.dark .header-title h2 {
  color: var(--text-dark);
}

.header-title p {
  font-size: 0.875rem;
  color: var(--text-light);
  opacity: 0.7;
}

.dark .header-title p {
  color: var(--text-dark);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-box {
  position: relative;
  width: 250px;
}

.search-box ion-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  opacity: 0.5;
}

.dark .search-box ion-icon {
  color: var(--text-dark);
}

.search-box input {
  width: 100%;
  padding: 10px 12px 10px 36px;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  background-color: var(--card-light);
  color: var(--text-light);
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.dark .search-box input {
  border: 1px solid var(--border-dark);
  background-color: var(--card-dark);
  color: var(--text-dark);
}

.search-box input:focus {
  outline: none;
  border-color: var(--retro-purple);
  box-shadow: 0 0 0 2px rgba(123, 44, 191, 0.2);
}

.clear-search {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-light);
  opacity: 0.5;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .clear-search {
  color: var(--text-dark);
}

.clear-search:hover {
  opacity: 1;
}

.add-button {
  --background: linear-gradient(135deg, #7b2cbf 0%, #e0218a 100%);
  --background-hover: linear-gradient(135deg, #8a2be2 0%, #ff1493 100%);
  --color: white;
  --border-radius: 6px;
  --padding-start: 16px;
  --padding-end: 16px;
  font-weight: 600;
  height: 40px;
}

.close-button {
  --color: var(--text-light);
  --background-hover: rgba(0, 0, 0, 0.05);
  --border-radius: 50%;
  width: 40px;
  height: 40px;
  --padding-start: 0;
  --padding-end: 0;
}

.dark .close-button {
  --color: var(--text-dark);
  --background-hover: rgba(255, 255, 255, 0.1);
}

/* Management Content */
.management-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* Loading State */
.loading-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.loading-spinner {
  margin-bottom: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(123, 44, 191, 0.2);
  border-radius: 50%;
  border-top-color: var(--retro-purple);
  animation: spin 1s linear infinite;
}

.loading-container p {
  font-size: 0.875rem;
  color: var(--text-light);
  opacity: 0.7;
}

.dark .loading-container p {
  color: var(--text-dark);
}

/* Error State */
.error-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.error-icon {
  font-size: 48px;
  color: var(--retro-pink);
  margin-bottom: 16px;
}

.error-container h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 8px;
}

.dark .error-container h3 {
  color: var(--text-dark);
}

.error-container p {
  font-size: 0.875rem;
  color: var(--text-light);
  opacity: 0.7;
  margin-bottom: 16px;
  text-align: center;
}

.dark .error-container p {
  color: var(--text-dark);
}

.retry-btn {
  padding: 8px 16px;
  border-radius: 6px;
  background-color: var(--retro-purple);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  background-color: #6a24a5;
}

/* Empty State */
.empty-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.empty-icon {
  font-size: 48px;
  color: var(--retro-purple);
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-container h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 8px;
}

.dark .empty-container h3 {
  color: var(--text-dark);
}

.empty-container p {
  font-size: 0.875rem;
  color: var(--text-light);
  opacity: 0.7;
  margin-bottom: 16px;
  text-align: center;
}

.dark .empty-container p {
  color: var(--text-dark);
}

.add-user-btn {
  padding: 8px 16px;
  border-radius: 6px;
  background: linear-gradient(135deg, #7b2cbf 0%, #e0218a 100%);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-user-btn:hover {
  background: linear-gradient(135deg, #8a2be2 0%, #ff1493 100%);
}

/* Users Table */
.users-table-container {
  flex: 1;
  overflow-x: auto;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  background-color: var(--card-light);
}

.dark .users-table-container {
  border: 1px solid var(--border-dark);
  background-color: var(--card-dark);
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border-light);
}

.dark .users-table th,
.dark .users-table td {
  border-bottom: 1px solid var(--border-dark);
}

.users-table th {
  font-weight: 600;
  color: var(--text-light);
  background-color: rgba(0, 0, 0, 0.02);
  position: sticky;
  top: 0;
  z-index: 10;
}

.dark .users-table th {
  color: var(--text-dark);
  background-color: rgba(255, 255, 255, 0.05);
}

.th-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sort-icons {
  display: flex;
  flex-direction: column;
}

.sort-icons ion-icon {
  font-size: 14px;
  cursor: pointer;
  color: var(--text-light);
  opacity: 0.5;
  transition: all 0.2s ease;
}

.dark .sort-icons ion-icon {
  color: var(--text-dark);
}

.sort-icons ion-icon:hover {
  opacity: 1;
  color: var(--retro-purple);
}

.users-table tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.dark .users-table tr:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.users-table tr.selected {
  background-color: rgba(123, 44, 191, 0.05);
}

.dark .users-table tr.selected {
  background-color: rgba(123, 44, 191, 0.1);
}

.users-table td {
  color: var(--text-light);
  font-size: 0.875rem;
}

.dark .users-table td {
  color: var(--text-dark);
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--retro-purple);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 12px;
}

.user-avatar.large {
  width: 64px;
  height: 64px;
  font-size: 1.25rem;
}

.user-avatar.small {
  width: 24px;
  height: 24px;
  font-size: 0.625rem;
}

.email-cell {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.role-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.role-badge.admin {
  background-color: rgba(123, 44, 191, 0.1);
  color: var(--retro-purple);
}

.dark .role-badge.admin {
  background-color: rgba(123, 44, 191, 0.2);
}

.role-badge.librarian {
  background-color: rgba(6, 214, 160, 0.1);
  color: var(--retro-teal);
}

.dark .role-badge.librarian {
  background-color: rgba(6, 214, 160, 0.2);
}

.role-badge.user {
  background-color: rgba(0, 180, 216, 0.1);
  color: var(--retro-blue);
}

.dark .role-badge.user {
  background-color: rgba(0, 180, 216, 0.2);
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.view {
  background-color: rgba(0, 180, 216, 0.1);
  color: var(--retro-blue);
}

.dark .action-btn.view {
  background-color: rgba(0, 180, 216, 0.2);
}

.action-btn.view:hover {
  background-color: rgba(0, 180, 216, 0.2);
}

.dark .action-btn.view:hover {
  background-color: rgba(0, 180, 216, 0.3);
}

.action-btn.edit {
  background-color: rgba(6, 214, 160, 0.1);
  color: var(--retro-teal);
}

.dark .action-btn.edit {
  background-color: rgba(6, 214, 160, 0.2);
}

.action-btn.edit:hover {
  background-color: rgba(6, 214, 160, 0.2);
}

.dark .action-btn.edit:hover {
  background-color: rgba(6, 214, 160, 0.3);
}

.action-btn.delete {
  background-color: rgba(224, 33, 138, 0.1);
  color: var(--retro-pink);
}

.dark .action-btn.delete {
  background-color: rgba(224, 33, 138, 0.2);
}

.action-btn.delete:hover {
  background-color: rgba(224, 33, 138, 0.2);
}

.dark .action-btn.delete:hover {
  background-color: rgba(224, 33, 138, 0.3);
}

.no-results {
  text-align: center;
  padding: 40px 0;
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.no-data ion-icon {
  color: var(--text-light);
  opacity: 0.3;
  font-size: 48px;
}

.dark .no-data ion-icon {
  color: var(--text-dark);
}

.no-data p {
  color: var(--text-light);
  opacity: 0.7;
}

.dark .no-data p {
  color: var(--text-dark);
}

.clear-filter-btn {
  padding: 6px 12px;
  border-radius: 4px;
  background-color: var(--retro-purple);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
}

.clear-filter-btn:hover {
  background-color: #6a24a5;
}

/* Bulk Actions */
.bulk-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--retro-purple);
  color: white;
  border-radius: 8px;
  margin-top: 16px;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.selected-count {
  font-size: 0.875rem;
  font-weight: 600;
}

.bulk-buttons {
  display: flex;
  gap: 8px;
}

.bulk-btn {
  padding: 6px 12px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bulk-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.bulk-btn.delete {
  background-color: var(--retro-pink);
}

.bulk-btn.delete:hover {
  background-color: #c01b73;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0 0;
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--text-light);
  opacity: 0.7;
}

.dark .pagination-info {
  color: var(--text-dark);
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-btn {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-light);
  background-color: var(--card-light);
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark .pagination-btn {
  border: 1px solid var(--border-dark);
  background-color: var(--card-dark);
  color: var(--text-dark);
}

.pagination-btn:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .pagination-btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.1);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  gap: 8px;
}

.page-btn {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-light);
  background-color: var(--card-light);
  color: var(--text-light);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark .page-btn {
  border: 1px solid var(--border-dark);
  background-color: var(--card-dark);
  color: var(--text-dark);
}

.page-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .page-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.page-btn.active {
  background-color: var(--retro-purple);
  border-color: var(--retro-purple);
  color: white;
}

.items-per-page {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--text-light);
}

.dark .items-per-page {
  color: var(--text-dark);
}

.items-per-page select {
  padding: 6px 8px;
  border: 1px solid var(--border-light);
  border-radius: 4px;
  background-color: var(--card-light);
  color: var(--text-light);
  font-size: 0.875rem;
}

.dark .items-per-page select {
  border: 1px solid var(--border-dark);
  background-color: var(--card-dark);
  color: var(--text-dark);
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-container {
  position: relative;
  width: 90%;
  max-width: 600px;
  background-color: var(--card-light);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.dark .modal-container {
  background-color: var(--card-dark);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.modal-container.delete-modal {
  max-width: 450px;
}

.modal-container.view-modal {
  max-width: 500px;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark .modal-header {
  border-bottom: 1px solid var(--border-dark);
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-light);
}

.dark .modal-header h3 {
  color: var(--text-dark);
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark .modal-close {
  color: var(--text-dark);
}

.modal-close:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .modal-close:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.modal-body {
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.form-full {
  grid-column: span 2;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-light);
  margin-bottom: 6px;
  display: flex;
  align-items: center;
}

.dark .form-group label {
  color: var(--text-dark);
}

.required {
  color: var(--retro-pink);
  margin-left: 4px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 12px;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  background-color: var(--card-light);
  color: var(--text-light);
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.dark .form-group input,
.dark .form-group select,
.dark .form-group textarea {
  border: 1px solid var(--border-dark);
  background-color: var(--card-dark);
  color: var(--text-dark);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--retro-purple);
  box-shadow: 0 0 0 2px rgba(123, 44, 191, 0.2);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: var(--retro-pink);
}

.error-message {
  font-size: 0.75rem;
  color: var(--retro-pink);
  margin-top: 4px;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-light);
  opacity: 0.5;
  cursor: pointer;
}

.dark .toggle-password {
  color: var(--text-dark);
}

.toggle-password:hover {
  opacity: 1;
}

.password-strength {
  margin-top: 8px;
}

.strength-meter {
  height: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
}

.dark .strength-meter {
  background-color: rgba(255, 255, 255, 0.1);
}

.strength-value {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.strength-value.very-weak {
  background-color: var(--very-weak);
}

.strength-value.weak {
  background-color: var(--weak);
}

.strength-value.fair {
  background-color: var(--fair);
}

.strength-value.good {
  background-color: var(--good);
}

.strength-value.strong {
  background-color: var(--strong);
}

.strength-text {
  font-size: 0.75rem;
}

.strength-text.very-weak {
  color: var(--very-weak);
}

.strength-text.weak {
  color: var(--weak);
}

.strength-text.fair {
  color: var(--fair);
}

.strength-text.good {
  color: var(--good);
}

.strength-text.strong {
  color: var(--strong);
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border-light);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.dark .modal-footer {
  border-top: 1px solid var(--border-dark);
}

.cancel-btn,
.save-btn,
.delete-btn,
.edit-btn {
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.cancel-btn {
  background-color: transparent;
  border: 1px solid var(--border-light);
  color: var(--text-light);
}

.dark .cancel-btn {
  border: 1px solid var(--border-dark);
  color: var(--text-dark);
}

.cancel-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.dark .cancel-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.save-btn {
  background: var(--retro-gradient);
  border: none;
  color: white;
}

.save-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #8a2be2 0%, #ff1493 100%);
}

.edit-btn {
  background-color: var(--retro-teal);
  border: none;
  color: white;
}

.edit-btn:hover {
  background-color: #05b586;
}

.delete-btn {
  background-color: var(--retro-pink);
  border: none;
  color: white;
}

.delete-btn:hover:not(:disabled) {
  background-color: #c01b73;
}

.save-btn:disabled,
.delete-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* User Profile View */
.user-profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.user-profile-info {
  margin-left: 16px;
}

.user-profile-info h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 8px;
}

.dark .user-profile-info h2 {
  color: var(--text-dark);
}

.user-badges {
  display: flex;
  gap: 8px;
}

.user-details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: var(--text-light);
  opacity: 0.7;
}

.dark .detail-label {
  color: var(--text-dark);
}

.detail-value {
  font-size: 0.875rem;
  color: var(--text-light);
  font-weight: 500;
}

.dark .detail-value {
  color: var(--text-dark);
}

/* Delete Confirmation Modal */
.delete-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.delete-icon ion-icon {
  font-size: 48px;
  color: var(--retro-pink);
}

.modal-body h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 8px;
  text-align: center;
}

.dark .modal-body h4 {
  color: var(--text-dark);
}

.modal-body p {
  font-size: 0.875rem;
  color: var(--text-light);
  opacity: 0.7;
  text-align: center;
  margin-bottom: 20px;
}

.dark .modal-body p {
  color: var(--text-dark);
}

.user-to-delete {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.02);
  margin-bottom: 16px;
}

.dark .user-to-delete {
  background-color: rgba(255, 255, 255, 0.05);
}

.user-details {
  margin-left: 12px;
}

.user-details h5 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 4px;
}

.dark .user-details h5 {
  color: var(--text-dark);
}

.user-details p {
  font-size: 0.75rem;
  color: var(--text-light);
  opacity: 0.7;
  margin: 0;
  text-align: left;
}

.dark .user-details p {
  color: var(--text-dark);
}

.selected-users-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.selected-user-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.02);
}

.dark .selected-user-item {
  background-color: rgba(255, 255, 255, 0.05);
}

.selected-user-item span {
  font-size: 0.875rem;
  color: var(--text-light);
}

.dark .selected-user-item span {
  color: var(--text-dark);
}

.more-users {
  font-size: 0.75rem;
  color: var(--text-light);
  opacity: 0.7;
  text-align: center;
  padding: 8px;
}

.dark .more-users {
  color: var(--text-dark);
}

/* Toast */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1200;
}

.dark .toast {
  background-color: var(--card-dark);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.toast.show {
  transform: translateY(0);
  opacity: 1;
}

.toast.success .toast-icon {
  color: var(--retro-teal);
}

.toast.error .toast-icon {
  color: var(--retro-pink);
}

.toast-icon {
  font-size: 24px;
}

.toast-content p {
  font-size: 0.875rem;
  color: var(--text-light);
  margin: 0;
}

.dark .toast-content p {
  color: var(--text-dark);
}

.toast-close {
  margin-left: auto;
  background: none;
  border: none;
  color: var(--text-light);
  opacity: 0.5;
  cursor: pointer;
}

.dark .toast-close {
  color: var(--text-dark);
}

.toast-close:hover {
  opacity: 1;
}

/* Animation */
.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-group.form-full {
    grid-column: span 1;
  }
  
  .management-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .header-actions {
    width: 100%;
    flex-wrap: wrap;
  }
  
  .search-box {
    width: 100%;
  }
  
  .pagination {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .pagination-controls {
    width: 100%;
    justify-content: center;
  }
  
  .bulk-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .bulk-buttons {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 576px) {
  .users-table th:nth-child(5),
  .users-table td:nth-child(5) {
    display: none;
  }
  
  .modal-container {
    width: 95%;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-btn {
    width: 28px;
    height: 28px;
  }
}
</style>