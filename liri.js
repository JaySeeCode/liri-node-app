// GLOBAL VARIABLES
const keys = require('./keys.js');
const Twitter = require('twitter');
const spotify = require('spotify');
const request = require('request');
const fs = require('fs');

//for catching user input
var input = process.argv;


// PROGRAM

switch (input[2]) {
	case "my-tweets":
		pullTweets(keys, input[2]);
		break;
	case "spotify-this-song":
		lookUpSong(spotify, input[3], input[2]);
		break;
	case "movie-this":
		lookUpMovieInfo(input[3], input[2]);
		break;
	case "do-what-it-says":
		doWhatItSays(input[2])
}


// FUNCTIONS

function pullTweets(keys, command) {

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

				let tweet = "===========================" + '\n' +
							"TWEET #" + (i + 1) + '\n' +
							tweets[i].text + '\n' +
							"Created on: " + tweets[i].created_at + '\n' +
							"===========================";

				console.log(tweet);
				logDatatoFile(tweet, command);
				break;

			}else{

				let tweet = "===========================" + '\n' +
						"TWEET #" + (i + 1) + '\n' +
						tweets[i].text + '\n' +
						"Created on: " + tweets[i].created_at + '\n' +
						"===========================";

				console.log(tweet);
				logDatatoFile(tweet, command);

			}
		  
		  };
	});

}

function lookUpSong(spotify, input, command) {

	let song = null;

	if(input === undefined || input === ""){
		song = "The Sign";
		console.log("\nSince you did not provide a movie to look for, we have picked one for you...");
		pullSongInfo(song, command);
	}else{
		song = input;
		pullSongInfo(song, command);
	}

};

function lookUpMovieInfo(input, command) {

	// console.log("VALUE ON INPUT: " + input);

	let movieName = null;

	if(input === undefined || input === ""){
		movieName = "mr nobody";

		console.log("\nSince you did not provide a movie to look for, we have picked one for you...\n If you haven't watched it, we suggest you do!");
		pullMovieInfo(movieName, command);

	}else{
		movieName = input;
		pullMovieInfo(movieName, command);
	}

};


function pullMovieInfo(movie, command) {

	let queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

	// console.log(movieName);

	request(queryURL, function(err, response, body) {

		//if there is no error and the status code is good to go...
		if(!err  && response.statusCode === 200){

			let obj = JSON.parse(body);
			// console.log(obj);
			var movieInfo = "\nTitle: " + obj.Title + "\n" +
						"Year Released: " + obj.Released + "\n" +
						"IMDB Rating: " + obj.Ratings[0].Value + "\n" +
						"Produced in: " + obj.Country + "\n" +
						"Language: " + obj.Language + "\n" +
						"Plot Summary: " + obj.Plot + "\n" +
						"Actors: " + obj.Actors + "\n" +
						"Rotten Tomatoes Rating: " + obj.Ratings[1].Value + "\n";

			console.log(movieInfo);
			logDatatoFile(movieInfo, command);

		}

	});

};

function pullSongInfo(song, command) {

	spotify.search({ type: 'track', query: song }, function(err, data) {

		if ( err ) {
			console.log("Error occurred: " + err);
			return
		}

		// console.log(JSON.stringify(data, null, 2, 3));
		// console.log(JSON.stringify(data.tracks.items[0], null, 2, 3));


		let info = data.tracks.items[0];

		var songInfo = "\nArtist: " + info.artists[0].name + "\n" +
					   "Song: " + info.name + '\n' +
					   "Song Preview: " + info.preview_url + '\n' +
					   "Album: " + info.album.name + '\n';

		console.log(songInfo);
		logDatatoFile(songInfo, command)

	
		
	})

};

function doWhatItSays(command) {

	fs.readFile('commands.txt', 'utf8', function(error, data){

		if(error){
			console.log("THERE WAS AN ERROR: " + error);
		}

		let dataArr = data.split(",");

		switch (dataArr[0]) {
			case "my-tweets":
				pullTweets(keys, command);
				break;
			case "spotify-this-song":
				lookUpSong(spotify, dataArr[1]), command;
				break;
			case "movie-this":
				lookUpMovieInfo(dataArr[1], command);
		}

	});

};

function logDatatoFile(data, comm) {

	var timeStamp = + new Date();

	var log = "\n===== DATA LOG =====" + "\n" +
			  "\nCommand called: " + comm +
			  "\n" + data + "\n" +
			  "Time Stamp in Unix time: " + timeStamp + "\n" +
			"\n===== END OF LOG =====\n";

	fs.appendFile("write-test.txt", log);

};
