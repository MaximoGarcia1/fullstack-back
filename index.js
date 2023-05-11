require('dotenv').config()
const http = require('http')


function requestController(){
    console.log("Request recibida")
}

const server = http.createServer(requestController)
const PORT = process.env.PORT 

server.listen(PORT, function(){
    console.log(`Server on port ${PORT}`)
})