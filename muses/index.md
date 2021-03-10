<script>
  function show(id) {
    let sel = document.querySelector('#'+id)
    sel.style.opacity = 1.0
    sel.style['transition-delay'] = '0s'
  }
  function hide(id) {
    let sel = document.querySelector('#'+id)
    sel.style.opacity = 0.0
    sel.style['transition-delay'] = '.5s'
  }

  window.onload = () => {
    for (let img of document
          .querySelectorAll('.double img, .triple img')) {
      let id = img.src.split(/\/([\w\-]+)\./).slice(-2)[0]
      
      let sel = document.querySelector('#'+id)
      if ( sel ) {
        img.onmouseover = () => show(id)
        img.onmouseout = () => hide(id)
      }
      else
        console.log('unmatched id ' + id)
    }
  }
</script>

<style>
div.double {
  display: grid;
  grid-template-columns: 4fr 3fr;
  grid-column-gap: 1rem;
  margin-bottom: 10px;
}
div.triple {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  margin-bottom: 10px;
}

/* https://fransdejonge.com/wp-content/uploads/2010/01/sidenotes.html */
.margin {
  display: block;
  float: right;
  max-width: 10rem;
  margin: 1rem;
}
.margin p {
  margin: 0 0 40px;
  min-height: 50px;
  opacity: 0;
  transition: .5s ease;
  overflow: hidden;
}
/* https://stackoverflow.com/a/20935566 */
.margin strong:after {
  content: '';
  display: block;
  border-bottom: 1px solid black;
}

@media (max-width: 940px) {
  .margin {
    display: none;
  }
}
</style>

<div class="wrapper" style="max-width: 940px;">
<div class="margin" style="min-height: 1500px;">

  <p id="tunic">a&nbsp;light to burn&nbsp;all the&nbsp;empires, so&nbsp;bright the&nbsp;sun's ashamed <br/> to rise and be</p>
  <p id="apotheosis">you're the one that i need, i'm the one that you loathe <br/> you can watch me corrode</p>
  
  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  
  <p id="reflection_">everybody knows it's something you had to live with, darling <br/> nobody's gonna tear you down now</p>
  <p id="irae">there is nothing you keep, there is only your reflection</p>
  
  <br/><br/><br/><br/><br/><br/>

  <p id="devil">give me heresy, we were never told the truth <br/> the world that spoke</p>
  <p id="priestess_">give me eyes to see, her never growing old <br/> take heart, it's all fool's gold</p>
</div>
  
<div class="double" style="grid-template-columns: 2fr 4fr;">
  <img src="tunic.png" title="" />
  <img src="apotheosis.png" title="" />
  </div>
</div>

<div class="double" style="grid-template-columns: 4fr 4fr;">
  <img src="reflection_.png" title="" style="margin-top: 0rem;" />
  <img src="irae.png" title="" style="margin-top: -3rem;" />
</div>

<div class="double" style="grid-template-columns: 4fr 3fr;">
  <img src="devil.png" title="" style="margin-top: 0rem;"/>
  <img src="priestess_.png" title="" style="margin-top: -1rem;"/>
</div>

<div class="triple" style="justify-items: center;">
</div>

<small>
  <p>with FOSS digital media (<a href="https://www.gimp.org/">GIMP</a> + <a href="https://code.google.com/archive/p/gps-gimp-paint-studio/">GPS</a>, <a href="https://inkscape.org/en/">Inkscape</a>).</p>

  <p>
    <a href="..">go back</a>
  </p>
</small>