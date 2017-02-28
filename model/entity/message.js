/*jshint esversion: 6 */
module.exports = (mongoose) => {

  var messageSchema = new mongoose.Schema({
    "message": {
      "type": String,
      "required": true,
      "validate": {
        "validator": (value) => {
          return value.length <= 512;
        }
      }
    }, "created": {
      "type": Date,
      "required": true,
      "default": Date.now()
    }
  });


  //index according to attribute compositions queried to speedup results
  messageSchema.index({
    "created": -1
  });


  return mongoose.model("Message", messageSchema);
};
