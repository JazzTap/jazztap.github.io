---
layout: landing
---

<div style="font-size: 26px; text-align: center;" markdown="1">
projects | [blog](writes)
</div>

<style>
/* https://uxdesign.cc/creating-horizontal-scrolling-containers-the-right-way-css-grid-c256f64fc585 */
  
.container {
  display: grid;
  grid-template-columns: 20px 1fr 20px;
}
.container > * {
  grid-column: 2 / -2;
}
.container > .full {
  grid-column: 1 / -1;
  overflow-x: scroll;
}

/* https://stackoverflow.com/a/54410301 */
.container > .full::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}
.container > .full {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
}

.container > h3 {
  margin-top: 10px;
  margin-left: -5vw;
}
.container > h3:after {
  content: '';
  display: block;
  border-bottom: 1px solid black;
}

.filmstrip {
  display: grid;
  grid-gap: 20px;
  /* grid-auto-flow: column;
  grid-template-rows: auto auto; */
  grid-template-columns: repeat(6, calc(100% - 40px) );
}
@media (min-width: 480px) {
  .filmstrip {
    grid-template-columns: repeat(6, calc(50% - 40px) );
  }
}
@media (min-width: 880px) {
  .filmstrip {
    grid-template-columns: repeat(6, calc(33% - 40px) );
  }
}
@media (min-width: 1480px) {
  .filmstrip {
    grid-template-columns: repeat(6, calc(25% - 40px) );
  }
}

.filmstrip a {
  text-align: center;
}
.filmstrip img {
  height: 170px;
  width: 400px;
  object-fit: cover;
}

/* https://stackoverflow.com/a/19903659 */

.content ul {  
  list-style:none;
  padding:0;
  text-align:center;
  overflow:auto;
}
.content ul > li {
  margin-bottom:15px;
  display: block;
  clear: both;
  background: #eee;
  padding: 15px 5px;
}

/* https://codepen.io/markcaron/pen/RVvmaz */

.accordion > input[type="checkbox"] {
  position: absolute;
  left: -100vw;
}
.accordion .content {
  overflow-y: hidden;
  height: 0;
}
.accordion > input[type="checkbox"]:checked ~ .content {
  height: auto;
  overflow: visible;
}
.accordion label {
  display: block;
  text-align: center;
}
.accordion label:hover {
  font-weight: bold;
  cursor: pointer;
}
</style>

<script>
  // enable horizontal scrolling within filmstrips
  // https://stackoverflow.com/a/61930273
  const target = document.querySelectorAll('.filmstrip')

  target.forEach((el) => {
    el.addEventListener('wheel', event => {
      const toLeft  = event.deltaY < 0 && el.scrollLeft > 0
      const toRight = event.deltaY > 0 && el.scrollLeft < el.scrollWidth - el.clientWidth
      if (toLeft || toRight) {
        event.preventDefault()
        el.scrollLeft += event.deltaY
      }
    })
  })
</script>

<div class="container">

  <h3 id="vis">data visualization</h3>
  <div class="filmstrip full">
<div class="accordion">
  <input type="checkbox" id="schedule" />
  <label for="schedule">
    <img src="assets/blog/dashboard-thumb.png" />
    <p><strong>2022 |</strong> MarsIPAN</p>
  </label>
  <div class="content" markdown="1">

We created the MarsIPAN (Mars Interactive Pass Allocation Navigator) schedule, and a companion dashboard for comparing allocations. Operations planners are using these visualizations to assess both operational efficiency and staffing requirements across many possible scenarios.

* Manuscript in preparation.

See also our [Data to Discovery 2021 project page](https://datavis.caltech.edu/projects/marsipan/). With thanks to the DTD team and our JPL stakeholders.

</div>
</div> 

<div class="accordion">
  <input type="checkbox" id="saddle" />
    <label for="saddle">
      <img src="assets/blog/canvas_boundary.png" />
  	  <p><strong>IEEE VISAP 2019 |</strong> intuition and saddle&nbsp;points</p>
    </label>
    <div class="content" markdown="1">
**Stability analysis** of style transfer brushes trained on famous works of data art, in the form of a photo editor. Combines [p5.js style transfer](https://ml5js.org/reference/api-StyleTransfer/) with [d3-brush selections](https://github.com/d3/d3-brush).

[Runs in browser](https://mahikadubey.github.io/Canvas-Style-Transfer/). [Open source code](https://github.com/mahikadubey/Canvas-Style-Transfer).

* Dubey, M., Otto, J., &amp; Forbes, A. G. (2019). Data Brushes: Interactive Style Transfer for Data Art. 2019 IEEE VIS Arts Program (VISAP), 1–9. [[DOI]](https://doi.org/10.1109/VISAP.2019.8900858)
</div>
</div>
<div class="accordion">
  <input type="checkbox" id="skewer" />
    <label for="skewer">
      <img src="assets/blog/IGM-Vis_Coherence.png" />
  	  <p><strong>EuroVis 2019 |</strong> <br/>intergalactic skewers</p>
    </label>
    <div class="content" markdown="1">
**Spatial analysis** of intergalactic medium absorption, juxtaposing skewer absorption data with distant stars and other emissive bodies.

[Runs in browser](https://creativecodinglab.github.io/Intergalactic/intergalactic.html). [Open source code](https://github.com/CreativeCodingLab/Intergalactic).

* Burchett, J. N., Abramov, D., Otto, J., Artanegara, C., Prochaska, J. X., & Forbes, A. G. (2019). IGM-Vis: Analyzing Intergalactic and Circumgalactic Medium Absorption Using Quasar Sightlines in a Cosmic Web Context. Computer Graphics Forum, 38(3), 491–504. [[DOI]](https://doi.org/10.1111/cgf.13705)
</div>
</div>
<div class="accordion">
  <input type="checkbox" id="kappa" />
    <label for="kappa">
      <img src="assets/blog/rulevis_teaser.png" style="object-position: 0% 0%;" />
  	  <p><strong>IEEE Vis 2019 |</strong> kappavis, 2019</p>
    </label>
    <div class="content" markdown="1">
**Visual rule editor** for the KappaSim language, relating functional sites on macro-molecular agents through the formation and destruction of bonds.

[Runs in browser](https://creativecodinglab.github.io/RuleVis/). [Open source code](https://github.com/CreativeCodingLab/RuleVis).

* Abramov, D., Otto, J., Dubey, M., Artanegara, C., Boutillier, P., Fontana, W., & Forbes, A. G. (2019). RuleVis: Constructing Patterns and Rules for Rule-Based Models. 2019 IEEE Visualization Conference (VIS), 191–195. [[DOI]](https://doi.org/10.1109/VISUAL.2019.8933596)
</div>
</div>
  </div> <!-- end filmstrip -->

  <h3 id="sci">interactive models</h3>
  <div class="filmstrip full">
<div class="accordion">
  <input type="checkbox" id="skein" />
  <label for="skein">
    <img src="assets/blog/dendryscope-thumb.png" />
    <p><strong>AIIDE 2023 |</strong> DendryScope</p>
  </label>
  <div class="content" markdown="1">
Playtesting support via **interactive static analysis** of routes in quality-based narrative games. Introduces the skein, an interactive heatmap of playtraces, powered by ASP. [Try it online](/DendryScope).

Preprint forthcoming. If you want your own game transpiled from Dendry (or similar), please reach out.

* Otto, J., Chen, A., &amp; Smith, A. M. (2023). DendryScope: Narrative Designer Support via Symbolic Analysis.
</div>
</div> 

<div class="accordion">
  <input type="checkbox" id="phcpy" />
    <label for="phcpy">
      <img src="assets/blog/2017-03-20 12s.gif" />
      <p><strong>SciPy 2019 |</strong> steady state locus of a nonlinear system</p>
    </label>
    <div class="content" markdown="1">
Application of phcpy to the **real-time numerical solution** of steady states of nonlinear dynamical systems, as found in synthetic biology, kinematics, and other design spaces. With [Jan Verschelde](http://homepages.math.uic.edu/~jan/).

[Open source code](https://github.com/JazzTap/mcs563/tree/master/Apollonius) to interactive solution of the Apollonius circle problem.

* Otto, J., Forbes, A., & Verschelde, J. (2019). Solving Polynomial Systems with phcpy. 62–68. [[DOI]](https://doi.org/10.25080/Majora-7ddc1dd1-009)
</div>
</div>

<div class="accordion">
  <input type="checkbox" id="isocline" />
    <label for="isocline">
      <img src="assets/blog/isocline_rps.gif" style="object-position: 50% 60%;" />
  	  <p>2018 | limit cycles and<br/>lizard mating dynamics</p>
    </label>
    <div class="content" markdown="1">
**Explorable explanation** of alternative mating strategies in side-blotched lizards. Evolutionary stable states are determined by physiology and local climate. With the [Sinervo Lab](https://web.pbsci.ucsc.edu/research/eeb/sinervo/index.php/en/home/#).

* [isocline browser widget](https://observablehq.com/@jazztap/rps-matrix-to-isoclines) on Observable

![](assets/blog/isocline_lizards.gif)
</div>
</div>
<div class="accordion">
  <input type="checkbox" id="flocking" />
    <label for="flocking">
      <img src="assets/blog/flocking.png" />
  	  <p>2018 | collective motion as cell fate</p>
    </label>
    <div class="content" markdown="1">
**Topological data analysis** of spatial effects in collective motion. Builds on prior work with agent-based systems whose population dynamics approach a dynamical system.

* [data notebook](https://github.com/JazzTap/collective-motion) on GitHub

![](assets/blog/spatial_effects.png)
</div>
</div>
  </div> <!-- end filmstrip -->

  <h3 id="eis">expressive computation</h3> 
  <div class="filmstrip full">
<div class="accordion">
  <input type="checkbox" id="zine" />
  <label for="zine">
    <img src="assets/blog/paints/ius_.jpg" />
    <p>2021 | ira et ius</p>
  </label>
  <div class="content" markdown="1">
 "ira et ius", 16p. self-illustrated lyrical zine. An apocalypse / unveiling, or the end(s) of history.
 
* [pdf](https://jazztap.itch.io/ira-et-ius) on itch.io

![](assets/blog/paints/id_.png)

  </div>
</div> 

<div class="accordion">
  <input type="checkbox" id="lifeworlds" />
    <label for="lifeworlds">
      <img src="assets/blog/splot.png" />
  	  <p><strong>Roguelike Celebration 2021</strong> | druid game</p>
    </label>
    <div class="content" markdown="1">
  In "Cyclic Plot Generation in a Mixed-Initiative Narrative Instrument", I compared tarot readings with filmic cuts and tech trees with cyclic dungeon generation, in order to explore (semi) autonomous plot generation.
  
  *  [15min talk](https://www.youtube.com/watch?v=NjIDVIIg1lY) archived on YouTube.

  Ultimately, this yields an approach to the narrative instrument whose substrate is an ordering of scenes. I did my best to reduce my own authorial burden, but have yet to finish the game.

  ![Splot graph](assets/blog/druid_game.png)
  
</div>
</div>

<div class="accordion">
  <input type="checkbox" id="ccw" />
    <label for="ccw">
      <img src="assets/blog/pipeline.png" />
  	  <p><strong>Casual Creators 2020 |</strong> avatar editors</p>
    </label>
    <div class="content" markdown="1">
Case study of a software instrument for avatar creation. Or, a guided tour of latent space.

[thread](https://twitter.com/GalaxyKate/status/1303362289588936705), [paper](https://mkremins.github.io/casual-creators-workshop/papers/ICCC20_paper_197.pdf).

* Otto, J. &amp; Forbes, A. G. (2020). Entering the Design Space of Digital Portraiture: A Case Study in Avatar Creation Tools. 
</div>
</div>

<div class="accordion">
  <input type="checkbox" id="montage" />
    <label for="montage">
      <img src="assets/blog/card.jpg" />
      <p><strong>ELO 2020 |</strong> exul mater</p>
    </label>
    <div class="content" markdown="1">
An interactive oracle deck developed over the course of my first year as a games scholar, or something of the sort. [Playable online](/exul-mater).

* Otto, J. &amp; Forbes, A. G. (2020). [Procedural Montage: A Design Trace of Reflection and Refraction.](https://stars.library.ucf.edu/elo2020/asynchronous/proceedingspapers/12/) Proceedings of the Electronic Literature Organization Conference 2020.

[![](/assets/blog/diffraction.gif)](/exul-mater)
</div>
</div> 

  </div> <!-- end filmstrip -->

</div>
