angular.module('pizzaDayApp')
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
    .controller("LoginCtrl", ['$state',
        function ($state) {
            var vm = this;

            vm.credentials = {
                email: '',
                password: ''
            };

            vm.error = '';

            vm.login = function () {
                console.log('call to login');
            };
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
            {name: "Test", author: "Author", image:"http://i.imgur.com/VBN5fJw.jpg", description: "Test description", date: new Date()},
            {name: "Test1", author: "Author1", image:"http://i.imgur.com/VBN5fJw.jpg", description: "Test description", date: new Date()},
        ]
    }])
;
