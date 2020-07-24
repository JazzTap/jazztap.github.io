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
    /* float: none; */
  }
  /* .margin p {
    color: white;
    position: fixed;
    width: 250px;
  } */
}
</style>

<div class="wrapper" style="max-width: 940px;">
<div class="margin" style="min-height: 1300px;">
  <p id="fire_rat">and i've grown&nbsp;familiar with&nbsp;villains that&nbsp;live&nbsp;in my&nbsp;head</p>
  <p id="idyll">our memories, they&nbsp;can be&nbsp;inviting, but&nbsp;some&nbsp;are altogether&nbsp;mighty frightening</p>
  <p id="mater"><strong>(xi) strength</strong></p>
  <p id="reflection_"><strong>(xii) traitor</strong></p>
  <p id="namer"><strong>(xiii) death</strong></p>
  <p id="illia_svg-4">lost in that&nbsp;memory, like a&nbsp;candle in&nbsp;the&nbsp;wind</p>
  <p id="prismatic">all that riddles&nbsp;me will never cease&nbsp;to&nbsp;be, still&nbsp;i&nbsp;search this&nbsp;world</p>
  <p id="necro_">everything's blackening<br/> i am made of flesh&nbsp;and&nbsp;bone</p>
  <p id="priestess_">and&nbsp;here now&nbsp;comes the&nbsp;sweet, corrupting reality</p>
  <p id="blink">breathing&nbsp;in the&nbsp;dark, exhaling the&nbsp;dust of&nbsp;stars</p>
  <p id="g4363">there&nbsp;is nothing you&nbsp;keep, there&nbsp;is only your&nbsp;reflection</p>
</div>

<div class="double">
  <img src="fire_rat.png" title=""/>
  <img src="idyll.png" title="" style="margin-top: -5rem;"/>
</div>
  
<div class="triple">
  <img src="mater.png" title=""/>
  <img src="reflection_.png" title=""/>
  <img src="namer.png" style="align-self: center;" title="" />
</div>

<div class="triple">
  <img src="illia_svg-4.png" class="vector" title="" style="margin-top: -3rem;" />

  <div>
    <img src="prismatic.png" title="" />
    <img src="necro_.png" class="vector" title="">
  </div>
  <img src="priestess_.png" title="" style="margin-bottom: 1rem;" />
</div>

<div class="triple" style="justify-items: center;">
  <small>
    <p>FOSS digital media (<a href="https://www.gimp.org/">GIMP</a> + <a href="https://code.google.com/archive/p/gps-gimp-paint-studio/">GPS</a>, <a href="https://inkscape.org/en/">Inkscape</a>), 2016 - 2020. blink.gif, 2011.</p>

    <p><a href="..">go back</a></p>
  </small>
  <img src="blink.gif" class="vector" style="align-self: end;" title="" />
  <img src="g4363.png" class="vector" style="margin-top: -8rem;" title="" />
</div>
