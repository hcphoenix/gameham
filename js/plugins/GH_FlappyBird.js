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
Imported.GH_FlappyBird = true;

ImageManager.loadFlappyBird = function(filename) {
    return this.loadBitmap('img/flappybird/', filename, 0, true);
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

var a_Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	a_Game_Interpreter_prototype_pluginCommand.call(this,command, args)
	if (command === "flappybird")  {
        $gameSystem._flappybird_start = true;
        this.wait(10);
    };	
	return true;
};

//=============================================================================
// ** Scene Map
// * This is where we hook in the scene flag
//=============================================================================	

var a_Scene_Map_prototype_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function() {
	a_Scene_Map_prototype_update.call(this);
	if ($gameSystem._flappybird_start) {
        this.execute_flappybird();
    }
};

Scene_Map.prototype.execute_flappybird = function() {
    $gameSystem._flappybird_start = false;
    this.startFadeOut(this.fadeSpeed());
    $gameSystem.flappybird();
};

//=============================================================================
// ** Game_System
//=============================================================================	

var a_Game_System_prototype_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
    a_Game_System_prototype_initialize.call(this);	
	this._flappybird = false; // is it active
	this._flappybird_start = false; // flag to activate
	this._flappybird_phase = 0; // 0 -> start, 1 -> play, 2 -> results
};

Game_System.prototype.flappybird = function() {
    // Maybe not important, but probably will cause issues if the party is dead for some reason
	if ($gameParty.battleMembers().length === 0) {return};
    SceneManager.push(Scene_FlappyBird);
};

//=============================================================================
// ** Scene_FlappyBird
// * This is the actual scene definition, its pretty straight forward
// * We have several phases, in this case intro, gameplay, and result
// * When results are finished the scene is pop'd off the scene manager stack 
// * and we go back to wherever it was called
//=============================================================================

function Scene_FlappyBird() {
    this.initialize.apply(this, arguments);
}

Scene_FlappyBird.prototype = Object.create(Scene_Base.prototype);
Scene_FlappyBird.prototype.constructor = Scene_FlappyBird;

Scene_FlappyBird.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);	
     
    $gameSystem._flappybird_start = false; // already started
    $gameSystem._flappybird = true; // now active
    $gameSystem._flappybird_phase = 0; // start phase
    this._phase_state = 0; // incremented at each point in a phase ie fade in -> wait for input -> fade out
    this._scroll_speed = 6;
    this._score = 0;

    BattleManager.saveBgmAndBgs();
	AudioManager.fadeOutBgm(2);
	AudioManager.stopBgs();

    this._battlers = $gameParty.battleMembers();

    this.createDisplayObjects();
    this.startFadeIn(60, false);
}

Scene_FlappyBird.prototype.load_images = function() {
    this._intro_img = ImageManager.loadFlappyBird("intro");
    this._results_img = ImageManager.loadFlappyBird("results");
    this._player_img = ImageManager.loadFlappyBird("player");
    this._pipe_img = ImageManager.loadFlappyBird("pipe");
    this._background_img = ImageManager.loadFlappyBird("background");
    this._ground_img = ImageManager.loadFlappyBird("ground");
}

Scene_FlappyBird.prototype.createDisplayObjects = function() {
    this.load_images();

    // These are basically needed for scene layout and dont have rendered images
    this._spriteField = new Sprite();	
	this.addChild(this._spriteField);
	this._spriteHudBase = new Sprite();
	this.addChild(this._spriteHudBase);

    // Setup all sprites, the order matters for layers
    this.createBackgrounds();
    this.createPipeSprite();
    this.createGround();
    this.createBirdSprite();
    this.createScoreText();
    this.createFlashEffectSprite();
    this.createIntroSprite();
    this.createResultsSprite();
}

Scene_FlappyBird.prototype.createScoreText = function() {	
    this._scoretext_sprite = new Sprite(new Bitmap(250,48));
    this._scoretext_sprite.anchor.x = 0.5;
    this._scoretext_sprite.anchor.y = 0.5; 
    this._scoretext_sprite.x = Graphics.boxWidth / 2 + 48;
    this._scoretext_sprite.y = 30;
    this._scoretext_sprite.bitmap.fontSize = 48;
    this._spriteHudBase.addChild(this._scoretext_sprite);
};

Scene_FlappyBird.prototype.createIntroSprite = function() {	
    this._intro_sprite = new Sprite(this._intro_img);
    this._intro_sprite.anchor.x = 0.5;
    this._intro_sprite.anchor.y = 0.5;
    this._intro_sprite.opacity = 0;
    this._intro_sprite.x = Graphics.boxWidth / 2;
	this._intro_sprite.y = Graphics.boxHeight / 2;
    this._spriteHudBase.addChild(this._intro_sprite);	
};

Scene_FlappyBird.prototype.createResultsSprite = function() {	
    this._results_sprite = new Sprite(this._results_img);
    this._results_sprite.anchor.x = 0.5;
    this._results_sprite.anchor.y = 0.5;
    this._results_sprite.opacity = 0;
    this._results_sprite.x = Graphics.boxWidth / 2;
	this._results_sprite.y = Graphics.boxHeight / 2;
    this._spriteHudBase.addChild(this._results_sprite);	
};

Scene_FlappyBird.prototype.createBackgrounds = function() {
    this._back1Sprite = new TilingSprite(this._background_img);
	this._back1Sprite.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
	this._spriteField.addChild(this._back1Sprite);
};

Scene_FlappyBird.prototype.createGround = function() {	
    this._ground_sprite = new TilingSprite(this._ground_img);

    let gheight = 64;
    this._ground_sprite.move(
        this._ground_sprite.x = Graphics.boxWidth / 2,
        Graphics.boxHeight - gheight / 2, 
        Graphics.boxWidth, 
        gheight
        );
    this._ground_sprite.anchor.x = 0.5;
    this._ground_sprite.anchor.y = 0.5;
    this._ground_sprite.origin.x = Graphics.boxWidth / 2;
    this._ground_sprite.origin.y = gheight / 2;
    this._spriteField.addChild(this._ground_sprite);	
};


///=== Create the bird sprite
Scene_FlappyBird.prototype.createBirdSprite = function() {	
    this._player_sprite = new Sprite_FlappyPlayer();
    this._player_sprite.opacity = 255;
    this._player_sprite.bitmap = this._player_img;
    this._player_sprite.anchor.x = 0.5;
    this._player_sprite.anchor.y = 0.5; 
    this._player_sprite.x = 150;
    this._player_sprite.y = Graphics.boxHeight / 2;
    this._spriteField.addChild(this._player_sprite);
};

Scene_FlappyBird.prototype.createPipeSprite = function() {	
    this._pipe_manager = new Sprite_FlappyPipeManager(this._scroll_speed, this._pipe_img);
    this._pipe_manager.anchor.x = 0.5;
    this._pipe_manager.anchor.y = 0.5;
    this._spriteField.addChild(this._pipe_manager);
};

Scene_FlappyBird.prototype.createFlashEffectSprite = function() {	
    // create new sprite size of the screen
    this._flash_effect_sprite = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
    this._flash_effect_sprite.anchor.x = 0.5;
    this._flash_effect_sprite.anchor.y = 0.5;

    // fill sprite with white
    let color = 'rgba(255, 255, 255, 1)';
    this._flash_effect_sprite.bitmap.fillRect(0, 0, Graphics.boxWidth, Graphics.boxHeight, color);
    
    this._flash_effect_sprite.x = Graphics.boxWidth / 2;
	this._flash_effect_sprite.y = Graphics.boxHeight / 2;
    this._flash_effect_sprite.opacity = 0;
    this._spriteHudBase.addChild(this._flash_effect_sprite);
};


Scene_FlappyBird.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    
	this.update_phase();
};

Scene_FlappyBird.prototype.update_phase = function() {
    switch ($gameSystem._flappybird_phase) {
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

Scene_FlappyBird.prototype.update_start_phase = function() {
    if(this._player_sprite._bitmap._loadingState == "loaded") {
        this._player_sprite.setAnimation(0);
    }
    switch (this._phase_state) {
		case 0:
            // set up intro sprite
        	this._intro_sprite.scale.x = 2; // for a cool scale in effect
            this._intro_sprite.opacity = 0;
			this._phase_state = 1;
     	    break;
		case 1:
            // fade in intro sprite
	        this._intro_sprite.opacity += 10;
			if (this._intro_sprite.scale.x > 1.00) {this._intro_sprite.scale.x -= 0.05};
		    if (this._intro_sprite.opacity >= 255) {this._phase_state = 2};
	        break;
		case 2:
            // wait for player input
		    if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
				SoundManager.playCursor();
                this._phase_state = 3;
                // probably want this to be custom music
                BattleManager.playBattleBgm();
            }
		    break; 	
		case 3:
            // fade out intro sprite
			this._intro_sprite.opacity -= 10;
			this._intro_sprite.scale.x += 0.05;
			if (this._intro_sprite.opacity <= 0) {
                // move to the play phase
                $gameSystem._flappybird_phase = 1;
                this._phase_state = 0;
            };
		    break; 				
	};
};

Scene_FlappyBird.prototype.update_play_phase = function() {
    // Update score
    this._scoretext_sprite.bitmap.clear();
    this._scoretext_sprite.bitmap.drawText(this._score,0,0,100,48,"right");

    // Update ground scroll effect
    if(!this._player_sprite._crashed) {
        this._ground_sprite.origin.x += this._scroll_speed;
    }

    // Update flash effect sprite
    if(this._flash_effect_sprite.opacity > 0) {
        this._flash_effect_sprite.opacity -= 50;
    }
}

Scene_FlappyBird.prototype.update_end_phase = function() {
    this._flash_effect_sprite.opacity = 0;
    switch (this._phase_state) {
        case 0:
            // set up result sprite
            this._results_sprite.scale.x = 2; // for a cool scale in effect
            this._results_sprite.opacity = 0;
            this._phase_state = 1;
            AudioManager.fadeOutBgm(1);
            break;
        case 1:
            // fade in 
            this._results_sprite.opacity += 10;
            if (this._results_sprite.scale.x > 1.00) this._results_sprite.scale.x -= 0.05;
            if (this._results_sprite.opacity >= 255) {
                this._phase_state = 2;
                BattleManager.playVictoryMe();
                for (var i = 0; i < this._battlers.length; i++) {		
                    this._battlers[i].performVictory();
                }
            }
            break;
        case 2:
            // wait for input
            if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
                SoundManager.playCursor();
                this._phase_state = 3;
            }
            break;
        case 3:
            this._results_sprite.opacity -= 10;
            this._results_sprite.scale.x += 0.05;	
            if (this._results_sprite.opacity <= 0) {
                // probably set a game variable with the score
                // this.gain_rewards();
                this.fadeOutAll();
                SceneManager.pop();
                $gameSystem._flappybird_phase = 4;
            }
            break;
     };	
 };

Scene_FlappyBird.prototype.terminate = function() {
	Scene_Base.prototype.terminate.call(this);
	BattleManager.replayBgmAndBgs();
	$gameSystem._flappybird = false;
};

// ===========================================
// * Sprite_FlappyPlayer - The bird sprite whompst jump
// Everything in here controls the logic for the player character
// ===========================================
function Sprite_FlappyPlayer() {
    this.initialize.apply(this, arguments);
}

Sprite_FlappyPlayer.prototype = Object.create(Sprite_Base.prototype);
Sprite_FlappyPlayer.prototype.constructor = Sprite_FlappyPlayer;

Sprite_FlappyPlayer.prototype.initialize = function(arg) {
    Sprite_Base.prototype.initialize.call(this, arg);
	this._velocity = 0;
    this._animation_frame = 0;
    this._crashed = false; // flag for hitting a pipe and falling
};

Sprite_FlappyPlayer.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

    // only update during gameplay phase
	if($gameSystem._flappybird_phase !== 1) return;

    if(!this._crashed) { 
        this.updateInput();
        this.updateAnimation();
    }
    this.updateCollision();
    this.updateVelocity();
};

Sprite_FlappyPlayer.prototype.updateVelocity = function() {
    Sprite_Base.prototype.update.call(this);
	
    this._velocity -= 0.4;
    // y is flipped
    this.position.y += -this._velocity;
    // clamp the player from flying too high
    this.position.y = Math.max(this.position.y, -35);
    // make the nose dip when going down etc its flappy bird youve seen it
    this.rotation = -this._velocity / 15;
};


Sprite_FlappyPlayer.prototype.updateInput = function() {
    Sprite_Base.prototype.update.call(this);
	
    if (Input.isTriggered("ok") || Input.isTriggered("space") || TouchInput.isTriggered()) {
        // make the bird jump
        this._velocity = 15;
    }
};

Sprite_FlappyPlayer.animationSpeed = 3;
Sprite_FlappyPlayer.animationFrames = 3;
Sprite_FlappyPlayer.prototype.updateAnimation = function() {
    this._animation_frame++;
    let cur = Math.floor(this._animation_frame / Sprite_FlappyPlayer.animationSpeed) % Sprite_FlappyPlayer.animationFrames; 
    this.setAnimation(cur);
}

Sprite_FlappyPlayer.prototype.setAnimation = function(frame) {
    let w = this._bitmap.width / Sprite_FlappyPlayer.animationFrames;
    this.setFrame(frame * w, 0, w, this._bitmap.height);
}

Sprite_FlappyPlayer.prototype.updateCollision = function() {
    Sprite_Base.prototype.update.call(this);
	
    if(this.position.y >= Graphics.boxHeight - 64) {
        // end the gameplay phase if the player falls off the screen
        $gameSystem._flappybird_phase = 2;
    }

    // dont bother with other collision
    if(this._crashed) return;

    // iterate through pipes and check collision 
    SceneManager._scene._pipe_manager._pipes.filter(p => p.active).forEach(pipe => {
        if(this.hitTestRectangle(this, pipe.bottomSprite) || this.hitTestRectangle(this, pipe.topSprite)) {
            this._crashed = true;
            SceneManager._scene._flash_effect_sprite.opacity = 200;
            // play a sound
            return;
        }
    });
};

// Copied with some minor changes from: https://github.com/kittykatattack/learningPixi#collision
// I am very lazy
Sprite_FlappyPlayer.prototype.hitTestRectangle = function(r1, r2) {
    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  
    //hit will determine whether there's a collision
    hit = false;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;
  
    //Calculate the distance vector between the sprites
    vx = r1.position.x - r2.position.x;
    vy = r1.position.y - r2.position.y;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  
    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
  
      //A collision might be occurring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
  
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
// * Sprite_FlappyPipeManager - Controls all the pipe sprites
// * The manager works on an object pool system where we prefill a certain amount of pipes
// * and take pipes from the pool when we need them
// ===========================================
function Sprite_FlappyPipeManager() {
    this.initialize.apply(this, arguments);
}

Sprite_FlappyPipeManager.prototype = Object.create(Sprite_Base.prototype);
Sprite_FlappyPipeManager.prototype.constructor = Sprite_FlappyPlayer;

Sprite_FlappyPipeManager.prototype.initialize = function(scroll_speed, img) {
    Sprite_Base.prototype.initialize.call(this);
    
    this.maxPipes = 4;
    this._pipes = [];
    for(let i = 0; i < this.maxPipes; i++) {
        let pipe = {};
        pipe.active = false;
        pipe.position = {};
        pipe.position.x = 0;
        pipe.position.y = 0;

        // top pipe
        pipe.topSprite = new Sprite(img);
        pipe.topSprite.position.x = -150;
        pipe.topSprite.anchor.x = 0.5;
        pipe.topSprite.anchor.y = 0.5;
        pipe.topSprite.rotation = Math.PI;
        this.addChild(pipe.topSprite);
        
        // bottom pipe
        pipe.bottomSprite = new Sprite(img);
        pipe.bottomSprite.position.x = -150;
        pipe.bottomSprite.anchor.x = 0.5;
        pipe.bottomSprite.anchor.y = 0.5;
        this.addChild(pipe.bottomSprite);

        this._pipes[i] = pipe;
    }

    this._spawnTimer = 0; // timer used to know when to place a new pipe
    this._beginTime = 50; // earliest time to start spawning
    this._timeBetween = 100; // time between spawning each pipe
    this._scroll_speed = scroll_speed;
};

Sprite_FlappyPipeManager.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

    // only update during gameplay phase
	if($gameSystem._flappybird_phase !== 1 || SceneManager._scene._player_sprite._crashed) return;

    // spawn new pipe
    if(this._spawnTimer > this._beginTime && this._spawnTimer % this._timeBetween == 0) {
        let newPipe = this._pipes.filter(p => !p.active)[0];

        if(newPipe != undefined) {
            newPipe.active = true;
            // randomize height of pipes
            newPipe.position.y = (Math.random() * Graphics.boxHeight) / 2 + Graphics.boxHeight / 6;
            newPipe.position.x = Graphics.boxWidth + 50;
        } else {
            // out of pipes, this is probably an issue
        }
    }

    // update pipes
    for(let i = 0; i < this.maxPipes; i++) {
        let pipe = this._pipes[i];
        if(pipe.active) {
            pipe.position.x -= this._scroll_speed;
            this.updatePipePos(pipe);
            if(pipe.position.x < -150) {
                pipe.active = false;
                
                // increment score
                SceneManager._scene._score++;
            }
        }
    }

    this._spawnTimer++;
};

Sprite_FlappyPipeManager.prototype.updatePipePos = function(pipe) {
    pipe.topSprite.position.x = pipe.position.x;
    pipe.topSprite.position.y = pipe.position.y - 350; // space between pipe sprites

    pipe.bottomSprite.position.x = pipe.position.x;
    pipe.bottomSprite.position.y = pipe.position.y + 350;
}