
let gridSize =10;      
                        
let ignoreThresh = 6;  

let flow;               
let previousPixels;     
let video;


function setup() {
  createCanvas(640, 480); 
  video = createCapture(VIDEO);
  video.hide();
  flow = new FlowCalculator(gridSize);
  
}


function draw() {

  video.loadPixels();
  fill("rgb(25, 25, 100)")
  
  if (video.pixels.length > 0) {

    if (previousPixels) {
      if (same(previousPixels, video.pixels, 4, width)) {
        return;
      }
      flow.calculate(previousPixels, video.pixels, video.width,video.height);
    }

    image(video, 0,0);
    rect(0,0,640,480)
    fill("rgb(162, 0, 0)")

    
    if (flow.zones) {
      for (let zone of flow.zones) {
       
        if (zone.mag < ignoreThresh) {
          continue;
        }
         
        
        push();
        translate(zone.pos.x, zone.pos.y);
        
        strokeWeight(2);
        stroke(255);
        color("rgb(255, 0, 0)")
        circle(0,0, zone.mag);
        color("rgb(255, 255, 0)")
        circle(0,0, zone.mag-10)
       
        pop();
      }
    }
  

    
    previousPixels = copyImage(video.pixels, previousPixels);
  }
}
