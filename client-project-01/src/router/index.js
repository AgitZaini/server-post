import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import HomePage from "../views/HomePage.vue";
import ProfilePage from "../views/ProfilePage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "LoginPage",
            component: LoginPage,
        },
        {
            path: "/register",
            name: "RegisterPage",
            component: RegisterPage,
        },
        {
            path: "/",
            name: "Homepage",
            component: HomePage,
        },
        {
            path: "/profile",
            name: "ProfilePage",
            component: ProfilePage,
        },
        // {
        //     path: "/about",
        //     name: "about",
        //     // route level code-splitting
        //     // this generates a separate chunk (About.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import("../views/AboutView.vue"),
        // },
    ],
});
router.beforeEach((to, from, next) => {
    if (to.name === "ProfilePage" && !localStorage.getItem("access_token")) next({ name: "LoginPage" });
    else if (to.name === "LoginPage" && localStorage.getItem("access_token")) next({ name: "ProfilePage" });
    else if (to.name === "RegisterPage" && localStorage.getItem("access_token")) next({ name: "ProfilePage" });
    else next();
});
export default router;
