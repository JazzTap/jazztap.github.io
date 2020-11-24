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

  <p id="exul">will no one lay the laurel <br/>wreath, when silence<br/>drowns the screams</p>
  <p id="ir">a light to burn all&nbsp;the&nbsp;empires, so&nbsp;bright the&nbsp;sun&nbsp;is ashamed to&nbsp;rise</p>
  
  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  <p id="_">here now&nbsp;comes the&nbsp;sweet, corrupting reality</p>
  
  <p id="priestess_">give&nbsp;up&nbsp;my&nbsp;shame, all&nbsp;of&nbsp;my&nbsp;pain, for&nbsp;you&nbsp;again</p>
  <p id="strix">give me eyes to see<br/> her never growing old<br/>(take heart, it's all fool's&nbsp;gold)</p>
  
  <br/><br/><br/><br/><br/><br/>

  <p id="sorceress">I should care to let&nbsp;you&nbsp;fly,<br/>a chance to retrieve what was left behind</p>
  <p id="sacer">there&nbsp;is nothing you&nbsp;keep, there&nbsp;is only your&nbsp;reflection</p>
</div>

<div class="double" style="grid-template-columns: 4fr 3fr;">
  <img src="exul.png" title=""/>
  <img src="ir.png" title="" style="margin-top: 1rem;"/>
</div>
  
<div class="double" style="grid-template-columns: 2fr 5fr;">
  <img src="priestess_.png" title="" />
  <img src="strix.png" title="" />
  </div>
</div>

<div class="double" style="grid-template-columns: 3fr 4fr;">
  <img src="sorceress.png" title="" style="margin-top: 0rem;" />
  <div>
    <img src="sacer.png" title="" style="margin-top: 0rem;" />
    <small>
      <p>with FOSS digital media (<a href="https://www.gimp.org/">GIMP</a> + <a href="https://code.google.com/archive/p/gps-gimp-paint-studio/">GPS</a>, <a href="https://inkscape.org/en/">Inkscape</a>).</p>

      <p><a href="..">go back</a></p>
    </small>
  </div>
</div>

<div class="triple" style="justify-items: center;">
</div>
