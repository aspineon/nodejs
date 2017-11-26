module.export = APP => {
    /**
     *
     * @api {get} / API Status
     * @apiGroup Status
     * @apiSuccess {String} status API Status' message
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"status": "Ok"}
     **/
    APP.get('/', (req, res) => {
        res.json({status: 'Ok'})
    });
};