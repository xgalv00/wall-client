angular.module('pizzaDayApp')
    .factory('AuthService', ['$http', 'URLS', function ($http, URLS) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post(URLS.domain + URLS.login, credentials);
        };
        authService.logout = function () {
            return $http
                    .post(URLS.domain + URLS.logout);
        };
        

        return authService;
    }])
;
