var app = angular.module('App', ['angular.directives-round-progress']);
app.controller('MainCtrl', function($scope, $interval) {

/*/ roundProgress setup
// round progress, osnovni primjer
    $scope.roundProgressData = {
        label: 0,
        percentage: 0
    };
// Here I synchronize the value of label and percentage in order to have a nice demo
    $scope.$watch('roundProgressData', function (newValue, oldValue) {
      newValue.percentage = newValue.label / 100;
    }, true);
*/
    
// $scope.stpwtch model    
    $scope.stpwtch = {
        startTime: 0,
        shotClock: 0,
        gameClock: 0,
        elapsedTime: 0,
        restartTime: 0,
        running: false,
        label: 0,
        percentage: 0,
        
        reset: function(){                          // resetiranje          
          $scope.stpwtch.startTime = new Date();
          $scope.stpwtch.elapsedTime = $scope.stpwtch.gameClock = $scope.stpwtch.restartTime = 0;
        },
        
        toggle: function(){                     // toggle start/stop
          if(!$scope.stpwtch.running){          // start   
                $scope.stpwtch.startTime = new Date();
                $scope.stpwtch.running = $interval(function() {
                    var now = new Date();
                    $scope.stpwtch.elapsedTime = now - $scope.stpwtch.startTime;
                    $scope.stpwtch.gameClock = $scope.stpwtch.elapsedTime + $scope.stpwtch.restartTime;
/* to $watch */                    $scope.stpwtch.label = parseInt($scope.stpwtch.gameClock / 1000);
/* to $watch */                    $scope.stpwtch.percentage = $scope.stpwtch.label / 100*3.339;
                }, 31);  // default 31 ms
            } else {                             // stop
                $interval.cancel($scope.stpwtch.running);
                $scope.stpwtch.running = false;
                $scope.stpwtch.restartTime += $scope.stpwtch.elapsedTime;
                $scope.stpwtch.elapsedTime = 0;
            }
        }
    };
});

/* izbrisati ispod
app.directive('stopwatch', function() { return {
  controller: function($scope, $interval) {
    var self = this;
    var totalElapsedMs = 0;
    var elapsedMs = 0;
    var startTime;
    var timerPromise;
    
    self.start = function() {
      if (!timerPromise) {
        startTime = new Date();
        timerPromise = $interval(function() {
          var now = new Date();
          elapsedMs = now.getTime() - startTime.getTime();
        }, 31);
      }
    };
    
    self.stop = function() {
      if (timerPromise) {
        $interval.cancel(timerPromise);
        timerPromise = undefined;
        totalElapsedMs += elapsedMs;
        elapsedMs = 0;
        $scope.stpwtch.elapsedTime = 1;
      }
    };

    self.reset = function() {
      startTime = new Date();
      totalElapsedMs = elapsedMs = 0;
    };
    
    self.getElapsedMs = function() {
      return totalElapsedMs + elapsedMs;
    };
  }
}});
*/