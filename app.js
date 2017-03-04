/*jshint esversion: 6 */
const CONFIG = require("./config/config");

setupMongoose()
	.then(setupExpress)
	.catch((error) => {
		console.error("setup failed", error);
	});

function setupMongoose() {
  return new Promise((resolve, reject) => {
    var mongoose = require("mongoose");

    var configUrl = "mongodb://";
    if (CONFIG.mongoose.username !== undefined &&
      CONFIG.mongoose.password !== undefined) {
      configUrl += CONFIG.mongoose.username + ":" + CONFIG.mongoose.password + "@";
    }
    configUrl += CONFIG.mongoose.host + ":" + CONFIG.mongoose.port + "/" +
      CONFIG.mongoose.database;

    mongoose.connect(configUrl, {
      "config": {
        "autoIndex": CONFIG.mongoose.autoIndex
      }
    }, () => {
      var Message = require("./model/entity/message")(mongoose);
      resolve({
        "mongoose": mongoose,
        "entities": {
          "Message": Message
        }
      });
    });
  });
}

function setupExpress(database) {
	var bodyParser = require("body-parser");

  var app = require("express")();
	app.use(bodyParser.urlencoded());

  setupEndpoints(app, database.mongoose, database.entities);
  app.listen(CONFIG.express.port);
}

function setupEndpoints(app, mongoose, entities) {
  require("./model/endpoint/message")(app, mongoose, entities);
}
