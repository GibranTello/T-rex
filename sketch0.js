
//Actividad Inicial PRO C12

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;                                                // M)  Student


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");                  //  F) Student
  obstacle2 = loadImage("obstacle2.png");                  //  F) Student
  obstacle3 = loadImage("obstacle3.png");                  //  F) Student
  obstacle4 = loadImage("obstacle4.png");                  //  F) Student
  obstacle5 = loadImage("obstacle5.png");                  //  F) Student
  obstacle6 = loadImage("obstacle6.png");                  //  F) Student
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);

  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //console.log("Hello" + " " + "World");               //  C) Profe
  //console.log("Hello" + " " + 5);                     // D) Profe
  console.log(trex.y);                                   // G) Profe
  score = 0;
}

function draw() {
  background(140);
  fill("white");                                         // Ñ) Student
  text("Puntuación: "+ score, 500,50);                   // N) Student
  //score = score + (frameCount/60);                     // O) Student
  score = score + Math.round(frameCount/60);             // P) Student
  
  //console.log("Hello" + " " + 5);                      // E) Profe
  //console.log(trex.y);                                 // F) Profe
  
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;
  }
  trex.velocityY = trex.velocityY + 0.8
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  trex.collide(invisibleGround);
  //aparece las nubes
  spawnClouds();
  //Aparece obstáculos en el suelo
  spawnObstacles();                                 // B) Sudents
  drawSprites();
}

function spawnObstacles(){                          // A) Student
 if (frameCount % 60 === 0){
   //var obstacle = createSprite(400,165,10,40);     // C) Student
   var obstacle = createSprite(600,165,10,40);       // D) Student
   obstacle.shapeColor= "green";                     // E) Student
   //obstacle.addImage(obstacle2);                   // G) Student
   obstacle.velocityX = -4;                     

   
    //Genera obstáculos al azar 
    var rand = Math.round(random(1,6));             // H) Student
    switch(rand) {                                  // I) Student
      case 1: obstacle.addImage(obstacle1);         // J) Student
              break; 
      case 2: obstacle.addImage(obstacle2);         // J) Student
              break; 
      case 3: obstacle.addImage(obstacle3);         // J) Student
              break;
      case 4: obstacle.addImage(obstacle4);         // J) Student
              break;
      case 5: obstacle.addImage(obstacle5);         // J) Student
              break;
      case 6: obstacle.addImage(obstacle6);         // J) Student
              break;
      default: break;
    }
    //asigna escala y ciclo de vida al obstáculo           
    obstacle.scale = 0.5;                           // k) Student
    obstacle.lifetime = 300;                        // L) Student
 }
}

function spawnClouds() {
  //escribe el código aquí para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.6;
    cloud.velocityX = -3;
    
     //asigna ciclo de vida a la variable
    //cloud.lifetime = 60;                 //     A) Profe
    cloud.lifetime = 220;                  //     B) Profe
    
    //ajusta la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
}




/*Actividad Completa PRO C12  a PRO C13 

// Declara variables pasa los estados del juego 
var PLAY = 1;            // 13  E) Profe
var END = 0;             // 13  E) Profe
var gameState = PLAY;    // 13  E) Profe

 

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacle, obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;                              


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
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);

  //ground.velocityX = -4;    //13 Ga) Profe ésta va dentro de if gameState
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  

  console.log(trex.y);                                
  
  score = 0;
  
  obstaclesGroup = new Group();        // A)) y B)) profe
  cloudsGroup = new Group();
  
}

function draw() {
  background(140);
  fill("white");                                   
  text("Puntuación: "+ score, 500,50);      

  
  score = score + Math.round(frameCount/60);   
  
  //Condiciona actividades a los gameStates
  if(gameState === PLAY) {         //13 F) Profe
     
    //Se mueve mientras está en PLAY
    ground.velocityX = -4;    //13 Gb) Profe (ésta va dentro de if gameState)

  }   
  else if(gameState === END) {
    // Se detiene cuando el gameState es END
       ground.velocityX = 0;       //13 Gc) Profe    
   }

  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;
  }
  
  trex.velocityY = trex.velocityY + 0.8    
  
  if (ground.x < 0){              
   ground.x = ground.width/2;
  }
  trex.collide(invisibleGround);    
  
  //Aparece las nubes
  spawnClouds();                 
  //Aparece obstáculos en el suelo
  spawnObstacles();                
  drawSprites();
}

function spawnObstacles(){         
 if (frameCount % 60 === 0){
   //var obstacle = createSprite(400,165,10,40);   
   var obstacle = createSprite(600,165,10,40);      
   obstacle.shapeColor= "green";                     
   obstacle.velocityX = -4;                     

   
    //Genera obstáculos al azar 
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
    //asigna escala y ciclo de vida al obstáculo           
    obstacle.scale = 0.5;                           
    obstacle.lifetime = 300;                        
   
   // Agrega los obstáculos a su grupo
   obstaclesGroup.add(obstacle);      // 13 B) Profe 
 }
}

function spawnClouds() {
  
  //escribe el código aquí para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.6;
    cloud.velocityX = -3;
    
     //asigna ciclo de vida a la variable 
    cloud.lifetime = 220;                  
    
    //ajusta la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    // Agrega nubes a su grupo
    cloudsGroup.add(cloud);      // 13  D) Profe pendiente
  }
}*/