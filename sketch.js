var mario,marioImg,backgroundImg;
var obstacle1;
var invisibleGround,obstaclesgroup,bricksgroup,mario_collided,restartimg,gameoverimg,restart,gameover;
var bg;
var jumpSound,dieSound,checkPointSound;
var gameState="play";

var brickImg;
var score;
var brick;
function preload(){
  
  marioImg=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  backgroundImg=loadImage("bg.png");
  ground2img=loadImage("ground2.png")
  obstacle1=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
 
  brickImg=loadImage("brick.png");
  mario_collided=loadAnimation("collided.png")
  restartimg=loadImage("restart.png")
  gameoverimg=loadImage("gameOver.png")
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkPointSound=loadSound("checkPoint.mp3");
  
}
function setup(){
  createCanvas(600,300);
  
  obstaclesgroup=new Group();
  bricksgroup=new Group();
  
  
  
  bg=createSprite(300,290);
  bg.addImage("bg",ground2img);
  bg.scale=1;
 
  
  mario=createSprite(20,250,20,20);
  mario.addAnimation("mario",marioImg);
  mario.addAnimation("collision",mario_collided)
  mario.scale=1; 
  
  gameover=createSprite(300,150,10,10);
  gameover.addImage("over1",gameoverimg);
  gameover.scale=1;
  
  restart=createSprite(300,200,10,10);
  restart.addImage("starting",restartimg);
  restart.scale=0.5;
  
  gameover.visible=false;
  restart.visible=false;
  
  invisibleGround=createSprite(50,260,600,10);
  invisibleGround.visible=false;
  
  mario.setCollider("rectangle",0,0,20,mario.height);
 // mario.debug=true;
  
  score=0;
  
}
function draw(){
  
 
  background(backgroundImg);
  //add camera positions
  //camera.position.x=mario.x;
  camera.position.y=200;
  if(gameState==="play"){
    
     bg.velocityX=-(4+score/10);
    
  if(bg.x<300){
    bg.x=bg.width/2;
   // camera.position.x=bg.x;
    
  }
  mario.changeAnimation("mario",marioImg);
    for (i = 0; i < bricksgroup.length; i++) 
    {
      if (mario.isTouching(bricksgroup.get(i))) 
      {
      score = score + 1;
      bricksgroup.get(i).destroy();
      }
    }
      if(score>0 && score%10===0){
        checkPointSound.play();
      }
    

    if(keyDown("space")&&mario.y>220){
 
      mario.velocityY=-16;
      jumpSound.play();
    } 
    mario.velocityY=mario.velocityY+0.8;
    
    if(obstaclesgroup.isTouching(mario)){
      gameState="end";
      dieSound.play();
    }
  
  obstacles();
  bricks();
  
  } 
  if(gameState==="end"){
    
    gameover.visible=true;
    restart.visible=true;
    bg.velocityX=0;
    mario.velocityY=0;
    mario.changeAnimation("collision",mario_collided);
    obstaclesgroup.setVelocityXEach(0)
    bricksgroup.setVelocityXEach(0)
    obstaclesgroup.setLifetimeEach(-1);
    bricksgroup.setLifetimeEach(-1);  
  }
    if(mousePressedOver(restart)){
       reset();
     }
    mario.collide(invisibleGround);
    drawSprites();
    fill("white");
    textSize(20);
    text("Score : "+score,300,40);
   
}
function obstacles(){
  if(frameCount%80===0){
    var obstacle=createSprite(500,230);
    obstacle.velocityX=-(5+score/10);
    obstacle.lifetime=250;
    obstacle.addAnimation("obstacle",obstacle1);
    obstaclesgroup.add(obstacle);
    }  
}


function bricks(){
      if(frameCount%50===0){        brick=createSprite(500,Math.round(random(60,100)));
    brick.velocityX=-(4+score/10);
     brick.lifetime=180;
     brick.addImage("brick",brickImg);
     brick.depth=mario.depth;
     mario.depth=mario.depth+1;
     bricksgroup.add(brick);
   }
}
function reset(){
  score=0;
  obstaclesgroup.destroyEach();
  bricksgroup.destroyEach();
  gameState="play";
  gameover.visible=false;
  restart.visible=false;
}
