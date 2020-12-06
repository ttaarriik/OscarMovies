//GET ALL PACKAGES
var express		= 	require("express"),
	router 		= 	express.Router({ mergeParams: true }),
	movies	 	= 	require("../movies.json"),
	axios 	 	= 	require("axios");



// REST endpoint that delivers a collection resource in JSON
router.get("/movies/categories/:categoryName/:year", async (req, res) => {
	var result = [];
	
	var response = await sendRequest("https://project-tareq.run-us-west2.goorm.io/json")
	
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
router.get("/movies/categories/:categoryName/:year/type/winner", async (req, res) => {
	var result = [];
	
	var response = await sendRequest("https://project-tareq.run-us-west2.goorm.io/json")
	
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
router.get("/movies/search", async (req, res) => {
	var result = [];
	
	var response = await sendRequest("https://project-tareq.run-us-west2.goorm.io/json")
	
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

//Function to send a request to the API
const sendRequest = async (url) => {
	try {
		var response = await axios(url);
		return response;
		
	} catch(err){
		console.log(err);
	}
}


module.exports = router;
