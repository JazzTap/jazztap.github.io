class Star {
  float x, y, rise, rotation;
  float[] radii;
  int points, maxRadius;

  Star(float _x, float _y, float _rise, int _points, int _radius) {
    x = _x;
    y = _y + _rise;
    rise = _rise;
    points = _points;
    
    maxRadius = _radius;
    radii = new float[points];
    for (int i = 0; i < radii.length; i++)
      radii[i] = random(maxRadius);
    rotation = random(TWO_PI/points);
  }

  void plot(PGraphics buffer) {
    float currX, currY;
    float theta = rotation;
    
    // println("drawing star @ " + x + ", " + y);
    for (float r : radii){
      currX = x + r * cos(theta);
      currY = y + r * sin(theta);
      
      buffer.line(currX, currY, x, y);
      buffer.ellipse(currX, currY, r/20, r/20);
      theta += TWO_PI/points;
        // rotate 1/(points) of the way around centerpoint
    }
  }
}