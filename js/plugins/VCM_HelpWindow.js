//-----------------------------------------------------------------------------
// VCM Plugins - VCM_HelpWindow
//-----------------------------------------------------------------------------


/*~struct~Position:
@param x
@type number
@desc Help Window x Position
Default: 0
@default 0

@param y
@type number
@desc Help Window y Position
Default: 0
@default 0

@param Width
@type number
@desc Help Window Width
Default: 816
@default 816

@param Height
@type number
@desc Help Window Height
Default: 108
@default 108
*/

/*~struct~PositionSave:
@param x
@type number
@desc Help Window x Position
Default: 0
@default 0

@param y
@type number
@desc Help Window y Position
Default: 0
@default 0

@param Width
@type number
@desc Help Window Width
Default: 816
@default 816

@param Height
@type number
@desc Help Window x Height
Default: 72
@default 72
*/

/*~struct~PositionSelect:
@param x
@type number
@desc Help Window x Position
Default: 0
@default 0

@param y
@type number
@desc Help Window y Position
Default: 180
@default 180

@param Width
@type number
@desc Help Window Width
Default: 816
@default 816

@param Height
@type number
@desc Help Window x Height
Default: 108
@default 108
*/

/*~struct~Font:
@param Font
@type text
@desc Help Window Font
Default: GameFont
@default GameFont

@param Font Size
@type number
@min 0
@desc Help Window Font Size
Default: 28
@default 28

@param Italic
@type boolean
@on Yes
@off No
@desc Help Window Font is Italic?
No - false     Yes - true     Default: false
@default false

@param Text Color
@type text
@desc Help Window Text Color
Default: #ffffff
@default #ffffff

@param Text Outline Color
@type text
@desc Help Window Text Outline Color
Default: rgba(0, 0, 0, 0.5)
@default rgba(0, 0, 0, 0.5)

@param Text Outline Width
@type number
@desc Help Window Text Outline Width
Default: 4
@default 4
*/


/*:
@plugindesc Controls the Help Window in 40 possible Scenarios. This includes when it will appear and its Text Codes, Position, Text, Windowskin, Font Settings and Opacity
@author VCM Plugins


@param Help Window Wordwrapping
@type boolean
@on Enabled
@off Disabled
@desc Help Window Wordwrapping will be enabled?
Default: false
@default false


@param 1 - Custom Text Codes
@default

@param a
@parent 1 - Custom Text Codes
@desc This is the code to replace \a in the Help Window
Default: Refer to code line 147
@default if($gameParty.inBattle()){if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){if(item.hitType === 1){"Accuracy: " + item.successRate * BattleManager.actor().hit + "%";}else{"Accuracy: " + item.successRate + "%";}}}}

@param b
@parent 1 - Custom Text Codes
@desc This is the code to replace \b in the Help Window
Default: Refer to code line 153
@default "Battles Won: " + $gameSystem._winCount + " / " + $gameSystem._battleCount;

@param c
@parent 1 - Custom Text Codes
@desc This is the code to replace \c in the Help Window
Default: Refer to code line 159
@default if($gameParty.inBattle()){if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){if(item.damage.critical){"Critical Chance: " + BattleManager.actor().cri * 100 + "%";}else{"Critical Chance: 0%";}}}}

@param d
@parent 1 - Custom Text Codes
@desc This is the code to replace \d in the Help Window
Default: Refer to code line 165
@default if($gameParty.inBattle()){var a = BattleManager.actor();var b = null;for(var i = 0; i < BattleManager.allBattleMembers().length; i++){if(BattleManager.allBattleMembers()[i]._selected){b = BattleManager.allBattleMembers()[i];break;}}if(b){"Damage: " + Math.round(eval($dataSkills[a._actions[0]._item._itemId].damage.formula) * b.elementRate($dataSkills[a._actions[0]._item._itemId].damage.elementId) * ((-$dataSkills[a._actions[0]._item._itemId].damage.variance / 100) + 1)) + " - " + Math.round(eval($dataSkills[a._actions[0]._item._itemId].damage.formula) * b.elementRate($dataSkills[a._actions[0]._item._itemId].damage.elementId) * ($dataSkills[a._actions[0]._item._itemId].damage.variance / 100 + 1));}}

@param e
@parent 1 - Custom Text Codes
@desc This is the code to replace \e in the Help Window
Default: Refer to code line 171
@default if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){$dataSystem.elements[item.damage.elementId];}}

@param f
@parent 1 - Custom Text Codes
@desc This is the code to replace \f in the Help Window
Default: Refer to code line 177
@default if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){if(item.damage.formula != 0){"Formula: " + item.damage.formula;}}}

@param g
@parent 1 - Custom Text Codes
@desc This is the code to replace \g in the Help Window
Default: Refer to code line 183
@default if($gameParty.inBattle() && $gameSystem.isSideView()){if(BattleManager.actor()){BattleManager.actor().startAnimation(51);}}

@param h
@parent 1 - Custom Text Codes
@desc This is the code to replace \h in the Help Window
Default: "Heals";
@default "Heals";

@param i
@parent 1 - Custom Text Codes
@desc This is the code to replace \i in the Help Window
Default: Refer to code line 195
@default if($gameParty.inBattle()){var hp = 0; var mp = 0; var tp = 0; var atk = 0; var def = 0; var mat = 0; var mdf = 0; var agi = 0; var luk = 0;for(var i = 0; i < $gameTroop.aliveMembers().length; i++){hp += $gameTroop.aliveMembers()[i].hp;mp += $gameTroop.aliveMembers()[i].mp;tp += $gameTroop.aliveMembers()[i].tp;atk += $gameTroop.aliveMembers()[i].atk;def += $gameTroop.aliveMembers()[i].def;mat += $gameTroop.aliveMembers()[i].mat;mdf += $gameTroop.aliveMembers()[i].mdf;agi += $gameTroop.aliveMembers()[i].agi;luk += $gameTroop.aliveMembers()[i].luk;}"Troop Averages -> HP: " + Math.round(hp / $gameTroop.aliveMembers().length) + " | MP: " + Math.round(mp / $gameTroop.aliveMembers().length) + " | TP: " + Math.round(tp / $gameTroop.aliveMembers().length) + " | ATK: " + Math.round(atk / $gameTroop.aliveMembers().length) + " | DEF: " + Math.round(def / $gameTroop.aliveMembers().length) + " | MAT: " + Math.round(mat / $gameTroop.aliveMembers().length) + " | MDF: " + Math.round(mdf / $gameTroop.aliveMembers().length) + " | AGI: " + Math.round(agi / $gameTroop.aliveMembers().length) + " | LUK: " + Math.round(luk / $gameTroop.aliveMembers().length);}

@param j
@parent 1 - Custom Text Codes
@desc This is the code to replace \j in the Help Window
Default: Refer to code line 201
@default if($gameParty.inBattle()){if(BattleManager.isInputting()){var actions = "Next Enemy Actions -> ";for(var i = 0; i < $gameTroop.aliveMembers().length; i++){if($gameTroop.aliveMembers()[i].restriction() < 1){if($gameTroop.aliveMembers()[i]._actions[0]._item._itemId){actions += $gameTroop.aliveMembers()[i].name() + ": \\I[" + $dataSkills[$gameTroop.aliveMembers()[i]._actions[0]._item._itemId].iconIndex + "]" + $dataSkills[$gameTroop.aliveMembers()[i]._actions[0]._item._itemId].name;if(i < $gameTroop.aliveMembers().length - 1){actions += " | ";}}}}actions;}}


@param k
@parent 1 - Custom Text Codes
@desc This is the code to replace \k in the Help Window
Default: Refer to code line 207
@default if($gameParty.inBattle()){if(BattleManager._canEscape){"Chance of Escaping: " + Math.round(Math.min(BattleManager._escapeRatio * 100, 100)) + "%";}}

@param l
@parent 1 - Custom Text Codes
@desc This is the code to replace \l in the Help Window
Default: Refer to code line 213
@default if($gameParty.inBattle()){if(BattleManager._logWindow._lines.length > 1){BattleManager._logWindow._lines[BattleManager._logWindow._lines.length - 2] + "\n" + BattleManager._logWindow._lines[BattleManager._logWindow._lines.length - 1];}else if(BattleManager._logWindow._lines.length > 0){BattleManager._logWindow._lines[0];}}

@param m
@parent 1 - Custom Text Codes
@desc This is the code to replace \m in the Help Window
Default: Refer to code line 219
@default if(AudioManager._currentBgm !== null){AudioManager._currentBgm.name;}

@param n
@parent 1 - Custom Text Codes
@desc This is the code to replace \n in the Help Window
Default: "\n";
@default "\n";

@param o
@parent 1 - Custom Text Codes
@desc This is the code to replace \o in the Help Window
Default: Refer to code line 225
@default if($gameParty.inBattle()){"Turn: " + $gameTroop._turnCount;}

@param p
@parent 1 - Custom Text Codes
@desc This is the code to replace \p in the Help Window
Default: $gameSystem.playtimeText();
@default $gameSystem.playtimeText();

@param q
@parent 1 - Custom Text Codes
@desc This is the code to replace \q in the Help Window
Default: $gameParty._steps;
@default $gameParty._steps;

@param r
@parent 1 - Custom Text Codes
@desc This is the code to replace \r in the Help Window
Default: Refer to code line 243
@default if($gameParty.inBattle()){var stateResist = "State Resist: ";for(var i = 0; i < BattleManager.allBattleMembers().length; i++){if(BattleManager.allBattleMembers()[i]._selected){for(var j = 0; j < BattleManager.allBattleMembers()[i].stateResistSet().length; j++){stateResist += "\\I[" + $dataStates[BattleManager.allBattleMembers()[i].stateResistSet()[j]].iconIndex + "]" + $dataStates[BattleManager.allBattleMembers()[i].stateResistSet()[j]].name;if(j < BattleManager.allBattleMembers()[i].stateResistSet().length - 1){stateResist += ", ";}}stateResist;break;}}}

@param s
@parent 1 - Custom Text Codes
@desc This is the code to replace \s in the Help Window
Default: Refer to code line 249
@default if($gameParty.inBattle()){var skills = "Skills: ";for(var i = 0; i < $gameTroop.aliveMembers().length; i++){if($gameTroop.aliveMembers()[i]._selected){for(var j = 0; j < $gameTroop.aliveMembers()[i].enemy().actions.length; j++){skills += "\\I[" + $dataSkills[$gameTroop.aliveMembers()[i].enemy().actions[j].skillId].iconIndex + "]" + $dataSkills[$gameTroop.aliveMembers()[i].enemy().actions[j].skillId].name;if(j < $gameTroop.aliveMembers()[i].enemy().actions.length - 1){skills += ", ";}}skills;break;}}}

@param t
@parent 1 - Custom Text Codes
@desc This is the code to replace \t in the Help Window
Default: Refer to code line 255
@default if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){if(item.scope === 1){"Targets 1 Enemy";}else if(item.scope === 2){"Targets All Enemies";}else if(item.scope === 3){"Targets 1 Random Enemy";}else if(item.scope === 4){"Targets 2 Random Enemies";}else if(item.scope === 5){"Targets 3 Random Enemies";}else if(item.scope === 6){"Targets 4 Random Enemies";}else if(item.scope === 7){"Targets 1 Ally";}else if(item.scope === 8){"Targets All Allies";}else if(item.scope === 9){"Targets 1 Ally (Dead)";}else if(item.scope === 10){"Targets All Allies (Dead)";}else if(item.scope === 11){"Targets The User";}}}

@param u
@parent 1 - Custom Text Codes
@desc This is the code to replace \u in the Help Window
Default: $gameSystem.setHelpWindowTone(255, 0, 0);
@default $gameSystem.setHelpWindowTone(255, 0, 0);

@param v
@parent 1 - Custom Text Codes
@desc This is the code to replace \v in the Help Window
Default: Refer to code line 267
@default if($gameParty.inBattle()){for(var i = 0; i < BattleManager.allBattleMembers().length; i++){if(BattleManager.allBattleMembers()[i]._selected){"NAME: " + BattleManager.allBattleMembers()[i].name() + " | HP: " + BattleManager.allBattleMembers()[i].hp + "/" + BattleManager.allBattleMembers()[i].mhp + " | MP: " + BattleManager.allBattleMembers()[i].mp + " | TP: " + BattleManager.allBattleMembers()[i].tp + " | ATK: " + BattleManager.allBattleMembers()[i].atk + " | DEF: " + BattleManager.allBattleMembers()[i].def + " | MAT: " + BattleManager.allBattleMembers()[i].mat + " | MDF: " + BattleManager.allBattleMembers()[i].mdf + " | AGI: " + BattleManager.allBattleMembers()[i].agi + " | LUK: " + BattleManager.allBattleMembers()[i].luk;break;}}}

@param w
@parent 1 - Custom Text Codes
@desc This is the code to replace \w in the Help Window
Default: Refer to code line 273
@default if($gameParty.inBattle()){if(BattleManager.actor()){if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){"Speed: " + (BattleManager.actor().agi + item.speed) + " - " + (BattleManager.actor().agi + Math.floor(5 + BattleManager.actor().agi / 4) + item.speed);}}}}

@param x
@parent 1 - Custom Text Codes
@desc This is the code to replace \x in the Help Window
Default: Refer to line 279
@default "Map Coordinates: " + $gamePlayer._x + "," + $gamePlayer._y;

@param y
@parent 1 - Custom Text Codes
@desc This is the code to replace \y in the Help Window
Default: Refer to code line 285
@default if($gameParty.inBattle()){for(var i = 0; i < SceneManager._scene._spriteset._enemySprites.length; i++){if(SceneManager._scene._spriteset._enemySprites[i]._battler._selected){$gameSystem._VCMHelpWindow['Enemy Help Window Position (Battle)'].y = SceneManager._scene._spriteset._enemySprites[i]._battler._screenY - SceneManager._scene._spriteset._enemySprites[i].height - this.height;this.y = SceneManager._scene._spriteset._enemySprites[i]._battler._screenY - SceneManager._scene._spriteset._enemySprites[i].height - this.height;break;}}}"";

@param z
@parent 1 - Custom Text Codes
@desc This is the code to replace \z in the Help Window
Default: Refer to code line 291
@default if($gameParty.inBattle() && $gameSystem.isSideView()){for(var i = 0; i < SceneManager._scene._spriteset._actorSprites.length; i++){if(SceneManager._scene._spriteset._actorSprites[i]._battler._selected){$gameSystem._VCMHelpWindow['Actor Help Window Position (Battle)'].y = SceneManager._scene._spriteset._actorSprites[i]._homeY - 64 - this.height;this.y = SceneManager._scene._spriteset._actorSprites[i]._homeY - 64 - this.height;break;}}}"";


@param 2 - Show Help Window
@default

@param Title Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Title Screen?
Default: false
@default false

@param Map Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Map Screen?
Default: false
@default false

@param Choice List Help Window (Map)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Choice List in Map?
Default: false
@default false

@param Number Input Help Window (Map)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Number Input in Map?
Default: false
@default false

@param Select Item Help Window (Map)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Select Item in Map?
Default: false
@default false

@param Message Help Window (Map)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear when showing Messages in Map?
Default: false
@default false

@param Scroll Text Help Window (Map)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear when showing Scroll Text in Map?
Default: false
@default false

@param Menu Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Menu?
Default: false
@default false

@param Menu Status Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Menu Status?
Default: false
@default false

@param Menu Actor Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Menu Actor?
Default: false
@default false

@param Item Category Help Window (Menu)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Item Category in Menu?
Default: true
@default true

@param Item List Help Window (Menu)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Item List in Menu?
Default: true
@default true

@param Skill Type Help Window (Menu)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Skill Type in Menu?
Default: true
@default true

@param Skill List Help Window (Menu)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Skill List in Menu?
Default: true
@default true

@param Equip Command Help Window (Menu)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Equip Command in Menu?
Default: true
@default true

@param Equip Slot Help Window (Menu)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Equip Slot in Menu?
Default: true
@default true

@param Equip List Help Window (Menu)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Equip List in Menu?
Default: true
@default true

@param Status Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Status?
Default: false
@default false

@param Options Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Options?
Default: false
@default false

@param Save Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will in Save?
Default: true
@default true

@param Load Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Load?
Default: true
@default true

@param Game End Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Game End?
Default: false
@default false

@param Shop Command Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Shop Command?
Default: true
@default true

@param Shop Item Category Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Item Category in Shop?
Default: true
@default true

@param Shop Item List Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Item List in Shop?
Default: true
@default true

@param Shop Item Number Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Item Number in Shop?
Default: true
@default true

@param Name Input Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Name Input?
Default: false
@default false

@param Choice List Help Window (Battle)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Choice List in Battle?
Default: false
@default false

@param Number Input Help Window (Battle)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Number Input in Battle?
Default: false
@default false

@param Select Item Help Window (Battle)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Select Item in Battle?
Default: false
@default false

@param Message Help Window (Battle)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear when showing Messages in Battle?
Default: false
@default false

@param Scroll Text Help Window (Battle)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear when showing Scroll Text in Battle?
Default: false
@default false

@param Log Help Window (Battle)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear when showing Logs in Battle?
Default: false
@default false

@param Party Command Help Window (Battle)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Party Command in Battle?
Default: false
@default false

@param Actor Command Help Window (Battle)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Actor Command in Battle?
Default: false
@default false

@param Actor Help Window (Battle)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Actor Select in Battle?
Default: false
@default false

@param Enemy Help Window (Battle)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Enemy Select in Battle?
Default: false
@default false

@param Skill Help Window (Battle)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Battle Skill?
Default: true
@default true

@param Item Help Window (Battle)
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Battle Item?
Default: true
@default true

@param Gameover Help Window
@parent 2 - Show Help Window
@type boolean
@on Show
@off Hide
@desc Help Window will appear in Gameover?
Default: false
@default false


@param 3 - Help Window Position
@default

@param Title Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Title Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Map Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Map Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Choice List Help Window Position (Map)
@parent 3 - Help Window Position
@type struct<Position>
@desc Map Choice List Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Number Input Help Window Position (Map)
@parent 3 - Help Window Position
@type struct<Position>
@desc Map Number Input Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Select Item Help Window Position (Map)
@parent 3 - Help Window Position
@type struct<PositionSelect>
@desc Map Select Item Help Window Position Settings
Default: {"x":"0","y":"180","Width":"816","Height":"108"}
@default {"x":"0","y":"180","Width":"816","Height":"108"}

@param Message Help Window Position (Map)
@parent 3 - Help Window Position
@type struct<Position>
@desc Map Message Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Scroll Text Help Window Position (Map)
@parent 3 - Help Window Position
@type struct<Position>
@desc Map Scroll Text Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Menu Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Menu Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Menu Status Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Menu Status Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Menu Actor Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Menu Actor Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Item Category Help Window Position (Menu)
@parent 3 - Help Window Position
@type struct<Position>
@desc Menu Item Category Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Item List Help Window Position (Menu)
@parent 3 - Help Window Position
@type struct<Position>
@desc Menu Item List Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Skill Type Help Window Position (Menu)
@parent 3 - Help Window Position
@type struct<Position>
@desc Menu Skill Type Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Skill List Help Window Position (Menu)
@parent 3 - Help Window Position
@type struct<Position>
@desc Menu Skill Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Equip Command Help Window Position (Menu)
@parent 3 - Help Window Position
@type struct<Position>
@desc Equip Command Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Equip Slot Help Window Position (Menu)
@parent 3 - Help Window Position
@type struct<Position>
@desc Equip Slot Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Equip List Help Window Position (Menu)
@parent 3 - Help Window Position
@type struct<Position>
@desc Equip Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Status Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Status Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Options Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Options Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Save Help Window Position
@parent 3 - Help Window Position
@type struct<PositionSave>
@desc Save Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"72"}
@default {"x":"0","y":"0","Width":"816","Height":"72"}

@param Load Help Window Position
@parent 3 - Help Window Position
@type struct<PositionSave>
@desc Load Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"72"}
@default {"x":"0","y":"0","Width":"816","Height":"72"}

@param Game End Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Game End Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Shop Command Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Shop Command Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Shop Item Category Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Shop Item Category Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Shop Item List Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Shop Item List Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Shop Item Number Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Shop Item Number Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Name Input Help Window Position
@parent 3 - Help Window Position
@type struct<PositionSave>
@desc Name Input Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"72"}
@default {"x":"0","y":"0","Width":"816","Height":"72"}

@param Choice List Help Window Position (Battle)
@parent 3 - Help Window Position
@type struct<Position>
@desc Battle Choice List Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Number Input Help Window Position (Battle)
@parent 3 - Help Window Position
@type struct<Position>
@desc Battle Number Input Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Select Item Help Window Position (Battle)
@parent 3 - Help Window Position
@type struct<PositionSelect>
@desc Battle Select Item Help Window Position Settings
Default: {"x":"0","y":"180","Width":"816","Height":"108"}
@default {"x":"0","y":"180","Width":"816","Height":"108"}

@param Message Help Window Position (Battle)
@parent 3 - Help Window Position
@type struct<Position>
@desc Battle Message Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Scroll Text Help Window Position (Battle)
@parent 3 - Help Window Position
@type struct<Position>
@desc Battle Scroll Text Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Log Help Window Position (Battle)
@parent 3 - Help Window Position
@type struct<Position>
@desc Battle Log Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Party Command Help Window Position (Battle)
@parent 3 - Help Window Position
@type struct<Position>
@desc Battle Party Command Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Actor Command Help Window Position (Battle)
@parent 3 - Help Window Position
@type struct<Position>
@desc Battle Actor Command Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Actor Help Window Position (Battle)
@parent 3 - Help Window Position
@type struct<Position>
@desc Battle Actor Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Enemy Help Window Position (Battle)
@parent 3 - Help Window Position
@type struct<Position>
@desc Battle Enemy Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Skill Help Window Position (Battle)
@parent 3 - Help Window Position
@type struct<Position>
@desc Battle Skill Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Item Help Window Position (Battle)
@parent 3 - Help Window Position
@type struct<Position>
@desc Battle Item Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param Gameover Help Window Position
@parent 3 - Help Window Position
@type struct<Position>
@desc Gameover Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}


@param 4 - Help Window Text
@default

@param Title Help Window Text
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Title Command
Default: ["New Game","Continue","Options"]
@default ["New Game","Continue","Options"]

@param Map Help Window Text
@parent 4 - Help Window Text
@desc Help Window Text in Map
Default: Map
@default Map

@param Choice List Help Window Text (Map)
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Map Choice List Command
Default: Refer to code line 963
@default ["Choice1","Choice2","Choice3","Choice4","Choice5","Choice6"]

@param Number Input Help Window Text (Map)
@parent 4 - Help Window Text
@desc Help Window Text in Map Number Input
Default: Map Number Input
@default Map Number Input

@param Message Help Window Text (Map)
@parent 4 - Help Window Text
@desc Help Window Text in Map Message
Default: Map Message
@default Map Message

@param Scroll Text Help Window Text (Map)
@parent 4 - Help Window Text
@desc Help Window Text in Map Scroll Text
Default: Map Scroll Text
@default Map Scroll Text

@param Menu Help Window Text
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Menu Command
Default: Refer to code line 988
@default ["Item","Skill","Equip","Status","Formation","Options","Save","Game End"]

@param Menu Status Help Window Text
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Menu Status Actor
Default: ["Actor1","Actor2","Actor3","Actor4"]
@default ["Actor1","Actor2","Actor3","Actor4"]

@param Menu Actor Help Window Text
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Menu Actor
Default: ["Actor1","Actor2","Actor3","Actor4"]
@default ["Actor1","Actor2","Actor3","Actor4"]

@param Item Category Help Window Text (Menu)
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Menu Item Category Command
Default: ["Item","Weapon","Armor","Key Item"]
@default ["Item","Weapon","Armor","Key Item"]

@param Skill Type Help Window Text (Menu)
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Menu Skill Type Command
Default: ["Magic","Special"]
@default ["Magic","Special"]

@param Equip Command Help Window Text (Menu)
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Menu Equip Command
Default: ["Equip","Optimize","Clear"]
@default ["Equip","Optimize","Clear"]

@param Status Help Window Text
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Status Actor
Default: ["Status"]
@default ["Status"]

@param Options Help Window Text
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Options Command
Default: Refer to code line 1037
@default ["Always Dash","Command Remember","BGM Volume","BGS Volume","ME Volume","SE Volume"]

@param Save Help Window Text
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Save Savefile
Default: ["Save to which file?"]
@default ["Save to which file?"]

@param Load Help Window Text
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Load Savefile
Default: ["Load which file?"]
@default ["Load which file?"]

@param Game End Help Window Text
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Game End Command.
Default: ["To Title","Cancel"]
@default ["To Title","Cancel"]

@param Shop Command Help Window Text
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Shop Command.
Default: ["Buy","Sell","Cancel"]
@default ["Buy","Sell","Cancel"]

@param Shop Item Category Help Window Text
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Shop Item Category Command
Default: ["Item","Weapon","Armor","Key Item"]
@default ["Item","Weapon","Armor","Key Item"]

@param Shop Item Number Help Window Text
@parent 4 - Help Window Text
@desc Help Window Text in Shop Item Number
Default: Item Number
@default Item Number

@param Name Input Help Window Text
@parent 4 - Help Window Text
@desc Help Window Text in Name Input.
Default: Name Input
@default Name Input

@param Choice List Help Window Text (Battle)
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Battle Choice List Command
Default: Refer to code line 1090
@default ["Choice1","Choice2","Choice3","Choice4","Choice5","Choice6"]

@param Number Input Help Window Text (Battle)
@parent 4 - Help Window Text
@desc Help Window Text in Battle Number Input.
Default: Battle Number Input
@default Battle Number Input

@param Message Help Window Text (Battle)
@parent 4 - Help Window Text
@desc Help Window Text in Battle Message
Default: Battle Message
@default Battle Message

@param Scroll Text Help Window Text (Battle)
@parent 4 - Help Window Text
@desc Help Window Text in Battle Scroll
Default: Battle Scroll Text
@default Battle Scroll Text

@param Log Help Window Text (Battle)
@parent 4 - Help Window Text
@desc Help Window Text in Battle Log
Default: Log
@default Log

@param Party Command Help Window Text (Battle)
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Battle Party Command
Default: ["Fight","Escape"]
@default ["Fight","Escape"]

@param Actor Command Help Window Text (Battle)
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Battle Actor Command
Default: ["Attack","Magic","Special","Guard","Item"]
@default ["Attack","Magic","Special","Guard","Item"]

@param Actor Help Window Text (Battle)
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Battle Actor
Default: ["Actor"]
@default ["Actor"]

@param Enemy Help Window Text (Battle)
@parent 4 - Help Window Text
@type text[]
@desc Help Window Text for each Battle Enemy
Default: ["Enemy"]
@default ["Enemy"]

@param Gameover Help Window Text
@parent 4 - Help Window Text
@desc Help Window Text in Game Over Screen.
Default: Gameover
@default Gameover


@param 5 - Help Window Windowskin
@default

@param Title Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Title Help Window.
Default: Window
@default Window

@param Map Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Map Help Window.
Default: Window
@default Window

@param Choice List Help Window Windowskin (Map)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Map Choice List Help Window.
Default: Window
@default Window

@param Number Input Help Window Windowskin (Map)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Map Number Input Help Window.
Default: Window
@default Window

@param Select Item Help Window Windowskin (Map)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Map Select Item Help Window.
Default: Window
@default Window

@param Message Help Window Windowskin (Map)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Battle Message Help Window.
Default: Window
@default Window

@param Scroll Text Help Window Windowskin (Map)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Map Scroll Text Help Window.
Default: Window
@default Window

@param Menu Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Menu Help Window.
Default: Window
@default Window

@param Menu Status Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Menu Status Help Window.
Default: Window
@default Window

@param Menu Actor Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Menu Actor Help Window.
Default: Window
@default Window

@param Item Category Help Window Windowskin (Menu)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Menu Item Category Help Window.
Default: Window
@default Window

@param Item List Help Window Windowskin (Menu)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Menu Item List Help Window.
Default: Window
@default Window

@param Skill Type Help Window Windowskin (Menu)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Menu Skill Type Help Window.
Default: Window
@default Window

@param Skill List Help Window Windowskin (Menu)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Menu Skill List Help Window.
Default: Window
@default Window

@param Equip Command Help Window Windowskin (Menu)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Menu Equip Command Help Window.
Default: Window
@default Window

@param Equip Slot Help Window Windowskin (Menu)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Menu Equip Slot Help Window.
Default: Window
@default Window

@param Equip List Help Window Windowskin (Menu)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Menu Equip List Help Window.
Default: Window
@default Window

@param Status Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Status Help Window.
Default: Window
@default Window

@param Options Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Options Help Window.
Default: Window
@default Window

@param Save Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Save Help Window.
Default: Window
@default Window

@param Load Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Load Help Window.
Default: Window
@default Window

@param Game End Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Game End Help Window.
Default: Window
@default Window

@param Shop Command Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Shop Command Help Window.
Default: Window
@default Window

@param Shop Item Category Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Shop Item Category Help Window.
Default: Window
@default Window

@param Shop Item List Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Shop Item List Help Window.
Default: Window
@default Window

@param Shop Item Number Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Shop Item Number Help Window.
Default: Window
@default Window

@param Name Input Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Name Input Help Window.
Default: Window
@default Window

@param Choice List Help Window Windowskin (Battle)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Battle Choice List Help Window.
Default: Window
@default Window

@param Number Input Help Window Windowskin (Battle)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Battle Number Input Help Window.
Default: Window
@default Window

@param Select Item Help Window Windowskin (Battle)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Battle Select Item Help Window.
Default: Window
@default Window

@param Message Help Window Windowskin (Battle)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Battle Message Help Window.
Default: Window
@default Window

@param Scroll Text Help Window Windowskin (Battle)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Battle Scroll Text Help Window.
Default: Window
@default Window

@param Log Help Window Windowskin (Battle)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Battle Log Help Window.
Default: Window
@default Window

@param Party Command Help Window Windowskin (Battle)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Party Command Help Window.
Default: Window
@default Window

@param Actor Command Help Window Windowskin (Battle)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Actor Command Help Window.
Default: Window
@default Window

@param Actor Help Window Windowskin (Battle)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Actor Help Window.
Default: Window
@default Window

@param Enemy Help Window Windowskin (Battle)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Enemy Help Window.
Default: Window
@default Window

@param Skill Help Window Windowskin (Battle)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Battle Skill Help Window.
Default: Window
@default Window

@param Item Help Window Windowskin (Battle)
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Battle Item Help Window.
Default: Window
@default Window

@param Gameover Help Window Windowskin
@parent 5 - Help Window Windowskin
@type file
@dir img/system/
@require 1
@desc Windowskin of Gameover Help Window.
Default: Window
@default Window


@param 6 - Help Window Font
@default

@param Title Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Title Help Window Font Settings
Default: Refer to code line 1524
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Map Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Map Help Window Font Settings
Default: Refer to code line 1531
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Choice List Help Window Font (Map)
@parent 6 - Help Window Font
@type struct<Font>
@desc Map Choice List Help Window Font Settings
Default: Refer to code line 1538
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Number Input Help Window Font (Map)
@parent 6 - Help Window Font
@type struct<Font>
@desc Map Number Input Help Window Font Settings
Default: Refer to code line 1545
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Select Item Help Window Font (Map)
@parent 6 - Help Window Font
@type struct<Font>
@desc Map Select Item Help Window Font Settings
Default: Refer to code line 1552
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Message Help Window Font (Map)
@parent 6 - Help Window Font
@type struct<Font>
@desc Map Message Help Window Font Settings
Default: Refer to code line 1559
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Scroll Text Help Window Font (Map)
@parent 6 - Help Window Font
@type struct<Font>
@desc Map Scroll Text Help Window Font Settings
Default: Refer to code line 1566
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Menu Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Menu Help Window Font Settings
Default: Refer to code line 1573
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Menu Status Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Menu Status Help Window Font Settings
Default: Refer to code line 1580
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Menu Actor Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Menu Actor Help Window Font Settings
Default: Refer to code line 1587
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Item Category Help Window Font (Menu)
@parent 6 - Help Window Font
@type struct<Font>
@desc Menu Item Category Help Window Font Settings
Default: Refer to code line 1594
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Item List Help Window Font (Menu)
@parent 6 - Help Window Font
@type struct<Font>
@desc Menu Item List Help Window Font Settings
Default: Refer to code line 1601
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Skill Type Help Window Font (Menu)
@parent 6 - Help Window Font
@type struct<Font>
@desc Menu Skill Type Help Window Font Settings
Default: Refer to code line 1608
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Skill List Help Window Font (Menu)
@parent 6 - Help Window Font
@type struct<Font>
@desc Menu Skill List Help Window Font Settings
Default: Refer to code line 1615
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Equip Command Help Window Font (Menu)
@parent 6 - Help Window Font
@type struct<Font>
@desc Menu Equip Command Help Window Font Settings
Default: Refer to code line 1622
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Equip Slot Help Window Font (Menu)
@parent 6 - Help Window Font
@type struct<Font>
@desc Menu Equip Slot Help Window Font Settings
Default: Refer to code line 1629
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Equip List Help Window Font (Menu)
@parent 6 - Help Window Font
@type struct<Font>
@desc Menu Equip Help Window Font Settings
Default: Refer to code line 1636
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Status Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Status Help Window Font Settings
Default: Refer to code line 1643
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Options Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Options Help Window Font Settings
Default: Refer to code line 1650
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Save Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Save Help Window Font Settings
Default: Refer to code line 1657
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Load Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Load Help Window Font Settings
Default: Refer to code line 1664
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Game End Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Game End Help Window Font Settings
Default: Refer to code line 1671
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Shop Command Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Shop Command Help Window Font Settings
Default: Refer to code line 1678
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Shop Item Category Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Shop Item Category Help Window Font Settings
Default: Refer to code line 1685
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Shop Item List Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Shop Item List Help Window Font Settings
Default: Refer to code line 1692
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Shop Item Number Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Shop Item Number Help Window Font Settings
Default: Refer to code line 1699
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Name Input Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Name Input Help Window Font Settings
Default: Refer to code line 1706
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Choice List Help Window Font (Battle)
@parent 6 - Help Window Font
@type struct<Font>
@desc Battle Choice List Help Window Font Settings
Default: Refer to code line 1713
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Number Input Help Window Font (Battle)
@parent 6 - Help Window Font
@type struct<Font>
@desc Battle Number Input Help Window Font Settings
Default: Refer to code line 1720
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Select Item Help Window Font (Battle)
@parent 6 - Help Window Font
@type struct<Font>
@desc Battle Select Item Help Window Font Settings
Default: Refer to code line 1727
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Message Help Window Font (Battle)
@parent 6 - Help Window Font
@type struct<Font>
@desc Battle Message Help Window Font Settings
Default: Refer to code line 1734
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Scroll Text Help Window Font (Battle)
@parent 6 - Help Window Font
@type struct<Font>
@desc Battle Scroll Text Help Window Font Settings
Default: Refer to code line 1741
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Log Help Window Font (Battle)
@parent 6 - Help Window Font
@type struct<Font>
@desc Battle Log Help Window Font Settings
Default: Refer to code line 1748
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Party Command Help Window Font (Battle)
@parent 6 - Help Window Font
@type struct<Font>
@desc Battle Party Command Help Window Font Settings
Default: Refer to code line 1755
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Actor Command Help Window Font (Battle)
@parent 6 - Help Window Font
@type struct<Font>
@desc Battle Actor Command Help Window Font Settings
Default: Refer to code line 1762
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Actor Help Window Font (Battle)
@parent 6 - Help Window Font
@type struct<Font>
@desc Battle Actor Help Window Font Settings
Default: Refer to code line 1769
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Enemy Help Window Font (Battle)
@parent 6 - Help Window Font
@type struct<Font>
@desc Battle Enemy Help Window Font Settings
Default: Refer to code line 1776
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Skill Help Window Font (Battle)
@parent 6 - Help Window Font
@type struct<Font>
@desc Battle Skill Help Window Font Settings
Default: Refer to code line 1783
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Item Help Window Font (Battle)
@parent 6 - Help Window Font
@type struct<Font>
@desc Battle Item Help Window Font Settings
Default: Refer to code line 1790
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param Gameover Help Window Font
@parent 6 - Help Window Font
@type struct<Font>
@desc Gameover Help Window Font Settings
Default: Refer to code line 1797
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}


@param 7 - Help Window Opacity
@default

@param Title Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Title Help Window.
Default: 255
@default 255

@param Map Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Map Help Window.
Default: 255
@default 255

@param Choice List Help Window Opacity (Map)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Map Choice List Help Window.
Default: 255
@default 255

@param Number Input Help Window Opacity (Map)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Map Number Input Help Window.
Default: 255
@default 255

@param Select Item Help Window Opacity (Map)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Map Select Item Help Window.
Default: 255
@default 255

@param Message Help Window Opacity (Map)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Battle Message Help Window.
Default: 255
@default 255

@param Scroll Text Help Window Opacity (Map)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Map Scroll Text Help Window.
Default: 255
@default 255

@param Menu Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Menu Help Window.
Default: 255
@default 255

@param Menu Status Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Menu Status Help Window.
Default: 255
@default 255

@param Menu Actor Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Menu Actor Help Window.
Default: 255
@default 255

@param Item Category Help Window Opacity (Menu)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Menu Item Category Help Window.
Default: 255
@default 255

@param Item List Help Window Opacity (Menu)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Menu Item List Help Window.
Default: 255
@default 255

@param Skill Type Help Window Opacity (Menu)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Menu Skill Type Help Window.
Default: 255
@default 255

@param Skill List Help Window Opacity (Menu)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Menu Skill List Help Window.
Default: 255
@default 255

@param Equip Command Help Window Opacity (Menu)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Menu Equip Command Help Window.
Default: 255
@default 255

@param Equip Slot Help Window Opacity (Menu)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Menu Equip Slot Help Window.
Default: 255
@default 255

@param Equip List Help Window Opacity (Menu)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Menu Equip List Help Window.
Default: 255
@default 255

@param Status Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Status Help Window.
Default: 255
@default 255

@param Options Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Options Help Window.
Default: 255
@default 255

@param Save Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Save Help Window.
Default: 255
@default 255

@param Load Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Load Help Window.
Default: 255
@default 255

@param Game End Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Game End Help Window.
Default: 255
@default 255

@param Shop Command Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Shop Command Help Window.
Default: 255
@default 255

@param Shop Item Category Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Shop Item Category Help Window.
Default: 255
@default 255

@param Shop Item List Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Shop Item List Help Window.
Default: 255
@default 255

@param Shop Item Number Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Shop Item Number Help Window.
Default: 255
@default 255

@param Name Input Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Name Input Help Window.
Default: 255
@default 255

@param Choice List Help Window Opacity (Battle)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Battle Choice List Help Window.
Default: 255
@default 255

@param Number Input Help Window Opacity (Battle)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Battle Number Input Help Window.
Default: 255
@default 255

@param Select Item Help Window Opacity (Battle)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Battle Select Item Help Window.
Default: 255
@default 255

@param Message Help Window Opacity (Battle)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Battle Message Help Window.
Default: 255
@default 255

@param Scroll Text Help Window Opacity (Battle)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Battle Scroll Text Help Window.
Default: 255
@default 255

@param Log Help Window Opacity (Battle)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Battle Log Help Window.
Default: 255
@default 255

@param Party Command Help Window Opacity (Battle)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Party Command Help Window.
Default: 255
@default 255

@param Actor Command Help Window Opacity (Battle)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Actor Command Help Window.
Default: 255
@default 255

@param Actor Help Window Opacity (Battle)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Actor Help Window.
Default: 255
@default 255

@param Enemy Help Window Opacity (Battle)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Enemy Help Window.
Default: 255
@default 255

@param Skill Help Window Opacity (Battle)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Battle Skill Help Window.
Default: 255
@default 255

@param Item Help Window Opacity (Battle)
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Battle Item Help Window.
Default: 255
@default 255

@param Gameover Help Window Opacity
@parent 7 - Help Window Opacity
@type number
@min 0
@max 255
@desc Opacity of Gameover Help Window.
Default: 255
@default 255


@help
-----------------------------------------------------------------------------
Introduction
-----------------------------------------------------------------------------

Version -> 1.02

This plugin was tested only on RPG Maker MV Version 1.6.2.
I cannot guarantee it works on lower versions.

Terms of Use:
 - Available for commercial and non-commercial use
 - You may freely edit the code
 - You are not allowed to redistribute this plugin. Instead,
 provide a link(https://vcm-plugins.itch.io/vcm-helpwindow)
 - Do not claim this plugin as your own
 - Credit is not required. However, if you want to, credit me as 'VCM Plugins'

This plugin controls the Help Window in 40 possible Scenarios.
This includes when it will appear and its Position, Text,
Windowskin, Font Settings and Opacity. It also creates 26 new
Text Codes from a to z, usable within the Help Window
in all the aforementioned scenarios. The scenarios are:

Title Help Window
Map Help Window
Choice List Help Window (Map)
Number Input Help Window (Map)
Select Item Help Window (Map)
Message Help Window (Map)
Scroll Text Help Window (Map)
Menu Help Window
Menu Status Help Window
Menu Actor Help Window
Item Category Help Window (Menu)
Item List Help Window (Menu)
Skill Type Help Window (Menu)
Skill List Help Window (Menu)
Equip Command Help Window (Menu)
Equip Slot Help Window (Menu)
Equip List Help Window (Menu)
Status Help Window
Options Help Window
Save Help Window
Load Help Window
Game End Help Window
Shop Command Help Window
Shop Item Category Help Window
Shop Item List Help Window
Shop Item Number Help Window
Name Input Help Window
Choice List Help Window (Battle)
Number Input Help Window (Battle)
Select Item Help Window (Battle)
Message Help Window (Battle)
Scroll Text Help Window (Battle)
Log Help Window (Battle)
Party Command Help Window (Battle)
Actor Command Help Window (Battle)
Actor Help Window (Battle)
Enemy Help Window (Battle)
Skill Help Window (Battle)
Item Help Window (Battle)
Gameover Help Window

This documentation contains the following subheaders:
Introduction
Parameters Overview
Custom Text Codes Default Values Explanation
Help Window Text Explanation
<Eval: >
Script Calls
Script Calls Examples
Optimization
Compatibility
Versions


-----------------------------------------------------------------------------
Parameters Overview
-----------------------------------------------------------------------------

Help Window Wordwrapping
Disabled(false) by default. Enabling it will automatically break line
whenever the Help Window Text Width is higher than the Help Window Width.
You can still break lines normally in the item description (if applicable)
or using \n (provided you don't change the n Parameter).
This will not break line in the middle of words. For example,
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
will not activate the break line and if the Text Width is higher
than the Help Window Width, the text will be cropped.

1 - Custom Text Codes
This section contains 26 parameters from a to z. The value you put in
those parameters is an eval that will be executed whenever "\char" is put
in the Help Window Text. For example, "\a" will run the code in the
a parameter. It isn't necessary for the code to return a value. If the code
in the parameter is invalid, it will just remove the "\char" and show a log
in your debug console, specifying the parameter with the invalid code.
Depending on where you are setting the text, the syntax may change slightly.
See the 4 - Help Window Text section for more details. For a detailed
explanation of the default values, check the Custom Text Codes Explanation.

2 - Show Help Window
This section contains 40 parameters. It determines whether the Help Window
will appear in the specific scenario. Setting the value to Show(true) will
show the Help Window, else, it will hide it. If you opt for the latter,
most other Parameters for that scenario will be rendered useless.
For example, setting the Title Help Window parameter to Hide(false),
will make the Title Help Window Position, Title Help Window Text,
Title Help Window Windowskin, Title Help Window Font and
Title Help Window Opacity parameters useless.

3 - Help Window Position
This section contains 40 parameters. It determines the Help Window x and y
positions, as well as its width and height in the specific scenario. The
parameters are objects and all values are numbers. If setting the objects
textually, refer to the default value, which usually is
{"x":"0","y":"0","Width":"816","Height":"108"}. The higher the x value,
the farther it will start in the right. The higher the y value, the lower
it will start. If the x or y values are higher than the game screen's
width and height, respectively, it will not be visible. If you want to set
negative values, you must do it textually. If x + Width <= 0 or
y + Height <= 0 or Width <= 0 or Height <= 0, it will not appear.
Putting values that aren't numbers may throw errors.

4 - Help Window Text
This section contains 31 parameters(scenarios the RPG Maker MV already
covers aren't included). It determines what will be shown in the Help
Window in the specific scenario. This may include images(provided the
adequate text code is used). The Map Help Window Text,
Number Input Help Window Text (Map), Message Help Window Text (Map),
Scroll Text Help Window Text (Map), Shop Item Number Help Window Text,
Name Input Help Window Text, Number Input Help Window Text (Battle),
Message Help Window Text (Battle), Scroll Text Help Window Text (Battle),
Log Help Window Text (Battle) and Gameover Help Window Text parameters
are plain text. Usually anything you put there will be shown as you wrote.
However, all other parameters in this section are arrays of strings.
If you set them with the Text List, it works identical to the other
parameters. However when setting it textually, you must write it as an
array of strings. For example, ["Fight","Escape"] or ["Status"].
For a detailed explanation about how and when the values are used,
check the Help Window Text Explanation. Notes:
 - Text Codes, be it from the default engine or provided by this plugin
may be used.
 - Numbers-only Text need \, like \5. Putting just 5 may throw errors.
 - When using "", it may change how you call Text Codes. Try using \\.
Examples: 
\I[1] = standard draw icon 1;
"\I[1]" = inconsistency;
"\\I[1]" = standard draw icon 1;
\n = n parameter provided by this plugin;
"\n" = standard break line;
"\\n" = n parameter provided by this plugin;
\p = p parameter provided by this plugin;
"\\p" = p parameter provided by this plugin;
5 = error;
\5 = 5;
"\5" = error;
"\\5" = 5;

5 - Help Window Windowskin
This section contains 40 parameters. It allows you to determine which
Windowskin you will use for the Help Window in the specific scenario.
The image should be a png file located in the img\system folder.
When setting the value textually, don't use the extension. For example,
Window or "Window", works fine, while Window.png or "Window.png", don't.
If the value is invalid, it may throw errors. Using unsuitable files
may have unexpected results. For example, using "Shadow 1" as Windowskin
probably will show no Window for being too small.

6 - Help Window Font
This section contains 40 parameters. It allows you to determine the
Font Settings for the Help Window in the specific scenario.
The parameters are objects whose default value is
{"Font":"GameFont","Font Size":"28","Italic":"false",
"Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)",
"Text Outline Width":"4"}. Font specifies the Font Name. Even if
it works on your machine without, remember to add the Font to your game
if you distribute it. Font Size is a number. If its value be 0 or
lower it will not appear. Putting values that aren't numbers may throw
errors. Italic determines wheter the font will be in Italic(if true)
or not(if false). Putting non-boolean values may throw errors.
Text Color specifies the color of the text. You may use several ways
to show color, such as Hex("#ffffff") or RGBA(rgba("217, 136, 74, 1")).
Search about Javascript colors to learn more. Invalid values will make
the Text Color be black. Text Outline Color determines the color of the
text contour. The same rules of Text Color apply here. Text Outline Width
specifies the width of the text contour. It is a number, and if equal
to 0, it will not be visible. If lower than 0, it will appear differently.
If it is too big, it may block the actual text.

7 - Help Window Opacity
This section contains 40 parameters. It allows you to determine the
opacity of the Help Window in the specific scenario. The value should
be a number between 0 and 255. Any value lower than 0 will be converted
to 0, and any value higher than 255 will become 255. The higher the value,
the more opaque becomes the window. With an opacity of 0, the window will
become transparent, but the text will still be visible. Putting values
textually that aren't numbers may throw errors.

-----------------------------------------------------------------------------
Custom Text Codes Default Values Explanation
-----------------------------------------------------------------------------

parameter a
Default: if($gameParty.inBattle()){if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){if(item.hitType === 1){"Accuracy: " + item.successRate * BattleManager.actor().hit + "%";}else{"Accuracy: " + item.successRate + "%";}}}}
Explanation: This code will only return a value when selecting a skill
or an item in battle. It will show the accuracy of the skill or item
using the default calculation run by the engine. It doesn't considers
the enemy evasion, since it is calculated separately(an enemy with
5% Evasion Rate still has 5% chance of evading an actor with 1000%
Hit Rate). Only Physical Attacks consider the actor's Hit Rate. Example:
Accuracy: 95%

parameter b
Default: "Battles Won: " + $gameSystem._winCount + " / " + $gameSystem._battleCount;
Explanation: This code will return the number of battles won and
how many battles you already fought in your game. Both values will always
be 0 in the title. The battle count is added whenever you start a battle and
the win count, after the battle's victory message. Example:
Battles Won: 5 / 6

parameter c
Default: if($gameParty.inBattle()){if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){if(item.damage.critical){"Critical Chance: " + BattleManager.actor().cri * 100 + "%";}else{"Critical Chance: 0%";}}}}
Explanation: This code will only return a value when selecting a skill
or an item in battle. It will show the critical chance of the skill or item,
using the default calculation run by the engine. If it is unable to do
critical hits, the value will be 0%, else it will be entirely dependent
on the actor's Critical Rate. It doesn't considers the enemy Critical
Evasion. Example:
Critical Chance: 4%

parameter d
Default: if($gameParty.inBattle()){var a = BattleManager.actor();var b = null;for(var i = 0; i < BattleManager.allBattleMembers().length; i++){if(BattleManager.allBattleMembers()[i]._selected){b = BattleManager.allBattleMembers()[i];break;}}if(b){"Damage: " + Math.round(eval($dataSkills[a._actions[0]._item._itemId].damage.formula) * b.elementRate($dataSkills[a._actions[0]._item._itemId].damage.elementId) * ((-$dataSkills[a._actions[0]._item._itemId].damage.variance / 100) + 1)) + " - " + Math.round(eval($dataSkills[a._actions[0]._item._itemId].damage.formula) * b.elementRate($dataSkills[a._actions[0]._item._itemId].damage.elementId) * ($dataSkills[a._actions[0]._item._itemId].damage.variance / 100 + 1));}}
Explanation: This code will only return a value if an enemy or actor
is being selected in battle. It will calculate the minimum and maximum
value of the already chosen item or skill damage formula, using the
default calculation run by the engine. It doesn't considers critical
hits, effects, damage types or repeats. Example:
Damage: 35 - 53

parameter e
Default: if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){$dataSystem.elements[item.damage.elementId];}}
Explanation: This code will only return a value when selecting a skill
or an item in battle. It will show the element of the skill or item,
ignoring it if set to "None" or "Normal Attack". Example:
Thunder

parameter f
Default:  if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){if(item.damage.formula != 0){"Formula: " + item.damage.formula;}}}
Explanation: This code will only return a value when selecting a skill
or an item in battle. It will copy the formula of the skill or item,
ignoring it if equal to "0" or not set. Example:
Formula: a.atk * 4 - b.def * 2

parameter g
Default: if($gameParty.inBattle() && $gameSystem.isSideView()){if(BattleManager.actor()){BattleManager.actor().startAnimation(51);}}
Explanation: This code never returns a value. Instead it plays the
animation 51 in the currently performing actor in battle, doing
nothing if in frontview or undefined.

parameter h
Default: "Heals";
Explanation: This code returns the word "Heals". Example:
Heals

parameter i
Default: if($gameParty.inBattle()){var hp = 0; var mp = 0; var tp = 0; var atk = 0; var def = 0; var mat = 0; var mdf = 0; var agi = 0; var luk = 0;for(var i = 0; i < $gameTroop.aliveMembers().length; i++){hp += $gameTroop.aliveMembers()[i].hp;mp += $gameTroop.aliveMembers()[i].mp;tp += $gameTroop.aliveMembers()[i].tp;atk += $gameTroop.aliveMembers()[i].atk;def += $gameTroop.aliveMembers()[i].def;mat += $gameTroop.aliveMembers()[i].mat;mdf += $gameTroop.aliveMembers()[i].mdf;agi += $gameTroop.aliveMembers()[i].agi;luk += $gameTroop.aliveMembers()[i].luk;}"Troop Averages -> HP: " + Math.round(hp / $gameTroop.aliveMembers().length) + " | MP: " + Math.round(mp / $gameTroop.aliveMembers().length) + " | TP: " + Math.round(tp / $gameTroop.aliveMembers().length) + " | ATK: " + Math.round(atk / $gameTroop.aliveMembers().length) + " | DEF: " + Math.round(def / $gameTroop.aliveMembers().length) + " | MAT: " + Math.round(mat / $gameTroop.aliveMembers().length) + " | MDF: " + Math.round(mdf / $gameTroop.aliveMembers().length) + " | AGI: " + Math.round(agi / $gameTroop.aliveMembers().length) + " | LUK: " + Math.round(luk / $gameTroop.aliveMembers().length);}
Explanation: This code will only return a value when in battle.
It will return the rounded average HP, MP, TP, ATK, DEF, MAT, MDF, AGI
and LUK, respectively, of the current alive troop members. Example:
Troop Averages -> HP: 250 | MP: 0 | TP: 7 | ATK: 30 | DEF: 30 | MAT: 30 | MDF: 30 | AGI: 30 | LUK: 30

parameter j
Default: if($gameParty.inBattle()){if(BattleManager.isInputting()){var actions = "Next Enemy Actions -> ";for(var i = 0; i < $gameTroop.aliveMembers().length; i++){if($gameTroop.aliveMembers()[i].restriction() < 1){if($gameTroop.aliveMembers()[i]._actions[0]._item._itemId){actions += $gameTroop.aliveMembers()[i].name() + ": \\I[" + $dataSkills[$gameTroop.aliveMembers()[i]._actions[0]._item._itemId].iconIndex + "]" + $dataSkills[$gameTroop.aliveMembers()[i]._actions[0]._item._itemId].name;if(i < $gameTroop.aliveMembers().length - 1){actions += " | ";}}}}actions;}}
Explanation: This code will only return a value when in the input phase
of a battle. It will reveal the skills that will be used by all alive and
non-restricted enemies in the current turn. This may still change during
the turn(killing enemies, putting them to sleep...).
Example(consider \\I[x] as drawn Icons):
Next Enemy Actions -> Bat: \\I[76]Normal Attack | Slime: \\I[66]Spark

parameter k
Default: if($gameParty.inBattle()){if(BattleManager._canEscape){"Chance of Escaping: " + Math.round(Math.min(BattleManager._escapeRatio * 100, 100)) + "%";}}
Explanation: This code will only return a value when in a battle in which
the player can escape. It will return the rounded chance of escaping
that battle, up to 100%. Example:
Chance of Escaping: 53%

parameter l
Default: if($gameParty.inBattle()){if(BattleManager._logWindow._lines.length > 1){BattleManager._logWindow._lines[BattleManager._logWindow._lines.length - 2] + "\n" + BattleManager._logWindow._lines[BattleManager._logWindow._lines.length - 1];}else if(BattleManager._logWindow._lines.length > 0){BattleManager._logWindow._lines[0];}}
Explanation: This code will only return a value when there are lines in
the battle log window. It will copy its two latest lines. Example:
Harold attacks!
Slime A took 41 damage!

parameter m
Default: if(AudioManager._currentBgm !== null){AudioManager._currentBgm.name;}
Explanation: This code will only return a value if there is a bgm
playing in the moment of its use. It will return the current bgm. Example:
Theme6

parameter n
Default: "\n";
Explanation: This code will return the default break line text code.
This allows \n and "\n" and "\\n" to have the same functionality.

parameter o
Default: if($gameParty.inBattle()){"Turn: " + $gameTroop._turnCount;}
Explanation: This code will only return a value when in battle.
It will return the current battle's turn. Example:
Turn: 1

parameter p
Default: $gameSystem.playtimeText();
Explanation: This code will return the game's current playtime.
Example:
00:00:09

parameter q
Default: $gameParty._steps;
Explanation: This code will return the number of steps the player
walked in maps during the game. Example:
31

parameter r
Default: if($gameParty.inBattle()){var stateResist = "State Resist: ";for(var i = 0; i < BattleManager.allBattleMembers().length; i++){if(BattleManager.allBattleMembers()[i]._selected){for(var j = 0; j < BattleManager.allBattleMembers()[i].stateResistSet().length; j++){stateResist += "\\I[" + $dataStates[BattleManager.allBattleMembers()[i].stateResistSet()[j]].iconIndex + "]" + $dataStates[BattleManager.allBattleMembers()[i].stateResistSet()[j]].name;if(j < BattleManager.allBattleMembers()[i].stateResistSet().length - 1){stateResist += ", ";}}stateResist;break;}}}
Explanation: This code will only return a value if an enemy or actor
is being selected in battle. It will return all state resistances
of the selected battler. Example(consider \\I[x] as drawn Icons):
State Resist: \\I[6]Confusion, \\I[7]Fascination, \\I[8]Sleep

parameter s
Default: if($gameParty.inBattle()){var skills = "Skills: ";for(var i = 0; i < $gameTroop.aliveMembers().length; i++){if($gameTroop.aliveMembers()[i]._selected){for(var j = 0; j < $gameTroop.aliveMembers()[i].enemy().actions.length; j++){skills += "\\I[" + $dataSkills[$gameTroop.aliveMembers()[i].enemy().actions[j].skillId].iconIndex + "]" + $dataSkills[$gameTroop.aliveMembers()[i].enemy().actions[j].skillId].name;if(j < $gameTroop.aliveMembers()[i].enemy().actions.length - 1){skills += ", ";}}skills;break;}}}
Explanation: This code will only return a value if an enemy is being
selected in battle. It will return all skills of the selected enemy.
Example(consider \\I[x] as drawn Icons):
Skills: \\I[76]Dual Attack, \\I[66]Spark, \\I[64]Fire, \\I[72]Heal

parameter t
Default: if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){if(item.scope === 1){"Targets 1 Enemy";}else if(item.scope === 2){"Targets All Enemies";}else if(item.scope === 3){"Targets 1 Random Enemy";}else if(item.scope === 4){"Targets 2 Random Enemies";}else if(item.scope === 5){"Targets 3 Random Enemies";}else if(item.scope === 6){"Targets 4 Random Enemies";}else if(item.scope === 7){"Targets 1 Ally";}else if(item.scope === 8){"Targets All Allies";}else if(item.scope === 9){"Targets 1 Ally (Dead)";}else if(item.scope === 10){"Targets All Allies (Dead)";}else if(item.scope === 11){"Targets The User";}}}
Explanation: This code will only return a value when selecting a skill
or an item in battle. It will reveal the scope of the skill or item.
Example:
Targets 2 Random Enemies

parameter u
Default: $gameSystem.setHelpWindowTone(255, 0, 0);
Explanation: This code never returns a value. Instead, it calls
the $gameSystem.setHelpWindowTone(red, green, blue) Plugin Script
Call to make the Help Window Tone red.

parameter v
Default: if($gameParty.inBattle()){for(var i = 0; i < BattleManager.allBattleMembers().length; i++){if(BattleManager.allBattleMembers()[i]._selected){"NAME: " + BattleManager.allBattleMembers()[i].name() + " | HP: " + BattleManager.allBattleMembers()[i].hp + "/" + BattleManager.allBattleMembers()[i].mhp + " | MP: " + BattleManager.allBattleMembers()[i].mp + " | TP: " + BattleManager.allBattleMembers()[i].tp + " | ATK: " + BattleManager.allBattleMembers()[i].atk + " | DEF: " + BattleManager.allBattleMembers()[i].def + " | MAT: " + BattleManager.allBattleMembers()[i].mat + " | MDF: " + BattleManager.allBattleMembers()[i].mdf + " | AGI: " + BattleManager.allBattleMembers()[i].agi + " | LUK: " + BattleManager.allBattleMembers()[i].luk;break;}}}
Explanation: This code will only return a value if an enemy or actor
is being selected in battle. It will return the name, HP, MAX HP,
MP, TP, ATK, DEF, MAT, MDF, AGI and LUK, respectively, of the selected
battler. Example:
NAME: ORC | HP: 177 / 300 | MP: 0 | TP: 37 | ATK: 30 | DEF: 30 | MAT: 30 | MDF: 30 | AGI: 30 | LUK: 30

parameter w
Default: if($gameParty.inBattle()){if(BattleManager.actor()){if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){"Speed: " + (BattleManager.actor().agi + item.speed) + " - " + (BattleManager.actor().agi + Math.floor(5 + BattleManager.actor().agi / 4) + item.speed);}}}}
Explanation: This code will only return a value when selecting a skill
or an item in battle. It will show the minimum and maximum speed of
the action, using the default calculation run by the engine. Example:
Speed: 42 - 55

parameter x
Default: "Map Coordinates: " + $gamePlayer._x + "," + $gamePlayer._y;
Explanation: This code will return the player's coordinates on the
current map. Active even in the Title and Battle screens. Example:
Map Coordinates: 6,5

parameter y
Default: if($gameParty.inBattle()){for(var i = 0; i < SceneManager._scene._spriteset._enemySprites.length; i++){if(SceneManager._scene._spriteset._enemySprites[i]._battler._selected){$gameSystem._VCMHelpWindow['Enemy Help Window Position (Battle)'].y = SceneManager._scene._spriteset._enemySprites[i]._battler._screenY - SceneManager._scene._spriteset._enemySprites[i].height - this.height;this.y = SceneManager._scene._spriteset._enemySprites[i]._battler._screenY - SceneManager._scene._spriteset._enemySprites[i].height - this.height;break;}}}"";
Explanation: This code never returns a value and will only have an effect
if an enemy is being selected in battle. It puts the y value of the
Enemy Help Window Position (Battle) just over the current selected enemy's
sprite.

parameter z
Default: if($gameParty.inBattle() && $gameSystem.isSideView()){for(var i = 0; i < SceneManager._scene._spriteset._actorSprites.length; i++){if(SceneManager._scene._spriteset._actorSprites[i]._battler._selected){$gameSystem._VCMHelpWindow['Actor Help Window Position (Battle)'].y = SceneManager._scene._spriteset._actorSprites[i]._homeY - 64 - this.height;this.y = SceneManager._scene._spriteset._actorSprites[i]._homeY - 64 - this.height;break;}}}"";
Explanation: This code never returns a value and will only have an effect
if an actor is being selected in battle. It puts the y value of the
Actor Help Window Position (Battle) just over the current selected actor's
sprite.

-----------------------------------------------------------------------------
Help Window Text Explanation
-----------------------------------------------------------------------------

See the Plugin Script Calls Examples for how to change the parameters
values mid-game.

Title Help Window Text
Default: ["New Game","Continue","Options"]
Explanation: This parameter contains the text that will be shown
whenever the player is in the title screen. This parameter is an array
of strings. It will show text based on the currently selected command's
position, starting from the top. If the current command's position is
higher than the array's length, the first value will be used.
Any values in the array whose index(starting from 0) is equal or
higher than the number of commands will never be used. Examples:
3 commands and 3 values
Command 1 = Array[0] = New Game
Command 2 = Array[1] = Continue
Command 3 = Array[2] = Options
4 commands and 3 values
Command 1 = Array[0] = New Game
Command 2 = Array[1] = Continue
Command 3 = Array[2] = Options
Command 4 = Array[0] = New Game
2 commands and 3 values
Command 1 = Array[0] = New Game
Command 2 = Array[1] = Continue

Map Help Window Text
Default: Map
Explanation: This parameter contains the text that will be shown
whenever the player is active in the map. Example:
Map

Choice List Help Window Text (Map)
Default: ["Choice1","Choice2","Choice3","Choice4","Choice5","Choice6"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting from a choice list in the map.
This parameter is an array of strings. It will show text based on the
currently selected command's position, starting from the top.
If the current command's position is higher than the array' length,
the first value will be used. Any values in the array whose index
(starting from 0) is equal or higher than the number of commands
will never be used. Examples:
6 commands and 6 values
Command 1 = Array[0] = Choice1
Command 2 = Array[1] = Choice2
Command 3 = Array[2] = Choice3
Command 4 = Array[3] = Choice4
Command 5 = Array[4] = Choice5
Command 6 = Array[5] = Choice6
3 commands and 2 values
Command 1 = Array[0] = Choice1
Command 2 = Array[1] = Choice2
Command 3 = Array[0] = Choice1
2 commands and 6 values
Command 1 = Array[0] = Choice1
Command 2 = Array[1] = Choice2

Number Input Help Window Text (Map)
Default: Map Number Input
Explanation: This parameter contains the text that will be shown
whenever the player is inputting numbers in the map. Example:
Map Number Input

Message Help Window Text (Map)
Default: Map Message
Explanation: This parameter contains the text that will be shown
whenever a message is shown in the map. Example:
Map Message

Scroll Text Help Window Text (Map)
Default: Map Scroll Text
Explanation: This parameter contains the text that will be shown
whenever a scrolling text is shown in the map. Example:
Map Scroll Text

Menu Help Window Text
Default: ["Item","Skill","Equip","Status","Formation","Options","Save","Game End"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting from the menu. This parameter is
an array of strings. It will show text based on the currently selected
command's position, starting from the top. If the current command's position
is higher than the array's length, the first value will be used.
Any values in the array whose index(starting from 0) is equal or higher
than the number of commands will never be used. Examples:
8 commands and 8 values
Command 1 = Array[0] = Item
Command 2 = Array[1] = Skill
Command 3 = Array[2] = Equip
Command 4 = Array[3] = Status
Command 5 = Array[4] = Formation
Command 6 = Array[5] = Options
Command 7 = Array[6] = Save
Command 8 = Array[7] = Game End
2 commands and 1 value
Command 1 = Array[0] = Item
Command 2 = Array[0] = Item
4 commands and 8 values
Command 1 = Array[0] = Item
Command 2 = Array[1] = Skill
Command 3 = Array[2] = Equip
Command 4 = Array[3] = Status

Menu Status Help Window Text
Default: ["Actor1","Actor2","Actor3","Actor4"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting an actor in the menu. This parameter
is an array of strings. It will show text based on the currently
selected actor's id, starting from the first entry in the Actors Database
Tab. If the current actor's id is higher than the array's length,
the first value will be used. Any values in the array whose index
(starting from 0) is equal or higher than the number of actors will
never be used. Examples:
actor ids 1,2,3,4 and 4 values
Actor Id 1 = Array[0] = Actor 1
Actor Id 2 = Array[1] = Actor 2
Actor Id 3 = Array[2] = Actor 3
Actor Id 4 = Array[3] = Actor 4
actor ids 1,2,7,4 and 4 values
Actor Id 1 = Array[0] = Actor 1
Actor Id 2 = Array[1] = Actor 2
Actor Id 7 = Array[0] = Actor 1
Actor Id 4 = Array[3] = Actor 4
actor ids 1,3 and 5 values
Actor Id 1 = Array[0] = Actor 1
Actor Id 3 = Array[2] = Actor 3

Menu Actor Help Window Text
Default: ["Actor1","Actor2","Actor3","Actor4"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting an actor with an item or skill
while out of battle. This parameter is an array of strings.
It will show text based on the currently selected actor's id,
starting from the first entry in the Actors Database Tab.
If the current actor's id is higher than the array's length,
the first value will be used. Any values in the array whose index
(starting from 0) is equal or higher than the number of actors will
never be used. Examples:
actor ids 1,4,3,2 and 4 values
Actor Id 1 = Array[0] = Actor 1
Actor Id 4 = Array[3] = Actor 4
Actor Id 3 = Array[2] = Actor 3
Actor Id 2 = Array[1] = Actor 2
actor ids 1,2,5 and 3 values
Actor Id 1 = Array[0] = Actor 1
Actor Id 2 = Array[1] = Actor 2
Actor Id 5 = Array[0] = Actor 1
actor ids 1,8 and 9 values
Actor Id 1 = Array[0] = Actor 1
Actor Id 8 = Array[8] = Actor 9

Item Category Help Window Text (Menu)
Default: ["Item","Weapon","Armor","Key Item"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting item categories outside of the shop.
This parameter is an array of strings. It will show text based on
the currently selected command's position, starting from the left.
If the current command's position is higher than the array's length,
the first value will be used. Any values in the array whose index
(starting from 0) is equal or higher than the number of commands
will never be used. Examples:
4 commands and 4 values
Command 1 = Array[0] = Item
Command 2 = Array[1] = Weapon
Command 3 = Array[2] = Armor
Command 4 = Array[3] = Key Item
4 commands and 3 values
Command 1 = Array[0] = Item
Command 2 = Array[1] = Weapon
Command 3 = Array[2] = Armor
Command 4 = Array[0] = Item
2 commands and 3 values
Command 1 = Array[0] = Item
Command 2 = Array[1] = Weapon

Skill Type Help Window Text (Menu)
Default: ["Magic","Special"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting a skill type while out of battle.
This parameter is an array of strings. It will show text based
on the currently selected skill type's id, starting from the first
entry in Skill Types, located in the Types Database Tab.
If the current skill type's id is higher than the array's length,
the first value will be used. Any values in the array whose index
(starting from 0) is equal or higher than the number of skill types
will never be used. Examples:
skill types ids 1,2 and 2 values
Skill Type Id 1 = Array[0] = Magic
Skill Type Id 2 = Array[1] = Special
skill types ids 1,2,4 and 3 values
Skill Type Id 1 = Array[0] = Magic
Skill Type Id 2 = Array[1] = Special
Skill Type Id 4 = Array[0] = Magic
skill type id 2 and 2 values
Skill Type Id 2 = Array[1] = Special

Equip Command Help Window Text (Menu)
Default: ["Equip","Optimize","Clear"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting equip commands. This parameter is an
array of strings. It will show text based on the currently selected
command's position, starting from the left. If the current command's
position is higher than the array's length, the first value will be used.
Any values in the array whose index(starting from 0) is equal or
higher than the number of commands will never be used. Examples:
3 commands and 3 values
Command 1 = Array[0] = Equip
Command 2 = Array[1] = Optimize
Command 3 = Array[2] = Clear
5 commands and 3 values
Command 1 = Array[0] = Equip
Command 2 = Array[1] = Optimize
Command 3 = Array[2] = Clear
Command 4 = Array[0] = Equip
Command 5 = Array[0] = Equip
2 commands and 3 values
Command 1 = Array[0] = Equip
Command 2 = Array[1] = Optimize

Status Help Window Text
Default: ["Status"]
Explanation: This parameter contains the text that will be shown
whenever the player is seeing an actor's status. This parameter
is an array of strings. It will show text based on the already chosen
actor's id, starting from the first entry in the Actors Database Tab.
If the current actor's id is higher than the array' length, the first value
will be used. Any values in the array whose index(starting from 0) is
equal or higher than the number of actors will never be used. Examples:
actor id 1 and 1 value
Actor Id 1 = Array[0] = Status
actor ids 1,4,3,2 and 1 value
Actor Id 1 = Array[0] = Status
Actor Id 4 = Array[0] = Status
Actor Id 3 = Array[0] = Status
Actor Id 2 = Array[0] = Status
actor id 3 and 5 values
Actor Id 3 = Array[2] = Actor 3

Options Help Window Text
Default: ["Always Dash","Command Remember","BGM Volume","BGS Volume","ME Volume","SE Volume"]
Explanation: This parameter contains the text that will be shown
whenever the player is in the Options Scene. This parameter is an
array of strings. It will show text based on the currently selected
command's position, starting from the top. If the current command's position
is higher than the array's length, the first value will be used.
Any values in the array whose index(starting from 0) is equal or higher
than the number of commands will never be used. Examples:
6 commands and 6 values
Command 1 = Array[0] = Always Dash
Command 2 = Array[1] = Command Remember
Command 3 = Array[2] = BGM Volume
Command 4 = Array[3] = BGS Volume
Command 5 = Array[4] = ME Volume
Command 6 = Array[5] = SE Volume
3 commands and 2 values
Command 1 = Array[0] = Always Dash
Command 2 = Array[1] = Command Remember
Command 3 = Array[0] = Always Dash
2 commands and 6 values
Command 1 = Array[0] = Always Dash
Command 2 = Array[1] = Command Remember

Save Help Window Text
Default: ["Save to which file?"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting files to save the game.
This parameter is an array of strings. It will show text based on the
currently selected savefile's position, starting from the top. If the
current savefile's position is higher than the array's length, the
first value will be used. Any values in the array whose index
(starting from 0) is equal or higher than the number of savefiles
will never be used. Examples:
1 savefile and 1 value
Savefile 1 = Array[0] = Save to which file?
5 savefiles and 2 values
Savefile 1 = Array[0] = File 1
Savefile 2 = Array[1] = File 2
Savefile 3 = Array[0] = File 1
Savefile 4 = Array[0] = File 1
Savefile 5 = Array[0] = File 1
1 savefile and 2 values
Savefile 1 = Array[0] = Save to which file?

Load Help Window Text
Default: ["Load which file?"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting files to load the game.
This parameter is an array of strings. It will show text based on the
currently selected savefile's position, starting from the top. If the
current savefile's position is higher than the array's length, the
first value will be used. Any values in the array whose index
(starting from 0) is equal or higher than the number of savefiles
will never be used. Examples:
1 savefile and 1 value
Savefile 1 = Array[0] = Load to which file?
5 savefiles and 2 values
Savefile 1 = Array[0] = File 1
Savefile 2 = Array[1] = File 2
Savefile 3 = Array[0] = File 1
Savefile 4 = Array[0] = File 1
Savefile 5 = Array[0] = File 1
1 savefile and 2 values
Savefile 1 = Array[0] = Load to which file?

Game End Help Window Text
Default: ["To Title","Cancel"]
Explanation: This parameter contains the text that will be shown
whenever the player is in the Game End Scene. This parameter is an
array of strings. It will show text based on the currently selected
command's position, starting from the top. If the current command's
position is higher than the array's length, the first value will be used.
Any values in the array whose index(starting from 0) is equal or higher
than the number of commands will never be used. Examples:
2 commands and 2 values
Command 1 = Array[0] = To Title
Command 2 = Array[1] = Cancel
3 commands and 2 values
Command 1 = Array[0] = To Title
Command 2 = Array[1] = Cancel
Command 3 = Array[0] = To Title
1 command and 2 values
Command 1 = Array[0] = To Title

Shop Command Help Window Text
Default: ["Buy","Sell","Cancel"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting shop commands. This parameter is an
array of strings. It will show text based on the currently selected
command's position, starting from the left. If the current command's
position is higher than the array's length, the first value will be used.
Any values in the array whose index(starting from 0) is equal or
higher than the number of commands will never be used. Examples:
3 commands and 3 values
Command 1 = Array[0] = Buy
Command 2 = Array[1] = Sell
Command 3 = Array[2] = Cancel
5 commands and 3 values
Command 1 = Array[0] = Buy
Command 2 = Array[1] = Sell
Command 3 = Array[2] = Cancel
Command 1 = Array[0] = Buy
Command 1 = Array[0] = Buy
2 commands and 3 values
Command 1 = Array[0] = Buy
Command 2 = Array[1] = Sell

Shop Item Category Help Window Text
Default: ["Item","Weapon","Armor","Key Item"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting item categories in the shop.
This parameter is an array of strings. It will show text based
on the currently selected command's position, starting from the left.
If the current command's position is higher than the array's length,
the first value will be used. Any values in the array whose index
(starting from 0) is equal or higher than the number of commands
will never be used. Examples:
4 commands and 4 values
Command 1 = Array[0] = Item
Command 2 = Array[1] = Weapon
Command 3 = Array[2] = Armor
Command 4 = Array[3] = Key Item
4 commands and 3 values
Command 1 = Array[0] = Item
Command 2 = Array[1] = Weapon
Command 3 = Array[2] = Armor
Command 4 = Array[0] = Item
2 commands and 3 values
Command 1 = Array[0] = Item
Command 2 = Array[1] = Weapon

Shop Item Number Help Window Text
Default: Item Number
Explanation: This parameter contains the text that will be shown
whenever the player is inputting the number of items to be bought
or sold. Example:
Item Number

Name Input Help Window Text
Default: Name Input
Explanation: This parameter contains the text that will be shown
whenever the player is inputting a name. Example:
Name Input

Choice List Help Window Text (Battle)
Default: ["Choice1","Choice2","Choice3","Choice4","Choice5","Choice6"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting from a choice list in battle.
This parameter is an array of strings. It will show text based on the
currently selected command's position, starting from the top.
If the current command's position is higher than the array's length,
the first value will be used. Any values in the array whose index
(starting from 0) is equal or higher than the number of commands
will never be used. Examples:
6 commands and 6 values
Command 1 = Array[0] = Choice1
Command 2 = Array[1] = Choice2
Command 3 = Array[2] = Choice3
Command 4 = Array[3] = Choice4
Command 5 = Array[4] = Choice5
Command 6 = Array[5] = Choice6
3 commands and 2 values
Command 1 = Array[0] = Choice1
Command 2 = Array[1] = Choice2
Command 3 = Array[0] = Choice1
2 commands and 6 values
Command 1 = Array[0] = Choice1
Command 2 = Array[1] = Choice2

Number Input Help Window Text (Battle)
Default: Battle Number Input
Explanation: This parameter contains the text that will be shown
whenever the player is inputting numbers in battle. Example:
Battle Number Input

Message Help Window Text (Battle)
Default: Battle Message
Explanation: This parameter contains the text that will be shown
whenever a message is shown in battle. Example:
Battle Message

Scroll Text Help Window Text (Battle)
Default: Battle Scroll Text
Explanation: This parameter contains the text that will be shown
whenever a scrolling text is shown in the map. Example:
Battle Scroll Text

Log Help Window Text (Battle)
Default: Log
Explanation: This parameter contains the text that will be shown
whenever a new line is shown in the Battle Log Window. Example:
Log

Party Command Help Window Text (Battle)
Default: ["Fight","Escape"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting commands in the Party Command.
This parameter is an array of strings. It will show text based on
the currently selected command's position, starting from the top.
If the current command's position is higher than the array's length,
the first value will be used. Any values in the array whose index
(starting from 0) is equal or higher than the number of commands
will never be used. Examples:
2 commands and 2 values
Command 1 = Array[0] = Fight
Command 2 = Array[1] = Escape
3 commands and 2 values
Command 1 = Array[0] = Fight
Command 2 = Array[1] = Escape
Command 3 = Array[0] = Fight
1 command and 2 values
Command 1 = Array[0] = Fight

Actor Command Help Window Text (Battle)
Default: ["Attack","Magic","Special","Guard","Item"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting commands in the Actor Command.
This parameter is an array of strings. It will show text based on the
currently selected command's position, starting from the top. All text
for Skill Types must be inside the array, after the first command,
ordered from the lowest id to highest, to work the way it's intended
(it will skip any skill type the actor doesn't possesses).
If the current command's position is higher than the array's length,
the first value will be used. Examples:
5 commands(including all skill types) and 5 values
Command 1 = Array[0] = Attack
Command 2 = Array[1] = Magic
Command 3 = Array[2] = Special
Command 4 = Array[3] = Guard
Command 5 = Array[4] = Item
6 commands(including all skill types) and 5 values
Command 1 = Array[0] = Attack
Command 2 = Array[1] = Magic
Command 3 = Array[2] = Special
Command 4 = Array[3] = Guard
Command 5 = Array[4] = Item
Command 6 = Array[0] = Attack
4 commands(one of them "Special") and 5 values
Command 1 = Array[0] = Attack
Command 2 = Array[2] = Special
Command 3 = Array[3] = Guard
Command 4 = Array[4] = Item

Actor Help Window Text (Battle)
Default: ["Actor"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting an actor with an item or skill
in battle. This parameter is an array of strings. It will show
text based on the currently selected actor's position, starting from
the top. If the current selected actor's position is higher than the
array's length, the first value will be used. Any values in the array
whose index(starting from 0) is equal or higher than the number of
actors will never be used. Examples:
4 actors and 4 values
Actor 1 = Array[0] = Actor 1
Actor 2 = Array[1] = Actor 2
Actor 3 = Array[2] = Actor 3
Actor 4 = Array[3] = Actor 4
2 actors and 1 value
Actor 1 = Array[0] = Actor 1
Actor 2 = Array[0] = Actor 1
1 actor and 2 values
Actor 1 = Array[0] = Actor 1

Enemy Help Window Text (Battle)
Default: ["Enemy"]
Explanation: This parameter contains the text that will be shown
whenever the player is selecting an enemy with an item or skill
in battle. This parameter is an array of strings. It will show
text based on the currently selected enemy's position, starting from
the top-left and going right. If the current selected enemy's position
is higher than the array's length, the first value will be used.
Any values in the array whose index(starting from 0) is equal or
higher than the number of enemies will never be used. Examples:
4 enemies and 4 values
Enemy 1 = Array[0] = Enemy 1
Enemy 2 = Array[1] = Enemy 2
Enemy 3 = Array[2] = Enemy 3
Enemy 4 = Array[3] = Enemy 4
2 enemies and 1 value
Enemy 1 = Array[0] = Enemy 1
Enemy 2 = Array[0] = Enemy 2
1 enemy and 2 values
Enemy 1 = Array[0] = Enemy 1

Gameover Help Window Text
Default: Gameover
Explanation: This parameter contains the text that will be shown
whenever the player is in the Gameover Scene. Example:
Gameover

-----------------------------------------------------------------------------
<Eval: code>
-----------------------------------------------------------------------------

Putting this in any Help Window Text will run the code between
<Eval: >. Don't forget the white space. It isn't necessary for
the code to return a value. If the code is invalid, it will just
remove the <Eval: code> and show a log in your debug console. Examples:
<Eval: $gameParty._steps> = will run the code;
<Eval:$gameParty._steps> = <Eval:$gameParty._steps>;
"<Eval: $gameParty._steps>" = will run the code;

-----------------------------------------------------------------------------
Script Calls
-----------------------------------------------------------------------------

$gameSystem.updateMapHelpWindow();
By default, only the text of the Map Help Window is updated while
the player is roaming in the map. This Plugin Script Call will update
all the Map Help Window parameters in that moment.

$gameSystem.setHelpWindowTone(red, green, blue);
The Change Window Color Event Command no longer affects the Help Window.
If you want to change the Help Window Tone use the Script Call above.
Values lower than -255 will become -255 and higher than 255, will be
converted in 255. If any of the values provided are missing or not a
number, errors may be thrown. This will not affect the Help Window
while in the Title.
Examples:
$gameSystem.setHelpWindowTone(54, 67, 200);
$gameSystem.setHelpWindowTone(-278, -4678, 3000);

When changing values of parameters of this plugin mid-game, if you
want it to be saved locally(only when the player saves and then
loads the game), you use the following syntax:
$gameSystem._VCMHelpWindow['param'] = value;
Examples:
$gameSystem._VCMHelpWindow['Choice List Help Window (Map)'] = true;
$gameSystem._VCMHelpWindow['Choice List Help Window Position (Map)'].x = 200;
$gameSystem._VCMHelpWindow['Choice List Help Window Position (Map)'].y = 200;
$gameSystem._VCMHelpWindow['Choice List Help Window Position (Map)'].Width = 200;
$gameSystem._VCMHelpWindow['Choice List Help Window Position (Map)'].Height = 200;
$gameSystem._VCMHelpWindow['Choice List Help Window Text (Map)'] = ["Yes", "No"];
$gameSystem._VCMHelpWindow['Choice List Help Window Windowskin (Map)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)']['Font Size'] = 20;
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)'].Italic = true;
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)']['Text Color'] = "rgba(200, 77, 120, 0.5)";
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)']['Text Outline Color'] = "rgba(1, 77, 120, 1)";
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)']['Text Outline Width'] = 1;
$gameSystem._VCMHelpWindow['Choice List Help Window Opacity (Map)'] = 150;

If you want to change values of parameters globally (the only way to
change values in the Title, Options and Load Scenes, as well the as
the Help Window Wordwrapping parameter), alongside the options
configurations, you use the following syntax(if the second command
isn't included, values will be reset when the game is closed and
open again):
VCM.Param['param'] = value;
ConfigManager.save();
Examples:
VCM.Param['Help Window Wordwrapping'] = true;
VCM.Param['Title Help Window'] = true;
VCM.Param['Title Help Window Position'].x = 11;
VCM.Param['Title Help Window Position'].y = 11;
VCM.Param['Title Help Window Position'].Width = 408;
VCM.Param['Title Help Window Position'].Height = 70;
VCM.Param['Title Help Window Text'][0] = "You'll love this\nGame!";
VCM.Param['Title Help Window Windowskin'] = "Window - Copy";
VCM.Param['Title Help Window Font'].Font = "Algerian";
VCM.Param['Title Help Window Font']['Font Size'] = 41;
VCM.Param['Title Help Window Font'].Italic = true;
VCM.Param['Title Help Window Font']['Text Color'] = "#ffcc66";
VCM.Param['Title Help Window Font']['Text Outline Color'] = "#ff0000";
VCM.Param['Title Help Window Font']['Text Outline Width'] = 8;
VCM.Param['Title Help Window Opacity'] = 50;
ConfigManager.save();

Just remember that putting wrong value types may throw errors.

Also, you can change the Custom Text Codes parameters
values, although those won't be saved. Examples:
VCM.Param['a'] = "Heals";
VCM.Param.h = 'if($gameParty.inBattle()){if(item){if(DataManager.isItem(item) || DataManager.isSkill(item)){if(item.hitType === 1){"Accuracy: " + item.successRate * BattleManager.actor().hit + "%";}else{"Accuracy: " + item.successRate + "%";}}}}';

Finally, Help Window Texts that are arrays can be manipulated with
array methods, like push() and pop().

-----------------------------------------------------------------------------
Script Calls Examples
-----------------------------------------------------------------------------

$gameSystem.setHelpWindowTone(300, -50, 77);

$gameSystem.updateMapHelpWindow();

VCM.Param['Help Window Wordwrapping'] = true;
ConfigManager.save();

VCM.Param['Title Help Window'] = true;
VCM.Param['Title Help Window Position'].x = 11;
VCM.Param['Title Help Window Position'].y = 11;
VCM.Param['Title Help Window Position'].Width = 408;
VCM.Param['Title Help Window Position'].Height = 70;
VCM.Param['Title Help Window Text'][0] = "You'll love this\nGame!";
VCM.Param['Title Help Window Windowskin'] = "Window - Copy";
VCM.Param['Title Help Window Font'].Font = "Algerian";
VCM.Param['Title Help Window Font']['Font Size'] = 41;
VCM.Param['Title Help Window Font'].Italic = true;
VCM.Param['Title Help Window Font']['Text Color'] = "#ffcc66";
VCM.Param['Title Help Window Font']['Text Outline Color'] = "#ff0000";
VCM.Param['Title Help Window Font']['Text Outline Width'] = 8;
VCM.Param['Title Help Window Opacity'] = 50;
ConfigManager.save();

$gameSystem._VCMHelpWindow['Map Help Window'] = true;
$gameSystem._VCMHelpWindow['Map Help Window Position'].x = 200;
$gameSystem._VCMHelpWindow['Map Help Window Position'].y = 200;
$gameSystem._VCMHelpWindow['Map Help Window Position'].Width = 200;
$gameSystem._VCMHelpWindow['Map Help Window Position'].Height = 200;
$gameSystem._VCMHelpWindow['Map Help Window Text'] = "Welcome";
$gameSystem._VCMHelpWindow['Map Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Map Help Window Font'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Map Help Window Font']['Font Size'] = 20;
$gameSystem._VCMHelpWindow['Map Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Map Help Window Font']['Text Color'] = "rgba(200, 77, 120, 0.5)";
$gameSystem._VCMHelpWindow['Map Help Window Font']['Text Outline Color'] = "rgba(1, 77, 120, 1)";
$gameSystem._VCMHelpWindow['Map Help Window Font']['Text Outline Width'] = 1;
$gameSystem._VCMHelpWindow['Map Help Window Opacity'] = 150;

$gameSystem._VCMHelpWindow['Choice List Help Window (Map)'] = true;
$gameSystem._VCMHelpWindow['Choice List Help Window Position (Map)'].x = 200;
$gameSystem._VCMHelpWindow['Choice List Help Window Position (Map)'].y = 200;
$gameSystem._VCMHelpWindow['Choice List Help Window Position (Map)'].Width = 200;
$gameSystem._VCMHelpWindow['Choice List Help Window Position (Map)'].Height = 200;
$gameSystem._VCMHelpWindow['Choice List Help Window Text (Map)'] = ["Yes", "No"];
$gameSystem._VCMHelpWindow['Choice List Help Window Windowskin (Map)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)']['Font Size'] = 20;
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)'].Italic = true;
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)']['Text Color'] = "rgba(200, 77, 120, 0.5)";
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)']['Text Outline Color'] = "rgba(1, 77, 120, 1)";
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)']['Text Outline Width'] = 1;
$gameSystem._VCMHelpWindow['Choice List Help Window Opacity (Map)'] = 150;

$gameSystem._VCMHelpWindow['Number Input Help Window (Map)'] = true;
$gameSystem._VCMHelpWindow['Number Input Help Window Position (Map)'].x = 200;
$gameSystem._VCMHelpWindow['Number Input Help Window Position (Map)'].y = 200;
$gameSystem._VCMHelpWindow['Number Input Help Window Position (Map)'].Width = 200;
$gameSystem._VCMHelpWindow['Number Input Help Window Position (Map)'].Height = 200;
$gameSystem._VCMHelpWindow['Number Input Help Window Text (Map)'] = "Input a Number";
$gameSystem._VCMHelpWindow['Number Input Help Window Windowskin (Map)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Number Input Help Window Font (Map)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Number Input Help Window Font (Map)']['Font Size'] = 20;
$gameSystem._VCMHelpWindow['Number Input Help Window Font (Map)'].Italic = true;
$gameSystem._VCMHelpWindow['Number Input Help Window Font (Map)']['Text Color'] = "rgba(200, 77, 120, 0.5)";
$gameSystem._VCMHelpWindow['Number Input Help Window Font (Map)']['Text Outline Color'] = "rgba(1, 77, 120, 1)";
$gameSystem._VCMHelpWindow['Number Input Help Window Font (Map)']['Text Outline Width'] = 1;
$gameSystem._VCMHelpWindow['Number Input Help Window Opacity (Map)'] = 150;

$gameSystem._VCMHelpWindow['Select Item Help Window (Map)'] = true;
$gameSystem._VCMHelpWindow['Select Item Help Window Position (Map)'].x = 100;
$gameSystem._VCMHelpWindow['Select Item Help Window Position (Map)'].y = 150;
$gameSystem._VCMHelpWindow['Select Item Help Window Position (Map)'].Width = 400;
$gameSystem._VCMHelpWindow['Select Item Help Window Position (Map)'].Height = 200;
$gameSystem._VCMHelpWindow['Select Item Help Window Windowskin (Map)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Select Item Help Window Font (Map)'].Font = "Arial";
$gameSystem._VCMHelpWindow['Select Item Help Window Font (Map)']['Font Size'] = 40;
$gameSystem._VCMHelpWindow['Select Item Help Window Font (Map)'].Italic = true;
$gameSystem._VCMHelpWindow['Select Item Help Window Font (Map)']['Text Color'] = "#ffcc99";
$gameSystem._VCMHelpWindow['Select Item Help Window Font (Map)']['Text Outline Color'] = "#ffffff";
$gameSystem._VCMHelpWindow['Select Item Help Window Font (Map)']['Text Outline Width'] = 10;
$gameSystem._VCMHelpWindow['Select Item Help Window Opacity (Map)'] = 100;

$gameSystem._VCMHelpWindow['Message Help Window (Map)'] = true;
$gameSystem._VCMHelpWindow['Message Help Window Position (Map)'].x = 100;
$gameSystem._VCMHelpWindow['Message Help Window Position (Map)'].y = 100;
$gameSystem._VCMHelpWindow['Message Help Window Position (Map)'].Width = 400;
$gameSystem._VCMHelpWindow['Message Help Window Position (Map)'].Height = 200;
$gameSystem._VCMHelpWindow['Message Help Window Text (Map)'] = "A Message For You";
$gameSystem._VCMHelpWindow['Message Help Window Windowskin (Map)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Message Help Window Font (Map)'].Font = "Arial";
$gameSystem._VCMHelpWindow['Message Help Window Font (Map)']['Font Size'] = 40;
$gameSystem._VCMHelpWindow['Message Help Window Font (Map)'].Italic = true;
$gameSystem._VCMHelpWindow['Message Help Window Font (Map)']['Text Color'] = "#ffcc99";
$gameSystem._VCMHelpWindow['Message Help Window Font (Map)']['Text Outline Color'] = "#ffffff";
$gameSystem._VCMHelpWindow['Message Help Window Font (Map)']['Text Outline Width'] = 10;
$gameSystem._VCMHelpWindow['Message Help Window Opacity (Map)'] = 100;

$gameSystem._VCMHelpWindow['Scroll Text Help Window (Map)'] = true;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Map)'].x = 100;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Map)'].y = 100;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Map)'].Width = 400;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Map)'].Height = 200;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Text (Map)'] = "A Message For You";
$gameSystem._VCMHelpWindow['Scroll Text Help Window Windowskin (Map)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Map)'].Font = "Arial";
$gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Map)']['Font Size'] = 40;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Map)'].Italic = true;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Map)']['Text Color'] = "#ffcc99";
$gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Map)']['Text Outline Color'] = "#ffffff";
$gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Map)']['Text Outline Width'] = 10;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Opacity (Map)'] = 100;

$gameSystem._VCMHelpWindow['Menu Help Window'] = true;
$gameSystem._VCMHelpWindow['Menu Help Window Position'].x = -1;
$gameSystem._VCMHelpWindow['Menu Help Window Position'].y = 350;
$gameSystem._VCMHelpWindow['Menu Help Window Position'].Width = 240;
$gameSystem._VCMHelpWindow['Menu Help Window Position'].Height = 200;
$gameSystem._VCMHelpWindow['Menu Help Window Text'][0] = "Useless Items";
$gameSystem._VCMHelpWindow['Menu Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Menu Help Window Font'].Font = "Arial";
$gameSystem._VCMHelpWindow['Menu Help Window Font']['Font Size'] = 40;
$gameSystem._VCMHelpWindow['Menu Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Menu Help Window Font']['Text Color'] = "#ffff99";
$gameSystem._VCMHelpWindow['Menu Help Window Font']['Text Outline Color'] = "#755e48";
$gameSystem._VCMHelpWindow['Menu Help Window Font']['Text Outline Width'] = 7;
$gameSystem._VCMHelpWindow['Menu Help Window Opacity'] = 210;

$gameSystem._VCMHelpWindow['Menu Status Help Window'] = true;
$gameSystem._VCMHelpWindow['Menu Status Help Window Position'].x = -10;
$gameSystem._VCMHelpWindow['Menu Status Help Window Position'].y = 320;
$gameSystem._VCMHelpWindow['Menu Status Help Window Position'].Width = 250;
$gameSystem._VCMHelpWindow['Menu Status Help Window Position'].Height = 234;
$gameSystem._VCMHelpWindow['Menu Status Help Window Text'][2] = "Useless Actor";
$gameSystem._VCMHelpWindow['Menu Status Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Menu Status Help Window Font'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Menu Status Help Window Font']['Font Size'] = 50;
$gameSystem._VCMHelpWindow['Menu Status Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Menu Status Help Window Font']['Text Color'] = "#755e48";
$gameSystem._VCMHelpWindow['Menu Status Help Window Font']['Text Outline Color'] = "#755e48";
$gameSystem._VCMHelpWindow['Menu Status Help Window Font']['Text Outline Width'] = 0;
$gameSystem._VCMHelpWindow['Menu Status Help Window Opacity'] = 68;

$gameSystem._VCMHelpWindow['Menu Actor Help Window'] = true;
$gameSystem._VCMHelpWindow['Menu Actor Help Window Position'].x = -1;
$gameSystem._VCMHelpWindow['Menu Actor Help Window Position'].y = -2;
$gameSystem._VCMHelpWindow['Menu Actor Help Window Position'].Width = 240;
$gameSystem._VCMHelpWindow['Menu Actor Help Window Position'].Height = 100;
$gameSystem._VCMHelpWindow['Menu Actor Help Window Text'] = ["Which Actor?"];
$gameSystem._VCMHelpWindow['Menu Actor Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Menu Actor Help Window Font'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Menu Actor Help Window Font']['Font Size'] = 10;
$gameSystem._VCMHelpWindow['Menu Actor Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Menu Actor Help Window Font']['Text Color'] = "#ff9999";
$gameSystem._VCMHelpWindow['Menu Actor Help Window Font']['Text Outline Color'] = "#99ff99";
$gameSystem._VCMHelpWindow['Menu Actor Help Window Font']['Text Outline Width'] = 2;
$gameSystem._VCMHelpWindow['Menu Actor Help Window Opacity'] = 150;

$gameSystem._VCMHelpWindow['Item Category Help Window (Menu)'] = true;
$gameSystem._VCMHelpWindow['Item Category Help Window Position (Menu)'].x = -20;
$gameSystem._VCMHelpWindow['Item Category Help Window Position (Menu)'].y = -40;
$gameSystem._VCMHelpWindow['Item Category Help Window Position (Menu)'].Width = 940;
$gameSystem._VCMHelpWindow['Item Category Help Window Position (Menu)'].Height = 144;
$gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'] = ["Useless Items", "Weapons"];
$gameSystem._VCMHelpWindow['Item Category Help Window Windowskin (Menu)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Item Category Help Window Font (Menu)'].Font = "Arial";
$gameSystem._VCMHelpWindow['Item Category Help Window Font (Menu)']['Font Size'] = 50;
$gameSystem._VCMHelpWindow['Item Category Help Window Font (Menu)'].Italic = true;
$gameSystem._VCMHelpWindow['Item Category Help Window Font (Menu)']['Text Color'] = "#ffff22";
$gameSystem._VCMHelpWindow['Item Category Help Window Font (Menu)']['Text Outline Color'] = "#755f48";
$gameSystem._VCMHelpWindow['Item Category Help Window Font (Menu)']['Text Outline Width'] = 17;
$gameSystem._VCMHelpWindow['Item Category Help Window Opacity (Menu)'] = 100;

$gameSystem._VCMHelpWindow['Item List Help Window (Menu)'] = true;
$gameSystem._VCMHelpWindow['Item List Help Window Position (Menu)'].x = 20;
$gameSystem._VCMHelpWindow['Item List Help Window Position (Menu)'].y = 20;
$gameSystem._VCMHelpWindow['Item List Help Window Position (Menu)'].Width = 670;
$gameSystem._VCMHelpWindow['Item List Help Window Position (Menu)'].Height = 80;
$gameSystem._VCMHelpWindow['Item List Help Window Windowskin (Menu)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Item List Help Window Font (Menu)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Item List Help Window Font (Menu)']['Font Size'] = 20;
$gameSystem._VCMHelpWindow['Item List Help Window Font (Menu)'].Italic = true;
$gameSystem._VCMHelpWindow['Item List Help Window Font (Menu)']['Text Color'] = "rgba(0, 200, 50, 0.3)";
$gameSystem._VCMHelpWindow['Item List Help Window Font (Menu)']['Text Outline Color'] = "rgba(200, 0, 50, 0.7)";
$gameSystem._VCMHelpWindow['Item List Help Window Font (Menu)']['Text Outline Width'] = 1;
$gameSystem._VCMHelpWindow['Item List Help Window Opacity (Menu)'] = 200;

$gameSystem._VCMHelpWindow['Skill Type Help Window (Menu)'] = true;
$gameSystem._VCMHelpWindow['Skill Type Help Window Position (Menu)'].x = 40;
$gameSystem._VCMHelpWindow['Skill Type Help Window Position (Menu)'].y = -3;
$gameSystem._VCMHelpWindow['Skill Type Help Window Position (Menu)'].Width = 600;
$gameSystem._VCMHelpWindow['Skill Type Help Window Position (Menu)'].Height = 120;
$gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)'][1] = "What Crappy Specials";
$gameSystem._VCMHelpWindow['Skill Type Help Window Windowskin (Menu)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)']['Font Size'] = 25;
$gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)'].Italic = true;
$gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)']['Text Color'] = "rgba(0, 0, 0, 1)";
$gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)']['Text Outline Color'] = "rgba(255, 150, 200, 1)";
$gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)']['Text Outline Width'] = 5;
$gameSystem._VCMHelpWindow['Skill Type Help Window Opacity (Menu)'] = 100;

$gameSystem._VCMHelpWindow['Skill List Help Window (Menu)'] = true;
$gameSystem._VCMHelpWindow['Skill List Help Window Position (Menu)'].x = -10;
$gameSystem._VCMHelpWindow['Skill List Help Window Position (Menu)'].y = -30;
$gameSystem._VCMHelpWindow['Skill List Help Window Position (Menu)'].Width = 930;
$gameSystem._VCMHelpWindow['Skill List Help Window Position (Menu)'].Height = 134;
$gameSystem._VCMHelpWindow['Skill List Help Window Windowskin (Menu)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Skill List Help Window Font (Menu)'].Font = "Arial";
$gameSystem._VCMHelpWindow['Skill List Help Window Font (Menu)']['Font Size'] = 48;
$gameSystem._VCMHelpWindow['Skill List Help Window Font (Menu)'].Italic = true;
$gameSystem._VCMHelpWindow['Skill List Help Window Font (Menu)']['Text Color'] = "rgba(0, 0, 0, 0)";
$gameSystem._VCMHelpWindow['Skill List Help Window Font (Menu)']['Text Outline Color'] = "rgba(100, 150, 200, 1)";
$gameSystem._VCMHelpWindow['Skill List Help Window Font (Menu)']['Text Outline Width'] = 15;
$gameSystem._VCMHelpWindow['Skill List Help Window Opacity (Menu)'] = 200;

$gameSystem._VCMHelpWindow['Equip Command Help Window (Menu)'] = true;
$gameSystem._VCMHelpWindow['Equip Command Help Window Position (Menu)'].x = 3;
$gameSystem._VCMHelpWindow['Equip Command Help Window Position (Menu)'].y = 4;
$gameSystem._VCMHelpWindow['Equip Command Help Window Position (Menu)'].Width = 930;
$gameSystem._VCMHelpWindow['Equip Command Help Window Position (Menu)'].Height = 100;
$gameSystem._VCMHelpWindow['Equip Command Help Window Text (Menu)'][1] = "Lazy?";
$gameSystem._VCMHelpWindow['Equip Command Help Window Windowskin (Menu)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Equip Command Help Window Font (Menu)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Equip Command Help Window Font (Menu)']['Font Size'] = 37;
$gameSystem._VCMHelpWindow['Equip Command Help Window Font (Menu)'].Italic = true;
$gameSystem._VCMHelpWindow['Equip Command Help Window Font (Menu)']['Text Color'] = "rgba(0, 105, 0, 1)";
$gameSystem._VCMHelpWindow['Equip Command Help Window Font (Menu)']['Text Outline Color'] = "rgba(250, 150, 200, 0.75)";
$gameSystem._VCMHelpWindow['Equip Command Help Window Font (Menu)']['Text Outline Width'] = 5;
$gameSystem._VCMHelpWindow['Equip Command Help Window Opacity (Menu)'] = 100;

$gameSystem._VCMHelpWindow['Equip Slot Help Window (Menu)'] = true;
$gameSystem._VCMHelpWindow['Equip Slot Help Window Position (Menu)'].x = 13;
$gameSystem._VCMHelpWindow['Equip Slot Help Window Position (Menu)'].y = 14;
$gameSystem._VCMHelpWindow['Equip Slot Help Window Position (Menu)'].Width = 630;
$gameSystem._VCMHelpWindow['Equip Slot Help Window Position (Menu)'].Height = 90;
$gameSystem._VCMHelpWindow['Equip Slot Help Window Windowskin (Menu)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Equip Slot Help Window Font (Menu)'].Font = "Arial";
$gameSystem._VCMHelpWindow['Equip Slot Help Window Font (Menu)']['Font Size'] = 31;
$gameSystem._VCMHelpWindow['Equip Slot Help Window Font (Menu)'].Italic = true;
$gameSystem._VCMHelpWindow['Equip Slot Help Window Font (Menu)']['Text Color'] = "rgba(245, 105, 0, 0.564)";
$gameSystem._VCMHelpWindow['Equip Slot Help Window Font (Menu)']['Text Outline Color'] = "rgba(250, 0, 200, 1)";
$gameSystem._VCMHelpWindow['Equip Slot Help Window Font (Menu)']['Text Outline Width'] = 15;
$gameSystem._VCMHelpWindow['Equip Slot Help Window Opacity (Menu)'] = 200;

$gameSystem._VCMHelpWindow['Equip List Help Window (Menu)'] = true;
$gameSystem._VCMHelpWindow['Equip List Help Window Position (Menu)'].x = -10;
$gameSystem._VCMHelpWindow['Equip List Help Window Position (Menu)'].y = -30;
$gameSystem._VCMHelpWindow['Equip List Help Window Position (Menu)'].Width = 930;
$gameSystem._VCMHelpWindow['Equip List Help Window Position (Menu)'].Height = 134;
$gameSystem._VCMHelpWindow['Equip List Help Window Windowskin (Menu)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Equip List Help Window Font (Menu)'].Font = "Arial";
$gameSystem._VCMHelpWindow['Equip List Help Window Font (Menu)']['Font Size'] = 48;
$gameSystem._VCMHelpWindow['Equip List Help Window Font (Menu)'].Italic = true;
$gameSystem._VCMHelpWindow['Equip List Help Window Font (Menu)']['Text Color'] = "rgba(0, 0, 255, 0)";
$gameSystem._VCMHelpWindow['Equip List Help Window Font (Menu)']['Text Outline Color'] = "rgba(100, 150, 200, 1)";
$gameSystem._VCMHelpWindow['Equip List Help Window Font (Menu)']['Text Outline Width'] = 2;
$gameSystem._VCMHelpWindow['Equip List Help Window Opacity (Menu)'] = 100;

$gameSystem._VCMHelpWindow['Status Help Window'] = true;
$gameSystem._VCMHelpWindow['Status Help Window Position'].x = 5;
$gameSystem._VCMHelpWindow['Status Help Window Position'].y = 500;
$gameSystem._VCMHelpWindow['Status Help Window Position'].Width = 811;
$gameSystem._VCMHelpWindow['Status Help Window Position'].Height = 124;
$gameSystem._VCMHelpWindow['Status Help Window Text'] = ["It's You!"];
$gameSystem._VCMHelpWindow['Status Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Status Help Window Font'].Font = "Times New Roman";
$gameSystem._VCMHelpWindow['Status Help Window Font']['Font Size'] = 45;
$gameSystem._VCMHelpWindow['Status Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Status Help Window Font']['Text Color'] = "rgba(188, 105, 164, 1)";
$gameSystem._VCMHelpWindow['Status Help Window Font']['Text Outline Color'] = "rgba(250, 255, 200, 1)";
$gameSystem._VCMHelpWindow['Status Help Window Font']['Text Outline Width'] = 10;
$gameSystem._VCMHelpWindow['Status Help Window Opacity'] = 66;

VCM.Param['Options Help Window'] = true;
VCM.Param['Options Help Window Position'].x = 333;
VCM.Param['Options Help Window Position'].y = 33;
VCM.Param['Options Help Window Position'].Width = 600;
VCM.Param['Options Help Window Position'].Height = 200;
VCM.Param['Options Help Window Text'][2] = "I can't stand that music!";
VCM.Param['Options Help Window Windowskin'] = "Window - Copy";
VCM.Param['Options Help Window Font'].Font = "Algerian";
VCM.Param['Options Help Window Font']['Font Size'] = 12;
VCM.Param['Options Help Window Font'].Italic = true;
VCM.Param['Options Help Window Font']['Text Color'] = "#ffcc66";
VCM.Param['Options Help Window Font']['Text Outline Color'] = "rgba(0, 0, 255, 1)";
VCM.Param['Options Help Window Font']['Text Outline Width'] = 8;
VCM.Param['Options Help Window Opacity'] = 0;
ConfigManager.save();

$gameSystem._VCMHelpWindow['Save Help Window'] = true;
$gameSystem._VCMHelpWindow['Save Help Window Position'].x = 3;
$gameSystem._VCMHelpWindow['Save Help Window Position'].y = 3;
$gameSystem._VCMHelpWindow['Save Help Window Position'].Width = 800;
$gameSystem._VCMHelpWindow['Save Help Window Position'].Height = 70;
$gameSystem._VCMHelpWindow['Save Help Window Text'] = ["Choose"];
$gameSystem._VCMHelpWindow['Save Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Save Help Window Font'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Save Help Window Font']['Font Size'] = 22;
$gameSystem._VCMHelpWindow['Save Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Save Help Window Font']['Text Color'] = "rgba(-277, 105, 164, 1)";
$gameSystem._VCMHelpWindow['Save Help Window Font']['Text Outline Color'] = "rgba(250, 255, -277, 1)";
$gameSystem._VCMHelpWindow['Save Help Window Font']['Text Outline Width'] = -1;
$gameSystem._VCMHelpWindow['Save Help Window Opacity'] = 177;

VCM.Param['Load Help Window'] = true;
VCM.Param['Load Help Window Position'].x = -20;
VCM.Param['Load Help Window Position'].y = -10;
VCM.Param['Load Help Window Position'].Width = 820;
VCM.Param['Load Help Window Position'].Height = 100;
VCM.Param['Load Help Window Text'] = ["Load 1", "Load 2"];
VCM.Param['Load Help Window Windowskin'] = "Window - Copy";
VCM.Param['Load Help Window Font'].Font = "Arial";
VCM.Param['Load Help Window Font']['Font Size'] = 32;
VCM.Param['Load Help Window Font'].Italic = true;
VCM.Param['Load Help Window Font']['Text Color'] = "#ffcc00";
VCM.Param['Load Help Window Font']['Text Outline Color'] = "#ffff00";
VCM.Param['Load Help Window Font']['Text Outline Width'] = 2;
VCM.Param['Load Help Window Opacity'] = 33;
ConfigManager.save();

$gameSystem._VCMHelpWindow['Game End Help Window'] = true;
$gameSystem._VCMHelpWindow['Game End Help Window Position'].x = 37;
$gameSystem._VCMHelpWindow['Game End Help Window Position'].y = 35;
$gameSystem._VCMHelpWindow['Game End Help Window Position'].Width = 700;
$gameSystem._VCMHelpWindow['Game End Help Window Position'].Height = 90;
$gameSystem._VCMHelpWindow['Game End Help Window Text'] = ["Death", "Life"];
$gameSystem._VCMHelpWindow['Game End Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Game End Help Window Font'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Game End Help Window Font']['Font Size'] = 42;
$gameSystem._VCMHelpWindow['Game End Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Game End Help Window Font']['Text Color'] = "rgba(0, 255, 0, 1)";
$gameSystem._VCMHelpWindow['Game End Help Window Font']['Text Outline Color'] = "rgba(255, 0, 0, 1)";
$gameSystem._VCMHelpWindow['Game End Help Window Font']['Text Outline Width'] = -10;
$gameSystem._VCMHelpWindow['Game End Help Window Opacity'] = 377;

$gameSystem._VCMHelpWindow['Shop Command Help Window'] = true;
$gameSystem._VCMHelpWindow['Shop Command Help Window Position'].x = 6;
$gameSystem._VCMHelpWindow['Shop Command Help Window Position'].y = 8;
$gameSystem._VCMHelpWindow['Shop Command Help Window Position'].Width = 709;
$gameSystem._VCMHelpWindow['Shop Command Help Window Position'].Height = 103;
$gameSystem._VCMHelpWindow['Shop Command Help Window Text'] = ["Don't Buy", "Don't Sell", "Don't Cancel"];
$gameSystem._VCMHelpWindow['Shop Command Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Shop Command Help Window Font'].Font = "Arial";
$gameSystem._VCMHelpWindow['Shop Command Help Window Font']['Font Size'] = 44;
$gameSystem._VCMHelpWindow['Shop Command Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Shop Command Help Window Font']['Text Color'] = "rgba(0, 255, 255, 0.4)";
$gameSystem._VCMHelpWindow['Shop Command Help Window Font']['Text Outline Color'] = "rgba(255, 0, 255, 1)";
$gameSystem._VCMHelpWindow['Shop Command Help Window Font']['Text Outline Width'] = 10;
$gameSystem._VCMHelpWindow['Shop Command Help Window Opacity'] = 200;

$gameSystem._VCMHelpWindow['Shop Item Category Help Window'] = true;
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Position'].x = -6;
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Position'].y = -8;
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Position'].Width = 709;
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Position'].Height = 103;
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'] = ["Don't Buy", "Don't Sell", "Dont Cancel"];
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Font'].Font = "Arial";
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Font']['Font Size'] = 41;
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Font']['Text Color'] = "rgba(50, 255, 255, 0.4)";
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Font']['Text Outline Color'] = "rgba(255, 70, 255, 1)";
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Font']['Text Outline Width'] = 10;
$gameSystem._VCMHelpWindow['Shop Item Category Help Window Opacity'] = 00;

$gameSystem._VCMHelpWindow['Shop Item List Help Window'] = true;
$gameSystem._VCMHelpWindow['Shop Item List Help Window Position'].x = -6;
$gameSystem._VCMHelpWindow['Shop Item List Help Window Position'].y = -8;
$gameSystem._VCMHelpWindow['Shop Item List Help Window Position'].Width = 709;
$gameSystem._VCMHelpWindow['Shop Item List Help Window Position'].Height = 103;
$gameSystem._VCMHelpWindow['Shop Item List Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Shop Item List Help Window Font'].Font = "Arial";
$gameSystem._VCMHelpWindow['Shop Item List Help Window Font']['Font Size'] = 41;
$gameSystem._VCMHelpWindow['Shop Item List Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Shop Item List Help Window Font']['Text Color'] = "rgba(50, 255, 255, 1)";
$gameSystem._VCMHelpWindow['Shop Item List Help Window Font']['Text Outline Color'] = "rgba(255, 70, 255, 0.4)";
$gameSystem._VCMHelpWindow['Shop Item List Help Window Font']['Text Outline Width'] = 10;
$gameSystem._VCMHelpWindow['Shop Item List Help Window Opacity'] = 100;

$gameSystem._VCMHelpWindow['Shop Item Number Help Window'] = true;
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Position'].x = -6;
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Position'].y = -8;
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Position'].Width = 709;
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Position'].Height = 103;
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Text'] = "Don't Buy";
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Font'].Font = "Arial";
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Font']['Font Size'] = 41;
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Font']['Text Color'] = "rgba(055, 255, 255, 1)";
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Font']['Text Outline Color'] = "rgba(055, 70, 255, 1)";
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Font']['Text Outline Width'] = 10;
$gameSystem._VCMHelpWindow['Shop Item Number Help Window Opacity'] = 100;

$gameSystem._VCMHelpWindow['Name Input Help Window'] = true;
$gameSystem._VCMHelpWindow['Name Input Help Window Position'].x = 32;
$gameSystem._VCMHelpWindow['Name Input Help Window Position'].y = 31;
$gameSystem._VCMHelpWindow['Name Input Help Window Position'].Width = 700;
$gameSystem._VCMHelpWindow['Name Input Help Window Position'].Height = 60;
$gameSystem._VCMHelpWindow['Name Input Help Window Text'] = "Your Name?";
$gameSystem._VCMHelpWindow['Name Input Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Name Input Help Window Font'].Font = "Arial";
$gameSystem._VCMHelpWindow['Name Input Help Window Font']['Font Size'] = 20;
$gameSystem._VCMHelpWindow['Name Input Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Name Input Help Window Font']['Text Color'] = "rgba(0, 255, 10, 1)";
$gameSystem._VCMHelpWindow['Name Input Help Window Font']['Text Outline Color'] = "rgba(255, 0, 50, 1)";
$gameSystem._VCMHelpWindow['Name Input Help Window Font']['Text Outline Width'] = 5;
$gameSystem._VCMHelpWindow['Name Input Help Window Opacity'] = -100;

$gameSystem._VCMHelpWindow['Choice List Help Window (Battle)'] = true;
$gameSystem._VCMHelpWindow['Choice List Help Window Position (Battle)'].x = 100;
$gameSystem._VCMHelpWindow['Choice List Help Window Position (Battle)'].y = 10;
$gameSystem._VCMHelpWindow['Choice List Help Window Position (Battle)'].Width = 400;
$gameSystem._VCMHelpWindow['Choice List Help Window Position (Battle)'].Height = 200;
$gameSystem._VCMHelpWindow['Choice List Help Window Text (Battle)'] = ["Choose me!", "Don't Choose Me!"];
$gameSystem._VCMHelpWindow['Choice List Help Window Windowskin (Battle)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Battle)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Battle)']['Font Size'] = 40;
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Battle)'].Italic = true;
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Battle)']['Text Color'] = "rgba(190, 120, 240, 0.9)";
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Battle)']['Text Outline Color'] = "rgba(80, 220, 40, 1)";
$gameSystem._VCMHelpWindow['Choice List Help Window Font (Battle)']['Text Outline Width'] = 8;
$gameSystem._VCMHelpWindow['Choice List Help Window Opacity (Battle)'] = 200;

$gameSystem._VCMHelpWindow['Number Input Help Window (Battle)'] = true;
$gameSystem._VCMHelpWindow['Number Input Help Window Position (Battle)'].x = 100;
$gameSystem._VCMHelpWindow['Number Input Help Window Position (Battle)'].y = 100;
$gameSystem._VCMHelpWindow['Number Input Help Window Position (Battle)'].Width = 400;
$gameSystem._VCMHelpWindow['Number Input Help Window Position (Battle)'].Height = 200;
$gameSystem._VCMHelpWindow['Number Input Help Window Text (Battle)'] = "Choose Eight Numbers";
$gameSystem._VCMHelpWindow['Number Input Help Window Windowskin (Battle)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Number Input Help Window Font (Battle)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Number Input Help Window Font (Battle)']['Font Size'] = 40;
$gameSystem._VCMHelpWindow['Number Input Help Window Font (Battle)'].Italic = true;
$gameSystem._VCMHelpWindow['Number Input Help Window Font (Battle)']['Text Color'] = "rgba(190, 120, 140, 0.9)";
$gameSystem._VCMHelpWindow['Number Input Help Window Font (Battle)']['Text Outline Color'] = "rgba(80, 220, 140, 1)";
$gameSystem._VCMHelpWindow['Number Input Help Window Font (Battle)']['Text Outline Width'] = 8;
$gameSystem._VCMHelpWindow['Number Input Help Window Opacity (Battle)'] = 100;

$gameSystem._VCMHelpWindow['Select Item Help Window (Battle)'] = true;
$gameSystem._VCMHelpWindow['Select Item Help Window Position (Battle)'].x = 100;
$gameSystem._VCMHelpWindow['Select Item Help Window Position (Battle)'].y = 200;
$gameSystem._VCMHelpWindow['Select Item Help Window Position (Battle)'].Width = 400;
$gameSystem._VCMHelpWindow['Select Item Help Window Position (Battle)'].Height = 200;
$gameSystem._VCMHelpWindow['Select Item Help Window Windowskin (Battle)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Select Item Help Window Font (Battle)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Select Item Help Window Font (Battle)']['Font Size'] = 30;
$gameSystem._VCMHelpWindow['Select Item Help Window Font (Battle)'].Italic = true;
$gameSystem._VCMHelpWindow['Select Item Help Window Font (Battle)']['Text Color'] = "rgba(100, 120, 140, 1)";
$gameSystem._VCMHelpWindow['Select Item Help Window Font (Battle)']['Text Outline Color'] = "rgba(180, 220, 140, -1)";
$gameSystem._VCMHelpWindow['Select Item Help Window Font (Battle)']['Text Outline Width'] = 8;
$gameSystem._VCMHelpWindow['Select Item Help Window Opacity (Battle)'] = 100;

$gameSystem._VCMHelpWindow['Message Help Window (Battle)'] = true;
$gameSystem._VCMHelpWindow['Message Help Window Position (Battle)'].x = 100;
$gameSystem._VCMHelpWindow['Message Help Window Position (Battle)'].y = 100;
$gameSystem._VCMHelpWindow['Message Help Window Position (Battle)'].Width = 400;
$gameSystem._VCMHelpWindow['Message Help Window Position (Battle)'].Height = 200;
$gameSystem._VCMHelpWindow['Message Help Window Text (Battle)'] = "A Message";
$gameSystem._VCMHelpWindow['Message Help Window Windowskin (Battle)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Message Help Window Font (Battle)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Message Help Window Font (Battle)']['Font Size'] = 40;
$gameSystem._VCMHelpWindow['Message Help Window Font (Battle)'].Italic = true;
$gameSystem._VCMHelpWindow['Message Help Window Font (Battle)']['Text Color'] = "rgba(100, 120, 140, 2)";
$gameSystem._VCMHelpWindow['Message Help Window Font (Battle)']['Text Outline Color'] = "rgba(180, 220, 140, 1)";
$gameSystem._VCMHelpWindow['Message Help Window Font (Battle)']['Text Outline Width'] = 8;
$gameSystem._VCMHelpWindow['Message Help Window Opacity (Battle)'] = 100;

$gameSystem._VCMHelpWindow['Scroll Text Help Window (Battle)'] = true;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Battle)'].x = 100;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Battle)'].y = 100;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Battle)'].Width = 400;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Battle)'].Height = 200;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Text (Battle)'] = "A Message";
$gameSystem._VCMHelpWindow['Scroll Text Help Window Windowskin (Battle)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Battle)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Battle)']['Font Size'] = 40;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Battle)'].Italic = true;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Battle)']['Text Color'] = "rgba(100, 120, 140, 2)";
$gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Battle)']['Text Outline Color'] = "rgba(180, 220, 140, -1)";
$gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Battle)']['Text Outline Width'] = 8;
$gameSystem._VCMHelpWindow['Scroll Text Help Window Opacity (Battle)'] = 200;

$gameSystem._VCMHelpWindow['Log Help Window (Battle)'] = true;
$gameSystem._VCMHelpWindow['Log Help Window Position (Battle)'].x = 100;
$gameSystem._VCMHelpWindow['Log Help Window Position (Battle)'].y = 100;
$gameSystem._VCMHelpWindow['Log Help Window Position (Battle)'].Width = 400;
$gameSystem._VCMHelpWindow['Log Help Window Position (Battle)'].Height = 200;
$gameSystem._VCMHelpWindow['Log Help Window Text (Battle)'] = "Carnage!";
$gameSystem._VCMHelpWindow['Log Help Window Windowskin (Battle)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Log Help Window Font (Battle)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Log Help Window Font (Battle)']['Font Size'] = 30;
$gameSystem._VCMHelpWindow['Log Help Window Font (Battle)'].Italic = true;
$gameSystem._VCMHelpWindow['Log Help Window Font (Battle)']['Text Color'] = "rgba(1, 12, 14, 1)";
$gameSystem._VCMHelpWindow['Log Help Window Font (Battle)']['Text Outline Color'] = "rgba(280, 220, 240, 1)";
$gameSystem._VCMHelpWindow['Log Help Window Font (Battle)']['Text Outline Width'] = 8;
$gameSystem._VCMHelpWindow['Log Help Window Opacity (Battle)'] = 100;

$gameSystem._VCMHelpWindow['Party Command Help Window (Battle)'] = true;
$gameSystem._VCMHelpWindow['Party Command Help Window Position (Battle)'].x = 100;
$gameSystem._VCMHelpWindow['Party Command Help Window Position (Battle)'].y = 10;
$gameSystem._VCMHelpWindow['Party Command Help Window Position (Battle)'].Width = 400;
$gameSystem._VCMHelpWindow['Party Command Help Window Position (Battle)'].Height = 200;
$gameSystem._VCMHelpWindow['Party Command Help Window Text (Battle)'] = ["Choose me!", "Don't You Dare To Choose Me!"];
$gameSystem._VCMHelpWindow['Party Command Help Window Windowskin (Battle)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Party Command Help Window Font (Battle)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Party Command Help Window Font (Battle)']['Font Size'] = 40;
$gameSystem._VCMHelpWindow['Party Command Help Window Font (Battle)'].Italic = true;
$gameSystem._VCMHelpWindow['Party Command Help Window Font (Battle)']['Text Color'] = "rgba(90, 20, 240, 0.9)";
$gameSystem._VCMHelpWindow['Party Command Help Window Font (Battle)']['Text Outline Color'] = "rgba(80, 20, 40, 0.6)";
$gameSystem._VCMHelpWindow['Party Command Help Window Font (Battle)']['Text Outline Width'] = 8;
$gameSystem._VCMHelpWindow['Party Command Help Window Opacity (Battle)'] = 200;

$gameSystem._VCMHelpWindow['Actor Command Help Window (Battle)'] = true;
$gameSystem._VCMHelpWindow['Actor Command Help Window Position (Battle)'].x = 100;
$gameSystem._VCMHelpWindow['Actor Command Help Window Position (Battle)'].y = 10;
$gameSystem._VCMHelpWindow['Actor Command Help Window Position (Battle)'].Width = 400;
$gameSystem._VCMHelpWindow['Actor Command Help Window Position (Battle)'].Height = 200;
$gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'][0] = "I have Mysterious Properties";
$gameSystem._VCMHelpWindow['Actor Command Help Window Windowskin (Battle)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Actor Command Help Window Font (Battle)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Actor Command Help Window Font (Battle)']['Font Size'] = 20;
$gameSystem._VCMHelpWindow['Actor Command Help Window Font (Battle)'].Italic = true;
$gameSystem._VCMHelpWindow['Actor Command Help Window Font (Battle)']['Text Color'] = "rgba(90, 20, 240, 0.9)";
$gameSystem._VCMHelpWindow['Actor Command Help Window Font (Battle)']['Text Outline Color'] = "rgba(80, 20, 40, 0.6)";
$gameSystem._VCMHelpWindow['Actor Command Help Window Font (Battle)']['Text Outline Width'] = 8;
$gameSystem._VCMHelpWindow['Actor Command Help Window Opacity (Battle)'] = 100;

$gameSystem._VCMHelpWindow['Actor Help Window (Battle)'] = true;
$gameSystem._VCMHelpWindow['Actor Help Window Position (Battle)'].x = 100;
$gameSystem._VCMHelpWindow['Actor Help Window Position (Battle)'].y = 10;
$gameSystem._VCMHelpWindow['Actor Help Window Position (Battle)'].Width = 400;
$gameSystem._VCMHelpWindow['Actor Help Window Position (Battle)'].Height = 200;
$gameSystem._VCMHelpWindow['Actor Help Window Text (Battle)'] = ["I'm the Protagonist", "I'm a Nobody", "I'm a Nobody", "I'm a Nobody"];
$gameSystem._VCMHelpWindow['Actor Help Window Windowskin (Battle)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Actor Help Window Font (Battle)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Actor Help Window Font (Battle)']['Font Size'] = 20;
$gameSystem._VCMHelpWindow['Actor Help Window Font (Battle)'].Italic = true;
$gameSystem._VCMHelpWindow['Actor Help Window Font (Battle)']['Text Color'] = "rgba(90, 220, 40, 0.9)";
$gameSystem._VCMHelpWindow['Actor Help Window Font (Battle)']['Text Outline Color'] = "rgba(80, 20, 240, 0.8)";
$gameSystem._VCMHelpWindow['Actor Help Window Font (Battle)']['Text Outline Width'] = 8;
$gameSystem._VCMHelpWindow['Actor Help Window Opacity (Battle)'] = 100;

$gameSystem._VCMHelpWindow['Enemy Help Window (Battle)'] = true;
$gameSystem._VCMHelpWindow['Enemy Help Window Position (Battle)'].x = 100;
$gameSystem._VCMHelpWindow['Enemy Help Window Position (Battle)'].y = 10;
$gameSystem._VCMHelpWindow['Enemy Help Window Position (Battle)'].Width = 400;
$gameSystem._VCMHelpWindow['Enemy Help Window Position (Battle)'].Height = 200;
$gameSystem._VCMHelpWindow['Enemy Help Window Text (Battle)'] = ["I'm a Clone", "I'm the Original"];
$gameSystem._VCMHelpWindow['Enemy Help Window Windowskin (Battle)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Enemy Help Window Font (Battle)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Enemy Help Window Font (Battle)']['Font Size'] = 20;
$gameSystem._VCMHelpWindow['Enemy Help Window Font (Battle)'].Italic = true;
$gameSystem._VCMHelpWindow['Enemy Help Window Font (Battle)']['Text Color'] = "rgba(90, 220, 40, 0.9)";
$gameSystem._VCMHelpWindow['Enemy Help Window Font (Battle)']['Text Outline Color'] = "rgba(80, 20, 240, 0.8)";
$gameSystem._VCMHelpWindow['Enemy Help Window Font (Battle)']['Text Outline Width'] = 8;
$gameSystem._VCMHelpWindow['Enemy Help Window Opacity (Battle)'] = 230;

$gameSystem._VCMHelpWindow['Skill Help Window (Battle)'] = true;
$gameSystem._VCMHelpWindow['Skill Help Window Position (Battle)'].x = 100;
$gameSystem._VCMHelpWindow['Skill Help Window Position (Battle)'].y = 10;
$gameSystem._VCMHelpWindow['Skill Help Window Position (Battle)'].Width = 400;
$gameSystem._VCMHelpWindow['Skill Help Window Position (Battle)'].Height = 200;
$gameSystem._VCMHelpWindow['Skill Help Window Windowskin (Battle)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Skill Help Window Font (Battle)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Skill Help Window Font (Battle)']['Font Size'] = 20;
$gameSystem._VCMHelpWindow['Skill Help Window Font (Battle)'].Italic = true;
$gameSystem._VCMHelpWindow['Skill Help Window Font (Battle)']['Text Color'] = "rgba(133, 220, 140, 0.9)";
$gameSystem._VCMHelpWindow['Skill Help Window Font (Battle)']['Text Outline Color'] = "rgba(80, 200, 240, 1)";
$gameSystem._VCMHelpWindow['Skill Help Window Font (Battle)']['Text Outline Width'] = 8;
$gameSystem._VCMHelpWindow['Skill Help Window Opacity (Battle)'] = 100;

$gameSystem._VCMHelpWindow['Item Help Window (Battle)'] = true;
$gameSystem._VCMHelpWindow['Item Help Window Position (Battle)'].x = 100;
$gameSystem._VCMHelpWindow['Item Help Window Position (Battle)'].y = 10;
$gameSystem._VCMHelpWindow['Item Help Window Position (Battle)'].Width = 400;
$gameSystem._VCMHelpWindow['Item Help Window Position (Battle)'].Height = 200;
$gameSystem._VCMHelpWindow['Item Help Window Windowskin (Battle)'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Item Help Window Font (Battle)'].Font = "Algerian";
$gameSystem._VCMHelpWindow['Item Help Window Font (Battle)']['Font Size'] = 20;
$gameSystem._VCMHelpWindow['Item Help Window Font (Battle)'].Italic = true;
$gameSystem._VCMHelpWindow['Item Help Window Font (Battle)']['Text Color'] = "rgba(233, 220, 240, 0.7)";
$gameSystem._VCMHelpWindow['Item Help Window Font (Battle)']['Text Outline Color'] = "rgba(8, 200, 2, 1)";
$gameSystem._VCMHelpWindow['Item Help Window Font (Battle)']['Text Outline Width'] = 8;
$gameSystem._VCMHelpWindow['Item Help Window Opacity (Battle)'] = 70;

$gameSystem._VCMHelpWindow['Gameover Help Window'] = true;
$gameSystem._VCMHelpWindow['Gameover Help Window Position'].x = 6;
$gameSystem._VCMHelpWindow['Gameover Help Window Position'].y = 8;
$gameSystem._VCMHelpWindow['Gameover Help Window Position'].Width = 709;
$gameSystem._VCMHelpWindow['Gameover Help Window Position'].Height = 103;
$gameSystem._VCMHelpWindow['Gameover Help Window Text'] = "Goodbye";
$gameSystem._VCMHelpWindow['Gameover Help Window Windowskin'] = "Window - Copy";
$gameSystem._VCMHelpWindow['Gameover Help Window Font'].Font = "Arial";
$gameSystem._VCMHelpWindow['Gameover Help Window Font']['Font Size'] = 41;
$gameSystem._VCMHelpWindow['Gameover Help Window Font'].Italic = true;
$gameSystem._VCMHelpWindow['Gameover Help Window Font']['Text Color'] = "rgba(55, 255, 255, 0.6)";
$gameSystem._VCMHelpWindow['Gameover Help Window Font']['Text Outline Color'] = "rgba(55, 70, 255, 0.1)";
$gameSystem._VCMHelpWindow['Gameover Help Window Font']['Text Outline Width'] = 10;
$gameSystem._VCMHelpWindow['Gameover Help Window Opacity'] = 250;

-----------------------------------------------------------------------------
Optimization
-----------------------------------------------------------------------------

The Custom Text Codes use evals to run the values inside the parameters.
Though powerful, evals are known for being inefficient performance-wise,
possibly causing your game to lag if running too many lines of codes.
A way of optimizing performance is replacing the evals with the actual
code. All eval usage is in the Window_Help.prototype.setText function.
Examples:
value = eval(VCM.Param.h); -> value = "Heals";
value = eval(VCM.Param.p); -> value = $gameSystem.playtimeText();
value = eval(VCM.Param.a); ->
if($gameParty.inBattle()){
	if(item){
		if(DataManager.isItem(item) || DataManager.isSkill(item)){
			if(item.hitType === 1){
				value = "Accuracy: " + item.successRate * BattleManager.actor().hit + "%";
			}else{
				value = "Accuracy: " + item.successRate + "%";
			}
		}
	}
}
value = eval(VCM.Param.y); ->
if($gameParty.inBattle()){
	for(var i = 0; i < SceneManager._scene._spriteset._enemySprites.length; i++){
		if(SceneManager._scene._spriteset._enemySprites[i]._battler._selected){
			$gameSystem._VCMHelpWindow['Enemy Help Window Position (Battle)'].y = SceneManager._scene._spriteset._enemySprites[i]._battler._screenY - SceneManager._scene._spriteset._enemySprites[i].height - this.height;
			this.y = SceneManager._scene._spriteset._enemySprites[i]._battler._screenY - SceneManager._scene._spriteset._enemySprites[i].height - this.height;
			break;
		}
	}
};

-----------------------------------------------------------------------------
Compatibility
-----------------------------------------------------------------------------

​Plugin Manager line-up for maximum compatibility:
VCM_HelpWindow
VCM_PreviousTurn
VCM_BattleSave
VCM_Quicksave
VCM_MovementSpeeds
VCM_StateDescription
VCM_TermDescription
VCM_BattleMainMenu
VCM_EventHighlighting
VCM_SkillBar
VCM_MirroredSpriteset
VCM_ActionPoints
VCM_ActionOrder
VCM_EnemyGauges
VCM_MultipleGauges
VCM_ElementAffinity
VCM_AutoBattle
VCM_EnemyInfo
VCM_NumberBattlers
VCM_NoBattleLog

This plugin supports new Commands(provided it follows the new syntax),
but does not supports new scenarios. For example, if you add a 'Credits'
Command to the Title Window, it will show the text you specified for it in
the parameters. But it won't do nothing when you actually enter in your
Credits.
This probably will have 2 possible outcomes:
 - The Help Window will never appear
 - The Help Window will stay how it was before you entered the Credits
​Therefore, any custom scenario you created for your game, if you want it
to use this plugin features, you will have to implement it yourself.

This plugin overwrites the following functions:
ConfigManager.makeData
Window_Help.prototype.initialize
Window_Help.prototype.setText
Window_Help.prototype.setItem
Window_Help.prototype.loadWindowskin(from Window_Base)
Window_Help.prototype.drawTextEx(from Window_Base)
Window_Help.prototype.updateTone(from Window_Base)
Window_Command.prototype.initialize
Window_Command.prototype.addCommand
Window_Command.prototype.updateHelp(from Window_Selectable)
Window_TitleCommand.prototype.makeCommandList
Window_ChoiceList.prototype.makeCommandList
Window_NumberInput.prototype.updateHelp(from Window_Selectable)
Window_Message.prototype.startInput
Window_MenuCommand.prototype.addMainCommands
Window_MenuCommand.prototype.addFormationCommand
Window_MenuCommand.prototype.addOptionsCommand
Window_MenuCommand.prototype.addSaveCommand
Window_MenuCommand.prototype.addGameEndCommand
Window_MenuStatus.prototype.updateHelp(from Window_Selectable)
Window_MenuActor.prototype.updateHelp(from Window_Selectable)
Window_ItemCategory.prototype.makeCommandList
Scene_Item.prototype.createHelpWindow(from Scene_MenuBase)
Window_EquipCommand.prototype.makeCommandList
Scene_Equip.prototype.commandEquip
Scene_Equip.prototype.onSlotOk
Window_Options.prototype.addGeneralOptions
Window_Options.prototype.addVolumeOptions
Window_SavefileList.prototype.updateHelp(from Window_Selectable)
Scene_File.prototype.createHelpWindow
Window_GameEnd.prototype.makeCommandList
Window_ShopCommand.prototype.makeCommandList
Scene_Shop.prototype.onBuyCancel
Scene_Shop.prototype.onSellCancel
Window_PartyCommand.prototype.makeCommandList
Window_ActorCommand.prototype.addAttackCommand
Window_ActorCommand.prototype.addSkillCommands
Window_ActorCommand.prototype.addGuardCommand
Window_ActorCommand.prototype.addItemCommand
Window_BattleActor.prototype.updateHelp(from Window_Selectable)
Window_BattleEnemy.prototype.updateHelp(from Window_Selectable)
Scene_Battle.prototype.createAllWindows
Scene_Battle.prototype.createHelpWindow

This means that any plugins above it in the Plugin Manager will
have these functions overwritten. It is advisable to put plugins
that share one or more of these functions under this plugin,
if possible(unless you don't need that piece of code for your game).
This will not guarantee that the plugins will be compatible, however.

This plugin also uses the current code of the following functions:
ConfigManager.applyData
Game_System.prototype.initialize
Window_Help.prototype.createContents(from Window_Base)
Window_Help.prototype.processNormalCharacter(from Window_Base)
Scene_Boot.prototype.loadSystemWindowImage
Scene_Title.prototype.create
Scene_Title.prototype.commandContinue
Scene_Title.prototype.commandOptions
Window_Message.prototype.initialize
Window_Message.prototype.startMessage
Window_Message.prototype.terminateMessage
Window_ScrollText.prototype.initialize
Window_ScrollText.prototype.startMessage
Window_ScrollText.prototype.terminateMessage
Scene_Map.prototype.terminate
Scene_Map.prototype.createAllWindows
Scene_Map.prototype.update
Scene_Map.prototype.createMessageWindow
Scene_Map.prototype.createScrollTextWindow
Window_MenuCommand.prototype.activate(from Window_Selectable)
Window_MenuStatus.prototype.activate(from Window_Selectable)
Scene_Menu.prototype.create
Window_MenuActor.prototype.activate(from Window_Selectable)
Window_MenuActor.prototype.selectLast
Scene_ItemBase.prototype.createActorWindow
Window_ItemCategory.prototype.activate(from Window_Selectable)
Window_ItemList.prototype.activate(from Window_Selectable)
Scene_Item.prototype.create
Scene_Item.prototype.createCategoryWindow
Window_SkillType.prototype.activate(from Window_Selectable)
Window_SkillList.prototype.activate(from Window_Selectable)
Scene_Skill.prototype.start
Scene_Skill.prototype.createSkillTypeWindow
Window_EquipCommand.prototype.activate(from Window_Selectable)
Window_EquipSlot.prototype.activate(from Window_Selectable)
Window_EquipItem.prototype.activate(from Window_Selectable)
Scene_Equip.prototype.create
Scene_Status.prototype.create
Scene_Options.prototype.create
Scene_File.prototype.create
Scene_GameEnd.prototype.create
Window_ShopCommand.prototype.activate(from Window_Selectable)
Window_ShopBuy.prototype.activate(from Window_Selectable)
Window_ShopSell.prototype.activate(from Window_Selectable)
Window_ShopNumber.prototype.activate(from Window_Selectable)
Scene_Shop.prototype.create
Scene_Shop.prototype.createCommandWindow
Scene_Shop.prototype.createNumberWindow
Scene_Name.prototype.create
Window_BattleLog.prototype.addText
Window_PartyCommand.prototype.activate(from Window_Selectable)
Window_ActorCommand.prototype.activate(from Window_Selectable)
Window_ActorCommand.prototype.makeCommandList
Window_BattleActor.prototype.activate(from Window_Selectable)
Window_BattleEnemy.prototype.activate(from Window_Selectable)
Window_BattleSkill.prototype.activate(from Window_Selectable)
Window_BattleItem.prototype.activate(from Window_Selectable)
Scene_Battle.prototype.createDisplayObjects
Scene_Battle.prototype.createPartyCommandWindow
Scene_Battle.prototype.createActorCommandWindow
Scene_Battle.prototype.createActorWindow
Scene_Battle.prototype.createEnemyWindow
Scene_Battle.prototype.createMessageWindow
Scene_Battle.prototype.createScrollTextWindow
Scene_Gameover.prototype.create

This means that this plugin will use any changes to those functions
made by plugins above it in the Plugin Manager, which may, or may not
be compatible.

-----------------------------------------------------------------------------
Versions
-----------------------------------------------------------------------------

Version -> 1.00
Released Plugin.

Version -> 1.01
Removed an unnecessary console log. Updated documentation.

Version -> 1.02
Updated documentation.
*/

"use strict";

var Imported = Imported || {};
Imported.VCM_HelpWindow = true;

function VCMConvert (parameters) {
	function VCMParse (string) {
		try {
			return JSON.parse(string, (key, value) => {
				try {
					return VCMParse(value);
				} catch (e) {
					return value;
				}
			});
		} catch (e) {
			return string;
		}
	};
	return VCMParse(JSON.stringify(parameters));
};

var VCM = VCM || {};
VCM.HelpWindow = VCM.HelpWindow || {};
VCM.Param = VCM.Param || {};
VCM.Param = VCMConvert(PluginManager.parameters('VCM_HelpWindow')) || {};


//-----------------------------------------------------------------------------
// ConfigManager
//
// The static class that manages the configuration data.

ConfigManager.makeData = function() {
    var config = {};
    config.alwaysDash = this.alwaysDash;
    config.commandRemember = this.commandRemember;
    config.bgmVolume = this.bgmVolume;
    config.bgsVolume = this.bgsVolume;
    config.meVolume = this.meVolume;
    config.seVolume = this.seVolume;
	///
	config.showTitleHelpWindow = VCM.Param['Title Help Window'];
	config.titleHelpWindowPosition = VCM.Param['Title Help Window Position'];
	config.titleHelpWindowText = VCM.Param['Title Help Window Text'];
	config.titleHelpWindowWindowskin = VCM.Param['Title Help Window Windowskin'];
	config.titleHelpWindowFont = VCM.Param['Title Help Window Font'];
	config.titleHelpWindowOpacity = VCM.Param['Title Help Window Opacity'];
	config.showOptionsHelpWindow = VCM.Param['Options Help Window'];
	config.optionsHelpWindowPosition = VCM.Param['Options Help Window Position'];
	config.optionsHelpWindowText = VCM.Param['Options Help Window Text'];
	config.optionsHelpWindowWindowskin = VCM.Param['Options Help Window Windowskin'];
	config.optionsHelpWindowFont = VCM.Param['Options Help Window Font'];
	config.optionsHelpWindowOpacity = VCM.Param['Options Help Window Opacity'];
	config.showLoadHelpWindow = VCM.Param['Load Help Window'];
	config.loadHelpWindowPosition = VCM.Param['Load Help Window Position'];
	config.loadHelpWindowText = VCM.Param['Load Help Window Text'];
	config.loadHelpWindowWindowskin = VCM.Param['Load Help Window Windowskin'];
	config.loadHelpWindowFont = VCM.Param['Load Help Window Font'];
	config.loadHelpWindowOpacity = VCM.Param['Load Help Window Opacity'];
	config.helpWindowWordwrapping = VCM.Param['Help Window Wordwrapping'];
	///
    return config;
};

VCM.HelpWindow.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	///
	VCM.Param['Title Help Window'] = config.showTitleHelpWindow || VCM.Param['Title Help Window'];
	VCM.Param['Title Help Window Position'] = config.titleHelpWindowPosition || VCM.Param['Title Help Window Position'];
	VCM.Param['Title Help Window Text'] = config.titleHelpWindowText || VCM.Param['Title Help Window Text'];
	VCM.Param['Title Help Window Windowskin'] = config.titleHelpWindowWindowskin || VCM.Param['Title Help Window Windowskin'];
	VCM.Param['Title Help Window Font'] = config.titleHelpWindowFont || VCM.Param['Title Help Window Font'];
	if(config.titleHelpWindowOpacity !== undefined && config.titleHelpWindowOpacity !== null){
		VCM.Param['Title Help Window Opacity'] = config.titleHelpWindowOpacity;
	}
	VCM.Param['Options Help Window'] = config.showOptionsHelpWindow || VCM.Param['Options Help Window'];
	VCM.Param['Options Help Window Position'] = config.optionsHelpWindowPosition || VCM.Param['Options Help Window Position'];
	VCM.Param['Options Help Window Text'] = config.optionsHelpWindowText || VCM.Param['Options Help Window Text'];
	VCM.Param['Options Help Window Windowskin'] = config.optionsHelpWindowWindowskin || VCM.Param['Options Help Window Windowskin'];
	VCM.Param['Options Help Window Font'] = config.optionsHelpWindowFont || VCM.Param['Options Help Window Font'];
	if(config.optionsHelpWindowOpacity !== undefined && config.optionsHelpWindowOpacity !== null){
		VCM.Param['Options Help Window Opacity'] = config.optionsHelpWindowOpacity;
	}
	VCM.Param['Load Help Window'] = config.showLoadHelpWindow || VCM.Param['Load Help Window'];
	VCM.Param['Load Help Window Position'] = config.loadHelpWindowPosition || VCM.Param['Load Help Window Position'];
	VCM.Param['Load Help Window Text'] = config.loadHelpWindowText || VCM.Param['Load Help Window Text'];
	VCM.Param['Load Help Window Windowskin'] = config.loadHelpWindowWindowskin || VCM.Param['Load Help Window Windowskin'];
	VCM.Param['Load Help Window Font'] = config.loadHelpWindowFont || VCM.Param['Load Help Window Font'];
	if(config.loadHelpWindowOpacity !== undefined && config.loadHelpWindowOpacity !== null){
		VCM.Param['Load Help Window Opacity'] = config.optionsHelpWindowOpacity;
	}
	VCM.Param['Help Window Wordwrapping'] = config.helpWindowWordwrapping || VCM.Param['Help Window Wordwrapping'];
	///
	VCM.HelpWindow.ConfigManager_applyData.call(this, config);
};

//-----------------------------------------------------------------------------
// Game_System
//
// The game object class for the system data.

VCM.HelpWindow.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    VCM.HelpWindow.Game_System_initialize.call(this);
	///
	this._VCMHelpWindow = Object.assign({}, VCM.Param);
	this._updateMapHelpWindow = false;
	this._helpWindowTone = [0, 0, 0];
	///
};

///
Game_System.prototype.setHelpWindowTone = function(tone1, tone2, tone3) {
    this._helpWindowTone = [tone1.clamp(-255, 255), tone2.clamp(-255, 255), tone3.clamp(-255, 255)];
};
///

///
Game_System.prototype.updateMapHelpWindow = function() {
    this._updateMapHelpWindow = true;
};
///

//-----------------------------------------------------------------------------
// Window_Help
//
// The window for displaying the description of the selected item.

Window_Help.prototype.initialize = function(numLines) {
	///
	var x = 0;
	var y = 0;
	var width = Graphics.boxWidth;
	var height = this.fittingHeight(numLines || 2);
	if(SceneManager._scene instanceof Scene_Title){
		x = VCM.Param['Title Help Window Position'].x;
		y = VCM.Param['Title Help Window Position'].y;
		width = VCM.Param['Title Help Window Position'].Width;
		height = VCM.Param['Title Help Window Position'].Height;
	}
	else if(SceneManager._scene instanceof Scene_Map){
		x = $gameSystem._VCMHelpWindow['Map Help Window Position'].x;
		y = $gameSystem._VCMHelpWindow['Map Help Window Position'].y;
		width = $gameSystem._VCMHelpWindow['Map Help Window Position'].Width;
		height = $gameSystem._VCMHelpWindow['Map Help Window Position'].Height;
	}
	else if(SceneManager._scene instanceof Scene_Status){
		x = $gameSystem._VCMHelpWindow['Status Help Window Position'].x;
		y = $gameSystem._VCMHelpWindow['Status Help Window Position'].y;
		width = $gameSystem._VCMHelpWindow['Status Help Window Position'].Width;
		height = $gameSystem._VCMHelpWindow['Status Help Window Position'].Height;
	}
	else if(SceneManager._scene instanceof Scene_Options){
		x = VCM.Param['Options Help Window Position'].x;
		y = VCM.Param['Options Help Window Position'].y;
		width = VCM.Param['Options Help Window Position'].Width;
		height = VCM.Param['Options Help Window Position'].Height;
	}
	else if(SceneManager._scene instanceof Scene_Save){
		x = $gameSystem._VCMHelpWindow['Save Help Window Position'].x;
		y = $gameSystem._VCMHelpWindow['Save Help Window Position'].y;
		width = $gameSystem._VCMHelpWindow['Save Help Window Position'].Width;
		height = $gameSystem._VCMHelpWindow['Save Help Window Position'].Height;
	}
	else if(SceneManager._scene instanceof Scene_Load){
		x = VCM.Param['Load Help Window Position'].x;
		y = VCM.Param['Load Help Window Position'].y;
		width = VCM.Param['Load Help Window Position'].Width;
		height = VCM.Param['Load Help Window Position'].Height;
	}
	else if(SceneManager._scene instanceof Scene_GameEnd){
		x = $gameSystem._VCMHelpWindow['Game End Help Window Position'].x;
		y = $gameSystem._VCMHelpWindow['Game End Help Window Position'].y;
		width = $gameSystem._VCMHelpWindow['Game End Help Window Position'].Width;
		height = $gameSystem._VCMHelpWindow['Game End Help Window Position'].Height;
	}
	else if(SceneManager._scene instanceof Scene_Name){
		x = $gameSystem._VCMHelpWindow['Name Input Help Window Position'].x;
		y = $gameSystem._VCMHelpWindow['Name Input Help Window Position'].y;
		width = $gameSystem._VCMHelpWindow['Name Input Help Window Position'].Width;
		height = $gameSystem._VCMHelpWindow['Name Input Help Window Position'].Height;
	}
	else if(SceneManager._scene instanceof Scene_Gameover){
		x = $gameSystem._VCMHelpWindow['Gameover Help Window Position'].x;
		y = $gameSystem._VCMHelpWindow['Gameover Help Window Position'].y;
		width = $gameSystem._VCMHelpWindow['Gameover Help Window Position'].Width;
		height = $gameSystem._VCMHelpWindow['Gameover Help Window Position'].Height;
	}
	///
	Window_Base.prototype.initialize.call(this, x, y, width, height);
    ///var width = Graphics.boxWidth;
    ///var height = this.fittingHeight(numLines || 2);
    ///Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._text = '';
	///
	this._item = null;
	///
};

Window_Help.prototype.setText = function(text, item) {
    if (this._text !== text || this._item !== item) {
		///
		this.contents.clear();
		this._item = item;
		///
		this._text = text;
		///
		var value = '';
		if(this._text.match(/\\a/g)){
			try{
				value = eval(VCM.Param.a);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> a');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\a/g,value);
		}
		
		value = '';
		if(this._text.match(/\\b/g)){
			try{
				value = eval(VCM.Param.b);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> b');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\b/g,value);
		}
		
		value = '';
		if(this._text.match(/\\c/g)){
			try{
				value = eval(VCM.Param.c);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> c');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\c/g,value);
		}
		
		value = '';
		if(this._text.match(/\\d/g)){
			try{
				value = eval(VCM.Param.d);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> d');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\d/g,value);
		}
		
		value = '';
		if(this._text.match(/\\e/g)){
			try{
				value = eval(VCM.Param.e);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> e');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\e/g,value);
		}
		
		value = '';
		if(this._text.match(/\\f/g)){
			try{
				value = eval(VCM.Param.f);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> f');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\f/g,value);
		}
		
		value = '';
		if(this._text.match(/\\g/g)){
			try{
				value = eval(VCM.Param.g);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> g');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\g/g,value);
		}
		
		value = '';
		if(this._text.match(/\\h/g)){
			try{
				value = eval(VCM.Param.h);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> h');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\h/g,value);
		}
		
		value = '';
		if(this._text.match(/\\i/g)){
			try{
				value = eval(VCM.Param.i);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> i');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\i/g,value);
		}
		
		value = '';
		if(this._text.match(/\\j/g)){
			try{
				value = eval(VCM.Param.j);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> j');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\j/g,value);
		}
		
		value = '';
		if(this._text.match(/\\k/g)){
			try{
				value = eval(VCM.Param.k);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> k');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\k/g,value);
		}
		
		value = '';
		if(this._text.match(/\\l/g)){
			try{
				value = eval(VCM.Param.l);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> l');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\l/g,value);
		}
		
		value = '';
		if(this._text.match(/\\m/g)){
			try{
				value = eval(VCM.Param.m);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> m');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\m/g,value);
		}
		
		value = '';
		if(this._text.match(/\\n/g)){
			try{
				value = eval(VCM.Param.n);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> n');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\n/g,value);
		}
		
		value = '';
		if(this._text.match(/\\o/g)){
			try{
				value = eval(VCM.Param.o);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> o');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\o/g,value);
		}
		
		value = '';
		if(this._text.match(/\\p/g)){
			try{
				value = eval(VCM.Param.p);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> p');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\p/g,value);
		}
		
		value = '';
		if(this._text.match(/\\q/g)){
			try{
				value = eval(VCM.Param.q);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> q');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\q/g,value);
		}
		
		value = '';
		if(this._text.match(/\\r/g)){
			try{
				value = eval(VCM.Param.r);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> r');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\r/g,value);
		}
		
		value = '';
		if(this._text.match(/\\s/g)){
			try{
				value = eval(VCM.Param.s);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> s');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\s/g,value);
		}
		
		value = '';
		if(this._text.match(/\\t/g)){
			try{
				value = eval(VCM.Param.t);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> t');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\t/g,value);
		}
		
		value = '';
		if(this._text.match(/\\u/g)){
			try{
				value = eval(VCM.Param.u);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> u');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\u/g,value);
		}
		
		value = '';
		if(this._text.match(/\\v/g)){
			try{
				value = eval(VCM.Param.v);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> v');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\v/g,value);
		}
		
		value = '';
		if(this._text.match(/\\w/g)){
			try{
				value = eval(VCM.Param.w);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> w');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\w/g,value);
		}
		
		value = '';
		if(this._text.match(/\\x/g)){
			try{
				value = eval(VCM.Param.x);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> x');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\x/g,value);
		}
		
		value = '';
		if(this._text.match(/\\y/g)){
			try{
				value = eval(VCM.Param.y);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> y');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\y/g,value);
		}
		
		value = '';
		if(this._text.match(/\\z/g)){
			try{
				value = eval(VCM.Param.z);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at Plugin Parameter -> z');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/\\z/g,value);
		}
		
		while(this._text.match(/<(?:Eval):[ ](.*?)>/i)){
			value = '';
			var code = this._text.match(/<(?:Eval):[ ](.*?)>/i);
			code = String(RegExp.$1);
			try{
				value = eval(code);
			}
			catch(e){
				console.log('VCM_HelpWindow Error: Invalid Code at <Eval: ' + code + '>');
			}
			if(value === undefined){
				value = '';
			}
			this._text = this._text.replace(/<(?:Eval):[ ](.*?)>/i,value);
		}
		///
		this.refresh();
		}
};

Window_Help.prototype.setItem = function(item) {
	///this.setText(item ? item.description : '');
	this.setText(item ? item.description : '', item);
};

Window_Help.prototype.refresh = function() {
    ///this.contents.clear();
    this.drawTextEx(this._text, this.textPadding(), 0);
};

Window_Help.prototype.loadWindowskin = function() {
	///this.windowskin = ImageManager.loadSystem('Window');
	///
	if(SceneManager._scene instanceof Scene_Title){
		this.windowskin = ImageManager.loadSystem(VCM.Param['Title Help Window Windowskin']);
	}
	else if(SceneManager._scene instanceof Scene_Map){
		this.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Map Help Window Windowskin']);
	}
	else if(SceneManager._scene instanceof Scene_Status){
		this.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Status Help Window Windowskin']);
	}
	else if(SceneManager._scene instanceof Scene_Options){
		this.windowskin = ImageManager.loadSystem(VCM.Param['Options Help Window Windowskin']);
	}
	else if(SceneManager._scene instanceof Scene_Save){
		this.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Save Help Window Windowskin']);
	}
	else if(SceneManager._scene instanceof Scene_Load){
		this.windowskin = ImageManager.loadSystem(VCM.Param['Load Help Window Windowskin']);
	}
	else if(SceneManager._scene instanceof Scene_GameEnd){
		this.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Game End Help Window Windowskin']);
	}
	else if(SceneManager._scene instanceof Scene_Name){
		this.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Name Input Help Window Windowskin']);
	}
	else if(SceneManager._scene instanceof Scene_Gameover){
		this.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Gameover Help Window Windowskin']);
	}
	else{
		this.windowskin = ImageManager.loadSystem('Window');
	}
	///
};

VCM.HelpWindow.Window_Help_createContents = Window_Help.prototype.createContents;
Window_Help.prototype.createContents = function() {
    VCM.HelpWindow.Window_Help_createContents.call(this);
	///
	if(SceneManager._scene instanceof Scene_Title){
		this.contents.fontFace = VCM.Param['Title Help Window Font'].Font;
		this.contents.fontSize = VCM.Param['Title Help Window Font']['Font Size'];
		this.contents.fontItalic = VCM.Param['Title Help Window Font'].Italic;
		this.contents.textColor = VCM.Param['Title Help Window Font']['Text Color'];
		this.contents.outlineColor = VCM.Param['Title Help Window Font']['Text Outline Color'];
		this.contents.outlineWidth = VCM.Param['Title Help Window Font']['Text Outline Width'];
		this.opacity = VCM.Param['Title Help Window Opacity'];
	}
	else if(SceneManager._scene instanceof Scene_Map){
		this.contents.fontFace = $gameSystem._VCMHelpWindow['Map Help Window Font'].Font;
		this.contents.fontSize = $gameSystem._VCMHelpWindow['Map Help Window Font']['Font Size'];
		this.contents.fontItalic = $gameSystem._VCMHelpWindow['Map Help Window Font'].Italic;
		this.contents.textColor = $gameSystem._VCMHelpWindow['Map Help Window Font']['Text Color'];
		this.contents.outlineColor = $gameSystem._VCMHelpWindow['Map Help Window Font']['Text Outline Color'];
		this.contents.outlineWidth = $gameSystem._VCMHelpWindow['Map Help Window Font']['Text Outline Width'];
		this.opacity = $gameSystem._VCMHelpWindow['Map Help Window Opacity'];
	}
	else if(SceneManager._scene instanceof Scene_Status){
		this.contents.fontFace = $gameSystem._VCMHelpWindow['Status Help Window Font'].Font;
		this.contents.fontSize = $gameSystem._VCMHelpWindow['Status Help Window Font']['Font Size'];
		this.contents.fontItalic = $gameSystem._VCMHelpWindow['Status Help Window Font'].Italic;
		this.contents.textColor = $gameSystem._VCMHelpWindow['Status Help Window Font']['Text Color'];
		this.contents.outlineColor = $gameSystem._VCMHelpWindow['Status Help Window Font']['Text Outline Color'];
		this.contents.outlineWidth = $gameSystem._VCMHelpWindow['Status Help Window Font']['Text Outline Width'];
		this.opacity = $gameSystem._VCMHelpWindow['Status Help Window Opacity'];
	}
	else if(SceneManager._scene instanceof Scene_Options){
		this.contents.fontFace = VCM.Param['Options Help Window Font'].Font;
		this.contents.fontSize = VCM.Param['Options Help Window Font']['Font Size'];
		this.contents.fontItalic = VCM.Param['Options Help Window Font'].Italic;
		this.contents.textColor = VCM.Param['Options Help Window Font']['Text Color'];
		this.contents.outlineColor = VCM.Param['Options Help Window Font']['Text Outline Color'];
		this.contents.outlineWidth = VCM.Param['Options Help Window Font']['Text Outline Width'];
		this.opacity = VCM.Param['Options Help Window Opacity'];
	}
	else if(SceneManager._scene instanceof Scene_Save){
		this.contents.fontFace = $gameSystem._VCMHelpWindow['Save Help Window Font'].Font;
		this.contents.fontSize = $gameSystem._VCMHelpWindow['Save Help Window Font']['Font Size'];
		this.contents.fontItalic = $gameSystem._VCMHelpWindow['Save Help Window Font'].Italic;
		this.contents.textColor = $gameSystem._VCMHelpWindow['Save Help Window Font']['Text Color'];
		this.contents.outlineColor = $gameSystem._VCMHelpWindow['Save Help Window Font']['Text Outline Color'];
		this.contents.outlineWidth = $gameSystem._VCMHelpWindow['Save Help Window Font']['Text Outline Width'];
		this.opacity = $gameSystem._VCMHelpWindow['Save Help Window Opacity'];
	}
	else if(SceneManager._scene instanceof Scene_Load){
		this.contents.fontFace = VCM.Param['Load Help Window Font'].Font;
		this.contents.fontSize = VCM.Param['Load Help Window Font']['Font Size'];
		this.contents.fontItalic = VCM.Param['Load Help Window Font'].Italic;
		this.contents.textColor = VCM.Param['Load Help Window Font']['Text Color'];
		this.contents.outlineColor = VCM.Param['Load Help Window Font']['Text Outline Color'];
		this.contents.outlineWidth = VCM.Param['Load Help Window Font']['Text Outline Width'];
		this.opacity = VCM.Param['Load Help Window Opacity'];
	}
	else if(SceneManager._scene instanceof Scene_GameEnd){
		this.contents.fontFace = $gameSystem._VCMHelpWindow['Game End Help Window Font'].Font;
		this.contents.fontSize = $gameSystem._VCMHelpWindow['Game End Help Window Font']['Font Size'];
		this.contents.fontItalic = $gameSystem._VCMHelpWindow['Game End Help Window Font'].Italic;
		this.contents.textColor = $gameSystem._VCMHelpWindow['Game End Help Window Font']['Text Color'];
		this.contents.outlineColor = $gameSystem._VCMHelpWindow['Game End Help Window Font']['Text Outline Color'];
		this.contents.outlineWidth = $gameSystem._VCMHelpWindow['Game End Help Window Font']['Text Outline Width'];
		this.opacity = $gameSystem._VCMHelpWindow['Game End Help Window Opacity'];
	}
	else if(SceneManager._scene instanceof Scene_Name){
		this.contents.fontFace = $gameSystem._VCMHelpWindow['Name Input Help Window Font'].Font;
		this.contents.fontSize = $gameSystem._VCMHelpWindow['Name Input Help Window Font']['Font Size'];
		this.contents.fontItalic = $gameSystem._VCMHelpWindow['Name Input Help Window Font'].Italic;
		this.contents.textColor = $gameSystem._VCMHelpWindow['Name Input Help Window Font']['Text Color'];
		this.contents.outlineColor = $gameSystem._VCMHelpWindow['Name Input Help Window Font']['Text Outline Color'];
		this.contents.outlineWidth = $gameSystem._VCMHelpWindow['Name Input Help Window Font']['Text Outline Width'];
		this.opacity = $gameSystem._VCMHelpWindow['Name Input Help Window Opacity'];
	}
	else if(SceneManager._scene instanceof Scene_Gameover){
		this.contents.fontFace = $gameSystem._VCMHelpWindow['Gameover Help Window Font'].Font;
		this.contents.fontSize = $gameSystem._VCMHelpWindow['Gameover Help Window Font']['Font Size'];
		this.contents.fontItalic = $gameSystem._VCMHelpWindow['Gameover Help Window Font'].Italic;
		this.contents.textColor = $gameSystem._VCMHelpWindow['Gameover Help Window Font']['Text Color'];
		this.contents.outlineColor = $gameSystem._VCMHelpWindow['Gameover Help Window Font']['Text Outline Color'];
		this.contents.outlineWidth = $gameSystem._VCMHelpWindow['Gameover Help Window Font']['Text Outline Width'];
		this.opacity = $gameSystem._VCMHelpWindow['Gameover Help Window Opacity'];
	}
	///
};

Window_Help.prototype.drawTextEx = function(text, x, y) {
    if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        ///this.resetFontSettings();
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        return textState.x - x;
    } else {
        return 0;
    }
};

Window_Help.prototype.updateTone = function() {
    ///var tone = $gameSystem.windowTone();
	var tone = $gameSystem._helpWindowTone || $dataSystem.windowTone;
    this.setTone(tone[0], tone[1], tone[2]);
};

VCM.HelpWindow.Window_Help_processNormalCharacter = Window_Help.prototype.processNormalCharacter;
Window_Help.prototype.processNormalCharacter = function(textState) {
	///
	if(VCM.Param['Help Window Wordwrapping']){
		if(textState.text[textState.index] === ' ' ? textState.x + this.textWidth(textState.text.substring(textState.index, textState.text.indexOf(' ', textState.index + 1) < 0 ?
		textState.text.length + 1 : textState.text.indexOf(' ', textState.index + 1))) > this.contents.width : false){
			return this.processNewLine(textState);
		}
	}
	///
    VCM.HelpWindow.Window_Help_processNormalCharacter.call(this, textState);
};

//-----------------------------------------------------------------------------
// Window_Command
//
// The superclass of windows for selecting a command.

Window_Command.prototype.initialize = function(x, y) {
    this.clearCommandList();
    this.makeCommandList();
    var width = this.windowWidth();
    var height = this.windowHeight();
	///
	this._helpWindowTextIndex = 0;
	///
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.select(0);
    this.activate();
};

///Window_Command.prototype.addCommand = function(name, symbol, enabled, ext) {
	Window_Command.prototype.addCommand = function(name, symbol, enabled, ext, description) {
    if (enabled === undefined) {
        enabled = true;
    }
    if (ext === undefined) {
        ext = null;
    }
	///
	if(description === undefined){
		description = '';
	}
	this._list.push({ name: name, symbol: symbol, enabled: enabled, ext: ext, description: description});
	this._helpWindowTextIndex++;
	///
    ///this._list.push({ name: name, symbol: symbol, enabled: enabled, ext: ext});
};

Window_Command.prototype.updateHelp = function() {
	///this._helpWindow.clear();
	this.setHelpWindowItem(this._list[this._index]);
};

//-----------------------------------------------------------------------------
// Scene_Boot
//
// The scene class for initializing the entire game.

VCM.HelpWindow.Scene_Boot_loadSystemWindowImage = Scene_Boot.prototype.loadSystemWindowImage;
Scene_Boot.prototype.loadSystemWindowImage = function() {
    VCM.HelpWindow.Scene_Boot_loadSystemWindowImage.call(this);
	///
	ImageManager.reserveSystem(VCM.Param['Title Help Window Windowskin']);
	///
};

//-----------------------------------------------------------------------------
// Window_TitleCommand
//
// The window for selecting New Game/Continue on the title screen.

Window_TitleCommand.prototype.makeCommandList = function() {
    ///this.addCommand(TextManager.newGame,   'newGame');
    ///this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
    ///this.addCommand(TextManager.options,   'options');
	this.addCommand(TextManager.newGame,   'newGame', true, null, VCM.Param['Title Help Window Text'][VCM.Param['Title Help Window Text'].length > 1 && this._helpWindowTextIndex < VCM.Param['Title Help Window Text'].length ?
	this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled(), null, VCM.Param['Title Help Window Text'][VCM.Param['Title Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < VCM.Param['Title Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.options,   'options', true, null, VCM.Param['Title Help Window Text'][VCM.Param['Title Help Window Text'].length > 1 && this._helpWindowTextIndex < VCM.Param['Title Help Window Text'].length ?
	this._helpWindowTextIndex : 0]);
};

//-----------------------------------------------------------------------------
// Scene_Title
//
// The scene class of the title screen.

VCM.HelpWindow.Scene_Title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
	///
	$gameSystem.initialize();
	///
    VCM.HelpWindow.Scene_Title_create.call(this);
	///
	if(VCM.Param['Title Help Window']){
		this._helpWindow = new Window_Help();
		this.addWindow(this._helpWindow);
		this._commandWindow.setHelpWindow(this._helpWindow);
	}
	///
};

VCM.HelpWindow.Scene_Title_commandContinue = Scene_Title.prototype.commandContinue;
Scene_Title.prototype.commandContinue = function() {
    VCM.HelpWindow.Scene_Title_commandContinue.call(this);
	///
	if(VCM.Param['Title Help Window']){
		this._helpWindow.visible = false;
	}
	///
};

VCM.HelpWindow.Scene_Title_commandOptions = Scene_Title.prototype.commandOptions;
Scene_Title.prototype.commandOptions = function() {
    VCM.HelpWindow.Scene_Title_commandOptions.call(this);
	///
	if(VCM.Param['Title Help Window']){
		this._helpWindow.visible = false;
	}
	///
};

//-----------------------------------------------------------------------------
// Window_ChoiceList
//
// The window used for the event command [Show Choices].

Window_ChoiceList.prototype.makeCommandList = function() {
    var choices = $gameMessage.choices();
    for (var i = 0; i < choices.length; i++) {
        ///this.addCommand(choices[i], 'choice');
		this.addCommand(choices[i], 'choice', true, null, $gameParty.inBattle() ? $gameSystem._VCMHelpWindow['Choice List Help Window Text (Battle)'][$gameSystem._VCMHelpWindow['Choice List Help Window Text (Battle)'].length > 1 
		&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Choice List Help Window Text (Battle)'].length ? this._helpWindowTextIndex : 0] 
		: $gameSystem._VCMHelpWindow['Choice List Help Window Text (Map)'][$gameSystem._VCMHelpWindow['Choice List Help Window Text (Map)'].length > 1 
		&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Choice List Help Window Text (Map)'].length ? this._helpWindowTextIndex : 0]);
    }
};

//-----------------------------------------------------------------------------
// Window_NumberInput
//
// The window used for the event command [Input Number].

Window_NumberInput.prototype.updateHelp = function() {
	///this._helpWindow.clear();
};

//-----------------------------------------------------------------------------
// Window_Message
//
// The window for displaying text messages.

VCM.HelpWindow.Window_Message_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
    VCM.HelpWindow.Window_Message_initialize.call(this);
	///
	this._helpWindow = null;
	///
};

VCM.HelpWindow.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	VCM.HelpWindow.Window_Message_startMessage.call(this);
	///
	if(($gameSystem._VCMHelpWindow['Message Help Window (Battle)'] && this._helpWindow && $gameParty.inBattle()) || ($gameSystem._VCMHelpWindow['Message Help Window (Map)'] && this._helpWindow && !$gameParty.inBattle())){
		this._helpWindow.visible = true;
		if(SceneManager._scene instanceof Scene_Map){
			this._helpWindow.x = $gameSystem._VCMHelpWindow['Message Help Window Position (Map)'].x;
			this._helpWindow.y = $gameSystem._VCMHelpWindow['Message Help Window Position (Map)'].y;
			this._helpWindow.width = $gameSystem._VCMHelpWindow['Message Help Window Position (Map)'].Width;
			this._helpWindow.height = $gameSystem._VCMHelpWindow['Message Help Window Position (Map)'].Height;
			this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
			this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Message Help Window Windowskin (Map)']);
			this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Message Help Window Opacity (Map)'];
			this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Message Help Window Font (Map)'].Font;
			this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Message Help Window Font (Map)']['Font Size'];
			this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Message Help Window Font (Map)'].Italic;
			this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Message Help Window Font (Map)']['Text Color'];
			this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Message Help Window Font (Map)']['Text Outline Color'];
			this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Message Help Window Font (Map)']['Text Outline Width'];
			this._helpWindow.refresh();
			this._helpWindow.setText($gameSystem._VCMHelpWindow['Message Help Window Text (Map)']);
		}
		else if(SceneManager._scene instanceof Scene_Battle){
			this._helpWindow.x = $gameSystem._VCMHelpWindow['Message Help Window Position (Battle)'].x;
			this._helpWindow.y = $gameSystem._VCMHelpWindow['Message Help Window Position (Battle)'].y;
			this._helpWindow.width = $gameSystem._VCMHelpWindow['Message Help Window Position (Battle)'].Width;
			this._helpWindow.height = $gameSystem._VCMHelpWindow['Message Help Window Position (Battle)'].Height;
			this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
			this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Message Help Window Windowskin (Battle)']);
			this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Message Help Window Opacity (Battle)'];
			this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Message Help Window Font (Battle)'].Font;
			this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Message Help Window Font (Battle)']['Font Size'];
			this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Message Help Window Font (Battle)'].Italic;
			this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Message Help Window Font (Battle)']['Text Color'];
			this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Message Help Window Font (Battle)']['Text Outline Color'];
			this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Message Help Window Font (Battle)']['Text Outline Width'];
			this._helpWindow.refresh();
			this._helpWindow.setText($gameSystem._VCMHelpWindow['Message Help Window Text (Battle)']);
		}
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

VCM.HelpWindow.Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    VCM.HelpWindow.Window_Message_terminateMessage.call(this);
	///
	if(!$gameSystem._VCMHelpWindow['Map Help Window'] && this._helpWindow && !$gameParty.inBattle()){
		this._helpWindow.visible = false;
	}
	else if(this._helpWindow && $gameSystem._VCMHelpWindow['Map Help Window']){
		this._helpWindow.visible = true;
		if(SceneManager._scene instanceof Scene_Map){
			this._helpWindow.x = $gameSystem._VCMHelpWindow['Map Help Window Position'].x;
			this._helpWindow.y = $gameSystem._VCMHelpWindow['Map Help Window Position'].y;
			this._helpWindow.width = $gameSystem._VCMHelpWindow['Map Help Window Position'].Width;
			this._helpWindow.height = $gameSystem._VCMHelpWindow['Map Help Window Position'].Height;
			this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
			this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Map Help Window Windowskin']);
			this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Map Help Window Opacity'];
			this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Map Help Window Font'].Font;
			this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Map Help Window Font']['Font Size'];
			this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Map Help Window Font'].Italic;
			this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Map Help Window Font']['Text Color'];
			this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Map Help Window Font']['Text Outline Color'];
			this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Map Help Window Font']['Text Outline Width'];
			this._helpWindow.refresh();
			this._helpWindow.setText($gameSystem._VCMHelpWindow['Map Help Window Text']);
		}
	}
	///
};

///
Window_Message.prototype.setHelpWindow = function(helpWindow) {
    this._helpWindow = helpWindow;
    this._helpWindow.clear();
};
///

Window_Message.prototype.startInput = function() {
    if ($gameMessage.isChoice()) {
        this._choiceWindow.start();
		///
		if((($gameSystem._VCMHelpWindow['Choice List Help Window (Map)'] && !$gameParty.inBattle()) || ($gameSystem._VCMHelpWindow['Choice List Help Window (Battle)'] && $gameParty.inBattle())) && this._helpWindow){
			this._helpWindow.visible = true;
			if(SceneManager._scene instanceof Scene_Map){
				this._helpWindow.x = $gameSystem._VCMHelpWindow['Choice List Help Window Position (Map)'].x;
				this._helpWindow.y = $gameSystem._VCMHelpWindow['Choice List Help Window Position (Map)'].y;
				this._helpWindow.width = $gameSystem._VCMHelpWindow['Choice List Help Window Position (Map)'].Width;
				this._helpWindow.height = $gameSystem._VCMHelpWindow['Choice List Help Window Position (Map)'].Height;
				this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
				this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Choice List Help Window Windowskin (Map)']);
				this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Choice List Help Window Opacity (Map)'];
				this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)'].Font;
				this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)']['Font Size'];
				this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)'].Italic;
				this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)']['Text Color'];
				this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)']['Text Outline Color'];
				this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Choice List Help Window Font (Map)']['Text Outline Width'];
				this._helpWindow.refresh();
			}
			else if(SceneManager._scene instanceof Scene_Battle){
				this._helpWindow.x = $gameSystem._VCMHelpWindow['Choice List Help Window Position (Battle)'].x;
				this._helpWindow.y = $gameSystem._VCMHelpWindow['Choice List Help Window Position (Battle)'].y;
				this._helpWindow.width = $gameSystem._VCMHelpWindow['Choice List Help Window Position (Battle)'].Width;
				this._helpWindow.height = $gameSystem._VCMHelpWindow['Choice List Help Window Position (Battle)'].Height;
				this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
				this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Choice List Help Window Windowskin (Battle)']);
				this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Choice List Help Window Opacity (Battle)'];
				this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Choice List Help Window Font (Battle)'].Font;
				this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Choice List Help Window Font (Battle)']['Font Size'];
				this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Choice List Help Window Font (Battle)'].Italic;
				this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Choice List Help Window Font (Battle)']['Text Color'];
				this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Choice List Help Window Font (Battle)']['Text Outline Color'];
				this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Choice List Help Window Font (Battle)']['Text Outline Width'];
				this._helpWindow.refresh();
			}
		}
		else if(this._helpWindow){
			this._helpWindow.visible = false;
		}
	///
        return true;
    } else if ($gameMessage.isNumberInput()) {
        this._numberWindow.start();
		///
		if((($gameSystem._VCMHelpWindow['Number Input Help Window (Map)'] && !$gameParty.inBattle()) || ($gameSystem._VCMHelpWindow['Number Input Help Window (Battle)'] && $gameParty.inBattle())) && this._helpWindow){
			this._helpWindow.visible = true;
			if(SceneManager._scene instanceof Scene_Map){
				this._helpWindow.x = $gameSystem._VCMHelpWindow['Number Input Help Window Position (Map)'].x;
				this._helpWindow.y = $gameSystem._VCMHelpWindow['Number Input Help Window Position (Map)'].y;
				this._helpWindow.width = $gameSystem._VCMHelpWindow['Number Input Help Window Position (Map)'].Width;
				this._helpWindow.height = $gameSystem._VCMHelpWindow['Number Input Help Window Position (Map)'].Height;
				this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
				this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Number Input Help Window Windowskin (Map)']);
				this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Number Input Help Window Opacity (Map)'];
				this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Number Input Help Window Font (Map)'].Font;
				this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Number Input Help Window Font (Map)']['Font Size'];
				this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Number Input Help Window Font (Map)'].Italic;
				this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Number Input Help Window Font (Map)']['Text Color'];
				this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Number Input Help Window Font (Map)']['Text Outline Color'];
				this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Number Input Help Window Font (Map)']['Text Outline Width'];
				this._helpWindow.refresh();
				this._helpWindow.setText($gameSystem._VCMHelpWindow['Number Input Help Window Text (Map)']);
			}
			else if(SceneManager._scene instanceof Scene_Battle){
				this._helpWindow.x = $gameSystem._VCMHelpWindow['Number Input Help Window Position (Battle)'].x;
				this._helpWindow.y = $gameSystem._VCMHelpWindow['Number Input Help Window Position (Battle)'].y;
				this._helpWindow.width = $gameSystem._VCMHelpWindow['Number Input Help Window Position (Battle)'].Width;
				this._helpWindow.height = $gameSystem._VCMHelpWindow['Number Input Help Window Position (Battle)'].Height;
				this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
				this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Number Input Help Window Windowskin (Battle)']);
				this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Number Input Help Window Opacity (Battle)'];
				this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Number Input Help Window Font (Battle)'].Font;
				this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Number Input Help Window Font (Battle)']['Font Size'];
				this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Number Input Help Window Font (Battle)'].Italic;
				this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Number Input Help Window Font (Battle)']['Text Color'];
				this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Number Input Help Window Font (Battle)']['Text Outline Color'];
				this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Number Input Help Window Font (Battle)']['Text Outline Width'];
				this._helpWindow.refresh();
			this._helpWindow.setText($gameSystem._VCMHelpWindow['Number Input Help Window Text (Battle)']);	
			}
		}
		else if(this._helpWindow){
			this._helpWindow.visible = false;
		}
	///
        return true;
    } else if ($gameMessage.isItemChoice()) {
        this._itemWindow.start();
		///
		if((($gameSystem._VCMHelpWindow['Select Item Help Window (Map)'] && !$gameParty.inBattle()) || ($gameSystem._VCMHelpWindow['Select Item Help Window (Battle)'] && $gameParty.inBattle())) && this._helpWindow){
			this._helpWindow.visible = true;
			if(SceneManager._scene instanceof Scene_Map){
				this._helpWindow.x = $gameSystem._VCMHelpWindow['Select Item Help Window Position (Map)'].x;
				this._helpWindow.y = $gameSystem._VCMHelpWindow['Select Item Help Window Position (Map)'].y;
				this._helpWindow.width = $gameSystem._VCMHelpWindow['Select Item Help Window Position (Map)'].Width;
				this._helpWindow.height = $gameSystem._VCMHelpWindow['Select Item Help Window Position (Map)'].Height;
				this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
				this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Select Item Help Window Windowskin (Map)']);
				this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Select Item Help Window Opacity (Map)'];
				this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Select Item Help Window Font (Map)'].Font;
				this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Select Item Help Window Font (Map)']['Font Size'];
				this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Select Item Help Window Font (Map)'].Italic;
				this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Select Item Help Window Font (Map)']['Text Color'];
				this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Select Item Help Window Font (Map)']['Text Outline Color'];
				this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Select Item Help Window Font (Map)']['Text Outline Width'];
				this._helpWindow.refresh();
			}
			else if(SceneManager._scene instanceof Scene_Battle){
				this._helpWindow.x = $gameSystem._VCMHelpWindow['Select Item Help Window Position (Battle)'].x;
				this._helpWindow.y = $gameSystem._VCMHelpWindow['Select Item Help Window Position (Battle)'].y;
				this._helpWindow.width = $gameSystem._VCMHelpWindow['Select Item Help Window Position (Battle)'].Width;
				this._helpWindow.height = $gameSystem._VCMHelpWindow['Select Item Help Window Position (Battle)'].Height;
				this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
				this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Select Item Help Window Windowskin (Battle)']);
				this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Select Item Help Window Opacity (Battle)'];
				this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Select Item Help Window Font (Battle)'].Font;
				this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Select Item Help Window Font (Battle)']['Font Size'];
				this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Select Item Help Window Font (Battle)'].Italic;
				this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Select Item Help Window Font (Battle)']['Text Color'];
				this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Select Item Help Window Font (Battle)']['Text Outline Color'];
				this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Select Item Help Window Font (Battle)']['Text Outline Width'];
				this._helpWindow.refresh();
			}
		}
		else if(this._helpWindow){
			this._helpWindow.visible = false;
		}
	///
        return true;
    } else {
        return false;
    }
};

//-----------------------------------------------------------------------------
// Window_ScrollText
//
// The window for displaying scrolling text. No frame is displayed, but it
// is handled as a window for convenience.

VCM.HelpWindow.Window_ScrollText_initialize = Window_ScrollText.prototype.initialize;
Window_ScrollText.prototype.initialize = function() {
    VCM.HelpWindow.Window_ScrollText_initialize.call(this);
	///
	this._helpWindow = null;
	///
};

VCM.HelpWindow.Window_ScrollText_startMessage = Window_ScrollText.prototype.startMessage;
Window_ScrollText.prototype.startMessage = function() {
    VCM.HelpWindow.Window_ScrollText_startMessage.call(this);
	///
	this._isWindow = false;
	if(($gameSystem._VCMHelpWindow['Scroll Text Help Window (Battle)'] && this._helpWindow && $gameParty.inBattle()) || ($gameSystem._VCMHelpWindow['Scroll Text Help Window (Map)'] && this._helpWindow && !$gameParty.inBattle())){
		this._helpWindow.visible = true;
		if(SceneManager._scene instanceof Scene_Map){
			this._helpWindow.x = $gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Map)'].x;
			this._helpWindow.y = $gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Map)'].y;
			this._helpWindow.width = $gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Map)'].Width;
			this._helpWindow.height = $gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Map)'].Height;
			this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
			this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Scroll Text Help Window Windowskin (Map)']);
			this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Scroll Text Help Window Opacity (Map)'];
			this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Map)'].Font;
			this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Map)']['Font Size'];
			this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Map)'].Italic;
			this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Map)']['Text Color'];
			this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Map)']['Text Outline Color'];
			this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Map)']['Text Outline Width'];
			this._helpWindow.refresh();
			this._helpWindow.setText($gameSystem._VCMHelpWindow['Scroll Text Help Window Text (Map)']);
		}
		else if(SceneManager._scene instanceof Scene_Battle){
			this._helpWindow.x = $gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Battle)'].x;
			this._helpWindow.y = $gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Battle)'].y;
			this._helpWindow.width = $gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Battle)'].Width;
			this._helpWindow.height = $gameSystem._VCMHelpWindow['Scroll Text Help Window Position (Battle)'].Height;
			this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
			this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Scroll Text Help Window Windowskin (Battle)']);
			this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Scroll Text Help Window Opacity (Battle)'];
			this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Battle)'].Font;
			this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Battle)']['Font Size'];
			this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Battle)'].Italic;
			this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Battle)']['Text Color'];
			this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Battle)']['Text Outline Color'];
			this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Scroll Text Help Window Font (Battle)']['Text Outline Width'];
			this._helpWindow.refresh();
			this._helpWindow.setText($gameSystem._VCMHelpWindow['Scroll Text Help Window Text (Battle)']);
		}
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

VCM.HelpWindow.Window_ScrollText_terminateMessage = Window_ScrollText.prototype.terminateMessage;
Window_ScrollText.prototype.terminateMessage = function() {
    VCM.HelpWindow.Window_ScrollText_terminateMessage.call(this);
	///
	if(!$gameSystem._VCMHelpWindow['Map Help Window'] && this._helpWindow && !$gameParty.inBattle()){
		this._helpWindow.visible = false;
	}
	else if(this._helpWindow && $gameSystem._VCMHelpWindow['Map Help Window']){
		this._helpWindow.visible = true;
		if(SceneManager._scene instanceof Scene_Map){
			this._helpWindow.x = $gameSystem._VCMHelpWindow['Map Help Window Position'].x;
			this._helpWindow.y = $gameSystem._VCMHelpWindow['Map Help Window Position'].y;
			this._helpWindow.width = $gameSystem._VCMHelpWindow['Map Help Window Position'].Width;
			this._helpWindow.height = $gameSystem._VCMHelpWindow['Map Help Window Position'].Height;
			this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
			this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Map Help Window Windowskin']);
			this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Map Help Window Opacity'];
			this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Map Help Window Font'].Font;
			this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Map Help Window Font']['Font Size'];
			this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Map Help Window Font'].Italic;
			this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Map Help Window Font']['Text Color'];
			this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Map Help Window Font']['Text Outline Color'];
			this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Map Help Window Font']['Text Outline Width'];
			this._helpWindow.refresh();
			this._helpWindow.setText($gameSystem._VCMHelpWindow['Map Help Window Text']);
		}
	}
	///
};

///
Window_ScrollText.prototype.setHelpWindow = function(helpWindow) {
    this._helpWindow = helpWindow;
    this._helpWindow.clear();
};
///

//-----------------------------------------------------------------------------
// Scene_Map
//
// The scene class of the map screen.

VCM.HelpWindow.Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	///
	if($gameSystem._VCMHelpWindow['Map Help Window']){
		this._helpWindow.visible = false;
	}
	///
    VCM.HelpWindow.Scene_Map_terminate.call(this);
};

VCM.HelpWindow.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	///
	this._helpWindow = new Window_Help();
    this.addWindow(this._helpWindow);
	if(!$gameSystem._VCMHelpWindow['Map Help Window']){
		this._helpWindow.visible = false;
	}
	this._helpWindow.setText($gameSystem._VCMHelpWindow['Map Help Window Text']);
	///
    VCM.HelpWindow.Scene_Map_createAllWindows.call(this);
};

VCM.HelpWindow.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    VCM.HelpWindow.Scene_Map_update.call(this);
	///
	if($gameSystem._updateMapHelpWindow && $gameSystem._VCMHelpWindow['Map Help Window']){
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Map Help Window Position'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Map Help Window Position'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Map Help Window Position'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Map Help Window Position'].Height;
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Map Help Window Windowskin']);
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Map Help Window Font'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Map Help Window Font']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Map Help Window Font'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Map Help Window Font']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Map Help Window Font']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Map Help Window Font']['Text Outline Width'];
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Map Help Window Opacity'];
		this._helpWindow.refresh();
		this._helpWindow.visible = true;
		$gameSystem._updateMapHelpWindow = false;
	}
	if(this.isActive() && !$gameMessage.isBusy()){
		this._helpWindow.setText($gameSystem._VCMHelpWindow['Map Help Window Text']);
	}
	///
};

VCM.HelpWindow.Scene_Map_createMessageWindow = Scene_Map.prototype.createMessageWindow;
Scene_Map.prototype.createMessageWindow = function() {
    VCM.HelpWindow.Scene_Map_createMessageWindow.call(this);
	///
    this._messageWindow.setHelpWindow(this._helpWindow);
	this._messageWindow._choiceWindow.setHelpWindow(this._helpWindow);
	this._messageWindow._numberWindow.setHelpWindow(this._helpWindow);
	this._messageWindow._itemWindow.setHelpWindow(this._helpWindow);
	///
};

VCM.HelpWindow.Scene_Map_createScrollTextWindow = Scene_Map.prototype.createScrollTextWindow;
Scene_Map.prototype.createScrollTextWindow = function() {
    VCM.HelpWindow.Scene_Map_createScrollTextWindow.call(this);
	///
    this._scrollTextWindow.setHelpWindow(this._helpWindow);
	///
};

//-----------------------------------------------------------------------------
// Window_MenuCommand
//
// The window for selecting a command on the menu screen.

VCM.HelpWindow.Window_MenuCommand_activate = Window_MenuCommand.prototype.activate;
Window_MenuCommand.prototype.activate = function() {
	VCM.HelpWindow.Window_MenuCommand_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Menu Help Window'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Menu Help Window Position'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Menu Help Window Position'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Menu Help Window Position'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Menu Help Window Position'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Menu Help Window Windowskin']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Menu Help Window Opacity'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Menu Help Window Font'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Menu Help Window Font']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Menu Help Window Font'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Menu Help Window Font']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Menu Help Window Font']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Menu Help Window Font']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

Window_MenuCommand.prototype.addMainCommands = function() {
    var enabled = this.areMainCommandsEnabled();
    if (this.needsCommand('item')) {
        ///this.addCommand(TextManager.item, 'item', enabled);
		this.addCommand(TextManager.item, 'item', enabled, null, $gameSystem._VCMHelpWindow['Menu Help Window Text'][$gameSystem._VCMHelpWindow['Menu Help Window Text'].length > 1 
		&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Menu Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    }
    if (this.needsCommand('skill')) {
        ///this.addCommand(TextManager.skill, 'skill', enabled);
		this.addCommand(TextManager.skill, 'skill', enabled, null, $gameSystem._VCMHelpWindow['Menu Help Window Text'][$gameSystem._VCMHelpWindow['Menu Help Window Text'].length > 1 
		&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Menu Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    }
    if (this.needsCommand('equip')) {
        ///this.addCommand(TextManager.equip, 'equip', enabled);
		this.addCommand(TextManager.equip, 'equip', enabled, null, $gameSystem._VCMHelpWindow['Menu Help Window Text'][$gameSystem._VCMHelpWindow['Menu Help Window Text'].length > 1 
		&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Menu Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    }
    if (this.needsCommand('status')) {
        ///this.addCommand(TextManager.status, 'status', enabled);
		this.addCommand(TextManager.status, 'status', enabled, null, $gameSystem._VCMHelpWindow['Menu Help Window Text'][$gameSystem._VCMHelpWindow['Menu Help Window Text'].length > 1 
		&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Menu Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    }
};

Window_MenuCommand.prototype.addFormationCommand = function() {
    if (this.needsCommand('formation')) {
        var enabled = this.isFormationEnabled();
        ///this.addCommand(TextManager.formation, 'formation', enabled);
		this.addCommand(TextManager.formation, 'formation', enabled, null, $gameSystem._VCMHelpWindow['Menu Help Window Text'][$gameSystem._VCMHelpWindow['Menu Help Window Text'].length > 1 
		&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Menu Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    }
};

Window_MenuCommand.prototype.addOptionsCommand = function() {
    if (this.needsCommand('options')) {
        var enabled = this.isOptionsEnabled();
        ///this.addCommand(TextManager.options, 'options', enabled);
		this.addCommand(TextManager.options, 'options', enabled, null, $gameSystem._VCMHelpWindow['Menu Help Window Text'][$gameSystem._VCMHelpWindow['Menu Help Window Text'].length > 1 
		&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Menu Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    }
};

Window_MenuCommand.prototype.addSaveCommand = function() {
    if (this.needsCommand('save')) {
        var enabled = this.isSaveEnabled();
        ///this.addCommand(TextManager.save, 'save', enabled);
		this.addCommand(TextManager.save, 'save', enabled, null, $gameSystem._VCMHelpWindow['Menu Help Window Text'][$gameSystem._VCMHelpWindow['Menu Help Window Text'].length > 1 
		&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Menu Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    }
};

Window_MenuCommand.prototype.addGameEndCommand = function() {
    var enabled = this.isGameEndEnabled();
    ///this.addCommand(TextManager.gameEnd, 'gameEnd', enabled);
	this.addCommand(TextManager.gameEnd, 'gameEnd', enabled, null, $gameSystem._VCMHelpWindow['Menu Help Window Text'][$gameSystem._VCMHelpWindow['Menu Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Menu Help Window Text'].length ? this._helpWindowTextIndex : 0]);
};

//-----------------------------------------------------------------------------
// Window_MenuStatus
//
// The window for displaying party member status on the menu screen.

VCM.HelpWindow.Window_MenuStatus_activate = Window_MenuStatus.prototype.activate;
Window_MenuStatus.prototype.activate = function() {
	VCM.HelpWindow.Window_MenuStatus_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Menu Status Help Window'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Menu Status Help Window Position'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Menu Status Help Window Position'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Menu Status Help Window Position'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Menu Status Help Window Position'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Menu Status Help Window Windowskin']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Menu Status Help Window Opacity'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Menu Status Help Window Font'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Menu Status Help Window Font']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Menu Status Help Window Font'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Menu Status Help Window Font']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Menu Status Help Window Font']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Menu Status Help Window Font']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

Window_MenuStatus.prototype.updateHelp = function() {
	///this._helpWindow.clear();
	if(this._index > -1){
		for(var i = 1; i < $dataActors.length; i++){
			if($dataActors[i].id === $gameParty.members()[this._index].actorId()){
				this._helpWindow.setText($gameSystem._VCMHelpWindow['Menu Status Help Window Text'][$gameSystem._VCMHelpWindow['Menu Status Help Window Text'].length > 1 
				&& i - 1 < $gameSystem._VCMHelpWindow['Menu Status Help Window Text'].length ? i - 1 : 0]);
				break;
			}
		}
	}
};

//-----------------------------------------------------------------------------
// Scene_Menu
//
// The scene class of the menu screen.

VCM.HelpWindow.Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    VCM.HelpWindow.Scene_Menu_create.call(this);
	///
	this._helpWindow = new Window_Help();
    this.addWindow(this._helpWindow);
	this._commandWindow.setHelpWindow(this._helpWindow);
	this._statusWindow.setHelpWindow(this._helpWindow);
	if(!$gameSystem._VCMHelpWindow['Menu Help Window']){
		this._helpWindow.visible = false;
	}
	this._commandWindow.activate();
	///
};

//-----------------------------------------------------------------------------
// Window_MenuActor
//
// The window for selecting a target actor on the item and skill screens.

VCM.HelpWindow.Window_MenuActor_activate = Window_MenuActor.prototype.activate;
Window_MenuActor.prototype.activate = function() {
	VCM.HelpWindow.Window_MenuActor_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Menu Actor Help Window'] && this._helpWindow && (SceneManager._scene instanceof Scene_Skill || SceneManager._scene instanceof Scene_Item)){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Menu Actor Help Window Position'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Menu Actor Help Window Position'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Menu Actor Help Window Position'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Menu Actor Help Window Position'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Menu Actor Help Window Windowskin']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Menu Actor Help Window Opacity'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Menu Actor Help Window Font'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Menu Actor Help Window Font']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Menu Actor Help Window Font'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Menu Actor Help Window Font']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Menu Actor Help Window Font']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Menu Actor Help Window Font']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

VCM.HelpWindow.Window_MenuActor_selectLast = Window_MenuActor.prototype.selectLast;
Window_MenuActor.prototype.selectLast = function() {
    VCM.HelpWindow.Window_MenuActor_selectLast.call(this);
	///
	if(this._index > -1){
		for(var i = 1; i < $dataActors.length; i++){
			if($dataActors[i].id === $gameParty.members()[this._index].actorId()){
				this._helpWindow.setText($gameSystem._VCMHelpWindow['Menu Actor Help Window Text'][$gameSystem._VCMHelpWindow['Menu Actor Help Window Text'].length > 1 && i - 1 < $gameSystem._VCMHelpWindow['Menu Actor Help Window Text'].length ? i - 1 : 0]);
				break;
			}
		}
	}
	///
};

Window_MenuActor.prototype.updateHelp = function() {
	///this._helpWindow.clear();
	if(this._index > -1){
		for(var i = 1; i < $dataActors.length; i++){
			if($dataActors[i].id === $gameParty.members()[this._index].actorId()){
				this._helpWindow.setText($gameSystem._VCMHelpWindow['Menu Actor Help Window Text'][$gameSystem._VCMHelpWindow['Menu Actor Help Window Text'].length > 1 && i - 1 < $gameSystem._VCMHelpWindow['Menu Actor Help Window Text'].length ? i - 1 : 0]);
				break;
			}
		}
	}
};

//-----------------------------------------------------------------------------
// Scene_ItemBase
//
// The superclass of Scene_Item and Scene_Skill.

VCM.HelpWindow.Scene_ItemBase_createActorWindow = Scene_ItemBase.prototype.createActorWindow;
Scene_ItemBase.prototype.createActorWindow = function() {
    VCM.HelpWindow.Scene_ItemBase_createActorWindow.call(this);
	///
	this._actorWindow.setHelpWindow(this._helpWindow);
	///
};

//-----------------------------------------------------------------------------
// Window_ItemCategory
//
// The window for selecting a category of items on the item and shop screens.

VCM.HelpWindow.Window_ItemCategory_activate = Window_ItemCategory.prototype.activate;
Window_ItemCategory.prototype.activate = function() {
	VCM.HelpWindow.Window_ItemCategory_activate.call(this);
	///
	if(($gameSystem._VCMHelpWindow['Item Category Help Window (Menu)'] || $gameSystem._VCMHelpWindow['Shop Item Category Help Window']) && this._helpWindow){
		this._helpWindow.visible = true;
		if(SceneManager._scene instanceof Scene_Item){
			this._helpWindow.x = $gameSystem._VCMHelpWindow['Item Category Help Window Position (Menu)'].x;
			this._helpWindow.y = $gameSystem._VCMHelpWindow['Item Category Help Window Position (Menu)'].y;
			this._helpWindow.width = $gameSystem._VCMHelpWindow['Item Category Help Window Position (Menu)'].Width;
			this._helpWindow.height = $gameSystem._VCMHelpWindow['Item Category Help Window Position (Menu)'].Height;
			this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
			this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Item Category Help Window Windowskin (Menu)']);
			this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Item Category Help Window Opacity (Menu)'];
			this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Item Category Help Window Font (Menu)'].Font;
			this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Item Category Help Window Font (Menu)']['Font Size'];
			this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Item Category Help Window Font (Menu)'].Italic;
			this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Item Category Help Window Font (Menu)']['Text Color'];
			this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Item Category Help Window Font (Menu)']['Text Outline Color'];
			this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Item Category Help Window Font (Menu)']['Text Outline Width'];
			this._helpWindow.refresh();
		}
		else if(SceneManager._scene instanceof Scene_Shop){
			this._helpWindow.x = $gameSystem._VCMHelpWindow['Shop Item Category Help Window Position'].x;
			this._helpWindow.y = $gameSystem._VCMHelpWindow['Shop Item Category Help Window Position'].y;
			this._helpWindow.width = $gameSystem._VCMHelpWindow['Shop Item Category Help Window Position'].Width;
			this._helpWindow.height = $gameSystem._VCMHelpWindow['Shop Item Category Help Window Position'].Height;
			this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
			this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Shop Item Category Help Window Windowskin']);
			this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Shop Item Category Help Window Opacity'];
			this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Shop Item Category Help Window Font'].Font;
			this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Shop Item Category Help Window Font']['Font Size'];
			this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Shop Item Category Help Window Font'].Italic;
			this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Shop Item Category Help Window Font']['Text Color'];
			this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Shop Item Category Help Window Font']['Text Outline Color'];
			this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Shop Item Category Help Window Font']['Text Outline Width'];
			this._helpWindow.refresh();
		}
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

Window_ItemCategory.prototype.makeCommandList = function() {
    ///this.addCommand(TextManager.item,    'item');
    ///this.addCommand(TextManager.weapon,  'weapon');
    ///this.addCommand(TextManager.armor,   'armor');
    ///this.addCommand(TextManager.keyItem, 'keyItem');
	this.addCommand(TextManager.item,    'item', true, null, SceneManager._scene instanceof Scene_Shop ? 
	$gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'][$gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'].length > 1 && this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'].length ?
	this._helpWindowTextIndex : 0] : $gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'][$gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.weapon,  'weapon', true, null, SceneManager._scene instanceof Scene_Shop ?
	$gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'][$gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'].length > 1 && this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'].length ?
	this._helpWindowTextIndex : 0] : $gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'][$gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.armor,   'armor', true, null, SceneManager._scene instanceof Scene_Shop ?
	$gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'][$gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'].length > 1 && this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'].length ?
	this._helpWindowTextIndex : 0] : $gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'][$gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.keyItem, 'keyItem', true, null, SceneManager._scene instanceof Scene_Shop ?
	$gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'][$gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'].length > 1 && this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Shop Item Category Help Window Text'].length ?
	this._helpWindowTextIndex : 0] : $gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'][$gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Item Category Help Window Text (Menu)'].length ? this._helpWindowTextIndex : 0]);
};

//-----------------------------------------------------------------------------
// Window_ItemList
//
// The window for selecting an item on the item screen.

VCM.HelpWindow.Window_ItemList_activate = Window_ItemList.prototype.activate;
Window_ItemList.prototype.activate = function() {
	VCM.HelpWindow.Window_ItemList_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Item List Help Window (Menu)'] && this._helpWindow){
		this._helpWindow.visible = true;
		if(SceneManager._scene instanceof Scene_Item){
			this._helpWindow.x = $gameSystem._VCMHelpWindow['Item List Help Window Position (Menu)'].x;
			this._helpWindow.y = $gameSystem._VCMHelpWindow['Item List Help Window Position (Menu)'].y;
			this._helpWindow.width = $gameSystem._VCMHelpWindow['Item List Help Window Position (Menu)'].Width;
			this._helpWindow.height = $gameSystem._VCMHelpWindow['Item List Help Window Position (Menu)'].Height;
			this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
			this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Item List Help Window Windowskin (Menu)']);
			this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Item List Help Window Opacity (Menu)'];
			this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Item List Help Window Font (Menu)'].Font;
			this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Item List Help Window Font (Menu)']['Font Size'];
			this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Item List Help Window Font (Menu)'].Italic;
			this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Item List Help Window Font (Menu)']['Text Color'];
			this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Item List Help Window Font (Menu)']['Text Outline Color'];
			this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Item List Help Window Font (Menu)']['Text Outline Width'];
			this._helpWindow.refresh();
		}
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

//-----------------------------------------------------------------------------
// Scene_Item
//
// The scene class of the item screen.

VCM.HelpWindow.Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
    VCM.HelpWindow.Scene_Item_create.call(this);
	///
	this.addWindow(this._helpWindow);
	this._categoryWindow.activate();
	///
};

VCM.HelpWindow.Scene_Item_createCategoryWindow = Scene_Item.prototype.createCategoryWindow;
Scene_Item.prototype.createCategoryWindow = function() {
    VCM.HelpWindow.Scene_Item_createCategoryWindow.call(this);
	///
	if(!$gameSystem._VCMHelpWindow['Item Category Help Window (Menu)']){
		this._helpWindow.visible = false;
	}
	///
};

Scene_Item.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help();
    ///this.addWindow(this._helpWindow);
};

//-----------------------------------------------------------------------------
// Window_SkillType
//
// The window for selecting a skill type on the skill screen.

VCM.HelpWindow.Window_SkillType_activate = Window_SkillType.prototype.activate;
Window_SkillType.prototype.activate = function() {
	VCM.HelpWindow.Window_SkillType_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Skill Type Help Window (Menu)'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Skill Type Help Window Position (Menu)'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Skill Type Help Window Position (Menu)'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Skill Type Help Window Position (Menu)'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Skill Type Help Window Position (Menu)'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Skill Type Help Window Windowskin (Menu)']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Skill Type Help Window Opacity (Menu)'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Skill Type Help Window Font (Menu)']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

Window_SkillType.prototype.makeCommandList = function() {
    if (this._actor) {
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function(a, b) {
            return a - b;
        });
        skillTypes.forEach(function(stypeId) {
            var name = $dataSystem.skillTypes[stypeId];
            ///this.addCommand(name, 'skill', true, stypeId);
			this.addCommand(name, 'skill', true, stypeId, $gameSystem._VCMHelpWindow['Skill Type Help Window Text (Menu)'][$gameSystem._VCMHelpWindow['Skill Type Help Window Text (Menu)'].length > 1 
			&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Skill Type Help Window Text (Menu)'].length ? this._helpWindowTextIndex : 0]);
        }, this);
    }
};

//-----------------------------------------------------------------------------
// Window_SkillList
//
// The window for selecting a skill on the skill screen.

VCM.HelpWindow.Window_SkillList_activate = Window_SkillList.prototype.activate;
Window_SkillList.prototype.activate = function() {
	VCM.HelpWindow.Window_SkillList_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Skill List Help Window (Menu)'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Skill List Help Window Position (Menu)'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Skill List Help Window Position (Menu)'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Skill List Help Window Position (Menu)'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Skill List Help Window Position (Menu)'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Skill List Help Window Windowskin (Menu)']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Skill List Help Window Opacity (Menu)'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Skill List Help Window Font (Menu)'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Skill List Help Window Font (Menu)']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Skill List Help Window Font (Menu)'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Skill List Help Window Font (Menu)']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Skill List Help Window Font (Menu)']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Skill List Help Window Font (Menu)']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

//-----------------------------------------------------------------------------
// Scene_Skill
//
// The scene class of the skill screen.

VCM.HelpWindow.Scene_Skill_start = Scene_Skill.prototype.start;
Scene_Skill.prototype.start = function() {
    VCM.HelpWindow.Scene_Skill_start.call(this);
	///
	this.addWindow(this._helpWindow);
	this._skillTypeWindow.setHelpWindow(this._helpWindow);
	this._skillTypeWindow.activate();
	///
};

VCM.HelpWindow.Scene_Skill_createSkillTypeWindow = Scene_Skill.prototype.createSkillTypeWindow;
Scene_Skill.prototype.createSkillTypeWindow = function() {
    var wy = this._helpWindow.height;
    this._skillTypeWindow = new Window_SkillType(0, wy);
    ///this._skillTypeWindow.setHelpWindow(this._helpWindow);
	///
	if(!$gameSystem._VCMHelpWindow['Skill Type Help Window (Menu)']){
		this._helpWindow.visible = false;
	}
	///
    this._skillTypeWindow.setHandler('skill',    this.commandSkill.bind(this));
    this._skillTypeWindow.setHandler('cancel',   this.popScene.bind(this));
    this._skillTypeWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._skillTypeWindow.setHandler('pageup',   this.previousActor.bind(this));
    this.addWindow(this._skillTypeWindow);
};

Scene_Skill.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help();
    ///this.addWindow(this._helpWindow);
};

//-----------------------------------------------------------------------------
// Window_EquipCommand
//
// The window for selecting a command on the equipment screen.

VCM.HelpWindow.Window_EquipCommand_activate = Window_EquipCommand.prototype.activate;
Window_EquipCommand.prototype.activate = function() {
	VCM.HelpWindow.Window_EquipCommand_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Equip Command Help Window (Menu)'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Equip Command Help Window Position (Menu)'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Equip Command Help Window Position (Menu)'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Equip Command Help Window Position (Menu)'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Equip Command Help Window Position (Menu)'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Equip Command Help Window Windowskin (Menu)']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Equip Command Help Window Opacity (Menu)'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Equip Command Help Window Font (Menu)'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Equip Command Help Window Font (Menu)']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Equip Command Help Window Font (Menu)'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Equip Command Help Window Font (Menu)']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Equip Command Help Window Font (Menu)']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Equip Command Help Window Font (Menu)']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

Window_EquipCommand.prototype.makeCommandList = function() {
    ///this.addCommand(TextManager.equip2,   'equip');
    ///this.addCommand(TextManager.optimize, 'optimize');
    ///this.addCommand(TextManager.clear,    'clear');
	this.addCommand(TextManager.equip2,   'equip', true, null, $gameSystem._VCMHelpWindow['Equip Command Help Window Text (Menu)'][$gameSystem._VCMHelpWindow['Equip Command Help Window Text (Menu)'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Equip Command Help Window Text (Menu)'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.optimize, 'optimize', true, null, $gameSystem._VCMHelpWindow['Equip Command Help Window Text (Menu)'][$gameSystem._VCMHelpWindow['Equip Command Help Window Text (Menu)'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Equip Command Help Window Text (Menu)'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.clear,    'clear', true, null, $gameSystem._VCMHelpWindow['Equip Command Help Window Text (Menu)'][$gameSystem._VCMHelpWindow['Equip Command Help Window Text (Menu)'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Equip Command Help Window Text (Menu)'].length ? this._helpWindowTextIndex : 0]);
};

//-----------------------------------------------------------------------------
// Window_EquipSlot
//
// The window for selecting an equipment slot on the equipment screen.

VCM.HelpWindow.Window_EquipSlot_activate = Window_EquipSlot.prototype.activate;
Window_EquipSlot.prototype.activate = function() {
	VCM.HelpWindow.Window_EquipSlot_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Equip Slot Help Window (Menu)'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Equip Slot Help Window Position (Menu)'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Equip Slot Help Window Position (Menu)'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Equip Slot Help Window Position (Menu)'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Equip Slot Help Window Position (Menu)'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Equip Slot Help Window Windowskin (Menu)']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Equip Slot Help Window Opacity (Menu)'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Equip Slot Help Window Font (Menu)'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Equip Slot Help Window Font (Menu)']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Equip Slot Help Window Font (Menu)'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Equip Slot Help Window Font (Menu)']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Equip Slot Help Window Font (Menu)']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Equip Slot Help Window Font (Menu)']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

//-----------------------------------------------------------------------------
// Window_EquipItem
//
// The window for selecting an equipment item on the equipment screen.

VCM.HelpWindow.Window_EquipItem_activate = Window_EquipItem.prototype.activate;
Window_EquipItem.prototype.activate = function() {
	VCM.HelpWindow.Window_EquipItem_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Equip List Help Window (Menu)'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Equip List Help Window Position (Menu)'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Equip List Help Window Position (Menu)'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Equip List Help Window Position (Menu)'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Equip List Help Window Position (Menu)'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Equip List Help Window Windowskin (Menu)']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Equip List Help Window Opacity (Menu)'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Equip List Help Window Font (Menu)'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Equip List Help Window Font (Menu)']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Equip List Help Window Font (Menu)'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Equip List Help Window Font (Menu)']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Equip List Help Window Font (Menu)']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Equip List Help Window Font (Menu)']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

//-----------------------------------------------------------------------------
// Scene_Equip
//
// The scene class of the equipment screen.

VCM.HelpWindow.Scene_Equip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function() {
    VCM.HelpWindow.Scene_Equip_create.call(this);
	///
	if(!$gameSystem._VCMHelpWindow['Equip Command Help Window (Menu)']){
		this._helpWindow.visible = false;
	}
	this._commandWindow.activate();
	///
};

Scene_Equip.prototype.commandEquip = function() {
    ///this._slotWindow.activate();
    this._slotWindow.select(0);
	///
	this._slotWindow.activate();
	///
};

Scene_Equip.prototype.onSlotOk = function() {
    ///this._itemWindow.activate();
    this._itemWindow.select(0);
	///
	this._itemWindow.activate();
	///
};

//-----------------------------------------------------------------------------
// Scene_Status
//
// The scene class of the status screen.

VCM.HelpWindow.Scene_Status_create = Scene_Status.prototype.create;
Scene_Status.prototype.create = function() {
    VCM.HelpWindow.Scene_Status_create.call(this);
	///
	if($gameSystem._VCMHelpWindow['Status Help Window']){
		this._helpWindow = new Window_Help();
		this.addWindow(this._helpWindow);
		this._helpWindow.setText($gameSystem._VCMHelpWindow['Status Help Window Text'][$gameSystem._VCMHelpWindow['Status Help Window Text'].length > 1 && this._actor.actorId() - 1 < $gameSystem._VCMHelpWindow['Status Help Window Text'].length ?
		this._actor.actorId() - 1 : 0]);
	}
	///
};

//-----------------------------------------------------------------------------
// Window_Options
//
// The window for changing various settings on the options screen.

Window_Options.prototype.addGeneralOptions = function() {
    ///this.addCommand(TextManager.alwaysDash, 'alwaysDash');
    ///this.addCommand(TextManager.commandRemember, 'commandRemember');
	this.addCommand(TextManager.alwaysDash, 'alwaysDash', true, null, VCM.Param['Options Help Window Text'][VCM.Param['Options Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < VCM.Param['Options Help Window Text'].length ? this._helpWindowTextIndex : 0]);
	this.addCommand(TextManager.commandRemember, 'commandRemember', true, null, VCM.Param['Options Help Window Text'][VCM.Param['Options Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < VCM.Param['Options Help Window Text'].length ? this._helpWindowTextIndex : 0]);
};

Window_Options.prototype.addVolumeOptions = function() {
    ///this.addCommand(TextManager.bgmVolume, 'bgmVolume');
    ///this.addCommand(TextManager.bgsVolume, 'bgsVolume');
    ///this.addCommand(TextManager.meVolume, 'meVolume');
    ///this.addCommand(TextManager.seVolume, 'seVolume');
	this.addCommand(TextManager.bgmVolume, 'bgmVolume', true, null, VCM.Param['Options Help Window Text'][VCM.Param['Options Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < VCM.Param['Options Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.bgsVolume, 'bgsVolume', true, null, VCM.Param['Options Help Window Text'][VCM.Param['Options Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < VCM.Param['Options Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.meVolume, 'meVolume', true, null, VCM.Param['Options Help Window Text'][VCM.Param['Options Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < VCM.Param['Options Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.seVolume, 'seVolume', true, null, VCM.Param['Options Help Window Text'][VCM.Param['Options Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < VCM.Param['Options Help Window Text'].length ? this._helpWindowTextIndex : 0]);
};

//-----------------------------------------------------------------------------
// Scene_Options
//
// The scene class of the options screen.

VCM.HelpWindow.Scene_Options_create = Scene_Options.prototype.create;
Scene_Options.prototype.create = function() {
    VCM.HelpWindow.Scene_Options_create.call(this);
	///
	if(VCM.Param['Options Help Window']){
		this._helpWindow = new Window_Help();
		this._optionsWindow.setHelpWindow(this._helpWindow);
		this.addWindow(this._helpWindow);
	}
	///
};

//-----------------------------------------------------------------------------
// Window_SavefileList
//
// The window for selecting a save file on the save and load screens.

Window_SavefileList.prototype.updateHelp = function() {
	///this._helpWindow.clear();
	if(this._mode === 'save'){
		this._helpWindow.setText($gameSystem._VCMHelpWindow['Save Help Window Text'][$gameSystem._VCMHelpWindow['Save Help Window Text'].length > 1 && this._index < $gameSystem._VCMHelpWindow['Save Help Window Text'].length ? this._index : 0]);
	}
	else{
		this._helpWindow.setText(VCM.Param['Load Help Window Text'][VCM.Param['Load Help Window Text'].length > 1 && this._index < VCM.Param['Load Help Window Text'].length ? this._index : 0]);
	}
};

//-----------------------------------------------------------------------------
// Scene_File
//
// The superclass of Scene_Save and Scene_Load.

VCM.HelpWindow.Scene_File_create = Scene_File.prototype.create;
Scene_File.prototype.create = function() {
    VCM.HelpWindow.Scene_File_create.call(this);
	///
	if(!VCM.Param['Load Help Window'] && this.mode() === 'load'){
		this._helpWindow.visible = false;
	}
	if(this.mode() === 'save'){
		if(!$gameSystem._VCMHelpWindow['Save Help Window']){
			this._helpWindow.visible = false;	
		}
	}
	this._listWindow.setHelpWindow(this._helpWindow);
	///
};

Scene_File.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help(1);
    ///this._helpWindow.setText(this.helpWindowText());
    this.addWindow(this._helpWindow);
};

//-----------------------------------------------------------------------------
// Window_GameEnd
//
// The window for selecting "Go to Title" on the game end screen.

Window_GameEnd.prototype.makeCommandList = function() {
    ///this.addCommand(TextManager.toTitle, 'toTitle');
    ///this.addCommand(TextManager.cancel,  'cancel');
	this.addCommand(TextManager.toTitle, 'toTitle', true, null, $gameSystem._VCMHelpWindow['Game End Help Window Text'][$gameSystem._VCMHelpWindow['Game End Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Game End Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.cancel,  'cancel', true, null, $gameSystem._VCMHelpWindow['Game End Help Window Text'][$gameSystem._VCMHelpWindow['Game End Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Game End Help Window Text'].length ? this._helpWindowTextIndex : 0]);
};

//-----------------------------------------------------------------------------
// Scene_GameEnd
//
// The scene class of the game end screen.

VCM.HelpWindow.Scene_GameEnd_create = Scene_GameEnd.prototype.create;
Scene_GameEnd.prototype.create = function() {
    VCM.HelpWindow.Scene_GameEnd_create.call(this);
	///
	if($gameSystem._VCMHelpWindow['Game End Help Window']){
		this._helpWindow = new Window_Help();
		this._commandWindow.setHelpWindow(this._helpWindow);
		this.addWindow(this._helpWindow);
	}
	///
};

//-----------------------------------------------------------------------------
// Window_ShopCommand
//
// The window for selecting buy/sell on the shop screen.

VCM.HelpWindow.Window_ShopCommand_activate = Window_ShopCommand.prototype.activate;
Window_ShopCommand.prototype.activate = function() {
	VCM.HelpWindow.Window_ShopCommand_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Shop Command Help Window'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Shop Command Help Window Position'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Shop Command Help Window Position'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Shop Command Help Window Position'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Shop Command Help Window Position'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Shop Command Help Window Windowskin']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Shop Command Help Window Opacity'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Shop Command Help Window Font'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Shop Command Help Window Font']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Shop Command Help Window Font'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Shop Command Help Window Font']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Shop Command Help Window Font']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Shop Command Help Window Font']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

Window_ShopCommand.prototype.makeCommandList = function() {
    ///this.addCommand(TextManager.buy,    'buy');
    ///this.addCommand(TextManager.sell,   'sell',   !this._purchaseOnly);
    ///this.addCommand(TextManager.cancel, 'cancel');
	this.addCommand(TextManager.buy,    'buy', true, null, $gameSystem._VCMHelpWindow['Shop Command Help Window Text'][$gameSystem._VCMHelpWindow['Shop Command Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Shop Command Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.sell,   'sell',   !this._purchaseOnly, null, $gameSystem._VCMHelpWindow['Shop Command Help Window Text'][$gameSystem._VCMHelpWindow['Shop Command Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Shop Command Help Window Text'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.cancel, 'cancel', true, null, $gameSystem._VCMHelpWindow['Shop Command Help Window Text'][$gameSystem._VCMHelpWindow['Shop Command Help Window Text'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Shop Command Help Window Text'].length ? this._helpWindowTextIndex : 0]);
};

//-----------------------------------------------------------------------------
// Window_ShopBuy
//
// The window for selecting an item to buy on the shop screen.

VCM.HelpWindow.Window_ShopBuy_activate = Window_ShopBuy.prototype.activate;
Window_ShopBuy.prototype.activate = function() {
	VCM.HelpWindow.Window_ShopBuy_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Shop Item List Help Window'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Shop Item List Help Window Position'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Shop Item List Help Window Position'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Shop Item List Help Window Position'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Shop Item List Help Window Position'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Shop Item List Help Window Windowskin']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Shop Item List Help Window Opacity'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Shop Item List Help Window Font'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Shop Item List Help Window Font']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Shop Item List Help Window Font'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Shop Item List Help Window Font']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Shop Item List Help Window Font']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Shop Item List Help Window Font']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

//-----------------------------------------------------------------------------
// Window_ShopSell
//
// The window for selecting an item to sell on the shop screen.

VCM.HelpWindow.Window_ShopSell_activate = Window_ShopSell.prototype.activate;
Window_ShopSell.prototype.activate = function() {
	VCM.HelpWindow.Window_ShopSell_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Shop Item List Help Window'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Shop Item List Help Window Position'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Shop Item List Help Window Position'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Shop Item List Help Window Position'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Shop Item List Help Window Position'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Shop Item List Help Window Windowskin']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Shop Item List Help Window Opacity'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Shop Item List Help Window Font'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Shop Item List Help Window Font']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Shop Item List Help Window Font'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Shop Item List Help Window Font']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Shop Item List Help Window Font']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Shop Item List Help Window Font']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

//-----------------------------------------------------------------------------
// Window_ShopNumber
//
// The window for inputting quantity of items to buy or sell on the shop
// screen.

VCM.HelpWindow.Window_ShopNumber_activate = Window_ShopNumber.prototype.activate;
Window_ShopNumber.prototype.activate = function() {
	VCM.HelpWindow.Window_ShopNumber_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Shop Item Number Help Window'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Shop Item Number Help Window Position'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Shop Item Number Help Window Position'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Shop Item Number Help Window Position'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Shop Item Number Help Window Position'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Shop Item Number Help Window Windowskin']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Shop Item Number Help Window Opacity'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Shop Item Number Help Window Font'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Shop Item Number Help Window Font']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Shop Item Number Help Window Font'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Shop Item Number Help Window Font']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Shop Item Number Help Window Font']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Shop Item Number Help Window Font']['Text Outline Width'];
		this._helpWindow.refresh();
		this._helpWindow.setText($gameSystem._VCMHelpWindow['Shop Item Number Help Window Text']);
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

//-----------------------------------------------------------------------------
// Scene_Shop
//
// The scene class of the shop screen.

VCM.HelpWindow.Scene_Shop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
    VCM.HelpWindow.Scene_Shop_create.call(this);
	///
	if(!$gameSystem._VCMHelpWindow['Shop Command Help Window']){
		this._helpWindow.visible = false;
	}
	this._commandWindow.activate();
	///
};

VCM.HelpWindow.Scene_Shop_createCommandWindow = Scene_Shop.prototype.createCommandWindow;
Scene_Shop.prototype.createCommandWindow = function() {
    VCM.HelpWindow.Scene_Shop_createCommandWindow.call(this);
	///
	this._commandWindow.setHelpWindow(this._helpWindow);
	///
};

VCM.HelpWindow.Scene_Shop_createNumberWindow = Scene_Shop.prototype.createNumberWindow;
Scene_Shop.prototype.createNumberWindow = function() {
    VCM.HelpWindow.Scene_Shop_createNumberWindow.call(this);
	///
	this._numberWindow.setHelpWindow(this._helpWindow);
	///
};

Scene_Shop.prototype.onBuyCancel = function() {
    this._commandWindow.activate();
    this._dummyWindow.show();
    this._buyWindow.hide();
    this._statusWindow.hide();
    this._statusWindow.setItem(null);
    ///this._helpWindow.clear();
};

Scene_Shop.prototype.onSellCancel = function() {
    this._sellWindow.deselect();
    this._categoryWindow.activate();
    this._statusWindow.setItem(null);
    ///this._helpWindow.clear();
};

//-----------------------------------------------------------------------------
// Scene_Name
//
// The scene class of the name input screen.

VCM.HelpWindow.Scene_Name_create = Scene_Name.prototype.create;
Scene_Name.prototype.create = function() {
    VCM.HelpWindow.Scene_Name_create.call(this);
	///
	if($gameSystem._VCMHelpWindow['Name Input Help Window']){
		this._helpWindow = new Window_Help();
		this.addWindow(this._helpWindow);
		this._helpWindow.setText($gameSystem._VCMHelpWindow['Name Input Help Window Text']);
	}
	///
};

//-----------------------------------------------------------------------------
// Window_BattleLog
//
// The window for displaying battle progress. No frame is displayed, but it is
// handled as a window for convenience.

VCM.HelpWindow.Window_BattleLog_addText = Window_BattleLog.prototype.addText;
Window_BattleLog.prototype.addText = function(text) {
    VCM.HelpWindow.Window_BattleLog_addText.call(this, text);
	///
	if($gameSystem._VCMHelpWindow['Log Help Window (Battle)'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Log Help Window Position (Battle)'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Log Help Window Position (Battle)'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Log Help Window Position (Battle)'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Log Help Window Position (Battle)'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Log Help Window Windowskin (Battle)']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Log Help Window Opacity (Battle)'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Log Help Window Font (Battle)'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Log Help Window Font (Battle)']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Log Help Window Font (Battle)'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Log Help Window Font (Battle)']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Log Help Window Font (Battle)']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Log Help Window Font (Battle)']['Text Outline Width'];
		this._helpWindow.refresh();
		this._helpWindow.setText($gameSystem._VCMHelpWindow['Log Help Window Text (Battle)']);
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

//-----------------------------------------------------------------------------
// Window_PartyCommand
//
// The window for selecting whether to fight or escape on the battle screen.

VCM.HelpWindow.Window_PartyCommand_activate = Window_PartyCommand.prototype.activate;
Window_PartyCommand.prototype.activate = function() {
	VCM.HelpWindow.Window_PartyCommand_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Party Command Help Window (Battle)'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Party Command Help Window Position (Battle)'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Party Command Help Window Position (Battle)'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Party Command Help Window Position (Battle)'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Party Command Help Window Position (Battle)'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Party Command Help Window Windowskin (Battle)']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Party Command Help Window Opacity (Battle)'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Party Command Help Window Font (Battle)'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Party Command Help Window Font (Battle)']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Party Command Help Window Font (Battle)'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Party Command Help Window Font (Battle)']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Party Command Help Window Font (Battle)']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Party Command Help Window Font (Battle)']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

Window_PartyCommand.prototype.makeCommandList = function() {
	///
	this._helpWindowTextIndex = 0;
	///
	///this.addCommand(TextManager.fight,  'fight');
    ///this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
    this.addCommand(TextManager.fight,  'fight', true, null, $gameSystem._VCMHelpWindow['Party Command Help Window Text (Battle)'][$gameSystem._VCMHelpWindow['Party Command Help Window Text (Battle)'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Party Command Help Window Text (Battle)'].length ? this._helpWindowTextIndex : 0]);
    this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape(), null, $gameSystem._VCMHelpWindow['Party Command Help Window Text (Battle)'][$gameSystem._VCMHelpWindow['Party Command Help Window Text (Battle)'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Party Command Help Window Text (Battle)'].length ? this._helpWindowTextIndex : 0]);
};

//-----------------------------------------------------------------------------
// Window_ActorCommand
//
// The window for selecting an actor's action on the battle screen.

VCM.HelpWindow.Window_ActorCommand_activate = Window_ActorCommand.prototype.activate;
Window_ActorCommand.prototype.activate = function() {
	VCM.HelpWindow.Window_ActorCommand_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Actor Command Help Window (Battle)'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Actor Command Help Window Position (Battle)'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Actor Command Help Window Position (Battle)'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Actor Command Help Window Position (Battle)'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Actor Command Help Window Position (Battle)'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Actor Command Help Window Windowskin (Battle)']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Actor Command Help Window Opacity (Battle)'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Actor Command Help Window Font (Battle)'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Actor Command Help Window Font (Battle)']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Actor Command Help Window Font (Battle)'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Actor Command Help Window Font (Battle)']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Actor Command Help Window Font (Battle)']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Actor Command Help Window Font (Battle)']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

VCM.HelpWindow.Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
	///
	if(this._actor){
		this._helpWindowTextIndex = 0;
	}
	///
    VCM.HelpWindow.Window_ActorCommand_makeCommandList.call(this);
};

Window_ActorCommand.prototype.addAttackCommand = function() {
	///this.addCommand(TextManager.attack, 'attack', this._actor.canAttack());
    this.addCommand(TextManager.attack, 'attack', this._actor.canAttack(), null, $gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'][$gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'].length ? this._helpWindowTextIndex : 0]);
};

Window_ActorCommand.prototype.addSkillCommands = function() {
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function(a, b) {
        return a - b;
    });
    skillTypes.forEach(function(stypeId) {
        var name = $dataSystem.skillTypes[stypeId];
		///this.addCommand(name, 'skill', true, stypeId);
        this.addCommand(name, 'skill', true, stypeId, $gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'][$gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'].length > 1 
		&& stypeId < $gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'].length ? stypeId : 0]);
    }, this);
	///
	this._helpWindowTextIndex += $dataSystem.skillTypes.length - skillTypes.length - 1;
	///
};

Window_ActorCommand.prototype.addGuardCommand = function() {
	///this.addCommand(TextManager.guard, 'guard', this._actor.canGuard());
    this.addCommand(TextManager.guard, 'guard', this._actor.canGuard(), null, $gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'][$gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'].length ? this._helpWindowTextIndex : 0]);
};

Window_ActorCommand.prototype.addItemCommand = function() {
    ///this.addCommand(TextManager.item, 'item');
	this.addCommand(TextManager.item, 'item', true, null, $gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'][$gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'].length > 1 
	&& this._helpWindowTextIndex < $gameSystem._VCMHelpWindow['Actor Command Help Window Text (Battle)'].length ? this._helpWindowTextIndex : 0]);
};

//-----------------------------------------------------------------------------
// Window_BattleActor
//
// The window for selecting a target actor on the battle screen.

VCM.HelpWindow.Window_BattleActor_activate = Window_BattleActor.prototype.activate;
Window_BattleActor.prototype.activate = function() {
	VCM.HelpWindow.Window_BattleActor_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Actor Help Window (Battle)'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Actor Help Window Position (Battle)'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Actor Help Window Position (Battle)'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Actor Help Window Position (Battle)'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Actor Help Window Position (Battle)'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Actor Help Window Windowskin (Battle)']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Actor Help Window Opacity (Battle)'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Actor Help Window Font (Battle)'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Actor Help Window Font (Battle)']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Actor Help Window Font (Battle)'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Actor Help Window Font (Battle)']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Actor Help Window Font (Battle)']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Actor Help Window Font (Battle)']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

Window_BattleActor.prototype.updateHelp = function() {
	///this._helpWindow.clear();
	$gameParty.select(this.actor());
	this._helpWindow.setText($gameSystem._VCMHelpWindow['Actor Help Window Text (Battle)'][$gameSystem._VCMHelpWindow['Actor Help Window Text (Battle)'].length > 1 && this._index < $gameSystem._VCMHelpWindow['Actor Help Window Text (Battle)'].length ? 
	this._index : 0]);
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//
// The window for selecting a target enemy on the battle screen.

VCM.HelpWindow.Window_BattleEnemy_activate = Window_BattleEnemy.prototype.activate;
Window_BattleEnemy.prototype.activate = function() {
	VCM.HelpWindow.Window_BattleEnemy_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Enemy Help Window (Battle)'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Enemy Help Window Position (Battle)'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Enemy Help Window Position (Battle)'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Enemy Help Window Position (Battle)'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Enemy Help Window Position (Battle)'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Enemy Help Window Windowskin (Battle)']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Enemy Help Window Opacity (Battle)'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Enemy Help Window Font (Battle)'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Enemy Help Window Font (Battle)']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Enemy Help Window Font (Battle)'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Enemy Help Window Font (Battle)']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Enemy Help Window Font (Battle)']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Enemy Help Window Font (Battle)']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

Window_BattleEnemy.prototype.updateHelp = function() {
	///this._helpWindow.clear();
	$gameTroop.select(this.enemy());
	this._helpWindow.setText($gameSystem._VCMHelpWindow['Enemy Help Window Text (Battle)'][$gameSystem._VCMHelpWindow['Enemy Help Window Text (Battle)'].length > 1 && this._index < $gameSystem._VCMHelpWindow['Enemy Help Window Text (Battle)'].length ? 
	this._index : 0]);
};

//-----------------------------------------------------------------------------
// Window_BattleSkill
//
// The window for selecting a skill to use on the battle screen.

VCM.HelpWindow.Window_BattleSkill_activate = Window_BattleSkill.prototype.activate;
Window_BattleSkill.prototype.activate = function() {
	VCM.HelpWindow.Window_BattleSkill_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Skill Help Window (Battle)'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Skill Help Window Position (Battle)'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Skill Help Window Position (Battle)'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Skill Help Window Position (Battle)'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Skill Help Window Position (Battle)'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Skill Help Window Windowskin (Battle)']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Skill Help Window Opacity (Battle)'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Skill Help Window Font (Battle)'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Skill Help Window Font (Battle)']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Skill Help Window Font (Battle)'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Skill Help Window Font (Battle)']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Skill Help Window Font (Battle)']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Skill Help Window Font (Battle)']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

//-----------------------------------------------------------------------------
// Window_BattleItem
//
// The window for selecting an item to use on the battle screen.

VCM.HelpWindow.Window_BattleItem_activate = Window_BattleItem.prototype.activate;
Window_BattleItem.prototype.activate = function() {
	VCM.HelpWindow.Window_BattleItem_activate.call(this);
	///
	if($gameSystem._VCMHelpWindow['Item Help Window (Battle)'] && this._helpWindow){
		this._helpWindow.visible = true;
		this._helpWindow.x = $gameSystem._VCMHelpWindow['Item Help Window Position (Battle)'].x;
		this._helpWindow.y = $gameSystem._VCMHelpWindow['Item Help Window Position (Battle)'].y;
		this._helpWindow.width = $gameSystem._VCMHelpWindow['Item Help Window Position (Battle)'].Width;
		this._helpWindow.height = $gameSystem._VCMHelpWindow['Item Help Window Position (Battle)'].Height;
		this._helpWindow.contents.resize(this._helpWindow.contentsWidth(), this._helpWindow.contentsHeight());
		this._helpWindow.windowskin = ImageManager.loadSystem($gameSystem._VCMHelpWindow['Item Help Window Windowskin (Battle)']);
		this._helpWindow.opacity = $gameSystem._VCMHelpWindow['Item Help Window Opacity (Battle)'];
		this._helpWindow.contents.fontFace = $gameSystem._VCMHelpWindow['Item Help Window Font (Battle)'].Font;
		this._helpWindow.contents.fontSize = $gameSystem._VCMHelpWindow['Item Help Window Font (Battle)']['Font Size'];
		this._helpWindow.contents.fontItalic = $gameSystem._VCMHelpWindow['Item Help Window Font (Battle)'].Italic;
		this._helpWindow.contents.textColor = $gameSystem._VCMHelpWindow['Item Help Window Font (Battle)']['Text Color'];
		this._helpWindow.contents.outlineColor = $gameSystem._VCMHelpWindow['Item Help Window Font (Battle)']['Text Outline Color'];
		this._helpWindow.contents.outlineWidth = $gameSystem._VCMHelpWindow['Item Help Window Font (Battle)']['Text Outline Width'];
		this._helpWindow.refresh();
	}
	else if(this._helpWindow){
		this._helpWindow.visible = false;
	}
	///
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.

VCM.HelpWindow.Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    VCM.HelpWindow.Scene_Battle_createDisplayObjects.call(this);
	///
    this._logWindow.setHelpWindow(this._helpWindow);
	this.addWindow(this._helpWindow);
	///
};

Scene_Battle.prototype.createAllWindows = function() {
    this.createLogWindow();
    this.createStatusWindow();
	this.createHelpWindow();
    this.createPartyCommandWindow();
    this.createActorCommandWindow();
    ///this.createHelpWindow();
    this.createSkillWindow();
    this.createItemWindow();
    this.createActorWindow();
    this.createEnemyWindow();
    this.createMessageWindow();
    this.createScrollTextWindow();
};

Scene_Battle.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help();
    this._helpWindow.visible = false;
    ///this.addWindow(this._helpWindow);
};

VCM.HelpWindow.Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
    VCM.HelpWindow.Scene_Battle_createPartyCommandWindow.call(this);
	///
    this._partyCommandWindow.setHelpWindow(this._helpWindow);
	///
};

VCM.HelpWindow.Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    VCM.HelpWindow.Scene_Battle_createActorCommandWindow.call(this);
	///
    this._actorCommandWindow.setHelpWindow(this._helpWindow);
	///
};

VCM.HelpWindow.Scene_Battle_createActorWindow = Scene_Battle.prototype.createActorWindow;	
Scene_Battle.prototype.createActorWindow = function() {
    VCM.HelpWindow.Scene_Battle_createActorWindow.call(this);
	///
    this._actorWindow.setHelpWindow(this._helpWindow);
	///
};

VCM.HelpWindow.Scene_Battle_createEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
Scene_Battle.prototype.createEnemyWindow = function() {
    VCM.HelpWindow.Scene_Battle_createEnemyWindow.call(this);
	///
    this._enemyWindow.setHelpWindow(this._helpWindow);
	///
};

VCM.HelpWindow.Scene_Battle_createMessageWindow = Scene_Battle.prototype.createMessageWindow;
Scene_Battle.prototype.createMessageWindow = function() {
    VCM.HelpWindow.Scene_Battle_createMessageWindow.call(this);
	///
    this._messageWindow.setHelpWindow(this._helpWindow);
	this._messageWindow._choiceWindow.setHelpWindow(this._helpWindow);
	this._messageWindow._numberWindow.setHelpWindow(this._helpWindow);
	this._messageWindow._itemWindow.setHelpWindow(this._helpWindow);
	///
};

VCM.HelpWindow.Scene_Battle_createScrollTextWindow = Scene_Battle.prototype.createScrollTextWindow;
Scene_Battle.prototype.createScrollTextWindow = function() {
    VCM.HelpWindow.Scene_Battle_createScrollTextWindow.call(this);
	///
    this._scrollTextWindow.setHelpWindow(this._helpWindow);
	///
};

//-----------------------------------------------------------------------------
// Scene_Gameover
//
// The scene class of the game over screen.

VCM.HelpWindow.Scene_Gameover_create = Scene_Gameover.prototype.create;
Scene_Gameover.prototype.create = function() {
    VCM.HelpWindow.Scene_Gameover_create.call(this);
	///
	if($gameSystem._VCMHelpWindow['Gameover Help Window']){
		this.createWindowLayer();
		this._helpWindow = new Window_Help();
		this.addWindow(this._helpWindow);
		this._helpWindow.setText($gameSystem._VCMHelpWindow['Gameover Help Window Text']);
	}
	///
};