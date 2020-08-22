// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'Great, rest API is functioning',
        message: "Welcomeee to RestHub"
    });
});

// Import profile controller
var profileController = require('./profileController');

// Profile routes
router.route('/profiles')
    .get(profileController.index)
    .post(profileController.new);

router.route('/profiles/:profile_id')
    .get(profileController.view)
    .put(profileController.update)
    .patch(profileController.update)
    .delete(profileController.delete);


// Export API routes
module.exports = router;

