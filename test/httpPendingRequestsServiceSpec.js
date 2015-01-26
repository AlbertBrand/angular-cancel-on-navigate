describe('The HttpPendingRequestsService', function () {

  var httpPendingRequestsService,
    qMock;

  beforeEach(module('angularCancelOnNavigateModule'));

  beforeEach(function () {
    module(function ($provide) {
      qMock = jasmine.createSpyObj('$q', ['defer', 'reject']);
      $provide.value('$q', qMock);
    })
  });

  beforeEach(inject(function (HttpPendingRequestsService) {
    httpPendingRequestsService = HttpPendingRequestsService;
  }));

  it('should return a new promise when creating a timeout', function () {
    var promiseMock = 'promise';
    qMock.defer.and.returnValue({ promise: promiseMock });

    var result = httpPendingRequestsService.newTimeout();

    expect(result).toBe(promiseMock);
  });

  it('should resolve all promises when cancelling', function () {
    var resolveSpy1 = jasmine.createSpy(),
      resolveSpy2 = jasmine.createSpy(),
      promiseMock1 = { promise: {}, resolve: resolveSpy1 },
      promiseMock2 = { promise: {}, resolve: resolveSpy2 };
    qMock.defer.and.returnValue(promiseMock1);
    httpPendingRequestsService.newTimeout();
    qMock.defer.and.returnValue(promiseMock2);
    httpPendingRequestsService.newTimeout();

    httpPendingRequestsService.cancelAll();

    expect(resolveSpy1).toHaveBeenCalledWith();
    expect(promiseMock1.promise.isGloballyCancelled).toBe(true);
    expect(resolveSpy2).toHaveBeenCalledWith();
    expect(promiseMock2.promise.isGloballyCancelled).toBe(true);
  });

});
