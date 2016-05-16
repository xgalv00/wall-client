angular.module('pizzaDayApp')
    .factory('AuthService', ['$http', 'URLS', function ($http, URLS) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post(URLS.domain + URLS.login, credentials);
        };

        return authService;
    }])
;
