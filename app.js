var app = angular.module('App', []);

app.controller('MainCtrl', function($scope, $interval) {
    $scope.stpwtch = {      // $scope.stpwtch model
        debug: '',          // debug message
        startTime: 0,       // start timestamp (reset)
        gameClock: 0,       // time offset from game start [ms]
        shotClock: 0,       // time offset from attack start [ms]
        elapsedTime: 0,     // internal variable
        restartTime: 0,     // internal timestamp
        running: false,     // running flag [true, false]
        label: 0,           // stopwatch digital display value
        status: 0,          // can be 0, 1 (yellow), 2 (red) depending on remaining .shotClock
        rotateSVGbuttons: 0, //(window.innerWidth > window.innerHeight) ? 270 : 0,		// if it's a landscape, then rotate the buttons for 270°, if not "rotate by 0° "
        viewBox: (window.innerWidth > window.innerHeight) ? "-500 200 1250 800" : "0 0 735 950",  // landscape/portrait switch - viewbox is different depending on orientation
        reset: function(){
          $scope.stpwtch.startTime = new Date();
          $scope.stpwtch.elapsedTime = $scope.stpwtch.shotClock = $scope.stpwtch.restartTime = $scope.stpwtch.label = $scope.stpwtch.status = 0;
        }, 
        start: function(){
            $scope.stpwtch.startTime = new Date();
            $scope.stpwtch.running = $interval(function() {
                var now = new Date();
                $scope.stpwtch.elapsedTime = now - $scope.stpwtch.startTime;
                $scope.stpwtch.shotClock = $scope.stpwtch.elapsedTime + $scope.stpwtch.restartTime;
                
                $scope.stpwtch.label = parseInt($scope.stpwtch.shotClock / 100).toFixed(2) / 10;  // round to 0.1 second
                
                if($scope.stpwtch.shotClock > 20 * 1000) {                     // shotClock running out
                    $scope.stpwtch.audio();
                    $scope.stpwtch.status = 1;
                }
                if($scope.stpwtch.shotClock > 30 * 1000) {                     // shotClock out
                    $scope.stpwtch.stop();
                    $scope.stpwtch.label = "I STEK!";
                    $scope.stpwtch.status = 2;
                }
            }, 31);  // default 31 ms
        },
        stop: function(){
            $interval.cancel($scope.stpwtch.running);
            $scope.stpwtch.running = false;
            $scope.stpwtch.restartTime += $scope.stpwtch.elapsedTime;
            $scope.stpwtch.elapsedTime = 0;
        },
        toggle: function(){ $scope.stpwtch.running ? $scope.stpwtch.stop() : $scope.stpwtch.start(); }, 
        audio: function(){ 
          $scope.stpwtch.audio = document.createElement('audio');
          $scope.stpwtch.audio.src = 'https://dl.dropboxusercontent.com/u/11038914/sheshnjak/stopwatch/CensorBeep.mp3';
          $scope.stpwtch.audio.play();
        }
    };

});

/*/ http://jsfiddle.net/spacm/HeMZP/   određivanje veličine viewporta

/* audio controller za zvučni alarm, uzeto iz http://www.ng-newsletter.com/posts/beginner2expert-scopes.html * /

app.controller('PlayerController', ['$scope', function($scope) {
  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.audio.src = 'https://dl.dropboxusercontent.com/u/11038914/sheshnjak/stopwatch/CensorBeep.mp3';
  $scope.play = function() {
    $scope.audio.play();
    $scope.playing = true;
  };
  $scope.stop = function() {
    $scope.audio.pause();
    $scope.playing = false;
  };
  $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop();
    });
  });
}]);

//*/