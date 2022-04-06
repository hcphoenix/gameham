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
Imported.GH_Nasu = true;

ImageManager.loadNasu = function(filename) {
    return this.loadBitmap('img/nasu/', filename, 0, true);
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

var an_Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	an_Game_Interpreter_prototype_pluginCommand.call(this,command, args)
	if (command === "nasu")  {
        $gameSystem._nasu_start = true;
        this.wait(10);
    };	
	return true;
};

//=============================================================================
// ** Scene Map
// * This is where we hook in the scene flag
//=============================================================================	

var an_Scene_Map_prototype_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function() {
	an_Scene_Map_prototype_update.call(this);
	if ($gameSystem._nasu_start) {
        this.execute_nasu();
    }
};

Scene_Map.prototype.execute_nasu = function() {
    $gameSystem._nasu_start = false;
    this.startFadeOut(this.fadeSpeed());
    $gameSystem.nasu();
};

//=============================================================================
// ** Game_System
//=============================================================================	

var an_Game_System_prototype_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
    an_Game_System_prototype_initialize.call(this);	
	this._nasu = false; // is it active
	this._nasu_start = false; // flag to activate
	this._nasu_phase = 0; // 0 -> start, 1 -> play, 2 -> results
};

Game_System.prototype.nasu = function() {
    // Maybe not important, but probably will cause issues if the party is dead for some reason
	if ($gameParty.battleMembers().length === 0) {return};
    SceneManager.push(Scene_Nasu);
};

//=============================================================================
// ** Scene_Nasu
// * This is the actual scene definition, its pretty straight forward
// * We have several phases, in this case intro, gameplay, and result
// * When results are finished the scene is pop'd off the scene manager stack 
// * and we go back to wherever it was called
//=============================================================================

function Scene_Nasu() {
    this.initialize.apply(this, arguments);
}

Scene_Nasu.prototype = Object.create(Scene_Base.prototype);
Scene_Nasu.prototype.constructor = Scene_Nasu;

Scene_Nasu.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);	
     
    $gameSystem._nasu_start = false; // already started
    $gameSystem._nasu = true; // now active
    $gameSystem._nasu_phase = 0; // start phase
    this._phase_state = 0; // incremented at each point in a phase ie fade in -> wait for input -> fade out
    this._scroll_speed = 3;
    this._score = 0;

    BattleManager.saveBgmAndBgs();
	AudioManager.fadeOutBgm(2);
	AudioManager.stopBgs();

    this._battlers = $gameParty.battleMembers();

    this.createDisplayObjects();
    this.startFadeIn(60, false);
}

Scene_Nasu.prototype.load_images = function() {
    this._intro_img = ImageManager.loadNasu("intro");
    this._results_img = ImageManager.loadNasu("results");
    this._player_img = ImageManager.loadNasu("player");
    this._eggplant_img = ImageManager.loadNasu("eggplant");
    this._background_img = ImageManager.loadNasu("background_1");
    this._background_img_2 = ImageManager.loadNasu("background_2");
    this._border_img = ImageManager.loadNasu("border");
    this._game_text_img = ImageManager.loadNasu("gametext");
}

Scene_Nasu.prototype.createDisplayObjects = function() {
    this.load_images();

    // These are basically needed for scene layout and dont have rendered images
    this._spriteField = new Sprite();	
	this.addChild(this._spriteField);
	this._spriteHudBase = new Sprite();
	this.addChild(this._spriteHudBase);

    // Setup all sprites, the order matters for layers
    this.createBackgrounds();
    this.createEggplantSprite();
    this.createPlayerSprite();
    this.createScoreText();
    this.createIntroSprite();
    this.createResultsSprite();
    this.createDarkEffectSprite();
    this.createBorderSprite();
    this.createGameTextSprite();
}

Scene_Nasu.prototype.createScoreText = function() {	
    this._scoretext_sprite = new Sprite(new Bitmap(250,48));
    this._scoretext_sprite.anchor.x = 0.5;
    this._scoretext_sprite.anchor.y = 0.5; 
    this._scoretext_sprite.x = Graphics.boxWidth / 2 + 48;
    this._scoretext_sprite.y = 30;
    this._scoretext_sprite.bitmap.fontSize = 48;
    this._spriteHudBase.addChild(this._scoretext_sprite);
};

Scene_Nasu.prototype.createIntroSprite = function() {	
    this._intro_sprite = new Sprite(this._intro_img);
    this._intro_sprite.anchor.x = 0.5;
    this._intro_sprite.anchor.y = 0.5;
    this._intro_sprite.opacity = 0;
    this._intro_sprite.x = Graphics.boxWidth / 2;
	this._intro_sprite.y = Graphics.boxHeight / 2 - 20;
    this._spriteHudBase.addChild(this._intro_sprite);	
};

Scene_Nasu.prototype.createResultsSprite = function() {	
    this._results_sprite = new Sprite(this._results_img);
    this._results_sprite.anchor.x = 0.5;
    this._results_sprite.anchor.y = 0.5;
    this._results_sprite.opacity = 0;
    this._results_sprite.x = Graphics.boxWidth / 2;
	this._results_sprite.y = Graphics.boxHeight / 2 - 20;
    this._spriteHudBase.addChild(this._results_sprite);	
};

Scene_Nasu.prototype.createDarkEffectSprite = function() {	
    // create new sprite size of the screen
    this._dark_effect_sprite = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
    this._dark_effect_sprite.anchor.x = 0.5;
    this._dark_effect_sprite.anchor.y = 0.5;

    // fill sprite with black
    let color = 'rgba(0, 0, 0, 1)';
    this._dark_effect_sprite.bitmap.fillRect(0, 0, Graphics.boxWidth, Graphics.boxHeight, color);
    
    this._dark_effect_sprite.x = Graphics.boxWidth / 2;
	this._dark_effect_sprite.y = Graphics.boxHeight / 2;
    this._dark_effect_sprite.opacity = 0;
    this._spriteHudBase.addChild(this._dark_effect_sprite);
};

Scene_Nasu.prototype.createBackgrounds = function() {
    this._back1Sprite = new Sprite(this._background_img);
    this._back1Sprite.anchor.x = 0.5;
    this._back1Sprite.anchor.y = 0.5;
	this._back1Sprite.x = Graphics.boxWidth / 2;
	this._back1Sprite.y = Graphics.boxHeight / 2 - 20;
	this._spriteField.addChild(this._back1Sprite);

    this._back2Sprite = new Sprite(this._background_img_2);
    this._back2Sprite.anchor.x = 0.5;
    this._back2Sprite.anchor.y = 0.5;
	this._back2Sprite.x = Graphics.boxWidth / 2;
	this._back2Sprite.y = Graphics.boxHeight / 2 - 20;
	this._back2Sprite.opacity = 0;
    this._spriteField.addChild(this._back2Sprite);
};

Scene_Nasu.prototype.createBorderSprite = function() {	
    this._border_sprite = new Sprite(this._border_img);

    this._border_sprite.anchor.x = 0.5;
    this._border_sprite.anchor.y = 0.5;
    this._border_sprite.x = Graphics.boxWidth / 2;
	this._border_sprite.y = Graphics.boxHeight / 2;
    this._spriteHudBase.addChild(this._border_sprite);	
};

Scene_Nasu.prototype.setGameTextSprite = function(frame) {
    let h = this._gametext_sprite._bitmap.height / 3;
    this._gametext_sprite.setFrame(0, frame * h, this._gametext_sprite._bitmap.width, h);
}

Scene_Nasu.prototype.createGameTextSprite = function() {	
    this._gametext_sprite = new Sprite(this._game_text_img);

    this._gametext_sprite.anchor.x = 0.5;
    this._gametext_sprite.anchor.y = 0.5;
    this._gametext_sprite.x = Graphics.boxWidth / 2;
	this._gametext_sprite.y = Graphics.boxHeight / 2 - 20;
    this._spriteHudBase.addChild(this._gametext_sprite);	
};



Scene_Nasu.groundY = 420;  //const for where the ground is
Scene_Nasu.prototype.createPlayerSprite = function() {	
    this._player_sprite = new Scene_NasuPlayer();
    this._player_sprite.opacity = 255;
    this._player_sprite.bitmap = this._player_img;
    this._player_sprite.anchor.x = 0.5;
    this._player_sprite.anchor.y = 0.5; 
    this._player_sprite.x = Graphics.boxWidth / 2;
    this._player_sprite.y = Scene_Nasu.groundY;
    this._spriteField.addChild(this._player_sprite);
};

Scene_Nasu.prototype.createEggplantSprite = function() {	
    this._eggplant_manager = new Sprite_NasuEggplantManager(this._scroll_speed, this._eggplant_img);
    this._eggplant_manager.anchor.x = 0.5;
    this._eggplant_manager.anchor.y = 0.5;
    this._spriteField.addChild(this._eggplant_manager);
};


Scene_Nasu.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    
	this.update_phase();
};

Scene_Nasu.prototype.update_phase = function() {
    switch ($gameSystem._nasu_phase) {
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

Scene_Nasu.prototype.update_start_phase = function() {
    if(this._player_sprite._bitmap._loadingState == "loaded") {
        this._player_sprite.setAnimation(0);
    }
    switch (this._phase_state) {
		case 0:
            // set up intro sprite
            this._intro_sprite.opacity = 255;
            this._gametext_sprite.opacity = 0;
			this._phase_state = 1;
     	    break;
		case 1:
            // wait for player input
		    if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
				SoundManager.playCursor();
                this._phase_state = 2;
                
                // fade out intro sprite
                this._intro_sprite.opacity = 0;
                // turn on gametex sprite to ready
                this.setGameTextSprite(0);
                this._gametext_sprite.opacity = 255;
                this._gametext_sprite._timer_count = 0;
                // turn on dark sprite
                this._dark_effect_sprite.opacity = 255;
                this._phase_state = 2;
            }
		    break; 	
		case 2:
            this._gametext_sprite._timer_count++;
            if(this._gametext_sprite._timer_count > 60) {
                this._gametext_sprite._timer_count = 0;

                // no dark
                this._dark_effect_sprite.opacity = 0;
                
                // Start!
                this.setGameTextSprite(1);

                $gameSystem._nasu_phase = 1;
                this._phase_state = 0;		

                // probably want this to be custom music
                BattleManager.playBattleBgm();
            }
		    break;
	};
};

Scene_Nasu.prototype.update_play_phase = function() {
    // Update score
    this._scoretext_sprite.bitmap.clear();
    this._scoretext_sprite.bitmap.drawText(this._score,0,0,100,48,"right");

    // while game text sprite is active at the start
    if(this._gametext_sprite.opacity > 0) {
        this._gametext_sprite._timer_count++;
        if(this._gametext_sprite._timer_count > 60) {
            this._gametext_sprite._timer_count = 0;
            this._gametext_sprite.opacity = 0;
        }
    }
}

Scene_Nasu.prototype.update_end_phase = function() {
    switch (this._phase_state) {
        case 0:
            this._back2Sprite._timer_count = 0;
            this._back2Sprite._flash_count = 0;
            this._back2Sprite.opacity = 255;
            this._phase_state = 1;
            AudioManager.fadeOutBgm(1);
            break;
        case 1:
            this._back2Sprite._timer_count++;
            if(this._back2Sprite._timer_count > 6) {
                this._back2Sprite._timer_count = 0;
                // toggle sprite
                this._back2Sprite.opacity = (this._back2Sprite.opacity === 0) ? 255 : 0;
                this._back2Sprite._flash_count++;
            }
            
            // after flashing for a bit
            if(this._back2Sprite._flash_count > 5) {
                this._back2Sprite._timer_count = 0;
                this._gametext_sprite._timer_count = 0;
                this._back2Sprite.opacity = 0;

                // turn on gameover
                this._dark_effect_sprite.opacity = 255;
                this._gametext_sprite.opacity = 255;
                this.setGameTextSprite(2);
                
                this._phase_state = 2;
            }
            break;
        case 2:
            this._gametext_sprite._timer_count++;
            if(this._gametext_sprite._timer_count > 180) {
                this._dark_effect_sprite.opacity = 0;
                this._gametext_sprite.opacity = 0;

                // turn on results
                this._results_sprite.opacity = 255;
                // TODO write score

                this._phase_state = 3;
            }
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
            $gameSystem._nasu_phase = 4;
            break;
     };	
 };

Scene_Nasu.prototype.terminate = function() {
	Scene_Base.prototype.terminate.call(this);
	BattleManager.replayBgmAndBgs();
	$gameSystem._nasu = false;
};

// ===========================================
// * Scene_NasuPlayer - The bird sprite whompst jump
// Everything in here controls the logic for the player character
// ===========================================
function Scene_NasuPlayer() {
    this.initialize.apply(this, arguments);
}

Scene_NasuPlayer.prototype = Object.create(Sprite_Base.prototype);
Scene_NasuPlayer.prototype.constructor = Scene_NasuPlayer;

Scene_NasuPlayer.prototype.initialize = function(arg) {
    Sprite_Base.prototype.initialize.call(this, arg);
	this._velocity = 0;
    this._animation_frame = 0;
    this._jumped = false;
    this._jump_timer = 0;
};

Scene_NasuPlayer.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

    // only update during gameplay phase
	if($gameSystem._nasu_phase !== 1) return;

    this.updateInput();

    this.updateAnimation();

    this.updateCollision();
    this.updateVelocity();
};

Scene_NasuPlayer.prototype.updateVelocity = function() {
    Sprite_Base.prototype.update.call(this);
	
    if(this._jumped) {
        this._jump_timer++;
        if(this._jump_timer < 10) this.position.y -=  5;
        if(this._jump_timer > 15) this.position.y +=  5;
        
        // put the player back on the ground
        if(this.position.y >= Scene_Nasu.groundY) {
            this.position.y = Scene_Nasu.groundY;
            this._jump_timer = 0;
            this._jumped = false;
        }
    }

    this.position.x += this._velocity;
};


Scene_NasuPlayer.prototype.updateInput = function() {
    Sprite_Base.prototype.update.call(this);
	
    // Jumping
    if (!this._jumped && (Input.isTriggered("ok") || Input.isTriggered("space") || TouchInput.isTriggered())) {
        this._jumped = true;
        this._jump_timer = 0;
        this.setAnimation(1);
        return;
    }

    if(Input.isPressed("right")) {
        this._velocity = 3;
        if(!this._jumped) {
            this.setAnimation(2);
            this.scale.x = 1;
        }
    } else if (Input.isPressed("left")) {
        this._velocity = -3;
        if(!this._jumped) {
            this.setAnimation(2);
            this.scale.x = -1;
        }
    } else {
        this._velocity = 0;
        if(!this._jumped) this.setAnimation(0);
    }
};

Scene_NasuPlayer.animationSpeed = 3;
Scene_NasuPlayer.animationFrames = 3;
Scene_NasuPlayer.animationTypes = 4;
Scene_NasuPlayer.prototype.updateAnimation = function() {
    this._animation_frame++;
    let cur = Math.floor(this._animation_frame / Scene_NasuPlayer.animationSpeed) % Scene_NasuPlayer.animationFrames; 
    this.setAnimationFrame(cur);
}

Scene_NasuPlayer.prototype.setAnimationFrame = function(frame) {
    let w = this._bitmap.width / Scene_NasuPlayer.animationFrames;
    let h = this._bitmap.height / Scene_NasuPlayer.animationTypes;
    this.setFrame(frame * w, this._animation_type * h, w, h);
}

Scene_NasuPlayer.prototype.setAnimation = function(type) {
    if(this._animation_type != type) {
        this._animation_type = type;
        this.setAnimationFrame(this._animation_frame);
    }
}

Scene_NasuPlayer.prototype.updateCollision = function() {
    Sprite_Base.prototype.update.call(this);
	
    // dont bother unless we're jumping
    if(!this._jumped) return;

    // iterate through eggplants and check collision 
    SceneManager._scene._eggplant_manager._eggplants.filter(p => p.active).forEach(eggplant => {
        if(this.hitTestCircle(this, eggplant)) {
            // eat the eggplant
            eggplant.active = false;
            eggplant.position.y = -50;
            // increment score
            SceneManager._scene._score+=10;
            return;
        }
    });
};

// This is a little wierd because we're moving the hit boxes
Scene_NasuPlayer.prototype.hitTestCircle = function(r1, r2) {
    //Define the variables we'll need to calculate
    let hit, dis, vx, vy;
  
    //hit will determine whether there's a collision
    hit = false;

    // basically used the widths
    dis = r1.width / 4 + r2.width / 2;
    
  
    //Calculate the distance vector between the sprites
    vx = (r1.position.x - r2.scale.x*5) - r2.position.x;
    // adjust height of player
    vy = (r1.position.y - 20) - r2.position.y;
  
    if (Math.abs(vx) < dis) {
        
      // very small y tollerance
      if (Math.abs(vy) < 10) {
  
        //There's definitely a collision happening
        hit = true;
      } else {
  
        //There's no collision on the y axis
        hit = false;
      }
    } else {
  
      //There's no collision on the x axis
      hit = false;
    }
  
    //`hit` will be either `true` or `false`
    return hit;
};

// ===========================================
// * Sprite_NasuEggplantManager - Controls all the eggplant sprites
// * The manager works on an object pool system where we prefill a certain amount of eggplants
// * and take eggplants from the pool when we need them
// ===========================================
function Sprite_NasuEggplantManager() {
    this.initialize.apply(this, arguments);
}

Sprite_NasuEggplantManager.prototype = Object.create(Sprite_Base.prototype);
Sprite_NasuEggplantManager.prototype.constructor = Scene_NasuPlayer;

Sprite_NasuEggplantManager.prototype.initialize = function(scroll_speed, img) {
    Sprite_Base.prototype.initialize.call(this);
    
    this.maxEggplants = 4;
    this._eggplants = [];
    for(let i = 0; i < this.maxEggplants; i++) {
        let eggplant = new Sprite(img);
        eggplant.active = false;
        eggplant.position.x = 0;
        eggplant.position.y = 0;

        this.addChild(eggplant);

        this._eggplants[i] = eggplant;
    }

    this._spawnTimer = 0; // timer used to know when to place a new pipe
    this._beginTime = 10; // earliest time to start spawning
    this._timeBetween = 120; // time between spawning each eggplant
    this._scroll_speed = scroll_speed;
};

Sprite_NasuEggplantManager.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

    // only update during gameplay phase
	if($gameSystem._nasu_phase !== 1 || SceneManager._scene._player_sprite._crashed) return;

    // spawn new eggplant
    if(this._spawnTimer > this._beginTime && this._spawnTimer % this._timeBetween == 0) {
        let newEggplant = this._eggplants.filter(p => !p.active)[0];

        if(newEggplant != undefined) {
            newEggplant.active = true;
            // randomize pos of eggplant
            newEggplant.position.x = (Math.random() * (Graphics.boxWidth-300)) + 150;
            newEggplant.position.y = -25;
        } else {
            // out of plants, this is probably an issue
        }
    }

    // update eggplants
    for(let i = 0; i < this.maxEggplants; i++) {
        let eggplant = this._eggplants[i];
        if(eggplant.active) {
            eggplant.position.y += this._scroll_speed;
            if(eggplant.position.y >= Scene_Nasu.groundY) {
                eggplant.active = false;
                // end the game
                $gameSystem._nasu_phase = 2;
            }
        }
    }

    this._spawnTimer++;
};
