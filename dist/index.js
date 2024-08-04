"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_html_to_image_1 = __importDefault(require("node-html-to-image"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.get('/og-image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, date, image, readTime, authorImage, upvotes, content } = req.query;
    const htmlTemplate = `
        <html>
          <head>
            <style>
              body { font-family: Arial, height:630px; width:1200px; padding:10px; height:fit-content; sans-serif; background-color: #fff; }
              .container { display:flex; align-items: center; border: 1px solid #e1e4e8; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
              .image { width: 40%; height: 630px; object-fit: cover; }
              .content { padding: 20px; }
              .title { font-size: 50px; color: #333; margin-bottom: 10px; }
              .author-info { display: flex; align-items: center; margin-bottom: 10px; }
              .author-image { border-radius: 50%; width: 60px; height: 60px; margin-right:22px; }
              .author-details { color: #888; font-size:22px; }
              .author-name { font-weight: bold; }
              .read-time { margin-top: 20px; color: #888; font-size:22px; }
              .upvotes { margin-top: 20px; color: #888; font-size:22px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="content">
                <div class="title">${title}</div>
                <div class="author-info">
                  <img src="${authorImage}" alt="Author Image" class="author-image">
                  <div class="author-details">
                    <div class="author-name">${author}</div>
                    <div class="date">${date}</div>
                  </div>
                </div>
                <div class="upvotes">Upvotes: ${upvotes}</div>
                <div class="read-time">Read Time: ${readTime}</div>
                <p style="font-size:22px;">${content}</p>
              </div>
            </div>
          </body>
        </html>
      `;
    //   <img src="${image}" alt="Article Image" class="image">
    const convertedImage = yield (0, node_html_to_image_1.default)({
        html: htmlTemplate,
        transparent: true,
    });
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(convertedImage, 'binary');
}));
// Serve the React app (assuming it's built and in the 'build' directory)
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.send("Server is running...");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
