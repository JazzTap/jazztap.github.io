<head>
	<meta charset="utf-8">

    <script src="https://vega.github.io/vega/assets/promise.min.js"></script>
    <script src="https://vega.github.io/vega/assets/symbol.min.js"></script>
    <!-- ie support for vega -->

	<script src="../lib/p5.min.js"></script>
    <script src="../lib/vega.js"></script>
    <script src="../lib/vega-lite.js"></script>
    <script src="../lib/vega-embed.js"></script>
    <!-- 0.5.16, 3.0.8, 2.0.3, 3.0.0-rc7 -->

	<script src="../lib/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

    <script src="neuron_web.js"></script>
</head>

<body>
    <a href="../..">[back]</a> &mdash; <em>Fitz-Hugh Nagumo in one spatial dimension</em>
	<div id="applet">
        <!-- TODO: parameter grid in d3. memorize phaseplane?
        <div class="sliders">
          <input type="range" id="excitation">
          <input type="range" id="recovery">
          <input type="range" id="slow-channel">
          <input type="range" id="diffusion">
        </div>
        <svg id="cobweb"></svg> -->

		<!-- <canvas data-processing-sources="neuron_web.pde"></canvas> -->
        <div id="sim"></div>
        <div id="view"></div>

		<p>Click (tap) to depolarize the left end. <small>(Advanced: Modify parameter dictionary 'par' from the JS console.)</small></p>
		<p>Voltage may be <span style="color:blue">greater</span> (or <span style="color:red">less than</span>) resting potential. Light borders mark inactivated segments.</p>
        <hr>
	</div>

	<div id="main">
        $$
        \begin{align*}
        \dot{v}=&v\left(v-a\right)\left(1-v\right)-w\\
        \dot{w}=&\epsilon\left(v-bw\right)
        \end{align*}
        $$
		<p>The action potential (a depolarization of the membrane) travels down an unmyelinated axon by diffusion. (Since myelinated axon experiences fast saltatory conduction, we might pretend each segment of our model is a node of Ranvier, since the ion channels of each segment recover independently.)</p>
		<p>The action potential dies out unless its shape is self-reinforcing (stereotyped), so the axon robustly transmits a signal. (The frequency of spikes, not their amplitude, encodes qualitative information.)</p>
		<p>The <i>generalized FitzHugh-Nagumo equations</i> consider only 'excitation' and 'inactivation' at a point along the axon. Although the literal ion populations, ligand-gated channels, and osmotic gradients are all neglected, this simple nonlinear dynamics produces the desired qualia: a stereotyped response (regular spiking at fixed frequency, seen as an excursion in the phase-plane) under fixed excitatory input.</p>
<hr>
        <p>10min animated explanations of <a href="https://www.youtube.com/watch?v=hk09AkV5_Kc">action potential</a> and <a href="https://www.youtube.com/watch?v=BbUcWbtVjT4">resting potential</a> exist on Osmosis.</p>
<hr>
		<p>The action potential is generated when the voltage across the membrane rises from resting potential (about -70mV due to active K+ transport out of the axon) past a threshold (which triggers Na+ channels to open, leading to fast equilibriation).</p>
		<p>As more ion channels slowly open to let K+ exit, others become inactivated to prevent more Na+ from entering. Thus the downstroke, where the neuron cannot respond to further stimuli (the absolute refractory period), ends in an overshoot (the relative refractory period).</p>
		<p>Continuous stimulation causes the neuron to spike with a certain frequency. In this simple model, that frequency is fixed.</p>
<hr>
		<p>The change in excitation is a cubic function of excitation. It is negative for both low and high excitation, but positive for excitation between the threshold and peak potential. It turns out that excitation always trends towards zero (absent external stimulus), but if it is pushed past threshold potential, it takes a long detour towards peak potential.</p>
		<p>The change in inactivation is a linear function of both exictation and inactivation. It is positive for high excitation, but quickly becomes negative as inactivation rises. So inactivation tends to peak slightly after excitation does.</p>
		<p>Notice that no specific count is kept of the two most important species of charge carrier, K+ and Na+. In this model, diffusion between segments is treated as a linear function of the difference in excitement between them, which does not seem to be a disastrous oversimplification.</p>
	</div>
</body>
