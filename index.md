---
layout: landing
---

<div style="font-size: 26px; text-align: center;" markdown="1">
projects | [blog](writes) | [muses](muses)
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

  target.foreach((el) => e.addEventListener('wheel', event => {
    const toLeft  = event.deltaY < 0 && el.scrollLeft > 0
    const toRight = event.deltaY > 0 && el.scrollLeft < el.scrollWidth - el.clientWidth

    if (toLeft || toRight) {
      event.preventDefault()
      target.scrollLeft += event.deltaY
    }
  })
</script>

<div class="container">
  
  <h3 id="eis">expressive computation</h3> 
  <div class="filmstrip full">
<div class="accordion">
  <input type="checkbox" id="montage" />
    <label for="montage">
      <img src="assets/blog/card.jpg" />
      <p><strong>ELO 2020 |</strong> procedural montage</p>
    </label>
    <div class="content" markdown="1">
A combinatorial fiction in tarot. In which space mages are sad about empire.

* In press!
</div>
</div>

<div class="accordion">
  <input type="checkbox" id="pcg" />
    <label for="pcg">
      <img src="assets/blog/roads.png" />
  	  <p>biomimetic procedural<br/> generation</p>
    </label>
    <div class="content" markdown="1">
* Construction in progress.
</div>
</div>
  </div> <!-- end filmstrip -->

  <h3 id="vis">data visualization</h3>
  <div class="filmstrip full">
<div class="accordion">
  <input type="checkbox" id="saddle" />
    <label for="saddle">
      <img src="assets/blog/canvas_boundary.png" />
  	  <p><strong>IEEE VISAP 2019 |</strong> intuition and saddle&nbsp;points</p>
    </label>
    <div class="content" markdown="1">
**data brushes:** In-browser photo editor. Experiment with brushes carrying the 'style' of famous works of data art.

[Live demo](https://mahikadubey.github.io/Canvas-Style-Transfer/), [code](https://github.com/mahikadubey/Canvas-Style-Transfer), [paper](https://doi.org/10.1109/VISAP.2019.8900858). See also [p5.js docs](https://ml5js.org/reference/api-StyleTransfer/). With [Mahika Dubey](https://www.mahikadubey.com/).

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
* Abramov, D., Otto, J., Dubey, M., Artanegara, C., Boutillier, P., Fontana, W., & Forbes, A. G. (2019). RuleVis: Constructing Patterns and Rules for Rule-Based Models. 2019 IEEE Visualization Conference (VIS), 191–195. [[DOI]](https://doi.org/10.1109/VISUAL.2019.8933596)
</div>
</div>
  </div> <!-- end filmstrip -->

  <h3 id="sci">interactive science</h3>
  <div class="filmstrip full">
<div class="accordion">
  <input type="checkbox" id="phcpy" />
    <label for="phcpy">
      <img src="assets/blog/2017-03-20 12s.gif" />
      <p><strong>SciPy 2019 |</strong> steady state locus of a nonlinear system</p>
    </label>
    <div class="content" markdown="1">
[interactive Apollonius problem](https://github.com/JazzTap/mcs563/tree/master/Apollonius) 

Application of phcpy to the **real-time numerical solution** of steady states of nonlinear dynamical systems, as found in synthetic biology, kinematics, and other design spaces. With [Jan Verschelde](http://homepages.math.uic.edu/~jan/).

* Otto, J., Forbes, A., & Verschelde, J. (2019). Solving Polynomial Systems with phcpy. 62–68. [[DOI]](https://doi.org/10.25080/Majora-7ddc1dd1-009)
</div>
</div>

<div class="accordion">
  <input type="checkbox" id="isocline" />
    <label for="isocline">
      <img src="assets/blog/isocline_rps.gif" style="object-position: 50% 60%;" />
  	  <p>limit cycles and<br/>lizard mating dynamics</p>
    </label>
    <div class="content" markdown="1">
* [isocline browser widget](https://observablehq.com/@jazztap/rps-matrix-to-isoclines)

**Explorable explanation** of alternative mating strategies in side-blotched lizards. Evolutionary stable states are determined by physiology and local climate. With the [Sinervo Lab](https://web.pbsci.ucsc.edu/research/eeb/sinervo/index.php/en/home/#).
![](assets/blog/isocline_lizards.gif)
</div>
</div>
<div class="accordion">
  <input type="checkbox" id="flocking" />
    <label for="flocking">
      <img src="assets/blog/flocking.png" />
  	  <p>collective motion as cell fate</p>
    </label>
    <div class="content" markdown="1">
* [notebook in repository](https://github.com/JazzTap/collective-motion)

**Topological data analysis** of spatial effects in collective motion. Builds on prior work with agent-based systems whose population dynamics approach a dynamical system.

![](assets/blog/spatial_effects.png)
</div>
</div>
  </div> <!-- end filmstrip -->

</div>
