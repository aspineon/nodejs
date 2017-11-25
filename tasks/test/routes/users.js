import jwt from "jwt-simple";

describe("Routes: Users", () => {
    const Users = app.db.models.Users;
    const jwtSecret = app.libs.config.jwtSecret;
    let token;
    beforeEach(done => {
        Users.destroy({where: {}})
            .then(() => Users.create({name: "janusz", email: "janusz@wp.pl", password: "cebula123"}))
            .then(user => {
                token = jwt.encode({id: user.id}, jwtSecret);
                done();
            });
    });
    describe("GET /user", () => {
        describe("status 200", () => {
            it("returns an authenticated user", done => {
                request.get("/user")
                    .set("Authorization", `JWT ${token}`).expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql("janusz");
                        expect(res.body.email).to.eql("janusz@wp.pl");
                        done(err);
                    });
            });
        });
    });
    describe("DELETE /user", () => {
        describe("status 204", () => {
            it("deletes an authenticated user", done => {
                request.delete("/user")
                    .set("Authorization", `JWT ${token}`).expect(204)
                    .end((err, res) => done(err));
            });
        });
    });
    describe("POST /users", () => {
        describe("status 200", () => {
            it("creates a new user", done => {
                request.post("/users")
                    .send({name: "marek", email: "marek@wp.pl", password: "123"})
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql("marek");
                        expect(res.body.email).to.eql("marek@wp.pl");
                        done(err);
                    });
            });
        });
    });
});