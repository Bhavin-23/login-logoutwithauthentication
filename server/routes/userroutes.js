const express = require("express");
const upload = require("../middleware/multer");
const { signup, login, getprofile } = require("../controllers/usercontroller");
const isAuth = require("../middleware/auth");
 
const router = express.Router();

router.post("/signup", upload.single("profile"), signup);
router.post("/signin", login);
router.get("/me", isAuth, getprofile);

 

module.exports = router;
