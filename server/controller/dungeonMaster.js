module.exports = {
  getPosts: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.get_all_dungeon_posts([id]).then(newPost =>
      res.status(200).send(newPost)
    );
  },

  getAllDungeons: (req, res, next) => {
    const db = req.app.get("db");
    db.get_all_dungeons().then(dungeons => res.status(200).send(dungeons));
  },

  createPost: (req, res, next) => {
    console.log(req.body, "REQ BODY");
    const {
      content,
      user_id,
      character_id,
      dungeon_name,
      dungeon_address
    } = req.body;
    const db = req.app.get("db");
    db.check_if_dungeon_exists(dungeon_address).then(dungeonFound => {
      if (!dungeonFound.length) {
        console.log("created new page");
        console.log(dungeon_name, dungeon_address, "HELLO ME");
        db.create_dungeon([dungeon_name, dungeon_address])
          .then(response => {
            console.log(response);
            const { dungeon_id } = response;
            db.create_post([
              content,
              dungeon_id,
              user_id,
              character_id,
              new Date()
            ]).then(createdPost => res.status(200).send(createdPost));
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("Create dungeon failed");
          });
      } else {
        const { dungeon_id } = dungeonFound[0];
        db.create_post([content, dungeon_id, user_id, character_id, new Date()])
          .then(createdPost => {
            res.status(200).send(createdPost);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("create post failed");
          });
      }
    });
  },

  updatePost: (req, res, next) => {
    const { id } = req.params;
    const { content } = req.body;
    const db = req.app.get("db");
    db.changePost([content, id])
      .then(updatedPost => {
        res.status(200).send(updatedPost);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  deletePost: (req, res, next) => {
    const { id } = req.query;
    const {} = req.body;
    console.log(id);
    const db = req.app.get("db");
    db.remove_post(id).then(() => {
      res.status(200).send("post deleted");
    });
  }
};
