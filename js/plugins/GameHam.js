//=============================================================================
// WELCOME HELL
//=============================================================================

var Imported = Imported || {};
Imported["GameHam"] = true;

var GameHam = GameHam || {};


// (function (_) { 
//   "use strict";
  
//   _.Game_Actor_setup= Game_Actor.prototype.setup;
//   Game_Actor.prototype.setup = function(actorId) {
//       _Game_Actor_setup.call(this, actorId);
//       this.initAltitude();
//   };

//   /*
//   for(var i = 0; i < $gameTroop._enemies.length; i++){
//     var enemyId = $gameTroop._enemies[i]._enemyId;
//     var selected = $gameTroop._enemies[i]._selected;
//   }*/

// })(GameHam); 

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

GameHam.spawnheight = 14;

GameHam.randomX = function() {
  return randomIntFromInterval(0,16);
}

/*
just some scratch for ui logic 

SceneManager._scene._itemWindow.visible

SceneManager._scene._actorCommandWindow.active

_itemWindow
_actorCommand

$gameParty.members()[1]._row
*/