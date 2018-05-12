<h1>Brief Description</h1>

The purpose of this simple RPG game is to dynamically change the HTML and CSS of a webpage using JavaScript/Jquery and to give a basic game mechanic that figures damage given, taken, and that interaction with character and enemy helath. 

The user selects their character and will try to win, the order of opponents will affect their gameplay. A certain order will give the user a much higher chance of winning. After each enemy is defeated, their base attack for each turn is given a guaranteed increase. 

The user will be notified if they won, lost, or had a tie. The winning notification only shows up at the very end after all of the enemies have been defeated.

<h1>On game load</h1>


**gameStart**<hr>

In the `gameStart` method, a new `h2` element is created and appended to the `#pictures-row` to notify the user to choose a starting character. 

* The `$("div").children().click(function(){});` works in conjunction with the `selected` variable nested inside of it to make sure that there is only code execution when the pictures are clicked on. The `selected` is defined here so that the `this` used in further nested methods works through `selected` and acts on the level where `selected` is defined.

* *The two `if` statements with the parent of `$("div").....});`*

  * The first `if` statement uses the **var** `sfc` and `selected` to only carry out the nested code that picks the character and enemy and assigns them to their slots only on a valid choice so we don't see some funky placements and element movements on a click that isn't meant for a character choice.

    * *The `if else` statement:* 
      * ***in the if section*** checks to make sure the user has not picked a character before exeuting it's contents, then sets variables for selectors to be used in `gameFunk.chooseChar();` then executes. 

      * ***in the else if section*** checks to make sure the user has made a character choice and that an enemy has not been chosen before it executes it's contents then sets variables for selectors to be used in `gamefunk.chooseEnem();` then executes.

  * The second `if` statement shows the attack button, which is utilized for the attacking mechanics

  * The `attackButton` method is called.

  * The `resetButton` method is called.

  * The `chooseAgainEnem` method is called.
  
<hr>


**chooseChar**<hr>

In the `chooseChar` method, the user's choice is detached then appended to the div location `#player-char` using variables that are set as targeters. The div that has been appended to `#pictures-row` is emptied and now tells the user to pick their enemy.

Variables are declared/changed to interact with other methods/functions to keep the game moving and working. It also pushed `selected` to `pickedChar` so that the user's choice for their character can't be selected as their enemy to avoid breaking the game.

<hr>

**chooseEnem**<hr> 

The `if` statement stops the code if the user accidentally/purposefully clicks on their own chosen character, avoiding a game break.

The `pictures-row` is set to **display: flex;** because in a later method, it is set to **display: none;** so that the pictures don't obscure the active field, where the battle should take place

When the user's choice for the enemy has been made, the selected character is detached then appended to the opponent slot. 

Variables are declared for enemy stats and the chosen enemy is logged in `pickedChar`

<hr>

**battleLog**<hr>

`battleLog` creates a new div and prepends it to the top for each turn, and notifies the user of the damage dealt and damage taken.

<hr>

**attackButton**<hr>

`#atk-btn` is targeted and given a click function. Inside the click function, an if statement is passed, checking if an enemy has been picked. 

Damage given and damaged received are set to variables utilizing functions to randomly give damage using the `data-stats` set in the characters html, and read in the `chooseEnem` and `chooseChar` methods. After each click, the character health is properly reflected under the character's and enemy's card.

  * *The three `if` statements:*

    * The first `if` statement displays the reset button and lets the user know that they lost if they've lost all their health, and hides the attack button so the user can't continue the game without restarting.

    * The second `if` statement checks if the enemy has lost all their health. It then adds guaranteed 12 damage per turn and tells the user to choose your next enemy and removes the defeated enemy. There is an `if statement in here to check if all of the possible enemies has been defeated.

    * The third `if` statement, checks to see if the user and enemy has lost all of their health at the same time, and notifies a tie

<hr>

**resetButton**<hr>

All of the variables are set back to a state to allow for a new round without having unexpected interactions, `$.each()` loops are used to reset the positioning of the characters, and their showed health to reverse the `.detach()` functions. The reset button is set not to show and the fight log is emptied.

<hr>

**chooseAgainEnem**<hr>

The `chooseAgainEnem`'s code is put in a click function, to check the requirements on each click. The first if statement checks to see if the user hasn't defeated all the available enemies and that the user still has health before executing the rest of the code.

`#pictures-row` is set to display, and the appropriate selectors and if statements are used to allow the `chooseEnem` statement to function correctly when called in `chooseAgainEnem`.

<hr>

**$(document).ready()**<hr>

Calls the `gameStart` method to run the game.