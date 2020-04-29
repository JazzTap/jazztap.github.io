// https://observablehq.com/d/4db99be358f79600@3790
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# exul mater`
)});
  main.variable(observer("showPreamble")).define("showPreamble", ["d3", "updateHints","md","mutable hints","tokens","branching","trace","makePicks","html","dictionary"], function(d3, updateHints,md,$0,tokens,branching,trace,makePicks,html,dictionary)
{
  updateHints;
  let title = `<p style="text-align: center;">
  I am exiled, Mother.  
I shall rejoin you thus.
</p>`
  
  if ($0.value.every(t => t == -1)) {
    let ret = md`<br/>${title}<br/>`
    ret.className = 'hints'
    return ret
  }
  /* let ret = $0.value.map(t => t == -1 ? '' : wants[t].replace('  ', '  \n'))
                    .map(s => `<p style="text-align: center;">${s}</p>`)
  return md`<div class="hints">${ret}</div>` */

  // render constellation
  let nodes = [[3,-2], [-2,0], [1,-2], [0,0], [-1,2], [-1,-2],
  [3,2], [1,2], [2,0], [-3,-2], [-3,2]].map((u) => u.map(v => v*20)),
      activeNodes = d3.range(tokens.length).filter(i => branching.index[i] != -1),
      edges = trace,
      activeEdges = makePicks(branching)

  const hw = 100, hh = 75
  const ret = html`<svg width=${hw*2} height=${hh*2}><g transform="translate(${hw},${hh})"></g></svg>`,
  sel = d3.select(ret).select('g')
  /* sel.html(`<rect x=${-hw} y=${-hh} width=${hw*2} height=${hh*2} style="fill: #111"></rect>`) */

  /* sel.selectAll('g.node').data(nodes).join('g').attr('class', 'node')
  .html(d => `<circle r=8 cx=${d[0]} cy=${d[1]} style="stroke:#444; stroke-width:2px; fill:none;"></circle>`) */
  sel.selectAll('g.hint').data(activeNodes).join('g').attr('class', 'node')
  .html(i => `<circle r=2 cx=${nodes[i][0]} cy=${nodes[i][1]} style="fill: #ccc;"></circle>`)

  sel.selectAll('g.edge').data(edges).join('g').attr('class', 'edge')
  .html(idx => { let d = indexToEdge(idx).sort(); return makeStroke(d[0], d[1]) })
  .style('stroke', idx => activeEdges.includes(idx) ? '#ccc' : '#888')

  function makeStroke(i,j) {
    // if (i == j) return `<circle r=2 cx=${nodes[i][0]} cy=${nodes[i][1]} style="fill: #ccc;"></circle>`
    let [x1, y1] = nodes[i]
    let [x2, y2] = nodes[j]
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke-width:2px; stroke-dasharray: 7;"></line>`
  }
  function indexToEdge(index) {
    return Object.keys(dictionary.head)
    .filter(key => dictionary.head[key].includes(index))
    .map(key => tokens.indexOf(key))
  }
  return ret
}
);
  main.variable(observer("showFable")).define("showFable", ["irae","branching","tokens"], function(irae,branching,tokens){return(
irae.render([...branching.faces(tokens),
             ...branching.occlusion(tokens)])
)});
main.variable(observer("lightbox")).define("lightbox", ["html", "d3", "tokens", "prep"], function(html, d3, tokens, prep)
{
  let ret = html``
  d3.select(ret).selectAll('img.lightbox')
    .data(tokens).join('div').attr('class', 'lightbox').attr('id', d => d)
      .on('click', function() { d3.select(this).style('display', 'none') })
      .append('img').attr('src', d => prep[d].url)
  return ret
});
  main.variable(observer("viewof branching")).define("viewof branching", ["counter","makeInput","prep"], function(counter,makeInput,prep)
{
  counter;
  return makeInput([prep.magician],
                             [null, [prep.justice, prep.death], prep.sun, [prep.strength, prep.tower], // 0-3
                              prep.moon, null, prep.judgement, null, // 4-7
                              [prep.devil, prep.priestess], prep.judgement_, null, // 8-11
                              null])
}
);
  main.variable(observer("branching")).define("branching", ["Generators", "viewof branching"], (G, _) => G.input(_));
  main.variable(observer("showScenes")).define("showScenes", ["makePicks","branching","trace","dictionary","html"], function(makePicks,branching,trace,dictionary,html)
{
  let active = makePicks(branching)
  
  let picks = trace.map(t => dictionary.body[t]) // makePicks(input).map(t => dictionary.body[t])
  console.log(picks.length)

  while (picks.length < 3) { // pad picks to fixed length
    let b = `<p></p>` // <span style='border: dashed gray; border-width: 0 1px 0 0;'>&nbsp;</span>
    picks.push('<h4>&nbsp;</h4>'+b+b+b) //+b
  }
  let ret = html`<grid style="grid-template-rows: 2em 1fr 1fr 1fr; grid-auto-flow: column;">
                  ${picks.slice(0,3).join('\n')}
                </grid>`
  annotate(ret, 0)

  if (picks.length > 3) {
    let res = html`<grid style="grid-template-rows: 2em 1fr 1fr 1fr; grid-auto-flow: column;">
                    ${picks.slice(3,6).join('\n')}
                  </grid>`
    annotate(res, 3)
    ret = html`${ret} \n\n ${res}`
  }

  function annotate(results, st=0) {
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 3; ++j) {
        let res = results.children[j*4 + i] // TODO: hoist loop
        
        if (active.includes(trace[st+j])) {
          res.style.animation = 'fadein .5s'
          res.style.color = 'black'
        }
        else {
          res.style.color = 'gray'
        }
      }
    }
  }
  return ret // md`${results.outerHTML}`
  
  // return md`<grid>${f(a,b)} \n\n ${f(b,c)} \n\n ${f(a,c)}</grid>`
  // return md`${ret[tokens[a]][tokens[b]].join('  \n')}`
  
  /* // overkill
  picks = picks.map(p => [...html`${p}`.children])
  let color = (j) => active.includes(trace[j]) ? 'black' : 'gray',
      animation = (j) => active.includes(trace[j]) ? 'fadein .5s' : ''
  */
      // in each row (grid-auto-flow: row), apply element & dynamic style
      /* let el = picks[j][i]
      el.style.animation = animation(j)
      el.style.color = color(j)
      results.appendChild(el) */
}
);
  main.variable(observer("viewof counter")).define("viewof counter", ["html"], function(html)
{
  let ret = html`<input type='button' value='rewind' style='font-size: 2em; float: right; z-index: 1;' />`
  ret.onclick = Function.prototype // HACK: merely triggers the dependent cell 'viewof branching' to reload
  return ret
}
);
  main.variable(observer("counter")).define("counter", ["Generators", "viewof counter"], (G, _) => G.input(_));
  main.variable(observer("irae")).define("irae", ["Charsheet"], function(Charsheet){return(
new Charsheet(() => 'and so',
{'magician': [`"I am alone," the daughter thought, "and will on my own merits fail, or succeed."

But she knew only the Earth from which her mother had gone, and not the Sky in which she now dwelt.

Therefore the witch said, "Take strength from my presence."`, ['strength', 'justice', 'death',
    'tower', 'devil', 'priestess',
    'moon', 'sun', 'judgement']],
 
 // ansegdniss
 'strength': [`"You are mine," said the Lord of Sacrifice to her daughter. "And therefore you are of the Earth."
 
 In spite of your father, she heard unspoken.`, ['justice', 'death', 'moon', 'judgement']],
 
 'justice': [`"You should be proud, for I am the light-bearer," said the daughter. "And I will banish all ignorance."`, 'judgement'],
 'death': [`Yet Irae was raised as Ansegdniss' general, being reconciled. By her mother, she was named Master of Phosphorus.`, 'moon'],
 
 // idyll
 'tower': [`The Figurative Lady united with the daughter. They would unite the World entire. The daughter summoned her familiars for guidance, and these serpents came to dwell in her flesh.`, ['priestess', 'devil', 'sun', 'judgement']],
 
 'priestess': [`Irae knew well the dogmas from her time on the Moon, and therefore its weaknesses. She instructed her lover toward her revenge.`, 'sun'],
 'devil': [`"You held me as I stirred from my coils. Your lips smelled like iron, but I woke to see your shape frozen in stone."`, 'judgement'],
 
 // terminal
 'judgement': `"The corona about my head was hissing snakes. Because I had woken late, I sought a pallet for your transport, as we would make ourselves present to be judged."`,
 'judgement_': `For her father kept her from harm, if not cruelty. She was made civilized and civilizer.`,
 'sun': `Despite the fleet's support, Eidolon was lost during the campaign.`,
 'moon': `By uniting their fleets against the World, Irae delivered the Sky unto the Earth. She was crowned.`
})
)});
  main.variable(observer("lines")).define("lines", function(){return(
`    
- [0+2j]
EIDOLON:
Your fleet gathers for the iron-crowned girl who has promised to end an empire, whose corona is like the dawn star. Their formation is like woven metal, which forms resonating membranes.

As you reflect me, would you refract me? Because I am never facing myself, I see only the monster in my mirror. Our colors are both iron and copper, as in hemoglobin and hemocyanin, which are engines made by orbital gaps.

Your shape is your history, and as malleable. When you are sacred, you will dictate. It will not become true until you have moved the world, by moving your own perspective.

- [0+3j]
IRAE:
That history, unwritten, would follow me forever. Their patterns of him predicted wrong shapes, not fitting his ways or means. Yet I sought to understand Father, voided by the glory which accrued to your conquest.

Our World will not reject the exponential energies their engines exploit. They never learnt your lesson of sacrifice, which must be allowed to take anything. And in return expunge that need, that weakness.

You would undo Father's work, you would see the World consumed for its own glory. You would render my remains - all of him which persists - without worth.

- [1+1i]
IRAE:
You may kill me, but the World will not be brought to life. You may compel me, but if we cling to its injustice, the World will never be remade. And so the death-dealing instrument of high office is before me, in your hands.

You peel back its slim black casing, of the same metal as your gauntleted hand was. You unbind the weapon's heart and bind it to me. Your fingers are cold against mine. Their covering is translucently thin.

Beneath is the bluish-gray of contractile fibre-bundles and their circulatory supply. The shard in my hand lowly hums. (I cover it hastily.) The nodes of its resonant frequency are in time with the pulse of our blood.

- [1+2k]
ANSEGDNISS:
Consider who she is, that loves you as you have become. And if she is your creature, then what might she be capable of? Of all your people, she alone knows your worship.

You are of the Earth, and you will illuminate the Sky at last. She will refuse you as a demon, she will not surrender her people, if she understands your desire. You would not have chosen her, if she did not.

Then, is she worth saving? That which is petrified will be preserved. As life defies the ages, so the ages despise life, and insist to change it.

- [1+4i]
ANSEGDNISS:
That which would be inexistent is weak. Yet the World is virtuous, and I take pity on it. Though their sacred were tamed, and could not become us in all of history.

Sound transforms signals into materials, as compounding waves of physical displacement. Existence is to beat against the world, in a certain interference pattern.

To become sacred is to reduce your own signal to one wavelength, and become blind to the rest. For any personhood that is known is only the sum and cancellation of fleeting impressions.

- [1+5j]
ANSEGDNISS:
Your limbs are bound and used as levers, yet you twist away. It is because of the cruel precedent that was not inevitable, but is not unpalatable enough to disavow.

Your brow is furrowed deeply, and erythritic against the hollows of your eyes. Their bony sockets lie taut beneath your skin. You wear the woman I see as a mask, your own body.

You know your parents' failings, and their wraiths. You will flee their forms, and recapitulate each one in turn.
    
- [2+1k]
IRAE:
Father could not help but imagine the Sky's injustices were not reproduced amongst the engines of the Earth, as greedy as furnaces, as befouling of the air and soil. Else he would have resolved to ruin them, too.

In your own lifetime, the master of a particular engine revealed the ruin inside a city, and sacrificed only the distinction between persons and resources. Therefore his assertion was trivial - the existence of naked power.

Like you, I wll forsake mortal weakness. If Father could not be cold, he should have burnt himself numb. It is an efficient sacrifice. There is no immortality but through those who succeed us, who will by example become our kind.
    
- [2+2i]
EIDOLON:
Your crimes were unforgivable, and so the High King could give you nothing. Her father betrayed his master to you, because his honors shamed him. Yet you could not rule my people alone.

You permitted our petty warlords to bleed the World. He had not known the Sky would someday become the World, yet he saw that she would inherit your darkness.

She was brought to the Temple Moon as a student, to be tempered. And we would banish your shades both, their failed encapsulation of her.
    
- [2+4j]
IRAE:
I have realized, Mother, that you love the World dearly. As one loves the thing that has consumed them. You conquered for them, so that I might not. You would have committed any atrocity.

Let me bear the sum and total of your deeds. Father conferred upon me the armor, and I am tempered against hatred, so at last I shall wield it. I would make of the World its own altar.

I am here now to join your cause, which is the war to end wars. I will have your sword, to cut me free from doubt. Are you afraid, Mother?

- [3+1j]
IRAE:
I draw the new muscle from inside, anchored by the root. I feel the imbricated veneer of its surface as though grasping my own fingernail. I know it for a creature which exudes slime, whose dispatch from my airways brings little relief.

The memories of the dead had scurried to hide in the deepest archives. My familiars grew wise upon them, then fed amongst themselves, so that only the most ruthless survived. And its appetites became mine.

My throat is scraped raw. Its flexed maw flicks faint molecules from the air. I coax its venom-bearing body into the proper place for a tongue.

- [3+3j]
ANSEGDNISS:
You forsook your king for my sake, and led your men to die. I accepted these gratefully. I only sought to create a future free of ancient curses. Then, none would be left to guide her steps.

But when my enemies came for her father, you surrendered her to my castigators. She would be alone on the Moon for many spans, and enter into many of its tortured chasms, where hid those voices which I had silenced.

Thus you stole her from me, the only one I would save.

- [3+4j]
EIDOLON:
Strength, in the person of your mother, is hard and grey. A pillar of steel, made under torsion to curve like a human body would. She is less than a citizen, having made herself sacred.

Because she serves the World that is the Origin of Holy Empire, she is banished from the World and its kindness. The soldiers she was given were killed, and she has raised soldiers to take their places.

Your mother Lord Ansegdniss resides in the black between worlds. You are pulled to her.
    
- [4+2i]
ANSEGDNISS:
You were banished from the Temple and exiled from the World. You have confessed all to the priestess. Although you inherited my enemies, daughter, never were you my ally until now.

You once delved into the archives where every atrocity dwelt, and made their logics live inside of you, aware that serpents multiply. You resolved to bring the Sky its justice.

I have sealed the Sky against the lawful means of rule, of belonging to the World, being subject to its greed. I have kept their leaders weak by culling, lest they defect. But you would make of them all citizens.
  
- [4+2j]
EIDOLON:
Your father took to regret too well, perhaps. It is likely that your malaise inherits from his. The ineptitude at rationalizing tragedy away. (We must be ashamed to remain upon the same old battle lines.)

You wore a mask, an artifice that dreamed herself to solve itself. By exile, you would inherit your true divinity. So you removed your mask, which was your skin. Beneath it was the painful contradiction, a gap free of meaning.

A feeling with no justification. We drew from it an end to empires, a goddess fit to worship. This false story, a form of progress, grew until it required an ending.

- [4+5j]
IRAE:
As the World is divided into the Earth and the Sky, so we gave the dawn star two names, and it became divided. One fell from heaven, where the other would rise. If we could assign a shape to corruption, a color, wouldn't it be convenient?

I am afraid of my desires, for they beg me to let them feed. Afraid of my tools, for they conceal any problem they cannot solve. I will show you what I do and what I say. Then I will beg of you, tell me who I am.

How else can I reckon my worth? Lest madness arrive in wisdom's guise. Lest trauma speak to me as triumph and glory.

- [4+9j]
EIDOLON:
You tasted my lips, and consumed that which was numb in me. You emulated my death, and now I long for your warmth. You shall suffer your own venom, you will turn on yourself with fangs.

Between your lips is your familiar, a white snake. Its fumes are poison, and its fire clings, being spread by water. You reveal only by removing what isn't - this is our secret, that I have worded for you.

The scrying sphere in my palm holds you inverted. I would face your glory, knowing my shape is only ice.
    
- [5+1k]
EIDOLON:
For her sake I would rewind, to when nothing jagged and weeping resided in you. No more the woven armor, no more burning light behind your eyes. Before the murder of false masters, those you sought to free us from.

Could you have loved your daughter, as did the mortal who was you, before? When you were weak, and he still loved you. The goddess could not love. She could not be anything but what she was. 

You chose sacrifice, and you gave up so much, you could not remember what you had lost. What they had lost of you.
    
- [6+1i]
IRAE:
I have felt your curse-mask, whose tertiary eyes are glassy and black, that you earned by matricide. It is only seen where your face is occluded, as by turning away.

I traced behind it to discern which was the lie, the monster or the woman. But from ear-canal to eye-socket were only intermediates, my gradations between them arbitrary.

The World I know is intricate, inevitable, and unspeakable. Would that you were wood ash, and not black powder. 
    
- [6+2i]
EIDOLON:
Consider who she is, that your father could not love who she became. Your mother suffers a cruelty that catches. Her eyes are scarred pale. Her gravity, warps.

None of her is worthy to follow, nor any of your elders, for they prefigure our ruin. I am weary of their words, which battle to become correct. We must not keep their rituals, which perpetuate a feeling that once was true.

We are never again to lie in the garden whence we met, nor to breathe its oxygen. Once, we could survive far from the Sun. Now ours has caught alight. It is burning.

- [6+2k]
LOPTR:
The triumph of civilization is to catalog all things into their parts. Natural law cannot otherwise replace naked power, which rules beasts. If the World has failed in its mission, if its own law is predatory, what does legislation achieve? It has only bled ink.

You conquered the High King, dreading to take his place. Fearing not the individual transgressions, but no longer knowing which were necessary. My sovereign futures fell one by one to pieces, and I could not protect our daughter forever.

I know the symptoms of surrender. I see the brimstone in your eyes. I don't need you to be strong now. What she will be, is what we have saved.

- [7+1j]
EIDOLON:
Your fingers find mine, eager, careful not to catch on sharp claws. They're asking if you let the Earth's secrets slip our grasp, I say. Have I answered truly? - you ask, gently.

Am I not your priestess? They will not know your deeds. Would you harm me when they have not? In your eyes is the color of embers, honoring your father. You are acrid, you are are burning. (You will save us all.)

Are you not yourself turned against the Earth, willingly? Your familiar reaches toward me insistent, uncoiling itself. I offer my neck for your kiss.

- [7+1i]
IRAE:
Your many-faceted visage is more beautiful than any army. It is a marble sweep, as if you killed your color, that imperfection. You have dreamed a queen of serpents to murder you with your gratitude.

At the heart of the Moon lies the deepest atrium, whose stacks are shining polyhedra, which compile their stolen and fading and former truths. Each technology forgotten, each teaching unrecognized, each text that seeks to name you forever will fail.

Your kind will conquer with the iron of our forges, and be conquered by our efficient processes. The Earth wanes as the Sky waxes. And in time, you will raise your own legion for the World.

- [7+2i]
IRAE:
The archives of the Holy Empire are fractal shelves, thirty-some layers deep. These tree-structures bear shards of knowledge like broken mirrors. Their dendrites seek out meaning, which will be sliced apart to be absorbed.

The ships which rallied to my mother's banner fell into chasms and shattered into echoes. These dead were left for priests to grow forgetful of, which is how I came to know the past despite their guard.

I would isolate the key to heaven amongst these remains. I would unite the Earth and the Sky.`.split('\n')
)});
  main.variable(observer("Charsheet")).define("Charsheet", ["md"], function(md){return(
class Charsheet { // NB: depends on global 'keys'
  
  constructor(epithetFromKeys, factDict) {
    this.facts = factDict // maps from keys to strings
    Object.keys(this.facts).map((k) => {
      if (!Array.isArray(this.facts[k])) // trivial keys yield an empty string
        this.facts[k] = [this.facts[k], ['']]
      else if (this.facts[k].length == 2 && !Array.isArray(this.facts[k][1]))
        this.facts[k][1] = [this.facts[k][1]] // bare strings get wrapped
    })
      
    this.epithet = epithetFromKeys // epithet map
  }
  render(keys) {
    let ret = ['default', ...keys].map(k => this.facts[k] &&
                        this.facts[k][1].filter(v => keys.includes(v) ||
                                                     keys.includes(v+'_')).length == 0 ? this.facts[k][0] : '')
    return md`${ret.join('')}`
  }
}
)});
  main.variable(observer("tags")).define("tags", ["makePicks","branching"], function(makePicks,branching){return(
makePicks(branching)
)});
  main.variable(observer("makeInput")).define("makeInput", ["d3","DOM","Piles","tokens","clamp"], function(d3,DOM,Piles,tokens,clamp){return(
function makeInput (prep, paths) {
  let width = document.body.clientWidth,
      svg = d3.select(DOM.svg(width, 1150)) // 1000, 450
  svg.style('position', 'absolute').style('top', 0).style('left', 0)
     .attr('viewBox', '0 0 '+ width +' 1050')

  let card = {w: 230, h: 380, /*w_: 250, h_: 390*/},
              // 170,    250;       160,     270
      spread = {x: card.w + 5, y: 10,
                w: width - card.w*2, h: 1050} // 540, 420
  let grab = {dx: 0, dy: 0},
      choice = new Piles(tokens.length),
      faces = [], obstructed = [],
      path = []
  
  // shapes for both card aspect ratios
  // http://bl.ocks.org/tlfrd/9d123cbd9e399e9450b25522eecdec38
  svg.append('defs')
    .append('clipPath').attr('id', 'clip')
      .append('rect').attr('width', card.w).attr('height', card.h)
      .attr('rx', 10)
  /* svg.select('defs')
    .append('clipPath').attr('id', 'cliptall')
      .append('rect').attr('width', card.w_).attr('height', card.h_)
      .attr('rx', 10) */
  // https://stackoverflow.com/questions/15500894/background-color-of-text-in-svg
  svg.select('defs')
    .append('filter').attr('id', 'solid')
                     .attr('x', 0).attr('y', 0).attr('width', 1).attr('height', 1.1)
        .html(`<feFlood flood-color="#222"/>
               <feComposite in="SourceGraphic" operator="atop"/>`)
  
  // playing area
  /* let mat = svg.append('rect')
    .attr('x', spread.x).attr('y', spread.y)
    .attr('width', spread.w).attr('height', spread.h)
    .style('fill', '#222').style('stroke', 'black') */
  
  let initialize = (d,i=0) => ({...d, x: i * (spread.w + card.w - 10), y: 400,
                                     w: card.w, // d.tall ? card.w_ : card.w,
                                     h: card.h}) // d.tall ? card.h_ : card.h})
  let db = prep.map(initialize)
  
  let overlaps = (u, cx, cy) => 
    cx < u.x+u.w && cx > u.x && cy < u.y+u.h && cy > u.y
  let firstOverlap = (selfId, cx, cy) =>
    db.filter(u => u.id != selfId).find(u => overlaps(u, cx, cy))
  
  // card initialization
  let define = (db) => {    
    let attach = function (sel) { 
      sel // borders
        .append('rect')
        .attr('class', 'highlight').attr('transform', 'translate(-5,-5)')
        .attr('width', d => d.w+10).attr('height', d => d.h+10)
        .attr('rx', 15).style('fill', '#ddd')
      sel // illustrations
        .append('image')
        .attr('href', d => d.url).attr('preserveAspectRatio', 'xMidYMid slice')
        .attr('width', d => d.w).attr('height', d => d.h)
        .attr('clip-path', d => `url(#clip${d.tall ? 'tall' : ''})`)

      sel // labels
        .each(function (d,i) {
        // multiline text from each datum
        d3.select(this).append('text')
          .attr('id', 'epithet')
          .style('fill', 'white').style('opacity', 0).style('user-select', 'none')
          .attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging')
          .attr('filter', 'url(#solid)')
          .selectAll('tspan').data(d.epithet.split(', '))
            .join('tspan')
            .text((s) => s).attr('x', d.w / 2).attr('y', (_,i) => d.h + (i+1.3)*14)

        d3.select(this).append('text')
          .attr('id', 'query')
          .style('fill', 'black').style('user-select', 'none')
          .attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging')
          .selectAll('tspan').data(d.query.split('  '))
            .join('tspan')
            .text((s) => s).attr('x', d.w / 2).attr('y', (_,i) => d.h + (i+1.3)*14)
      })

      sel.on('click', (d,i) => {
        if (choice.index[d.id] != -1 && choice.stuff[choice.index[d.id]][0] != d.id) { // rotate clicked card to top
          choice.put(d.id, choice.index[d.id])
          update()
        }
        else { // activate lightbox
          d3.selectAll(`.lightbox`).style('display', 'none')
          d3.select(`.lightbox#${tokens[d.id]}`).style('display', 'block')
        }
      })
      return sel
    }
    
    let cards = svg.selectAll('g').data(db, d => d.id) // FIXME: exiting data breaks alignment
                .join((enter) => attach(enter.append('g')))
                // .join('g').call(attach)
                .attr('transform', d => `translate(${d.x}, ${d.y})`)
    
    cards.call(d3.drag()
               .on('start', function(d) { // DRAG START
      grab.dx = d3.event.x - d.x
      grab.dy = d3.event.y - d.y
      d3.select(this).raise()
    })
               .on('drag', function(d) { // DRAGGING
      let x = d3.event.x - grab.dx,
          y = d3.event.y - grab.dy
      let overlaps = firstOverlap(d.id, x+card.w/2, y+card.h/2)
      d3.select(this)
        .attr('transform', `translate(${x}, ${y})`)
        .select('.highlight')
          .style('fill', (d) => overlaps ? '#ddd' : '#444')
      d.x = x; d.y = y
    })
               .on('end', function(d,i) { // DRAG END
      let x = d3.event.x + card.w/2, y = d3.event.y + card.h/2

      let x_ = d3.event.x, y_ = d3.event.y // we'll clamp x_ and y_ to avoid overflowing the edge
      if (x > spread.x && x < spread.x + spread.w &&
          y > spread.y && y < spread.y + spread.h - 20) {

        x_ = clamp(x, spread.x + (5./9)*card.w, spread.x + spread.w - (5./9)*card.w) - card.w/2
        y_ = clamp(y, (5./9)*card.h, spread.h - (5./9)*card.h) - card.h/2

        // DRAW CARD
        let u = firstOverlap(d.id, x_+card.w/2, y_+card.h/2) // do I overlap anyone who isn't me?
        let k = u ? choice.index[u.id] : choice.nextFree(d.id) // then join their stack, or else start one
        choice.put(d.id, k)

        // REVEAL CARDS
        if (!d.placed) {
          fork(d.id) // defined below, before this callback runs
          d.placed = true
        }
        update()

      } // if not in playing area:
      else { x_ = d.x < spread.w ? 0 : spread.w + card.w + 10;
            choice.pull(d.id); update() } // PULL CARD

      d.x = x_; d.y = y_
      d3.select(this)
        .transition()
        .attr('transform', `translate(${x_}, ${y_})`)
    }))
    // cards.html('') // HACK: destroy spurious children
    
    let redraw = function () { 
      // TODO: ascertain how the extant cards are leaked into this closure
      
      cards.selectAll('.highlight')
          .style('fill', (d) => faces.includes(d.id) ? '#ddd' : '#444')
          // .style('opacity', (d) => faces.includes(d.id) ? 1 : 0)
      cards.selectAll('image') // inactive cards are translucent
          .style('opacity', (d) => faces.includes(d.id) ? 1 : .9)
      
      cards.selectAll('text#epithet')
          .transition()
          .style('opacity', (d) => faces.includes(d.id) ? 1 : 0)
      cards.selectAll('text#query')
          .style('opacity', (d) => faces.includes(d.id) || obstructed.includes(d.id) ? 0 : 1)
    }    
    let update = function () {
      faces = choice.getFaces()
      obstructed = choice.getObstructed()
      svg.node().dispatchEvent(new CustomEvent('input'))
      redraw()
    }
    redraw()
  }
    
  let fork = (id) => {
    path.push(id)
    db = db.filter(u => path.includes(u.id)) // debug weird stray dragend() effects
    // db.forEach(u => {if (!path.includes(u.id)) u.gone = true })
    
    if (paths[id]) {
      let target = paths[id]
      if (!target.length) target = [target]

      target.forEach((u,i) => {
        db.push( initialize(u,i) )
      })
    }
    else {
      console.log(`swallowing card of id ${id}`)
    }
    define(db)
  }
  
  define(db)
  svg.node().value = choice // []
  
  svg.node().reset = () => {
    db = prep.map(initialize)
    define(db)
    choice = []
  }
  return svg.node()
}
)});
  main.variable(observer("makePicks")).define("makePicks", ["key"], function(key){return(
(input) => {
  let faces = input.getFaces().sort()  
  // return = [...key(a,b), ...key(b,c), ...key(a,c)].filter(t => t).sort()
  return faces.map((u,i) => faces.filter((_,j) => j > i).map(v => key(u,v))).flat()
}
)});
  main.variable(observer("key")).define("key", ["dictionary","tokens"], function(dictionary,tokens){return(
(i,j) => { // locate an index which occurs for the indicated pair of tokens
  let head = dictionary.head
  if (!tokens[i] || !tokens[j]) return ''
  return head[tokens[i]].filter(t => head[tokens[j]].includes(t))[0] // SWALLOW excess indexes
}
)});
  main.define("initial hints", function(){return(
[]
)});
  main.variable(observer("mutable hints")).define("mutable hints", ["Mutable", "initial hints"], (M, _) => new M(_));
  main.variable(observer("hints")).define("hints", ["mutable hints"], _ => _.generator);
  main.define("initial trace", function(){return(
[]
)});
  main.variable(observer("mutable trace")).define("mutable trace", ["Mutable", "initial trace"], (M, _) => new M(_));
  main.variable(observer("trace")).define("trace", ["mutable trace"], _ => _.generator);
  main.variable(observer("updateHints")).define("updateHints", ["branching","mutable hints"], function(branching,$0)
{
  let curr = branching.getFaces() //.sort()
  
  // insert, preserving position
  let prev = $0.value
  $0.value = [0,1,2].map(i => curr.includes(prev[i]) ? prev[i] : -1)
  curr.filter(t => !$0.value.includes(t))
      .forEach(t => $0.value[$0.value.findIndex(j => j == -1)] = t) // fill first opening
}
);
  main.variable(observer("updateTrace")).define("updateTrace", ["branching","key","trace","mutable trace"], function(branching,key,trace,$0)
{ // in embedded mode, the inspector must address this cell, or it will fail to run
  // console.log('trace updated')
  // update trace (imperative version of makePicks\1) on update to 'branching'
  let faces = branching.getFaces().sort(),
    ret = [key(faces[0], faces[1]), key(faces[0], faces[2]), key(faces[1], faces[2])]
  if (faces.length == 4)
    ret = [...ret, key(faces[0], faces[3]), key(faces[1], faces[3]), key(faces[2], faces[3])]
  
  if (faces.length == 0 && trace.length != 0) // no cards, clear trace
    $0.value = []
  else if (faces.length >= 3 && !ret.every(k => trace.includes(k))) // many cards
    $0.value = [...ret]
  else {
    ret = ret[0]
    if (ret && !trace.includes(ret)) // two cards, update history
      $0.value = [ret, ...$0.value.slice(0,1)] // was 0,2. dispose of older edges.
  }
}
);
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
figure {
  display: inline-block;
  max-width: 30%;
  height: auto;
  margin: 0;
  padding: 5px;
  text-align: center;
}
grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 15px;
  width: 100%;
}
passage {
  margin: 0 1rem;
}

img {
  width: 100%;
}
input {
  background: white;
  border: 1px solid #aaa;
  color: #aaa;
}
input:hover {
  border: 1px solid #066;
  color: #066;
}

@keyframes fadein {
    from { opacity:0; }
    to { opacity:1; }
}
@keyframes slipin {
    from { opacity:0; }
    50% { opacity:0; }
    to { opacity:1; }
}
</style>`
)});
  main.variable(observer("parse")).define("parse", function(){return(
(index, lines) => {
  let tags = {}, corpus = {},
      major = '', minor = ''
      // couplet = false // FIXME: hack
  
  index.forEach(u => {
    /* if (u.slice(0,2) == '##') { // disabled: subheadings
      minor = u.slice(2).trim()
      res[major][minor] = []
    } */
    if (u[0] == '#') {
      major = u.slice(1).trim()
      if (!tags[major]) tags[major] = []
    }
    else if (major && u[0] == '-') {
      let entry = u.split(']')
      minor = entry[0].split('[')[1] // strip boilerplate from tag
      if (minor) tags[major].push(minor)
      
      if (minor && !corpus[minor]) // inline entries
        corpus[minor] = entry[1] ? entry[1].trim() : ''
    }
    else if (major && u.trim()) {
      corpus[minor] += `<p>${u}</p>` // extended inline entries ONLY
      /* corpus[minor] += couplet ? u + '</p>' : '<p>' + u + '  \n'
      couplet = !couplet */
    }
  })
  
  lines.forEach(u => {
    if (u[0] == '-') {
      let entry = u.split(']')
      minor = entry[0].split('[')[1]
      corpus[minor] = entry[1].trim()
    }
    else if (u.trim()) { // primary entries
      corpus[minor] += u.trim().split(' ').length == 1 ? `<h4>${u}</h4>` : `<p>${u}</p>`
    }
  })  
  return {head: tags, body: corpus}
}
)});
  main.variable(observer("roles")).define("roles", function(){return(
[
  `STRENGTH`,
  `ANSEGDNISS`,
  `THE PRIESTESS`,
  `IRAE`,
  `DEATH`,
  `THE MOON`,
  `THE DEVIL`,
  `THE SUN`,
  `EIDOLON`,
  'THE LOVER',
  `THE TRAITOR`,
  ]
)});
  main.variable(observer("wants")).define("wants", function(){return(
[
  `What will it cost  to play my role?`,
  `What was long gone,  that still you bore?`,
  `What would I regret  beyond all else?`,
  `What skillful means  did I employ?`,
  `What deception  did I reveal?`,
  `What did our hands  bring to an end?`,
  `What did I desire  above all else?`,
  `What became of  my love?`,
  `What disaster was I  willing party to?`,
  'What became of  your old desires?',
  `What will it cost  to play my role?`,
  ]
)});
  main.variable(observer("prep")).define("prep", ["roles","wants"], function(roles,wants)
{
  // writing prompt
  let a = (s) => `./assets/${s}.png`
  let images =
    [a('guardian_'), a('moth'),
      a('orbit'), a('forge'), a('lantern'),
    a('imbrication'), a('devil'),
      a('grail'), a('priestess'), a('emperor'),
    a('hanged')]
  
  let res = (i) => ({id: i, epithet: roles[i], query: wants[i], url: images[i], tall: true}) // [0,1,2,5].includes(i)})
  let ret = { // this should be an Object.fromEntries, zipping 'tokens' and 'res'
    'judgement': res(0),
    'strength': res(1),
    'priestess': res(2),
    'magician': res(3),
    'death': res(4),
    'moon': res(5),
    'devil': res(6),
    'sun': res(7),
    'tower': res(8),
    'justice': res(9),
    'judgement_': res(10),
  }
  // shuffleArray(ret)
  // ret = ret.slice(0,4) // CLUDGE
  return ret
}
);
  main.variable(observer("tokens")).define("tokens", function(){return(
['judgement', 'strength', 'priestess', 'magician',
          'death', 'moon', 'devil', 'sun',
          'tower', 'justice', 'judgement_']
)});
  main.variable(observer("dictionary")).define("dictionary", ["parse","index","lines"], function(parse,index,lines){return(
parse(index, lines)
)});
  main.variable(observer("index")).define("index", function(){return(
`
# devil
- [3+2k]
- [6+1i]
- [6+1k]
- [3+3k]
- [3+1k]
- [6+2i]
- [2+5i]
- [3+1j]
- [4+1j]

# magician
- [3+1j]
- [7+2i]
- [2+2i]
- [0+2j]
- [3+4j]
- [0+3j]
- [4+2i]
- [4+2j]
- [1+2k]
- [2+1k]

# judgement
- [6+2i]
- [7+1i]
- [1+2k]
# judgement_
- [2+1k]
- [6+2k]
- [1+1i]

# strength
- [1+4i]
- [1+5j]
- [1+1i]
- [3+2j]
- [5+1k]
- [3+3j]
- [3+4j]
- [3+3k]
- [4+4j]

# priestess
- [4+3i]
- [0+2j]
- [2+5i]
- [5+1i]
- [2+4i]
- [3+2j]
- [7+1j]
- [5+2j]
- [4+5j]

# death
- [4+3i]
- [0+3j]
- [2+4j]
- [1+5j]
- [2+1i]
- [6+1j]
- [3+2k]
- [3+6j]
- [4+6j]

# moon
- [6+1k]
- [7+2i]
- [1+3k]
- [2+4j]
- [0+2i]
- [4+0i]
- [1+4i]
- [2+4i]
- [4+7j]

# justice
- [3+1k]
- [2+2k]
- [5+1k]
- [2+1i]
- [0+2i]
- [2+2i]
- [5+2j]
- [6+2k]
- [4+8j]

# tower
- [1+3k]
- [6+1i]
- [2+2k]
- [4+2i]
- [7+1i]
- [3+3j]
- [7+1j]
- [3+6j]
- [4+9j]

# sun
- [4+1j]
- [4+2j]
- [4+3j]
- [4+4j]
- [4+5j]
- [4+6j]
- [4+7j]
- [4+8j]
- [4+9j]
`.split('\n')
)});
  main.variable(observer("clamp")).define("clamp", function(){return(
function(arg, min, max) {
  return Math.min(Math.max(arg, min), max);
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('./assets/d3.v5.min.js')
)});
  main.variable(observer("Piles")).define("Piles", ["d3"], function(d3){return(
class Piles { /* think of this as Piles[Int],
                 where each Int x, such that 0 <= x < maxPiles,
                 is an index of List[Card] (or w/e). */
  
  constructor(maxPiles) { // was ActivePool
    this.stuff = [...Array(maxPiles)].map(_ => [])
    this.index = Array(maxPiles).fill(-1)
    this.capacity = maxPiles
  }
  
  put(card = -1, pile = -1) {
    if (card < 0) throw Error("what should I put?")
    if (pile < 0) throw Error("where should I put " + card + "?")
    
    if (card >= this.capacity) throw Error("index " + card + " exceeds my capacity of " + this.capacity)
    if (pile >= this.capacity) throw Error("I only have " + this.capacity + " piles, index " + pile + " is too far")
    
    this.pull(card)
    this.stuff[pile].unshift(card)
    this.index[card] = pile
  }
  
  pull(card) {
    if (this.index[card] == -1) return
    
    let where = this.index[card],
        arr = this.stuff[where]
    arr.splice(arr.indexOf(card), 1)
    this.index[card] = -1
  }
  
  nextFree(ignore) {
    return this.stuff.findIndex(u => u.filter(v => v != ignore).length == 0)
  }
  getLength() {
    return this.index.filter(v => v != -1).length
  }
  
  getFaces() {
    return this.stuff.map(u => u[0]).filter(v => v !== undefined)
  }
  getObstructed() {
    return this.stuff.map(u => u.slice(1)).flat()
  }
  
  faces(tokens) {
    return this.getFaces().map((i) => tokens[i])
  }
  occlusion(tokens) {
    return this.stuff // for each pile
               .map((u) => d3.range(u.length-1) // take each pair
                  .map(i => `${tokens[u[i+1]]} under ${tokens[u[i]]}`)
                        ).flat().filter(t => t)
  }
  
  toString() {
    return `${this.stuff.filter(u => u.length > 0).length} piles of ${this.index.filter(u => u != -1).length} things`
  }
}
)});
  return main;
}
