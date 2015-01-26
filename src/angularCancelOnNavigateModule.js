angular
  .module('angularCancelOnNavigateModule', [])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('HttpRequestTimeoutInterceptor');
  })
  .run(function ($rootScope, HttpPendingRequestsService) {
    $rootScope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
      if (newUrl != oldUrl) {
        HttpPendingRequestsService.cancelAll();
      }
    })
  });
