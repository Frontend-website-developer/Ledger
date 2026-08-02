import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },

    description: {
        type: String,
    },

    client : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Client",
        required: true,
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }
},
{timestamps: true});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;