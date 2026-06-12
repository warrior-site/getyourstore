import { Router } from "express";
import {
  createAdminProduct,
  deleteAdminProduct,
  getImageKitAuth,
  listAdminProducts,
  requireAdmin,
  updateAdminProduct,
  listAllUsers,
  updateUserRole,
} from "../controller/adminController.js";

const router = Router();

router.use(requireAdmin);

router.get("/imagekit/auth", getImageKitAuth);
router.get("/products", listAdminProducts);
router.post("/products", createAdminProduct);
router.patch("/products/:id", updateAdminProduct);
router.delete("/products/:id", deleteAdminProduct);
// Get all users
router.get("/users", requireAdmin, listAllUsers);

// Update role manually
router.patch("/users/:id/role", requireAdmin, updateUserRole);

export default router;