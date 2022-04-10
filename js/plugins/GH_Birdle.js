/*:
 * @plugindesc (v1.0) Minigame based on the game flappy bird
 * @author contentdeleted
 *
 * @help  
 * =============================================================================
 * 
 * Basic implementation of a flappybird minigame 
 * Special thanks to moghunters theatrhythm game for serving as a template and guide on implementing minigames in RPGMaker MV
 * Maybe I'll make it customizable later but its flappy bird like theres not much going on.
 * 
 * =============================================================================
 * Before launching the plugin make sure to add the following images to your img folder
 *  
 *   /img/flappybird/player.png   -  The bird
 *   /img/flappybird/pipe.png     -  The pipes
 *   /img/flappybird/intro.png    -  Tutorial information
 *   /img/ flappybird/results.png -  Results screen
 * 
 * ============================================================================= 
 * To start minigame:
 * 
 *    Run the following command "flappybird"
 * 
 * simple as
 * ============================================================================= 
*/

var Imported = Imported || {};
Imported.GH_Birdle = true;

ImageManager.loadBirdleBitmap = function (filename) {
    return this.loadBitmap('img/birdle/', filename, 0, true);
};

ImageManager.loadBirdleTexture = function (filename) {
    var path = 'img/birdle/' + encodeURIComponent(filename) + '.png';
    return PIXI.Texture.from(path);
}

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

var ax_Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    ax_Game_Interpreter_prototype_pluginCommand.call(this, command, args)
    if (command === "birdle") {
        $gameSystem._birdle_start = true;
        this.wait(10);
    };
    return true;
};

//=============================================================================
// ** Scene Map
// * This is where we hook in the scene flag
//=============================================================================	

var ax_Scene_Map_prototype_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function () {
    ax_Scene_Map_prototype_update.call(this);
    if ($gameSystem._birdle_start) {
        this.execute_birdle();
    }
};

Scene_Map.prototype.execute_birdle = function () {
    $gameSystem._birdle_start = false;
    this.startFadeOut(this.fadeSpeed());
    $gameSystem.birdle();
};

//=============================================================================
// ** Game_System
//=============================================================================	

var ax_Game_System_prototype_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function () {
    ax_Game_System_prototype_initialize.call(this);
    this._birdle = false; // is it active
    this._birdle_start = false; // flag to activate
    this._birdle_phase = 0; // 0 -> start, 1 -> play, 2 -> results
};

Game_System.prototype.birdle = function () {
    // Maybe not important, but probably will cause issues if the party is dead for some reason
    if ($gameParty.battleMembers().length === 0) { return };
    SceneManager.push(Scene_Birdle);
};

//=============================================================================
// ** Scene_Birdle
// * This is the actual scene definition, its pretty straight forward
// * We have several phases, in this case intro, gameplay, and result
// * When results are finished the scene is pop'd off the scene manager stack 
// * and we go back to wherever it was called
//=============================================================================

function Scene_Birdle() {
    this.initialize.apply(this, arguments);
}

Scene_Birdle.prototype = Object.create(Scene_Base.prototype);
Scene_Birdle.prototype.constructor = Scene_Birdle;

Scene_Birdle.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);

    $gameSystem._birdle_start = false; // already started
    $gameSystem._birdle = true; // now active
    $gameSystem._birdle_phase = 0; // start phase
    this._phase_state = 0; // incremented at each point in a phase ie fade in -> wait for input -> fade out
    this._score = 0;

    BattleManager.saveBgmAndBgs();
    AudioManager.fadeOutBgm(2);
    AudioManager.stopBgs();

    this._battlers = $gameParty.battleMembers();

    this.createDisplayObjects();
    this.startFadeIn(60, false);
}

Scene_Birdle.prototype.load_images = function () {
    this._intro_img = ImageManager.loadBirdleBitmap("intro");
    this._results_img = ImageManager.loadBirdleBitmap("results");
    this._key_img = ImageManager.loadBirdleBitmap("key"); // keys
    this._tile_texture = ImageManager.loadBirdleTexture("tile");
    this._flipped_tile_texture = ImageManager.loadBirdleTexture("flipped_tile");
    this._not_found_img = ImageManager.loadBirdleBitmap("not_found");
}

Scene_Birdle.prototype.createDisplayObjects = function () {
    this.load_images();

    // These are basically needed for scene layout and dont have rendered images
    this._spriteField = new Sprite();
    this.addChild(this._spriteField);
    this._spriteHudBase = new Sprite();
    this.addChild(this._spriteHudBase);

    // Setup all sprites, the order matters for layers
    this.createBackgrounds();
    this.createTileSprite();
    this.createScoreText();
    this.createNotFoundSprite();
    this.createIntroSprite();
    this.createResultsSprite();
}

Scene_Birdle.prototype.createScoreText = function () {
    this._scoretext_sprite = new Sprite(new Bitmap(250, 48));
    this._scoretext_sprite.anchor.x = 0.5;
    this._scoretext_sprite.anchor.y = 0.5;
    this._scoretext_sprite.x = Graphics.boxWidth / 2 + 30;
    this._scoretext_sprite.y = 30;
    this._scoretext_sprite.bitmap.fontSize = 48;
    this._spriteHudBase.addChild(this._scoretext_sprite);
};

Scene_Birdle.prototype.createIntroSprite = function () {
    this._intro_sprite = new Sprite(this._intro_img);
    this._intro_sprite.anchor.x = 0.5;
    this._intro_sprite.anchor.y = 0.5;
    this._intro_sprite.opacity = 0;
    this._intro_sprite.x = Graphics.boxWidth / 2;
    this._intro_sprite.y = Graphics.boxHeight / 2;
    this._spriteHudBase.addChild(this._intro_sprite);
};

Scene_Birdle.prototype.createNotFoundSprite = function () {
    this._not_found_sprite = new Sprite(this._not_found_img);
    this._not_found_sprite.anchor.x = 0.5;
    this._not_found_sprite.anchor.y = 0.5;
    this._not_found_sprite.opacity = 0;
    this._not_found_sprite.x = Graphics.boxWidth / 2;
    this._not_found_sprite.y = Graphics.boxHeight / 2 - 20;
    this._spriteHudBase.addChild(this._not_found_sprite);
}

Scene_Birdle.prototype.createResultsSprite = function () {
    this._results_sprite = new Sprite(this._results_img);
    this._results_sprite.anchor.x = 0.5;
    this._results_sprite.anchor.y = 0.5;
    this._results_sprite.opacity = 0;
    this._results_sprite.x = Graphics.boxWidth / 2;
    this._results_sprite.y = Graphics.boxHeight / 2 - 20;
    this._spriteHudBase.addChild(this._results_sprite);
};

Scene_Birdle.prototype.createBackgrounds = function () {
    // create new sprite size of the screen
    this._back1Sprite = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
    this._back1Sprite.anchor.x = 0.5;
    this._back1Sprite.anchor.y = 0.5;

    // fill sprite with black
    let color = 'rgba(18, 18, 19, 1)';
    this._back1Sprite.bitmap.fillRect(0, 0, Graphics.boxWidth, Graphics.boxHeight, color);

    this._back1Sprite.x = Graphics.boxWidth / 2;
    this._back1Sprite.y = Graphics.boxHeight / 2;
    this._back1Sprite.opacity = 255;
    this._spriteField.addChild(this._back1Sprite);
};


Scene_Birdle.prototype.createTileSprite = function () {
    this._tile_manager = new Sprite_TileManager(this._flipped_tile_texture, this._tile_texture, this._key_img);
    this._tile_manager.anchor.x = 0.5;
    this._tile_manager.anchor.y = 0.5;
    this._spriteField.addChild(this._tile_manager);
};


Scene_Birdle.prototype.update = function () {
    Scene_Base.prototype.update.call(this);

    this.update_phase();
};

Scene_Birdle.prototype.update_phase = function () {
    switch ($gameSystem._birdle_phase) {
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

Scene_Birdle.prototype.update_start_phase = function () {

    switch (this._phase_state) {
        case 0:
            // set up intro sprite
            this._intro_sprite.opacity = 255;

            this._phase_state = 1;
            break;
        case 1:
            // wait for player input
            if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
                SoundManager.playCursor();
                this._phase_state = 2;
            }
            break;
        case 2:
            this._intro_sprite.opacity -= 3;
            if (this._intro_sprite.opacity <= 0) {
                $gameSystem._birdle_phase = 1;
                this._phase_state = 0;
                var bgm = {name: "Waddling Walz",  volume: 60,  pitch: 100,  pan: 0};
                AudioManager.playBgm(bgm);
            }
            break;
    };
};

Scene_Birdle.prototype.update_play_phase = function () {
    this._not_found_sprite._timer--;
    if(this._not_found_sprite.opacity > 0 && this._not_found_sprite._timer <= 0) {
        this._not_found_sprite.opacity-=10;
    }
}

Scene_Birdle.prototype.update_end_phase = function () {
    switch (this._phase_state) {
        case 0:
            this._results_sprite.opacity = 0;
            this._phase_state = 1;
            AudioManager.fadeOutBgm(1);
            break;
        case 1:
            this._results_sprite.opacity += 3;
            if (this._results_sprite.opacity >= 255) {

                this._phase_state = 2;
            }
            break;
        case 2:
            // turn on results
            this._results_sprite.opacity = 255;
            // TODO write score

            this._phase_state = 3;

            break;
        case 3:
            // wait for input
            if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
                SoundManager.playCursor();
                //BattleManager.playVictoryMe();
                // for (var i = 0; i < this._battlers.length; i++) {		
                //    this._battlers[i].performVictory();
                //}
                this._phase_state = 4;
            }
            break;
        case 4:
            // probably set a game variable with the score
            // this.gain_rewards();
            this.fadeOutAll();
            SceneManager.pop();
            $gameSystem._birdle_phase = 4;
            break;
    };
};

Scene_Birdle.prototype.terminate = function () {
    Scene_Base.prototype.terminate.call(this);
    BattleManager.replayBgmAndBgs();
    $gameSystem._birdle = false;
};


// ===========================================
// * Sprite_TileManager - 
// * 
// * 
// ===========================================
function Sprite_TileManager() {
    this.initialize.apply(this, arguments);
}

Sprite_TileManager.prototype = Object.create(Sprite_Base.prototype);
Sprite_TileManager.prototype.constructor = Sprite_TileManager;

Sprite_TileManager.prototype.initialize = function (flipped_img, img, key_img) {
    Sprite_Base.prototype.initialize.call(this);

    this.unflipped_img = img;
    this.flipped_img = flipped_img;

    this._flip_timer = 0;

    this._current_row = 0;

    this._previous_guessed_letters = {};

    this.MaxGuesses = 6;
    this.Letters = 5;
    this._rows = [];
    this._letters = [];

    this._answer = Sprite_TileManager.birdNames[GameHam.randomIntFromInterval(0, Sprite_TileManager.birdNames.length - 1)].toUpperCase();

    for (let i = 0; i < this.MaxGuesses; i++) {
        this._rows[i] = [];
        for (let j = 0; j < this.Letters; j++) {
            let tile = new PIXI.projection.Sprite3d(img);
            tile.flipped = false;
            tile.anchor.set(0.5, 0.5);
            tile.position.x = Graphics.boxWidth / 2 + (j - this.Letters / 2) * 64 + 30;
            tile.position.y = Graphics.boxHeight / 2 + (i - this.MaxGuesses / 2) * 64 - 50;
            tile.proj.affine = PIXI.projection.AFFINE.FREE;
            
            tile._text_sprite = new Sprite(new Bitmap(64, 64));
            tile._text_sprite.anchor.x = 0.5;
            tile._text_sprite.anchor.y = 0.5;
            tile._text_sprite.x = 0
            tile._text_sprite.y = 0;
            tile._text_sprite.bitmap.fontSize = 32;
            
            tile.addChild(tile._text_sprite);

            this.addChild(tile);

            this._rows[i][j] = tile;
        }
    }

    let qwerty = [['q','w','e','r','t','y','u','i','o','p'],
                    ['a','s','d','f','g','h','j','k','l'],
                       ['z','x','c','v','b','n','m']];

    // create keyboard
    this._keyboard = {};
    for(let i = 0; i < qwerty.length; i++) {
        for(let j = 0; j < qwerty[i].length; j++) {
            let letter = qwerty[i][j];
            
            let key = new Sprite(key_img);
            key.position.x = Graphics.boxWidth / 2 + (j - qwerty[i].length / 2) * 35 + 15;
            key.position.y = Graphics.boxHeight * (6/8) + i * 45 + 20;
            key.anchor.set(0.5, 0.5);
            
            key._text_sprite = new Sprite(new Bitmap(30, 30));
            key._text_sprite.anchor.set(0.5, 0.5);
            key._text_sprite.x = 0
            key._text_sprite.y = 0;
            key._text_sprite.bitmap.fontSize = 16;

            key._text_sprite.bitmap.clear();
            key._text_sprite.bitmap.drawText(letter, 0, 0, 30, 30, "center");
            
            key.addChild(key._text_sprite);

            this.addChild(key);
            this._keyboard[letter.toUpperCase()] = key;
        }
    }
};

  // Key codes from
  // https://msdn.microsoft.com/en-us/library/dd375731(v=VS.85).aspx
/*  ourMap =  { // This is only needed if Qinput isnt on
    14: '0E',
    8: 'backspace', 9: 'tab', 13: 'enter', 16: 'shift', 17: 'ctrl', 18: 'alt',
    27: 'esc', 32: 'space', 33: 'pageup', 34: 'pagedown', 37: 'left',
    38: 'up', 39: 'right', 40: 'down', 45: 'escape',
    48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6',
    55: '7', 56: '8', 57: '9',
    96: 'num0', 97: 'num1', 98: 'num2', 99: 'num3', 100: 'num4',
    101: 'num5', 102: 'num6', 103: 'num7', 104: 'num8', 105: 'num9',
    65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g',
    72: 'h', 73: 'i', 74: 'j', 75: 'k', 76: 'l', 77: 'm', 78: 'n',
    79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u',
    86: 'v', 87: 'w', 88: 'x', 89: 'y', 90: 'z',
    112: 'f1', 113: 'f2', 114: 'f3', 115: 'f4', 116: 'f5', 117: 'f6',
    118: 'f7', 119: 'f8', 120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12',
    186: 'semicolon', 187: 'equal', 188: 'comma', 189: 'minus', 190: 'period',
    191: 'slash', 192: 'grave', 219: 'openbracket', 220: 'backslash',
    221: 'closedbracket', 222: 'singlequote'
  }; 

Object.assign(ourMap, Input.keyMapper);
Input.keyMapper = ourMap;
*/

Sprite_TileManager.flipTimerMax = 20;
Sprite_TileManager.prototype.update = function () {
    Sprite_Base.prototype.update.call(this);

    // only update during gameplay phase
    if ($gameSystem._birdle_phase !== 1) return;

    // checking doesnt do anything else
    if(this._checking) {
        this.checkLetters();
        return;
    }

    // update tiles
    for (let i = 0; i < this.MaxGuesses; i++) {
        for (let j = 0; j < this.Letters; j++) {
            let tile = this._rows[i][j];

            if(tile.scale.x > 1) {
                tile.scale.x -= 0.01;
                tile.scale.y -= 0.01;
            }
        }
    }

    // update keys
    for(let i = 0; i < 26; i++) {
        let chr = String.fromCharCode(97 + i);
        if(Input.isTriggered('#'+chr)) {
            this.addLetter(chr.toUpperCase());
            break;
        }
    }

    if(Input.isTriggered("#backspace")) {
        this.removeLetter();
    }

    if(Input.isTriggered("#enter")) {
        if(this._letters.length == this.Letters) {
            if(Sprite_TileManager.birdNames.contains(this._letters.join("").toUpperCase())) {
                // do the wordle thing
                this._checking = true;
                this._flip_timer = Sprite_TileManager.flipTimerMax;
                this.check_pointer = 0;
            } else {
                // shake the screen 
                // print a message
                SceneManager._scene._not_found_sprite.opacity = 255;
                SceneManager._scene._not_found_sprite._timer = 30;
            }
        } else {
            // print message 
        }
    }

};

Sprite_TileManager.prototype.addLetter = function (letter) {
    if(this._letters.length < this.Letters) {
        this._letters.push(letter);
        this.updateCurrentRow();
        let curLetter = this._rows[this._current_row][this._letters.length - 1];
        curLetter.scale.x = 1.1;
        curLetter.scale.y = 1.1;
    } else {
        // print message 
    }
}

Sprite_TileManager.prototype.removeLetter = function (letter) {
    if(this._letters.length > 0) {
        this._letters.pop();
        this.updateCurrentRow();
    } else {
        // print message 
    }
}

Sprite_TileManager.prototype.updateCurrentRow = function () {
    for (let j = 0; j < this.Letters; j++) {
        let tile = this._rows[this._current_row][j];

        let letter = this._letters[j] || "";

        tile._text_sprite.bitmap.clear();
        tile._text_sprite.bitmap.drawText(letter, 0, 0, 64, 64, "center");
    }
}

Sprite_TileManager.tints = [
    0x3a3a3c, // gray
    0xb59f3b, // yellow
    0x538d4e, // green
];

// helper function that takes an array and an item and 
// returns the amount of times that item appears in the array
Sprite_TileManager.prototype._count_entries = function (arr, item) {
    return arr.filter(x => x === item).length;
}

Sprite_TileManager.prototype.checkLetters = function () {
    let tile = this._rows[this._current_row][this.check_pointer];
    if(this._flip_timer > 0) {
        this._flip_timer--;
        tile.euler.x = 2 * Math.PI * (this._flip_timer / Sprite_TileManager.flipTimerMax);
        if(tile.flipped == false && this._flip_timer < Sprite_TileManager.flipTimerMax) {
            let letter = this._letters[this.check_pointer];
            let answer = [...this._answer];
            tile.flipped = true;
            let correctness = 0; // 0 -> gray , 1 -> yellow, 2 -> green
            if(letter == answer[this.check_pointer]) {
                correctness = 2;
            } else {
                // This bat shit thing fixes the edge case of having two letters in your guess and only one in the answer but your second guess letter is correct
                
                // check the count of the letter up to and including this point
                let prev_count = this._count_entries(this._letters.slice(0, this.check_pointer), letter);
                // check the count of the letter up to and including this point
                let look_ahead = this._count_entries(answer.filter((l, i) => this._letters[i] != l), letter);
                if(answer.contains(letter) 
                   && (look_ahead > 0 && prev_count < look_ahead)
                    ) {
                    correctness = 1;
                }
            }

            tile.tint = Sprite_TileManager.tints[correctness];
            tile._texture = this.flipped_img;

            // cache the guess
            this._previous_guessed_letters[letter] = Math.max(
                this._previous_guessed_letters[letter] || 0, // default
                correctness
            );

            this._keyboard[letter].tint = Sprite_TileManager.tints[this._previous_guessed_letters[letter]] + 0x444444;
        }
    } else {
        this._flip_timer = Sprite_TileManager.flipTimerMax;
        this.check_pointer++;
        if(this.check_pointer >= this.Letters) {
            if(this.checkWord(this._letters, this._answer)) {
                // end the game
                $gameSystem._birdle_phase = 2;
                
                // Update score
                SceneManager._scene._score = this.MaxGuesses - this.check_pointer;
            }
            this._checking = false;
            this._letters = [];
            this._current_row++;

            if(this._current_row >= this.MaxGuesses) {
                // end the game
                $gameSystem._birdle_phase = 2;
                
                // Update score
                SceneManager._scene._score = 0;

                // draw the answer
                SceneManager._scene._scoretext_sprite.bitmap.clear();
                SceneManager._scene._scoretext_sprite.bitmap.drawText(this._answer, 0, 0, 100, 48, "right");
            }
        }
    }
}

Sprite_TileManager.prototype.checkWord = function (letters, word) {
    let wrd = letters.join("");
    return wrd.toUpperCase() === word.toUpperCase();
}

Sprite_TileManager.birdNames = ["Booby",
    "Brant",
    "Crake",
    "Crane",
    "Diver",
    "Eagle",
    "Egret",
    "Eider",
    "Finch",
    "Galah",
    "Goose",
    "Grebe",
    "Heron",
    "Hobby",
    "Homer",
    "Junco",
    "Macaw",
    "Merle",
    "Miner",
    "Munia",
    "Mynah",
    "Noddy",
    "Ousel",
    "Ouzel",
    "Owlet",
    "Pewit",
    "Pipit",
    "Pitta",
    "Prion",
    "Quail",
    "Raven",
    "Robin",
    "Saker",
    "Scaup",
    "Serin",
    "Snipe",
    "Stilt",
    "Stork",
    "Swift",
    "Twite",
    "Veery",
    "Vireo"].map(x => x.toUpperCase());