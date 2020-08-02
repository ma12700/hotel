const roomsModel = require('../models/rooms.model')

exports.getHome = (req, res, next) => {
        let category = req.query.category;
        let validCategories = ["srooms", "crooms", "frooms", "mrooms"];
        let roomsPromise;
        if (category && validCategories.includes(category))
            roomsPromise = roomsModel.getRoomsByCategory(category);
        else roomsPromise = roomsModel.getAllRooms();
        roomsPromise
            .then(rooms => {
                res.render("index", {
                    rooms: rooms,
                    isUser: req.session.userId,
                    isAdmin: req.session.isAdmin,
                    validationError: req.flash("validationErrors")[0], // عشان هنا عندي ايرور واحد بس
                    pageTitle: "Home"
                });
            })
            .catch(err => {
                console.log(err);
            });
    };