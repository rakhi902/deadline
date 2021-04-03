class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){     
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    
    bg = createSprite(displayWidth/2,displayHeight/2-120,displayWidth, displayHeight);
    bg.addImage(gameMap);

    door = createSprite(displayWidth-100,displayHeight/2+60);
    door.addImage(doorCloseImg);

   

    survivor1 = createSprite(200,450,20,20);
    survivor1.shapeColor = "blue";
    survivor1.addImage(survivor1_img);
    survivor1.scale = 0.2;

    survivor2 = createSprite(400,450,20,20);
    survivor2.shapeColor = "blue";
    survivor2.addImage(survivor2_img);
    survivor2.scale = 0.2;

    survivor3 = createSprite(600,450,20,20);
    survivor3.shapeColor = "blue";
    survivor3.addImage(survivor3_img);
    survivor3.scale = 0.2;

    survivor4 = createSprite(800,450,20,20);
    survivor4.shapeColor = "blue";
    survivor4.addImage(survivor4_img);
    survivor4.scale = 0.2;

    
    survivors = [survivor1,survivor2,survivor3,survivor4];
    //survivors = [survivor1];
  }
 

  play(){
   
    background(0);
    bg.scale = 1.8;
   
    form.hide();
    form.showSuccess();
   // image(doorCloseImg,displayWidth-100,400);
    Player.getPlayerInfo();
    player.getSurvivorsAtEnd();
    //spawnKeys();
    if(frameCount%200===0){

    ghost = createSprite(0,50);
    ghost.addImage(ghostImage);
    ghost.scale = 0.2;
    ghost.velocityX = 5;
    ghostGroup.add(ghost);
    
    weapon = createSprite(50,100);
    weapon.addImage(weaponImage);
    weapon.scale = 0.2;
    weapon.x = ghost.x;
    weapon.velocityY = 5;
    weaponGroup.add(weapon);
    
    }
    if(allPlayers !== undefined){
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 100;
      var y = 450;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
      //  x = x+300;
        //position the cars a little away from each other in x direction

        x = allPlayers[plr].distance;
               
        y = y;
        survivors[index-1].x = x;
        survivors[index-1].y = y;
        
        if(survivors[index-1].isTouching(keysGroup)){
          keysGroup.destroyEach();
          player.keyCount = player.keyCount+1;
          player.update();
 
        }

        if(survivors[index-1].isTouching(moneyGroup)){
          moneyGroup.destroyEach();
          player.moneyCount = player.moneyCount+10;
          player.update();
 
        }
       if(player.keyCount >=3 && survivors[index-1].isTouching(door) && player.moneyCount >=100){
         survivors[index-1].destroy();
         door.addImage(doorOpenImg);

       }
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
         
        }
      
      }

    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
       player.distance = player.distance-10;     
       player.update();
    }

  
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance = player.distance+10;//      
      player.update();
  
    }
    /*
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
     // player.distance = player.distance+5;//        
      //player.update();
   
      
     }
    */ 
    if(player.live === 0){
      gameState = 2;
      player.rank = player.rank + 1;
      Player.updateSurvivorsAtEnd(player.rank);
    }
   
    drawSprites();
  }


  end(){
    console.log("Game Ended");
    console.log("Your rank is "+player.rank);
  }
  spawnKeys(){
    if(frameCount%300===0){
    key = createSprite(Math.round(random(100,displayWidth-200)),-10);
    key.addImage(keyImage);
    key.velocityY = 5;
    key.scale = 0.3;
    keysGroup.add(key);
    }
  }
  spawnMoney(){
    if(frameCount%200===0){
    money = createSprite(Math.round(random(100,displayWidth-200)),-10);
    money.addImage(moneyImage);
    money.velocityY = 5;
    money.scale = 0.3;
    moneyGroup.add(money);
    }
  }
  /*spawnGhost(){
    if(frameCount%200===0){
      ghost = createSprite(0,50);
      ghost.addImage(ghostImage);
      ghost.scale = 0.2;
      ghostGroup.add(ghost);
      position = Math.round(random(1,2));
   
    if(position==1)
    {
    ghost.x=-0;
    ghost.velocityX = 5;
    }
    else
    {
      if(position==2){
      ghost.x=displayWidth;
      ghost.velocityX= -5;
      }
    }
      }
  }*/
  /*spawnWeapon(){
   if(frameCount%200===0){

    weapon = createSprite(50,100);
    weapon.addImage(weaponImage);
    weapon.scale = 0.2;
    weapon.x = ghostGroup.x;
    weapon.velocityY = 5;
    weaponGroup.add(weapon);
  }
}*/



}

