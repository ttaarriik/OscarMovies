//GET ALL PACKAGES
const express 	 = require("express"),
	  app 	  	 = express(),
	  bodyParser = require("body-parser"),
	  movies	 = require("./movies.json"),
	  axios 	 = require("axios");
   
 
   


//CONFIGURATION
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));



//ROUTES

app.get("/", (req, res) => {
	res.render("main");
})

app.get("/search", (req, res) => {
	res.render("movieSearch");
})

app.get("/search/:year", async (req, res) => {
	var result = [];
	try {
		var response = await axios("https://project-tareq.run-us-west2.goorm.io/json");
		
	} catch(err){
		console.log(err);
	}
	
	for(let movie of response.data){
		if(movie.year == req.params.year && movie.winner === true){
			result.push(movie);
		}
	}
	res.send(result);

})

app.get("/json", (req, res) => {
	res.send(movies);
})


app.listen("3000", () => {
	console.log("Server is running");
})


