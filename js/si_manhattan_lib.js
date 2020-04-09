(function () {
	var Manhattan = function(containerId, options){
		this.containerId = containerId;
	};
	Manhattan.prototype.render = function (options) {
		console.log(options , this.containerId);
		var yAxisMaxValue =  ManhattanJs.CalculateRoundedTen(options.overs);

		if(options.innings > 1) {
			var secondInningsMaxValue = ManhattanJs.CalculateRoundedTen(options.secondInnings);
			console.log(secondInningsMaxValue);
			options.secondInningsMaxValue =  secondInningsMaxValue;
		}

		var maxYAxisValue = yAxisMaxValue;
		if(secondInningsMaxValue) {
			if(secondInningsMaxValue > yAxisMaxValue) {
				maxYAxisValue = secondInningsMaxValue;
			}
		}

		var yAxisStepSizedMkp =  ManhattanJs.yAxisValues(maxYAxisValue);
		var xAxisSteps =  ManhattanJs.xAxisValuesAndGraph(options.totalOvers, options.overs, yAxisMaxValue, options.innings, options);

		var powerPlay = ManhattanJs.powerPlay(options.powerPlay, options.overs);
		var xAxisLabel = ManhattanJs.xAxisLabel(options.xAxisLabel);
		var yAxisLabel = ManhattanJs.xAxisLabel(options.yAxisLabel);

		var graphsFinalMkp = ManhattanJs.graphsFinalMkp(yAxisStepSizedMkp, xAxisSteps, powerPlay, xAxisLabel, yAxisLabel);
		$('#'+this.containerId).html(graphsFinalMkp);
		console.log(xAxisLabel, yAxisLabel)
	};
 	ManhattanJs = {

		Manhattan: function (containerId, options) {
			console.log(containerId, options);
			var _manhattan = new Manhattan(containerId, options);
			this.render = function () {
		 		_manhattan.render(options);
		 	 };
			//console.log(_chart);
			// this.options = _chart._options;
		},
		xAxisLabel: function(label) {
			return '<div class="si-score-label"><span>'+label+'</span> </div>'
		},
		yAxisLabel: function(label) {
			return '<div class="si-over-label"><span>'+label+'</span> </div>'
		},
		CalculateRoundedTen: function(overs) {
			var maxRun = overs[0].Runs
			for(var i = 0; i < overs.length; i++) {
				if(parseInt(overs[i].Runs) > parseInt(maxRun)) {
					maxRun = overs[i].Runs;
				}
			}
			return Math.round(maxRun /10) * 10;
		},
		yAxisMaxValue: function(overs) {
			var maxRun = overs[0].Runs
			for(var i = 0; i < overs.length; i++) {
				if(parseInt(overs[i].Runs) > parseInt(maxRun)) {
					maxRun = overs[i].Runs;
				}
			}
			return maxRun;
		},
		yAxisValues: function(maxvalue) {
			var stepSize =  (maxvalue/10);
			var stepSizeMkp = ''
			
			for(var i = 10; i >= 1; i--) {
				var step = stepSize * i;
				stepSizeMkp += '<div class="si-line-wrap"><span class="si-lable">'+step+'</span></div>';
			}
			var yAxisMkp = '<div class="si-score-line">'+stepSizeMkp+'</div>';
			return yAxisMkp;
		},
		xAxisValuesAndGraph: function(totalOvers, overs, yAxisMaxValue, innings, options) {
			if(totalOvers % 5 !== 0) {
				totalOvers = Math.round(totalOvers/10) * 10;
			} 
			var xAxisAndGraphMkp = ''; 
			var maxInAInnOver = overs.length;
			if(parseInt(innings) > 1) {
				maxInAInnOver = (overs.length < options.secondInnings.length) ? options.secondInnings.length : overs.length;
			}
			for(var i = 0; i < maxInAInnOver; i++) {
				
				var secondInningsGraphMkp = '';
				var xAxisLabel = '';
				var wicketsMkp = '';
				if(parseInt(innings) == 2) {
					if(options.secondInnings[i]) {
						var secondInnwicketsMkp = '';
						if(parseInt(options.secondInnings[i].Wickets) > 0) {
						var secondInnwickets = parseInt(options.secondInnings[i].Wickets);
						for(var w = 0; w < secondInnwickets; w++) {
							secondInnwicketsMkp +=  '<span class="si-wicket si-wicket'+w+'"><em class="si-w-txt"></em></span>'
						}
						
					}
						var secondInnsYaxisValue = (parseInt(options.secondInnings[i].Runs) / options.secondInningsMaxValue) * 100;
						secondInningsGraphMkp = '<div class="si-over teamB" style="height: '+secondInnsYaxisValue+'%">'+secondInnwicketsMkp+'</div>';
					} else {
						secondInningsGraphMkp = '<div class="si-over teamB" style="height: 0%"></div>';
					}
					
				}
				if((i + 1) % 5 == 0 || (i + 1) == 1) {
					var overNumber = i + 1;
					xAxisLabel = 'title='+ overNumber;
				}
				if(overs[i]) {
					var YaxisValue = (parseInt(overs[i].Runs) / yAxisMaxValue) * 100;
					if(parseInt(overs[i].Wickets) > 0) {
						var wickets = parseInt(overs[i].Wickets);
						for(var w = 0; w < wickets; w++) {
							wicketsMkp +=  '<span class="si-wicket si-wicket'+w+'"><em class="si-w-txt"></em></span>'
						}
						
					}
					xAxisAndGraphMkp += '<div class="si-over-wrap" '+xAxisLabel+'><div class="si-over teamA" style="height: '+YaxisValue+'%"> '+wicketsMkp+'</div>'+secondInningsGraphMkp+'</div>';
				} else {
					xAxisAndGraphMkp += '<div class="si-over-wrap" '+xAxisLabel+'><div class="si-over teamA" style="height: 0%"> </div>'+secondInningsGraphMkp+'</div>';
				}
				
				
			}
			var graphsFinalMkp = '<div class="si-over-container">'+xAxisAndGraphMkp+'</div>';
			return graphsFinalMkp;
		},
		powerPlay: function(powerPlay, overs) {
			var powerPlayWidth = (parseInt(powerPlay)/ parseInt(overs)) * 100;
			var powerplayMkp = '<div class="si-powerPlay-label" style="width:'+powerPlayWidth+'%"><span>powerplay</span></div>';
			return powerplayMkp;
		},
		graphsFinalMkp: function(yAxisStepSizedMkp, xAxisSteps, powerPlay, xAxisLabel, yAxisLabel) {
			var completeChatWrap = '<div class="si-chart-wrap"> '+xAxisSteps + powerPlay + yAxisLabel + xAxisLabel  +'</div>'
			return '<div class="si-manhatten"><div class="si-manhatten__container">'+ yAxisStepSizedMkp + completeChatWrap + '<div></div>';
		}


	}
	

})();