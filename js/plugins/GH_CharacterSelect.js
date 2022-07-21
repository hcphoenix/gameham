/*:
 * @plugindesc (v1.0) Character Select Screen
 * @author contentdeleted
 *
 * @help  
 * =============================================================================
 * 
 * Provides a fighting game style character select
 * 
 * ============================================================================= 
*/

var Imported = Imported || {};
Imported.GH_CharacterSelect = true;

var GH_CharacterSelect = GH_CharacterSelect || {};

// For loading images that are used in 3d perspective objects
ImageManager.loadCharacterSelectTexture = function(filename) {
    var path = 'img/select_screen/' + encodeURIComponent(filename) + '.png';
    return PIXI.Texture.from(path);
};

// All other sprite images are loaded like this
ImageManager.loadCharacterSelectBitmap = function (filename) {
    return this.loadBitmap('img/select_screen/', filename, 0, true);
};


//=============================================================================
// ** Game_Interpreter
//=============================================================================	

GH_CharacterSelect._Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	GH_CharacterSelect._Game_Interpreter_prototype_pluginCommand.call(this,command, args)
	if (command === "characterselect")  {
        $gameSystem._characterselect_start = true;
        this.wait(10);
    };	
	return true;
};

//=============================================================================
// ** Scene Map
// * This is where we hook in the scene flag
//=============================================================================	

GH_CharacterSelect.an_Scene_Map_prototype_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function() {
	GH_CharacterSelect.an_Scene_Map_prototype_update.call(this);
	if ($gameSystem._characterselect_start) {
        this.execute_characterselect();
    }
};

Scene_Map.prototype.execute_characterselect = function() {
    $gameSystem._characterselect_start = false;
    this.startFadeOut(this.fadeSpeed());
    $gameSystem.characterselect();
};

//=============================================================================
// ** Game_System
//=============================================================================	

GH_CharacterSelect._Game_System_prototype_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
    GH_CharacterSelect._Game_System_prototype_initialize.call(this);	
	this._characterselect = false; // is it active
	this._characterselect_start = false; // flag to activate
};

Game_System.prototype.characterselect = function() {
    SceneManager.push(Scene_CharacterSelect);
};

//=============================================================================
// ** Scene_CharacterSelect
// * This is the actual scene definition, its pretty straight forward
// * We have several phases, in this case intro, gameplay, and result
// * When results are finished the scene is pop'd off the scene manager stack 
// * and we go back to wherever it was called
//=============================================================================

function Scene_CharacterSelect() {
    this.initialize.apply(this, arguments);
}

Scene_CharacterSelect.prototype = Object.create(Scene_Base.prototype);
Scene_CharacterSelect.prototype.constructor = Scene_CharacterSelect;

Scene_CharacterSelect.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);	
    
    // Clear system vars
    $gameSystem._characterselect_start = false; // already started
    $gameSystem._characterselect = true; // now active

    // Clear music
    //BattleManager.saveBgmAndBgs();
	//AudioManager.fadeOutBgm(2);
	//AudioManager.stopBgs();

    // Set data
    this.partySize = 3; // Could be a param if made avalible publicly
    this.currentChar = 0; // which character are you selecting

    // Setup scene
    this.createDisplayObjects();
    this.startFadeIn(60, false);

    // iidk how to play the music we want BattleManager.playBattleBgm();
}

Scene_CharacterSelect.prototype.load_images = function() {
    this._portbig_img = ImageManager.loadCharacterSelectBitmap("select_portbig_a");
    this._portsmall_img = ImageManager.loadCharacterSelectBitmap("select_portsmall_leftside_a");
    this._BG_img = ImageManager.loadCharacterSelectBitmap("select_BG"); 
    this._shadow_img = ImageManager.loadCharacterSelectBitmap("select_minimap_shadow");
    this._support_img = ImageManager.loadCharacterSelectBitmap("select_portbig_leftsupport");
    this._title_img = ImageManager.loadCharacterSelectBitmap("select_title_a");
}

Scene_CharacterSelect.prototype.createDisplayObjects = function() {
    this.load_images();

    this._spriteField = new Sprite();	
	this.addChild(this._spriteField);

    // Setup all sprites, the order matters for layers
    this.createBackground();
    this.createTitle();
    this.createPortraits();
}

Scene_CharacterSelect.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite(this._BG_img);
    this.addChild(this._backgroundSprite);
}

Scene_CharacterSelect.prototype.createPortraits = function() {
    this._portraits = [];
    for(let i = 0; i < this.partySize; i++) {
        let portrait = new Sprite_CharacterSelectPortrait(this._portbig_img);
        portrait.anchor.y = 0.5;
        portrait.y = Graphics.boxHeight / 2;
        this.addChild(portrait);
        this._portraits.push(portrait);
    }
    // left
    this._portraits[0].x = 20;
    // middle
    this._portraits[1].y -= 20;
    this._portraits[1].anchor.x = 0.5;
    this._portraits[1].x = Graphics.boxWidth / 2;
    // right
    this._portraits[2].x = Graphics.boxWidth - 20;
    this._portraits[2].anchor.x = 1;
}

Scene_CharacterSelect.prototype.createTitle = function() {
    this._titleSprite = new Sprite(this._title_img);
    this._titleSprite.anchor.x = 0.5;
    this._titleSprite.x = Graphics.boxWidth / 2;
    this.addChild(this._titleSprite);
}

Scene_CharacterSelect.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    
};

Scene_CharacterSelect.prototype.endScene = function() {
    AudioManager.fadeOutBgm(1);
    this.fadeOutAll();
    SceneManager.pop();
 };

Scene_CharacterSelect.prototype.terminate = function() {
	Scene_Base.prototype.terminate.call(this);
	BattleManager.replayBgmAndBgs();
	$gameSystem._characterselect = false;
};

// ===========================================
// * Sprite_Portrait
// 
// ===========================================
function Sprite_CharacterSelectPortrait() {
    this.initialize.apply(this, arguments);
}

Sprite_CharacterSelectPortrait.prototype = Object.create(Sprite_Base.prototype);
Sprite_CharacterSelectPortrait.prototype.constructor = Sprite_CharacterSelectPortrait;

Sprite_CharacterSelectPortrait.prototype.initialize = function(portrait_img) {
    Sprite_Base.prototype.initialize.call(this);
    this.bitmap = portrait_img;
};

Sprite_CharacterSelectPortrait.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

};
