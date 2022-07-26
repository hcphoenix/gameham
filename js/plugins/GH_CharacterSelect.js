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
    this.timer = 0;
}

Scene_CharacterSelect.prototype.load_images = function() {
    this._portbig_img = ImageManager.loadCharacterSelectBitmap("select_portbig");
    this._portsmall_img = ImageManager.loadCharacterSelectBitmap("select_portsmall");
    this._BG_img = ImageManager.loadCharacterSelectBitmap("select_BG"); 
    this._shadow_img = ImageManager.loadCharacterSelectBitmap("select_minimap_shadow");
    this._support_img = ImageManager.loadCharacterSelectBitmap("select_portbig_support");
    this._title_img = ImageManager.loadCharacterSelectBitmap("select_title");

    this._char_sheet = ImageManager.loadCharacterSelectBitmap("select_portsmall_all");

    this._big_bird_imgs = [];
    for(let i = 1; i<=4; i++){
        this._big_bird_imgs.push(ImageManager.loadCharacterSelectBitmap("birdport_large_"+i));
    }
}

Scene_CharacterSelect.prototype.createDisplayObjects = function() {
    this.load_images();

    this._spriteField = new Sprite();	
	this.addChild(this._spriteField);

    // Setup all sprites, the order matters for layers
    this.createBackground();
    this.createTitle();
    this.createSupports();
    this.createPortraits();
    this.createWindowLayer();
    this.createWindow();
}

Scene_CharacterSelect.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite(this._BG_img);
    this.addChild(this._backgroundSprite);
}

Scene_CharacterSelect.prototype.createWindow = function() {
    this.characterSelectWindow = new Window_CharacterSelect(this._portsmall_img, this._char_sheet, this._portraits);
    this.addWindow(this.characterSelectWindow);
}

Scene_CharacterSelect.prototype.createSupports = function() {
    this._supportSprite1 = new Sprite(this._support_img);
    this._supportSprite1.y = Graphics.boxHeight / 2;
    this._supportSprite1.anchor.y = 0.5;
    this._supportSprite1.anchor.x = 1;
    this._supportSprite1.scale.x = -1;
    this.addChild(this._supportSprite1);

    this._supportSprite2 = new Sprite(this._support_img);
    this._supportSprite2.y = Graphics.boxHeight / 2;
    this._supportSprite2.x = Graphics.boxWidth;
    this._supportSprite2.anchor.y = 0.5;
    this._supportSprite2.anchor.x = 1;
    this.addChild(this._supportSprite2);
}

Scene_CharacterSelect.prototype.createPortraits = function() {
    this._portraits = [];
    for(let i = 0; i < this.partySize; i++) {
        let portrait = new Sprite_CharacterSelectPortrait(this._portbig_img, this._big_bird_imgs);
        portrait.anchor.y = 0.5;
        portrait.anchor.x = 0.5;
        portrait.y = Graphics.boxHeight / 2;
        this.addChild(portrait);
        this._portraits.push(portrait);
    }
    // This is a dumb constant sorry
    const bigFrameWidth = 240;
    // left
    this._portraits[0].x = 20 + bigFrameWidth / 2;
    // middle
    this._portraits[1].y -= 20;
    this._portraits[1].x = Graphics.boxWidth / 2;
    // right
    this._portraits[2].x = Graphics.boxWidth - 20 - bigFrameWidth / 2;
}

Scene_CharacterSelect.prototype.createTitle = function() {
    this._titleSprite = new Sprite(this._title_img);
    this._titleSprite.anchor.x = 0.5;
    this._titleSprite.x = Graphics.boxWidth / 2;
    this.addChild(this._titleSprite);
}

Scene_CharacterSelect.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    
    this.updateTitleSprite();

    this.timer++;
};

Scene_CharacterSelect.TitleSpeed = 15;
Scene_CharacterSelect.prototype.updateTitleSprite = function() {
    let w = this._titleSprite._bitmap.width;
    let h = this._titleSprite._bitmap.height / 2;
    this._titleSprite.setFrame(0, h * ( Math.floor(this.timer / Scene_CharacterSelect.TitleSpeed) % 2), w, h);
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

Sprite_CharacterSelectPortrait.prototype.initialize = function(portrait_img, big_bird_imgs) {
    Sprite_Base.prototype.initialize.call(this);
    this.big_bird_imgs = big_bird_imgs;
    this.bitmap = portrait_img;
    this.timer = 0;
    this.state = 0; // 0 = unselected 1 = selecting 2 = selected
    this._faceIndex = 0;
    this._faceFile = 0;

    this.spriteFace = new Sprite(big_bird_imgs[0]);
    this.spriteFace.anchor.y = 0.5;
    this.spriteFace.anchor.x = 0.5;
    this.addChild(this.spriteFace);
};

Sprite_CharacterSelectPortrait.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    this.updateFrame();
    this.updateContent();
    this.timer++;
};

Sprite_CharacterSelectPortrait.AnimationSpeed = 20;
Sprite_CharacterSelectPortrait.prototype.updateFrame = function() {
    let w = this._bitmap.width / 2
    let h = this._bitmap.height / 2
    switch (this.state) {
		case 0:
            this.setFrame(0, h, w, h);
            this.spriteFace.visible = false;
            break;
		case 1:
            this.setFrame(w * ( Math.floor(this.timer / Sprite_CharacterSelectPortrait.AnimationSpeed) % 2) , 0, w, h);
            this.spriteFace.visible = true;
            break;
		case 2:
            this.setFrame(w, h, w, h);
            this.spriteFace.visible = true;
            break;	
   };
}

Sprite_CharacterSelectPortrait.prototype.updateContent = function() {
    let w = this.big_bird_imgs[this._faceFile].width / 4;
    let h = this.big_bird_imgs[this._faceFile].height / 2;

    let x = Math.floor(this._faceIndex % 4) * w;
    let y = Math.floor(this._faceIndex / 4) * h;

    this.spriteFace.bitmap = this.big_bird_imgs[this._faceFile];
    this.spriteFace.setFrame(x, y, w, h);
}


// ===========================================
// * Window_CharacterSelect
//  
// This is the main window of the screen
// Its basically a window select except that all the placement is fucked
// You should be able to nav it the same and it updates several other elements
// ===========================================
function Window_CharacterSelect() {
    this.initialize.apply(this, arguments);
}

Window_CharacterSelect.prototype = Object.create(Window_Selectable.prototype);
Window_CharacterSelect.prototype.constructor = Window_CharacterSelect;

Window_CharacterSelect.prototype.initialize = function(frame_spritesheet, char_spritesheet, big_portraits) {
    Window_Selectable.prototype.initialize.call(this);

    this.width = Graphics.boxWidth;
    this.height = Graphics.boxHeight;

    this.frame_spritesheet = frame_spritesheet;
    this.char_spritesheet = char_spritesheet;
    this.big_portraits = big_portraits;

    this.spriteFrames = [];
    for(let i = 0; i < this.maxItems(); i++) {
        let frame = new Sprite(this.frame_spritesheet);
        frame.is_port = true;
        this.addChild(frame);
        this.spriteFrames.push(frame);
    }
    this.charSprites = [];
    for(let i = 0; i < this.maxItems(); i++) {
        let char = new Sprite(this.char_spritesheet);
        char.is_port = true;
        this.addChild(char);
        
        this.charSprites.push(char);
    }

    // Set up little preview guy
    this.previewSprite = new Sprite_Select_Preview(1);
    this.previewSprite.anchor.x = 0.5;
    this.previewSprite.anchor.y = 0.5;
    this.previewSprite.x = Graphics.boxWidth / 2;
    this.previewSprite.y = Graphics.boxHeight - 50;
    this.addChild(this.previewSprite);

    this.setHandler('ok',     this.onOk.bind(this));
    this.setHandler('cancel', this.onCancel.bind(this));

    this.partyIndex = 0; // which party member are you currently selecting
    this.timer = 0;
    this._pallette = 0;

    // sort children to put port under the mouse
    this.children.sort((a, b) => Number(b.is_port || 0) - Number(a.is_port || 0));

    this.buildClassInfo();
    this.setAllFrames();
    this.start();
};

Window_CharacterSelect.prototype.buildClassInfo = function() {
    this.classInfo = [];
    for(let i = 0; i <= 8; i++) {  
        this.classInfo.push([]);
    }

    $dataActors.filter(a => a && a.classId <= 8 && a.name != "").forEach(x => this.classInfo[x.classId].push(x));
};

// only support 2 for now
Window_CharacterSelect.prototype.MaxPallettes = () => 2;

Window_CharacterSelect.prototype.pallette = function() {
    return this._pallette % this.MaxPallettes();
}

Window_CharacterSelect.prototype.onOk = function() {
    if(this.partyIndex < 2) {
        this.partyIndex++;
        let cur = this._index; // stay on same box
        this.updateBigPortraits();
        this.start();
        this.select(cur);
    } else {
        // Start the game
    }
}

Window_CharacterSelect.prototype.onCancel = function() {
    if(this.partyIndex == 0) {
        // We actually dont want to end the scene because you need to select at this point?
        // Or maybe we do end it and go back to title idk figure this out later
        // SceneManager._scene.endScene();
        
    } else {
        this.partyIndex--;
        // remove the current portrait
        let cur = this._index; // stay on same box
        this.updateBigPortraits();
        this.start();
        this.select(cur);
    }
}

Window_CharacterSelect.prototype.updateBigPortraits = function() {
    for(let i = 0; i < 3; i++) {
        if(this.partyIndex < i) {
            this.big_portraits[i].state = 0;
            continue;
        }
        if(this.partyIndex == i) {
            this.big_portraits[i].state = 1;
            continue;
        }
        if(this.partyIndex > i) {
            this.big_portraits[i].state = 2;
            continue;
        }
    }
}

Window_CharacterSelect.prototype.fileFromFaceName = (f) => f.charAt(f.length-1);

Window_CharacterSelect.prototype.curActorInfo = function () {
    return this.classInfo[this._index+1][this.pallette()];
}

Window_CharacterSelect.prototype.updateBigInnerPortrait = function() {
    let actorInfo = this.curActorInfo();

    this.big_portraits[this.partyIndex]._faceIndex = actorInfo.faceIndex;
    this.big_portraits[this.partyIndex]._faceFile = this.fileFromFaceName(actorInfo.faceName) - 1;
    this.big_portraits[this.partyIndex].spriteFace.anchor.y = 0.5;
    this.big_portraits[this.partyIndex].updateContent();
}

Window_CharacterSelect.prototype.start = function() {
    this.refresh();
    this.select(0);
    this.open();
    this.activate();
    this.updateBigPortraits();
};

Window_CharacterSelect.prototype.setAllFrames = function() {
    for(let i = 0; i < this.maxItems(); i++) {
        this.setFrameFrame(i);
        this.setCharFrame(i);

        let rect = this.itemRect(i);

        this.spriteFrames[i].x = rect.x;
        this.spriteFrames[i].y = rect.y + this.itemHeight() / 2;

        this.charSprites[i].x = rect.x;
        this.charSprites[i].y = rect.y + this.itemHeight() / 2;
    }
};

Window_CharacterSelect.prototype.numVisibleRows = function() {
    return 1;
};

Window_CharacterSelect.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);

    this.cyclePalette();

    this.timer++;
    for(let i = 0; i < 8; i++) {
        this.setFrameFrame(i);
        this.setCharFrame(i);
    }

    this.updateBigInnerPortrait();

    this.updateCharacterPreview();
};

Window_CharacterSelect.prototype.cyclePalette = function() {
    // TODO: add controller support
    // TODO: maybe scroll mouse?
    if(Input.isTriggered('#c')) {
        this._pallette++;
    }
}

Window_CharacterSelect.prototype.updateCharacterPreview = function() {
    let actorInfo = this.curActorInfo();

    this.previewSprite.setActor(actorInfo.id);
    this.previewSprite.updateAnimation();
};

Window_CharacterSelect.prototype.maxItems = function() {
    // This could come from somewhere else
    return 8;
};

Window_CharacterSelect.prototype.drawItem = function(index) {
    if(!this.spriteFrames) return;

};

Window_CharacterSelect.AnimationSpeed = 25;
Window_CharacterSelect.prototype.setFrameFrame = function(index) {
    let w = this.frame_spritesheet.width / 2;
    let h = this.frame_spritesheet.height / 2;
    let frame = this.spriteFrames[index];
    if(this._index == index) {
        let cur = (Math.floor(this.timer / Window_CharacterSelect.AnimationSpeed) % 2);
        frame.setFrame(w * cur, 0, w, h);
    } else {
        frame.setFrame(0, h, w, h);
    }
};

Window_CharacterSelect.prototype.setCharFrame = function(index) {
    let charIndex = this.classInfo[index+1][this.pallette()].faceIndex;
    let w = this.char_spritesheet.width / 4;
    let h = this.char_spritesheet.height / 2;

    let hIndex = Math.floor(charIndex / 4) * h;
    let wIndex = Math.floor(charIndex % 4) * w;

    this.charSprites[index].setFrame(wIndex, hIndex, w, h);
};

Window_CharacterSelect.prototype.itemWidth = function() {
    return 90;
};

Window_CharacterSelect.prototype.itemHeight = function() {
    return 75;
};

Window_CharacterSelect.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();

    // We have such a wierd fucked up box
    if(index < 4) {
        rect.x = 40 + (rect.width + 5) * (index - 1)
        rect.y = Graphics.boxHeight - 1.5 * rect.height;
        // special top row
        if(index == 0) {
            rect.x = 5;
            rect.y = Graphics.boxHeight - 2.5 * rect.height;
        }
    } else {
        rect.x = Graphics.boxWidth - 40 - (rect.width + 5) * (4 - (index - 3));
        rect.y = Graphics.boxHeight - 1.5 * rect.height;
        // special top row
        if(index == 7) {
            rect.x = Graphics.boxWidth - rect.width - 5;
            rect.y = Graphics.boxHeight - 2.5 * rect.height;
        }
    }
    return rect;
};

Window_CharacterSelect.prototype.maxPageItems = () => 8;
Window_CharacterSelect.prototype.maxPageRows = () => 8;

Window_CharacterSelect.prototype._refreshAllParts = function() {
    //this._refreshBack();
    //this._refreshFrame();
    this.drawAllItems();
    this._refreshCursor();
    this._refreshContents();
    this._refreshArrows();
    this._refreshPauseSign();
    this._updateContents();
};

Window_CharacterSelect.prototype._refreshCursor = function() {
    this.refresh();
}

// Cursor movement this is a lot of lines for a little stupid thing
Window_CharacterSelect.prototype.cursorDown = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
        this.select((index + maxCols) % maxItems);
    }
};

Window_CharacterSelect.prototype.cursorUp = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (index >= maxCols || (wrap && maxCols === 1)) {
        this.select((index - maxCols + maxItems) % maxItems);
    }
};

Window_CharacterSelect.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
        this.select((index + 1) % maxItems);
    }
};

Window_CharacterSelect.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index > 0 || (wrap && this.isHorizontal()))) {
        this.select((index - 1 + maxItems) % maxItems);
    }
};

// do not allow scrolling
Window_CharacterSelect.prototype.cursorPagedown = function() {
   return;
};
Window_Selectable.prototype.cursorPageup = function() {
   return;
};
Window_Selectable.prototype.scrollDown = function() {
  return;
};
Window_Selectable.prototype.scrollUp = function() {
    return;
};

// ===========================================
// * Sprite_Select_Preview
// 
// This sprite definition exists for actor map sprites
// I could probably make it a global sprite since I figure Ill probably use it
// more than just here (already copied from snake) but I am lazy
// ===========================================
function Sprite_Select_Preview() {
    this.initialize.apply(this, arguments);
}

Sprite_Select_Preview.prototype = Object.create(Sprite_Base.prototype);
Sprite_Select_Preview.prototype.constructor = Sprite_Select_Preview;

Sprite_Select_Preview.prototype.initialize = function(actorIndex) {
    Sprite_Base.prototype.initialize.call(this);
    this._actorIndex = actorIndex;
    this._animation_timer = 0;
    this.dir = 0;

    this.setAnimation(this.dir);
}

Sprite_Select_Preview.speed = 1;
Sprite_Select_Preview.spinSpeed = 50;

Sprite_Select_Preview.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

    this.setAnimation(Math.floor(this._animation_timer / Sprite_Select_Preview.spinSpeed) % 4);

    this.updateAnimation();
}

Sprite_Select_Preview.prototype.setActor = function(id) {
    this._actorIndex = id;
    this.bitmap = ImageManager.loadCharacter(this.actor().characterName);
}

Sprite_Select_Preview.animationSpeed = 10;
Sprite_Select_Preview.animationFrames = 3;
Sprite_Select_Preview.animationTypes = 4;

Sprite_Select_Preview.prototype.updateAnimation = function() {
    this._animation_timer++;
    let cur = Math.floor(this._animation_timer / Sprite_Select_Preview.animationSpeed) % Sprite_Select_Preview.animationFrames; 
    this.setAnimationFrame(cur);
}

Sprite_Select_Preview.prototype.setAnimationFrame = function(frame) {
    let w = 48;
    let h = 48;
    this.setFrame((this.characterBlockX() + frame) * w, (this.characterBlockY() + this._animation_type) * h, w, h);
}

Sprite_Select_Preview.prototype.setAnimation = function(type) {
    if(this._animation_type != type) {
        this._animation_type = type;
        this.setAnimationFrame(this._animation_timer);
    }
}

Sprite_Select_Preview.prototype.actor = function() {
    return $dataActors[this._actorIndex];
};

Sprite_Select_Preview.prototype.characterBlockX = function() {
    var index = this.actor().characterIndex;
    return index % 4 * 3;
};

Sprite_Select_Preview.prototype.characterBlockY = function() {
    var index = this.actor().characterIndex;
    return Math.floor(index / 4) * 4;
};