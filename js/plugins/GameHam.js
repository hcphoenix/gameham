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
  // THIS MAY NOT BE NEEDED AFTER SWITCHING TO PARTY ESCAPE
  var Game_Action_prototype_itemHit = Game_Action.prototype.itemHit;
  Game_Action.prototype.itemHit = function(target) {
    if(this.item().id === 5) {
      var chance = Math.max($gameTroop._enemies.map(e => (e.mhp - e.hp) / e.mhp).reduce((x,y)=>(x+y)) / $gameTroop._enemies.length, 0.0);
      return chance;
    }
    Game_Action_prototype_itemHit.call(this, target);
  }

  GameHam.displayBattleText = function(text, time, timePerLine = 0) {
    if (!$gameParty.inBattle()) return;
    var scene = SceneManager._scene;

    if (text === '') return;
    if (!scene._logWindow) return;

    var win = scene._logWindow;

    // text wrapping
    var words = text.split(' ');
    var lines = [""];
    var pos= 0;
    for(var i = 0; i < words.length; i++) {
        if(lines[pos].length + words[i].length < Yanfly.BEC.maxChar){
            lines[pos] += words[i] + " ";
        } else {
            pos++;
            lines[pos] = words[i] + " ";
        }
    }
    for(var i = 0; i < lines.length; i++) {
      win._lines.push('<CENTER>' + lines[i] );
      win._waitCount += timePerLine;
    }
    win._waitCount += time;
    win.push('wait');
    win.refresh();
};
  // Fix escape when party member is dead
  var Game_Battler_prototype_refresh = Game_Battler.prototype.refresh;
  Game_Battler.prototype.refresh = function() {
    Game_Battler_prototype_refresh.call(this);
    if (this.hp === 0 && !this._jacob_says_im_dead) {
      this._jacob_says_im_dead = true;
      GameHam.displayBattleText(this._name + " perished in battle", 70);
      if($gameParty.allMembers().length > 1) {
        this.escape();
        this.addState(this.deathStateId());
        $gameParty.removeActor(this._actorId);
      } else {
        // quick fix
        this.addState(this.deathStateId());
        BattleManager._escaped = false;
        BattleManager.processDefeat();
        BattleManager.updateBattleEnd();
      }
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
      $gameMessage.add("No more skills to learn!");
    }
  }


  Object.defineProperties(Game_BattlerBase.prototype, {
    // pursuit damage
    pstdmg: { value: "_mdf", writable: true }
  });

  // no longer needed
  GameHam.GetEscapeChance = function () {
    return Math.max($gameTroop._enemies.map(e => (e.mhp - e.hp) / e.mhp).reduce((x,y)=>(x+y)) / $gameTroop._enemies.length, 0.0);
  }

  GameHam.GetPursuitDamage = function () {
    return $gameTroop._enemies.map(e => e.mdf - (e.mhp - e.hp)).reduce((x,y)=>(x+y), 0);
  }

  var BattleManager_processEscape = BattleManager.processEscape;
  BattleManager.processEscape = function() {
    $gameMessage.newPage();
    let pstdmg = GameHam.GetPursuitDamage();
    $gameMessage.add("Escape and take " + pstdmg +" damage?");
    $gameMessage.setChoices(["Yes", "No"], 0, 1);
    //$gameMessage.setChoiceBackground(background);
    //$gameMessage.setChoicePositionType(positionType);
    $gameMessage.setChoiceCallback(function(n) {
      SceneManager._scene._messageWindow._choiceWindow.close();
      if(n == 0) {
        $gameParty.performEscapeSuccess();
        SoundManager.playEscape();
        let chance = GameHam.GetEscapeChance();
        
        $gameMessage.add($gameParty.name() + " flew away!");
        this._escaped = true;
        SceneManager._scene._actorCommandWindow.processCancel();
        BattleManager.processAbort();
      } else {
        //$gameVariables.setValue($gameMessage.itemChoiceVariableId(), 0);
        //SceneManager._scene._messageWindow.hide();
        SceneManager._scene._messageWindow.terminateMessage();
        SceneManager._scene._actorCommandWindow.activate();
        SceneManager._scene._actorCommandWindow.processCancel();
      }
    });

    return false;
  };

  

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