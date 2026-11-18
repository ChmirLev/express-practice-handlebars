const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Добро пожаловать в интернет-магазин!");
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});



// const products = [
//     { id: 1, name: "Ноутбук", price: 2500 },
//     { id: 2, name: "Мышь", price: 80 },
//     { id: 3, name: "Клавиатура", price: 150 }
// ];


// app.use((req, res, next) => {
//     console.log("1. Запрос пришёл");
//     next();
// });

// app.use((req, res, next) => {
//     console.log("2. Проверяем запрос");
//     next();
// });

// app.get("/", (req, res) => {
//     console.log("3. Отправляем ответ");
//     res.send("Привет!");
// });

// app.get("/about", (req, res) => {
//     res.send("Информация о магазине");
// });

// app.get("/contacts", (req, res) => {
//     res.send("Контакты магазина");
// });

// app.get("/api/products", (req, res) => {
//     res.json(products);
// });

// app.get("/api/products/:id", (req, res) => {
//     const id = Number(req.params.id);

//     const product = products.find(item => item.id === id);

//     if (!product) {
//         return res.status(404).json({
//             message: "Товар не найден"
//         });
//     }

//     res.json(product);
// });

// app.get("/api/status", (req, res) => {
//     res.json({
//         status: "ok",
//         message: "Сервер работает"
//     });
// });

// app.use((req, res) => {
//     res.status(404).json({
//         message: "Маршрут не найден"
//     });
// });
