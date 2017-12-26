// Yasia explores the shifting lands.

/* TODO: place landmark labels more cleverly
          add control pane (framerate/speed/full-reset)
          give each session its own folder of maps
          save stars & landmarks with maps?
          adapt for Android
*/
// forked 3/14/16

Ribbon[] rbns;
int numRbns, rbnsLeft, currDay,
                  touchStarted;
ArrayList<Star> stars;
ArrayList<Landmark> landmarks;
boolean dayOver;

PGraphics buffer, notes; // only these buffers are drawn to in real-time
ArrayList<PImage> prevBuffer;
PImage backGradient;

void setup(){
  size(800, 600);
  // size(displayWidth, displayHeight);
  // Uncomment the following two lines to see the available fonts 
    // String[] fontList = PFont.list();
    // println(fontList);
  colorMode(HSB);
  frameRate(10);
  
  // layer containing current ribbons
  buffer = prepCanvas();
  rbns = new Ribbon[30];
  numRbns = 0;
  rbnsLeft = rbns.length;
  
  // layers containing static content
  prevBuffer = new ArrayList<PImage>();
  backGradient = getGradient(color(0, 64), color(0, 255, 86, 64));
  
  // layer for dynamic content that's not ribbons
  notes = prepCanvas();
  stars = new ArrayList<Star>();
  landmarks = new ArrayList<Landmark>();
    notes.textAlign(LEFT, CENTER);
    notes.textFont(loadFont("DilleniaUPC-16.vlw"));
    // notes.textFont(loadFont("Calibri-12.vlw"));
    // notes.textFont(createFont("SansSerif", 12));
  
  // user interface layer
  textAlign(RIGHT, BOTTOM);
  textFont(loadFont("DilleniaUPCBold-28.vlw"));
  // textFont(createFont("MonospacedBold", 28));
  
  // temporal context
  currDay = 0;
  dayOver = false;
}

// Background generation
PGraphics prepCanvas(){
  PGraphics canvas = createGraphics(width, height);
  canvas.beginDraw();
  canvas.colorMode(HSB); // colorMode must match the main canvas'
                        // to be drawn properly via image(), I think
  canvas.endDraw();
  return canvas;
}
  
// adapted from: processing.org/learning/basics/lineargradient.html
PGraphics getGradient (color startColor, color endColor){
  PGraphics canvas = createGraphics(width, height);
  canvas.beginDraw();
  canvas.colorMode(HSB);
  canvas.noFill();
  
  // draw each pixel-high row in the appropriate color
  for (int i = 0; i <= canvas.height; i++) {
    float inter = (float)i / canvas.height;
    color c = lerpColor(startColor, endColor, inter);
    canvas.stroke(c);
    canvas.line(0, i, canvas.width, i);
  } 
  canvas.endDraw();
  return canvas;
}

void draw(){
// draw background
  background(backGradient);
  
  // mask each iteration of prevBuffer
  for (PImage u : prevBuffer){
    image(u, 0, 0);
    image(backGradient, 0, 0);
      // with a semitransparent copy of the background...
  }
  fill(128, 128, 128, 223 * (float)rbnsLeft / rbns.length);
  rect(0, 0, width, height);
    // and with teal that fades as the day progresses.
  
// draw ribbons
  buffer.beginDraw();
  buffer.background(0, 0); // empty out the buffer
  buffer.translate(width/2, height/2);
  
  // simulate, then draw each ribbon into the buffer
  for (int i = 0; i < numRbns; i++){
    rbns[i].grow(mouseX, mouseY, width, height);
    
    buffer.stroke((currDay*32)%128 + 128, 32, (float)i/numRbns * 255);
    buffer.strokeWeight(random(1)+2);
    rbns[i].plot(buffer);
    
    // iterative alternative
    // rbns[i].plotSegment(buffer);
  }
  buffer.endDraw();
  image(buffer, 0, 0);
  
// draw other content
  notes.beginDraw();
  notes.background(0, 0);
  notes.translate(width/2, height/2);
  
  // draw stars
  notes.stroke(128, 128, 128);
  notes.strokeWeight(.25);
  for (Star u : stars){
    notes.line(u.x, u.y, u.x, u.y - u.rise);
    notes.fill(128, 128 * (float)rbnsLeft / rbns.length, 196);
      // TODO: change color based on size of star
    u.plot(notes);
  }
  // draw landmarks
  for (Landmark u : landmarks){
    if (u.day == currDay)
      notes.fill(255);
    else
      notes.fill(0);
    u.plot(notes);
  }
  notes.endDraw();
  image(notes, 0, 0);
  
// draw user interface straight onto canvas
  for (int i = 0; i < numRbns; i++){
    // draw each ribbon's respective segment of progress bar
    fill(255 / (rbnsLeft+3));
    stroke((float)i/numRbns * 255);
    rect((float)(i-1)/(rbns.length-1) * width, 0,
            (float)width/(rbns.length-1), 10);
  }
  
  // draw important directives
  fill(255 / (rbnsLeft+1));
  if (dayOver)
    text("day over [right click to reset] ", width, height);
  else if (rbnsLeft < 5)
    text("day ending in " + (rbnsLeft+1) + "... ", width, height);
  else if (numRbns == 0)
    text("LMB to start", width/2, height/2);
}

// phase-change
void reset(){
  rbns = new Ribbon[30]; // toss out our references to existing ribbons,
                            // and hope the garbage collector catches them
  // update the various counters
  numRbns = 0;
  rbnsLeft = rbns.length;
  dayOver = false;
  currDay++;
  
  // get a fresh draw-buffer, too
  prevBuffer.add(buffer);
  buffer = prepCanvas();
}

// ribbon handler
void addRibbon(){
  // if we've reached max ribbons
  if (rbnsLeft == 0){
    dayOver = true;
  }
  else {
    // first ribbon always starts at (0, 0)
    if (numRbns == 0){
      landmarks.add(new Landmark(Landmark.CITADEL, 0, 0, currDay));
      rbns[numRbns] = new Ribbon(random(2*PI), 50, 15, 0, 0);
    }
    else {
      landmarks.add(new Landmark(Landmark.PLACE, rbns[numRbns-1].endX[0],
                                                  rbns[numRbns-1].endY[0], currDay));
      rbns[numRbns] = new Ribbon(random(2*PI, 50), 50, 15,
                                  rbns[numRbns-1].endX,
                                  rbns[numRbns-1].endY);
      // diagnose ribbons' starting location
      // println("(" + rbns[numRbns-1].endX[0] + ", " + rbns[numRbns-1].endY[0] + ")");
    }
    numRbns++;
    rbnsLeft--;
  }
}

// star & landmark handlers
void addStar(){
  if (random(1) < .75){
    // 75% chance per click of adding a star
      // somewhere near the current ribbon's endpoint
    float spawnX = rbns[numRbns-1].endX[0];
    float spawnY = rbns[numRbns-1].endY[0];
    stars.add(new Star(spawnX, spawnY,
                        random(height/2 - spawnY) - height/4,
                        (int)random(6) + 1, (int)random(5)*30)); 
  }
  else
    // 25% chance of removing a random star
    if (stars.size() > 0){
      int i = (int) random(stars.size());
      // stars.get(i).implode();
      stars.remove(i);
    }
}

// Input handlers

void mousePressed(){
  if (mouseButton == LEFT){
    addRibbon();
    addStar();
  }
  else if (mouseButton == RIGHT){ // TODO: switch to longtap
    if (!keyPressed)
      buffer.save("roads_" + currDay + ".png"); // save map
    reset(); 
  }
  else if (mouseButton == CENTER){ // TODO: switch to multi-tap
    for (int i = 0; i < numRbns; i++)
      rbns[i].revive();
    // rbnsLeft--;
  }
}

/* public boolean surfaceTouchEvent(MotionEvent event) {
  if (event.getActionMasked() == MotionEvent.ACTION_DOWN){
    touchStarted = millis();
  }
  else if (event.getActionMasked() == MotionEvent.ACTION_UP){
    // upon regular-tap
    if (millis() - touchStarted <= 1500){
      addRibbon();
      addStar();
    }
    // upon long-tap
    else {
      // buffer.save("roads_" + currDay + ".png"); // save map
      reset(); 
    }
  }
  // upon multi-tap
  else if (event.getActionMasked() == MotionEvent.ACTION_POINTER_UP &&
        event.getActionIndex() == 1){
    for (int i = 0; i < numRbns; i++)
      rbns[i].revive();
    // rbnsLeft--;
  }
    // Processing tutorial says:
    // if you want the variables for motionX/motionY, mouseX/mouseY etc.
    // to work properly, you'll need to call super.surfaceTouchEvent().
    return super.surfaceTouchEvent(event);
} */