/*jshint esversion: 6 */
module.exports = (app, mongoose, entities) => {

  const messageService =
    require("../service/messageService")(mongoose, entities.Message);

  app.get("/api/messages", (req, res) => {
    var page = req.query.page;
    if (page === undefined) {
      res.status(400).json({
        "error": {
          "code": 400,
          "message": "page is required"
        }
      });
      return;
    } else if (isNaN(parseInt(page)) || page <= 0) {
      res.status(400).json({
        "error": {
          "code": 400,
          "message": "page should be a positive number"
        }
      });
      return;
    }

    messageService.getMessages(page).then((messages) => {
      res.status(200).json({
        "messages": messages
      });
    }).catch((error) => {
      console.error(error);
      res.status(500).json({
        "error": {
          "code": 500,
          "message": "internal server error"
        }
      });
    });
  });

  app.post("/api/messages", (req, res) => {
    var message = req.body.message;
    if (message === undefined) {
      res.status(400).json({
        "error": {
          "code": 400,
          "message": "message is required"
        }
      });
      return;
    }

    messageService.create(message).then((message) => {
      res.status(201).json({
        "created": true
      });
    }).catch((error) => {
      console.error(error);
      res.status(500).json({
        "error": {
          "code": 500,
          "message": "internal server error"
        }
      });
    });
  });

};
