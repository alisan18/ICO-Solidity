const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },

  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
    // children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },

  {
    path: "/admin",
    component: () => import("pages/AdminPage.vue"),
  },

  {
    path: "/user",
    component: () => import("pages/UserPage.vue"),
  },
];

export default routes;
