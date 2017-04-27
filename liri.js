const keys = require("./keys.js");
const Twitter = require('twitter');
const spotify = require('spotify');
const request = require("request");

var input = process.argv;

switch (input[2]) {
	case "my-tweets":
		pullTweets(keys)
		break;
	case "spotify-this-song":
		lookUpSong(spotify, input[3]);
		break;
	case "movie-this":
		lookUpMovieInfo(input[3]);
		break;
	case "do-what-it-says":
		//do something
}


function pullTweets(keys) {

	var client = new Twitter(keys.twitterKeys);

	var params = {screen_name: 'local_coder'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  // if (!error) {
	    // console.log(JSON.stringify(tweets, null, 2, 3));
	    // console.log(tweets.length);
	    
	  // }

		for (var i = 0; i < tweets.length; i++) {

			//if there are more than 20 tweets, display them and then break out of the loop
			if(tweets.length >= 20){

				console.log("===========================");
				console.log("TWEET #" + (i + 1));
				console.log(tweets[i].text);
				console.log("Created on: " + tweets[i].created_at);
				console.log("===========================");
				break;

			}else{

				console.log("===========================");
				console.log("TWEET #" + (i + 1));
				console.log(tweets[i].text);
				console.log("Created on: " + tweets[i].created_at);
				console.log("===========================");

			}
		  
		  };
	});

}

function lookUpSong(spotify, input) {

	let song = null;

	if(input === undefined || input === ""){
		song = "The Sign";
		console.log("\nSince you did not provide a movie to look for, we have picked one for you...");
		pullSongInfo(song);
	}else{
		song = input;
		pullSongInfo(song);
	}

};

function lookUpMovieInfo(input) {

	// console.log("VALUE ON INPUT: " + input);

	let movieName = null;

	if(input === undefined || input === ""){
		movieName = "mr nobody";

		console.log("\nSince you did not provide a movie to look for, we have picked one for you...\n If you haven't watched it, we suggest you do!");
		pullMovieInfo(movieName);

	}else{
		movieName = input;
		pullMovieInfo(movieName);
	}

};


function pullMovieInfo(movie) {

	let queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

	// console.log(movieName);

	request(queryURL, function(err, response, body) {

		//if there is no error and the status code is good to go...
		if(!err  && response.statusCode === 200){

			let obj = JSON.parse(body);
			// console.log(obj);
			console.log("\nTitle: " + obj.Title);
			console.log("Year Released: " + obj.Released);
			console.log("IMDB Rating: " + obj.Ratings[0].Value);
			console.log("Produced in: " + obj.Country);
			console.log("Language: " + obj.Language);
			console.log("Plot Summary: " + obj.Plot);
			console.log("Actors: " + obj.Actors);
			console.log("Rotten Tomatoes Rating: " + obj.Ratings[1].Value);
		}

	});

};

function pullSongInfo(song) {

	spotify.search({ type: 'track', query: song }, function(err, data) {

		if ( err ) {
			console.log("Error occurred: " + err);
			return
		}

		// console.log(JSON.stringify(data, null, 2, 3));
		// console.log(JSON.stringify(data.tracks.items[0], null, 2, 3));


		let info = data.tracks.items[0];

		console.log("\nArtist: " + info.artists[0].name);
		console.log("Song: " + info.name);
		console.log("Song Preview: " + info.preview_url);
		console.log("Album: " + info.album.name);
	
		
	})

};
