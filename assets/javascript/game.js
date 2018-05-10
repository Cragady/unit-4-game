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
var newDiv = $("<div>");
var readyChar = $("#pictures-row");
var sfc = ["pic1", "pic2", "pic3", "pic4"];
var chosenChar = false;
var chosenEnem = false;
var enemSet = false;
// var movingPictures = $("#pictures-row").detach();

$(document).ready(function(){
    readyChar.append(newDiv.text("Choose your Character!"));
    $("div").click(function(){
        var selected = $(this).attr("id");
        if ((sfc.includes(selected))){
            if (chosenChar === false){
                $(this).detach();
                $("#player-char").append(this);
                newDiv.empty();
                readyChar.append(newDiv.text("Choose your enemy!"));
                chosenChar = true;
            } else if ((chosenChar === true) && (chosenEnem === false)){
                $(this).detach();
                $("#opponent").append(this);
                newDiv.empty();
                $("#pictures-row").css("display", "none");
                chosenEnem = true;
                //code here to extract damage, healt, etc.
                enemSet = true;
            }
        }
        // if (enemSet === true){
        //     $("#pictures-row").css("display", "flex");
        //     this is for later.
        // }
    })
});