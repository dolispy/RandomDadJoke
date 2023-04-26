const express = require('express')
const axios = require('axios');
const dotenv = require('dotenv').config()
const router = express.Router()

router.get('/', async(req,res) => {
    try {

        const options = {
          method: 'GET',
          url: 'https://dad-jokes.p.rapidapi.com/random/joke',
          headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com',
          },
        };

        const response = await axios.request(options);
        res.json(response.data.body)

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;