//-----------------------------------------------------------------------------
// VCM Plugins - VCM_StateDescription
//-----------------------------------------------------------------------------


/*~struct~Position:
@param x
@desc State Help Window x Position
Default: 0
@default 0

@param y
@desc State Help Window y Position
Default: 0
@default 0

@param Width
@desc State Help Window Width
Default: 816
@default 816

@param Height
@desc State Help Window Height
Default: 108
@default 108
*/

/*~struct~ActorStatePosition:
@param x
@desc Actor Sprite State Icon x Position
Default: 0
@default 0

@param y
@desc Actor Sprite State Icon y Position
Default: Refer to code line 37
@default -this._mainSprite.height - Sprite_StateIcon._iconHeight / 2;
*/

/*~struct~EnemyStatePosition:
@param x
@desc Enemy Sprite State Icon x Position
Default: 0
@default 0

@param y
@desc Enemy Sprite State Icon y Position
Default: Refer to code line 49
@default if(-Math.round((this.bitmap.height + 40) * 0.9) < 20 - this.y){20 - this.y;}-Math.round((this.bitmap.height + 40) * 0.9);
*/

/*~struct~Font:
@param Font
@type text
@desc State Help Window Font
Default: GameFont
@default GameFont

@param Font Size
@type number
@min 0
@desc State Help Window Font Size
Default: 28
@default 28

@param Italic
@type boolean
@on Yes
@off No
@desc State Help Window Font is Italic?
Default: false
@default false

@param Text Color
@type text
@desc State Help Window Text Color
Default: #ffffff
@default #ffffff

@param Text Outline Color
@type text
@desc State Help Window Text Outline Color
Default: rgba(0, 0, 0, 0.5)
@default rgba(0, 0, 0, 0.5)

@param Text Outline Width
@type number
@desc State Help Window Text Outline Width
Default: 4
@default 4
*/


/*:
@plugindesc Shows a Help Window when the mouse is over the Sprite State Icons. Allows Actors to have Sprite State Icons. Help Window and Sprite State Icons are configurable.
@author VCM Plugins


@param 1 - State Description
@default

@param State Description List
@parent 1 - State Description
@type note[]
@desc Help Window Text for each State in Database.
Default: []
@default []

@param Buff Description List
@parent 1 - State Description
@type note[]
@desc Help Window Text for each parameter Buff/Debuff.
Default: []
@default []

@param State Description Wordwrapping
@parent 1 - State Description
@type boolean
@on Enabled
@off Disabled
@desc State Description Wordwrapping will be enabled?
Default: false
@default false


@param 2 - State Help Window

@param Only One Help Window Visible
@parent 2 - State Help Window
@type boolean
@on Yes
@off No
@desc State Help Window will be invisible if Help Window appear?
Default: true
@default true

@param State Help Window Position
@parent 2 - State Help Window
@type struct<Position>
@desc State Help Window Position Settings
Default: {"x":"0","y":"0","Width":"816","Height":"108"}
@default {"x":"0","y":"0","Width":"816","Height":"108"}

@param State Help Window Windowskin
@parent 2 - State Help Window
@type file
@dir img/system/
@require 1
@desc Windowskin of State Help Window.
Default: Window
@default Window

@param State Help Window Font
@parent 2 - State Help Window
@type struct<Font>
@desc State Help Window Font Settings
Default: Refer to code line 142
@default {"Font":"GameFont","Font Size":"28","Italic":"false","Text Color":"#ffffff","Text Outline Color":"rgba(0, 0, 0, 0.5)","Text Outline Width":"4"}

@param State Help Window Opacity
@parent 2 - State Help Window
@type number
@min 0
@max 255
@desc Opacity of State Help Window.
Default: 255
@default 255


@param 3 - State Icons

@param Battle Status Window Icons
@parent 3 - State Icons
@type boolean
@on Draw
@off Don't Draw
@desc Actor State Icons will be drawn in Window Battle Status?
Default: false
@default false

@param Actor Sprite State Icons
@parent 3 - State Icons
@type boolean
@on Yes
@off No
@desc Actors will have a Sprite State Icon like enemies do?
Default: true
@default true

@param Actor Sprite State Icons Position
@parent 3 - State Icons
@type struct<ActorStatePosition>
@desc Actor Sprite State Icons Position Settings
Default: Refer to code line 179
@default {"x":"0","y":"-this._mainSprite.height - Sprite_StateIcon._iconHeight / 2;"}

@param Enemy Sprite State Icons Position
@parent 3 - State Icons
@type struct<EnemyStatePosition>
@desc Enemy Sprite State Icons Position Settings
Default: Refer to code line 186
@default {"x":"0","y":"if(-Math.round((this.bitmap.height + 40) * 0.9) < 20 - this.y){20 - this.y;}-Math.round((this.bitmap.height + 40) * 0.9);"}

@param Sprite State Icons Animation Wait
@parent 3 - State Icons
@type number
@desc How much frames before Sprite State Icons change?
Default: 40
@default 40


@help
-----------------------------------------------------------------------------
Introduction
-----------------------------------------------------------------------------

Version -> 1.03

This plugin was tested only on RPG Maker MV Version 1.6.2.
I cannot guarantee it works on lower versions.

Terms of Use:
 - Available for commercial and non-commercial use
 - You may freely edit the code
 - You are not allowed to redistribute this plugin. Instead,
 provide a link(https://vcm-plugins.itch.io/vcm-statedescription)
 - Do not claim this plugin as your own
 - Credit is not required. However, if you want to, credit me as 'VCM Plugins'

This plugin shows a Help Window when the mouse is over the Sprite State Icons.
Icons aren't changed while you do so. Clicking them will force the icon
change. Allows Actors to have them, like enemies do. Help Window and Sprite
State Icons are configurable. Buffs/Debuffs are included. This plugin does
not affects other State Icons.

This documentation contains the following subheaders:
Introduction
Parameters Explanation
Compatibility
Versions


-----------------------------------------------------------------------------
Parameters Explanation
-----------------------------------------------------------------------------

State Description List
This parameter defines the text that will be shown in the State Help Window
when hovering over states. The order must be exactly the same as the
States Database. If you don't want to display a text, simply put '\' to
be allowed to edit more States. Any State Id higher than the number of entries
in this parameter will have no text. Entries that don't match any State Id
will be ignored, as well as States without Icons. If an Icon is used in more
than one State, only one entry will be used. Text codes, such as '\C[6]' and
'\n' may be used. This includes the ones in VCM_HelpWindow, if the plugin
is 'ON' and above this one in the Plugin Manager.

Buff Description List
This parameter defines the text that will be shown in the State Help Window.
The order must be exactly the same as the battler's parameters(Max HP, Max MP,
Attack, M.Attack, Defense, M.Defense, Agility and Luck). If you don't want
to display a text, simply put '\' to be allowed to edit more Buffs/Debuffs.
Any Buff/Debuff Parameter Id higher than the number of entries in this
parameter will have no text. Entries that don't match any Parameter Id will be
ignored, as well as Buffs/Debuffs without Icons. If an Icon is used in more
than one Buff or Debuff, only one entry will be used. Text codes, such as
'\C[6]' and '\n' may be used. This includes the ones in VCM_HelpWindow,
if the plugin is 'ON' and above this one in the Plugin Manager.

State Description Wordwrapping
This parameter enables/disables automatically break line whenever the
State Help Window Text Width is higher than the Help Window Width.
You can still break lines normally in the State Description List parameter.
This will not break line in the middle of words. For example,
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
will not activate the break line and if the Text Width is higher than the
State Help Window Width, the text will be cropped.

Only One Help Window Visible
This parameter defines whether the State Help Window will appear even when
the default Help Window is visible. Setting this value to No(false) will
not prevent the State Help Window of being overlapped or overlap other
windows.

State Help Window Position
This parameter determines the State Help Window x and y positions, as well
as its width and height. All values are evals. The higher the x value,
the farther it will be in the right. The higher the y value, the lower
it will be. If the x or y values are higher than the game screen's
width and height, respectively, it will not be visible.
If x + Width <= 0 or y + Height <= 0 or Width <= 0 or Height <= 0,
it will not appear.

State Help Window Windowskin
This parameter specifies which Windowskin you will use for the State
Help Window. The image should be a png file located in the img\system
folder. When setting the value textually, don't use the extension.
For example, Window or "Window", works fine, while Window.png or
"Window.png", don't. If the value is invalid, it may throw errors.
Using unsuitable files may have unexpected results. For example,
using "Shadow 1" as Windowskin probably will show no Window for being too
small.

State Help Window Font
This parameter determines the Font Settings for the State Help Window.
The parameter is an objects whose default value is
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

State Help Window Opacity
This parameter defines the opacity of the State Help Window. The value
should be a number between 0 and 255. Any value lower than 0 will be
converted to 0, and any value higher than 255 will become 255. The higher
the value, the more opaque is the window. With an opacity of 0, the window
will become transparent, but the text will still be visible. Putting values
textually that aren't numbers may throw errors.

Battle Status Window Icons
This parameter determines whether the default Actor State Icons in the
Battle Status Window will appear. Draw(true) will draw the icons, else,
nothing will be drawn.

Actor Sprite State Icons
This parameter specifies whether Actors will have Sprite State Icons, like
enemies do. Yes(true) will create them, No(false) will do nothing.

Actor Sprite State Icons Position
This parameter determines the Actor Sprite State Icons x and y positions,
starting from the actor's main sprite position.  Both values are evals.
The higher the x value, the farther it will be from the actor to the right.
The higher the y value, the lower it will be. Even if not in Sideview Battle,
the Actor Sprite State Icons positions will not change.

Enemy Sprite State Icons Position
This parameter determines the Enemy Sprite State Icons x and y positions,
starting from the enemy's sprite position.  Both values are evals.
The higher the x value, the farther it will be from the enemy to the right.
The higher the y value, the lower it will be.

Sprite State Icons Animation Wait
This parameter specifies how much frames it takes for the Sprite State Icons
change icons. 60 frames equals to 1 second. Values lower than 1 have the same
effect of 1. Non-number values may throw errors.


-----------------------------------------------------------------------------
Compatibility
-----------------------------------------------------------------------------

Plugin Manager line-up for maximum compatibility:
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

If using the VCM_HelpWindow plugin, put it above this plugin in your
Plugin Manager for maximum compatibility.

This plugin overwrites the following functions:
Sprite_Actor.prototype.updateVisibility(from Sprite_Battler)
Sprite_Actor.prototype.updateShadow
Sprite_Enemy.prototype.updateStateSprite
Sprite_StateIcon.prototype.update
Sprite_StateIcon.prototype.animationWait
Window_Help.prototype.drawTextEx(from Window_Base, compatible with VCM_HelpWindow)
Window_BattleStatus.prototype.drawBasicArea

This means that any plugins above it in the Plugin Manager will
have these functions overwritten. It is advisable to put plugins
that share these functions under this plugin, if possible
(unless you don't need that piece of code for your game).
This will not guarantee that the plugins will be compatible, however.

This plugin also uses the current code of the following functions:
TouchInput._onMouseMove
Sprite_Actor.prototype.initMembers
Sprite_Actor.prototype.setBattler
Sprite_Actor.prototype.update
Sprite_Enemy.prototype.update
Window_Help.prototype.processNormalCharacter(from Window_Base)
Scene_Battle.prototype.createHelpWindow

This means that this plugin will use any changes to those functions
made by plugins above it in the Plugin Manager, which may, or may not
be compatible.


-----------------------------------------------------------------------------
Versions
-----------------------------------------------------------------------------

Version -> 1.00
Released Plugin.

Version -> 1.01
Removed console logs. Updated documentation.

Version -> 1.02
Added compatibility with VCM_TermDescription. Updated documentation.

Version -> 1.03
Updated documentation.
*/

"use strict";

var Imported = Imported || {};
Imported.VCM_StateDescription = true;

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
VCM.StateDescription = VCM.StateDescription || {};
VCM.StateDescription = VCMConvert(PluginManager.parameters('VCM_StateDescription')) || {};
VCM.StateDescriptionAlias = VCM.StateDescriptionAlias || {};

VCM.StateDescription.Actor = null;
VCM.StateDescription.Enemy = null;


//-----------------------------------------------------------------------------
/**
 * The static class that handles input data from the mouse and touchscreen.
 * @class TouchInput
 */

VCM.StateDescriptionAlias.TouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
	VCM.StateDescriptionAlias.TouchInput_onMouseMove(this, event);
	///
	this._mouseHoverX = Graphics.pageToCanvasX(event.pageX);
	this._mouseHoverY = Graphics.pageToCanvasY(event.pageY);
	///
};

//-----------------------------------------------------------------------------
// Sprite_Actor
//
// The sprite for displaying an actor.

VCM.StateDescriptionAlias.Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
Sprite_Actor.prototype.initMembers = function() {
    VCM.StateDescriptionAlias.Sprite_Actor_initMembers.call(this);
	///
	if(VCM.StateDescription['Actor Sprite State Icons']){
		this.createStateIconSprite();
	}
	///
};

///
Sprite_Actor.prototype.createStateIconSprite = function() {
	if(VCM.StateDescription['Actor Sprite State Icons']){
		this._stateIconSprite = new Sprite_StateIcon();
		this.addChild(this._stateIconSprite);
	}
};
///

///
Sprite_Actor.prototype.updateStateSprite = function() {
	if(VCM.StateDescription['Actor Sprite State Icons']){
		this._stateIconSprite.x = eval(VCM.StateDescription['Actor Sprite State Icons Position'].x);
		this._stateIconSprite.y = eval(VCM.StateDescription['Actor Sprite State Icons Position'].y);
	}
};
///

Sprite_Actor.prototype.updateVisibility = function() {
    Sprite_Base.prototype.updateVisibility.call(this);
    if (!this._battler || !this._battler.isSpriteVisible()) {
        ///this.visible = false;
		///
		this._shadowSprite.visible = false;
		this._weaponSprite.visible = false;
		this._mainSprite.visible = false;
		this._stateSprite.visible = false;
		///
    }
};

VCM.StateDescriptionAlias.Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
Sprite_Actor.prototype.setBattler = function(battler) {
    VCM.StateDescriptionAlias.Sprite_Actor_setBattler.call(this, battler);
	///
	if(VCM.StateDescription['Actor Sprite State Icons'] && battler === this._actor){
		this._stateIconSprite.setup(battler);
	}
	///
};

VCM.StateDescriptionAlias.Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
    VCM.StateDescriptionAlias.Sprite_Actor_update.call(this);
	///
	if(this._actor && VCM.StateDescription['Actor Sprite State Icons']){
		this.updateStateSprite();
		if(this._actor.allIcons().length > 0 && SceneManager._scene._stateHelpWindow){
			if(!this._actor.isDead() && TouchInput._mouseHoverX > this._homeX + this._targetOffsetX + this._stateIconSprite.x - this._stateIconSprite.anchor.x * Sprite_StateIcon._iconWidth - 1
			&& TouchInput._mouseHoverX < this._homeX + this._targetOffsetX + this._stateIconSprite.x - this._stateIconSprite.anchor.x * Sprite_StateIcon._iconWidth + 1 + Sprite_StateIcon._iconWidth
			&& TouchInput._mouseHoverY > this._homeY + this._targetOffsetY + this._stateIconSprite.y - this._stateIconSprite.anchor.y * Sprite_StateIcon._iconHeight - 1
			&& TouchInput._mouseHoverY < this._homeY + this._targetOffsetY + this._stateIconSprite.y - this._stateIconSprite.anchor.y * Sprite_StateIcon._iconHeight + 1 + Sprite_StateIcon._iconHeight){
				if(!SceneManager._scene._stateHelpWindow.visible && VCM.StateDescription['Only One Help Window Visible'] ? !SceneManager._scene._helpWindow.visible : true && VCM.StateDescription.Actor === null){
					VCM.StateDescription.Actor = this._actor._actorId;
					SceneManager._scene._stateHelpWindow.visible = true;
					for(var i = 0; i < this._actor.allIcons().length; i++){
						if(i < this._actor._states.length){
							if($dataStates[this._actor._states[i]].iconIndex === this._stateIconSprite._iconIndex){
								SceneManager._scene._stateHelpWindow.setText(VCM.StateDescription['State Description List'][this._actor._states[i] - 1] ?
								VCM.StateDescription['State Description List'][this._actor._states[i] - 1] : '');
								break;
							}
						}
						else{
							if(this._actor.allIcons()[i] === this._stateIconSprite._iconIndex){
								for(var j = 0; j < this._actor._buffs.length; j++){
									if(this._actor.buffIconIndex(this._actor._buffs[j], j) === this._stateIconSprite._iconIndex){
										SceneManager._scene._stateHelpWindow.setText(VCM.StateDescription['Buff Description List'][j] ?
										VCM.StateDescription['Buff Description List'][j] : '');
										break;
										break;
									}
								}
							}
						}
					}
				}
				else if(SceneManager._scene._stateHelpWindow.visible && VCM.StateDescription.Actor === this._actor._actorId
				&& $dataStates[this._actor.allIcons()[this._stateIconSprite._animationIndex]] !== this._stateIconSprite._iconIndex){
					for(var i = 0; i < this._actor.allIcons().length; i++){
						if(i < this._actor._states.length){
							if($dataStates[this._actor._states[i]].iconIndex === this._stateIconSprite._iconIndex){
								SceneManager._scene._stateHelpWindow.setText(VCM.StateDescription['State Description List'][this._actor._states[i] - 1] ?
								VCM.StateDescription['State Description List'][this._actor._states[i] - 1] : '');
								break;
							}
						}
						else{
							if(this._actor.allIcons()[i] === this._stateIconSprite._iconIndex){
								for(var j = 0; j < this._actor._buffs.length; j++){
									if(this._actor.buffIconIndex(this._actor._buffs[j], j) === this._stateIconSprite._iconIndex){
										SceneManager._scene._stateHelpWindow.setText(VCM.StateDescription['Buff Description List'][j] ?
										VCM.StateDescription['Buff Description List'][j] : '');
										break;
										break;
									}
								}
							}
						}
					}
				}
			}
			else if((SceneManager._scene._stateHelpWindow.visible && VCM.StateDescription.Actor === this._actor._actorId) ||
			(VCM.StateDescription['Only One Help Window Visible'] ? SceneManager._scene._helpWindow.visible : false)){
				SceneManager._scene._stateHelpWindow.visible = false;
				VCM.StateDescription.Actor = null;
			}
		}
	}
	///
};

Sprite_Actor.prototype.updateShadow = function() {
    ///this._shadowSprite.visible = !!this._actor;
	///
	this._shadowSprite.visible = !!this._actor && this._battler.isSpriteVisible();
	///
};

//-----------------------------------------------------------------------------
// Sprite_Enemy
//
// The sprite for displaying an enemy.

VCM.StateDescriptionAlias.Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
    VCM.StateDescriptionAlias.Sprite_Enemy_update.call(this);
	///
	if(this._enemy && this._enemy.allIcons().length > 0 && SceneManager._scene._stateHelpWindow){
		if(!this._enemy.isDead() && TouchInput._mouseHoverX > this._enemy._screenX + this._stateIconSprite.x - this._stateIconSprite.anchor.x * Sprite_StateIcon._iconWidth - 1
		&& TouchInput._mouseHoverX < this._enemy._screenX + this._stateIconSprite.x - this._stateIconSprite.anchor.x * Sprite_StateIcon._iconWidth + 1 + Sprite_StateIcon._iconWidth
		&& TouchInput._mouseHoverY > this._enemy._screenY + this._stateIconSprite.y - this._stateIconSprite.anchor.y * Sprite_StateIcon._iconHeight - 1
		&& TouchInput._mouseHoverY < this._enemy._screenY + this._stateIconSprite.y - this._stateIconSprite.anchor.y * Sprite_StateIcon._iconHeight + 1 + Sprite_StateIcon._iconHeight){
			if(!SceneManager._scene._stateHelpWindow.visible && VCM.StateDescription['Only One Help Window Visible'] ? !SceneManager._scene._helpWindow.visible : true && VCM.StateDescription.Enemy === null){
				VCM.StateDescription.Enemy = this._enemy.index();
				SceneManager._scene._stateHelpWindow.visible = true;
				for(var i = 0; i < this._enemy.allIcons().length; i++){
					if(i < this._enemy._states.length){
						if($dataStates[this._enemy._states[i]].iconIndex === this._stateIconSprite._iconIndex){
							SceneManager._scene._stateHelpWindow.setText(VCM.StateDescription['State Description List'][this._enemy._states[i] - 1] ?
							VCM.StateDescription['State Description List'][this._enemy._states[i] - 1] : '');
							break;
						}
					}
					else{
						if(this._enemy.allIcons()[i] === this._stateIconSprite._iconIndex){
							for(var j = 0; j < this._enemy._buffs.length; j++){
								if(this._enemy.buffIconIndex(this._enemy._buffs[j], j) === this._stateIconSprite._iconIndex){
									SceneManager._scene._stateHelpWindow.setText(VCM.StateDescription['Buff Description List'][j] ?
									VCM.StateDescription['Buff Description List'][j] : '');
									break;
									break;
								}
							}
						}
					}
				}
			}
			else if(SceneManager._scene._stateHelpWindow.visible && VCM.StateDescription.Enemy === this._enemy.index()
				&& $dataStates[this._enemy.allIcons()[this._stateIconSprite._animationIndex]] !== this._stateIconSprite._iconIndex){
				for(var i = 0; i < this._enemy.allIcons().length; i++){
					if(i < this._enemy._states.length){
						if($dataStates[this._enemy._states[i]].iconIndex === this._stateIconSprite._iconIndex){
							SceneManager._scene._stateHelpWindow.setText(VCM.StateDescription['State Description List'][this._enemy._states[i] - 1] ?
							VCM.StateDescription['State Description List'][this._enemy._states[i] - 1] : '');
							break;
						}
					}
					else{
						if(this._enemy.allIcons()[i] === this._stateIconSprite._iconIndex){
							for(var j = 0; j < this._enemy._buffs.length; j++){
								if(this._enemy.buffIconIndex(this._enemy._buffs[j], j) === this._stateIconSprite._iconIndex){
									SceneManager._scene._stateHelpWindow.setText(VCM.StateDescription['Buff Description List'][j] ?
									VCM.StateDescription['Buff Description List'][j] : '');
									break;
									break;
								}
							}
						}
					}
				}
			}
		}
		else if((SceneManager._scene._stateHelpWindow.visible && VCM.StateDescription.Enemy === this._enemy.index()) || (VCM.StateDescription['Only One Help Window Visible'] ? SceneManager._scene._helpWindow.visible : false)){
			SceneManager._scene._stateHelpWindow.visible = false;
			VCM.StateDescription.Enemy = null;
		}
	}
	///
};

Sprite_Enemy.prototype.updateStateSprite = function() {
    ///this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);
    ///if (this._stateIconSprite.y < 20 - this.y) {
    ///    this._stateIconSprite.y = 20 - this.y;
    ///}
	///
	this._stateIconSprite.x = eval(VCM.StateDescription['Enemy Sprite State Icons Position'].x);
	this._stateIconSprite.y = eval(VCM.StateDescription['Enemy Sprite State Icons Position'].y);
	///
};

//-----------------------------------------------------------------------------
// Sprite_StateIcon
//
// The sprite for displaying state icons.

Sprite_StateIcon.prototype.update = function() {
    Sprite.prototype.update.call(this);
	this._animationCount++;
	///
	if(this._battler){
		if(TouchInput.isReleased()  && this._battler.allIcons().length > 0
		&& ((this._battler.isActor() && VCM.StateDescription.Actor === this._battler._actorId) || (!this._battler.isActor() && VCM.StateDescription.Enemy === this._battler.index()))){
			this._animationCount = this.animationWait() + 0.5;
		}
	}
	///
    if (this._animationCount >= this.animationWait()) {
	///
		if(this._battler){
			if(this._animationCount === this.animationWait() + 0.5
			|| ((this._battler.isActor() && VCM.StateDescription.Actor !== this._battler._actorId) || (!this._battler.isActor() && VCM.StateDescription.Enemy !== this._battler.index()))){
			///
				this.updateIcon();
				this.updateFrame();
				this._animationCount = 0;
			///
			}
		}
		///
	}
};

Sprite_StateIcon.prototype.animationWait = function() {
    ///return 40;
	///
	return VCM.StateDescription['Sprite State Icons Animation Wait'];
	///
};

//-----------------------------------------------------------------------------
// Window_Help
//
// The window for displaying the description of the selected item.

Window_Help.prototype.drawTextEx = function(text, x, y) {
    if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
		///
		if(VCM.StateDescription.Actor === null && VCM.StateDescription.Enemy === null && !Imported.VCM_HelpWindow){
		///
			this.resetFontSettings();
		///
		}
		///
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        return textState.x - x;
    } else {
        return 0;
    }
};

VCM.StateDescriptionAlias.Window_Help_processNormalCharacter = Window_Help.prototype.processNormalCharacter;
Window_Help.prototype.processNormalCharacter = function(textState) {
	///
	if(VCM.StateDescription['State Description Wordwrapping'] && !(VCM.StateDescription.Actor === null && VCM.StateDescription.Enemy === null)){
		if(textState.text[textState.index] === ' ' ? textState.x + this.textWidth(textState.text.substring(textState.index, textState.text.indexOf(' ', textState.index + 1) < 0 ?
		textState.text.length + 1 : textState.text.indexOf(' ', textState.index + 1))) > this.contents.width : false){
			return this.processNewLine(textState);
		}
	}
	///
    VCM.StateDescriptionAlias.Window_Help_processNormalCharacter.call(this, textState);
};

//-----------------------------------------------------------------------------
// Window_BattleStatus
//
// The window for displaying the status of party members on the battle screen.

Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    this.drawActorName(actor, rect.x + 0, rect.y, 150);
	///
	if(VCM.StateDescription['Battle Status Window Icons']){
	///
		this.drawActorIcons(actor, rect.x + 156, rect.y, rect.width - 156);
	///
	}
	///
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.

VCM.StateDescriptionAlias.Scene_Battle_createHelpWindow = Scene_Battle.prototype.createHelpWindow;
Scene_Battle.prototype.createHelpWindow = function() {
	///
    this._stateHelpWindow = new Window_Help();
    this._stateHelpWindow.visible = false;
	this._stateHelpWindow.x = eval(VCM.StateDescription['State Help Window Position'].x);
	this._stateHelpWindow.y = eval(VCM.StateDescription['State Help Window Position'].y);
	this._stateHelpWindow.width = eval(VCM.StateDescription['State Help Window Position'].Width);
	this._stateHelpWindow.height = eval(VCM.StateDescription['State Help Window Position'].Height);
	this._stateHelpWindow.contents.resize(this._stateHelpWindow.contentsWidth(), this._stateHelpWindow.contentsHeight());
	this._stateHelpWindow.windowskin = ImageManager.loadSystem(VCM.StateDescription['State Help Window Windowskin']);
	this._stateHelpWindow.opacity = VCM.StateDescription['State Help Window Opacity'];
	this._stateHelpWindow.contents.fontFace = VCM.StateDescription['State Help Window Font'].Font;
	this._stateHelpWindow.contents.fontSize = VCM.StateDescription['State Help Window Font']['Font Size'];
	this._stateHelpWindow.contents.fontItalic = VCM.StateDescription['State Help Window Font'].Italic;
	this._stateHelpWindow.contents.textColor = VCM.StateDescription['State Help Window Font']['Text Color'];
	this._stateHelpWindow.contents.outlineColor = VCM.StateDescription['State Help Window Font']['Text Outline Color'];
	this._stateHelpWindow.contents.outlineWidth = VCM.StateDescription['State Help Window Font']['Text Outline Width'];
    this.addWindow(this._stateHelpWindow);
	///
	VCM.StateDescriptionAlias.Scene_Battle_createHelpWindow.call(this);
	
};