class Landmark {
  /*
  final static int // type constants
    SURFACE = 0, UNDERGROUND = 1, MOUNTAIN = 2, LAKE = 3, PILLARS = 4,
    MESA = 5, DUNES = 6, PLAINS = 7, FLATS = 8, VALLEY = 9, DEFAULT = 10;
    */
  final static int // descriptor constants
    PLACE = 00, CITADEL = 01, STAR = 02;/*, CITY = 01, TOWN = 02, VILLAGE = 03,
    BINARY = 10, PLAIN = 11, FOREBODING = 12, DISMAL = 13,
    FREEZING = 20, SCORCHING = 21, WINDSWEPT = 22, TRAVELLED = 23;
    */
  float x, y;
  int day;
  String descriptor, type;
  
  void plot(PGraphics buffer){
    if (width/2 - x < 100) { buffer.textAlign(RIGHT); } // [don't let labels escape!]
    else { buffer.textAlign(LEFT); }
    
    buffer.text(descriptor + " " + type, x, y);
  }
  
// constructors
  Landmark(float _x, float _y, int _day) {
    x = _x;
    y = _y;
    day = _day;
  }
  
// I must learn to make config files, not to assign strings via hardcode
  Landmark(int typecode, float _x, float _y, int _day){
    this(_x, _y, _day);
    
    if (typecode == PLACE){
      generatePlace();
    }
    else if (typecode == CITADEL){
      descriptor = "citadel"; 
      if (random(1) < .9)
        type = "(surface)";
      else
        type = "(underground)";
    }
    else if (typecode == STAR){
      descriptor = new String( new char[]{(char)
                                ('a' + (int)random(26))} );
      if (random(1) < .5)
        type = "major";
      else
        type = "nimor";
    }
    else {
      descriptor = "nondescript";
      type = "locale";
    }
  }
    
  void generatePlace(){
    int typeRoll = (int)random(10);
    float descRoll = random(1);
    
    switch (typeRoll){
      // 20% civilization: up-city .|. down-city '|'
      case 0: type = "(surface)"; break;
      case 1: type = "(underground)"; break;
        
      // 30% landmark: mountain /\. lake ._. pillars |||
      case 2: type = "mountain"; break;
      case 3: type = "lake"; break;
      case 4: type = "pillars"; break;
        
      // 50% terrain-type:  mesa, dunes, plains, flats, valley
      case 5: type = "mesa"; break;
      case 6: type = "dunes"; break;
      case 7: type = "plains"; break;
      case 8: type = "flats"; break;
      case 9: type = "valley"; break;
      default: type = "locale";
    }
    
    if (type.equals("(surface)") || type.equals("(underground)")){
      // 50% village, 40% town, 10% city, 0% citadel
        // (ribbons always begin at citadel)
      if (descRoll < .5)
        descriptor = "village";
      else if (descRoll < .9)
        descriptor = "town";
      else
        descriptor = "city";
    }
    else if (type.equals("mountain") || type.equals("lake")
                                      || type.equals("pillars")){
      // 25% dismal, 25% foreboding, 25% plain, 25% binary
      if (descRoll < .25)
        descriptor = "dismal";
      else if (descRoll < .5)
        descriptor = "foreboding";
      else if (descRoll < .75)
        descriptor = "plain";
      else
        descriptor = "binary";
    }
    else if ( type.equals("mesa") || type.equals("dunes")
              || type.equals("plains") || type.equals("flats")
              || type.equals("valley") ){
      // 50% travelled, 30% windswept, 10% scorching, 10% freezing
      if (descRoll < .5)
        descriptor = "travelled";
      else if (descRoll < .8)
        descriptor = "windswept";
      else if (descRoll < .9)
        descriptor = "scorching";
      else
        descriptor = "freezing";
    }
    else
      descriptor = "nondescript";
  }
}