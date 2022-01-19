var background,cat,cash,canFood,fish,sword;
var backgroundImg,catImg,cashImg,canFoodImg,fishImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  backgroundImg = loadImage("background.jpg");
  catImg = loadAnimation("cat1.png","cat2.png","cat3.png");
  fishImg = loadImage("fish.png");
  swordImg = loadImage('sword.png')
  cashImg= loadImage('jwell.png')
  canfoodImg = loadImage("canfood.png")
  endImg =loadAnimation("gameOver.png");
}

function setup(){
createCanvas(displayWidth,displayHeight)                
// Moving background
background=createSprite(width/2, height/2,width, height);
background.addImage(backgroundImg);
backgroundImg.scale = 1
background.velocityX = -4;


//creating boy running
cat = createSprite(width/2,height-20,20,20);
cat.addAnimation("CatRunning",catImg);
cat.scale=0.6;
  
  
cashG=new Group();
canFoodG=new Group();
fishG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  //background(0);
  cat.x = World.mouseX;
  
  edges= createEdgeSprites();
  cat.collide(edges);
  
  //code to reset the background
  if(background.x < 0 ){
    background.x = width/2;
  }
  
    createCash();
    createcanFood();
    createFish();
    createSword();

    if (cashG.isTouching(cat)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (canFoodG.isTouching(cat)) {
      canFoodG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(fishG.isTouching(cat)) {
      fishG.destroyEach();
      treasureCollection=treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(cat)) {
        gameState=END;
        
        cat.addAnimation("CatRunning",endImg);
        cat.x=200;
        cat.y=300;
        cat.scale=0.6;
        
        cashG.destroyEach();
        canFoodG.destroyEach();
        fishG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        canFoodG.setVelocityYEach(0);
        fishG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }

}

function createCash() {
  if (World.frameCount % 100 == 0) {
  var cash = createSprite(40, Math.round(random(50, width-50),10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityX = 3;
  cash.lifetime = 500;
  cashG.add(cash);
  }
}

function createcanFood() {
  if (World.frameCount % 200 == 0) {
  var canFood = createSprite(40,Math.round(random(50, width-50),10, 10));
  canFood.addImage(canfoodImg);
  canFood.scale=0.03;
  canFood.velocityX = 3;
  canFood.lifetime = 500;
  canFoodG.add(canFood);
}
}

function createFish() {
  if (World.frameCount % 300 == 0) {
  var fish = createSprite(40, Math.round(random(50, width-50),10, 10));
  fish.addImage(fishImg);
  fish.scale=0.03;
  fish.velocityX = 3;
  fish.lifetime = 500
  fishG.add(fish);
  }
}

function createSword(){
  if (World.frameCount % 400 == 0) {
  var sword = createSprite(40, Math.round(random(50, width-50),10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityX = 3;
  sword.lifetime = 500;
  swordGroup.add(sword);
  }
}