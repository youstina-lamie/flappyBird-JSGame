

{
    playerName = $(".signin").val();
// let score ;
// let lives ;
// let level;
let islost=false;

$('.newGame').click(function () {
    playerName = $(".signin").val();
    score = 0;
    lives = 3;
    //  level = 1;

    if(playerName=="")
    {
        alert("please Enter a Name");
    }
    else if (localStorage.getItem(playerName) === null||islost==true) {
        localStorage.setItem(playerName, score);
        localStorage.setItem(`${playerName}_name`, playerName);
        localStorage.setItem(`${playerName}_lives`, lives);
        localStorage.setItem(`${playerName}_level`, level);
        document.querySelector("#score").innerHTML=score;
        document.querySelector("#live").innerHTML=lives;
       play();
    }
    else {
        alert(`" ${localStorage.getItem(`${playerName}_name`)} " already exist Enter New Name`);
        //    console.log();
    }
})


$(".continue").click(function () {
    var playerName = $(".signin").val();
    if(playerName=="")
    {
        alert("please Enter a Name");
    }
    else if (localStorage.getItem(playerName) === null) {
        alert(`" ${localStorage.getItem(`${playerName}_name`)} " doesn't exist ,click new game`);
    }
    else {
        // in game ui display();
        console.log("")
        console.log(localStorage.getItem(`${playerName}_name`));
        console.log(localStorage.getItem(`${playerName}_lives`));
        console.log(localStorage.getItem(`${playerName}_level`));
        console.log(localStorage.getItem(`${playerName}`));//score


        //  localStorage.getItem(`${playerName}_name`);
        score = localStorage.getItem(`${playerName}`)//getscore;
        lives = localStorage.getItem(`${playerName}_lives`);
        console.log(lives);
        level = localStorage.getItem(`${playerName}_level`);
        // pipY=localStorage.getItem(`${playerName}_location`,pipY)
      document.querySelector("#score").innerHTML=score;
      document.querySelector("#live").innerHTML=lives;
      document.querySelector("#level").innerHTML=level;
      if(lives==0)
      {
          alert("you lost press new Game");
          islost=true;
          
      }else{

          play();
      }

    }

    console.log(localStorage.name)
})
}