describe('Routes: Index', () => {
    it('returns the status', done => {
        request.get('/')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.eql({"status": "Ok"});
                done(err);
            });
    });
});