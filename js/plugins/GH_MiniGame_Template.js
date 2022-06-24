/*:
 * @plugindesc (v1.0) minigame template
 * @author contentdeleted
 *
 * @help  
 * =============================================================================
 * 
 * Find and replace "minigameTemplate" with the new name
 * 
 * ============================================================================= 
*/

var Imported = Imported || {};
Imported.GH_MinigameTemplate = true;

var GH_MinigameTemplate = GH_MinigameTemplate || {};

// For loading images that are used in 3d perspective objects
ImageManager.loadMinigameTemplateTexture = function(filename) {
    var path = 'img/minigametemplate/' + encodeURIComponent(filename) + '.png';
    return PIXI.Texture.from(path);
};

// All other sprite images are loaded like this
ImageManager.loadMinigameTemplateBitmap = function (filename) {
    return this.loadBitmap('img/minigametemplate/', filename, 0, true);
};


//=============================================================================
// ** Game_Interpreter
//=============================================================================	

GH_MinigameTemplate._Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	GH_MinigameTemplate._Game_Interpreter_prototype_pluginCommand.call(this,command, args)
	if (command === "minigametemplate")  {
        $gameSystem._minigametemplate_start = true;
        this.wait(10);
    };	
	return true;
};

//=============================================================================
// ** Scene Map
// * This is where we hook in the scene flag
//=============================================================================	

GH_MinigameTemplate.an_Scene_Map_prototype_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function() {
	GH_MinigameTemplate.an_Scene_Map_prototype_update.call(this);
	if ($gameSystem._minigametemplate_start) {
        this.execute_minigametemplate();
    }
};

Scene_Map.prototype.execute_minigametemplate = function() {
    $gameSystem._minigametemplate_start = false;
    this.startFadeOut(this.fadeSpeed());
    $gameSystem.minigametemplate();
};

//=============================================================================
// ** Game_System
//=============================================================================	

GH_MinigameTemplate._Game_System_prototype_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
    GH_MinigameTemplate._Game_System_prototype_initialize.call(this);	
	this._minigametemplate = false; // is it active
	this._minigametemplate_start = false; // flag to activate
	this._minigametemplate_phase = 0; // 0 -> start, 1 -> play, 2 -> results
};

Game_System.prototype.minigametemplate = function() {
    // Maybe not important, but probably will cause issues if the party is dead for some reason
	if ($gameParty.battleMembers().length === 0) {return};
    SceneManager.push(Scene_MinigameTemplate);
};

//=============================================================================
// ** Scene_MinigameTemplate
// * This is the actual scene definition, its pretty straight forward
// * We have several phases, in this case intro, gameplay, and result
// * When results are finished the scene is pop'd off the scene manager stack 
// * and we go back to wherever it was called
//=============================================================================

function Scene_MinigameTemplate() {
    this.initialize.apply(this, arguments);
}

Scene_MinigameTemplate.prototype = Object.create(Scene_Base.prototype);
Scene_MinigameTemplate.prototype.constructor = Scene_MinigameTemplate;

Scene_MinigameTemplate.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);	
     
    $gameSystem._minigametemplate_start = false; // already started
    $gameSystem._minigametemplate = true; // now active
    $gameSystem._minigametemplate_phase = 0; // start phase
    this._phase_state = 0; // incremented at each point in a phase ie fade in -> wait for input -> fade out
    this._score = 0;
    this._scroll_speed = 1.5;

    BattleManager.saveBgmAndBgs();
	AudioManager.fadeOutBgm(2);
	AudioManager.stopBgs();

    this._battlers = $gameParty.battleMembers();

    this.createDisplayObjects();
    this.startFadeIn(60, false);
}

Scene_MinigameTemplate.prototype.load_images = function() {
    //this._player_img = ImageManager.loadMinigameTemplateBitmap("player");
}

Scene_MinigameTemplate.prototype.createDisplayObjects = function() {
    this.load_images();

    // These are basically needed for scene layout and dont have rendered images
    this._spriteField = new Sprite();	
	this.addChild(this._spriteField);

	this._spriteHudBase = new Sprite();
	this.addChild(this._spriteHudBase);

    // Setup all sprites, the order matters for layers
    this.createPlayerSprite();
    this.createScoreText();
    this.createObjectPoolManager();
}
Scene_MinigameTemplate.prototype.createObjectPoolManager = function() {
    this._objectPoolManager = new Sprite_MinigameTemplateObjectPoolManager();
    this.addChild(this._objectPoolManager);
}

Scene_MinigameTemplate.prototype.createScoreText = function() {	
    this._scoretext_sprite = new Sprite(new Bitmap(250,48));
    this._scoretext_sprite.anchor.x = 0.5;
    this._scoretext_sprite.anchor.y = 0.5; 
    this._scoretext_sprite.x = Graphics.boxWidth / 2 + 48;
    this._scoretext_sprite.y = 50;
    this._scoretext_sprite.bitmap.fontSize = 36;
    this._spriteHudBase.addChild(this._scoretext_sprite);
};

Scene_MinigameTemplate.prototype.createPlayerSprite = function() {	
    this._player_sprite = new Sprite_MinigameTemplatePlayer(this._camera);
    this._player_sprite.opacity = 255;
    // this._player_sprite.bitmap = this._player_img;
    this._player_sprite.anchor.x = 0.5;
    this._player_sprite.anchor.y = 0.5; 
    this._player_sprite.x = Graphics.boxWidth / 2;
    this._player_sprite.y = Graphics.boxHeight / 2;

    this._spriteHudBase.addChild(this._player_sprite);
};

Scene_MinigameTemplate.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    
	this.update_phase();
};

Scene_MinigameTemplate.prototype.update_phase = function() {
    switch ($gameSystem._minigametemplate_phase) {
		case 0:
            this.update_start_phase();
            break;
		case 1:
            this.update_play_phase();
            break;
		case 2:
            this.update_end_phase();
            break;	
   };
};

Scene_MinigameTemplate.prototype.update_start_phase = function() {
    switch (this._phase_state) {
		case 0:
			this._phase_state = 1;
     	    break;
		case 1:
            $gameSystem._minigametemplate_phase = 1;
            this._phase_state = 0;		

            // probably want this to be custom music
            BattleManager.playBattleBgm();
		    break;
	};
};

Scene_MinigameTemplate.prototype.update_play_phase = function() {
    // Update score
    this._scoretext_sprite.bitmap.clear();
    this._scoretext_sprite.bitmap.drawText(this._score,0,0,100,48,"right");
}

Scene_MinigameTemplate.prototype.update_end_phase = function() {
    switch (this._phase_state) {
        case 0:
            this._phase_state = 1;
            AudioManager.fadeOutBgm(1);
            break;
        case 1:
            // wait for input
            if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
                SoundManager.playCursor();
                this._phase_state = 2;
            }
            break;
        case 2:
            // probably set a game variable with the score
            this.fadeOutAll();
            SceneManager.pop();
            $gameSystem._minigametemplate_phase = 4;
            break;
     };	
 };

Scene_MinigameTemplate.prototype.terminate = function() {
	Scene_Base.prototype.terminate.call(this);
	BattleManager.replayBgmAndBgs();
	$gameSystem._minigametemplate = false;
};

// ===========================================
// * Sprite_MinigameTemplatePlayer - 
// 
// ===========================================
function Sprite_MinigameTemplatePlayer() {
    this.initialize.apply(this, arguments);
}

Sprite_MinigameTemplatePlayer.prototype = Object.create(Sprite_Base.prototype);
Sprite_MinigameTemplatePlayer.prototype.constructor = Sprite_MinigameTemplatePlayer;

Sprite_MinigameTemplatePlayer.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
};

Sprite_MinigameTemplatePlayer.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

    // only update during gameplay phase
	if($gameSystem._minigametemplate_phase !== 1) return;

    this.updateInput();
};


Sprite_MinigameTemplatePlayer.prototype.updateInput = function() {
    Sprite_Base.prototype.update.call(this);

    if(Input.isPressed("right")) {
    } else if (Input.isPressed("left")) {
    } else {
       
    }
};


// ===========================================
// * Sprite_MinigameTemplateObjectPoolManager -
// *
// ===========================================
function Sprite_MinigameTemplateObjectPoolManager() {
    this.initialize.apply(this, arguments);
}

Sprite_MinigameTemplateObjectPoolManager.prototype = Object.create(Sprite_Base.prototype);
Sprite_MinigameTemplateObjectPoolManager.prototype.constructor = Sprite_MinigameTemplatePlayer;

Sprite_MinigameTemplateObjectPoolManager.prototype.initialize = function(camera, scroll_speed, tree_img, road_img) {
    Sprite_Base.prototype.initialize.call(this);

};

Sprite_MinigameTemplateObjectPoolManager.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
};
