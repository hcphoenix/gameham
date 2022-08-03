//=============================================================================
// WELCOME HELL
//=============================================================================
var Imported = Imported || {};
Imported["GameHam"] = true;

var GameHam = GameHam || {};

GameHam.Season = 'Spring';
GameHam.Branch = '';

(function (_) { 
  "use strict";

  Array.prototype.pick = function () {
    return this[Math.floor((Math.random()*this.length))];
  }

  Array.prototype.pickMany = function (x) {
    let arr = [];
    for(let i = 0; i < x; i++) {
      arr.push(this.pick());
    }
    return arr;
  }

  GameHam.randomIntFromInterval = function(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  GameHam.spawnheight = 15;
  
  GameHam.randomX = function() {
    return this.randomIntFromInterval(0,16);
  }

  GameHam.randomParty = function(count) {
    $gameParty._actors = [];

    var i = 0;
    while(i < count) {
      var member = this.randomIntFromInterval(0,7);
      let id = (member*3)+1;
      if(!$gameParty._actors.includes(id)) {
        $gameParty.addActor(id);
        i++;
      }
    }

    return $gameParty._actors;
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
      win.push('addText', '<CENTER>' + lines[i] );
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
    if (!this.isEnemy() && this.hp === 0 && !this._jacob_says_im_dead) {
      this._jacob_says_im_dead = true;
      //GameHam.displayBattleText(this._name + " perished in battle", 70);
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
    let max = (this.mhp / 2);
    let cur = (this.hp - max);
    return Math.max(0, Math.floor(this.mdf * (cur / max)));
  }

  GameHam.GetPursuitDamage = function () {
    return $gameTroop._enemies.map(e => e.pursuitDamage()).reduce((x,y)=>(x+y), 0);
  }
/*
  var BattleManager_processEscape = BattleManager.processEscape;
  BattleManager.processEscape = function() {
    $gameMessage.newPage();
    let pstdmg = GameHam.GetPursuitDamage();
    $gameMessage.add("Escape and take " + pstdmg +" damage?");
    $gameMessage.setChoices(["Yes", "No"], 0, 1);
    //$gameMessage.setChoiceBackground(background);
    //$gameMessage.setChoicePositionType(positionType);
    $gameMessage.setChoiceCallback(function(n) {
      if(n == 0) {    
        $gameMessage.add($gameParty.name() + " flew away!");
        this._escaped = true;
        $gameParty.performEscapeSuccess();
        SoundManager.playEscape();
        SceneManager._scene._actorCommandWindow.processCancel();
        BattleManager.processAbort();
        $gameTemp.reserveCommonEvent(54);
      } else {
        SceneManager._scene._messageWindow._choiceWindow.close();
        SceneManager._scene._messageWindow.terminateMessage();
        SceneManager._scene._actorCommandWindow.activate();
        SceneManager._scene._actorCommandWindow.processCancel();
      }
    });

    return false;
  };
*/
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

  GameHam.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function() {
    if (!GameHam.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!GameHam._loaded_scan_bio) {
        let exp = /<(?:BIO: )(.+)>/i;
        for (var n = 1; n < $dataEnemies.length; n++) {
            var notedata = $dataEnemies[n].note;
            
            if(notedata.match(exp)) {
                let bio = RegExp.$1;
                $dataEnemies[n].bio = bio;
            }
        }
        GameHam._loaded_scan_bio = true;
    }
    return true;
  };

  GameHam.printScanMessage = function(target) {
    $gameSystem._messageRows = 20;
    $gameMessage.setPositionType(0);
    $gameMessage.setBackground(1);

    var text = '\\TS[0]<WordWrap>';
    //there's a bug with WordWrap where colors are cleared after each space so we have to get stupid
    target.name().toUpperCase().split(' ').forEach(e => text += `\\c[63]${e} `);
    text += `<br>\\c[0]${$dataEnemies[target._enemyId].bio}<br>`;
    text += `\\px[30]\\I[64] \\c[23]${target.atk} \\c[0]Aggression`;
    text += `\\px[30]\\I[65] \\c[23]${target.def} \\c[4]Chutzpah`;
    text += `\\px[30]\\I[68] \\c[23]${target.agi} \\c[4]Speed`;
    text += '<br>';
    text += `\\px[30]\\I[70] \\c[23]${target.eva * 100}% \\c[4]Dodge`;
    text += `\\px[81]\\I[71] \\c[23]${target.hit * 100}% \\c[4]Aim`;
    text += `\\px[60]\\I[72] \\c[23]${target.cri * 100}% \\c[4]Cool`;
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
    weakness = `\\c[4]Weak to \\c[1]${weakness}, `;
    resist = `\\c[4]Resists \\c[1]${resist}, `;
    immune = `\\c[4]Immune to \\c[1]${immune}`;
    text = weakness + resist + immune + '\\c[0]<br>';
    $gameMessage.add(text);

    $gameMessage.add('The target is carrying:<br>')
    target.stealableItems().filter(i => !i.isStolen).forEach(item => {
      $gameMessage.add(`\\ii[${item.id}]<br>`);
    });

    $gameSystem.setWindowskin('Window');
  };

  // DICE STUFF
  function Dice_Picture() {
    this.initialize.apply(this, arguments);
  };

  Dice_Picture.prototype = Object.create(Game_Picture.prototype);
  Dice_Picture.prototype.constructor = Dice_Picture;

  Dice_Picture.prototype.initialize = function () {
    Game_Picture.prototype.initialize.call(this);
    this._rolling = false;
    this._roll_frame = 0;
    this._changing = false;
    // This could be shrunk to a single number if I was good at math
    this._throw_counter = 0;
    this._bounces = 0;
    this._throwing = false;
  };

  Dice_Picture.prototype.animationSpeed = function () {
    return 3;
  };

  Dice_Picture.prototype.update = function () {
    Game_Picture.prototype.update.call(this);

    if(this._rolling) {
      this._name = "DiceRoll_" + (1 + Math.floor(this._roll_frame / this.animationSpeed()));
      this._roll_frame = (this._roll_frame + 1) % (3 * this.animationSpeed());
    }

    if(this._throwing) {
      if(this._throw_counter <= -20) {
        this._bounces--;
        if(this._bounces <= 0) {
          this._rolling = false;
          this._name = "Dice_" + this._face_num;
          this._throwing = false;
        } else {
          this._throw_counter = 20;
        }
      }
      
      let h = Math.abs(this._throw_counter * ( this._throw_counter > 0 ? this._bounces + 1 : this._bounces));

      this._y = this._y_org - (h * (h/2)) / 25;

      this._throw_counter--;
    }

    if(this._changing) {
      this._y+=5;
      if (this._y_org <= this._y) {
        this._y = this._y_org;
        this._changing = false;
        this._rolling = false;
        this._name = "Dice_" + this._face_num;
      }
    }
  };

  GameHam.GetDice = function() {
    if(GameHam._dice) {
      return $gameScreen._pictures[GameHam._dice];
    } else {
      return null;
    }
  };

  GameHam.ShowDice = function (x, y, rolling, face_num) {
    let dice = GameHam.GetDice();
    if(!dice) {
      dice = new Dice_Picture();
      GameHam._dice = $gameScreen._pictures.length;
      $gameScreen._pictures[GameHam._dice] = dice;
    }

    dice._rolling = rolling;
    dice._x = x;
    dice._y = y;
    dice._y_org = dice._y;
    dice._opacity = 255;

    if(!rolling) {
      GameHam.ChangeDiceFace(face_num);
    }
  };

  GameHam.ChangeDiceFace = function (face_num) {
    let dice = GameHam.GetDice();
    if(dice) {
      if(this._face_num == face_num) return;
      dice._face_num = face_num;
      dice._changing = true;
      dice._rolling = true;
      dice._y -= 50;
    }
  };

  GameHam.RemoveDice = function () {
    let dice = GameHam.GetDice();
    if(dice) {
      $gameScreen._pictures[GameHam._dice] = null;
      GameHam._dice = null;
    }
  }

  GameHam.ThrowDice = function () {
    let dice = GameHam.GetDice();
    if(dice) {
      dice._rolling = true;
      dice._throw_counter = 20;
      dice._throwing = true;
      dice._bounces = 3;
      dice._face_num = Math.floor(Math.random() * 6) + 1;
      $gameVariables._data[25] = dice._face_num;
    }

    // Set steps remaining
    // $gameVariables._data[22] = $gameVariables._data[25] * 2

    return 0;
  }

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
      {}, // Empty for zero
      { // 1 - Pigeon
        name: "Pigeon Skill",
        help_text: "Placeholder help text for Pigeon Skill",
        common_event_id: -1,
        vn_choice: 17,
      },
      { // 2 -  Seagull
        name: "Seagull Skill",
        help_text: "Placeholder help text for Seagull Skill",
        common_event_id: -1,
        vn_choice: 13,
      },
      { // 3 - Raven
        name: "Raven Skill",
        help_text: "Placeholder help text for Raven Skill",
        common_event_id: -1,
        vn_choice: 14,
      },
      { // 4 - Vulture
        name: "Vulture Skill",
        help_text: "Placeholder help text for Vulture Skill",
        common_event_id: -1,
        vn_choice: 18,
      },
      { // 5 - Turkey
        name: "Turkey Skill",
        help_text: "Placeholder help text for Turkey Skill",
        common_event_id: -1,
        vn_choice: 19,
      },
      { // 6 - Parrot
        name: "Parrot Skill",
        help_text: "Placeholder help text for Parrot Skill",
        common_event_id: -1,
        vn_choice: 20,
      },
      { // 7 - Penguin
        name: "Penguin Skill",
        help_text: "Placeholder help text for Penguin Skill",
        common_event_id: -1,
        vn_choice: 16,
      },
      { // 8 - Cassowary
        name: "Cassowary Skill",
        help_text: "Placeholder help text for Cassowary Skill",
        common_event_id: -1,
        vn_choice: 15,
      },
  ];

  GameHam.GetPartyMapSkills = function () {
    let classIds = $gameParty.members().map(m => m._classId);
    return classIds.map(id => GameHam.MapSkills[id]);
  };

  GameHam.ShowMapSkillMenu = function () {
    //$gameMessage.add("Use a map skill before rolling?");
    let mapSkills = GameHam.GetPartyMapSkills();
    $gameMessage.setChoices(["\\b[12]Normal Roll", ...mapSkills.map(s => `\\b[${s.vn_choice}]${s.name}`), "\\b[11]Cancel"], 0, 1);
    $gameMessage.setChoicePositionType(1);
    $gameMessage.setChoiceBackground(0);
    // Enable help window
    Eli.HelpWindows.parameters.choice.contents = ["Roll normally without using any skills.", ...mapSkills.map(s => s.help_text), "Return to the main menu"].map(t => {return {text: t};});
    $gameSwitches.setValue(10, true);
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

        // Clear choice help 
        $gameSwitches.setValue(10, false);
        Eli.HelpWindows.parameters.choice.contents = [];

        // Handle callbacks and such
        $gameTemp.reserveCommonEvent(6);
    });
  };

  GameHam.roundPixel = function(n) {
    return Math.round(n/3.0) * 3;
  };

  // Tile Ids for each space type
  // that the player can land on
  GameHam.Spaces = {
    CYOA: 4,
    SHOP: 12,
    INN: 20,
    WEATHER: 28,
    CRYSTAL: 36
  }

  GameHam.showPicture = function(id, path, x=0, y=0, opacity=255) {
    $gameScreen.showPicture(id, path, 0, x, y, 100, 100, opacity, 0);
  }

  GameHam.HandleSpace = function() {
    let currentTile = $gameMap.tileId($gamePlayer.x, $gamePlayer.y, 3);
    switch (currentTile) {
      case GameHam.Spaces.CYOA: {
        // Do the frame and stuff:
        $gameScreen.showPicture(15, "frames/cyoa", 0, 0, 0, 100, 100, 255, 0);
        $gameSystem.setWindowskin('Window_CYOA');

        // This is subject to change but lets say
        // any event over 100 is elegable
        let events = $dataCommonEvents.filter((event, id) => id > 99 && event.name != "");
        let event = events.pick();
        $gameTemp.reserveCommonEvent(event.id);
        break;
      }
      case GameHam.Spaces.SHOP: {
        GameHam.HandleShop();
        break;
      }
      case GameHam.Spaces.WEATHER: {
        // Determine the area and add a weather effect
        const weatherCommonEvent = 50;
        $gameTemp.reserveCommonEvent(weatherCommonEvent);
        break;
      }
      case GameHam.Spaces.INN: {
        const innCommonEvent = 51;
        $gameTemp.reserveCommonEvent(innCommonEvent);
        break;
      }
    }
  };

  GameHam.EndCYOA = function() {
    $gameScreen.erasePicture(15);
    $gameSystem.setWindowskin('Window');
    //unfade i guess
  }

  GameHam.ShopItems = [
    {
      id: 1,
      price: 20,
      type: "item",
      condition: (merchant) => merchant.name == "Doug Horsehead"
    },
    {
      id: 2,
      type: "item",
      price: 0,
    },
    {
      id: 1,
      type: "weapon",
      price: 100,
    },
    {
      id: 4,
      type: "item",
      price: 100,
    },
  ];

  GameHam.ShopKeepers = [
    {
      name: "Doug Horsehead",
      face_id: 0,
      messages: [
        "Hey whats up sluts welcome to Doug Horseheads \nbirdseed emporium where you can buy drugs for birds.\n I dont even know what that means.",
        "Welcome back, perhaps theres a smart way to \nrecord how many times youve been here",
      ],
      cantAfford: "You better not be trying to cheat me.\n Come back when you have coin.",
      farewell: "* shrill whinnying *"
    },
    {
      name: "Shew'd Merchant",
      face_id: 1,
      messages: [
        "Ah, come in come in. \nYou seem like a keen eyed bunch,\n take some time and browse my wares.",
      ],
      cantAfford: "You can't afford that!",
      farewell: "Do make sure to come back now",
    },
    {
      name: "LITERALLY HALEY",
      face_id: 7,
      messages: [
        "NEED SOMETHIN?",
      ],
      cantAfford: ":c",
      farewell: " * discord drops * ",
    },

  ];

  // Move through the messages a shop keep has to offer
  // IDK could be cool might not get some use, it wont do anything if theres just one message anyway
  GameHam.SelectShopMessage = function (keeper) {
    let num = keeper.visitedCount || 0;
    let msg = keeper.messages[num];
    if(num < keeper.messages.length - 1) {
      keeper.visitedCount++;
    }
    return msg;
  }

  GameHam.GetShopItem = function (shopItem) {
    let id = shopItem.id;
    let item;
    switch (shopItem.type) {
      case "item": item = $dataItems[id]; break;
      case "weapon": item = $dataWeapons[id]; break;
      case "armor": item = $dataArmors[id]; break;
    }
    return item;
  }

  GameHam.Temp = {};
  GameHam.HandleShop = function (shopKeeper) {
    $gameScreen.showPicture(16, "frames/shop", 0, 15, 15, 100, 100, 255, 0);
    $gameSystem.setWindowskin('Window_CYOA');

    shopKeeper = shopKeeper || GameHam.ShopKeepers.pick();

    let shopItems = GameHam.ShopItems.filter(s => s.condition ? s.condition(shopKeeper) : true).pickMany(3);
    GameHam.Temp.shopItems = shopItems;
    GameHam.Temp.shopKeeper = shopKeeper;
    GameHam.Temp.shopMessage = GameHam.SelectShopMessage(shopKeeper);
    $gameTemp.reserveCommonEvent(52);
  }

  GameHam.RunShopLoop = function () {
    let shopItems = GameHam.Temp.shopItems;
    let shopKeeper = GameHam.Temp.shopKeeper;
    let shopMessage = GameHam.Temp.shopMessage;

    $gameMessage.add(shopMessage);
    $gameMessage.setFaceImage("Merchants", shopKeeper.face_id);
    $gameMessage.setChoices([...shopItems.map(s => GameHam.GetShopItem(s).name), "I'm good thanks."], 0, 1);
    // set help text
    // Eli.HelpWindows.parameters.choice.contents = 
    $gameMessage.setChoiceCallback(function(n) {
      if(n < shopItems.length) {
        // Give the player item if they can afford it
        if(shopItems[n].price < $gameParty._gold) {
          $gameParty._gold -= shopItems[n].price;
          let item = GameHam.GetShopItem(shopItems[n]);
          $gameParty.gainItem(item, 1);
        } else {
          // if the player cant afford loop the screen until
          // they choose something they can or leave
          GameHam.Temp.shopMessage = shopKeeper.cantAfford;
          $gameTemp.reserveCommonEvent(52);
          return;
        }
      }
      // shop exit event
      $gameTemp.reserveCommonEvent(53);
    });
  }

  // Sets the sprite bitmap to be a frame of a characters aniamtion
  GameHam.SetCharacterFrameOnSprite = function(sprite, actor, frame = 0, animation_type = 0) {
    sprite.bitmap = ImageManager.loadCharacter(actor.characterName);
    let blockX = actor.characterIndex % 4 * 3;
    let blockY =  Math.floor(actor.characterIndex / 4) * 4;
    sprite.setFrame((blockX + frame) * 48, (blockY + animation_type) * 48, 48, 48);
  }

  // Get the junk/armor flavor text for a given class and armor
  GameHam.GetJunkMessage = function(classId, armorId) {
    let msg = Object.values($dataJunk[armorId])[classId];
    // Default if nothing
    if (msg === " ") {
      msg = Object.values($dataJunk[0])[classId];
    }
    return msg;
  }

  GameHam.GetNegotiateMessage = function(id,key) {
    return $dataNegotiate[id][key];
  }

  const GetAccessTokenFromServiceAccount = (function () {
    const _url = "https://www.googleapis.com/oauth2/v4/token";
    const _grant_type = "urn:ietf:params:oauth:grant-type:jwt-bearer";
  
    function _main(_obj) {
      return new Promise((resolve, reject) => {
        const { private_key, client_email, scopes } = _obj;
        if (!private_key || !client_email || !scopes) {
          throw new Error(
            "No required values. Please set 'private_key', 'client_email' and 'scopes'"
          );
        }
        const header = { alg: "RS256", typ: "JWT" };
        const now = Math.floor(Date.now() / 1000);
        const claim = {
          iss: client_email,
          scope: scopes.join(" "),
          aud: _url,
          exp: (now + 3600).toString(),
          iat: now.toString(),
        };
        if (_obj.userEmail) {
          claim.sub = _obj.userEmail;
        }
        const signature =
          btoa(JSON.stringify(header)) + "." + btoa(JSON.stringify(claim));
        const sign = new JSEncrypt();
        sign.setPrivateKey(private_key);
        const jwt =
          signature + "." + sign.sign(signature, CryptoJS.SHA256, "sha256");
        const params = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assertion: jwt,
            grant_type: _grant_type,
          }),
        };
        fetch(_url, params)
          .then((res) => res.json())
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    }
  
    return { do: _main };
  })();

  GameHam.blob = 'eyJ0eXBlIjoic2VydmljZV9hY2NvdW50IiwicHJvamVjdF9pZCI6ImdhbWVoYW0tMzU4MzE2IiwicHJpdmF0ZV9rZXlfaWQiOiIzM2E2MzQ3NDEzYzBlMmI0Y2NkYWU5NDBkYTgyNGFjMGE4Zjk4NDFmIiwicHJpdmF0ZV9rZXkiOiItLS0tLUJFR0lOIFBSSVZBVEUgS0VZLS0tLS1cbk1JSUV2Z0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktnd2dnU2tBZ0VBQW9JQkFRQ1RuUWZ5VEo4QzhTY0JcbnVFeUlsNS92NE5yN2lyNWdsU1BFWS8zM0QvNE5hMDIzMDR5cGJxakhnekpMb0MrajhRSU5wL1ZWMEpicVQ4YVdcbkg0MWs1T0UxZmFQOEF2UURNaitjeEFEWlA3V2I1dUxQSi9oendieDdGallkZmY0VjlaSkR0Zm9MRFowbWhRNUdcbjlGMjJKbWJWVlVBaW4xOEQ5U0tlTGVPcWxDR0dQN1BVVTlING9tZjNwQkRyaU1Gd3h4OEZ0UGJyaGJ5ZElscDZcblNVN0IwVzZNNFJremVsR2wxTkI1dHpLOElWb2U1YmFnZzIzYVU3SFp3RVRvYjNISkxZRWRZQ1pFTjZwcnNVaE9cbi9Md29RazBWZ3FJemhLcDI1b254ZGZiMUhiZW5NdjIvdExxNmpuWEwxRWwrTHBhV1dLdFZ3TjFSQ080aERKYjBcbmgxZUZsUW43QWdNQkFBRUNnZ0VBQVl2WERmZzBnRFRqZWphaWdwbklBSnpEM25ldEY5am9GNElPb254bDVtRVZcbjN0T1YrUjVpSVRqa0dYdXpsQTJOdm5QZ2M0WXNWb2NBWndrc2szNThSM0dwK3BWVFZnYzhPRm1yUXB0U3ZTL1ZcbmQyTU5UTFVlVXRIQVBsM1lBQVhqQXRlUXAzWDhpKzgvMzRsbXcrWXlGSkVBaTN4TTQvODQzaHhQOHJUN2h1cjJcbjFpUXBoc0w2UUErOW9IRFY0YU8vYWFQNTdWWS9sTjFJOTIwODkyK0FzS0tqRzdXemRQWmZCZStab21Nb2hTWm5cbk1Lc2daQ1NHMThINU5pdzIvb1RvZlJTQ0c3SjBjSW5oa3VxOXVYZVJYUGJnamV4dTlKQjV1WUdGMkRIY0tYeWJcbnQrNzNiZXJqQWFNWUFjMGEwa0pQK21YSXNuR0hZNjI5b0RhUDIzek4wUUtCZ1FERUtPWjhmdjNTWCt2VEVQcVRcbmlQZGwxMjV0OTJGS0VJVTVwZ0lyUUZ2Q0xOc0d4aHhBcWtaa2o1RUlEeVMxYUdTSHFXdExPQ1RuQ1Y4Q0pVc1pcbnQ3eGo5d2pleWloL0tBZzZRMVpubzFsSWdON3ZXZ2NXb1haRjBOQWt4YXNIS3AzTWxXb1JUclJTRFJQVWw3M2pcbkxYZTdtWUNmdnc0VXFjck1vdDNrbUthOUN3S0JnUURBcE9iV3R5dkNJKytNU0dQcnVWWWk4UGxSZGRrbW51K2FcbmdRc2tBQktldG1wNnRpZS9FWjgxSzF5VnRGWDlLY0xmNGVneDBvRTF1MkVWOVlMLytaeTlzTEMwMlNCMVNlRlNcblhOTm1KNU1nV2FGMFJwSHlMZ2VPNXZFRWNrN3huYXV0SkJIWVE2V1dsMTl5Zy9PTGp6ejBzUGROVlh3ZnJtWUlcbi9BS01GQWFjMFFLQmdRQzBUVi9tQ1JnbldkRzZ0UDJOeExTYUlKVzVjRXcxdHMrdU9ILy8zMjA0SXVERDdpOGpcbjVSOUU2WTJHbWR6RS9ncUJnK0ZDUjMzcit2b2dUOFVqQTNhZmIvN3dRV05OMWE4U1ZyakNGQ3hKNzJKN0lRWW9cbjhBcDFpOFQyTjliSGhJMTg4YzJIMFE3LzZGTlU4cEV3a3FkZWdXN3Y1cjM3a2tIOUxLckdwdVdFRndLQmdEMUpcbnVTOENZMmVHYTBXa0dqWDZaczhDL3k3TllXS0tHZ3g3bFlIRWpDZjJQUFlCVWEvVitXSy9BdHVWM2UySEJicVlcbmNuaTNVZWc0VHZEZmhPZlBEL0RCYjlaNVpYd3JId1pIQmZKd0VMeXdCMCtveS9IU2R4RWRvL3dZS2Nsd3NoZUpcbmJDdnppWkRaWThKWS9IaWYvM0tSZ253V0FFRk1DS1kvRnNoZDdxU2hBb0dCQUw5NUNqVWxhRUVQQzd1MUIxbm1cbkhqeHRFNHJjOFhQY0NPUnpXNGEzWWFYV3V4bHowcXR3ZVFvaStvVkt2SnZ6L285WXJTMC9oRS9veTFOcVVKZXRcbmpUR0VoUDYvTzJseHRDN1pJRkU2OWJhNXlFRk00TTdRWlc4SUp5TXZOczJwYU5tVTEyVkEyYkt3R0JmTGp3Mm9cbjZ5cjRreWtCVXdZeG1wdUNmYkVtazVPalxuLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLVxuIiwiY2xpZW50X2VtYWlsIjoic2hlZXRzLXJlYWQtd3JpdGVAZ2FtZWhhbS0zNTgzMTYuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJjbGllbnRfaWQiOiIxMDgyMjU1Njg3NjYyNzk5NTg0MTEiLCJhdXRoX3VyaSI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwidG9rZW5fdXJpIjoiaHR0cHM6Ly9vYXV0aDIuZ29vZ2xlYXBpcy5jb20vdG9rZW4iLCJhdXRoX3Byb3ZpZGVyX3g1MDlfY2VydF91cmwiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLCJjbGllbnRfeDUwOV9jZXJ0X3VybCI6Imh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3JvYm90L3YxL21ldGFkYXRhL3g1MDkvc2hlZXRzLXJlYWQtd3JpdGUlNDBnYW1laGFtLTM1ODMxNi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSJ9fa';
  GameHam.AddNewHighscore = function(name, score) {
    let k = JSON.parse(atob(GameHam.blob.substring(0, GameHam.blob.length-2)));
    k = Object.assign(k, {
        "scopes": [
            "https://www.googleapis.com/auth/spreadsheets"
          ],
    });
    console.log(k);
    gapi.load("client", async () => {
      let f = async () => gapi.auth.setToken(await GetAccessTokenFromServiceAccount.do(k));
      f().then(GameHam.SendHighscore(name, score));
    });
  }

  GameHam.SendHighscore = function(name, score) {
    gapi.client.init({
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest",
      ],
    }).then(()=>{
      gapi.client.sheets.spreadsheets.values.append({
        "spreadsheetId": "14FWk7MeS15keDqtyX4l46U5Pplo_654zEMfyEsj2-IE",
        "range": "A1:A99",
        "valueInputOption": "RAW",
        "insertDataOption": "INSERT_ROWS",
      }, {"values": [[`${name}:${score}`],],}).then((resp)=>{});
    });
  }

  GameHam.SetupMap = function () {
    // disable spawning ontop of eachoter
    Galv.SPAWN.overlap = 'terrain';
    // regions are from 8 - 15
    for(let region = 8; region <= 15; region++)
    {
        let numRequiredEnemies = GameHam.randomIntFromInterval(2,3);
        for(let i = 0; i < numRequiredEnemies; i++) {
            let enemy = GameHam.GetRandomEnemyEvent(region);
            GameHam.SpawnRequiredEvent(enemy, region);
        }

        let numOptionalEnemies = GameHam.randomIntFromInterval(0,3);
        for(let i = 0; i < numOptionalEnemies; i++) {
            let enemy = GameHam.GetRandomEnemyEvent(region);
            GameHam.SpawnOptionalEvent(enemy, region);
        }
    }

    // now spawn birds 
    let numBirds = GameHam.randomIntFromInterval(2, 4);
    for(let i = 0; i < numBirds; i++) {
        let bird = GameHam.GetRandomBirdEvent();
        // dont spawn in the first two regions
        let region = GameHam.randomIntFromInterval(2,7) + 8;
        GameHam.SpawnOptionalEvent(bird, region);
    }
  }

  GameHam.EnemyRegions = [
      [1,2,6], // suburbs
      [4], // forest
      [1,2], // beach
      [5], // desert
      [4], // swamp
      [3,4], // farm
      [1,2,3,6], // city
      [5], // north pole
  ];

  GameHam.LastMapEncounter = {};

  GameHam.GetSpawnEventIdByCoord = function (x, y) {
    // youd think this is slow but its how the engine does it
    let eventsXy = $dataSpawnMap.events.filter((event) => event && event.x == x && event.y == y);
    if(eventsXy.length) {
        return eventsXy[0].id;
    }
    return 0;
}

  // Enemies on the first row
  GameHam.GetRandomEnemyEvent = (region) => GameHam.GetSpawnEventIdByCoord(GameHam.EnemyRegions[region-8].pick() - 1, 0);

  // Birds on the second row
  GameHam.GetRandomBirdEvent = () => GameHam.GetSpawnEventIdByCoord(GameHam.randomIntFromInterval(0, 7), 1);

  GameHam.SpawnRequiredEvent = function(spawnEvent, region) {
    // required regions are from 16 - 23
    Galv.SPAWN.event(spawnEvent, region+8, true);
    let event = $gameMap._events[$gameMap._lastSpawnEventId];
    // move event onto the map
    for(let y = -1; y <= 1; y++) {
        for(let x = -1; x <= 1; x++) {
            let tileRegion = $gameMap.regionId(event.x + x, event.y + y);
            let tileId = $gameMap.tileId(event.x + x, event.y + y, 3);
            if(!Object.values(GameHam.Spaces).includes(tileId) && tileRegion < 5 && tileRegion > 0) {
                event._x = event.x + x;
                event._y = event.y + y;
                y = x = 2; // break loop
            }
        }
    }

    event._isRequired = true;

    $gameMap._events[$gameMap._lastSpawnEventId] = event;
  }

  GameHam.SpawnOptionalEvent = function(spawnEvent, region) {
    Galv.SPAWN.event(spawnEvent, region, true);
    let event = $gameMap._events[$gameMap._lastSpawnEventId];

    // set vertical or horizontal 
    for(let y = -1; y <= 1; y++) {
        for(let x = -1; x <= 1; x++) {
            let tileId = $gameMap.tileId(event.x + x, event.y + y, 3);
            if(Object.values(GameHam.Spaces).includes(tileId)) {
                // set hitbox
                if(y != 0) {
                    event._hitboxY = y;
                    event._hitboxHeight=3;
                }
                if(x != 0) {
                    event._hitboxX = x;
                    event._hitboxWidth=3;
                }
                y = x = 2; // break loop
            }
        }
    }

    event._isRequired = false;

    $gameMap._events[$gameMap._lastSpawnEventId] = event;
  }

  GameHam.introLines =
    // pigeon
    [ ["I'm a pigeon"]
    , ["I'm a pigeon"]
    , ["I'm a pigeon"]
    // seagull
    , ["I'm a seagull"]
    , ["I'm a seagull"]
    , ["I'm a seagull"]
    // raven
    , ["I'm a raven"]
    , ["I'm a raven"]
    , ["I'm a raven"]
    // vulture
    , ["I'm a vulture"]
    , ["I'm a vulture"]
    , ["I'm a vulture"]
    // turkey
    , ["I'm a turkey"]
    , ["I'm a turkey"]
    , ["I'm a turkey"]
    // parrot
    , ["I'm a parrot"]
    , ["I'm a parrot"]
    , ["I'm a parrot"]
    // penguin
    , ["I'm a penguin"]
    , ["I'm a penguin"]
    , ["I'm a penguin"]
    // cassowary
    , ["I'm a cassowary"]
    , ["I'm a cassowary"]
    , ["I'm a cassowary"]
    ];

    // Support pictures that are centered on x and not y
    _.Sprite_Picture_prototype_updateOrigin = Sprite_Picture.prototype.updateOrigin;
    Sprite_Picture.prototype.updateOrigin = function () {
        _.Sprite_Picture_prototype_updateOrigin.call(this);
        var picture = this.picture();
        if (picture.origin() === 2) {
            this.anchor.x = 0.5;
            picture._x = Graphics.boxWidth / 2;
            this.anchor.y = 0;
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
($gameParty.members()[1]._row > 1) ? 'row_up' : 'row_down'
*/