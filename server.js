const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res) => {
    
    // lodash
    const num = _.random(0, 100)
    console.log(num)

    const greet = _.once(() => {
        console.log('Hello')
    })

    greet();
    greet();

    // Set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = `./views/`
    switch(req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200;
            break;
        
        case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break;
        
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end();
            break;

        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // res.write('<head><link rel="stylesheet" href="#"></head>')
    // res.write('<p>Hello, Adu</p>');
    // res.write('<p>You\'re such a cutu</p>')
    // res.end();

    // Sending a html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end();
        }

        else {
            res.end(data);
        }
    })


});

server.listen(3000, 'localhost', () => {
    console.log('We\'ve started listening on port 3000')
})