/*jshint esversion: 6 */
const MESSAGES_PER_PAGE = 25;


const create = (mongoose, Message) => {
  return (message) => {
    return new Promise((resolve, reject) => {
      Message.create({
        "message": message,
        "created": Date.now()
      }, (error, message) => {
        if (error) {
          reject(error);
        } else {
          resolve(message);
        }
      });
    });
  };
};

const getMessages = (mongoose, Message) => {
  return (page) => {
    return new Promise((resolve, reject) => {
      Message.find({

      }, "message", {
        "skip": (page - 1) * MESSAGES_PER_PAGE,
        "limit": MESSAGES_PER_PAGE,
        "sort": {
          "created": -1
        }
      }, (error, messages) => {
        if (error) {
          reject(error);
        } else {
          resolve(messages);
        }
      });
    });
  };
};

module.exports = (mongoose, Message) => {
  return {
    "create": create(mongoose, Message),
    "getMessages": getMessages(mongoose, Message)
  };
};
