<style>
/* https://uxdesign.cc/creating-horizontal-scrolling-containers-the-right-way-css-grid-c256f64fc585 */
  
.container {
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  max-width: 850px;
}
.container > * {
  grid-column: 2 / -2;
}
.container > .full {
  grid-column: 1 / -1;
  overflow-x: scroll;
}
.container > .full::-webkit-scrollbar {
  display: none;
}
.container h3 {
  padding: 10px 0 0 0;
}

.filmstrip {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6, calc((100% / 2) - 30px));
}
.filmstrip a:hover {
  text-decoration: none;
  font-weight: bold;
}
</style>

<div class="container">
  
  <h3>expressive computation</h3>  
  <div class="filmstrip full">
    <a href="#montage">
      <img src="../assets/blog/card.jpg" />
      <p><strong>ELO 2020 |</strong> procedural montage [forthcoming]</p>
    </a>
    <a href="#juxtaposition">
      <img src="../assets/blog/card.jpg" />
  	  <p>mere juxtaposition [slides]</p>
    </a>
  </div>

  <h3>data visualization</h3>
  <div class="filmstrip full">
    <a href="#">
      <img src="../assets/blog/card.jpg" />
  	  <p><strong>IEEE Vis Arts |</strong> intuition and saddle points</p>
    </a>
    <a href="#">
      <img src="../assets/blog/card.jpg" />
  	  <p><strong>IEEE Vis |</strong> intergalactic skewers</p>
  </a>
  </div>

  <h3>interactive science</h3>
  <div class="filmstrip full">
    <a href="#">
      <img src="../assets/blog/2017-03-20 12s.gif" />
      <p><strong>SciPy 2019 |</strong> steady state locus of a nonlinear system</p>
    </a>
    <a href="#">
      <img src="../assets/blog/card.jpg" />
  	  <p><strong>--- |</strong> kappavis, 2019</p>
    </a>
  </div>

  <h3>exploratory evolutionary ecology</h3>
  <div class="filmstrip full">
    <a href="#">
      <img src="../assets/blog/card.jpg" />
  	  <p><strong>Sinervo lab |</strong> RPS parameter space browser</p>
    </a>
    <a href="#">
      <img src="../assets/blog/card.jpg" />
  	  <p>phase spaces slides</p>
    </a>
    <a href="#">
      <img src="../assets/blog/card.jpg" />
  	  <p>absorbing states in spatialized predator-prey</p>
    </a>
  </div>

  <h3>biomimetic procedural generation</h3>
  <div class="filmstrip full">
    <a href="#">
      <img src="../assets/blog/roads.png" />
  	  <p>pattern formation</p>
    </a>
  </div>

</div>