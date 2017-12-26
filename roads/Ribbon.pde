class Ribbon {
  // static float PI = (float)Math.PI;
  
  int[] endX, endY; // ribbon's current coordinates
  ArrayList<Integer>[] x, y; // record of the ribbon's coordinates
  
  int length, lifePoints; // number of coordinate-pairs stored,
                            // number of growths left
  float approxHeading;
  int maxSpeed, maxBreadth;
  
// CONSTRUCTORS
  private void setup(float _heading, int _speed, int _breadth){
    endX = new int[2];
    endY = new int[2];
    
    x = new ArrayList[2];
    y = new ArrayList[2];
    
    approxHeading = _heading;
    maxSpeed = _speed;
    maxBreadth = _breadth;
    
    lifePoints = 10 + (int)random(10);
    length = 1; // expecting one entry to be placed in x/y vectors by calling constructor
  }
  
  Ribbon(float _heading, int _speed, int _breadth, int _x, int _y){
    setup(_heading, _speed, _breadth);
    
    // initialize the various coordinate pairs
    for (int i = 0; i < 2; i++){
      x[i] = new ArrayList();
        x[i].add(_x);
        endX[i] = _x;
        
      y[i] = new ArrayList();
        y[i].add(_y + i*variance(maxBreadth));
        endY[i] = _y;
    } 
  }
  
  Ribbon(float _heading, int _speed, int _breadth, int[] _x, int[] _y){
    setup(_heading, _speed, _breadth);
    
    // initialize the various coordinate pairs
    for (int i = 0; i < 2; i++){
      x[i] = new ArrayList();
        x[i].add(_x[i]);
        endX[i] = _x[i];
        
      y[i] = new ArrayList();
        y[i].add(_y[i]);
        endY[i] = _y[i];
    } 
  }

// CONTENT MANIPULATION
  void grow(int mouseX, int mouseY, int width, int height){
    if (lifePoints == 0){
      // generateLandmark();
      lifePoints--;
    }
    else if (lifePoints > 0){
      float diceroll = random(1);
      
      // calculate heading 
      // println(.5 * atan2(mouseY - endY[0], mouseX - endX[0]));
        // console debug statements don't work w/o Processing wrapper
      if (diceroll < .05){   // 5% of the time, turn about 90 degrees right
        approxHeading += PI/2 + variance(PI/6); 
        // println("turning right");
      }
      else if (diceroll < .1){   // 5% of the time, turn about 90 degrees left
        approxHeading -= PI/2 + variance(PI/6);
        // println("turning left");
      }
      else /*if (diceroll >= .9)*/{
        approxHeading = (float)(.5 * approxHeading +
                                .5 * Math.atan2(mouseY - height/2, mouseX - width/2));
        // 10% of the time, aim roughly towards the mouse
        // println("adjusted heading: " + approxHeading);
      }
      // usually, the ribbons just keep going in the same direction
      
      // calculate speed
      float currSpeed = random(maxSpeed);
      int deltaX = (int)(currSpeed * Math.cos(approxHeading));
      int deltaY = (int)(currSpeed * Math.sin(approxHeading));
      
      // add new point; avoid going out of bounds
      if (Math.abs(endX[0] + deltaX) <= width/2)   
        endX[0] += deltaX;
      else{
        endX[0] -= deltaX; 
        // println("turning back");
      }
      if (Math.abs(endY[0] + deltaY) <= height/2)
        endY[0] += deltaY;
      else{
        endY[0] -= deltaY;
        // println("turning back");
      }
      // form parallel edge to primary line
      endX[1] = endX[0] + variance(maxBreadth);
      endY[1] = endY[0] + variance(maxBreadth);
      
      // update vectors
      for (int i = 0; i < 2; i++) {
        x[i].add(endX[i]);
        y[i].add(endY[i]);
      }
      length++;
      lifePoints--;
    }
  }  
  void revive(){
    lifePoints += (int)random(10) + 1;
  }
  float variance(float range){
     return random(1) * range - range/2;
  }
  int variance(int range){
     return (int)random(range + 1) - range/2; 
  }
  
// UTILITY
  // currently unused?
  void clear(){
    for (int i = 0; i < 2; i++){ // on both edges of the ribbon
    
      endX[i] = (Integer)(x[i].get(0));
      x[i].clear();              // clear out everything, including endX
      x[i].add(endX[i]);              // but restore initial value
      
      endY[i] = (Integer)(y[i].get(0));
      y[i].clear();              // repeat
      y[i].add(endY[i]);
    }
    length = 1; // reset length
  }
// DISPLAY
  void plot(PGraphics buffer){
    for (int i = 0; i < 2; i++) // for each edge
      for (int j = 0; j < length - 1; j++){ // and each point
        buffer.line((x[i].get(j)), (y[i].get(j)),
                      (x[i].get(j+1)), (y[i].get(j+1)));
                // draw a line to the next point in the ribbon
      }
    if (lifePoints < 0){
      // display endpoint
      buffer.ellipseMode(PGraphics.CORNERS);
      buffer.fill(0);
      buffer.ellipse(endX[0], endY[0], endX[1], endY[1]);
    }
  }
  
  void plotSegment(PGraphics buffer){
    if (lifePoints >= 0)
      for (int i = 0; i < 2; i++)
        buffer.line(((Integer)(x[i].get(length-2))).floatValue(),
                      ((Integer)(y[i].get(length-2))).floatValue(),
                      ((Integer)(x[i].get(length-1))).floatValue(),
                      ((Integer)(y[i].get(length-1))).floatValue());
    else{
      // aaah duplicate code
      buffer.ellipseMode(PGraphics.CORNERS);
      buffer.fill(0);
      buffer.ellipse(endX[0], endY[0], endX[1], endY[1]);
    }
  }
}