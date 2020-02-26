// https://observablehq.com/d/4db99be358f79600@3790
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# exul mater`
)});
  main.variable(observer()).define(["md"], function(md)
{
  let ret = md`
In 405, ~~Mettia Setesh~~ Ansegdniss subjugated the territory of the Sky, despite censure from the World that is the Origin of Holy Empire. She had once been protector of the Five Moons in the Defensive War, and counted among their rebellious priests.

In 427, the Temple which seats the World was sacked by invaders from the Sky, because it had departed from the virtues of past ages. It is testified that a daughter of Setesh was responsible.`
  ret.children[0].style.margin = "1em 0" // HACK
  
  // return ret
  return md``
}
);
  main.variable(observer("showPreamble")).define("showPreamble", ["updateHints","md","mutable hints","wants"], function(updateHints,md,$0,wants)
{
  updateHints;
  let title = `
Two decades prior, Setesh Ansegdniss subjugated the territory of the Sky, despite censure from the World that is the Origin of Holy Empire. 

The Temple which seats the World was sacked by invaders from the Sky, because it had departed from the virtues of past ages.

It is testified that a daughter of Setesh was responsible.`
  
  if ($0.value.every(t => t == -1)) {
    let ret = md`${title}`
    ret.className = 'hints'
    return ret
  }
  let ret = $0.value.map(t => t == -1 ? '' : wants[t].replace('  ', '  \n'))
                    .map(s => `<p style="text-align: center;">${s}</p>`)
  return md`<div class="hints">${ret}</div>`
}
);
  main.variable(observer("showFable")).define("showFable", ["irae","branching","tokens"], function(irae,branching,tokens){return(
irae.render([...branching.faces(tokens),
             ...branching.occlusion(tokens)])
)});
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
  while (picks.length < 3) { // pad picks to fixed length
    let b = `<p></p>` // <span style='border: dashed gray; border-width: 0 1px 0 0;'>&nbsp;</span>
    picks.push('<h4>&nbsp;</h4>'+b+b+b) //+b
  }  
  let results = html`<grid style="grid-template-rows: 2em 1fr 1fr 1fr; grid-auto-flow: column;">
                     ${picks.join('\n')}
                     </grid>`
  for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 3; ++j) {
      let res = results.children[j*4 + i] // TODO: hoist loop
      
      if (active.includes(trace[j])) {
        res.style.animation = 'fadein .5s'
        res.style.color = 'black'
      }
      else {
        res.style.color = 'gray'
      }
    }
  }
  return results // md`${results.outerHTML}`
  
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
  let ret = html`<input type='button' value='rewind' style='font-size: 2em; float: right;' />`
  ret.onclick = Function.prototype // HACK: merely triggers the dependent cell 'viewof branching' to reload
  return ret
}
);
  main.variable(observer("counter")).define("counter", ["Generators", "viewof counter"], (G, _) => G.input(_));
  main.variable(observer("irae")).define("irae", ["Charsheet"], function(Charsheet){return(
new Charsheet(() => 'and so',
{'magician': [`*The princess seeks the exiled queen.*  

*In this course, she takes a lover.*
`, ['strength', 'justice', 'death',
    'tower', 'devil', 'priestess',
    'moon', 'sun', 'judgement']],
 
 // ansegdniss
 'strength': [`**ENTER ANSEGDNISS.**
 
 *The queen admits the princess into her confidence.*`, ['justice', 'death', 'moon', 'judgement']],
 
 'justice': [`**ENTER LOPTR.**
 
 *The queen's foreign consort mourns, for she is crowned.*  

*He flees to the Earth with his princess.*`, 'judgement'],
 'death': [`*The princess becomes her mother's general.*  

*She discerns the crucible upon which the Sky becomes the World.*`, 'moon'],
 
 // idyll
 'tower': [`**ENTER EIDOLON.**
 
 *The witch unites with the princess. They would unite the World entire.*`, ['priestess', 'devil', 'sun', 'judgement']],
 
 'priestess': [`*The princess knows the Earth and its weaknesses, being intimate with its dogmas.*  

*She instructs the witch toward her revenge.*`, 'sun'],
 'devil': [`*The princess learns to summon her familiars for guidance.*  

*These serpents come to dwell in her flesh.*`, 'judgement'],
 
 // terminal
 'judgement': `**EXIT LOPTR.**
 
 *The princess is crowned, in the end.*`,
 'judgement_': `**EXIT ANSEGDNISS.**

 *The princess is crowned, in the end.*`,
 'sun': `**EXIT EIDOLON.**
 
 *The witch is reduced to ashes in the campaign.*`,
 'moon': `**EXIT IRAE.**
 
 *The princess returns to conquer her homeland.*`
})
)});
  main.variable(observer("lines")).define("lines", function(){return(
`
- [0+2i]
    
- [0+2j]
EIDOLON:
Your fleet gathers for the iron-crowned girl who has promised to end an empire, whose corona is like the burning sun. Their formation is like woven metal, which forms resonating membranes.

Their sound is the transformation of light into movement, signals into physical displacements. To become sacred is to purify your wavelength, and thus strike at the world, to produce a clean interference pattern.

These methods reveal other persons, who are known only through the sums and differences of our misapprehensions. Their decompositions are easily consumed.

- [0+3j]
IRAE:
Father thought to imagine the Tyrant was not reproduced amongst the petty bureaucracy of the World. In his absence, his reading is perhaps incomplete. But like them, he resolved to be free of you.

If he could not be cold, he should have burnt himself numb. I will choose to forsake mortal weakness, for I am but one of his kind. It is an efficient sacrifice, because I am so much less than we will be. As you were once less than you became.

There is no immortality but through those who succeed us, who will by example become our kind.
    
- [1+1i]
IRAE:
As I was taught by the hunter of men, who was your pupil, who learned that the meaning of strength is to be broken and yet survive. To embrace this strength was never to heal; a cruel lesson, that she'd learned well.

Greater than the Tyrant was the power that caught us, on the moon of prismatic stone which hosts the World's reactors. It now is compromised, overgrowing itself for its own wants and ends. Mother, your solution cannot be to weaken our allies.

Our Holy Empire will not root out the cancer it thinks to exploit, and is consumed by. They have never learnt the lessons of your exile.

- [1+2k]
ANSEGDNISS:
Consider who she is, that loves you as you have become. And if she is your creature, then what might she be capable of?

If you could assign a shape to corruption, a color, wouldn't it be convenient? The stones are black and iridescent, grown at odd angles under a fractal-inducing field.

You warned me of the false Sun that the World would harness, whose creeping growth is exponential. The void at the heart is white, because it penetrates.
    
- [1+3k]

- [1+4i]
ANSEGDNISS:
Each warning was a temptation. Our mistakes created the border our cleverer apprentices would cross, and perhaps return from. I despair for our errors which I failed to obsolesce.

Of all of us, your teacher knew best the cruelty of mercy. That which would be inexistent is weak. Yet the World is virtuous, and I take pity on it. Though their sacred were tamed, and could not become us in all of history.

Did I not discourage her from creating false saviors? And here you come. So we do away with the mortals we were. 

- [1+5j]
ANSEGDNISS:
Your limbs are bound and used as levers, yet you twist away. It is because of the cruel precedent that was not inevitable, but is not unpalatable enough to disavow.

Your brow is furrowed deeply, and erythritic against the hollows of your eyes. Their bony sockets lie taut beneath your skin. You wear the woman I see as a mask, your own body.

You know your parents' failings, and their wraiths. You will flee their forms, and recapitulate each one in turn.

- [2+1i]
    
- [2+1k]
EIDOLON:
Consider who she is, that your father loved who she once was. Your mother is broken by a contagious philosophy. Her proximity, warps.

Your teacher was her student, and knew these failings well. She discovered the malignance on that reactor moon, seeking the white hole or its containment within, whereby those crystals yield greater energy than they consume.

Its ineluctable signal drew her there, its pattern inimical to all others, before she was killed.
    
- [2+2i]
IRAE:
My mother's strength was such: when the Tyrant went to turn her against herself, he found nothing there. Yet she could not rule my father's people alone, and allied with warlords, indulging their depredations upon the World.

My father's crime was such: he betrayed his liege out of guilt, when the Earth sent him their broken general to ruin what was not yet the World. Yet he saw I would inherit her darkness.

My illumination then was certain. I was brought to the Temple, as a student. And I would banish their shades both, their failed encapsulation of me.
    
- [2+2k]
    
- [2+4i]
    
- [2+4j]
IRAE:
I have realized, Mother, that you love the World dearly. As one loves the thing that has consumed them. You conquered for them, so that I might not. You would have committed any atrocity.

Let me bear the sum and total of your deeds. Father conferred upon me the armor, his temperance, and I am tempered thus. The sword I claim is your crusade, and I am cut free of doubt.

Tempered against hatred, at last I shall wield it. I am here now to join your cause, which is a war to end wars. Are you afraid, Mother?

- [2+5i]
    
- [3+2k]

- [3+2j]
    
- [3+3k]
    
- [3+1j]
IRAE:
I draw the new muscle from its cave, anchored by the root. I feel the imbricated veneer of its surface as though grasping my own fingernail. Its flexed maw flicks faint molecules from the air. 

The memories of the dead had scurried to hide in the deepest archives. My familiars grew wise upon them, then fed amongst themselves, so that only the most ruthless survived. And its appetites became mine.

My throat is scraped raw. I find it has no gullet, despite its parasitism. I coax its venom-bearing body into the proper place for a tongue.

- [3+3j]
ANN:
You forsook your king for my sake, and led your men to die. I accepted these gratefully. I only sought to create a future free of ancient curses. Then, none would be left to guide her steps.

But when my enemies came for her father, you surrendered her to my castigators. She would be alone on the Moon for many spans, and enter into many of its tortured chasms, where hid those voices which I had silenced.

Thus you stole her from me, the only one I would save.

- [3+4j]
EIDOLON:
Strength, in the person of your mother, is hard and grey. A pillar of laminar steel, made under torsion to curve like a human body would.

She is a widow, or a vagrant, or a general. Because she serves the World that is the Origin of Holy Empire, she is banished from the World. Having made herself sacred, she is more and less than a citizen.

Your mother Lord Ansegdniss resides in the black between Worlds. You are pulled to her.

- [3+6j]
    
- [4+0i]
    
- [4+2i]
ANSEGDNISS:
You were banished from the Temple and exiled from the World. You have confessed all to the priestess. Although you inherited my enemies, Daughter, never were you my ally until now.

You once delved into the archives where every atrocity dwelt, and made their logics live inside of you, unaware that serpents multiply. You resolved to bring the Sky its justice.

I have sealed the Sky against the lawful means of rule, of belonging to the World, being subject to its greed. I have kept their leaders weak by culling, lest they defect. But you would make them all citizens.
  
- [4+2j]
EIDOLON:
Better to be a monster, I rationalized while young. My suffering would be purposeful, a punishment for impiety. Suffering in service of future triumph, an end to cruel masters. 

You were also a mask, an artifice that dreamed itself to conceal a flaw. A person who would solve the problem of herself. By exile, you would inherit her divinity. You removed your mask, which was your skin.

Beneath it was the painful contradiction, a gap. A story you could not tell. We drew from it a weapon fit to end empires. A terrible goddess, fit to worship.

    
- [4+5j]
IRAE:
As the world is divided into evening and dawn, so we gave the wandering star two names, and it became divided. Fickle stars created by acerbic words.

I am afraid of my serpents, for they beg me to let them feed. Afraid of my tools, for they conceal any problem they cannot solve. I will show you what I do and what I say. Then I will beg of you, tell me who I am.

How else can I reckon my worth? Lest madness arrive in wisdom's guise. Lest trauma speak to me as triumph and glory.

- [4+9j]
EIDOLON:
Your fingers find mine, eager, careful not to catch on sharp claws. I tell you they've begun to ask, have you let the Earth's secrets slip our grasp? You inquire so gently: Have I answered truly?

They will not know your deeds. Am I not your priestess? Would you harm me when they have not? Your familiar reaches toward me, uncoiling for a kiss. I offer my neck.

Are you not yourself turned against the Earth, willingly? In your irises are red embers, which honor your father. You are burning, you are are burning. You will save us all. You insist. You insist.

- [5+1i]
    
- [5+1k]
LOPTR:
Then I wish we could rewind, to when nothing jagged and weeping resided in you. No more the pain you feel. No cloak or flashing steel. Before betrayals such as mine, the murder of false masters.

Could I have loved you, or only the mortal who was you, all along? The goddess could not love; she could not be anything but what she was.

I know the symptoms of surrender, the brimstone in your irises. I don't need you to be strong now. What she will be, is what we have saved.
    
- [5+2j]
    
- [6+1i]
IRAE:
I have adored the hard planes of your face, which honors the World and its beautiful statues. I have beheld your scarred visage, whose tertiary eyes are glassy and black, that you earned after killing your mother.

I traced behind your curse-mask, monstrous where your face is occluded, as by turning away. By palpitation, I would discern which was the lie. But between were only intermediates; my gradations between them, arbitrary.

Now I recognize your corruption, your contradictory polysemy, which you allowed me to approach freely. Your scrying sphere rests in your palm, it holds me inverted.
    
- [6+1j]
    
- [6+1k]
    
- [6+2i]
IRAE:
If I cannot discern your true name, then my telling of you is empty deception. Am I weary of words, that none is more correct than any other?

When I taste the air, I know each facet of the molecular conformations in their whole distribution, an intricate and inevitable balance which is unspeakable. This is our secret that you have told me.

Each technology of thought, each teaching unlearnt, each text that seeks to name you forever will fail. Would that you were wood ash, and not black powder.

- [6+2k]
LOPTR:
The jackboot, the mutineer, is painfully alive and his warm heart bleeds. For you memorized the ligaments of your joints, and practiced upon yourself, learning to permanently cripple your enemy.

The Tyrant died. You would not replace him. The moral danger lay not in individual transgressions, but in no longer knowing which were necessary. The sovereign futures I had spun fell one by one to pieces.

My daughter will be my legacy. Stained, but a disciple nonetheless. Because it will not suffice that she pretend to understand their scriptures, therefore she will come to know them. 
    
- [7+1j]
EIDOLON:
You tasted my lips, and consumed that which was numb in me. You emulated my death, and now I long for your warmth.

I will make of the World its own altar. At the heart of its Temple lies a glassy atrium, a compendium whose stacks are shining polyhedra, which house their stolen and forgotten and former truths.

When I enter into this archive, the World will burn it for us, so that I am expunged. Because I am not mine, but yours alone, this will see us safely gone.

- [7+1i]
EIDOLON:
I dreamed a queen of serpents to murder me with my gratitude. I would face the sun and refract its glory, knowing I was made of ice. Thus an illumination was also an ending.

The Lord of Sacrifice has lost her daughter, who came back to her. Whose father had begged she be made civilized and civilizer. We conquered with the iron of your forges, and were conquered by the efficient forms of your processes.

This is synthesis, then. The Earth wanes as the Sky waxes. And in time, we will raise our own legion for the World.

- [7+2i]
IRAE:
The archives of the Holy Empire are fractal shelves, thirty-some layers deep. These tree-structures bear shards of knowledge like broken mirrors. Their dendrites seek out meaning, which will be sliced apart to be absorbed.

The ships which rallied to my mother's banner fell into chasms and shattered into echoes. These dead were left for priests to grow forgetful of, which is how I came to know the past despite their guard.

I would isolate the key to heaven amongst these remains. I would unite the Earth and the Sky. I would discover the antiphase of the ineluctable signal.`.split('\n')
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
  let svg = d3.select(DOM.svg(1000, 450)) // 900, 500
  let card = {w: 220, h: 300, w_: 200, h_: 340}, // 170, 250; 160, 270
      spread = {x: card.w_ + 5, y: 10,
                w: 540, h: 420} // 700, 470
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
  svg.select('defs')
    .append('clipPath').attr('id', 'cliptall')
      .append('rect').attr('width', card.w_).attr('height', card.h_)
      .attr('rx', 10)
  
  // playing area
  let mat = svg.append('rect')
    .attr('x', spread.x).attr('y', spread.y)
    .attr('width', spread.w).attr('height', spread.h)
    .style('fill', '#222').style('stroke', 'black')
  
  let initialize = (d,i=0) => ({...d, x: i * (spread.w + card.w_ + 10), y: 0,
                                     w: d.tall ? card.w_ : card.w,
                                     h: d.tall ? card.h_ : card.h})
  let db = prep.map(initialize)
  
  let overlaps = (u, cx, cy) => 
    cx < u.x+u.w && cx > u.x && cy < u.y+u.h && cy > u.y
  let firstOverlap = (selfId, cx, cy) =>
    db.filter(u => u.id != selfId).find(u => overlaps(u, cx, cy))
  
  // card initialization
  let define = (db) => {    
    let attach = function (cards) { 
      cards // borders
        .append('rect')
        .attr('class', 'highlight').attr('transform', 'translate(-5,-5)')
        .attr('width', d => d.w+10).attr('height', d => d.h+10)
        .attr('rx', 15).style('fill', '#444444')
      cards // illustrations
        .append('image')
        .attr('href', d => d.url).attr('preserveAspectRatio', 'xMidYMid slice')
        .attr('width', d => d.w).attr('height', d => d.h)
        .attr('clip-path', d => `url(#clip${d.tall ? 'tall' : ''})`)

      cards // labels
        .each(function (d,i) {
        // multiline text from each datum
        d3.select(this).append('text')
          .attr('id', 'epithet')
          .style('fill', 'white').style('opacity', 0).style('user-select', 'none')
          .attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging')
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

      cards.on('click', (d,i) => {
        if (choice.index[d.id] != -1) { // rotate clicked card to top
          choice.put(d.id, choice.index[d.id])
          update()
        }
      })
      return cards
    }
    
    let cards = svg.selectAll('g').data(db, d => d.id) // FIXME: exiting data breaks alignment
                .join((enter) => attach(enter.append('g')))
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
      d3.select(this)
        .attr('transform', `translate(${x}, ${y})`)
      d.x = x; d.y = y
    })
               .on('end', function(d,i) { // DRAG END
      let x = d3.event.x + card.w/2, y = d3.event.y + card.h/2

      let x_ = d3.event.x, y_ = d3.event.y // we'll clamp x_ and y_ to avoid overflowing the edge
      if (x > spread.x && x < spread.x + spread.w &&
          y > spread.y && y < spread.y + spread.h - 20) {

        x_ = clamp(x, spread.x + (5./9)*card.w_, spread.x + spread.w - (5./9)*card.w_) - card.w_/2
        y_ = clamp(y, (5./9)*card.h_, spread.h - (5./9)*card.h_) - card.h_/2

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
      else { x_ = d.x < spread.w ? 0 : spread.w + card.w_ + 10;
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
          .style('opacity', (d) => faces.includes(d.id) ? 1 : 0)
      cards.selectAll('image')
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
      ret = [key(faces[0], faces[1]), key(faces[1], faces[2]), key(faces[0], faces[2])]
  
  if (faces.length == 0 && trace.length != 0)
    $0.value = []
  else if (faces.length == 3 && !ret.every(k => trace.includes(k)))
    $0.value = [...ret]
  else {
    ret = ret[0]
    if (ret && !trace.includes(ret))
      $0.value = [ret, ...$0.value.slice(0,1)] // 0,2
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
  `Loptr, The Gallows`,
  `Ansegdniss, Strength`,
  `Eidolon, Temperance`,
  `Irae, The Magician`,
  `Invidiae, Death`,
  `Ansegdniss, The Moon`,
  `Invidiae, The Devil`,
  `Irae, The Sun`,
  `Eidolon, The Priestess`,
  'Loptr, The Lovers',
  `Loptr, The Gallows`,
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
    [a('hanged'), a('mother'),
      a('priestess'), a('grail'), a('lantern'),
    a('guardian'), a('imbrication'),
      a('devil'), a('orbit'), a('emperor'),
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
require('d3@5')
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
