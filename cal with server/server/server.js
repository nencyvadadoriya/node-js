const http = require("http");

var MyServer = http.createServer((req, res) => {
    console.log(req.url);

    var style = `<style>
        body { 
            font-family: 'Poppins', sans-serif;
            text-align: center; 
            background: linear-gradient(135deg, #1a1a2e, #16213e); 
            color: white;
            padding: 50px; 
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            display: inline-block;
        }
          nav {
            margin-bottom: 30px;
        }
        nav a {
            color: #00adb5;
            text-decoration: none;
            font-size: 1.2em;
            margin: 0 15px;
            padding: 10px 15px;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        nav a:hover {
            background: #00adb5;
            color: #222831;
        }
        h1 { 
            color: #00adb5; 
            font-size: 20px;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }
        p {
            font-size: 18px;
            color: #dcdde1;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
        }
    </style>`;
    res.write("<html><head><meta charset='UTF-8'>" + style + "</head><body>");
    res.write(`<nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contacts">Contacts</a>
                <a href="/blog">Blog</a>
                <a href="/services">Services</a>
                <a href="/offer">Offer</a>
                </nav>`
            );
    res.write('<div class="container">');
    switch (req.url) {
        case '/':
            res.write("<h1>Home Page</h1>");
            res.write("<p>Welcome to our cool server! A home page is the main web page that a visitor will view when they navigate to a website.</p>");
            break;
        case '/about':
            res.write("<h1>About Page</h1>");
            res.write("<p>An About Us page exists to share a business’ story and history and provide a deeper connection with customers.</p>");
            break;
        case '/contacts':
            res.write("<h1>Contacts Page</h1>");
            res.write("<p>Multiple Contact Methods: Anticipate your customers' needs by offering a variety of contact details.</p>");
            break;
        case "/blog":
            res.write("<h1>Blog Page</h1>");
            res.write("<p>Painter & Illustrator There is no formula for what 'cool' is. It's a gut reaction. You just know it the moment it.</p>");
            break;
        case "/services":
            res.write("<h1>Services Page</h1>");
            res.write("<p>A service page is where you can describe your signature offer or a specific product or service you sell.</p>");
            break;
        case "/offer": 
            res.write("<h1>Offer Page</h1>");
            res.write("<p>Offers convert visitors into leads and can also be used to nurture those leads into customers.</p>");
            break;
        default:
            res.write("<h1>404 Not Found</h1>");
            res.write("<p>Page doesn't exist.</p>");
    }

    res.write('</div>');
    res.write("</body></html>"); 
    res.end();
});
var port = 9000;
MyServer.listen(port, () => {
    console.log(`Server is started on http://localhost:${port}`);
});
