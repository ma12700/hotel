//import { promises, resolve4 } from 'dns';

const mongoose = require('mongoose')

const DB_URL =
"mongodb://localhost/plaground";

const roomSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category:String
})

const Room = mongoose.model("room", roomSchema);

exports.addNewRoom = data => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                let newRoom = new Room(data);
                return newRoom.save();
            })
            .then(rooms => {
                mongoose.disconnect();
                resolve(rooms);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getAllRooms = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Room.find({});
            })
            .then(rooms => {
                mongoose.disconnect();
                resolve(rooms);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getRoomsByCategory = category => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Room.find({ category: category });
            })
            .then(rooms => {
                mongoose.disconnect();
                resolve(rooms);
            })
            .catch(err => {
                mongoose.disconnect(reject(err));
            });
    });
};

exports.getRoomById = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Room.findById(id);
            })
            .then(room => {
                mongoose.disconnect();
                resolve(room);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getFirstRoom = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Room.findOne({});
            })
            .then(room => {
                mongoose.disconnect();
                resolve(room);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};
