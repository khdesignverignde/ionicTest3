angular.module('starter.controllers', ['ionic'])

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
    $scope.stateParams = $stateParams;
})


.controller('NewsCtrl', function($scope, $http) {
    $scope.entries = [];
    
    $http.get('json/newsdata.json').then(
        function(resp){
            $scope.entries = resp.data;
        }, function(err){
            alert(err);
        });
})

.controller('IonicUICtrl', function($scope){
    $scope.textData = {};
})


.controller('SlideboxCtrl', function($scope){
    $scope.items = [ 
        {
            "id":1,
            "title": "title1",
            "description": "description"
        },
        {
            "id":2,
            "title": "title2",
            "description": "description"
        },
        {
            "id":3,
            "title": "title3",
            "description": "description"
        },
        {
            "id":4,
            "title": "title4",
            "description": "description"
        }
    ];
    
    $scope.share = function(item){
        alert(item.id);
    };
    $scope.edit = function(item){
        alert(item.id);
    };
    
    $scope.moveItem = function(item, fromIndex, toIndex) {
      //Move the item in the array
      $scope.items.splice(fromIndex, 1);
      $scope.items.splice(toIndex, 0, item);
    };
    
})

.controller('ActionSheetCtrl', function($scope, $ionicActionSheet, $timeout) {
    
    $scope.onDragRight = function(){
        alert('dragged');
    };
    
    $scope.show = function() {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '<b>Share</b> This' },
          { text: 'Move' }
        ],
        destructiveText: 'Delete',
        titleText: 'Modify your album',
        cancelText: 'Cancel',
        cancel: function() {
             // add cancel code..
           },
        buttonClicked: function(index) {
            alert(index);
          return true;
        }
      });

      // For example's sake, hide the sheet after two seconds
      $timeout(function() {
        hideSheet();
      }, 2000);

    };
 })

.controller('NgCordovaCtrl', function( $scope, $cordovaVibration, $cordovaDevice, 
                                       $cordovaBarcodeScanner, $cordovaCapture, 
                                       $cordovaBatteryStatus){
    $scope.output = '';
    
    var generateOutput = {
        clear: function(){$scope.output = '';},
        objectProperties: function(obj, name){
            if(!name) name = 'object';
            var str = name + ':<br>---------------------------------------------------------<br>';
            for(var i in obj){str += i + ': ' + ((typeof obj[i] !== 'function') ? obj[i] : '(function)')+ '<br>';}
            str += '<br><br>';str += $scope.output;$scope.output = str;},
        string: function(s){
            var str = 'string:<br>---------------------------------------------------------<br>' + s+ '<br><br>';
            str += $scope.output;$scope.output = str;}};
    
    
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
    
    $scope.captureImage = function() {
        var options = { limit: 3 };

        $cordovaCapture.captureImage(options).then(function(imageData) {
          // Success! Image data is here
          generateOutput.objectProperties(imageData, 'captureImage');
        }, function(err) {
          // An error occured. Show a message to the user
            generateOutput.objectProperties(err, 'captureImage:fail');
        });
      };
    
    
    $cordovaBatteryStatus.onBatteryStatus(function(result) {
        var batteryLevel = result.level;       // (0 - 100)
        var isPluggedIn  = result.isPlugged;   // bool

        var o = {
            batteryLevel: batteryLevel,
            isPluggedIn: isPluggedIn
        };
        generateOutput.objectProperties(o, 'batteryStatus');
    });
})

.directive('superElement', function(){
    return {
        restrict: 'E', //E für Element (Typ der Direktive)
        template: '<div class="super-element"><h1 style="text-align: center;">Super Element</h1><p style="text-align: center;">{{text}}</p></div>"', // Template, welches die Direktive lädt
        controller: function($scope){
            $scope.text = 'Super element jetzt neu!';
        }
    };
});

;