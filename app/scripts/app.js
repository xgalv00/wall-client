angular.module('pizzaDayApp', ['ui.router', 'ngStorage', 'ngResource', 'ngFileUpload', 'ui.bootstrap'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, URLS, $resourceProvider) {
        // $locationProvider.html5Mode(true);
        $stateProvider

        // route for the home page
            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'views/header.html',
                        controller: 'HeaderController'
                    },
                    'content': {
                        templateUrl: 'views/home.html'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                }

            })

            // route for the wall page
            .state('app.posts', {
                url: 'posts',
                views: {
                    'content@': {
                        templateUrl: 'views/posts.html',
                        controller: 'PostListController'
                    }
                }
            })



            // route for the group detail page
            // .state('app.groupdetail', {
            //     url: 'groups/:id',
            //     views: {
            //         'content@': {
            //             templateUrl: 'client/groups/group-detail/group-detail.ng.html',
            //             controller: 'GroupDetailController',
            //             resolve: {
            //                 currentUser: ($q, $stateParams, $meteor, $state) => {
            //                     if (Meteor.userId() == null) {
            //                         return $q.reject('AUTH_REQUIRED');
            //                     }
            //                     //Redirects for dummy group id and if user not in group
            //                     $meteor.subscribe('groups').then(function (subscriptionHandle) {
            //                         var group = $meteor.object(Groups, $stateParams.id);
            //                         if (group._id === undefined) {
            //                             $state.go("app.groups");
            //                         }
            //                         var userId = Meteor.userId();
            //                         if ((userId && (_.contains(group.users, userId) || userId == group.owner._id))) {
            //                             return $q.resolve();
            //                         } else {
            //                             $state.go("app.groups");
            //                         }
            //                     });
            //                 }
            //             }
            //         }
            //     }
            // })
            .state('app.login', {
                url: 'login',
                views: {
                    'content@': {
                        templateUrl: 'views/login.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'lc'
                    }
                }
            })
            .state('app.register', {
                url: 'register',
                views: {
                    'content@': {
                        templateUrl: 'views/register.html',
                        controller: 'RegisterCtrl',
                        controllerAs: 'rc'
                    }
                }
            })
            .state('app.register.success', {
                url: 'success',
                views: {
                    'content@': {
                        templateUrl: 'views/register-success.html',
                    }
                }
            })
            .state('app.verify', {
                url: 'verify-email/:key',
                views: {
                    'content@': {
                        templateUrl: 'views/verify-email.html',
                        controller: 'VerifyEmailCtrl'
                    }
                }
            })
            .state('app.resetpw', {
                url: 'resetpw',
                views: {
                    'content@': {
                        templateUrl: 'views/reset-password.html',
                        controller: 'ResetCtrl',
                        controllerAs: 'rpc'
                    }
                }
            })
            .state('app.logout', {
                url: 'logout',
                controller: function ($scope, $http, URLS) {
                    debugger;
                    $http
                        .post(URLS.domain + URLS.logout).then(function (res) {
                        delete $scope.$storage.token;
                        $scope.setCurrentUser(null)
                    }, function (err) {
                        console.log('Logout error');
                        console.log(err);
                    });

                }
            })
        ;

        $urlRouterProvider.otherwise('/');
        $resourceProvider.defaults.stripTrailingSlashes = false;
    })
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireUser promise is rejected
            // and redirect the user back to the main page
            debugger;
            if (error === 'AUTH_REQUIRED') {
                $state.go('app.login');
            }
            if (error === 'GROUPS_REDIRECT') {
                debugger;
                $state.go('app.posts');
            }
        });
    })
    //directive from http://stackoverflow.com/a/18997012/1649855
    //whole discussion from http://stackoverflow.com/questions/14012239/password-check-directive-in-angularjs
    .directive('repeatPassword', [function () {
        return {
            require: "ngModel",
            link: function (scope, elem, attrs, ctrl) {
                var otherInput = elem.inheritedData("$formController")[attrs.repeatPassword];

                ctrl.$parsers.push(function (value) {
                    if (value === otherInput.$viewValue) {
                        ctrl.$setValidity("repeat", true);
                        return value;
                    }
                    ctrl.$setValidity("repeat", false);
                });

                otherInput.$parsers.push(function (value) {
                    ctrl.$setValidity("repeat", value === ctrl.$viewValue);
                    return value;
                });
            }
        };
    }])
;