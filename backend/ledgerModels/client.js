import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    country: {
        type: String,
    },

    city: {
        type: String
    },

    address: {
        type: String
    },

    postalCode: {
        type: String
    },

    password: {
        type: String,
        required: true,
    },

    resetPasswordToken: {
        type: String
    },

    resetPasswordExpires: {
        type: Date
    }

});

const Client = mongoose.model("Client", clientSchema);

export default Client;