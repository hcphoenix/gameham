/*:
 * @plugindesc v1.2.2 An extension plugin for Moghunter's Battle, Actor, and Party HUDs with options to change the face graphics.
 * @author LadyBaskerville
 *
 * @help
 * 
 * More Hud Faces (Moghunter Extension)
 * Version 1.2.2
 * by LadyBaskerville
 *
 *
 * ---------------------
 *     How to use
 * ---------------------
 * This extension plugin provides Plugin Commands as well as Script Calls
 * to change the face graphics used in Moghunter's Battle HUD, Party HUD 
 * and/or Actor HUD mid-game. You can also specify a different default 
 * face file for each actor using notetags.
 *
 * It is possible to assign face graphics for different states to an actor.
 * You can set these up with notetags in the actor notebox, or change them
 * during the game with Plugin Commands and Script Calls. The state with the
 * highest priority will determine the face graphic used. If there is no face
 * graphic assigned to the actor for this state, the state with the next 
 * highest priority will determine the face graphic. If there is no face 
 * graphic assigned for ANY of the actor's states, the default face graphic
 * will be used instead.
 * 
 * To use this plugin, place it below Moghunter's plugins in your plugin list.
 * You can use this extension with any combination of the three plugins
 * mentioned above.
 *
 * ---------------------
 *    Plugin Commands
 * ---------------------
 * --- Change HUD faces immediately ---
 * change_ahud_face ACTOR_ID FILENAME
 * change_bhud_face ACTOR_ID FILENAME
 * change_phud_face ACTOR_ID FILENAME
 *
 * Immediately change the face file used in the Actor, Battle, or Party HUD,
 * respectively. The file must be located in the respective HUD folder 
 * (img/actorhud, img/battlehud, or img/partyhud).
 * This also changes the face file used by default when the actor is not
 * afflicted by any states.
 *
 * Example:
 * change_ahud_face 1 HaroldFace12
 * will change the Actor HUD face for Actor #1 to the file "HaroldFace12.png"
 * in the folder img/actorhud.
 * 
 * --- Set faces to show based on state ---
 * set_ahud_face ACTOR_ID STATE_ID FILENAME
 * set_bhud_face ACTOR_ID STATE_ID FILENAME
 * set_phud_face ACTOR_ID STATE_ID FILENAME
 *
 * Set the face file that is automatically used for the state in the Actor, 
 * Battle, or Party HUD, respectively. The file must be located in the  
 * respective HUD folder (img/actorhud, img/battlehud, or img/partyhud).
 * Enter 0 as the state ID to change the face file used by default when the 
 * actor is not afflicted by any states.
 * 
 * Example:
 * set_ahud_face 1 4 HaroldFacePoison
 * will set the face that is for Actor #1 in the Actor HUD when Actor #1 is 
 * afflicted by state #4 to the file "HaroldFacePoison.png" in img/actorhud.
 *
 * --- Clear state faces assigned to the actor ---
 * clear_ahud_face ACTOR_ID STATE_ID
 * clear_bhud_face ACTOR_ID STATE_ID
 * clear_phud_face ACTOR_ID STATE_ID
 * 
 * Clear the face file that is automatically used for the state in the Actor, 
 * Battle, or Party HUD, respectively. If the actor is afflicted by this state,
 * the face graphic will no longer automatically change.
 *
 * ---------------------
 *     Script Calls
 * ---------------------
 * The following functions have been added to Game_Actor:
 *
 * --- Change HUD faces immediately ---
 * changeAhudFace(FILENAME)
 * changeBhudFace(FILENAME)
 * changePhudFace(FILENAME)
 *
 * Immediately change the face file used in the Actor, Battle, or Party HUD,
 * respectively. The file must be located in the respective HUD folder 
 * (img/actorhud, img/battlehud, or img/partyhud).
 * This also changes the face file used by default when the actor is not
 * afflicted by any states.
 * 
 * Example:
 * $gameActors.actor(1).changeAhudFace("HaroldFace12")
 * will change the Actor HUD face for Actor #1 to the file "HaroldFace12.png"
 * in the folder img/actorhud.
 *
 * --- Set faces to show based on state ---
 * setAhudFace(STATE_ID, FILENAME)
 * setBhudFace(STATE_ID, FILENAME)
 * setPhudFace(STATE_ID, FILENAME)
 *
 * Set the face file that is automatically used for the state in the Actor, 
 * Battle, or Party HUD, respectively. The file must be located in the  
 * respective HUD folder (img/actorhud, img/battlehud, or img/partyhud).
 * Enter 0 as the state ID to change the face file used by default when the 
 * actor is not afflicted by any states.
 * 
 * Example:
 * $gameActors.actor(1).setAhudFace(4, "HaroldFacePoison")
 * will set the face that is for Actor #1 in the Actor HUD when Actor #1 is 
 * afflicted by state #4 to the file "HaroldFacePoison.png" in img/actorhud.
 *
 * --- Clear state faces assigned to the actor ---
 * clearAhudFace(STATE_ID)
 * clearBhudFace(STATE_ID)
 * clearPhudFace(STATE_ID)
 * 
 * Clear the face file that is automatically used for the state in the Actor, 
 * Battle, or Party HUD, respectively. If the actor is afflicted by this state,
 * the face graphic will no longer automatically change.
 *
 * ---------------------
 *      Notetags
 * ---------------------
 * You can specify a different face file to be used at the start of the game
 * with the following notetags in the Actor tab:
 *
 * <AHudFace: FILENAME>
 * <BHudFace: FILENAME>
 * <PHudFace: FILENAME>
 *
 * Use the file FILENAME.png to represent this actor in the Actor, Battle, 
 * or Party HUD by default. The file must be located in the respective HUD 
 * folder (img/actorhud, img/battlehud, or img/partyhud).
 *
 *
 * <AHudFace State STATE_ID: FILENAME>
 * <BHudFace State STATE_ID: FILENAME>
 * <PHudFace State STATE_ID: FILENAME>
 *
 * Automatically change the actor's face graphic in the Actor, Battle,
 * or Party HUD to FILENAME.png when the actor is afflicted with the state.
 * The file must be located in the respective HUD folder (img/actorhud, 
 * img/battlehud, or img/partyhud).
 *
 * ---------------------
 *     Terms of use
 * ---------------------
 * - Free for use in both non-commercial and commercial games.
 * - You may repost and edit this plugin.
 * - Credit to me (LadyBaskerville) is appreciated, but not required.
 * - Please credit Moghunter if you use their plugins.
 * 
 * ---------------------
 *      Changelog
 * ---------------------
 * Version 1.2.2
 * - Fixed a bug where animated faces would not display properly when the face
 *   graphic was changed in battle.
 * Version 1.2.1
 * - Fixed a bug with Party and Battle HUD when there were less than 4 members.
 * Version 1.2.0
 * - Added notetags, plugin commands and script calls to set up automatic
 *   state faces: The face graphic can be changed based on the states the actor
 *   is afflicted with.
 * - Cleaned up the documentation.
 * Version 1.1.1
 * - Fixed a bug where changing the battle HUD image would try to load 
 *   an image from the actor HUD folder.
 * Version 1.1.0
 * - Reworked the plugin to work with Moghunter's updated plugins.
 * - Added script calls.
 * - Faces are now changed without refreshing the entire HUD.
 * Version 1.0.1
 * - Only refresh the HUDs when the face graphic has changed.
 * Version 1.0.0
 * - Finished the plugin.
 *
 */

var LB = LB || {};
LB.MogHudExt = LB.MogHudExt || {};

(function() {
	
// ------------------
// Plugin Commands
// ------------------
LB.MogHudExt.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    LB.MogHudExt.Game_Interpreter_pluginCommand.call(this, command, args);
	
	// Change Face
	
	if (command == 'change_ahud_face') {
		var actorId = Number(args[0]);
		var faceFile = args[1].trim();
		$gameActors.actor(actorId).changeAhudFace(faceFile);
	}
	
	if (command == 'change_bhud_face') {
		var actorId = Number(args[0]);
		var faceFile = args[1].trim();
		$gameActors.actor(actorId).changeBhudFace(faceFile);
	}
	
	if (command == 'change_phud_face') {
		var actorId = Number(args[0]);
		var faceFile = args[1].trim();
		$gameActors.actor(actorId).changePhudFace(faceFile);
	}
	
	// Set Face
	
	if (command == 'set_ahud_face') { // set_ahud_face [actorId] [stateId] [face]
		var actorId = Number(args[0]);
		var stateId = Number(args[1]);
		var faceFile = args[2].trim();
		$gameActors.actor(actorId).setAhudFace(stateId, faceFile);
	}
	
	if (command == 'set_bhud_face') { // set_bhud_face [actorId] [stateId] [face]
		var actorId = Number(args[0]);
		var stateId = Number(args[1]);
		var faceFile = args[2].trim();
		$gameActors.actor(actorId).setBhudFace(stateId, faceFile);
	}
	
	if (command == 'set_phud_face') { // set_phud_face [actorId] [stateId] [face]
		var actorId = Number(args[0]);
		var stateId = Number(args[1]);
		var faceFile = args[2].trim();
		$gameActors.actor(actorId).setPhudFace(stateId, faceFile);
	}
	
	// Clear Face
	
	if (command == 'clear_ahud_face') { // clear_ahud_face [actorId] [stateId]
		var actorId = Number(args[0]);
		var stateId = Number(args[1]);
		$gameActors.actor(actorId).clearAhudFace(stateId);
	}
	
	if (command == 'clear_bhud_face') {
		var actorId = Number(args[0]);
		var stateId = Number(args[1]);
		$gameActors.actor(actorId).clearBhudFace(stateId);
	}
	
	if (command == 'clear_phud_face') {
		var actorId = Number(args[0]);
		var stateId = Number(args[1]);
		$gameActors.actor(actorId).clearPhudFace(stateId);
	}
};

// ------------------
// Game Actor
// ------------------

Game_Actor.prototype.parseMogHudExtNotetags = function(actorId) {
	
	// default faces
	this._ahudFaces = [];
	if ($dataActors[actorId].meta.AHudFace) {
		this._ahudFaces[0] = $dataActors[actorId].meta.AHudFace.trim();
	} else {
		this._ahudFaces[0] = "Face_" + actorId;
	}
	this._bhudFaces = [];
	if ($dataActors[actorId].meta.BHudFace) {
		this._bhudFaces[0] = $dataActors[actorId].meta.BHudFace.trim();
	} else {
		this._bhudFaces[0] = "Face_" + actorId;
	}
	this._phudFaces = [];
	if ($dataActors[actorId].meta.PHudFace) {
		this._phudFaces[0] = $dataActors[actorId].meta.PHudFace.trim();
	} else {
		this._phudFaces[0] = "Face_" + actorId;
	}

	// state faces
	var notes = $dataActors[actorId].note.split("\n");
	var aStatesRegexp = /<AHudFace State (\d+) *: *([^ ]+) *>/;
	var bStatesRegexp = /<BHudFace State (\d+) *: *([^ ]+) *>/;
	var pStatesRegexp = /<PHudFace State (\d+) *: *([^ ]+) *>/;

	for (var i = 0; i < notes.length; i++) {
		var match = notes[i].match(aStatesRegexp);
		if (match) {
			this._ahudFaces[Number(match[1])] = match[2];
		}
		match = notes[i].match(bStatesRegexp);
		if (match) {
			this._bhudFaces[Number(match[1])] = match[2];
		}
		var match = notes[i].match(pStatesRegexp);
		if (match) {
			this._phudFaces[Number(match[1])] = match[2];
		}
	}
};


LB.MogHudExt.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    LB.MogHudExt.Game_Actor_setup.call(this, actorId);
	
	this.parseMogHudExtNotetags(actorId);
	
	this._ahud_face_file = this._ahudFaces[0];
	this._bhud_face_file = this._bhudFaces[0];
	this._phud_face_file = this._phudFaces[0];
};

Game_Actor.prototype.setAhudFace = function(stateId, faceFile) {
	this._ahudFaces[stateId] = faceFile;
	this.updateAhudFace();
};

Game_Actor.prototype.clearAhudFace = function(stateId) {
	if (stateId !== 0) {
		this._ahudFaces[stateId] = null;
		this.updateAhudFace();
	}
};

Game_Actor.prototype.setBhudFace = function(stateId, faceFile) {
	this._bhudFaces[stateId] = faceFile;
	this.updateBhudFace();
};

Game_Actor.prototype.clearBhudFace = function(stateId) {
	if (stateId !== 0) {
		this._bhudFaces[stateId] = null;
		this.updateBhudFace();
	}
};

Game_Actor.prototype.setPhudFace = function(stateId, faceFile) {
	this._phudFaces[stateId] = faceFile;
	this.updatePhudFace();
};

Game_Actor.prototype.clearPhudFace = function(stateId) {
	if (stateId !== 0) {
		this._phudFaces[stateId] = null;
		this.updatePhudFace();
	}
};

Game_Actor.prototype.changeAhudFace = function(faceFile, noSetDefault) {
	if (noSetDefault === undefined) {
		this.setAhudFace(0, faceFile);
	}
	if (this._ahud_face_file != faceFile) {
		this._ahud_face_file = faceFile;
		if (Imported.MOG_ActorHud && SceneManager._scene.constructor == Scene_Map)  {
			//SceneManager._scene._actorHud.refresh_bhud();
			var actorHud = SceneManager._scene._actorHud;
			actorHud._face.bitmap = ImageManager.loadAHud(this._ahud_face_file);
		}
	}
};

Game_Actor.prototype.changeBhudFace = function(faceFile, noSetDefault) {
	if (noSetDefault === undefined) {
		this.setBhudFace(0, faceFile);
	}
	if (this._bhud_face_file != faceFile) {
		this._bhud_face_file = faceFile;
		if (Imported.MOG_BattleHud && SceneManager._scene.constructor == Scene_Battle)  {
			//SceneManager._scene.refreshBattleHud();
			var battleHud = SceneManager._scene._battle_hud;
			battleHud.forEach(function(bhud) {
				if (bhud._battler && bhud._battler._actorId === this._actorId) {
					bhud.refresh_bhud();
				}
			}, this);
		}
	}
};

Game_Actor.prototype.changePhudFace = function(faceFile, noSetDefault) {
	if (noSetDefault === undefined) {
		this.setPhudFace(0, faceFile);
	}
	if (this._phud_face_file != faceFile) {
		this._phud_face_file = faceFile;
		if (Imported.MOG_PartyHud && SceneManager._scene.constructor == Scene_Map)  {
			//SceneManager._scene.refreshPartyHud();
			var partyHud = SceneManager._scene._partyHud;
			partyHud.forEach(function(phud) {
				if (phud._actor && phud._actor._actorId === this._actorId) {
					phud.refreshFace();
				}
			}, this);
		}
	}
};

Game_Actor.prototype.updateMogExtFaces = function() {
	this.updateAhudFace();
	this.updateBhudFace();
	this.updatePhudFace();
};

Game_Actor.prototype.updateAhudFace = function(stateId, faceFile) {
	var states = this._states;
	for (var i = 0; i < states.length; i++) {
		if (this._ahudFaces[states[i]]) {
			this.changeAhudFace(this._ahudFaces[states[i]], true);
			return;
		}
	}
	this.changeAhudFace(this._ahudFaces[0], true);
};

Game_Actor.prototype.updateBhudFace = function(stateId, faceFile) {
	var states = this._states;
	for (var i = 0; i < states.length; i++) {
		if (this._bhudFaces[states[i]]) {
			this.changeBhudFace(this._bhudFaces[states[i]], true);
			return;
		}
	}
	this.changeBhudFace(this._bhudFaces[0], true);
};

Game_Actor.prototype.updatePhudFace = function(stateId, faceFile) {
	var states = this._states;
	for (var i = 0; i < states.length; i++) {
		if (this._phudFaces[states[i]]) {
			this.changePhudFace(this._phudFaces[states[i]], true);
			return;
		}
	}
	this.changePhudFace(this._phudFaces[0], true);
};

LB.MogHudExt.Game_Actor_addNewState = Game_Actor.prototype.addNewState;
Game_Actor.prototype.addNewState = function(stateId) {
	LB.MogHudExt.Game_Actor_addNewState.call(this, stateId);
	this.updateMogExtFaces();
};

LB.MogHudExt.Game_Actor_eraseState = Game_Actor.prototype.eraseState;
Game_Actor.prototype.eraseState = function(stateId) {
	LB.MogHudExt.Game_Actor_eraseState.call(this, stateId);
	this.updateMogExtFaces();
};

// ------------------
// Battle Hud
// ------------------
if (Imported.MOG_BattleHud) {
	Battle_Hud.prototype.create_face = function () {
		if (String(Moghunter.bhud_face_visible) != "true") { return };
		this.removeChild(this._face);
		if (!this._battler) { return };
		this._face = new Sprite(ImageManager.loadBHud(this._battler._bhud_face_file));
		this._face.anchor.x = 0.5;
		this._face.anchor.y = 0.5;
		this._face_data = [0, 0, false, false, false, -1];
		this._face.ph = 0; //add
		this._face.animation = [-1, 0, 0, 0, 0, 0, 0, 0, 0]; //add
		this._face.breathEffect = this._battler._bhud.faceBreath; //add
		this._face.scaleY = 0; //add
		if (String(Moghunter.bhud_face_shake) === "true") { this._face_data[2] = true }
		if (String(Moghunter.bhud_face_animated) === "true") { this._face_data[4] = true }
		this._battler._bhud_face_data = [0, 0, 0, 0]
		this.addChild(this._face);
	};
}

// ------------------
// Party Hud
// ------------------
if (Imported.MOG_PartyHud) {
PartyHud.prototype.createFace = function() {
	var fileName = "Face_" + this._actor._actorId;
    this._face = new Sprite(ImageManager.loadPartyHud(this._actor._phud_face_file));
	this._face.x = this._layout.x + Number(Moghunter.partyHud_FaceX);
	this._face.y = this._layout.y + Number(Moghunter.partyHud_FaceY);
	this.refreshFace();
	this.addChild(this._face);
};

PartyHud.prototype.refreshFace = function() {
	this._face.bitmap = ImageManager.loadPartyHud(this._actor._phud_face_file);
};
}

// ------------------
// Actor Hud
// ------------------
if (Imported.MOG_ActorHud) {
Actor_Hud.prototype.create_face = function() {
	if (String(Moghunter.ahud_face_visible) != "true") {return};
	this.removeChild(this._face);
	if (!this._battler) {return};	
	this._face = new Sprite(ImageManager.loadAHud(this._battler._ahud_face_file));
	this._face.anchor.x = 0.5;
	this._face.anchor.y = 0.5;
	this._face_data = [0,0,false,false,false,-1];
	if (String(Moghunter.ahud_face_shake) === "true") {this._face_data[2] = true}
	if (String(Moghunter.ahud_face_animated) === "true") {this._face_data[4] = true}
	this._battler._ahud_face_data = [0,0,0,0]
	this.addChild(this._face);
};
}

})();