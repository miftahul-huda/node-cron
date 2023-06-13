const schedule = require('node-schedule');
const axios = require("axios")
const fs = require('fs');

let rawdata = fs.readFileSync('jobs.json');
let jobs = JSON.parse(rawdata);

jobs.map((jobItem)=>{

    console.log(jobItem)

    const job = schedule.scheduleJob(jobItem.schedule, function(){
        console.log(`Running job: ${jobItem.id}!`);
        if(jobItem.method == "http")
        {
            // Make a request for a user with a given ID
            console.log(`Request.get to ${jobItem.url}`)
            axios.get(jobItem.url)
            .then(function (response) {
                // handle success
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
            // always executed
            });
        }
    });
      
})

