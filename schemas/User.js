const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    recipeName: String,
    price: Number,
    category: String,
    limit: String,
    quantity: Number,
    isWhole: Boolean,
    image: String,
    uniqueId: String
}); 

const personalInfo = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String
});

const shippingInfo = new mongoose.Schema({
    streetAddress: String,
    province: String,
    city: String,
    zip: String
});

const userSchema = new mongoose.Schema({
    saveInfo: { 
        lastModified: Date,
        personalInfo, 
        shippingInfo 
    },

    email: String,
    password: {
        type: String,
        default: ''
    },
    cartProducts: [{
        recipeName: String,
        price: Number,
        category: String,
        limit: String,
        quantity: Number,
        isWhole: Boolean,
        image: String,

    }],

    orderHistory: [
        {
            products_arr: [orderSchema],
            product: orderSchema,
            info: {
                orderedDate: Date,
                paymentMethod: String,
                orderType: String,
                status: String,
                totalPrice: Number
            }
        }
    ]
})

const User = mongoose.model("Users", userSchema);

module.exports = User;
