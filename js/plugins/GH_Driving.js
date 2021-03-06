/*:
 * @plugindesc (v1.0) Driving minigame
 * @author contentdeleted
 *
 * @help  
 * =============================================================================
 * 
 * 
 * 
 * ============================================================================= 
*/

var Imported = Imported || {};
Imported.GH_DrivingMini = true;

var GH_DrivingMini = GH_DrivingMini || {};

ImageManager.loadDrivingMiniTexture = function(filename) {
    var path = 'img/drivingmini/' + encodeURIComponent(filename) + '.png';
    return PIXI.Texture.from(path);
};

ImageManager.loadDrivingMiniBitmap = function (filename) {
    return this.loadBitmap('img/drivingmini/', filename, 0, true);
};


//=============================================================================
// ** Game_Interpreter
//=============================================================================	

GH_DrivingMini._Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	GH_DrivingMini._Game_Interpreter_prototype_pluginCommand.call(this,command, args)
	if (command === "drivingmini")  {
        $gameSystem._drivingmini_start = true;
        this.wait(10);
    };	
	return true;
};

//=============================================================================
// ** Scene Map
// * This is where we hook in the scene flag
//=============================================================================	

GH_DrivingMini.an_Scene_Map_prototype_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function() {
	GH_DrivingMini.an_Scene_Map_prototype_update.call(this);
	if ($gameSystem._drivingmini_start) {
        this.execute_drivingmini();
    }
};

Scene_Map.prototype.execute_drivingmini = function() {
    $gameSystem._drivingmini_start = false;
    this.startFadeOut(this.fadeSpeed());
    $gameSystem.drivingmini();
};

//=============================================================================
// ** Game_System
//=============================================================================	

GH_DrivingMini._Game_System_prototype_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
    GH_DrivingMini._Game_System_prototype_initialize.call(this);	
	this._drivingmini = false; // is it active
	this._drivingmini_start = false; // flag to activate
	this._drivingmini_phase = 0; // 0 -> start, 1 -> play, 2 -> results
};

Game_System.prototype.drivingmini = function() {
    // Maybe not important, but probably will cause issues if the party is dead for some reason
	if ($gameParty.battleMembers().length === 0) {return};
    SceneManager.push(Scene_DrivingMini);
};

//=============================================================================
// ** Scene_DrivingMini
// * This is the actual scene definition, its pretty straight forward
// * We have several phases, in this case intro, gameplay, and result
// * When results are finished the scene is pop'd off the scene manager stack 
// * and we go back to wherever it was called
//=============================================================================

function Scene_DrivingMini() {
    this.initialize.apply(this, arguments);
}

Scene_DrivingMini.prototype = Object.create(Scene_Base.prototype);
Scene_DrivingMini.prototype.constructor = Scene_DrivingMini;

Scene_DrivingMini.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);	
     
    $gameSystem._drivingmini_start = false; // already started
    $gameSystem._drivingmini = true; // now active
    $gameSystem._drivingmini_phase = 0; // start phase
    this._phase_state = 0; // incremented at each point in a phase ie fade in -> wait for input -> fade out
    this._score = 0;
    this._scroll_speed = 5;

    BattleManager.saveBgmAndBgs();
	AudioManager.fadeOutBgm(2);
	AudioManager.stopBgs();

    this._battlers = $gameParty.battleMembers();

    this.createDisplayObjects();
    this.startFadeIn(60, false);
}

Scene_DrivingMini.prototype.load_images = function() {
    this._player_img = ImageManager.loadDrivingMiniBitmap("driver");
    this._wheel_img = ImageManager.loadDrivingMiniBitmap("wheel");
    this._wing_img = ImageManager.loadDrivingMiniBitmap("wing");
    this._road_tile_img = ImageManager.loadDrivingMiniTexture("roadtile");
    this._tree_img = ImageManager.loadDrivingMiniTexture("tree");
    this._sky_img = ImageManager.loadBattleback1("sky_AUTUMN");
}

Scene_DrivingMini.prototype.createDisplayObjects = function() {
    this.load_images();

    // These are basically needed for scene layout and dont have rendered images
    this._spriteField = new Sprite();	
	this.addChild(this._spriteField);

    this._sky = new Sprite(this._sky_img);
    this._sky.anchor.y = 0.5;
    this.addChild(this._sky);

    this._camera = new PIXI.projection.Camera3d(); 
    this._camera.setPlanes(300, 0, 1000, false);
    this._camera.position.set(Graphics.boxWidth / 2, 0);
    this._camera.position3d.z = 50;
    this._camera.position3d.y = -70;
    this._camera.euler.x = 0.264;
    this.addChild(this._camera);

	this._spriteHudBase = new Sprite();
	this.addChild(this._spriteHudBase);

    // Setup all sprites, the order matters for layers
    this.createPlayerSprite();
    this.createScoreText();
    this.createFlashEffectSprite();
    this.createRoadManager();
}
Scene_DrivingMini.prototype.createRoadManager = function() {
    this._roadManager = new Sprite_DrivingMiniRoadManager(this._camera, this._scroll_speed, this._tree_img, this._road_tile_img);
    this.addChild(this._roadManager);
}

Scene_DrivingMini.prototype.createScoreText = function() {	
    this._scoretext_sprite = new Sprite(new Bitmap(250,48));
    this._scoretext_sprite.anchor.x = 0.5;
    this._scoretext_sprite.anchor.y = 0.5; 
    this._scoretext_sprite.x = Graphics.boxWidth / 2 + 48;
    this._scoretext_sprite.y = 50;
    this._scoretext_sprite.bitmap.fontSize = 36;
    this._spriteHudBase.addChild(this._scoretext_sprite);
};

Scene_DrivingMini.prototype.createFlashEffectSprite = function() {	
    // create new sprite size of the screen
    this._flash_effect_sprite = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
    this._flash_effect_sprite.anchor.x = 0.5;
    this._flash_effect_sprite.anchor.y = 0.5;

    // fill sprite with white
    let color = 'rgba(1, 1, 1, 1)';
    this._flash_effect_sprite.bitmap.fillRect(0, 0, Graphics.boxWidth, Graphics.boxHeight, color);
    
    this._flash_effect_sprite.x = Graphics.boxWidth / 2;
	this._flash_effect_sprite.y = Graphics.boxHeight / 2;
    this._flash_effect_sprite.opacity = 0;
    this._spriteHudBase.addChild(this._flash_effect_sprite);
};

Scene_DrivingMini.prototype.createPlayerSprite = function() {	
    this._player_sprite = new Sprite_DrivingMiniPlayer(this._camera, this._player_img, this._wheel_img, this._wing_img);
    this._player_sprite.opacity = 255;
    //this._player_sprite.anchor.x = 0.5;
   // this._player_sprite.anchor.y = 0.5; 
    //this._player_sprite.x = Graphics.boxWidth / 2;
    //this._player_sprite.y = 320;
    //this._player_sprite.scale.x = 6;
    //this._player_sprite.scale.y = 6;

    this._spriteHudBase.addChild(this._player_sprite);
};

Scene_DrivingMini.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    
	this.update_phase();
};

Scene_DrivingMini.prototype.update_phase = function() {
    switch ($gameSystem._drivingmini_phase) {
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

Scene_DrivingMini.prototype.update_start_phase = function() {
    switch (this._phase_state) {
		case 0:
            // set up intro sprite
            //this._intro_sprite.opacity = 255;
            //this._gametext_sprite.opacity = 0;
			this._phase_state = 1;
     	    break;
		case 1:
            this._phase_state = 2;
            // wait for player input
		    /*if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
				SoundManager.playCursor();
                this._phase_state = 2;
                
                // fade out intro sprite
                this._intro_sprite.opacity = 0;
                // turn on gametex sprite to ready
                this.setGameTextSprite(0);
                this._gametext_sprite.opacity = 255;
                this._gametext_sprite._timer_count = 0;
                // turn on dark sprite
                this._flash_effect_sprite.opacity = 255;
                this._phase_state = 2;
            }*/
		    break; 	
		case 2:
            $gameSystem._drivingmini_phase = 1;
            this._phase_state = 0;		

            // probably want this to be custom music
            BattleManager.playBattleBgm();
		    break;
	};
};

Scene_DrivingMini.prototype.update_play_phase = function() {
    // Update score
    this._scoretext_sprite.bitmap.clear();
    this._scoretext_sprite.bitmap.drawText(this._score,0,0,100,48,"right");
}

Scene_DrivingMini.prototype.update_end_phase = function() {
    switch (this._phase_state) {
        case 0:
            
            this._phase_state = 1;
            AudioManager.fadeOutBgm(1);
            this._flash_effect_sprite._timer_count = 0;
            this._flash_effect_sprite._flash_count = 0;
            break;
        case 1:
            this._flash_effect_sprite._timer_count++;
            if(this._flash_effect_sprite._timer_count > 6) {
                this._flash_effect_sprite._timer_count = 0;
                // toggle sprite
                this._flash_effect_sprite.opacity = (this._flash_effect_sprite.opacity === 0) ? 255 : 0;
                this._flash_effect_sprite._flash_count++;
            }
            
            // after flashing for a bit
            if(this._flash_effect_sprite._flash_count > 5) {
                this._flash_effect_sprite._timer_count = 0;
                this._flash_effect_sprite.opacity = 0;
        
                this._phase_state = 2;
            }
            break;
        case 2:
        // todo: add a message here    
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
            $gameSystem._drivingmini_phase = 4;
            break;
     };	
 };

Scene_DrivingMini.prototype.terminate = function() {
	Scene_Base.prototype.terminate.call(this);
	BattleManager.replayBgmAndBgs();
	$gameSystem._drivingmini = false;
};

// ===========================================
// * Sprite_DrivingMiniPlayer - The bird sprite whompst jump
// Everything in here controls the logic for the player character
// ===========================================
function Sprite_DrivingMiniPlayer() {
    this.initialize.apply(this, arguments);
}

Sprite_DrivingMiniPlayer.prototype = Object.create(Sprite_Base.prototype);
Sprite_DrivingMiniPlayer.prototype.constructor = Sprite_DrivingMiniPlayer;

Sprite_DrivingMiniPlayer.prototype.initialize = function(camera, bitmap, wheel_img, wing_img) {
    Sprite_Base.prototype.initialize.call(this);
    this._animation_frame = 0;
    this._camera = camera;
    this.bitmap = bitmap;
    this.jumpVelocity = 0;
    this.roadHeight = this._camera.position3d.y;
    this.normalTilt = this._camera.euler.x;
    this.direction = 0;

    this.wheel = new Sprite(wheel_img);
    this.wheel.anchor.y = 0.5;
    this.wheel.anchor.x = 0.5;
    this.wheel.y = Graphics.boxHeight;
    this.wheel.x = 300;
    this.addChild(this.wheel);

    this.wing = new Sprite(wing_img);
    this.wing.x = 150;
    this.wing.y = -300;
    this.wing.rotation = Math.PI / 8;
    this.wheel.addChild(this.wing);
    //this.setAnimation(0);
};

Sprite_DrivingMiniPlayer.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

    // only update during gameplay phase
	if($gameSystem._drivingmini_phase !== 1) return;

    this.updateInput();

    //this.updateAnimation();
};


Sprite_DrivingMiniPlayer.prototype.updateInput = function() {
    Sprite_Base.prototype.update.call(this);
    
    // horrible bounce 
    this.y = Math.random() * 5 - 5;

    // horrible lurch
    this.direction += 0.2 * Math.random() - 0.1;

    if(this._camera.euler.z > 0) {
        this._camera.euler.z -= 0.003;
    } else if( this._camera.euler.z < 0) {
        this._camera.euler.z += 0.003;
    }

    if(Input.isPressed("right")) {
        this.direction += 0.1;
        this._camera.euler.z += 0.006;
        //this.setAnimation(1);
    } else if (Input.isPressed("left")) {
        this.direction -= 0.1;
        this._camera.euler.z -= 0.006;
        //this.setAnimation(2);
    }

    this._camera.position3d.x += this.direction

    if (Input.isTriggered("ok")) {
        if(this._camera.position3d.y >= this.roadHeight) {
            this.jumpVelocity = 4;
            this._camera.position3d.y = this.roadHeight;
        } else { 
            this.jumpVelocity = 3;
        }
    }

    if(this._camera.position3d.y <= this.roadHeight) {
        this._camera.position3d.y -= this.jumpVelocity;
        this.jumpVelocity-= 0.1;
    } else {
        // Clamp to prevent clipping
        if(this._camera.euler.z > 0.05) this._camera.euler.z = 0.05;
        if(this._camera.euler.z < -0.05) this._camera.euler.z = -0.05;
    }

    // update camera tilt
    this._camera.euler.x = this.normalTilt - 0.1 * (this._camera.position3d.y - this.roadHeight) / this.roadHeight;

    // update wheel tilt
    this.wheel.rotation = Math.PI / 8 * this.direction;

    this.wing.rotation = Math.PI / 8  - Math.PI / 10 * this.direction;
};

Sprite_DrivingMiniPlayer.animationSpeed = 3;
Sprite_DrivingMiniPlayer.animationFrames = 1;
Sprite_DrivingMiniPlayer.animationTypes = 3;
Sprite_DrivingMiniPlayer.prototype.updateAnimation = function() {
    this._animation_frame++;
    let cur = Math.floor(this._animation_frame / Sprite_DrivingMiniPlayer.animationSpeed) % Sprite_DrivingMiniPlayer.animationFrames; 
    this.setAnimationFrame(cur);
}

Sprite_DrivingMiniPlayer.prototype.setAnimationFrame = function(frame) {
    let w = this._bitmap.width / Sprite_DrivingMiniPlayer.animationFrames;
    let h = this._bitmap.height / Sprite_DrivingMiniPlayer.animationTypes;
    this.setFrame(frame * w, this._animation_type * h, w, h);
}

Sprite_DrivingMiniPlayer.prototype.setAnimation = function(type) {
    if(this._animation_type != type) {
        this._animation_type = type;
        this.setAnimationFrame(this._animation_frame);
    }
}


// ===========================================
// * Sprite_DrivingMiniRoadManager -
// *
// ===========================================
function Sprite_DrivingMiniRoadManager() {
    this.initialize.apply(this, arguments);
}

Sprite_DrivingMiniRoadManager.prototype = Object.create(Sprite_Base.prototype);
Sprite_DrivingMiniRoadManager.prototype.constructor = Sprite_DrivingMiniPlayer;

Sprite_DrivingMiniRoadManager.prototype.initialize = function(camera, scroll_speed, tree_img, road_img) {
    Sprite_Base.prototype.initialize.call(this);
    
    this.maxSegments = 75;
    this.trackLength = 1500;
    this.halfTrackLength = this.trackLength / 2;
    this.treeVariance = 500;
    this._segments = [];

    for(let i = 0; i < this.maxSegments; i++) {
        let segment = {
            trees: [],
            pos: (- this.trackLength / this.maxSegments * i + this.halfTrackLength),
        };

        let road = new PIXI.projection.Sprite3d();
        camera.addChild(road);

        road.anchor.set(0.5, 0.5);
        road.texture = road_img;
        road.position3d.y = 35;
        road.position3d.x = 0;
        road.euler.x = -Math.PI / 2;
        road.position3d.z = segment.pos;

        segment.road = road;
        
        for(let j = 0; j < 6; j++) {
            let tree = new PIXI.projection.Sprite3d();
            camera.addChild(tree);
            tree.anchor.set(0.5, 0.5);
            tree.texture = tree_img;
            tree.position3d.y = 0;
            tree.position3d.x = (60 + Math.random() * this.treeVariance) * (Math.random() < 0.5 ? -1 : 1);
            tree._randomOffset = Math.random() * 25;
            tree.position3d.z = segment.pos + tree._randomOffset;
            segment.trees.push(tree);
        }

        this._segments[i] = segment;
    }

    this._scroll_speed = scroll_speed;
    this._camera = camera;
    this._road_tilt = 0; // current tilt of the road
    this._curve_value = 0;
};

Sprite_DrivingMiniRoadManager.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

    // only update during gameplay phase
	if($gameSystem._drivingmini_phase !== 1 || SceneManager._scene._player_sprite._crashed) return;

    for(let i = 0; i < this.maxSegments; i++) {
        let segment = this._segments[i];
    
        segment.pos -= this._scroll_speed;
        if(segment.pos <= -this.halfTrackLength) {
            segment.pos = this.halfTrackLength;
            //this._road_tilt +=5;
            segment.road.position3d.x += this._road_tilt;
            segment.trees.forEach(tree=>tree.position3d.x+=this._road_tilt);
        }

        segment.road.position3d.z = segment.pos;
        segment.trees.forEach(tree=> tree.position3d.z = segment.pos + tree._randomOffset);
        
        // update alpha
        let alpha = (this.halfTrackLength - segment.pos) / this.halfTrackLength;
        segment.road.alpha = alpha;
        segment.trees.forEach(tree=> tree.alpha = alpha);

        // Check collision
        if(segment.pos < this._camera.position3d.z - 250 && segment.pos > this._camera.position3d.z - 320) {
            //let alpha = 1;
            //segment.road.alpha = alpha;
            segment.trees.forEach(tree => {
                if(tree.position3d.z < this._camera.position3d.z - 275
                    && tree.position3d.z > this._camera.position3d.z - 275 - 20 
                    && tree.position3d.x < this._camera.position3d.x + 15
                    && tree.position3d.x > this._camera.position3d.x - 15
                    && this._camera.position3d.y > -100) {
                        //tree.alpha = alpha
                        $gameSystem._drivingmini_phase = 2;
                }
            });
        }
    }

    if (Input.isPressed("#c")) {
        this._road_tilt +=5;
    } else if (Input.isPressed("#v")) {
        this._road_tilt -=5;
    }

    // sort trees sprite order
    this._camera.children.sort((a,b) => b.position3d.z - a.position3d.z);
};
