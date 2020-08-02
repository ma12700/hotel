const roomsModel = require("../models/rooms.model");

exports.getRoom = (req, res, next) => {
    roomsModel
        .getFirstRoom()
        .then(room => {
            res.render("room", {
                room: room,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                pageTitle: "room Details"
            });
        })
        .catch(err => res.redirect("/error"));
};

exports.getRoomById = (req, res, next) => {
    let id = req.params.id;
    roomsModel
        .getRoomById(id)
        .then(room => {
            res.render("room", {
                room: room,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                pageTitle: room.name
            });
        })
        .catch(err => res.redirect("/error"));
};
