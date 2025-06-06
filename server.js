const https = require("https")
const fs = require("fs")
const express = require("express")
const path = require("path")
const compression = require('compression')
const morgan = require('morgan')
const app = express()

const configs = {
    caminho: "build",
    forcarHTTPS: true,
    port: process.env.PORT || 3000
}

app.use(compression())
app.use(morgan('tiny'))
app.use(express.static(configs.caminho))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, configs.caminho, "index.html"))
})

https
.createServer(
  {
    key: fs.readFileSync("/var/lib/jelastic/keys/privkey.pem"),
    cert: fs.readFileSync("/var/lib/jelastic/keys/fullchain.pem"),
  },
  app
)
.listen(configs.port, () => console.log(`server is runing at port ${configs.port}!`))
