const request = require("request");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "tsag agaariin medee avah hayag bairshiliig oruulna uu: ",
  (answer) => {
    request(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${answer}.json?access_token=pk.eyJ1IjoibXVua2h6dWwxIiwiYSI6ImNrdWk2czI5cTFhZDIyd3Q5OXhvcWIwNTIifQ.o65kzaqtL2jRj0NY7NBRcQ`,
      (error, response, body) => {
        const items = JSON.parse(body).features;
        console.error("error:", error);
        console.log("statusCode:", response && response.statusCode);
        let i = 0;
        items.forEach((el) => {
          console.log(
            `${i}. Place name: ${el.place_name} Lat: ${el.center[0]} Long: ${el.center[1]}`
          );
          i++;
        });
        rl.question("zuv haygiig songonuu: ", (answer1) => {
          let items2 = items[answer1];
          let longitude = items2.center[0];
          let latitude = items2.center[1];
          const options = {
            method: "GET",
            url: "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly",
            qs: { lat: latitude, lon: longitude },
            headers: {
              "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
              "x-rapidapi-key":
                "4a64a0c8b6mshd8bd1e3b8e0bee1p112795jsna80f11e3e076",
              useQueryString: true,
            },
          };

          request(options, (error, response, body) => {
            if (error) throw new Error(error);

            const temp = JSON.parse(body).data[0].temp;
            const snow = JSON.parse(body).data[0].snow;
            console.log(temp);
            console.log(`${snow}%`);
          });
          rl.close();
        });
      }
    );
  }
);