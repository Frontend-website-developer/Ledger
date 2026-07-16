import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    }

});

const clientExpense = mongoose.model("clientExpense", expenseSchema);

export default clientExpense;