angular.module('gamersRoom.controllers', [])

.controller('LoginCtrl', function($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope ) {
  console.log( 'Login controller loaded..' );

  var ref = new Firebase( 'https://gamersroom.firebaseio.com' );
  var auth = $firebaseAuth( ref );

  $ionicModal.fromTemplateUrl( 'templates/signup.html', {
    scope : $scope
  }).then( function ( modal ) {
    $scope.modal = modal;
  });

  // creating user

  $scope.createUser = function ( user ) {
    console.log( 'create user..' );
    if( user && user.email && user.password && user.username) {
      $ionicLoading.show({
        template: 'Signing Up...'
      });

      auth.$createUser( {
        email : user.email,
        password: user.password
      }).then( function ( data ) {
        alert('User created successfully.');
        ref.child('users').child( data.uid ).set({
          email:user.email,
          username: user.username
        });
        $ionicLoading.hide();
        $scope.modal.hide();
      }).catch( function ( error ) {
        aler( 'error: ' + error );
        $ionicLoading.hide();
      })
    } else {
      alert( 'Fill up the details.' );
    }
  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
