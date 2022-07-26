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
    this.createWikiSprite();
    this.createTitle();
    this.createSupports();
    this.createPortraits();
    this.createShadow();
    this.createWindowLayer();
    this.createWindow();
}

Scene_CharacterSelect.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite(this._BG_img);
    this.addChild(this._backgroundSprite);
}

Scene_CharacterSelect.prototype.createWindow = function() {
    this.characterSelectWindow = new Window_CharacterSelect(this._portsmall_img, this._char_sheet, this._portraits, this.wikiSprite);
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


Scene_CharacterSelect.prototype.createShadow = function() {
    this.shadowSprite = new Sprite(this._shadow_img);
    this.shadowSprite.anchor.x = 0.5;
    this.shadowSprite.anchor.y = 0.5;
    this.shadowSprite.x = Graphics.boxWidth / 2;
    this.shadowSprite.y = Graphics.boxHeight - Scene_CharacterSelect.previewSpinHeight + 30;
    this.addChild(this.shadowSprite);
};

Scene_CharacterSelect.prototype.createWikiSprite = function() {
    this.wikiSprite = new Sprite(new Bitmap(700, 250));
    this.wikiSprite.anchor.x = 0.5;
    this.wikiSprite.anchor.y = 0.5;
    this.wikiSprite.x = Graphics.boxWidth / 2;
    this.wikiSprite.y = Graphics.boxHeight - Scene_CharacterSelect.previewSpinHeight + 20;
    this.wikiSprite.bitmap.sfont = VictorEngine.SFont.getSFont(62);
    this.addChild(this.wikiSprite);
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

// how far from the bottom does the spin live
Scene_CharacterSelect.previewSpinHeight = 100;

Window_CharacterSelect.prototype.initialize = function(frame_spritesheet, char_spritesheet, big_portraits, wikisprite) {
    Window_Selectable.prototype.initialize.call(this);

    this.width = Graphics.boxWidth;
    this.height = Graphics.boxHeight;

    this.frame_spritesheet = frame_spritesheet;
    this.char_spritesheet = char_spritesheet;
    this.big_portraits = big_portraits;
    this.wikiSprite = wikisprite;

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
    this.previewSprite.y = Graphics.boxHeight - Scene_CharacterSelect.previewSpinHeight;
    this.addChild(this.previewSprite);

    this.nameSprite = new Sprite(new Bitmap(300, 48));
    this.nameSprite.anchor.x = 0.5;
    this.nameSprite.anchor.y = 0.5;
    this.nameSprite.x = Graphics.boxWidth / 2;
    this.nameSprite.y = Graphics.boxHeight - Scene_CharacterSelect.previewSpinHeight - 45;
    this.nameSprite.bitmap.sfont = VictorEngine.SFont.defaultSFont();
    this.addChild(this.nameSprite);

    this.setHandler('ok',     this.onOk.bind(this));
    this.setHandler('cancel', this.onCancel.bind(this));

    this.partyIndex = 0; // which party member are you currently selecting
    this.timer = 0;
    this._pallette = 0;

    // sort children to put port under the mouse
    this.children.sort((a, b) => Number(b.is_port || 0) - Number(a.is_port || 0));

    this.selectedActors = [];

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
    this.selectedActors.push(this.curActorInfo());
    if(this.partyIndex < 2) {
        this.partyIndex++;
        let cur = this._index; // stay on same box
        this.updateBigPortraits();
        this.start();
        this.select(cur);
    } else {
        // Start the game
        $gameParty._actors = [];
        for(let i = 0; i < this.selectedActors.length; i++){
            $gameParty.addActor(this.selectedActors[i].id);
        }

        SceneManager.goto(Scene_Map);
        
        // Set steps to prevent cyoa at start
        $gameVariables.setValue(22, -1);

        // Maybe dont hard code these?
        $gamePlayer.reserveTransfer(7, 19, 4);
    }
}

Window_CharacterSelect.prototype.onCancel = function() {
    this.selectedActors.pop();
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

    this.drawText();
};

Window_CharacterSelect.prototype.drawText = function() {
    this.nameSprite.bitmap.clear();
    this.nameSprite.bitmap.drawText(this.curActorInfo().name.toUpperCase(), 0, 0, this.nameSprite.bitmap.width, this.nameSprite.bitmap.height, "center");

    let wikiText = Window_Selectable.wikipediaText[this._index];
    this.wikiSprite.bitmap.clear();
    let y = -this.wikiSprite.bitmap.height / 2;
    for(let i = 0; i < wikiText.length; i++) {
        this.wikiSprite.bitmap.drawText(wikiText[i], 0, y, this.wikiSprite.bitmap.width, this.wikiSprite.bitmap.height, "center");
        if( Math.floor(this.timer % 10) == 0 ) {
            if( i % 2 == 0) {
                let arr = wikiText[i].split("");
                let f = arr.shift();
                arr.push(f);
                wikiText[i] = arr.join("");
            } else {
                let arr = wikiText[i].split("");
                let f = arr.pop();
                wikiText[i] = f + arr.join("");
            }
        }
        y += 24;
    }
}
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

    this.select((index + 1) % maxItems);
};

Window_CharacterSelect.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    
    this.select((index - 1 + maxItems) % maxItems);
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


// And here is the fucking wikipedia text dear lord
Window_Selectable.wikipediaText = [
    // pigeon
    "The domestic pigeon (Columba livia domestica) is a pigeon subspecies that was derived from the rock dove (also called the rock pigeon). The rock pigeon is the world's oldest domesticated bird, Mesopotamian cuneiform tablets mention the domestication of pigeons more than 5,000 years ago, as do Egyptian hieroglyphics [2] Research suggests that domestication of pigeons occurred as early as 10,000 years ago.[2] Pigeons have made contributions of considerable importance to humanity, especially in times of war.[3] In war the homing ability of pigeons has been put to use by making them messengers. So-called war pigeons have carried many vital messages and some have been decorated for their services. Medals such as the Croix de Guerre, awarded to Cher Ami, and the Dickin Medal awarded to the pigeons GI Joe and Paddy, amongst 32 others, have been awarded to pigeons for their services in saving human lives. Despite this, city pigeons today are seen as pests, mainly due to their droppings. Feral pigeons are considered invasive in many parts of the world, though they have a positive impact on wild bird populations, serving as an important prey species of birds of prey. [3][4] ",
    // seagull
    "Gulls, or colloquially seagulls, are seabirds of the family Laridae in the suborder Lari. They are most closely related to the terns and skimmers and only distantly related to auks, and even more distantly to waders. Until the 21st century, most gulls were placed in the genus Larus, but that arrangement is now considered polyphyletic, leading to the resurrection of several genera.[1] An older name for gulls is mews, which is cognate with German Möwe, Danish måge, Swedish mås, Dutch meeuw, Norwegian måke/måse and French mouette, and can still be found in certain regional dialects.[2][3][4]Gulls nest in large, densely packed, noisy colonies, they lay two or three speckled eggs in nests composed of vegetation, the young are precocial, born with dark mottled down and mobile upon hatching.[7] Gulls are resourceful, inquisitive, and intelligent, the larger species in particular,[8] demonstrating complex methods of communication and a highly developed social structure. For example, many gull colonies display mobbing behavior, attacking and harassing predators and other intruders.[9] Certain species have exhibited tool-use behavior, such as the herring gull, using pieces of bread as bait with which to catch goldfish, for example.[10] Many species of gulls have learned to coexist successfully with humans and have thrived in human habitats [11] Others rely on kleptoparasitism to get their food. Gulls have been observed preying on live whales, landing on the whale as it surfaces to peck out pieces of flesh.[12]",
    // raven
    "The common raven (Corvus corax), also known as the western raven or northern raven when discussing the raven at the subspecies level, is a large all-black passerine bird. Found across the Northern Hemisphere, it is the most widely distributed of all corvids, there are at least eight subspecies with little variation in appearance, although recent research has demonstrated significant genetic differences among populations from various regions. It is one of the two largest corvids, alongside the thick-billed raven, and is possibly the heaviest passerine bird; at maturity, the common raven averages 63 centimetres (25 inches) in length and 1,2 kilograms (2,6 pounds) in mass. Although their typical lifespan is considerably shorter, common ravens can live more than 23 years in the wild; Young birds may travel in flocks but later mate for life, with each mated pair defending a territory. Common ravens have coexisted with humans for thousands of years and in some areas have been so numerous that people have regarded them as pests. Part of their success as a species is due to their omnivorous diet: they are extremely versatile and opportunistic in finding sources of nutrition, feeding on carrion, insects, cereal grains, berries, fruit, small animals, nesting birds, and food waste.Some notable feats of problem-solving provide evidence that the common raven is unusually intelligent. Over the centuries, it has been the subject of mythology, folklore, art, and literature. In many cultures, including the indigenous cultures of Scandinavia, ancient Ireland and Wales, Bhutan, the northwest coast of North America, and Siberia and northeast Asia, the common raven has been revered as a spiritual figure or godlike creature. ",
    // vulture
    "A vulture is a bird of prey that scavenges on carrion. There are 23 extant species of vulture (including Condors).[2] Old World vultures include 16 living species native to Europe, Africa, and Asia; New World vultures are restricted to North and South America and consist of seven identified species, all belonging to the Cathartidae family.[2][3] A particular characteristic of many vultures is a bald, unfeathered head. This bare skin is thought to keep the head clean when feeding, and also plays an important role in thermoregulation.[4] Vultures have been observed to hunch their bodies and tuck in their heads in the cold, and open their wings and stretch their necks in the heat. They also urinate on themselves as a means of cooling their bodies.[5] A group of vultures in flight is called a 'kettle', while the term 'committee' refers to a group of vultures resting on the ground or in trees. A group of vultures that are feeding is termed a 'wake'.[6] ",
    // turkey
    "The turkey is a large bird in the genus Meleagris, native to North America. There are two extant turkey species: the wild turkey (Meleagris gallopavo) of eastern and central North America and the ocellated turkey (Meleagris ocellata) of the Yucatán Peninsula in Mexico. Males of both turkey species have a distinctive fleshy wattle, called a snood, that hangs from the top of the beak. They are among the largest birds in their ranges. As with many large ground-feeding birds (order Galliformes), the male is bigger and much more colorful than the female. A male ocellated turkey (Meleagris ocellata) with a blue head The earliest turkeys evolved in North America over 20 million years ago. They share a recent common ancestor with grouse, pheasants, and other fowl. The wild turkey species is the ancestor of the domestic turkey, which was domesticated approximately 2,000 years ago. ",
    // parrot
    "Parrots, also known as psittacines (/ˈsɪtəsaɪnz/),[1][2] are birds of the roughly 398 species[3] in 92 genera comprising the order Psittaciformes (/ˈsɪtəsɪfɔːrmiːz/), found mostly in tropical and subtropical regions. Parrots, along with ravens, crows, jays, and magpies, are among the most intelligent birds, and the ability of some species to imitate human speech enhances their popularity as pets. Trapping wild parrots for the pet trade, as well as hunting, habitat loss, and competition from invasive species, has diminished wild populations, with parrots being subjected to more exploitation than any other group of birds. As of 2021, about 50 million parrots (half of all parrots) live in captivity, with the vast majority of these living as pets in people's homes.[5] Measures taken to conserve the habitats of some high-profile charismatic species have also protected many of the less charismatic species living in the same ecosystems. Parrots are the only creatures that display true tripedalism, using their necks and beaks as limbs with propulsive forces equal to or greater than those forces generated by the forelimbs of primates when climbing vertical surfaces. They can travel with cyclical tripedal gaits when climbing.[6] ",
    // penguin
    "Penguins (order Sphenisciformes /sfɪˈnɪsɪfɔːrmiːz/, family Spheniscidae /sfɪˈnɪsɪdiː/) are a group of aquatic flightless birds. They live almost exclusively in the Southern Hemisphere: only one species, the Galápagos penguin, is found north of the Equator. Highly adapted for life in the water, penguins have countershaded dark and white plumage and flippers for swimming. Most penguins feed on krill, fish, squid and other forms of sea life which they catch with their bills and swallow it whole while swimming. A penguin has a spiny tongue and powerful jaws to grip slippery prey.[4] They spend roughly half of their lives on land and the other half in the sea. The largest living species is the Emperor penguin (Aptenodytes forsteri):[5] on average, adults are about 1.1 m (3 ft 7 in) tall and weigh 35 kg (77 lb). The smallest penguin species is the little blue penguin (Eudyptula minor), also known as the fairy penguin, which stands around 33 cm (13 in) tall and weighs 1 kg (2.2 lb).[6] Today, larger penguins generally inhabit colder regions, and smaller penguins inhabit regions with temperate or tropical climates. Some prehistoric penguin species were enormous: as tall or heavy as an adult human. There was a great diversity of species in subantarctic regions, and at least one giant species in a region around 2,000 km south of the equator 35 mya, in a climate decidedly warmer than today.[which?] ",
    // cassowary
    "Casuarius is a genus of birds in the order Casuariiformes, whose members are the cassowaries (Tok Pisin: muruk, Indonesian: kasuari). It is classified as a ratite (flightless bird without a keel on its sternum bone) and is native to the tropical forests of New Guinea (Papua New Guinea and Indonesia), Aru Islands (Indonesia), and northeastern Australia.[3] Three species are extant: The most common, the southern cassowary, is the third-tallest and second-heaviest living bird, smaller only than the ostrich and emu. The other two species are represented by the northern cassowary and the dwarf cassowary. A fourth but extinct species is represented by the pygmy cassowary. Cassowaries feed mainly on fruit, although all species are truly omnivorous and take a range of other plant foods, including shoots and grass seeds, in addition to fungi, invertebrates, and small vertebrates. Cassowaries are very wary of humans, but if provoked, they are capable of inflicting serious, even fatal, injuries to both dogs and people. The cassowary has often been labeled \"the world's most dangerous bird\".[4] ",
].map(x => x.split("."));

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