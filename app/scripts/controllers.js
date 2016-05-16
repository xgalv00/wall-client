angular.module('pizzaDayApp')
    .controller('ApplicationController', ['$scope', '$location', '$localStorage', 'AuthService', function ($scope, $location, $localStorage, AuthService) {
        $scope.currentUser = null;
        $scope.$storage = $localStorage;
        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };
        $scope.isAuthenticated = function () {
            return Boolean($scope.currentUser);
        };
    }])
    .controller('HeaderController', ['$scope', '$location', function ($scope, $location) {
        $scope.getClass = function (path) {
            var cssClass = '';
            if (path === '/') {
                cssClass = ($location.path() === path) ? 'active' : '';
            } else {
                cssClass = ($location.path().substr(0, path.length) === path) ? 'active' : '';
            }
            return cssClass;
        }
    }])
    .controller("LoginCtrl", ['$scope', '$rootScope', '$state', 'AUTH_EVENTS', 'AuthService',
        function ($scope, $rootScope, $state, AUTH_EVENTS, AuthService) {
            var vm = this;

            vm.credentials = {
                username: '',
                password: ''
            };

            vm.error = '';

            vm.login = function () {
                debugger;
                AuthService.login(vm.credentials).then(function (res) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.$storage.token = res.data.key;
                    $scope.setCurrentUser(res.data.user);
                }, function (err) {
                    vm.error = err.message;
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
            }

        }
    ])
    .controller("RegisterCtrl", ['$state',
        function ($state) {
            var vm = this;

            vm.credentials = {
                email: '',
                password: ''
            };

            vm.error = '';

            vm.register = function () {
                console.log('call to register');
            };
        }
    ])
    .controller("ResetCtrl", ['$state',
        function ($state) {
            var vm = this;

            vm.credentials = {
                email: ''
            };

            vm.error = '';

            vm.reset = function () {
                // $meteor.forgotPassword(vm.credentials).then(
                //     function () {
                //         $state.go('app.login');
                //     },
                //     function (err) {
                //         vm.error = 'Error sending forgot password email - ' + err;
                //     }
                // );
                console.log('call to reset');
            };
        }
    ])
    .controller('PostListController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.posts = [
            {
                name: "Test",
                author: "Author",
                image: "http://i.imgur.com/VBN5fJw.jpg",
                description: "Test description",
                date: new Date()
            },
            {
                name: "Test1",
                author: "Author1",
                image: "http://i.imgur.com/VBN5fJw.jpg",
                description: "Test description",
                date: new Date()
            },
        ]
    }])
;
