import Vue from "vue";
import VueRouter from "vue-router";
import VuePageTransition from 'vue-page-transition'


Vue.use(VueRouter);
Vue.use(VuePageTransition)

const routes = [
  {
    path: "/add_attraction/:name",
    name: "AttractionForm",
    component: () => import("../views/attraction_form.vue"),
  },
  {
    path: "/",
    name: "NameForm",
    component: () => import("../views/name_form.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
