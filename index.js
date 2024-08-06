const express = require('express')
const nodeHtmlToImage = require('node-html-to-image')
const path = require('path')
const app = express()
const port = process.env.PORT || 4000

app.get('/og-image', async (req, res) => {
    const { title, author, date, readTime, authorImage, upvotes, content } =
        req.query

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
      `
    //   <img src="${image}" alt="Article Image" class="image">

    const convertedImage = await nodeHtmlToImage({
        html: htmlTemplate,
        transparent: true,
    })

    res.writeHead(200, { 'Content-Type': 'image/png' })
    res.end(convertedImage, 'binary')
})

// Serve the React app (assuming it's built and in the 'build' directory)
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
    res.send('Server is running...')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
