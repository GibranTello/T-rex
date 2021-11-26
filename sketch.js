var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score;                                             
var gameOverImg, restartImg;
var dieSound, jumpSound, checkPoint;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");    
  obstacle2 = loadImage("obstacle2.png");                                                 
  obstacle3 = loadImage("obstacle3.png");                                        
  obstacle4 = loadImage("obstacle4.png");                                        
  obstacle5 = loadImage("obstacle5.png");                                        
  obstacle6 = loadImage("obstacle6.png");                                        
  gameOverImg = loadImage("gameOver.png");                                       
  restartImg = loadImage("restart.png");                                         

  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
  checkPoint = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,height -70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(width/2, height-30, width,50);
  ground.addImage("ground",groundImage);

  invisibleGround = createSprite(width/2, height-10, width,30);
  invisibleGround.visible = false;
  
                
                     
  console.log(trex.y);                                  
  score = 0;

  obstaclesGroup=new Group();
  cloudsGroup=new Group();

  trex.setCollider("circle",0,0,40);
trex.debug=false;

gameOver=createSprite(width/2,height/2 -50);
gameOver.addImage(gameOverImg); 
gameOver.scale=0.5;
restart=createSprite(width/2,height/2 );
restart.addImage(restartImg); 
restart.scale=0.5; 

gameOver.visible=false;
restart.visible=false;



}

function draw() {
  background(140);
  fill("white");                                         
  text("Puntuación: "+ score, 500,50);
  
  
  if(gameState === PLAY){
     score = score + Math.round(getFrameRate()/60);
      if(score > 0 && score %1000 === 0){
        checkPoint.play();
      }
       ground.x=width/2 +10;
      ground.velocityX = -4;
    
     if (ground.x < 0){
         ground.x = width/2;
     } 

     

    if(touches.length>0 || keyDown("space")&& trex.y >= height-80) {     
      trex.velocityY = -13;
      jumpSound.play();
      touches=[]
     }
  


     trex.velocityY = trex.velocityY + 0.8
     spawnObstacles();    
     spawnClouds();
     if(obstaclesGroup.isTouching(trex)){
      gameState=END;
      dieSound.play();
     }                           

    
}
  else if(gameState === END){

    trex.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    ground.velocityX=0;
    trex.changeAnimation("collided", trex_collided);  
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    gameOver.visible=true;
    restart.visible=true;
  }
  
  
   
  
  
  trex.collide(invisibleGround);
  
  if(mousePressedOver(restart)){
     reset();

  }

  drawSprites();
 
}

function spawnObstacles(){                        
 if (frameCount % 60 === 0){
   
   var obstacle = createSprite(width,height-30, 20, 30);    
   obstacle.shapeColor= "green";                  
               
   obstacle.velocityX = -4;                     
   
   
    
    var rand = Math.round(random(1,6));           
    switch(rand) {                                
      case 1: obstacle.addImage(obstacle1);       
              break; 
      case 2: obstacle.addImage(obstacle2);       
              break; 
      case 3: obstacle.addImage(obstacle3);       
              break;
      case 4: obstacle.addImage(obstacle4);       
              break;
      case 5: obstacle.addImage(obstacle5);       
              break;
      case 6: obstacle.addImage(obstacle6);       
              break;
      default: break;
    }
   
    obstacle.scale = 0.5;                         
    obstacle.lifetime = width;   

    obstaclesGroup.add(obstacle)
    
 }
}

function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    cloud = createSprite(width +20, height-300,40,10);
    cloud.y = Math.round(random(100,200));
    cloud.addImage(cloudImage);
    cloud.scale = 0.6;
    cloud.velocityX = -3;
    
     
                 
    cloud.lifetime = width;                  
    
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

   cloudsGroup.add(cloud);
  }
}
function reset(){
gameState=PLAY
restart.visible=false
gameOver.visible=false
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
trex.changeAnimation("running")
score=0
}



