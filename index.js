import express from 'express';

const app = express();

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.json(`server is running on port ${PORT}`);
})