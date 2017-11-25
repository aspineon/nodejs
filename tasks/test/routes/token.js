describe("Routes: Token", () => {
    let Users = app.db.models.Users;
    describe("POST /token", () => {
        beforeEach(done => {
            Users.destroy({where: {}})
                .then(() => Users.create({name: 'Janusz', email: 'janusz@wp.pl', password: 'cebula123'}))
                .then(done());
        });
        describe("status 200", () => {
            it("renturns authenticated user token", done => {
                request.post('/token').send({email: 'janusz@wp.pl', password: 'cebula123'})
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.include.keys('token');
                        done(err);
                    });
            });
        });
        describe("status 401", () => {
            it("throws error when password is incorrect", done => {
                request.post('/token').send({email: 'janusz@wp.pl', password: 'cebula'})
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    });
            });
            it("throws error when email not exist", done => {
                request.post('/token').send({email: 'janusz2@wp.pl', password: 'cebula123'})
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    });
            });
            it("throws error when email or password is blank", done => {
                request.post('/token')
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    });
            });
        });
    });
});