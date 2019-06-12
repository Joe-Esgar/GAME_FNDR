module.exports = {
  getCharacters: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.get_all_my_characters([id]).then(newChar => {
      res.status(200).send(newChar);
    });
  },

  addCharacter: (req, res, next) => {
    const { id } = req.params;
    const { character_name, character_class, description, bio } = req.body;
    console.log(req.body);
    const db = req.app.get("db");
    db.createCharacter([character_name, character_class, description, bio, id])
      .then(createdChar => res.status(200).send(createdChar))
      .catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong");
      });
  },

  deleteCharacter: (req, res, next) => {
    const { idToDelete, user_id } = req.query;
    const {} = req.body;
    console.log(idToDelete, user_id);
    const db = req.app.get("db");
    db.remove_char([idToDelete, user_id]).then(res => {
      res.status(200).send(res);
    });
  }
};
