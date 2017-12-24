// JTO 12/12/14 simulation code. forked 12/20/17 graphs & input.
// port from processing.js / gwoptics to p5.js / d3.js / vega-lite

class Seg {
  // excitation = 0 at equilibrium potential

  constructor (excitation, recovery, position) {
    this.v = excitation; // real [0,1]
    this.w = recovery;   // real [0,1]
    this.x = position; // int [0,nSegs)
  }
  
  update() {
    // translation-invariant eqs ignore x
    var v = this.v, w = this.w;

    this.v += v * (v - par.a) * (1 - v) - w;
    this.w += par.eps * (v - par.b * w);
  }
  
  draw(xLoc, yLoc, pxWidth, pxHeight) {
    var hue = this.v > 0 ? 128 : 0;
    
    fill(hue, abs(this.v * 255), 255);
    stroke(0, 0, floor(this.w * 1680));
    rect(xLoc, yLoc, pxWidth, pxHeight);
  }
}

function update() {
    if (mouseIsPressed) // depolarize at 'axonal hillock'
        model[0].v = inputMag;
    
    // update individual segments
    for (i = 0; i < nSegs; ++i) {
      model[i].update();
    }

    // (crudely) compute ion gradients
    let diffLtR = [];
    for (i = 0; i < nSegs - 1; ++i) {
      diffLtR[i] = model[i].v - model[i+1].v;
    }
    // perform diffusion
    for (i = 0; i < nSegs; ++i) {
      if (i < nSegs - 1)
        model[i].v += par.D * -diffLtR[i];
      if (i > 0)
        model[i].v += par.D * diffLtR[i-1];
    }
}

let par = {
    'a': .1,   // excitation threshold of K+ channels
    'b': 5,    // recovery rate of Na+ channels (was 5)
    'D': .3,   // diffusion rate of ions (was .3, try .5)
    'eps': .01 // 'slow channel' factor of Na+ vs K+ (was .005)
    };
let domains = [
    {'min': .01, 'max': 1, 'isLog': true},
    {'min': .5, 'max': 50, 'isLog': true},
    {'min': .03, 'max': 3, 'isLog': true},
    {'min': .001, 'max': .1, 'isLog': true},
    ];

var nSegs = 20;
var inputMag = .75;
var running = true;

var model = [];
var vg = undefined;
// TODO: compare direct IBM with ion species
// TODO: control externally applied voltage

var seg_y = 50;
var seg_h = 100;

var slider = undefined;

function setup() {
  var c = createCanvas(600, 200);

  c.parent('sim');
  colorMode(HSB, 255);
  strokeWeight(2); // stroke(0);

  // create model segments  
  model[0] = new Seg(inputMag, 0, 0);
  for (i = 1; i < nSegs; ++i) {
    model[i] = new Seg(0, 0, i);
  }

  // label first and last segment
  textAlign(RIGHT); text("terminal", 600, seg_y+seg_h);
  textAlign(LEFT); text("hillock", 0, seg_y+seg_h);

  // add output plots
  vg = vegaEmbed('#view', "neuron.vl.json", {'actions': false})
           .catch(console.warn);

  // cw = new Net(100, domains).init('#cobweb', d3.values(par));
  /* d3.select("#cobweb")
    .selectAll("rect")
    .data(d3.entries(par))
    .enter()
        .append("rect")
        .attr('x', (d) => d[1]*10).attr('y', (d) => d[1]*10)
        .attr('width', 10).attr('height', 10); */
}

function draw() {
  if (running) {
    update();
      
    let seg_w = (width - 100)/nSegs;
    for (i = 0; i < nSegs; ++i) {
      model[i].draw(50 + i*seg_w, seg_y, seg_w, seg_h);
    }

    let n = nSegs-1;
    // ASSERT frameCount consistent with update state
    let munge = (a, s) => ({"voltage": a.v, "inactivation": a.w,
                                "position": s, 't': frameCount})

    // "transform": {"fold": ["inactivation", "voltage"]}
        // no vega-lite support. duping layers instead.
    // TODO: label 'action potential', 'refractory period' if spike train is slow

    let cs = vega.changeset()
                 .insert([munge(model[0], "hillock"),
                          munge(model[n], "terminal")])
                 .remove(function (u) { return u.t < -325 + frameCount; });

    vg.then((res) =>
        res.view.change('trace', cs).run());
  }
}

/* class Net { // FIXME
    // logscale bicones for n parameters (in 2n sectors)
    constructor (r, domains) {
        // domains: list of {min, max, isLog}
        this.r = r;
        this.scales = domains.map(
            (u) => u.isLog ?
            d3.scaleLog().domain([u.min, u.max]).range([-r, r]) :
            d3.scaleLinear().domain([u.min, um.max]).range([-r, r])
        );
        this.n = domains.length;
        this.th = this.n / PI;
    }

    // use cobweb to input 'values'
    init(handle, values) {
        // params.init("#cobweb", [[value, idx]])
        let rs = this.scales;

        let gen = d3.areaRadial()
                    .startAngle((d) => d.idx * this.th)
                    .endAngle((d) => (d.idx+1) * this.th)
                    .radius((d) => rs[d.idx](d.value));

        d3.select(handle)
            .attr('transform', 'translate(100 50)')
            .selectAll('path')
            .data(values) // TODO: labels
            .enter()
                .append('path')
                .attr('d', (d) => gen(d))
                .on('mouseover', rework);

        function rework(d) {
            console.log(d3.mouse(this));

            d3.select(this)
                .attr('r', (d) => {
                        let dx = d3.mouse[0], dy = d3.mouse[1],
                            dr = sqrt(dx*dx + dy*dy);
                        d.r = dr > 0 ? min(dr, this.r) : max(dr, -this.r);
                        d.value = rs[d.idx].invert(d.r);
                    })
            .attr('fill', (d) => d.r > 0 ? 'cyan' : 'red')
        };
        return this;
    }
} */
