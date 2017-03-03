var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var app = express();  // make express app
var http = require('http').Server(app);  // inject app into the server

// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set("view engine", "ejs"); // specify our view engine
app.use(express.static(__dirname + '/assets'));
// 2 create an array to manage our entries
var entries = [];
app.locals.entries = entries;

// 3 set up an http request logger to log every request automagically
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// 4 handle http GET requests (default & /new-entry)
app.get("/Guestpage", function (request, response) {
  response.render("index");
});
app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});

// 5 handle an http POST request to the new-entry URI 
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({  // store it
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });
  response.redirect("/Guestpage");  // where to go next? Let's go to the home page :)
});
app.get("/contact", function(req,res){
	res.render("contact");
});
// ENd of GET request handling

// POSTS
app.post("/contact",function(req,res){

  var api_key = 'key-b22059acb0b00783e4efd5b70de40aa8'; // replace with your API KEY Value
  var domain = 'sandbox775674389e3846ab90b9d92253ea2598.mailgun.org'; // replace with your domain
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
   
  var data = {
    from: 'Mail Gun godheadmedia <postmaster@sandbox775674389e3846ab90b9d92253ea2598.mailgun.org>', //replace with your SMTP Login ID
    to: 'sushmithamadireddy95@gmail.com', // enter email Id to which email notification has to come. 
    subject: req.body.userName, //Subject Line
    text: req.body.body //Subject Body
  };
   
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if(!error)
      res.send("Mail Sent");
    else
      res.send("Mail not sent <br/>Error Message : "+error);
  });

});

// 404
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});	
// if we get a 404 status, render our 404.ejs view
app.use(function (request, response) {
  response.status(404).render("404");
});

// Listen for an application request on port 8081
http.listen(8081, function () {
  console.log('Guestbook app listening on http://127.0.0.1:8081/');
});
