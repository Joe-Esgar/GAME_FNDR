const axios = require("axios");
const { REACT_APP_API_KEY } = process.env;

module.exports = {
  zachBrokeOurInternet: (req, res, next) => {
    const { lat, lon } = req.body;
    console.log(req.body);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=48280&type=gamestore&keyword=tabletop%20games&key=${REACT_APP_API_KEY}`
      )
      .then(response => {
        res.status(200).send(response.data);
      });
  }
};
