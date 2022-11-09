# AJS. Retro Game

## Deploy
[LINK](https://anastasia-shmeleva.github.io/ajs-adv-diploma/)

###### tags: `netology` `advanced js`

## Background

You have mastered well not only the advanced features of JS, but also the infrastructure tools. And you were assigned the first project: to develop a small turn-based game.

But, not everything is so good - the UI has already been written for you, some base classes have been designed, but the development was abandoned at this point. You need to reanimate the project by moving it to work with npm, Babel, Webpack, ESLint (and further down the list - you know), and also add the remaining functionality, because, as usually, there is no time (and money) to develop and design from scratch :).

## Game concept

A 2D fantasy-style game where the player has to put their characters against the characters of evil spirits. After each round, the life of the surviving player characters is restored and their level increases. The maximum level is 4.

## Mechanics

The field size is fixed (8x8). The direction of movement is similar to the queen in chess. Characters of different types can walk at different distances (in the basic version, you can jump over other characters - that is, like a knight in chess, the only thing is that we walk along straight lines and diagonally):
* Swordsmen / Skeletons - 4 cells in any direction
* Archers/Vampires - 2 squares in any direction
* Mages/Demons - 1 cell in any direction

![](https://i.imgur.com/yp8vjhL.jpg)

Attack range is also limited:
* Swordsmen / Skeletons - can only attack the adjacent cell
* Archers / Vampires - for the next 2 cells
* Mages/Demons - for the next 4 cells

Cells are considered "by radius", let's say for a swordsman the affected area will look like this:

![](https://i.imgur.com/gJ8DXPU.jpg)

For the archer (marked in red):

![](https://i.imgur.com/rIINaFD.png)


The player and the computer sequentially perform one game action, after which control is transferred to the opposing side. What it looks like:
1. Your own character is selected (for this you need to click on it with the left mouse button)
1. Then one of two options is possible:
    1. Moving: a free field is selected to which the character can be moved (to do this, click on the field with the left mouse button)
    2. Attack: a field with an enemy is selected, which can be attacked, taking into account the restrictions on the attack range (to do this, click on the enemy character with the left mouse button)
    
**Important: in a new game, the player always starts first (if the game is loaded from a save, the order is determined in the save).**

The game ends when all the player's characters die or the maximum level is reached (see Levels below).

The level ends with the player winning when all the computer characters are dead.

The points that a player gains per level are equal to the sum of the lives of the surviving characters.

### Character generation

Characters are randomly generated in columns 1 and 2 for the player and columns 7 and 8 for the computer:

![](https://i.imgur.com/XqcV1uW.jpg)


### Levels

#### Level 1: prairie

Two characters are generated for the player: (randomly - types `Bowman` and `Swordsman`) with level 1, the characteristics correspond to the table of characteristics (see section below).

The computer generates an arbitrary set of characters in the amount of 2 units.

#### Level 2: desert

The player increases the level of the players by 1 + the health of the survivors is restored. Additionally, a new level 1 character is randomly added.

The computer randomly generates characters in an amount equal to the number of player characters, with a level from 1 to 2.

#### Level 3: arctic

The player increases the level of the players by 1 + the health of the survivors is restored. Additionally, two new characters of level 1 or 2 are randomly added.

The computer randomly generates characters in an amount equal to the number of player characters, with a level from 1 to 3.


#### Level 4: mountain

The player increases the level of the players by 1 + the health of the survivors is restored. Additionally, two new characters from level 1 to 3 are randomly added.

The computer randomly generates characters in an amount equal to the number of player characters, with a level from 1 to 4.

### Characters

Valid string identifiers (to which images are attached):
* swordsman
* bowman
* magician
* daemon
* undead
* vampire

UPD: The player can only have swordsman, bowman and magician, the computer can only have daemon, undead, vampire.

#### Starting characteristics (attack / defense)

* Bowman - 25/25
* Swordsman - 40/10
* Magician - 10/40
* Vampire - 25/25
* Undead - 40/10
* Daemon - 10/40

#### Level Up

* Increases the level field by 1 automatically after each round
* The health indicator is reduced to the value: current level + 80 (but not more than 100). Those. if character 1 after the end of the round had a level of 10 life, and character 2 - 80, then after levelup:
    * character 1 - life will become 90
    * character 2 - life will become 100
* The increase in attack / defense indicators is also tied to the remaining life according to the formula: `attackAfter = Math.max(attackBefore, attackBefore * (1.8 - life) / 100)`, i.e. if the character has 50% left after the end of the round of life, then his performance will improve by 30%. If life remains 1%, then the indicators will not increase in any way.

## Structure Description

The structure of the classes provided to you is as simplified as possible, without unnecessary frills. Almost all dependencies are passed as constructor parameters so that they can be easily tested.

Key entities:
1. GamePlay - the class responsible for interacting with the HTML page
1. GameController - the class responsible for the application logic (important: this is not a controller in terms of MVC), where you will work the most
1. Character - the base class from which you will inherit and implement specialized characters
1. GameState - an object that stores the current state of the game (can recreate itself from another object)
1. GameStateService - an object that interacts with the current state (saves it so that it is not lost when the page is reloaded, can be exported to a file or loaded from a file)
1. PositionedCharacter - Character tied to a coordinate on the field. Note that even though the field looks like a 2D array, internally it is stored as a 1D array (think of this as a peculiar `legacy`, which you will have to contend with)
1. Team - a class for a team (a set of characters) representing a computer and a player
1. generators - module containing helper functions for generating team and characters

## Tasks

**Important: auto-tests are required only for those tasks where it is explicitly indicated. In other tasks, you can implement them at will.**

### 1. Building infrastructure

You need to implement Webpack, Webpack DevServer, Babel, ESLint.

### 2. Webpack setup

Please note that images specified in CSS are not collected in the bundle, because the corresponding Loader is not connected.

Use [url-loader](https://github.com/webpack-contrib/url-loader). Get a working build.


### 3. Field rendering

It's time to finally start connecting the gameplay. For this you have the GamePlay class. An object of this class has already been created, bound to the HTML page. You need to call the method `drawUi` with the desired theme to draw on the screen (call this method in a `init` class method `GameController`).

Topic names are fixed and listed in the module `themes.js`. Edit the module so that you can use the object defined in it (rather than write the lines manually each time). At this stage, it is enough to choose a topic `prairie`. In the task about levels, you will need to bind to the level:
* Level 1: prairie
* Level 2: desert
* Level 3: arctic
* Level 4: mountain

### 4. Drawing field boundaries

Note that the field looks like this by default:

![](https://i.imgur.com/JfmSroP.png)

It needs to look like this:

![](https://i.imgur.com/SbRwuAL.png)

To do this, in the module `utils.js`, add the implementation so that it returns strings:
* top-left
* top-right
* top
* bottom-left
* bottom-right
* bottom
* right
* left
* center

**Don't forget to write an auto-test for this feature.**

### 5. Team Generation

Write an implementation for the generator `characterGeneratorand` function `generateTeam` (module `generators`) following the rules described in the Character Generation section.

Please note: both input functions must take an array (or iterable) of classes (not string names, but classes).

### 6. Prohibition of creating objects `Character`

For a fairly significant portion of your time as a programmer, you will be doing research tasks (i.e. acquiring new skills rather than using existing ones). This is what we suggest you do. At the same time, remember how inheritance actually works in JavaScript

The class `Character` was designed as a base class so that you can inherit your characters from it. Therefore, it would be nice to prohibit the creation of objects of this class through `new Character(level)`, but the creation of heirs should work without problems:  `new Daemon(level)`, where `class Daemon extends Character`. Check out the documentation for [new.target](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/new.target) and implement similar logic by throwing an error in the constructor `Character`.

**Remember to write tests to ensure that an exception is thrown when an object of a class is created `Character` and not thrown when objects of inherited classes are created.**

P.S. Of course, in real life it's easier to agree and not do it anywhere `new Character`, but it's important for us that you remember about the inheritance structure.

### 7. Drawing commands

To draw, use the method `redrawPositions` that takes an array of their objects as input `PositionedCharacter`. To simplify any further change in the playing field (moving a character or his death), we suggest that you completely redraw the playing field using this method.

### 8. Displaying information about the character

`GamePlay` can notify you about events occurring with the playing field through the callback mechanism.

For the playing field, they are provided as follows:
1. Mouse pointer entry into field cell (`addCellEnterListener`)
1. Exit mouse pointer from field cell (`addCellLeaveListener`)
1. Mouse click on a field cell (`addCellClickListener`)

To add a "listener" to a specific event, use the methods indicated next to the event description, passing callback as an argument. Callback takes only one argument - the index of the field cell on which the event occurs.

You need to implement a mechanism for displaying brief information about the character using `tagged templates`(see the first lecture, example c `formatMark`).

How to do it:
1. From `GameController` subscribe to the event `cellEnter` (as a callback, pass the method `onCellEnter` from `GameController` - think about how to do it correctly, remember what methods in a class actually are and about `this`)

How it should look like:
```javascript
// GameController:
someMethodName() { // <- what is this method and where to put it, is on you
   this.gameplay.addCellEnterListener(this.onCellEnter);
}

onCellEnter(cellIndex) {
    // some logic here
}
```

2. When an event `cellEnter` occures, check if there is a character in the field, if there is, use the method `showCellTooltip` from the `GamePlay` class to display information
3. Hide the tooltip when an event `cellLeave` occurs (method `hideCellTooltip`)

![](https://i.imgur.com/SljJjE0.png)

Info format:
"🎖1 ⚔10 🛡40 ❤50", where:
* 1 - level
* 10 - attack
* 40 - defence
* 50 - life

🎖 U+1F396	 - medal (level)
⚔ U+2694 - swords (attack)
🛡 U+1F6E1 - shield (defence)
❤ U+2764 - heart (life)

**Don't forget to write tests against the tagged template.**

Important: the tooltip is shown only if there is a character in the field!

### 9. Character selection

It's time to teach the application how to choose a character for the next turn. To do this, you need to take several things into account:
1. You need to remember whose turn it is now: the player or the computer
1. It is necessary to respond to the user's click on a certain cell of the playing field

To store the state, we suggest you use objects of a special class `GameState` and store information about whose step is next in it (think for yourself how you will do this).


In order to respond to a click on a field cell, the class `GamePlay` implements a method `addCellClickListener` that takes callback as an argument. Subscribe from `GameController` to the event `cellClick` (as a callback, pass the method `onCellClick` from `GameController` - think about how to do it correctly, remember what methods in a class actually are and about `this`).

```javascript
// GameController:
someMethodName() { // <- what is this method and where to put it, is on you
   this.gameplay.addCellClickListener(this.onCellClick);
}

onCellClick(cellIndex) {
    // some logic here
}
```

In the method `onCellClick`, check if the cell contains a character and, most importantly, if it's a playable character (i.e. `Bowman`, `Swordsman` or `Magician`). If not, display an error message using a method `showError` from the `GamePlay`. If the character is playable, then you need to select a cell using a method `selectCell` from the class `GamePlay`:

![](https://i.imgur.com/HUlj3x7.png)

Note: `showError` works, of course, stupidly, just displaying `alert`, but that's what it is and Retro Game :).

Important: You can select only one character! If you select another (playable character), the selection is removed from the previous one (see the method `deselectCell` from the `GamePlay` class).

### 10. Visual response

Error messages are, of course, not bad. But it is much better when the user immediately receives a visual response.

If the player character is selected (in this case an archer), then further possible actions could be:
1. Choose another character (not considered - see the task above)
1. Move to another cell (within the allowed transitions)
1. Attack the enemy (within the allowed attack radius)
1. Invalid action (hovering over a cell that does not fall under the first three options)

You need to freely implement such logic. Wherein:
1. If we are going to select another character, then the field is not highlighted, and the cursor takes on the form `pointer` (see module `cursors` and method `setCursor` from `GamePlay`):

![](https://i.imgur.com/yNI25eV.png)

2. If we are going to move to another cell (within the allowed transitions), then the field is highlighted in green, the cursor takes the form `pointer`:

![](https://i.imgur.com/Je5zqN0.png)


3. If we are going to attack the enemy (within the allowable attack radius), then the field is highlighted in red, the cursor takes the form `crosshair`:

![](https://i.imgur.com/gUlSc6O.png)

4. If we are going to perform an illegal action, then the cursor takes the form `notallowed` (in this case, when clicking, an error message is also displayed):

![](https://i.imgur.com/O8QsL40.png)

**Don't forget to write auto-tests for the functions/methods that underlie steps 1-4**

### 11. Move

You have made a visual display, it's time to move on. Implement the logic associated with moving to `GameController` and update the characters displayed on the screen using the `redrawPositions`. Do not forget to remove the selection of cells and make the transition of the move.

### 12. Attack

It's time to attack. Implement the logic related to the attack in `GameController`: use the method `showDamage` from `GamePlay` to display the damage. Note that it returns `Promise` - make sure the damage animation gets to the end. Please note that after the attack, the life bar above the character must be recalculated (it is automatically recalculated in `redrawPositions`).

UPD: damage is calculated by the formula: `Math.max(attacker.attack - target.defence, attacker.attack * 0.1)`

### 13. Computer response

It's time for the computer to learn how to respond to the player's attacks. Implement one of the strategies for computer to attack the player characters discussed in the Homework, or come up with your own.

### 14. Game Loop

There is not much left: you make a move, the computer response. Make sure that the characters disappear after death (the field is freed), the damage is counted and everything continues until one of the opponents has at least one living character. At the end of the level, make sure that points are awarded to the user and a transition to a new level occurs with the generation of commands, levelUp's and restoration of life in accordance with the rules described in the "Mechanics" section.

### 15. Game Over, New Game and statistics

After the end of the game (the player has lost) or the completion of all 4 levels - the playing field must be blocked (i.e. not respond to events).

When you press the button `New Game`, a new game should start, but the maximum number of points scored for previous games should be saved in `GameState`.

To subscribe to `New Game` button click events, use the method `addNewGameListener` from the `GamePlay`.

### 16. State storage

Design and implement a class `GameState` (module `GameState`) that allows you to store all the information about the current state of the game. The information stored in it should be enough to save the full state of the game and recover from it.

The service `GameStateService` can use methods `save` and `load` to load the state from the browser's local storage on reload.

Make sure the game starts from the right point after the reboot.

Note that the method `load` can throw an error.

**Write an auto-test, with a mock for the method `load`, that checks how your application reacts to successful and unsuccessful loading (if the loading fails, a message from `GamePlay` should be displayed - think about how you will test this).**

### 17. Deployment

Your application is already good enough if you got to this point. You need to put your creation on the network. For this use [GitHub Pages](https://pages.github.com). In short, it is enough to create a branch with the name `gh-pages` in your repository and put there only the contents of the build (directory `dist`), and then push everything to GitHub. 

GitHub Pages will create a website at: https://< your login >.github.io/< name of repository >

Your application will be automatically deployed to the server (see tab `Environments`):
![](https://i.imgur.com/kHpYWyL.png)

The page will contain a link to the site itself and the deployment history:
![](https://i.imgur.com/ZnNVdFA.png)

### 18. Bonus: Time Killer

This task is not required!

Remove the 4-level limit and implement an infinite loop of levels. Keep the maximum score in the game state.
