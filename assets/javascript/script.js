// <script>
  // Initialize Firebase
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBbG_vSkVVN6ogFyw11q8MqrfYxcAwnlU8",
    authDomain: "rps-game-4f189.firebaseapp.com",
    databaseURL: "https://rps-game-4f189.firebaseio.com",
    projectId: "rps-game-4f189",
    storageBucket: "",
    messagingSenderId: "392388451783"
  };
  firebase.initializeApp(config);
/*variables--------------------------------------------------------------------*/
var database = firebase.database();
var p1Lives=3;
var p2Lives=3;
var player1 = false;
var p1Name;
var player2 = false;
var notification;
var p2Name;
var p1Choice;
var p2Choice;
var chosen1;
var chosen2;
var p1Wins;
var p1Losses;
var p2Wins;
var p2Losses;
//
var rock = "r";
var paper = "p";
var scissors = "s";

/*resets information-----------------------------------------------------------*/
// $(document).(function(){
//   database.ref().set({
//     hello:hey
//   });
// })
$(document).on("click","#ready", function(){
  database.ref().set({
    player1:{
      choice:"",
      lives:3,
      chosen:false
    },
    player2:{
      choice:"",
      lives:3,
      chosen:false
    },
    winner:"",
    chat:{

    }
  });
});
database.ref().on("value", function(snapshot) {
  p1Choice=snapshot.val().player1.choice;
  p2Choice=snapshot.val().player2.choice;
  notification = snapshot.val().winner.winner;

  if(snapshot.val().player1.chosen===false){
    $("#player1Area").html("<h3>player1</h3><button id='p1Active'>Choose Player 1</button>");
  }else if (player1===true){
    $("#player1Area").html("<button id='rock1'>rock</button><button id='paper1'>paper</button><button id='scissor1'>scissor</button>");
  }else if(snapshot.val().player1.chosen===true){
    $("#player1Area").html("<p>Space Taken</p>");
  }
  if(snapshot.val().player2.chosen===false){
      $("#player2Area").html("<h3>player2</h3><button id='p2Active'>Choose Player2</button>");
  }else if(player2===true){
    $("#player2Area").html("<button id='rock2'>rock</button><button id='paper2'>paper</button><button id='scissor2'>scissor</button>");
  }else if(snapshot.val().player2.chosen===true){
    $("#player2Area").html("<p>Space Taken</p>");
  }
});




database.ref("/winner/winner").on("value", function(snapshot){
$("#centerSection").html("<p>The Winner is "+notification+"!!!</p>");
});



/*Choose to activate players---------------------------------------------*/
$(document).on("click", "#p1Active", function(){
  database.ref().child("player1").set({
      choices:"",
      lives:3,
      chosen:true
  });
  player1=true;
  // $("#player1Area").html("<button id='rock1'>rock</button><button id='paper1'>paper</button><button id='scissor1'>scissor</button>");
});


$(document).on("click", "#p2Active", function(){
  database.ref().child("player2").set({
      choices:"",
      lives:3,
      chosen:true
  });
  player2=true;
  // $("#player2Area").html("<button id='rock2'>rock</button><button id='paper2'>paper</button><button id='scissor2'>scissor</button>");
});
/*button function--------------------------------------------------------------*/
$(document).on("click","#rock1", function(){
  p1Choice = "r";
  chosen1 = true;
  database.ref().child("player1").set({
    choice:"r",
    lives:p1Lives,
    chosen:true
  });
});

$(document).on("click","#paper1", function(){
  p1Choice = "p";
  chosen1 = true;
  database.ref().child("player1").set({
      choice:"p",
      lives:p1Lives,
      chosen:true
  });
});

$(document).on("click","#scissor1", function(){
  p1Choice = "s";
  chosen1 = true;
  database.ref().child("player1").set({
      choice:"s",
      lives:p1Lives,
      chosen:true
  });
});


/*player2choices*/
$(document).on("click","#rock2", function(){
  p2Choice = "r";
  chosen2 = true;
  database.ref().child("player2").set({
      choice:"r",
      lives:p2Lives,
      chosen:true
  });
});

$(document).on("click","#paper2", function(){
  p2Choice = "p";
  chosen2 = true;
  database.ref().child("player2").set({
      choice:"p",
      lives:p2Lives,
      chosen:true
  });
});

$(document).on("click","#scissor2", function(){
  p2Choice = "s";
  chosen2 = true;
  database.ref().child("player2").set({
      choice:"s",
      lives:p2Lives,
      chosen:true
  });
});

// database.ref("/player1/choice").on("value", function(snapshot){
// });


$("#fight").click(function(){
  check();

  database.ref().child("player1").set({
      choice:"",
      lives:p1Lives
  });
  database.ref().child("player2").set({
      choice:"",
      lives:p2Lives
  });

});


/*Function checks for who the winner is and declares it to the */
function check(){
  if((p1Choice==="r" && p2Choice==="s")||(p1Choice==="s" && p2Choice==="p")||(p1Choice==="p" && p2Choice==="r")){
    p2Lives--;
    database.ref().child("winner").set({
      winner:"Player1"
    });
    $("#centerSection").html("<p>Player 1 Wins!!!</p><p>Player 2 has "+p2Lives+" left!</p>");
  }else if(p1Choice===p2Choice){
    database.ref().child("winner").set({
      winner:"Draw"
    });
    $("#centerSection").html("<p>It's a Draw!!!</p>");
  }else{
    p1Lives--;
    database.ref().child("winner").set({
      winner:"Player2"
    });
    $("#centerSection").html("<p>Player 2 Wins!!!</p><p>Player 1 has "+p1Lives+" left!</p>");

  }
  p1Choice= "";
  p2Choice= "";
}
/*chat message functionality*/
$(document).on("click", "#sendMsg", function(){
  var message= $("#chat").val();
  database.ref("child").set({
    message:message
  });
  $("#chat").text("");
});
database.ref("child/message").on("value", function(snapshot){
  $("#chatbox").append(snapshot.val()+"<br>");
});
