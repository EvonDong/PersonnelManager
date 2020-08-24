let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require("../index");
const mongoose = require('mongoose');
let Profile = require("../profileModel");

chai.use(chaiHttp);
chai.should();

// should = require('should-promised');
var expect = require('chai').expect;

// describe('Get profiles', () => {
//     it('supposed to retrieve all profiles', (done) => {
//         chai.request(app)
//             .get('/api/profiles')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 done();
//              });
//     });

//     it('supposed to retrieve one profile', (done) => {
//         const id = 1;
//         chai.request(app)
//             .get(`/api/dummytest/profiles/${id}`)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 done();
//              });
//     });

//     it('not supposed to retrieve any profile', (done) => {
//         const id = 9;
//         chai.request(app)
//             .get(`/api/dummytest/profiles/${id}`)
//             .end((err, res) => {
//                 res.should.have.status(404);
//                 res.body.should.be.a('object');
//                 done();
//              });
//     });
// });

describe('api/profiles', () => {
    // beforeEach(async () => {
    //     // this.timeout(60000); 
    //     await Profile.deleteMany({}, function(err) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log('Successfully removed all data before test.');
    //         }
    //         // done();
    //     // Profile.remove({}, function (err) { 
    //     //     done();         
    //        });
        
    // });

    beforeEach((done) => { //Before each test we fill in the database
        Profile.remove({}, (err) => {
          done();
        });
    });

    describe('GET /profiles', () => {
        it('supposed to get 0 profile', (done) => {
            chai.request(app)
            .get('/api/profiles')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.length.should.be.eql(0);
                res.body.should.have.property('message').eql('Profiles retrieved successfully!');
                done();
             });
        });
    });

    describe('POST /profiles', () => {
        it('supposed to post a profile', (done) => {
            let testProfile = {
                name: "Jack",
                role: "Treasurer",
                gender: "Male",
                email: "jack@gmail.com",
                phone: "42643213"
            }
            chai.request(app)
                .post('/api/profiles')
                .send(testProfile)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('data').property('name', 'Jack');
                    expect(res.body).to.have.property('data').property('email').eql('jack@gmail.com');
                    expect(res.body).to.have.property('data').property('role').eql('Treasurer');
                    expect(res.body).to.have.property('data').property('gender').eql('Male');
                    expect(res.body).to.have.property('data').property('phone').eql('42643213');
                    done();
            });
        });

        it('missing fields - not supposed to post a profile', (done) => {
            let testProfile = {
                name: "Jack",
                role: "Treasurer",
                gender: "Male",
                phone: "42643213"
            }
            chai.request(app)
                .post('/api/profiles')
                .send(testProfile)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    done();
            });
        });
    });

    describe('PUT /profiles/:id', () => {
        it('supposed to update a profile', (done) => {
            let testProfile = new Profile({
                name: "Jack",
                role: "Treasurer",
                gender: "Male",
                email: "jack@gmail.com",
                phone: "42643213"
            });
 
            testProfile.save((err, testProfile) => {
                chai.request(app)
                    .put('/api/profiles/' + testProfile.id)
                    .send({name: "Jackie", role: "Manager", gender: "Male", email: "jackie@gmail.com", phone: "31314323"})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('data').property('name').eql("Jackie");
                        res.body.should.have.property('data').property('role').eql("Manager");
                        res.body.should.have.property('data').property('gender').eql("Male");
                        res.body.should.have.property('data').property('email').eql("jackie@gmail.com");
                        res.body.should.have.property('data').property('phone').eql("31314323");
                        done();
                    });
            });
        });
    });

    describe('DELETE /profiles/:id', () => {
        it('supposed to delete a profile by id', (done) => {
            let testProfile = new Profile({
                name: "Jack",
                role: "Treasurer",
                gender: "Male",
                email: "jack@gmail.com",
                phone: "42643213"
            });
 
            testProfile.save((err, testProfile) => {
                chai.request(app)
                    .delete('/api/profiles/' + testProfile.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Deleted successfully!');
                        done();
                    });
            });
        });
    });

    // afterEach((done) => {
    //     Profile.deleteMany({}, function(err) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log('Successfully removed all data after test.');
    //         }
    //     });
    //     done();
    // });

    // after((done) => {
    //     mongoose.connection.db.dropDatabase(() => {
    //         mongoose.connection.close(done);
    //     });
    // });

});
















