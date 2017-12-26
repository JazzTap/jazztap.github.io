# tl;dr
I am a mathematical ecologist, ask me about cybernetics. I code science for the web, and this is my portfolio.

### Cognition
Consider how [a neuron transmits](/research/neuron_web/) *[demo]* an electrical signal, and thereby biochemistry participates in circuitry (1/2 - see *morphogenesis* below). Instead of gates built out of transistors, voltage is summed at the neural dendrites.

I've investigated procedural generation of fictional maps like poetry, and iterated fractals under artificial selection. Parameter tuning via a human-in-the-loop. Examples through Jupyter notebooks, drawing inspiration from Processing.

### Pattern
Apollonius' circle problem asks which circles are tangent to all of three given circles. Although the system of equations is nonlinear, it certainly has eight complex solutions, whose real part we can [draw in real-time](https://github.com/JazzTap/mcs563/blob/master/README.md) *[repo]* using [a D3 interface to phcpy in Jupyter](research/scipy2017.pdf) *[poster]*, which I presented at SciPy 2017. **By dragging input circles across catastrophes, a beautiful geometric continuity is evinced.** Alas, public servers which will serve both phcpack and D3 are rare.

Now consider biological [morphogenesis](research/geobio_pattern/slides.pdf) *[slides]*, which I have [expounded upon](research/geobio_pattern/paper.pdf) *[paper]* (with [extended references](research/geobio_pattern/refs.pdf)) for a seminar course. Genetic control-flow via selective activation is the more subtle form of biochemical 'circuitry' (2/2), as exquisite as growth and form itself. Whether this high concept can be sketched and tested by any in-silico implementation - graphics shaders admitting a human-in-the-loop are my main bet - is my primary research interest. Note also the mathematical connection to spatial models in cliodynamics, the quantitative modelling of history.

### Mathematics
I began in mathematical biology by studying [individual-based predator-prey dynamics](research/honcap.pdf) *[paper]* as the population approaches infinity (n -> oo), but remains much smaller than e.g. particles in the air. Notably, self-limitation alone makes a population model nonlinear, even though it emerges readily from the individual-based dynamics under appropriate assumptions.

<small>As a counterexample, when your model predicts 10^-18 foxes in the population's stable limit cycle - that is, a population of this miniscule size will never go extinct - something is absurd. These *attofoxes* are an artifact of assuming *n* continuum-large (as numerous as particles in the air). In fact, small systems of individuals are inherently noisy, prone to sampling error. </small>
  
<small>Similar accidents of discretization are a fact of life, in contradiction to control-theoretic optimality. For instance, isolated populations can and will perish in a black-swan catastrophe, so migration between habitats (incl' refugia - 'eggs in more than one basket') is necessary for conservation.</small>

I believe that network effects tie individual-based models to traditional dynamical models. Rough sketch of [symmetries](UPLOAD notebook) *[generator]* in the vein of Golubitsky. [?]

### Notebooks
To document a numerical inquiry satisfactorily requires an intimate correspondence between equations, experimental method, and code. The notebook paradigm is the most satisfactory approach, whose visualization potential spans two axes:

##### Rich Output ⇄ Input:
From image display (e.g. plotting a linear transform as pixels), to kernel interfaces (arbitrary calls to *inline* Python, etc.) from Javascript which *minimize* the usually exorbitant technical overhead of domain-nonspecific binding code.

Compare the rich-input analysis of Fitz-Hugh Nagumo above with a [rich-output analysis](https://gist.github.com/JazzTap/a9d74398b2e6252deeeda63c3a3718e3) *[notebook]* using xarray to study parameter variation by 'painting the space'. Contrast IPyWidgets with the domain-specific input method ('ux design') of Apollonius above.

##### Static ⇄ Dynamic Flow: 
Movement between cells of a notebook implies pipelines for data science.  
(Monolithic Program → **Ordered Worksheet** ← Ad-Hoc REPL)

<small>If I run each cell in order, a meaningful answer must come out. If I sensibly modify an intermediate cell, and run all successive cells in order, a meaningful answer still comes out. Contrast modular but ad-hoc situations where a pile of scripts is navigable only by a single graduate student, and stable but monolithic situations where the slightest change upstream breaks the entire workflow. (I have personally commited the worst of both worlds.)</small>

<small>The human should be able to advise the machine on which scripts to call, when they know better, yet still be able to run the procedure when they don't. By treating the worksheet as a pipeline, we have well-defined invalidation criteria for cached data. while the user traverses the pipeline linearly, the update process is transparent.</small>

The combination of these principles is extremely powerful, suffice to say.

*Jupyter* notebooks specifically use a FOSS stack, which is philosophically consistent with academia. Contrast Matlab's proprietary viewer, which is free as in 'free beer', unlike mathematics itself, which is free as in speech. All those sciences which remain separate from commercial activity should be *freely reproducible* by anyone who takes the time to learn - because the infrastructure costs are not pushed onto the student whose trial-license just expired.

### Reproducibility
No amount of information is satisfactory without context. Yet the exponential growth of science [in the Anthropocene](EXCERPT paper) has increased its insularity as well as its depth. Distillation through notebooks is a way out.

I organize some of my [fictional interests by drawing](muses). My improvisational ethos derives from jazz drumming and modern dance, and is equally applicable to concise codes, iterative writings, and agile research.

To contact, please see my CV and social media links above. And thanks for reading.