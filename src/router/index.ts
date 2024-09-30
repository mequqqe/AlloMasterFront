import Contacts from "@/views/left-nav/Contacts.vue";
import Settings from "@/views/left-nav/Settings.vue";
import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import { isUserLoggedIn } from "./utils";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "dashboards-analytics" },
    },
    {
      path: "/pages/user-profile",
      redirect: () => ({
        name: "pages-user-profile-tab",
        params: { tab: "profile" },
      }),
    },
    {
      path: "/pages/account-settings",
      redirect: () => ({
        name: "pages-account-settings-tab",
        params: { tab: "account" },
      }),
    },
    {
      path: "/contacts",
      name: 'contacts',
      component: Contacts
    },
    {
      path: "/settings",
      name: 'settings',
      component: Settings
    },
    ...setupLayouts(routes),
  ],
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = isUserLoggedIn();

  if (isLoggedIn) {
    if (to.meta.redirectIfLoggedIn) {
      next({ name: "dashboards-analytics" });
    } else {
      next();
    }
  } else {
    if (to.name !== "login") {
      next({
        name: "login",
        query: { to: to.fullPath !== "/" ? to.fullPath : undefined },
      });
    } else {
      next();
    }
  }
});

export default router;
