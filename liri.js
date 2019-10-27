require("dotenv").config();

const spotify = new Spotify(keys.spotify);

const axios = require('axios')

let search = process.argv[2]
let item = process.argv[3]

