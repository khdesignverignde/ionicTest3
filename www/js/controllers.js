angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaVibration) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
      $cordovaVibration.vibrate(100); 
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('NewsCtrl', function($scope) {
    $scope.entries = [
        {
            "title": "News 1",
            "content": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <br>sed diam nonumy eirmod tempor invidunt ut."
        },
        {
            "title": "News 2",
            "content": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <br>sed diam nonumy eirmod tempor invidunt ut."
        },
        {
            "title": "News 3",
            "content": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <br>sed diam nonumy eirmod tempor invidunt ut."
        }
    ];
})

.controller('NgCordovaCtrl', function($scope, $cordovaVibration, $cordovaDevice, $cordovaBarcodeScanner){
    $scope.output = '';
    
    var generateOutput = {
        clear: function(){$scope.output = '';},
        objectProperties: function(obj, name){
            if(!name) name = 'object';
            var str = name + ':<br>---------------------------------------------------------<br>';
            for(var i in obj){str += i + ': ' + ((typeof obj[i] !== 'function') ? obj[i] : '(function)')+ '<br>';}
            str += '<br><br>';str += $scope.output;$scope.output = str;
        },
        string: function(s){
            var str = 'string:<br>---------------------------------------------------------<br>' + s+ '<br><br>';
            str += $scope.output;$scope.output = str;
        }
    };
    
    
    $scope.vibrate = function(){
      $cordovaVibration.vibrate(100); 
    };
    
    $scope.device = function(){
        var d = {
             device: $cordovaDevice.getDevice(),
             cordova: $cordovaDevice.getCordova(),
             model: $cordovaDevice.getModel(),
             platform: $cordovaDevice.getPlatform(),
             uuid: $cordovaDevice.getUUID(),
             version: $cordovaDevice.getVersion()
        }
        generateOutput.objectProperties(d, '$cordovaDevice');   
        generateOutput.objectProperties(d.device, '$cordovaDevice.getDevice');   
    };
    
    $scope.scanBarcode = function() { 
        $cordovaBarcodeScanner.scan().then(function(imageData) {
          // Success! Barcode data is here

            generateOutput.objectProperties(imageData, '$cordovaBarcodeScanner');  
        }, function(err) {
          // An error occured. Show a message to the user
            generateOutput.objectProperties(err, '$cordovaBarcodeScanner:fail');
        });
      };
    
    
    
    
})

;