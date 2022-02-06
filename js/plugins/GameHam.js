//=============================================================================
// WELCOME HELL
//=============================================================================

var Imported = Imported || {};
Imported["GameHam"] = true;

var GameHam = GameHam || {};


(function (_) { 
  "use strict";

  GameHam.randomIntFromInterval = function(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  GameHam.spawnheight = 15;
  
  GameHam.randomX = function() {
    return this.randomIntFromInterval(0,16);
  }

  GameHam.randomParty = function() {
    this.party = [];
    var i = 0;
    while(i < 4) {
      var member = this.randomIntFromInterval(0,7);
      if(!this.party.includes(member)) {
        this.party.push(member);
        i++;
      }
    }
    return this.party;
  }
})(GameHam); 

/*
just some scratch for ui logic 

SceneManager._scene._itemWindow.visible

SceneManager._scene._actorCommandWindow.active

_itemWindow
_actorCommand

$gameParty.members()[1]._row
*/