//GET ALL PACKAGES
const express 	 = require("express"),
	  app 	  	 = express(),
	  bodyParser = require("body-parser");

//CONFIGURATION
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


//ROUTES

app.get("/", (req, res) => {
	res.render("main");
})



app.listen("3000", () => {
	console.log("Server is running");
})


