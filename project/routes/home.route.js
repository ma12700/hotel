const router = require('express').Router()
const authGard = ('./guards/auth.guard')
const homeController = require('../controllers/home.controller')

router.get('/',homeController.getHome ) //روتر هنا المفروض هتوديني علي الهوم عطول ولكن اوث جارد هنا هتخليه يروح لملف الجارد يتاكد انه عنده ايمل لو ايوه هيبعته للهوم لو لا هيبعته ي ساين اب الاول واول ما يعمل ايمل هيوديه اتوماتيك علي الهوم 

module.exports = router;