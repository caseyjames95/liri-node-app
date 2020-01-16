// Dotenv
require("dotenv").config();

// NPM 
const axios = require('axios')
const moment = require('moment')
moment().format()
const keys = require("./key.js");
// API
const spotify = require('spotify')

// Process arguments
let search = process.argv[2]
let item = process.argv.slice(3).join(' ')

console.log(`
Use one of the terms below!
| concert-this | spotify-this | movie-this | do-what-it-says |
`)

// SWITCH BETWEEN CASES
// CONCERT-THIS
switch (search) {
    case 'concert-this': {
        let artist = item;
        let url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        axios.get(url)
            .then(function (data) {
                // handle success
                for (let i = 0; i < 5; i++) {
                    let eventDate = moment(data.data[i].datetime).format('MM/DD/YYYY');
                    console.log(
                        `=========================================
Venue: ${data.data[i].venue.name}
Location: ${data.data[i].venue.city}, ${data.data[i].venue.region}
Event Date: ${eventDate}
=========================================
`
                    )
                };
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })


    }
        break

    // SPOTIFY THIS
    case 'spotify-this': {
        if (!item) {
            song = 'The Sign';
        } else {
            song = item;
        }

        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {

                return console.log('Error occurred: ' + err);
            }
            console.log(song)
            let artist_object = data.tracks.items[0];
            console.log(`=========================================
Artist: ${artist_object.artists[0].name}
Song: ${artist_object.name}
Album: ${artist_object.album.name}
Sample: ${artist_object.preview_url}
=========================================
`
            );
        });
    }
        break

    // MOVIE THIS
    case 'movie-this': {
        if (!title) {
            movie = 'Mr.Nobody';
        } else {
            movie = title;
        }
        let url2 = `http://www.omdbapi.com/?apikey=trilogy&t=${movie}`
        axios.get(url2)
            .then(function (response) {

                // handle success


                let movie_info = response.data;
                console.log(`
*----------------------------------*
Title: ${movie_info.Title}
Year Released: ${movie_info.Released}
IMDB Rating: ${movie_info.Ratings[0].Value}
Rotten Tomatotes Rating: ${movie_info.Ratings[1].Value}
Countries Produced: ${movie_info.Country}
Language: ${movie_info.Language}
Plot: ${movie_info.Plot}
Actors: ${movie_info.Actors}
*----------------------------------*
`)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })


    }
        break

    // DO WHAT IT SAYS
    case 'do-what-it-says': {
        fs.readFile('./random.txt', 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            } else {
                content = data.split(",");
                command = content[0];
                title = content[1];
                song = title;
                spotify.search({ type: 'track', query: song }, function (err, data) {
                    if (err) {

                        return console.log('Error occurred: ' + err);
                    }
                    console.log(song)
                    let artist_object = data.tracks.items[0];
                    console.log(`
*------------------------------------*
Artist: ${artist_object.artists[0].name}
Song Name: ${artist_object.name}
Preview Link: ${artist_object.preview_url}
Album Name: ${artist_object.album.name}
*------------------------------------*
`
                    );
                });
            }
        })
    }
        break

}