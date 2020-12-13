var bg, invClimber;
var tower, door, climber, climberGroup;
var bgImage, doorImage, climberImage;
var ghost,ghostImage1,ghostImage2;
var doorGroup, sound;
var gameState = "play";
function preload(){
  
  bgImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage1 = loadImage("ghost-jumping.png");
  ghostImage2 = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");
  
  
  
}

function setup() {
  
  createCanvas(600,600);

  
  
  // create background
  bg = createSprite(300,300);
  bg.addImage(bgImage);
  bg.velocityY = 2;
  
  
  
  // to create ghost
  ghost = createSprite(200,200,50,50);
  
  ghost.addImage(ghostImage1);
  ghost.scale = 0.3;
  
  
    // to create groups
  doorGroup = new Group();
  climberGroup = new Group();
  invClimber = new Group();
 
}


function draw() {
  
  background("black")
  
   
   
  
   if(gameState === "play") {
     
     sound.play();
     // to create infinite background
    if (bg.y>400 ) {
      bg.y= 300;
      }
  
  // to make the ghost move when keys are pressed
  
  if (keyDown("space")) {
    ghost.velocityY = -7;
 
  }  
  // to give the ghost gravity
  ghost.velocityY = ghost.velocityY + 0.7;
  
  if (keyDown("right_arrow")) {
    ghost.x= ghost.x + 3;
    ghost.y= ghost.y + 0;
  }  
  
  if (keyDown("left_arrow")) {
    ghost.x= ghost.x -3;
    ghost.y= ghost.x - 0;
  }  
  
  if(climberGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  
  
  invClimber.debug = "true"
     
     
  // to call a  functions
  spawnDoor();
  
  if(invClimber.isTouching(ghost) || ghost.y > 600) {
    gameState = "end";
    ghost.destroy();
  }
 
 
  
  drawSprites();
  
   }
  
  if(gameState === "end") {
    textSize(30);
     stroke("red");
    fill("light blue");
    text("Game Over", 300,300);
   
    
    
  }
  
   
}

function spawnDoor() {
   
  // to create the doors
  if (frameCount % 240 === 0 ) {
    door = createSprite(200,-50);
    climber = createSprite(200,10);
    invClimber = createSprite(200,15);
    invClimber.width = climber.width;
   invClimber.height = 2;
    
    door.addImage(doorImage);
    climber.addImage(climberImage);
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invClimber.x = door.x;
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invClimber.velocityY = 1;
    
    door.lifetime= 700;
    climber.lifetime = 700;
    invClimber.lifetime = climber.lifetime;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    
    ghost.depth = ghost.depth;
     ghost.depth = ghost.depth +1  ;
    
 
 
  
  
  
    
  }
}