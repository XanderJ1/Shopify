import { createRouter, createWebHashHistory } from "vue-router";
import Homeview from "@/views/Homeview.vue";
import SignUp from "@/components/signUp.vue";
import Login from "@/components/Login.vue";
import AddProduct from "@/components/AddProduct.vue";
import Product from "@/components/Product.vue";
import Payment from "@/components/Payment.vue";
import ProductView from "@/views/ProductView.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Homeview,
        },
        {
            path: "/signup",
            name: "signup", 
            component: SignUp,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/addProduct",
            name: "addProduct",
            component: AddProduct,
        },
        {
            path: "/product",
            name: "product",
            component: () => import("@/views/ProductView.vue")
        },
        {
            path: "/payment",
            name: "payment",
            component: () => import("@/views/PaymentView.vue")
        },
        {
            path: "/myProducts",
            name: "myProducts",
            component: () => import("@/views/MyProductView.vue")
        },
        {
            path: "/cart",
            name: "cart",
            component: () => import("@/views/CartView.vue")
        },
        {
            path: "/orders",
            name: "orders",
            component: () => import("@/views/Ordersview.vue")
        }
    ]
});

export default router;