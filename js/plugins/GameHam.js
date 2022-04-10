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

  Game_BattlerBase.prototype.pursuitDamage = function () {
    return Math.floor(this.mdf * (this.hp / this.mhp));
  }

  GameHam.GetPursuitDamage = function () {
    return $gameTroop._enemies.map(e => e.pursuitDamage()).reduce((x,y)=>(x+y), 0);
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

  //draw row limitations in skill cost
  GameHam.dOC = Window_SkillList.prototype.drawOtherCost;
  Window_SkillList.prototype.drawOtherCost = function(skill, wx, wy, dw) {
      //landed only
      if (!skill.rowOnly.contains(2)) {
        var iw = wx + dw - Window_Base._iconWidth;
        this.drawIcon(11, iw, wy + 2);
        dw -= Window_Base._iconWidth + 2;
      }
      //flying only
      if (!skill.rowOnly.contains(1)) {
        var iw = wx + dw - Window_Base._iconWidth;
        this.drawIcon(10, iw, wy + 2);
        dw -= Window_Base._iconWidth + 2;
      }
      return GameHam.dOC.call(this, skill, wx, wy, dw);
  };

  GameHam.printScanMessage = function(target) {
    $gameSystem._messageRows = 12;
    $gameMessage.setPositionType(1);
    var id = target._enemyId;

    var text = '\\TS[0]' + target.name() + '\n';
    text += '\\>\\px[9]\\c[23]' + (target.mhp - target.hp) + '/' + target.mhp;
    text += ' \\c[0]Fear';
    text += '\\px[90]\\c[4]Exposure:\\c[23] ' + (target.mmp - target.mp);
    text += '/' + target.mmp;
    text += '\\px[90]\\c[4]Hatred:\\c[23] ' + target.tp;
    text += '\n';
    text += '\\px[90]\\I[64]\\c[23] ' + target.atk + '\\c[0]Aggression';
    text += '\\px[90]\\I[65] \\c[4]Chutzpah:\\c[23] ' + target.def;
    text += '\n';
    text += '\\px[90]\\I[66] \\c[4]Ascetism:\\c[23]      ' + target.mat;
    text += '\\px[90]\\I[68] \\c[4]Speed:\\c[23]    ' + target.agi;
    text += '\n';
    text += '\\px[45]\\I[70] \\c[4]Dodge:\\c[23] ' + (target.eva * 100) + '%';
    text += '\\px[45]\\I[71] \\c[4]Aim:\\c[23] ' + (target.hit * 100) + '%';
    text += '\\px[45]\\I[72] \\c[4]Cool:\\c[23] ' + (target.cri * 100) + '%';
    $gameMessage.add(text);
  
    var weakness = '';
    var resist = '';
    var immune = '';
    var absorb = '';
    var elements = $dataSystem.elements;
    for (var i = 1; i < elements.length; ++i) {
      var name = elements[i];
      var rate = target.elementRate(i);
      if (rate > 1) {
        weakness += name + ' ';
      } else if (rate < 0) {
        absorb += name + ' ';
      } else if (rate === 0) {
        immune += name + ' ';
      } else if (rate < 1) {
        resist += name + ' ';
      }
    }
    if (weakness === '') weakness = '\\c[18]nothing';
    if (resist === '') resist = '\\c[18]nothing';
    if (immune === '') immune = '\\c[18]nothing';
    if (absorb === '') absorb = '\\c[18]nothing';
    weakness = '\\c[4]Weak to\\c[1] ' + weakness + '\n';
    resist = '\\c[4]Resists\\c[1] ' + resist + '\n';
    immune = '\\c[4]Immune to\\c[1] ' + immune + '\n';
    absorb = '\\c[4]Absorbs\\c[1] ' + absorb;
    text = weakness + resist + immune + '\\c[0]';
    $gameMessage.add(text);

    target.stealableItems().filter(i => !i.isStolen).forEach(item => {
      $gameMessage.add('\\ii[' + item.id + ']');
    });
  };

  GameHam.ChangeDiceFace = function (newFace) {
    let dice = $gameScreen._dice_picture_3d_array[0][0][0];

    // this is part of an animation handled in update pictures
    let offset = 25; // distance to travel down
    dice._returnY = dice._y; // place to return to
    dice.show("dice_"+newFace, 0, dice._x, dice._y - offset, 100, 100, 255, 0);
    for(let i = 1; i <= 5; i++) {
        $gameScreen._pictures[i]._opacity = 0;
    }
    $gameScreen._pictures[6] = dice;
    $gameScreen._pictures[6]._opacity = 255;
    GameHam._dice = dice;
  };

  let _GH_Game_Screen_updatePictures = Game_Screen.prototype.updatePictures;
  Game_Screen.prototype.updatePictures = function() {
    // update the gameham dice with our little animation
    if(GameHam._dice && GameHam._dice._y < GameHam._dice._returnY) {
      GameHam._dice.show(GameHam._dice._name, 0, GameHam._dice._x, GameHam._dice._y + 3, 100, 100, 255, 0);
    }
    _GH_Game_Screen_updatePictures.call(this);
  };

  // Here's where we'll be handling map skills

  // Indexed by classid
  GameHam.MapSkills = [
      { // 1 - Pigeon
        name: "Pigeon Skill",
        help_text: "Placeholder help text",
        common_event_id: -1,
      },
      { // 2 -  Seagull
        name: "Seagull Skill",
        help_text: "Placeholder help text",
        common_event_id: -1,
      },
      { // 3 - Raven
        name: "Raven Skill",
        help_text: "Placeholder help text",
        common_event_id: -1,
      },
      { // 4 - Vulture
        name: "Vulture Skill",
        help_text: "Placeholder help text",
        common_event_id: -1,
      },
      { // 3 - Raven
        name: "Raven Skill",
        help_text: "Placeholder help text",
        common_event_id: -1,
      },
      { // 5 - Turkey
        name: "Turkey Skill",
        help_text: "Placeholder help text",
        common_event_id: -1,
      },
      { // 6 - Parrot
        name: "Parrot Skill",
        help_text: "Placeholder help text",
        common_event_id: -1,
      },
      { // 7 - Penguin
        name: "Penguin Skill",
        help_text: "Placeholder help text",
        common_event_id: -1,
      },
      { // 8 - Cassowary
        name: "Cassowary Skill",
        help_text: "Placeholder help text",
        common_event_id: -1,
      },
  ];

  GameHam.GetPartyMapSkills = function () {
    let classIds = $gameParty.members().map(m => m._classId);
    return GameHam.MapSkills.filter((_, c) => classIds.contains(c)).map(s=> s.name);
  };

  GameHam.ShowMapSkillMenu = function () {
    $gameMessage.add("Use a map skill before rolling?");
    $gameMessage.setChoices(["No", ...GameHam.GetPartyMapSkills(), "Cancel"], 0, 1);
    
    // This might need to change depending on how you want to reserve common events haley
    $gameMessage.setChoiceCallback(function(n) {
        // n == 0 means we do nothing since we just roll next
        let ret = 1; // return code of 0 for go ahead and roll

        // Reserve the common event attached to the class skill
        if(n > 1 && n <= $gameParty.members().length) {
            let event = GameHam.MapSkills[n].common_event_id;
            // Dont bother with placeholder events, and here is a case where I may add
            // another member to the map skill object thats a function pointer to run
            if(event >= 0) $gameTemp.reserveCommonEvent(event);
        }

        // Cancel the roll
        if(n > $gameParty.members().length) ret = -1;

        // We want to set a game variable to the return code to be handled on the rpgmaker side
        $gameVariables.setValue(30, ret);
    });
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