const request = require("request");

const request1 = (link) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      request(link, (error, response, body) => {
        // const items = JSON.parse(body);
        // items.forEach((li) => {
        //   request(li.url, (error, response, body1) => {
        //     // const items1 = JSON.parse();
        //     console.log(body1);
        //   });
        // });
        res(body);
      });
    }, 2000);
  });
};

Promise.all([
  request1("https://www.poemist.com/api/v1/randompoems"),
  request1("https://www.poemist.com/api/v1/randompoems"),
  request1("https://www.poemist.com/api/v1/randompoems"),
  request1("https://www.poemist.com/api/v1/randompoems"),
  request1("https://www.poemist.com/api/v1/randompoems"),
]).then((allResponses) => {
  console.log(allResponses);
});
