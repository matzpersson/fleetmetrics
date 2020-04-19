import User from '../models/user';

// Handle index actions
exports.index = function (req, res) {
  User.find(req.query, function (err, users) {
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    }
    res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: users
    });
  });
};

// Handle create actions
exports.new = function (req, res) {
  var user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.dashboard = req.body.dashboard;
  user.hashKey = req.body.hashKey;

  user.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
        message: 'New user created!',
        data: user
    });
  });
};

// Handle findById
exports.view = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err)
      res.send(err);
    res.json({
      message: 'Success..',
      data: user
    });
  });
};

// Handle updateById
exports.update = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) res.send(err);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.hashKey = req.body.hashKey;
    user.dashboard = req.body.dashboard;

    user.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'User updated',
            data: user
        });
    });
  });
};

// Handle remove 
exports.delete = function (req, res) {
  User.remove({_id: req.params.id}, function (err, user) {
    if (err) res.send(err);
    res.json({
        status: "success",
        message: 'User deleted'
    });
  });
};
