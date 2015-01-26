angular.module('angularCancelOnNavigateModule')
  .service('HttpPendingRequestsService', function ($q) {
    var cancelPromises = [];

    function newTimeout() {
      var cancelPromise = $q.defer();
      cancelPromises.push(cancelPromise);
      return cancelPromise.promise;
    }

    function cancelAll() {
      angular.forEach(cancelPromises, function (cancelPromise) {
        cancelPromise.promise.isGloballyCancelled = true;
        cancelPromise.resolve();
      });
      cancelPromises.length = 0;
    }

    return {
      newTimeout: newTimeout,
      cancelAll: cancelAll
    };
  });
