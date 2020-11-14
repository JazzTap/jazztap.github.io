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
  <p id="apotheosis">here now&nbsp;comes the&nbsp;sweet, corrupting reality</p>
  <p id="irae">a light to burn all the empires, so bright the&nbsp;sun is ashamed to&nbsp;rise&nbsp;and&nbsp;be</p>
  
  <p id="priestess_">give me heresy, we were never told</p>
  <p id="namer">you asked me to swear&nbsp;in a&nbsp;mirror, confide</p>
  <p id="flight">you and&nbsp;me, I can see us&nbsp;dying,<br/>are&nbsp;we</p>
  
  <p id="_">and i've grown&nbsp;familiar with&nbsp;villains that&nbsp;live&nbsp;in my&nbsp;head</p>
  <p id="__">and the&nbsp;devil's in my&nbsp;head, i&nbsp;will combat, we'll find our way home</p>

  <p id="strix">give&nbsp;up&nbsp;my&nbsp;shame, all&nbsp;of&nbsp;my&nbsp;pain, for&nbsp;you&nbsp;again</p>
  <p id="sacer">there&nbsp;is nothing you&nbsp;keep, there&nbsp;is only your&nbsp;reflection</p>
</div>

<div class="double">
  <img src="apotheosis.png" title=""/>
  <img src="irae.png" title="" style="margin-top: -5rem;"/>
</div>
  
<div class="triple">
  <img src="priestess_.png" title="" />
  <img src="namer.png" title="" />
  <img src="flight.png" title="" style="margin-bottom: 1rem; margin-top: -7rem;" />
  </div>
</div>

<div class="double" style="grid-template-columns: 3fr 4fr;">
  <div>
    <img src="strix.png" title="" />
    <small>
      <p>with FOSS digital media (<a href="https://www.gimp.org/">GIMP</a> + <a href="https://code.google.com/archive/p/gps-gimp-paint-studio/">GPS</a>, <a href="https://inkscape.org/en/">Inkscape</a>).</p>

      <p><a href="..">go back</a></p>
    </small>
  </div>
  <img src="sacer.png" title="" style="margin-top: -8rem;" />
</div>

<div class="triple" style="justify-items: center;">
</div>
