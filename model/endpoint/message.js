/*jshint esversion: 6 */
module.exports = (app, upload, mongoose, entities, storageBucket) => {

  const messageService =
    require("../service/messageService")(mongoose, entities.Message);

  app.get("/api/messages", (req, res) => {
    var page = req.query.page;
    if (page === undefined) {
      error.badRequest(res, "page is required");
      return;
    } else if (isNaN(parseInt(page)) || page <= 0) {
      error.badRequest(res, "page should be a positive number");
      return;
    }

    messageService.getMessages(page).then((messages) => {
      res.status(200).json({
        "messages": messsages
      });
    }).catch((error) => {
      console.error(error);
      res.status(500).json({
        "error": true
      });
    });
  });

  app.post("/api/applications", (req, res) => {
    var message = req.body.message;
    if (message === undefined) {
      error.badRequest(res, "message is required");
      return;
    }

    messageService.create(message).then((message) => {
      res.status(201).json({
        "created": true
      });
    }).catch((error) => {
      console.error(error);
      res.status(500).json({
        "error": true
      });
    });
  });

};
