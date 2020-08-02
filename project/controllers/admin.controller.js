const roomsModel = require("../models/rooms.model");
const ordersModel = require("../models/order.model");
const validationResult = require("express-validator").validationResult;

exports.getAdd = (req, res, next) => {
    res.render("add-room", {
        validationErrors: req.flash("validationErrors"),
        isUser: true,
        isAdmin: true,
        roomAdded: req.flash("added")[0],
        pageTitle: "Add room"
    });
};

exports.postAdd = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        req.body.image = req.file.filename;
        roomsModel
            .addNewRoom(req.body)
            .then(() => {
                req.flash("added", true);
                res.redirect("/admin/add");
            })
            .catch(err => {
                next(err);
            });
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/admin/add");
    }
};

exports.getOrders = (req, res, next) => {
    ordersModel
        .getAllOrders()
        .then(items => {
            res.render("manage-orders", {
                pageTitle: "Manage Orders",
                isUser: true,
                isAdmin: true,
                items: items
            });
        })
        .catch(err => next(err));
};

exports.postOrders = (req, res, next) => {
    ordersModel
        .editOrder(req.body.orderId, req.body.status)
        .then(() => res.redirect("/admin/orders"))
        .catch(err => {
            next(err);
        });
};
