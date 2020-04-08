import Message from '../models/message';

exports.index = function (req, res) {
  Message.get(function (err, messages) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Messages retrieved successfully",
      data: messages
    });
  });
};

// Handle create contact actions
exports.new = function (req, res) {
  var message = new Message();
  message.topic = req.body.topic;
  message.message = req.body.message;

  message.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: 'New message created!',
      data: message
    });
  });
};
