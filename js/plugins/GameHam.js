//=============================================================================
// WELCOME HELL
//=============================================================================

const { debug } = require("console");

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

/*
  // Draw icon on battle menu
  var GameHam_Window_Command_prototype_drawItem = Window_Command.prototype.drawItem;
  Window_Command.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    var commandName = this.commandName(index);
    if(SceneManager._scene.constructor === Scene_Battle && commandName.contains("\\i[")){
      var arr = /\[\d+\]/.exec(commandName);
      var iconNum = 0;
      if (arr) {
          iconNum = parseInt(arr[0].slice(1));
          this.drawIcon(iconNum, rect.x-4, rect.y+2);
          commandName = commandName.slice(commandName.indexOf("]")+1);
      }
	  }
    this.drawText(commandName, rect.x, rect.y, rect.width, align);
  }; */

  GameHam.cycleStateIcon = function(partyMemberId) {
    //var s = $gameParty.members()[partyMemberId].states(); //priority
    //var highest = s.sort((a, b)=> a.priority - b.priority); 
    if(!$gameParty.members()[partyMemberId].states().length) return "Icons_0";
    var icon = $gameParty.members()[partyMemberId].states().sort((b, a)=> a.priority - b.priority)[0].iconIndex + 1;
    return "Icons_" + Math.min(icon, 200);
  } // $gameParty.members()[1].states().length

  // set custom escape formula
  var Game_Action_prototype_itemHit = Game_Action.prototype.itemHit;
  Game_Action.prototype.itemHit = function(target) {
    if(this.item().id === 5) {
      var chance = Math.max($gameTroop._enemies.map(e => (e.mhp - e.hp) / e.mhp).reduce((x,y)=>(x+y)) / $gameTroop._enemies.length, 0.0);
        console.log("success chance: " + chance);
        return chance;
    }
    Game_Action_prototype_itemHit.call(this, target);
  }

  // Fix escape when party member is dead
  var Game_Battler_prototype_refresh = Game_Battler.prototype.refresh;
  Game_Battler.prototype.refresh = function() {
    Game_Battler_prototype_refresh.call(this);
    if (this.hp === 0) {
      this.escape();
    }
  }

  var Game_BattlerBase_prototype_clearStates = Game_BattlerBase.prototype.clearStates;
  const deathStates = [1,11];
  Game_BattlerBase.prototype.clearStates = function() {
    if(this._states){
      this._states = this._states.filter(s => deathStates.includes(s));
    } else {
      this._states = [];
    }
    this._stateTurns = {};
  }

  GameHam.learnSkillFromClass = function(actorId, classId) {
    var actordata = $gameActors._data[actorId];
    var learnings = $dataClasses[classId].learnings;
    var skillsToLearn = [];
    for(var i = 0; i < learnings.length; i++){
      if(!actordata.hasSkill(learnings[i].skillId)) {
        skillsToLearn.push(learnings[i]);
      }
    }
    if(skillsToLearn.length) {
      var r = GameHam.randomIntFromInterval(0, skillsToLearn.length - 1);
      actordata.learnSkill(skillsToLearn[r].skillId);
      $gameVariables.setValue(8, $dataSkills[skillsToLearn[r].skillId].name);
    } else {
      // maybe print a sad message
    }
  }

})(GameHam); 

/*
just some scratch for ui logic 

SceneManager._scene._itemWindow.visible

SceneManager._scene._actorCommandWindow.active

_itemWindow
_actorCommand

$gameParty.members()[1]._row
($gameParty.members()[1]._row > 1) ? 'row_up' : 'row_down'
*/