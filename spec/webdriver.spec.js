describe('grunt-webdriverjs test', function () {

    it('checks if title contains the search query', function(done) {

        browser
            .url('http://webdriverjs.christian-bromann.com/')
            .getTitle(function(err,title) {
                expect(err).toBe(null);
				expect(title).toBe('WebdriverJS Testpage');
            })
            .end(done);

    });

});