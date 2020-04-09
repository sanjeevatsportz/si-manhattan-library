# si-manhattan-library
A library to create manhattan dynamically based on parameters passed.

1. Clone repository
	git clone https://github.com/sanjeevatsportz/si-manhattan-library.git

2. Pass div with appropriate parameters to load manhattan

	var manhattanObj = {overs : oversToPlot, totalOvers: 20, 'innings': 1, 'powerPlay': 6, 'xAxisLabel': 'Overs', 'yAxisLabel': 'Runs Scored'}
	new ManhattanJs.Manhattan("id_of_container", manhattanObj);

	--- overs to be and array of objects with params 
		{"Batsmen":{"3861":{"Batsman":"Lendl Simmons","Runs":"4"},"64543":{"Batsman":"Brandon King","Runs":"5"}}

	--- innings to be number of innings
		-- if innings greater then 1 add overs (array of objects) into node manhattanObj.secondInnings.



# for reference visit example/manhattan.html
