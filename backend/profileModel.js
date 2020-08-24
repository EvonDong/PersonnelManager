var mongoose = require('mongoose');

// Setup schema
var profileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
})

profileSchema.pre('save', next => {
    now = new Date();
    if(!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });
  

// Export Profile model
var Profile = module.exports = mongoose.model('profile', profileSchema);

module.exports.get = function(callback, limit) {
    Profile.find(callback).limit(limit);
}
