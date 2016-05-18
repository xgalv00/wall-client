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
    .factory('PostsService', ['$resource', 'URLS', function ($resource, URLS) {
        var postsService = {};


        return postsService;
    }])
;
