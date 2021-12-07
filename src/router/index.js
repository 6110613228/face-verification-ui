import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "../components/Welcome.vue";

import Registration from "../components/Registration.vue";
import Verificationn from "../components/Verification.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    meta: { title: "Welcome" },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/About.vue"),
    meta: { title: "About" },
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    meta: { title: "FaceCN registration" },
  },
  {
    path: "/verification",
    name: "Verification",
    component: Verificationn,
    meta: { title: "FaceCN verification" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
