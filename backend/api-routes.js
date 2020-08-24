// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'Great, rest API is functioning',
        message: "Welcomeee to PersonnelManager"
    });
});

// Import profile controller
var profileController = require('./profileController');

// Profile routes
router.route('/profiles')
    .get(profileController.getAll)
    .post(profileController.new);

router.route('/profiles/:profile_id')
    .get(profileController.getSpecificProfile)
    .put(profileController.update)
    .patch(profileController.update)
    .delete(profileController.delete);


router.route('/dummytest/profiles/:id')
    .get(profileController.testGetOne)


    

// Export API routes
module.exports = router;

