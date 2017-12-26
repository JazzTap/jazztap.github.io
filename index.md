## tl;dr
IAMA mathematical ecologist, this is my portfolio, ask me about cybernetics. (CV and social media above!)

###### Cognition
I code science for the web. Consider how [a neuron transmits](/research/neuron_web/) *[demo]* an electrical signal, and thereby biochemistry participates in circuitry (1/2 ways). Instead of gates built out of transistors, voltage is summed at the neural dendrites.

I've investigated procedural generation of fictional maps like poetry, and iterated fractals under artificial selection. Parameter tuning via a human-in-the-loop. Examples through Jupyter notebooks, supersceding JAR files.

###### Pattern
Apollonius' circle problem asks which circles are tangent to all of three given circles. Although the system of equations is nonlinear, it certainly has eight complex solutions, whose real part we can [draw in real-time](https://github.com/JazzTap/mcs563/blob/master/README.md) *[git]* using [a D3 interface to phcpy in Jupyter](research/scipy2017.pdf) *[poster]*, which I presented at SciPy 2017. By dragging input circles across catastrophes, a beautiful geometric continuity is evinced.

Rugs and morphogenesis. [Shader code](WRAP in p5.js) *[demo]*.

###### Notebooks
But to document a numerical inquiry satisfactorily requires an intimate correspondence between equations, experimental method, and code. The notebook paragdim is the most satisfactory approach I've come across. In particular, their visualization potential spans two axes:

Rich Output → Input: Ranges from image display (e.g. plotting a linear transform as pixels) to kernel interfaces (arbitrary calls to *inline* Python, etc.) from Javascript, *minimizing* the usually exorbitant technical overhead of domain-nonspecific binding code.

Compare the rich-input analysis of Fitz-Hugh Nagumo above with a [rich-output analysis](https://gist.github.com/JazzTap/a9d74398b2e6252deeeda63c3a3718e3) *[notebook]* using xarray to study parameter variation by 'painting the space'.

Static → Dynamic Flow: 

Significantly, Jupyter notebooks run on FOSS software, whereas Matlab's proprietary viewer is free as in 'free beer' - unlike mathematics itself, which is free as in speech - that is, *freely reproducible* by anyone who takes the time to learn, because the infrastructure costs are not pushed onto the student whose trial-license just expired.

###### Mathematics
I began in mathematical biology by studying [individual-based predator-prey dynamics](research/honcap.pdf) *[paper]* as the population approaches infinity (n -> oo), but remains much smaller than e.g. particles in the air. Notably, self-limitation alone makes a population model nonlinear, even though it emerges readily from the individual-based dynamics under appropriate assumptions.

<small>As a counterexample, when your model predicts 10^{-18} foxes in the population's stable limit cycle - that is, a population of this miniscule size will never go extinct - something is absurd. These *attofoxes* are an artifact of assuming *n* continuum-large (as numerous as particles in the air). In fact, small systems of individuals are inherently noisy, prone to sampling error. </small>
  
<small>Similar accidents of discretization are a fact of life, in contradiction to control-theoretic optimality. For instance, isolated populations can and will perish in a black-swan catastrophe, so migration between habitats (incl' refugia - 'eggs in more than one basket') is necessary for conservation.</small>

Network effects? Rough sketch of [symmetries](UPLOAD notebook).

###### Reproducibility
No amount of information is satisfactory without context. Yet the exponential growth of science [in the Anthropocene](EXCERPT paper) has increased its insularity as well as its depth. Distillation through notebooks is a way out.

I organize some of my [fictional interests by drawing](muses). My improvisational ethos derives from jazz drumming and modern dance, and is equally applicable to concise codes, iterative writings, and agile research.