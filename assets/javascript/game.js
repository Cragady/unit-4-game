//the fight log below it updating with a
//scroll bar that pushes the new information at the
//bottom with the older logs scrolling out of view
//at the top
//make sure the reset button comes after winning/losing
//all fights, 
var newHead = $("<h2>");
var readyChar = $("#pictures-row");
var sfc = ["pic1", "pic2", "pic3", "pic4"];
var pickedChar = [];
var charStats = "";
var charHealth = "";
var charAttack = "";
var enemStats = "";
var enemHealth = "";
var enemCounter = "";
var dmgGiv = "";
var dmgRec = "";
var chosenChar = false;
var chosenEnem = false;
var enemSet = false;
var gameOver = true;
var attackAdd = 0;
var selected;
var statted;
var altThis;

var gameFunk = {

    gameStart: function(){
        readyChar.append(newHead.text("Choose your Character!"));
        newHead.attr("class", "col-12");
        $("div").children().click(function(){
            selected = $(this).attr("id");
            if ((sfc.includes(selected))){  
                if (chosenChar === false){
                    statted = $(this).data('stats');
                    altThis = this;
                    gameFunk.chooseChar();
                } else if ((chosenChar === true) && (chosenEnem === false)){
                    statted = $(this).data('stats');
                    altThis = this;
                    gameFunk.chooseEnem();
                }
            };

            if ((chosenEnem === true) && (charHealth > 0)){
                $("#atk-btn").css("display", "flex");
                $("#fight-updates").css("display", "flex");
                $("body").css("background", "url(assets/images/Ludo_in_the_Wild_concept_8.jpg)");
                $("body").css("background-size", "100% 100%");
                $("body").css("background-repeat: no-repeat");
            };
        });

        gameFunk.attackButton();

        gameFunk.resetButton();

        gameFunk.chooseAgainEnem();
    },

    chooseChar: function(){
        $(altThis).detach();
        $("#player-char").append(altThis);
        newHead.empty();
        newHead.attr("class", "col-12 text-danger");
        readyChar.append(newHead.text("Choose your enemy!"));
        charStats = statted;
        charHealth = charStats[0];
        charAttack = charStats[1];
        chosenChar = true;
        chosenEnem = false;
        pickedChar.push(selected);
    },

    chooseEnem: function(){
    if (pickedChar.includes(selected)){
        return;
    };
    $("#pictures-row").css("display", "flex");
    $(altThis).detach();
    $("#opponent").append(altThis);
    newHead.empty();
    $("#pictures-row").css("display", "none");
    chosenEnem = true;
    enemStats = statted;
    enemHealth = enemStats[0];
    enemCounter = enemStats[2];
    pickedChar.push(selected);
    },

    battleLog: function(){
        var loggedDmg = $("<div>").text("You deal " + dmgGiv + " damage, and you take " + dmgRec +" damage.");
        $("#fight-log").prepend(loggedDmg, "<hr>");
    },

    attackButton: function(){
        $("#atk-btn").click(function(){
            if (chosenEnem === true){
                
                dmgGiv = Math.floor(Math.random() * charAttack) + attackAdd;
                dmgRec = Math.floor(Math.random() * enemCounter);
                charHealth -= dmgRec;
                enemHealth -= dmgGiv;
                gameFunk.battleLog();
                $("#player-char").find(".health-show").text(charHealth);
                $("#opponent").find(".health-show").text(enemHealth);
                if (charHealth <= 0){
                    $("#player-char").find(".health-show").text(0);
                    $("#rst-btn").css("display", "flex");
                    $("#atk-btn").css("display", "none");
                    $("#fight-updates").css("display", "none");
                    $("body").css("background", "url(assets/images/flat,800x800,070,f.u2.jpg)");
                    $("body").css("background-size", "100% 100%");
                    $("body").css("background-repeat: no-repeat");
                    if (enemHealth > 0){
                        $("#buttonInOut").prepend(newHead.text("You lost!"));
                        newHead.attr("class", "col-12 text-center text-danger");
                    };
                }; 
                
                if (enemHealth <= 0){
                    $("#opponent").find(".health-show").text(0);
                    $("#atk-btn").css("display", "none");
                    $("body").css("background", "url(assets/images/flat,800x800,070,f.u2.jpg)");
                    $("body").css("background-size", "100% 100%");
                    $("body").css("background-repeat: no-repeat");
                    chosenEnem = undefined;
                    attackAdd += 12;
                    newHead.attr("class", "col-12 text-danger");
                    readyChar.append(newHead.text("Choose your enemy!"));
                    $("#opponent").children().css("display", "none");
                    if (pickedChar.length === 4){
                        $("#buttonInOut").prepend(newHead.text("You Won!!!"));
                        newHead.attr("class", "col-12 text-center text-success");
                        $("#rst-btn").css("display", "flex");
                    }
                };
                
                if ((charHealth < 0) && (enemHealth < 0)){
                    $("#rst-btn").css("display", "flex");
                    $("#buttonInOut").prepend(newHead.text("It's a tie!"));
                    newHead.attr("class", "col-12 text-center text-warning");
                };
                
            };
        });
    },

    resetButton: function(){
        $("#rst-btn").click(function() {
            charHealth = "";
            charAttack = "";
            enemStats = "";
            enemHealth = "";
            enemCounter = "";
            chosenChar = false;
            chosenEnem = false;
            pickedChar = [];
            attackAdd = 0;
            $.each(sfc, function(i){
                var resetPicPos = $("#" + sfc[i]);
                resetPicPos.css("display", "flex");
                $("#pictures-row").append(resetPicPos);
            });
            $.each(sfc, function(i){
                var resetHealthShow = $("#" + sfc[i]);
                var dataHealthSelector = $(resetHealthShow).data('stats');
                $(resetHealthShow).find(".health-show").text(dataHealthSelector[0]);
            });
            readyChar.append(newHead.text("Choose your Character!"));
            newHead.attr("class", "col-12");
            $("#pictures-row").css("display", "flex");
            $("#fight-updates").css("display", "none");
            $("#rst-btn").css("display", "none");
            $("#fight-log").empty();
        });
    },

    chooseAgainEnem: function(){
        $("div").click(function(){
            if(chosenEnem === undefined){
                if ((pickedChar.length === 4) || (charHealth <= 0)){
                    return;
                };
                $("#pictures-row").css("display", "flex");
                selected = $(this).attr("id");
                if ((sfc.includes(selected))){
                    statted = $(this).data('stats');
                    altThis = this;
                    gameFunk.chooseEnem();
                };
            };
        });
    }
};

$(document).ready(function(){
    gameFunk.gameStart();
});