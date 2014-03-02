'use strict';

describe('ilmomasiina landing page', function() {

  var landingPage;

  var IlmomasiinaLandingpage = function() {
    this.hello = element(by.css('article p'));

    this.get = function() {
      browser.get('#/');
    };
  }

  beforeEach(function() {
    landingPage = new IlmomasiinaLandingpage();
  });

  it('displays correct initial information', function() {
    landingPage.get();
    expect(landingPage.hello.getText()).toEqual('Hello World!');
  }); 
});
