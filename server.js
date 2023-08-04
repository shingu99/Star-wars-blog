const http = require('http');
const fs = require('fs');
const _ = require('lodash');

//this is to create a server and to execute anything if there is anything in the port
//req and res are objects for request and response. 
//request has a lot of information about the website that is being hosted.
// response is to send the data to the server
const server = http.createServer((req, res) =>
{
    // console.log(req.url, req.method);

    //using lodash to create random numbers
    const num = _.random(0,20);
    console.log(num);

    //using lodash library to run this function only once
    const greet = _.once(() =>
    {
        console.log('hello there');
    })
    //set header content type
    greet();
    greet();
    //sets the pretext of what can go into the server, for instance in this case HTML
    res.setHeader('Content-Type', 'text/html');
    //res.write('<p>hello there. Kaise ho</p>');

    let path = './views/';

    //routing different urls to diff. pages
    switch(req.url)
    {
        case '/' :
            path+='iisstart.html';
            res.statusCode = 200;
            break;
        case '/about':
            path+='about.html';
            res.statusCode = 200;
            break;
        case '/about-blah':
            res.statusCode = 301;
            //redirects the about-me page to about permanently
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path+= '404.html';
            res.statusCode = 404;
            break;
    }

    //reading the html file to write it to the response of the server
    fs.readFile(path, (err,data) =>
    {
        if(err)
        {
            console.log(err);
            res.end();
        }
        else
        {
            //res.write(data);
            //writes the html page as data into the response that is supposed to go to the server
            res.end(data);
        }
    })

    
});

//this listens to the port on the browser
server.listen(3000, 'localhost', ()=>
{
    console.log('listening for requests on 3000 port');
});