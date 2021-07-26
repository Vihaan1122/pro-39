var spaceship,sImage;
var space, spaceImage;
var enemy, eGroup, eImage;
var laser, lImage, lGroup;
var bomb, bImage, bGroup;
var gamestate=1;
var end=0;
var play=1;
var score=0;
var gameover,gImage;
var reset,rImage;

function preload(){
sImage=loadImage("ship.png");
  spaceImage=loadImage("space.png");
  eImage=loadImage("enemy.png");
  lImage=loadImage("laser.png");
  bImage=loadImage("bomb.png");
  gImage=loadImage("over.png");
  rImage=loadImage("restart.png");
  
}

function setup() {
 createCanvas(displayWidth-10,displayHeight-100);
  
  space=createSprite(800,100,displayWidth-10,displayHeight-100);
  space.addImage(spaceImage);
  space.scale=2;
  
  spaceship=createSprite(300,620,20,20);
  spaceship.addImage(sImage);
  spaceship.scale=0.09;
  
  gameover=createSprite(displayWidth/2,displayHeight/2,20,20);
  gameover.addImage(gImage);
  gameover.scale=1;
  
  reset=createSprite(displayWidth/2,displayHeight/2+140,20,20);
  reset.addImage(rImage);
  reset.scale=0.25;
  
  
  eGroup=new Group();
  lGroup= new Group();
  bGroup= new Group();
 
}

function draw() {
 background("white");
  
  
  if(gamestate===play)
  {
    enemies();
    
    gameover.visible=false;
    reset.visible=false;
    
    if(keyDown("space")){
    creatinglaser();
   }
    
    if(keyDown("UP_ARROW")){
    creatingbomb();
  }
    
    if(space.y>600){
    space.y=space.height/2;
  }
    
    if(keyDown("f")){
      space.velocityY=20;
    }
    
    else{
    space.velocityY=9;
    }
  
    if(keyDown("RIGHT_ARROW")){
    spaceship.x=spaceship.x+10;
  }
    
    if(keyDown("LEFT_ARROW")){
    spaceship.x=spaceship.x-10;
  }
  
     if(lGroup.isTouching(eGroup)){
     eGroup.destroyEach();
     lGroup.destroyEach();
       score=score+1;
  }
  
     if(bGroup.isTouching(eGroup)){
     eGroup.destroyEach();
     bGroup.destroyEach();
       score=score+1;
  }
    
    if(eGroup.isTouching(spaceship)){
      eGroup.destroyEach();
      gamestate=end;
    }
 }
  
  if(gamestate===end){
    gameover.visible=true;
    reset.visible=true;
    space.setVelocity(0,0);
    eGroup.setVelocityEach(0,0);
    spaceship.setVelocity(0,0);
    
    if(mousePressedOver(reset)){
      gamestate=play;
      score=0;
    }
   
  }
  
  
 drawSprites();
  fill("red");
  textSize(24);
  text("Score: "+ score, 50,50);
}

function enemies(){
  if(frameCount%150===0){
  enemy=createSprite(150,0,20,20);
  enemy.addImage(eImage);
  enemy.scale=0.4;  
  enemy.x=Math.round(random(150,displayWidth-50));
  enemy.velocityY=9;
  enemy.lifetime=200;
    //enemy.debug=true;
    enemy.setCollider("circle",0,0,150);
  eGroup.add(enemy);
    
  }
}

function creatinglaser(){
  
  laser=createSprite(300,430,20,20);
  laser.addImage(lImage);
  laser.scale=0.01;  
  laser.velocityY=-15;
  laser.lifetime=200;
  laser.x=spaceship.x;
  lGroup.add(laser);
    
  
}

function creatingbomb(){
  
  bomb=createSprite(300,410,20,20);
  bomb.addImage(bImage);
  bomb.scale=0.1;  
  bomb.velocityY=-3;
  bomb.lifetime=200;
  bomb.x=spaceship.x;
  bGroup.add(bomb);
    
  
}