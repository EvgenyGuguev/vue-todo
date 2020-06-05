import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NoteEdit from "../views/NoteEdit";
import Create from "../views/Create";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/create",
    name: "Create",
    component: Create
  },
  {
    path: "/notes/:id",
    name: "note-edit",
    component: NoteEdit
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
