const http = require("node:http");

const articles = [
  { id: 1, title: "Основы JavaScript" },
  { id: 2, title: "Что такое Node.js" },
  { id: 3, title: "Знакомство с HTTP" },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const articlesPath = url.pathname.match(/^\/articles\/(\d+)$/);

    if (!articlesPath) {
      res.statusCode = 404;
      res.end("Маршрут не найден");
      return;
    }

    const articleId = parseInt(articlesPath[1], 10);
    const article = articles.find((item) => item.id === articleId);

    if (!article) {
      res.statusCode = 404;
      res.end("Статья не найдена");
      return;
    }

    res.statusCode = 200;
    res.end(article.title);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end("server error");
  }
});

server.listen(3000, () => {
  console.log("http://localhost:3000/");
});

// const http = require("node:http");

// const server = http.createServer((req, res) => {
//     res.setHeader("Content-Type", "text/plain; charset=utf-8");

//     const articles = [
//         { id: 1, title: "Основы JavaScript" },
//         { id: 2, title: "Что такое Node.js" },
//         { id: 3, title: "Знакомство с HTTP" }
//     ];

//     const url = new URL(req.url, `http://${req.headers.host}`);

//     const articlesPath = url.pathname.match(/^\/articles\/(\d+)$/);

//     if (articlesPath) {
//         try {

//         } catch(err) {
//             res.statusCode = 500;
//             res.end('server error');
//             console.log('server error');

//         }
//         const articleId = parseInt(articlesPath[1], 10);

//         const article = articles.find(item => item.id === articleId);

//         if (article) {
//             res.statusCode = 200;
//             res.end(article.title);
//         } else {
//             res.statusCode = 404;
//             res.end("Статья не найдена");
//         }

//         return;
//     }

//     res.statusCode = 404;
//     res.end("Маршрут не найден");
// });

// server.listen(3000, () => {
//     console.log("http://localhost:3000/");
// });


// const http = require("node:http");

// const articles = [
//     { id: 1, title: "Основы JavaScript" },
//     { id: 2, title: "Что такое Node.js" },
//     { id: 3, title: "Знакомство с HTTP" }
// ];

// const server = http.createServer((req, res) => {
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const articlesPath = url.pathname.match(/^\/articles\/(\d+)$/);

//     if (articlesPath) {
//         const id = Number(match[1]);

//         const article = articles.find(article => article.id === id);

//         res.setHeader("Content-Type", "application/json; charset=utf-8");

//         if (article) {
//             res.end(JSON.stringify({
//                 id: article.id,
//                 title: article.title,
//                 content: article.content
//             }));
//         } else {
//             res.statusCode = 404;
//             res.end(JSON.stringify({
//                 message: "Статья не найдена"
//             }));
//         }

//         return;
//     }

//     res.statusCode = 404;
//     res.end("Маршрут не найден");
// });

// server.listen(3000, () => {
//     console.log("Сервер запущен на http://localhost:3000");
// });

