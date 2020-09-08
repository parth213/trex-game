var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImage;
var resetimg,gameoverimg,reset,gameover;
var check,obstacles,o1,o2,o3;
var score=0;
var cloudsGroup,obstaclesGroup;
var pointsound,jump,die;
var PLAY=1;
var END=0;
var gameState=PLAY;
var n="this is a message"
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud1.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png"); 
  o3=loadImage("obstacle3.png");
  resetimg=loadImage("restart.png");
  gameoverimg=loadImage("gameOver.png");
  jump=loadSound("jump.mp3");
  pointsound=loadSound("checkPoint.mp3");
  die=loadSound("die.mp3");
}

function setup() {
  createCanvas(400, 400);
  
  //create a trex sprite
  trex = createSprite(50,380,20,50);
  //trex.setCollider("rectangle",0,0,300,trex.height);
  trex.setCollider("circle",0,0,40);
  //trex.debug=true;
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trex_collided);
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
   console.log(n)
  
  //create ground sprite
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  invisibleGround=createSprite(200,395,400,10);
  invisibleGround.visible=false;
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
  reset= createSprite(200,250,20,20);
  gameover=createSprite(200,150,50,20);
  gameover.addImage(gameoverimg);
  reset.addImage(resetimg);
  reset.scale=0.3;
  gameover.scale=0.3;
  reset.visible=false;
  gameover.visible=false;
}

function draw() {
  background(220);
  //displaying score
  fill("black");
  text("score: "+score,200,200);
 
  
  if(gameState===PLAY)
  {
   ground.velocityX = -(2+score/100);
    if(frameCount%80===0)
  {
 spawnClouds();
  }
   if(frameCount%100===0)
  {
 spawnObstacles();
  }
     score=score+Math.round(getFrameRate()/50)
    
    if(obstaclesGroup.isTouching(trex))
    {
     die.play();
     gameState=END;
     //trex.velocityY=-20;
     //jump.play();
    }
  }
  else if(gameState===END)
  {
   ground.velocityX=0;
   trex.changeAnimation("collide", trex_collided);
   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);
   obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
   trex.velocityY=0;
   reset.visible=true;
   gameover.visible=true;
  }
  
 console.log(getFrameRate())
  
 if(ground.x<0)
 {
   //ground.x=200;
   ground.x=ground.width/2;
 }
  
  //jumping the trex on space key press
  if(keyDown("space")&&trex.y>=361&&gameState===PLAY)
  {
    jump.play();
    trex.velocityY = -20;
    
  }
  
  trex.velocityY = trex.velocityY + 0.8
  if(score%100===0&&score>0)
  {
   pointsound.play();
  }
 
 //stop trex from falling down 
  trex.collide(invisibleGround);
  if(mousePressedOver(reset))
  {
   console.log("reset")
   resetgame();
  }
  
  
    drawSprites();
}
function spawnClouds()
{
  cloud=createSprite(220,100,20,20);
  cloud.addImage(cloudImage);
  cloud.lifetime=100;
  cloud.scale=0.3;
  cloud.y=Math.round(random(30,150));
  cloud.velocityX=-2;
  trex.depth=cloud.depth;
  trex.depth=trex.depth+1;
   cloudsGroup.add(cloud);
  
}
function spawnObstacles()
{
  obstacles=createSprite(320,370,20,20);
  check=Math.round(random(1,3));
  obstacles.velocityX=-(3+score/100);
  obstacles.scale=0.7;
  obstacles.lifetime=133;
  switch(check)
  {
    case 1: obstacles.addImage(o1);
      break;
      case 2: obstacles.addImage(o2);
      break;
      case 3: obstacles.addImage(o3);
      break;
  }
 obstaclesGroup.add(obstacles);
 
  
}
function resetgame()
{
 gameState=PLAY;
 score=0;
 gameover.visible=false;
 reset.visible=false;
 cloudsGroup.destroyEach()
  obstaclesGroup.destroyEach()
  trex.changeAnimation("running",trex_running);
}