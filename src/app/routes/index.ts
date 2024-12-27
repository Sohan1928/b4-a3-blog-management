import { Router } from "express";
import { BlogRoutes } from "../modules/blog/blog.route";
import { adminRoutes } from "../modules/admin/admin.route";
import AuthRoutes from "../modules/Auth/auth.route";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
