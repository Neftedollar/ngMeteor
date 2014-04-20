var ngMeteorUser = angular.module('ngMeteor.user', []);

ngMeteorUser.factory('$user', ['$rootScope','$timeout', function($rootScope, $timeout){
    var scope = $rootScope.$new(true);
    scope.user = {};
//    scope.isLoggedIn = !!Accounts.connection.userId();
//    scope.user = Meteor.users.findOne({_id: Accounts.connection.userId()});

    var comp = Deps.autorun(function(c){
        scope.user.profile = Meteor.user() && Meteor.user().profile;
        scope.user.isLoggedIn = !!Meteor.user();
        scope.user._id = Meteor.user() && Meteor.user()._id;
        !c.firstRun && $timeout(function(){
            scope.$apply();
        });
    });
    scope.$on('$destroy', function() {
        comp.stop();
    });
    return scope.user;
}]);
