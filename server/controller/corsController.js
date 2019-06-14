const axios = require("axios");
module.exports = {
  zachBrokeOurInternet: (req, res, next) => {
    const { lat, lon } = req.body;
    console.log(req.body);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=48280&type=gamestore&keyword=gamestore&key=AIzaSyBg2MsXJxC-YYK5d2p7ty-puOu4ca4wukc`
      )
      .then(response => {
        res.status(200).send(response.data);
      });
  }
};
