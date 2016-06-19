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

        authService.register = function (credentials) {
            return $http
                .post(URLS.domain + URLS.register, credentials);
        };

        authService.confirmEmail = function (key) {
            return $http
                .post(URLS.domain + URLS.verify, {key: key});
        };


        return authService;
    }])
    .factory('Post', ['$resource', 'URLS', function ($resource, URLS) {
        return $resource(URLS.domain + URLS.posts, {id: '@_id'}, {
            query: {
                method: 'GET',
                isArray: false
            },
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    }])
;
