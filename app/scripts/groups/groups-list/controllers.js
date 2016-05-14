angular.module('pizzaDayApp')
    .controller('GroupListController', ['$scope', '$rootScope', '$meteor', function ($scope, $rootScope, $meteor) {
        $scope.$meteorSubscribe('groups').then(function (subsHandler) {
            $scope.groups = $meteor.collection(Groups);
        });
        $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
        $scope.$meteorSubscribe('users').then(function (subsHandler) {
            $scope.users = $meteor.collection(Meteor.users, false);
        });

        $scope.addImages = function (files) {
            if (files.length > 0) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $scope.$apply(function () {
                        $scope.imgSrc = e.target.result;
                        $scope.myCroppedImage = '';
                    });
                };

                reader.readAsDataURL(files[0]);
            }
            else {
                $scope.imgSrc = undefined;
            }
        };
        $scope.isOwner = function (group) {
            return group && group.owner && ($rootScope.currentUser._id == group.owner._id);
        };
        $scope.newGroup = {};
        $scope.addGroup = function (newGroup) {
            if ($scope.myCroppedImage !== undefined && $scope.myCroppedImage !== '') {
                $scope.images.save($scope.myCroppedImage).then(function (result) {
                    newGroup.image = result[0]._id;
                    newGroup.owner = $rootScope.currentUser._id;
                    $meteor.call('addGroup', newGroup).then(
                        function (result) {
                            $scope.imgSrc = undefined;
                            $scope.myCroppedImage = '';
                            $scope.newGroup = {};
                            $('#addGroupModal').modal('hide');
                        },
                        function (err) {
                            console.log('failed', err);
                        }
                    );
                    //$scope.groups.save(newGroup);

                }, function (err) {
                    // an error occurred while saving the todos: maybe you're not authorized
                    console.error('An error occurred. The error message is: ' + err.message);
                });

            } else {
                newGroup.owner = $rootScope.currentUser._id;
                $meteor.call('addGroup', newGroup).then(
                    function (result) {
                        $scope.imgSrc = undefined;
                        $scope.myCroppedImage = '';
                        $scope.newGroup = {};
                        $('#addGroupModal').modal('hide');
                    },
                    function (err) {
                        console.log('failed', err);
                    }
                );
            }
        };

        $scope.removeGroup = function (group) {
            $meteor.call('removeGroup', group).then(function (result) {
                    console.log('success remove');
                },
                function (err) {
                    console.log('error remove' + err.message);
                })
        };
    }])
;