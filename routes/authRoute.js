import express from "express";
import { 
    forgotPasswordController,
    getAllOrdersController,
    getOrdersController,
    loginController, 
    orderStatusController, 
    registerController, 
    testController,
    updateProfileController, } from "../controllers/authcontroller.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//register || method post
router.post("/register", registerController);

//LOGIN || POST
router.post("/login" , loginController);


//TEST ROUTES
router.get("/test", requireSignIn , isAdmin , testController);

//FORGOT PASSWORD

router.post("/forgot-password", forgotPasswordController);

//PROTECTED USER ROUTES AUTH
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok:true});
});

//PROTECTED ADMIN ROUTES AUTH
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok:true});
});

//UPDATE PROFILE
router.put("/profile", requireSignIn, updateProfileController);


//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
        requireSignIn,
        isAdmin,
        orderStatusController
);

export default router;

