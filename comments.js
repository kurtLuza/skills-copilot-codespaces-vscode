// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var comments = [];

http.createServer(function(req, res) {
    var parseUrl = url.parse(req.url, true);
    var pathName = parseUrl.pathname;
    if (pathName === '/') {
        fs.readFile('./index.html', function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (pathName === '/comment') {
        if (req.method === 'POST') {
            var body = '';
            req.on('data', function(chunk) {
                body += chunk;
            });
            req.on('end', function() {
                var post = qs.parse(body);
                comments.push(post.comment);
                res.end('success');
            });
        } else if (req.method === 'GET') {
            res.end(JSON.stringify(comments));
        }
    }
}).listen(3000);
console.log('Server running at http://):3000/');








