<head>
	<meta charset="utf-8">
	<title>Pop. Genetics Lab - BIOS 101 UIC Sum14</title>
	<link rel="stylesheet" href="assets/popgraph.css">

	<script src="assets/Chart.js"></script>
	<script src="assets/popgraph.js"></script>
</head>

	*1/2/18: Hardy-Weinberg equilibrium is maintained for much longer, in the face of extinctions due to discretization error, by small amounts of gene flow.*

	<!-- <div id="main"> -->
		<p>Initial population: <select id="initAA" onchange="updateRunOps()">
			<option value="5">5</option>
			<option value="25">25</option>
			<option value="250" selected="">250</option>
			<option value="2500">2500</option>
		</select> AA : <span id="initAa">500</span> Aa : <span id="initaa">250</span> aa</p>
		<p>Mating procedure: <span id="mating">200</span> mating pairs ea. generation, <select id="offspring" onchange="updateRunOps()">
			<option value="2">2</option>
			<option value="5">5</option>
			<option value="10">10</option>
			<option value="20">20</option>
			<option value="40">40</option>
		</select> offspring ea. pair</p>
		<p>Migration procedure: <select id="migrating" onchange="updateRunOps()">
			<option value="0">0</option>
			<option value="1">1</option>
			<option value="5">5</option>
			<option value="10">10</option>
			<option value="20">20</option>
		</select> migrating pairs ea. generation</p>

		<button onclick="writeIterate()">iterate</button>
		<select id="iterTimes">
			<option value="1">x1</option>
			<option value="10">x10</option>
			<option value="100">x100</option>
			<option value="1000">x1000</option>
		</select>
		<br>

		<canvas id="alleleChart" width="600" height="400"></canvas>
		<p id="results0">Results will appear here.</p>
		<p id="results1"></p>
		<canvas id="popDiff0" width="300" height="200"></canvas>
		<canvas id="popDiff1" width="300" height="200"></canvas>

		<p><span class="grey">left,</span> <span class="cerulean">right</span> | <span class="red">AA,</span> <span class="purple">Aa,</span> <span class="blue">aa</span></p>
		<p>above: pop. relative to hardy-weinberg equilibrium | below: absolute pop.</p>
		<canvas id="popChart0" width="300" height="400"></canvas>
		<canvas id="popChart1" width="300" height="400"></canvas>
		<p>Reload page to reset.</p>

		<div id="footer">
			Jasmine Otto, 2014, using [graph.js](http://www.chartjs.org/) and a variety of tutorial resources
		</div>