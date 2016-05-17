angular.module('pizzaDayApp')
    .controller('ApplicationController', ['$scope', '$location', '$localStorage', 'AuthService', function ($scope, $location, $localStorage, AuthService) {
        $scope.$storage = $localStorage;
        $scope.currentUser = $scope.$storage.user;

        $scope.setCurrentUser = function (user) {
            if (!user) {
                delete $scope.$storage.user;
            } else {
                $scope.$storage.user = user;
            }
            $scope.currentUser = user;
        };
        $scope.isAuthenticated = function () {
            return Boolean($scope.currentUser);
        };
        $scope.logout = function () {
            AuthService.logout().then(function (res) {
                delete $scope.$storage.token;
                $scope.setCurrentUser(null)
            }, function (err) {
                console.log('Logout error');
                console.log(err);
            });
        }
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
            //TODO add another auth checking for this view
            if ($scope.currentUser) {
                $state.go('app.posts');
            }
            var vm = this;

            vm.credentials = {
                username: '',
                password: ''
            };

            vm.error = '';

            vm.login = function () {
                AuthService.login(vm.credentials).then(function (res) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.$storage.token = res.data.key;
                    $scope.setCurrentUser(res.data.user);
                    $state.go('app.posts')
                }, function (err) {
                    //TODO replace by meaningful error handling
                    vm.error = err.data.non_field_errors.join(' ');
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
            }

        }
    ])
    .controller("RegisterCtrl", ['$scope', '$rootScope', 'AUTH_EVENTS', '$state', 'AuthService',
        function ($scope, $rootScope, AUTH_EVENTS, $state, AuthService) {
            var vm = this;

            vm.credentials = {
                username: '',
                email: '',
                password1: '',
                password2: ''
            };

            vm.error = '';

            vm.register = function () {
                //TODO add password confirm match checking
                // http://stackoverflow.com/questions/26842216/angularjs-password-confirmation-nomatch-not-working
                AuthService.register(vm.credentials).then(function (res) {
                    debugger;
                    //TODO go to success registration page
                    $state.go('app.login');
                }, function (err) {
                    //TODO replace by meaningful error handling
                    vm.error = err.data.non_field_errors.join(' ');
                });
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
    .controller('PostListController', ['$scope', '$rootScope', '$resource', 'URLS', 'Upload', '$timeout', '$uibModal', function ($scope, $rootScope, $resource, URLS, Upload, $timeout, $uibModal) {
        var Posts = $resource(URLS.domain + URLS.posts, {},
            {query: {method: 'GET', isArray: false}});
        $scope.post_list = Posts.query();
        $scope.newPost = {};
        $scope.addPost = function (newPost) {
            newPost.image.upload = Upload.upload({
                url: URLS.domain + URLS.posts,
                data: {description: newPost.description, image: newPost.image},
                headers: {'Authorization': 'Token ' + $scope.$storage.token}
            });

            newPost.image.upload.then(function (response) {
                $timeout(function () {
                    newPost.image.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });
        };
        $scope.editedPost = {};
        $scope.openEditPost = function (_post) {

            var modalInstance = $uibModal.open({
                templateUrl: 'editPostModalContent.html',
                controller: 'EditModalInstanceCtrl',
                resolve: {
                    post: function () {
                        return _post;
                    }
                }
            });

            // modalInstance.result.then(function (selectedItem) {
            //     $scope.selected = selectedItem;
            // }, function () {
            //     $log.info('Modal dismissed at: ' + new Date());
            // });
        };
    }])
    .controller('EditModalInstanceCtrl', ['$scope', '$uibModalInstance', 'post', function ($scope, $uibModalInstance, post) {
        $scope.post = post;
        debugger;
        $scope.editPost = function (post_id, editedPost) {
            debugger;
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
;
