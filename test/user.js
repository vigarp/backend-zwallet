let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const usersModel = require("../src/models/users_model");

//Assertion Style
chai.should();

chai.use(chaiHttp);
let tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzbWFpbEBtYWlsLmlkIiwidXNlcm5hbWUiOiJpc21haWwiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDQ3NTk2MDEsImV4cCI6MTY0NDg0NjAwMX0.FpFbV4JQuTTKcnKB3QPpiO-jrdkTa_t1WtoVaTQRNOw';

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlbWJvQG1haWwuaWQiLCJ1c2VybmFtZSI6InJlbWJvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NDQ3NjAyMzgsImV4cCI6MTY0NDg0NjYzOH0.YCdOu9SALvMuKASKyezD6RAJy65_4v9EZSgZSLdKIww'

describe('Users API', () => {
    
    /**
     * Test the GET route
     */
    describe("GET /users", () => {
        it("It should GET all the users", (done) => {
            chai.request(server)
                .get("/users")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.data.should.be.a('array');
                    response.body.message.should.be.eq('successfully fetched from server')
                done();
                });
        });

        it("It should NOT GET all the users", (done) => {
            chai.request(server)
                .get("/user")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.message.should.be.eq('URL Not Found')
                done();
                });
        });
    });

    /**
     * Test the GET (by id) route
     */
     describe("GET /users/:id", () => {
        it("It should GET a user by ID", (done) => {
            const idUser = 810
            chai.request(server)
                .get(`/users/${idUser}`)
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.status.should.be.eq('Success');
                    response.body.data.should.be.a('object');
                    response.body.data.should.have.property('id');
                    response.body.data.should.have.property('username');
                    response.body.data.should.have.property('email');
                    response.body.data.should.have.property('phone');
                    response.body.data.should.have.property('picture');
                    response.body.data.should.have.property('id_wallet');
                    response.body.data.should.have.property('balance');
                    response.body.message.should.be.eq('successfully fetched from server');
                    response.body.data.should.have.property('id').eq(810);
                done();
                });
        });

        it("It should NOT GET a user by ID", (done) => {
            const idUser = 100
            chai.request(server)
                .get(`/users/${idUser}`)
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.status.should.be.eq('Failed');
                    response.body.should.have.property('data').eq(null)
                    response.body.message.should.be.eq(`user not registered with id: ${idUser}`);
                done();
                });
        });
    });


    /**
     * Test the POST route
     */

    const newUser = {
        username: "apin",
        email: "apin@mail.id",
        password: "apin",
        phone: "081276654431"
    }
     describe("POST /register", () => {
        it("It should POST a new user", (done) => {
            chai.request(server)
                .post(`/register`)
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.status.should.be.eq('Success');
                    response.body.data.should.be.a('object');
                    response.body.data.should.have.property('id_user');
                    response.body.data.should.have.property('id_wallet');
                    response.body.data.should.have.property('username');
                    response.body.data.should.have.property('username').eq(newUser.username);
                    response.body.data.should.have.property('email');
                    response.body.data.should.have.property('email').eq(newUser.email);
                    response.body.message.should.be.eq('user successfully registered');
                done();
                });
        });
        it("It should NOT POST a new user with email already registered", (done) => {
            chai.request(server)
                .post("/register")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(403);
                    response.body.status.should.be.eq('Failed');
                    response.body.should.have.property('data').eq(null);
                    response.body.message.should.be.eq('email already registered')
                done();
                });
        });
        const wrongUser = {
            email: "apin@mail.id",
            password: "apin",
            phone: "081276654431"
        }
        it("It should NOT POST a new user with wrong input", (done) => {
            chai.request(server)
                .post("/register")
                .send(wrongUser)
                .end((err, response) => {
                    response.should.have.status(403);
                    response.body.status.should.be.eq('Failed');
                    response.body.should.have.property('data').eq(null);
                    response.body.message.should.be.eq('registration failed, please check the input')
                done();
                });
        });
        it("It should NOT POST a new user with wrong URL path", (done) => {
            chai.request(server)
                .post("/registers")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.message.should.be.eq('URL Not Found')
                done();
                });
        });
    });

    const loginUser = {
        email: newUser.email,
        password: newUser.password,
    }
    describe("POST /login", () => {
        it("It should POST a login user", (done) => {
            chai.request(server)
                .post(`/login`)
                .send(loginUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.status.should.be.eq('Success');
                    response.body.data.should.be.a('object');
                    response.body.data.should.have.property('id');
                    response.body.data.should.have.property('username');
                    response.body.data.should.have.property('email');
                    response.body.data.should.have.property('email').eq(loginUser.email);
                    response.body.data.should.have.property('phone');
                    response.body.data.should.have.property('picture');
                    response.body.data.should.have.property('token');
                    response.body.message.should.be.eq('successfully login');
                done();
                });
        });

        const wrongUser = {
            email: newUser.email + 's',
            password: newUser.password + 's',
        }
        it("It should NOT POST login user with wrong email/password", (done) => {
            chai.request(server)
                .post(`/login`)
                .send(wrongUser)
                .end((err, response) => {
                    response.should.have.status(403);
                    response.body.status.should.be.eq('Failed');
                    response.body.should.have.property('data').eq(null);
                    response.body.message.should.be.eq('email/password wrong');
                done();
                });
        });
        it("It should NOT POST login user with wrong URL path", (done) => {
            chai.request(server)
                .post("/logien")
                .send(loginUser)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.message.should.be.eq('URL Not Found')
                done();
                });
        });
        const wrongUserInput = {
            email: newUser.email + 's',
            p4ssword: newUser.password + 's',
        }
        it("It should NOT POST login user with wrong input", (done) => {
            chai.request(server)
                .post("/login")
                .send(wrongUserInput)
                .end((err, response) => {
                    response.should.have.status(403);
                    response.body.status.should.be.eq('Failed');
                    response.body.should.have.property('data').eq(null);
                    response.body.message.should.be.eq('login failed, please check the input')
                done();
                });
        });
    });
    /**
     * Test the PUT route
     */
    const dataUser = {
        username: "intanpayong",
        email: "intanpayong@mail.id",
        password: "intanpayong",
        phone: "089878964328",
        picture: "image.jpg"
    }
     describe("PUT /users/:id", () => {
        it("It should PUT a user", (done) => {
            const idUser = 493
            chai.request(server)
                .put(`/users/${idUser}`)
                .set({ Authorization: `Bearer ${token}` })
                .send(dataUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.status.should.be.eq('Success');
                    response.body.data.should.be.a('object');
                    response.body.data.should.have.property('username');
                    response.body.data.should.have.property('username').eq(dataUser.username);
                    response.body.data.should.have.property('email');
                    response.body.data.should.have.property('email').eq(dataUser.email);
                    response.body.data.should.have.property('phone');
                    response.body.data.should.have.property('phone').eq(dataUser.phone);
                    response.body.data.should.have.property('picture');
                    response.body.data.should.have.property('picture').eq(dataUser.picture);
                    response.body.message.should.be.eq('successfully edited');
                done();
                });
        });
        it("It should NOT PUT a user by wrong ID", (done) => {
            const idUser = 100
            chai.request(server)
                .put(`/users/${idUser}`)
                .set({ Authorization: `Bearer ${token}` })
                .send(dataUser)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.status.should.be.eq('Failed');
                    response.body.should.have.property('data').eq(null)
                    response.body.message.should.be.eq(`user not registered with id: ${idUser}`);
                done();
                });
        });
        const wrongDataUser = {
            usermane: "intanpayong",
            emali: "intanpayong@mail.id",
            password: "intanpayong",
            phone: "089878964328",
            picture: "image.jpg"
        }
        it("It should NOT PUT a user by wrong input", (done) => {
            const idUser = 493
            chai.request(server)
                .put(`/users/${idUser}`)
                .set({ Authorization: `Bearer ${token}` })
                .send(wrongDataUser)
                .end((err, response) => {
                    response.should.have.status(403);
                    response.body.status.should.be.eq('Failed');
                    response.body.should.have.property('data').eq(null)
                    response.body.message.should.be.eq(`edit failed, please check the input`);
                done();
                });
        });
    });
    /**
     * Test the DELETE route
     */
    const idUserDeleted = 979
     describe("DELETE /users/:id", () => {
        it("It should NOT DELETE a user by wrong role token", (done) => {
            chai.request(server)
                .delete(`/users/${idUserDeleted}`)
                .set({ Authorization: `Bearer ${token}` })
                .send(dataUser)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.status.should.be.eq('Failed');
                    response.body.should.have.property('data').eq(null);
                    response.body.message.should.be.eq(`admin only`);
                done();
                });
        });
        it("It should DELETE a user", (done) => {
            chai.request(server)
                .delete(`/users/${idUserDeleted}`)
                .set({ Authorization: `Bearer ${tokenAdmin}` })
                .send(dataUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.status.should.be.eq('Success');
                    response.body.should.have.property('data').eq(true);
                    response.body.message.should.be.eq(`successfully deleted id: ${idUserDeleted}`);
                done();
                });
        });
        it("It should NOT DELETE a user by wrong id", (done) => {
            chai.request(server)
                .delete(`/users/${idUserDeleted}`)
                .set({ Authorization: `Bearer ${tokenAdmin}` })
                .send(dataUser)
                .end((err, response) => {
                    response.should.have.status(403);
                    response.body.status.should.be.eq('Failed');
                    response.body.should.have.property('data').eq(null);
                    response.body.message.should.be.eq(`id ${idUserDeleted} not found`);
                done();
                });
        });
    });
});