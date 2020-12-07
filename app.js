//GET ALL PACKAGES
const express 	 = require("express"),
	  app 	  	 = express(),
	  bodyParser = require("body-parser"),
	  movies	 = require("./movies.json"),
	  axios 	 = require("axios"),
	  movieRoute = require("./routes/main.js"),
	  jsonRoute  = require("./routes/json.js");


//CONFIGURATION
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


//ROUTES

app.use(movieRoute);
app.use(jsonRoute);




//API with the movies in JSON
app.get("/json", (req, res) => {
	res.send(movies);
})


//Connect to the server 
app.listen(process.env.PORT || 3000, () => {
	console.log("Server is running");
})


