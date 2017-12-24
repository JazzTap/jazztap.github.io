// 2014 code. chart animation disabled in 2017, although most egregious faff remains. don't use chart.js! it was good at the time.

window.onload = init;

// dependent on DOM
var alleleChart, popChart = [], diffChart = [],
    quarterPop, offspringPer, migrantPairs;

function numMatingPairs() {
  return Math.floor(4 * quarterPop / offspringPer);
}

// constants
var UNINIT = "object not yet initialized";

// dependent on selected options
var sim = UNINIT;

function init() {
  var chartCtx = document.getElementById("alleleChart").getContext("2d");
  // style chart and load dummy data
  alleleChart = new Chart(chartCtx).Line({
    labels: ["-", "-"],
    datasets: [
      { 
        data: [.5, .5],
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)"
      },
      { 
        data: [.5, .5],
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)"
      }
    ],
    }, {
      animation: false,
      bezierCurve: false,
      scaleOverride: true,

      scaleSteps: 10,
      scaleStepWidth: .1,
      scaleStartValue: 0
    });

  for (i = 0; i < 2; ++i) {
    chartCtx = document.getElementById("popDiff" + i).getContext("2d");
    diffChart[i] = new Chart(chartCtx).Line({
      labels: ["-", "-"],
      datasets: [
        { label: "AA",
          data: [0, 0],
          strokeColor: "rgba(196, 0, 0, .5)" },
        { label: "Aa",
          data: [0, 0],
          strokeColor: "rgba(196, 0, 196, .5)" },
        { label: "aa",
          data: [0, 0],
          strokeColor: "rgba(0, 0, 196, .5)" }
      ]
    }, {
      datasetFill: false,
      animation: false
    });

    chartCtx = document.getElementById("popChart" + i).getContext("2d");
    popChart[i] = new Chart(chartCtx).Line({
      labels: ["-", "-"],
      datasets: [
        { label: "AA",
          data: [250, 250],
          strokeColor: "rgba(196, 0, 0, .5)" },
        { label: "Aa",
          data: [500, 500],
          strokeColor: "rgba(196, 0, 196, .5)" },
        { label: "aa",
          data: [250, 250],
          strokeColor: "rgba(0, 0, 196, .5)" }
      ]
    }, {
      datasetFill: false,
      animation: false
    });
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Window.location
  function loadPageVar (sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
  
  // TODO: fix default indexes to something other than 0
  var sel = document.getElementById("initAA");
  sel.selectedIndex = loadPageVar("AA");

  sel = document.getElementById("offspring");
  sel.selectedIndex = loadPageVar("off");

  sel = document.getElementById("migrating");
  sel.selectedIndex = loadPageVar("mig");

  updateRunOps(true);
}

function updateRunOps(fromRefresh) {
  var sel = document.getElementById("initAA");
  quarterPop = +(sel.options[sel.selectedIndex].value);
  document.getElementById("initAa").innerHTML = 2 * quarterPop;
  document.getElementById("initaa").innerHTML = quarterPop;

  sel = document.getElementById("offspring");
  offspringPer = +(sel.options[sel.selectedIndex].value);
  document.getElementById("mating").innerHTML = numMatingPairs();

  sel = document.getElementById("migrating");
  migrantPairs = +(sel.options[sel.selectedIndex].value);

  if (!fromRefresh)
    saveRunOptions();
}

function saveRunOptions() {
    var search = "?AA=" + document.getElementById("initAA").selectedIndex + "&" +
              "off=" + document.getElementById("offspring").selectedIndex + "&" +
              "mig=" + document.getElementById("migrating").selectedIndex;
    window.location.replace(window.location.pathname + search);
}

function writeIterate() {
  if (sim === UNINIT) {
    sim = new SimObj(quarterPop, offspringPer, migrantPairs);
    document.getElementById("initAA").disabled = true;
    document.getElementById("offspring").disabled = true;
    document.getElementById("migrating").disabled = true;

    // TODO: eliminate dummy data, and hence, this correction to it
    for (i = 0; i < 2; ++i)
      for (j = 0; j < 3; ++j)
        for (k = 0; k < 2; ++k) {
          popChart[i].datasets[j].points[k].value = quarterPop;
          if (j == 1)
            popChart[i].datasets[j].points[k].value *= 2;
        }

    update();
//    alleleChart.removeData(); // clear dummy data
  }
  // else {
    // http://stackoverflow.com/questions/1121992/selecting-value-of-select-tag-in-javascript-problem
    var sel = document.getElementById("iterTimes");
    var n = sel.options[sel.selectedIndex].value;

    var i = 0;
    var allelesLeft = function() {
      var p0 = sim.getPop(0).p();
      var p1 = sim.getPop(1).p();
      var ret = [];
      if (p0 != 0 || p1 != 0) ret.push("a");
      if (p0 != 1 || p1 != 1) ret.push("A");
      return ret;
    }
    while(i < n && allelesLeft().length > 1) {
      sim.iterate();
      ++i;
    }
    update();

    // FIXME: make horizontal scale linear
  // }
};

function update() {
  function toPercent(value) {
    return (value * 100).toFixed(3) + "%";
  }
  function sumAbs(arr) {
    var ret = 0;
    for (j = 0; j < arr.length; ++j)
      ret += Math.abs(arr[j]);
    return ret;
  }
  function averageAbs(arr) {
    return sumAbs(arr) / arr.length;
  }
  function last(arr) {
    return arr[arr.length - 1]
  }

  var pop = [sim.getPop(0), sim.getPop(1)];
  for (i = 0; i < 2; ++i) {
    var p = pop[i].p();

    var str0 = "p = " + p.toFixed(3) + ", q = " + (1 - p).toFixed(3) + "<br>" +
                pop[i].toString() + "<br>";
    var str1 = "avg abs change in p per generation = " + toPercent(averageAbs(pop[i].deltaP))
    var str2 = " (last delta p / gen: " + toPercent(last(pop[i].deltaP)) + ")";

    var el = document.getElementById("results" + i);
    el.innerHTML = str0 + str1 + str2;
    if (i == 0)
      el.style.color = "rgb(170,170,170)";
    else
      el.style.color = "rgb(151,187,205)";
  }

  function hardyWeinEq(p, popSize) {
    var q = 1 - p;
    return {
      homDom: p*p * popSize,
      het: 2*p*q * popSize,
      homRec: q*q * popSize
    };
  }

  // graph allele proportions for both populations
  alleleChart.addData([pop[0].p(), pop[1].p()], sim.getGen());

  // graph populations relative to hardy-weinberg equilibrium for each population
  for (j = 0; j < 2; ++j) {
    var base = hardyWeinEq(pop[j].p(), pop[j].numIndivs());
    diffChart[j].addData([pop[j].homDom - base.homDom,
       pop[j].het - base.het, pop[j].homRec - base.homRec], sim.getGen());

    // also graph raw populations
    popChart[j].addData([pop[j].homDom, pop[j].het, pop[j].homRec], sim.getGen());
  }
};

// error codes
var FAIL_DRAW = "ran out of individuals",
    FAIL_RNG = "the RNG has not been calibrated properly",
    FAIL_MEIOSIS = "invalid parental genotype";

function Pop(numAA, numAa, numaa) {
  this.homDom = +numAA;
  this.het = +numAa;
  this.homRec = +numaa;

  this.deltaP = [];

  this.numIndivs = function() {
    // it is of vital importance that these variables be ints, not strings
    return this.homDom + this.het + this.homRec;
  };

  this.p = function() {
    // calculates the frequency of the dominant allele
    var numDomAl = 2*this.homDom + this.het;
    return numDomAl / (2 * this.numIndivs());
  };

  this.toString = function() {
    return this.homDom + " AA : " + this.het + " Aa : " + this.homRec + " aa";
  };

  // mutating functions
  /* this.recordDeltaP = function(deltaP) {
    // at generation -1, we have no records; at generation 1, we have one; and so on.
    this.avgDeltaP *= (this.gen + 1);
    this.avgDeltaP += deltaP;
    this.avgDeltaP /= (this.gen + 2);

    if (this.avgDeltaP != 0)
      this.lastNonzeroAvgDeltaP = this.avgDeltaP;
    ++this.gen;
  }; */

  this.drawIndiv = function() {
    var n = this.numIndivs();
    if (n === 0)
      return FAIL_DRAW;
      
    var pick = Math.floor(Math.random() * n);
    // console.log(n + ", " + pick);

    if (pick < this.homDom) {
      this.homDom -= 1;
      return "AA";
    }
    else if (pick < this.homDom + this.het) {
      this.het -= 1;
      return "Aa"; // both "Aa" and "aA" represent a heterozygote.
    }
    else if (pick < this.homDom + this.het + this.homRec) {
      this.homRec -= 1;
      return "aa";
    }
    else return FAIL_RNG;
  };

  this.addIndiv = function(indiv) {
    if (indiv === "AA")
      this.homDom += 1;
    else if (indiv === "Aa" || indiv === "aA")
      this.het += 1;
    else if (indiv === "aa")
      this.homRec += 1;
    else
      console.log("Pop.addIndiv: unrecognized genotype '" + indiv + "'")
  };

//  console.log("Pop initialized: " + this.toString());
}

function SimObj(qp, op, mp) {
  // http://stackoverflow.com/questions/8161671/javascript-creating-a-function-with-state
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

  // TODO: fix argument names
  var quarterPop = qp, offspringPer = op, migrantPairs = mp;
  var matingPairs = numMatingPairs();
    // preferably, offspringPer divides 4*quarterPop in the first place.

  // state
  var pop = [];
  var gen = 0;

  // constructor
  // allele frequency is initially p = .5
  for (i = 0; i < 2; ++i) {
    pop.push(new Pop(quarterPop, 2*quarterPop, quarterPop));
  }
  
  // non-mutating functions  
  var contributeAllele = function(genotype) {
    if (genotype === "AA") return "A";
    else if (genotype === "Aa" || genotype === "aA") {
      var coinflip = Math.floor(Math.random() * 2);

      if (coinflip === 0) return "A";
      else if (coinflip === 1) return "a";
      else return FAIL_RNG;
    }
    else if (genotype === "aa") return "a";
    else return FAIL_MEIOSIS;
  };
  
  // public functions
  return {
    iterate: function() {
      // for each population
      for (i = 0; i < 2; ++i) {
        var offspring = new Pop(0, 0, 0);
        var prevP = pop[i].p();

        // pull each mating pair from the population
        for (j = 0; j < matingPairs; ++j) {
          var p0 = pop[i].drawIndiv();
          var p1 = pop[i].drawIndiv();
          
          // generate their offspring
          for (k = 0; k < offspringPer; ++k) {
            var a0 = contributeAllele(p0);
            var a1 = contributeAllele(p1);

            var ret = a0 + a1;
            if (ret === "aA") ret = "Aa"
            offspring.addIndiv(ret);
          }
        }
        // everyone in the parental generation dies, so their offspring now comprise the entire population.
        offspring.deltaP = pop[i].deltaP;
        pop[i] = offspring;
        pop[i].deltaP.push(pop[i].p() - prevP);
      }
      ++gen;

      // perform migration
      for (l = 0; l < migrantPairs; ++l) {
        var a = pop[0].drawIndiv();
        var b = pop[1].drawIndiv();

        pop[0].addIndiv(b);
        pop[1].addIndiv(a);
      }
    },

    getPop: function(idx) {
      return pop[idx];
    },
    getGen: function() {
      return gen;
    }
  };
};
