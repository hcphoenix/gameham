/*:
-------------------------------------------------------------------------
@title Battle Command - Use Skill
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.3
@date Aug 2, 2020
@filename HIME_BattleCommandUseSkill.js
@url http://himeworks.com/2015/12/battle-command-use-skill/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.3 - Allows you to use a skill directly from the command menu
rather than going to the skill menu.
@help 
-------------------------------------------------------------------------------
== Description ==

This plugin allows you to add commands that allow your actors to use skills
directly without accessing the skill menu.

All of the skill use properties are the same: your actor must be able to
use the skill, have enough MP/TP/other requirements, and so on.

If enemy or actor selection is required, they will be processed as usual.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.3 - Aug 2, 2020
  * Fixed bug where canceling use_skill froze the game
1.2 - Feb 17, 2016
  * updated to new battle commands API
1.1 - Dec 21, 2015
  * fixed bug where extra data was not converted to number
1.0 - Dec 6, 2015
  * initial release
 
== Required ==

* Actor Battle Commands
  http://himeworks.com/2015/12/actor-battle-commands/
  
This plugin must be placed under Actor Battle Commands

== Usage ==

To add a "use skill" command to your actors, note-tag actors with

  <battle command: use_skill ID />
  
Where the ID is the ID of the skill that you want to use.
For example, if your Fire skill was ID 26 in the database, you
would write

  <battle command: use_skill 26 />
  
Please refer to the usage section for Actor Battle Commands to see what kind
of command management functionality is available.

-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.BattleCommandUseSkill = 1;
TH.BattleCommandUseSkill = TH.BattleCommandUseSkill || {};

(function ($) {

  TH.ActorBattleCommands.defaultBattlerCommands = function(obj) {
    var cmds = [
      //$.makeCommand("attack"),
      //TH.ActorBattleCommands.makeCommand("use_skill", 3),
      TH.ActorBattleCommands.makeCommand("skill_list"),
      //TH.ActorBattleCommands.makeCommand("guard"),
      TH.ActorBattleCommands.makeCommand("item"),
      TH.ActorBattleCommands.makeCommand("use_skill", 4),
      // Old individual escape
      // TH.ActorBattleCommands.makeCommand("use_skill", 5),
      // Old non common event escape
      // TH.ActorBattleCommands.makeCommand("escape")
      // Common event escape
      TH.ActorBattleCommands.makeCommand("use_skill", 6),
    ];
    return cmds;
  };
  /* Create command */
  TH.ActorBattleCommands.makeCommand_use_skill = function(symbol, ext) {
    ext = Math.floor(ext)
    var skill = $dataSkills[ext];
    return new Data_BattlerCommand(skill.name, symbol, ext);
  };
  
  /* Add the command to the list */
  Window_ActorCommand.prototype.addBattleCommand_use_skill = function(cmd) {
    var skill = $dataSkills[cmd.ext()]
    var enabled = cmd.isEnabled(this._actor) && this._actor.canUse(skill);
    
    // special case for move
    var name = cmd.name() !== "move" ? cmd.name() : (this._actor._row === 1 ? "FLY" : "LAND");
    if (!enabled) name = "Grounded";

    // case for escape 
    if (name == "FLEE") {
        let helpText = 'Everyone flees and each bird takes ' + GameHam.GetPursuitDamage() + ' damage.';
        Eli.HelpWindows.actorCmd().contents = Eli.HelpWindows.actorCmd().contents.filter(c => c.symbol != 'FLEE');
        Eli.HelpWindows.actorCmd().contents.push({
            text: helpText,
            symbol: 'FLEE',
            note: ''
        });
    }

    this.addCommand(name, cmd.symbol(), enabled, cmd.ext());
  };
  
  /* Add bindings for command window */
  var TH_SceneBattle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function() {
    TH_SceneBattle_createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler('use_skill', this.commandUseSkill.bind(this));
  };
  
  /* Handle the command selection */
  Scene_Battle.prototype.commandUseSkill = function() {
    var skill = $dataSkills[this._actorCommandWindow.currentExt()];
    var action = BattleManager.inputtingAction();
    action.setSkill(skill.id);
    BattleManager.actor().setLastBattleSkill(skill);
    this.onSelectAction();
  };
  
  var TH_SceneBattle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
  Scene_Battle.prototype.onEnemyCancel = function() {
    TH_SceneBattle_onEnemyCancel.call(this);
    switch (this._actorCommandWindow.currentSymbol()) {
    case 'use_skill':
        this._actorCommandWindow.activate();
        break;
    }
  }
  
  var TH_SceneBattle_onActorCancel = Scene_Battle.prototype.onActorCancel
  Scene_Battle.prototype.onActorCancel = function() {
    TH_SceneBattle_onActorCancel.call(this);
    switch (this._actorCommandWindow.currentSymbol()) {
    case 'use_skill':
        this._actorCommandWindow.activate();
        break;
    }
  }
})(TH.BattleCommandUseSkill);