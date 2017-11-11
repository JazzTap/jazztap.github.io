// JTO 12/12/14
// forked 12/12/14 

// import org.gwoptics.graphics.graph2D.*;
// import org.gwoptics.graphics.graph2D.traces.*;

// FIXME: port to Javascript graphing library

int NUM_SEGS = 20;
Seg[] model = new Seg[NUM_SEGS];

double inputMag = .75;
boolean running = true;

// TODO: separate ion species & externally applied voltage?
void setup() {
  size(600, 200);
  colorMode(HSB);

  // create model segments  
  model[0] = new Seg(inputMag, 0);
  for (int i = 1; i < NUM_SEGS; ++i) {
    model[i] = new Seg(0, 0);
  }
  
  stroke(0);
  strokeWeight(2);
}

void draw() {
  if (running) {
    update();
  }
    
  // output
  background(196);
  
  int segWidth = (width - 100)/NUM_SEGS;
  for (int i = 0; i < NUM_SEGS; ++i) {
    model[i].draw(50 + i*segWidth, 50, segWidth);
  }
}

void update() {
    double[] diffLtR = new double[NUM_SEGS - 1];
    
    // update individual segments
    for (int i = 0; i < NUM_SEGS; ++i) {
      model[i].update();
    }
    
    // (crudely) compute charge-carrier gradients
    for (int i = 0; i < NUM_SEGS - 1; ++i) {
      diffLtR[i] = model[i].excitation - model[i+1].excitation;
    }
    
    // perform diffusion
    for (int i = 0; i < NUM_SEGS; ++i) {
      if (i < NUM_SEGS - 1)
        model[i].excitation += .3 * -diffLtR[i];
      if (i > 0)
        model[i].excitation += .3 * diffLtR[i-1];
      
      // model[i].report();
    }
    // println();
}

void keyPressed() {
  if (key == ' ') {
    if (!running) {
      update();
      // TODO: mark graphs with discontinuity
    }
  }
  else if (key == 'p') {
    running = !running;
  }
  else if (key == RETURN || key == ENTER)
    model[0].excitation = inputMag;
}

static double a = .1,  // excitation threshold
              b = 5,  // recovery falloff rate
              eps = .005;
class Seg {
  double excitation, // 0 = equilibrium potential
          recovery;
  
  Seg (double ex, double rec) {
    excitation = ex;
    recovery = rec;
  }
  
  void update() {
    excitation += excitation * (excitation - a) * (1 - excitation) - recovery;
    recovery += eps * (excitation - b * recovery);
  }
  
  void report() {
    println("v = " + excitation + ", w = " + recovery);
  }
  
  void draw(int xLoc, int yLoc, int pxWidth) {
    int hue;
    if (excitation > 0) hue = 128;
    else hue = 0;
    
    fill(hue, abs((float)excitation * 255), 255);
    stroke(0, 0, (int)(recovery * 2550));
    rect(xLoc, yLoc, pxWidth, 100);
  }
}
