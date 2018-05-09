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

$(document).ready(function(){
    $pic1 = $("#pic1").detach();
    $("#rchallengers").append($pic1);
    console.log("scripted");

    $(document).on("click", function(){
        $pic1;
        $("#pictures-row").append($pic1);
        console.log("clicked!");
    })

});