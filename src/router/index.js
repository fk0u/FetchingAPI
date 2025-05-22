import { createRouter, createWebHistory } from 'vue-router'; 
import Home from '@/pages/Home.vue';
import LoginPage from '@/pages/loginPage.vue';
import RegisterPage from '@/pages/registerPage.vue';
import AdminDashboard from '@/pages/adminDashboard.vue';
import UserManagement from '@/pages/userManagement.vue';




const routes = [
    { path: '/', name: "home", component: Home },
    { path: '/login', name: "loginPage", component: LoginPage },
    { path: '/register', name: "registerPage", component: RegisterPage },
    { path: '/admin', name: "adminDashboard", component: AdminDashboard },
    { path: '/UserManagement', name: "userManagement", component: UserManagement }

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;