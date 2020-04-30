import Permission from '../models/permission';

// Handle index actions
exports.index = function (req, res) {
  Permission.find(req.query, function (err, permissions) {
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    }
    res.json({
        status: "success",
        message: "Permissions retrieved successfully",
        data: permissions
    });
  });
};

