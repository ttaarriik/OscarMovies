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

app.get("/search", (req, res) => {
	res.render("main");
})

// REST endpoint that delivers a collection resource in JSON
app.get("/movies/categories/:categoryName/:year", async (req, res) => {
	var result = [];
	try {
		var response = await axios("https://project-tareq.run-us-west2.goorm.io/json");
		
	} catch(err){
		console.log(err);
	}
	
	for(let movie of response.data){
		
		let category = movie.category.split(" ").join("").toLowerCase()
		if(movie.year == req.params.year && category == req.params.categoryName){
			result.push(movie);
		}
	}
	
	if(result.length > 0){
		res.send(result);
	}else{
		res.send("No results found, please try again");
	}
	
});

// REST endpoint that delivers a singleton resource in JSON. 
app.get("/movies/categories/:categoryName/:year/type/winner", async (req, res) => {
		var result = [];
	try {
		var response = await axios("https://project-tareq.run-us-west2.goorm.io/json");
		
	} catch(err){
		console.log(err);
	}
	
	for(let movie of response.data){
		
		let category = movie.category.split(" ").join("").toLowerCase()
		if(movie.year == req.params.year 
		   && category == req.params.categoryName
		   && movie.winner === true){
			
			result.push(movie);
		}
	}
	
	if(result.length > 0){
		res.send(result);
	}else{
		res.send("No results found, please try again");
	}
	
});

// REST endpoint that allows search of 1 Oscar category and returns results containing the nominees in JSON.
app.get("/movies/search", async (req, res) => {
	var result = [];
	try {
		var response = await axios("https://project-tareq.run-us-west2.goorm.io/json");
		
	} catch(err){
		console.log(err);
	}
	
	for(let movie of response.data){
		
		let category = movie.category.split(" ").join("").toLowerCase()
		if(movie.year == req.query.year && category == req.query.category.toLowerCase()){
			result.push(movie);
		}
	}
	
	if(result.length > 0){
		res.send(result);
	}else{
		console.log(result);
		res.send("No results found, please try again");
	}
	
});






//API with the movies in JSON
app.get("/json", (req, res) => {
	res.send(movies);
})


app.listen("3000", () => {
	console.log("Server is running");
})


