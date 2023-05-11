const http = require('http')

function requestController(){
    console.log("Request recibida")
}

const server = http.createServer(requestController)

server.listen(4000)