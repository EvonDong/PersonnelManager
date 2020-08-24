// Import profile model
Profile = require('./profileModel');

// Handle index actions
exports.getAll = function(req, res) {
    Profile.get(function(err, profile) {
        if (err) {
            res.json({
                status: "error",
                message: "err"
            })
        }
        res.json({
            status: "success",
            message: "Profiles retrieved successfully!",
            data: profile
        })
    })
}

// Handle create profile actions
exports.new = function(req, res) {
    var profile = new Profile();
    profile.name = req.body.name ? req.body.name : profile.name;
    profile.role = req.body.role;
    profile.gender = req.body.gender;
    profile.email = req.body.email;
    profile.phone = req.body.phone;

    // save the profile and check for errors
    profile.save(function (err) {
        if (err) {
            res.send(err);
          } else {
              res.json({
                message: "New profile created",
                data: profile
            });
        }
    });
}

// Handle view profile info
exports.getSpecificProfile = function(req, res) {
    Profile.findById(req.params.profile_id, function(err, profile) {
        if (err) {
            res.send(err);
        }
        res.json({
            message: "Profile details loading...",
            data: profile
        });
    });
};

// Handle update profile info
exports.update = function(req, res) {
    Profile.findById(req.params.profile_id, function(err, profile) {
        if (err)
            res.send(err);

        profile.name = req.body.name ? req.body.name : profile.name;
        profile.gender = req.body.gender;
        profile.role = req.body.role;
        profile.email = req.body.email;
        profile.phone = req.body.phone;

        // save the profile and check for errors
        profile.save(function (err) {
            if (err)
                res.json(err);
    
            res.json({
                message: "Profile updated successfully!",
                data: profile
            });
        });
    });
};

// Handle delete profile
exports.delete = function(req, res) {
    Profile.deleteOne({
        _id: req.params.profile_id
    }, function (err, profile) {
        if (err) {
            res.send(err);
        }

        res.json({
            status: 'success',
            message: "Deleted successfully!"
        })
    })
};


// Use dummy for testing
let dummyProfile = require("./dummyData/dummyProfiles");

exports.testGetOne = function(req, res) {
    const findProfile = dummyProfile.find(profile => profile.id === parseInt(req.params.id));
    if (findProfile) {
        return res.status(200).json({
            data: findProfile,
            message: "Profile details loading..."
        });
    }
    return res.status(404).json({
        message: "Record not found."
    })
}




