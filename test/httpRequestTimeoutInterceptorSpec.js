describe('The httpRequestTimeoutInterceptor', function () {

  var httpPendingRequestsServiceMock,
    httpRequestTimeoutInterceptor,
    qMock,
    responseMock = {
      config: {
        timeout: {}
      }
    },
    responseMockWithTimeout = {
      config: {
        timeout: {
          isGloballyCancelled: true
        }
      }
    };

  beforeEach(module('angularCancelOnNavigateModule'));

  beforeEach(function () {
    module(function ($provide) {
      qMock = jasmine.createSpyObj('$q', ['defer', 'reject']);
      httpPendingRequestsServiceMock = jasmine.createSpyObj('HttpPendingRequestsServiceMock', ['newTimeout']);
      $provide.value('$q', qMock);
      $provide.value('HttpPendingRequestsService', httpPendingRequestsServiceMock);
    })
  });

  beforeEach(inject(function (HttpRequestTimeoutInterceptor) {
    httpRequestTimeoutInterceptor = HttpRequestTimeoutInterceptor;
  }));

  it('should set a cancel promise on the config', function () {
    var promiseMock = {};
    httpPendingRequestsServiceMock.newTimeout.and.returnValue(promiseMock);

    var result = httpRequestTimeoutInterceptor.request({});

    expect(httpPendingRequestsServiceMock.newTimeout).toHaveBeenCalledWith();
    expect(result.timeout).toBe(promiseMock);
  });

  it('should not set a cancel promise on the config when request already has timeout', function () {
    var result = httpRequestTimeoutInterceptor.request({ timeout: 10 });

    expect(httpPendingRequestsServiceMock.newTimeout).not.toHaveBeenCalled();
    expect(result.timeout).toBe(10);
  });

  it('should not set a cancel promise on the config when request sets noCancelOnRouteChange', function () {
    var result = httpRequestTimeoutInterceptor.request({ noCancelOnRouteChange: true });

    expect(httpPendingRequestsServiceMock.newTimeout).not.toHaveBeenCalled();
    expect(result.timeout).toBeUndefined();
  });

  it('should return a normal response when not cancelled', function () {
    httpRequestTimeoutInterceptor.responseError(responseMock);

    expect(qMock.reject).toHaveBeenCalledWith(responseMock);
  });

  it('should return a new promise response when cancelled', function () {
    qMock.defer.and.returnValue({});

    httpRequestTimeoutInterceptor.responseError(responseMockWithTimeout);

    expect(qMock.defer).toHaveBeenCalledWith();
  });

});
