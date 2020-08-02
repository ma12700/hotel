const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost/plaground";
const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    roomId: String,
    timestamp: Number
});

const CartItem = mongoose.model("cart", cartSchema);

exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                let item = new CartItem(data);
                return item.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getItemsByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return CartItem.find(
                    { userId: userId },//{ده اسم الباراميتر ال جاي للفانكشن في الاول فوق ده :ده اس البروبارتي ال جوه الدوكيومنت }
                    {},// البرجكشن ال هو انا ممكن احدد حاجة واحدة مثلا الname:true هنا هيرجع الاسم بس ولو خليت القيمة فولس كان هيرجع الكل عدا الاسم لذلك هسيبها فاضية
                    { sort: { timestamp: 1 } }//هنا الاوبشن بتاعي يعني العمليات ال عايز اعملها وياخد 1 لوعاوز ارتب تصاعدي و-1 لو عوز ارتب تنازلي
                );
            })
            .then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => CartItem.updateOne({ _id: id }, newData))
            .then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.deleteItem = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => CartItem.findByIdAndDelete(id))
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getItemById = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => CartItem.findById(id))
            .then(item => {
                mongoose.disconnect();
                resolve(item);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};
