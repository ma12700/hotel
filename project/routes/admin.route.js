const router = require("express").Router();
const check = require("express-validator").check;
const multer = require("multer");
const bodyParser = require("body-parser");

const adminController = require("../controllers/admin.controller");
const adminGuard = require("./guards/admin.guard");

router.get("/add", adminGuard, adminController.getAdd);

router.post(
    "/add",
    adminGuard,
    multer({
        storage: multer.diskStorage({ // المكان ال هخزن فيه الملفات ولكن افضل من البروبارتب ديستينيشن لانها بتديني امكانية تحكم اكبر في المكان ده
            destination: (req, file, cb) => {
                cb(null, "images/"); // اول باراميتر لو انا عايز امرر ايرور اناهنا مش عايز والتاني المكان الخاص بالملفات
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname); //تاني قيمة خاصة باسم الملف الجديد وهستخدم دات نو عشان بتضيف عدد للملي سكند من 1970 فمع كل ملف هيضيف رقم فلو تكرر اسم الملف الرقم ال هيضاف ده هيكون مختلف وبكده هيكون عندي اسم يونيك لكل ملف 
            }
        })
    }).single("image"), //هستخدم هنا سنجل عشان انا عايز اعمل ابلود لملف واحد فقط وفي فانكشن تانيه , array او fields الاولي لو هعمل اكتر من ملف منفس الروت والتانيه لو من اماكن مختلفة
    check("name")
        .not()
        .isEmpty()
        .withMessage("name is required"),
    check("price")
        .not()
        .isEmpty()
        .withMessage("price is required")
        .isFloat({ min: 0.0000000009 })
        .withMessage("price must be greater than 0"),
    check("description")
        .not()
        .isEmpty()
        .withMessage("description is required"),
    check("category")
        .not()
        .isEmpty()
        .withMessage("category is required"),
    check("image").custom((value, { req }) => {
        if (req.file) return true;
        else throw "image is required";
    }),
    adminController.postAdd
);

router.get("/orders", adminGuard, adminController.getOrders);

router.post(
    "/orders",
    adminGuard,
    bodyParser.urlencoded({ extended: true }),
    adminController.postOrders
);

module.exports = router;
