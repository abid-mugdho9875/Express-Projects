// controllers/dashboardController.js
exports.dashboard = (req, res) => {
    res.json({ message: `Welcome to the Dashboard, ${req.user.username} (${req.user.role})` });
  };
  