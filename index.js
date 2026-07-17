import "dotenv/config";
import mongoose from "mongoose";
import adminRoutes from "./ledgerRoutes/adminRoutes.js";
import clientRoutes from "./ledgerRoutes/clientRoutes.js";
import expenseRoutes from "./ledgerRoutes/expenseRoutes.js";
import paymentRoutes from "./ledgerRoutes/paymentRoutes.js"
import express from 'express';

const app = express();

const PORT = 5001;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.json(`server is running on port ${PORT}`);
})

app.use("/api/admin", adminRoutes);

app.use("/api/client", clientRoutes);

app.use("/api/expense", expenseRoutes);

app.use("/api/payment", paymentRoutes);