
var app = angular.module('dota2ItemsGame', []);

app.controller("mainController", function($scope, $http, $timeout) {
	$scope.mainItem = null;
	$scope.itemsData = null;
	$scope.itemsDataComplex = null;
	$scope.resultItems = null;
	$scope.Score = 0;
	$scope.Streak = null;
	var f = 0;
	var rejectedTimes = 0;
	var Streaks = ["", "", "", "Killing Spree", "Dominating", "Mega Kill", "Unstoppable", "Wicked Sick", "Monster Kill", "Godlike", "Beyond Godlike"];
	var StreakIndex = 0;

	function shuffle(a) {
	    var j, x, i;
	    for (i = a.length; i; i--) {
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
	    }
	}

	function sleep(ms) {
        ms += new Date().getTime();
        while (new Date() < ms){}
    }

	$scope.startGame = function() {

		$http.get("../json/items.json").success(function(data) {
			f = 0;
			rejectedTimes = 0;
			$scope.Streak = Streaks[StreakIndex];
			$scope.itemsData = data.complex.concat(data.simple);
			$scope.itemsDataComplex = data.complex;
			$scope.resultItems = [];
			//var itemsData1 = $scope.itemsData.map(a => Object.assign({}, a));
			var rndInd = Math.floor(Math.random() * $scope.itemsDataComplex.length);
			$scope.mainItem = $scope.itemsDataComplex[rndInd];
			$scope.mainItem.consistof.forEach(function(item) {
				$scope.resultItems.push($scope.itemsData.find(function(element) {
					if (element.name === item)
						return true;
					else
						return false;
				}))
			})
			$scope.resultItems.forEach(function(item) {
				item.partof = "partof1";
			})

			var items_remain = (Math.floor(Math.random() * (11 - 5)) + 5) - $scope.resultItems.length;
			while(items_remain > 0) {
				var rndInd1 = Math.floor(Math.random() * $scope.itemsData.length);
				if ($scope.resultItems.includes($scope.itemsData[rndInd1]) || $scope.itemsData[rndInd1].name === $scope.mainItem.name)
					continue;
				else {
					var b = true;
					$scope.resultItems.forEach(function(item) {
						if (item.name + "1" === $scope.itemsData[rndInd1].name) {
							b = false;
						}
					})
					if (b) {
						$scope.resultItems.push($scope.itemsData[rndInd1]);
						items_remain -= 1;
					}
				}
			}

			shuffle($scope.resultItems);

			$timeout(function() {
			    $( ".partof1").draggable({
			    	revert: "invalid"
				});
				$( ".partof0").draggable({
				  	revert: function(is_valid_drop) {
						if (is_valid_drop) {
							rejectedTimes += 1;
							return true;
						}
						else {
							return true
						}
					},
				});
				$( ".droppable").droppable({
					create: function() {
						$(this).css({'border-color': '#555555'})
					},
					accept: ".partof1, .partof0",
					drop: function( event, ui ) {
						var $this = $(this);
						ui.draggable.position({
							my: "center",
							at: "center",
							of: $this,
							using: function(pos) {
								$(this).animate(pos, 300, "swing");
							}
						});
						if (ui.draggable.attr('class').split(' ')[0] === "partof1") {
							$(this).css({'border-color': 'green'})
							ui.draggable.draggable('disable', 1);
							$(this).droppable("destroy");
							f += 1;
						}
						else {
							$(this).css({'border-color': '#555555'})
						}
					},
					over: function(event, ui) {
						$(this).css({'border-color': '#e7a700'})
					},
					out: function(event, ui) {
						$(this).css({'border-color': '#555555'})
					}

				});
			}, 0);

			(function wait() {
			    console.log(rejectedTimes);
			    if ((f === $scope.mainItem.consistof.length && f !== 0) || rejectedTimes === 2) {
			    	if (rejectedTimes === 2)
					{
						rejectedTimes = 0;
						$scope.Score = 0;
						StreakIndex = 0;
						f = 0;
						$(".main-streak").css({"display":"none"});
						$scope.startGame();
					}
					else {
			    		$scope.Score += 100;
			    		if (StreakIndex === 2) {
			    			$(".main-streak").fadeIn(2000);
			    		}
			    		if (StreakIndex < 10) {
			    			StreakIndex += 1;
			    		}
			    		f = 0;
			        	$scope.startGame();
			        }
			    } else {
			        $timeout( wait, 1000 );
			    }
			})();
		});
	};
	$scope.startGame();
})

app.directive("mainDir", function($timeout) {
	return {
		restrict: 'E',
      	templateUrl: '../templates/main.tpl.html',
		link: function() {
			console.log(555);
      	}
	}
})
