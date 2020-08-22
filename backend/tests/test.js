let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require("../index");
let Profile = require("../profileModel");

chai.use(chaiHttp);
chai.should();
var expect = require('chai').expect;

describe('Get profiles', () => {
    it('supposed to retrieve all profiles', (done) => {
        chai.request(app)
            .get('/api/profiles')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
             });
    });

    it('supposed to retrieve one profile', (done) => {
        const id = 1;
        chai.request(app)
            .get(`/api/dummytest/profiles/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
             });
    });

    it('not supposed to retrieve any profile', (done) => {
        const id = 9;
        chai.request(app)
            .get(`/api/dummytest/profiles/${id}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
             });
    });
});

describe('api/profiles', () => {
    beforeEach(async () => {
        await Profile.remove({}, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Successfully removed all data before tests.');
            }
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

    afterEach(async () => {
        await Profile.remove({}, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Successfully removed all data after tests.');
            }
        });
    });
});
















