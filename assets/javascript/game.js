//use js/jq to change the css display value
//for the pictures row
//during the fighting portion, the pictures should
//be side by side like in an actual rpg game with
//the fight log below it updating with a
//scroll bar that pushes the new information at the
//bottom with the older logs scrolling out of view
//at the top

/* use variables to keep track of scoring, and 
a switching true/false variable to trigger
a variable reset in the event of winning/losing
or active fight */

/* instead of using css, just use the detach and 
like in the function below make use of prepend append 
and after. Or use a for loop for appending/prepending*/

// $(document).ready(function(){


//     //$pic1 = $("#pic1").detach();
//     $pic1 = $("#pictures-row").detach();
//     //$("#rchallengers").append($pic1);
//     $("#fight-log").append($pic1);
//     console.log("scripted");

//     $("#pic1").on("click", function(){
//         $pic1;
//         $("#pictures-row").append($pic1);
//         console.log("clicked!");
//         // sfc = ["#pic1", "#pic2", "#pic3", "#pic4"];
//         // $("#pictures-row").each(sfc, function(){
//         //     if ()
//         // });
//     })

//     $("div").on("click", function(){
//         sfc = ["pic1", "pic2", "pic3", "pic4"];
//         var selected = $(this).attr("id");
//         if (sfc.includes(selected)){
//             //$("#pictures-row").prepend(this);
//             $(this).detach();
//             $("#rchallengers").append(this);
//             $("#fight-log").append($("#pictures-row"));
//             console.log(selected);
//         };
//     });

// });

//the above is a working example of how to move around
//clicked pictures 
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
var chosenChar = false;
var chosenEnem = false;
var enemSet = false;
var gameOver = true;
var selected;
var statted;
var altThis;
// var movingPictures = $("#pictures-row").detach();
var gameFunk = {
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
        // $("#pictures-row").click(function(){
        //     chosenEnem = false;
        // });
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
    console.log("premature function run")
    }
};
// function chooseChar(){
//         $(altThis).detach();
//         $("#player-char").append(altThis);
//         newHead.empty();
//         newHead.attr("class", "col-12 text-danger");
//         readyChar.append(newHead.text("Choose your enemy!"));
//         charStats = statted;
//         charHealth = charStats[0];
//         charAttack = charStats[1];
//         chosenChar = true;
//         chosenEnem = undefined;
//         // $("#pictures-row").click(function(){
//         //     chosenEnem = false;
//         // });
//         pickedChar.push(selected);
// };

// function chooseEnem(){
//     $("#pictures-row").css("display", "flex");
//     if (pickedChar.includes(selected)){
//         return;
//     };
//     $(altThis).detach();
//     $("#opponent").append(altThis);
//     newHead.empty();
//     $("#pictures-row").click(function(){
//         $("#pictures-row").css("display", "none");
//         chosenEnem = true;
//     });
//     enemStats = statted;
//     enemHealth = enemStats[0];
//     enemCounter = enemStats[2];
//     pickedChar.push(selected);
// };

$(document).ready(function(){
    readyChar.append(newHead.text("Choose your Character!"));
    newHead.attr("class", "col-12 text-info");
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
            $("#rst-btn").css("display", "flex");
        };
        // if (chosenEnem === false){
        //     $("#atk-btn").css("display", "none");
        //     $("#rst-btn").css("display", "none");
        // }
    });

    $("#atk-btn").click(function(){
        if (chosenEnem === true){
            
            var dmgGiv = Math.floor(Math.random() * charAttack);
            var dmgRec = Math.floor(Math.random() * enemCounter);
            charHealth -= dmgRec;
            enemHealth -= dmgGiv;
            $("#player-char").find(".health-show").text(charHealth);
            $("#opponent").find(".health-show").text(enemHealth);
            if (charHealth <= 0){
                $("#player-char").find(".health-show").text(0);
                $("#rst-btn").css("display", "flex");
                $("#atk-btn").css("display", "none");
            } else if (enemHealth <= 0){
                $("#opponent").find(".health-show").text(0);
                $("#atk-btn").css("display", "none");
                chosenEnem = undefined;
                //charAttack += 15;
                newHead.attr("class", "col-12 text-danger");
                readyChar.append(newHead.text("Choose your enemy!"));
                $("#opponent").children().css("display", "none");
            };                
            
        };
    });

    $("#rst-btn").click(function() {
            charHealth = "";
            charAttack = "";
            enemStats = "";
            enemHealth = "";
            enemCounter = "";
            chosenChar = false;
            chosenEnem = false;
            pickedChar = [];
            //gameOver = false;
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
            newHead.attr("class", "col-12 text-info");
            $("#pictures-row").css("display", "flex");
    });

    $("div").click(function(){
        if(chosenEnem === undefined){
            $("#pictures-row").css("display", "flex");
            selected = $(this).attr("id");
            console.log(selected);
            if ((sfc.includes(selected))){
                statted = $(this).data('stats');
                altThis = this;
                gameFunk.chooseEnem();
            };
        };
    });
});