describe('The angularCancelOnNavigateModule', function () {

  var
    http,
    httpBackend,
    location,
    rootScope,
    successFn,
    errorFn;

  beforeEach(module('angularCancelOnNavigateModule'));

  beforeEach(inject(function ($http, $httpBackend, $location, $rootScope) {
    http = $http;
    httpBackend = $httpBackend;
    location = $location;
    rootScope = $rootScope;
    successFn = jasmine.createSpy('success');
    errorFn = jasmine.createSpy('error');
  }));

  function doGet() {
    http.get('/abc').success(successFn).error(errorFn);
  }

  it('should succeed normally without route change', function () {
    httpBackend.when('GET', '/abc').respond();
    doGet();
    httpBackend.flush();

    expect(successFn).toHaveBeenCalled();
    expect(errorFn).not.toHaveBeenCalled();
  });

  it('should fail normally without route change', function () {
    httpBackend.when('GET', '/abc').respond(404);
    doGet();
    httpBackend.flush();

    expect(successFn).not.toHaveBeenCalled();
    expect(errorFn).toHaveBeenCalled();
  });

  it('should not succeed or fail with route change', function () {
    httpBackend.when('GET', '/abc').respond();
    doGet();
    location.path('/def');
    rootScope.$digest();
    httpBackend.verifyNoOutstandingRequest();

    expect(successFn).not.toHaveBeenCalled();
    expect(errorFn).not.toHaveBeenCalled();
  });

});
