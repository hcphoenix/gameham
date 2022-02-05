//=============================================================================
// WELCOME HELL
//=============================================================================

var Imported = Imported || {};
Imported["GameHam"] = true;

var GameHam = GameHam || {};

(function (_) { 
  "use strict";
  
  _.Game_Actor_setup= Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function(actorId) {
      _Game_Actor_setup.call(this, actorId);
      this.initAltitude();
  };
  // do the same for enemies 
  // Game_Enemy

  if (this.isActor()) {
      var rows = this.actor().defaultRow;
    } else if (this.isEnemy()) {
      var rows = this.enemy().defaultRow;
    }

    Game_Battler.prototype.initAltitude = function() {
      this._altitude = 0;
      if (this.isActor()) {
        this._altitude = this.actor().defaultAltitude;
      } else if (this.isEnemy()) {
        this._altitude = this.enemy().defaultAltitude;
      }
  };

})(GameHam); 


/*
just some scratch for ui logic 

SceneManager._scene._itemWindow.visible

SceneManager._scene._actorCommandWindow.active

_itemWindow
_actorCommand

$gameParty.members()[1]._row
*/