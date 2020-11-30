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

app.get("/search/test", async (req, res) => {
	var result = [];
	const fromYear = 1927;
	const toYear = 1950;
	const category = "CINEMATOGRAPHY";
	
	try {
		var response = await axios("https://project-tareq.run-us-west2.goorm.io/json");
		
	} catch(err){
		console.log(err);
	}
	
	for(let movie of response.data){
		
		if(movie.year >= fromYear && movie.year <= toYear && category == movie.category){
			
			try {
				let response1 = await axios(`https://api.themoviedb.org/3/search/movie?api_key=0a367317963013a9128446b956fcc5d8&query=${movie.entity}&year=${movie.year}`);
				var id = response1.data.results[0].id;
				let response2 = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=0a367317963013a9128446b956fcc5d8`);
				let posterPath = "https://image.tmdb.org/t/p/w500";
				posterPath += response2.data.poster_path;
				response2.data.poster_path = posterPath;
				result.push(response2.data);
			} catch(err){
				console.log(err);
			}
			
		}
	}
	
	if(result.length > 0){
		res.send(result);
	}else{
		res.send("No results found, please try again");
	}	
	
});

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


