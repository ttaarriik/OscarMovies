//GET ALL PACKAGES
var express		= 	require("express"),
	router 		= 	express.Router({ mergeParams: true }),
	movies	 	= 	require("../movies.json"),
    axios 		= 	require("axios");


router.get("/", (req, res) => {
	res.render("landingPage");
});

router.get("/search", (req, res) => {
	let result = [];
	let message = null;
	res.render("main", {result, message});
});

router.get("/search/main", async (req, res) => {
	var result = [];
	var message = null;
	const fromYear = req.query.fromYear;
	const toYear = req.query.toYear;
	const category = req.query.category.toUpperCase();
	
	var response = await sendRequest("https://rocky-brushlands-75254.herokuapp.com/json");
	
	for(let movie of response.data){
		
		if(movie.year >= fromYear && movie.year <= toYear && category == movie.category){
			
			try {
				let response1 = await axios(`https://api.themoviedb.org/3/search/movie?api_key=0a367317963013a9128446b956fcc5d8&query=${movie.entity}&year=${movie.year}`);
				var id = response1.data.results[0].id;
				if(id !== undefined){
					let response2 = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=0a367317963013a9128446b956fcc5d8`);
					let posterPath = "https://image.tmdb.org/t/p/w500";
					posterPath += response2.data.poster_path;
					response2.data.poster_path = posterPath;
					result.push(response2.data);
				}
				
			} catch(err){
				console.log(err);
			}
			
		}
	}
	
	if(result.length > 0){
		console.log(result[0].id);
		res.render("main", {result, message});
	}else{
		message = "No results found, please try again";
		res.render("main", {message, result});
	}	
	
});

router.get("/movie/info/:id", async (req, res) => {
	let response = await axios(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=0a367317963013a9128446b956fcc5d8`);
	let posterPath = "https://image.tmdb.org/t/p/w500";
	posterPath += response.data.poster_path;
	response.data.poster_path = posterPath;
	res.render("movieDesc", {movie: response.data});
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