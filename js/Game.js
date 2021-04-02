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
   
    Player.getPlayerInfo();
    player.getSurvivorsAtEnd();
   
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

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
         
        }
      
      }

    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
       player.distance = player.distance-5;     
       player.update();
    }

  
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance = player.distance+5;//      
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
}
