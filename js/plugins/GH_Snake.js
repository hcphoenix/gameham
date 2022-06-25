/*:
 * @plugindesc (v1.0) snake minigame
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
Imported.GH_Snake = true;

var GH_Snake = GH_Snake || {};

// For loading images that are used in 3d perspective objects
ImageManager.loadSnakeTexture = function(filename) {
    var path = 'img/snake/' + encodeURIComponent(filename) + '.png';
    return PIXI.Texture.from(path);
};

// All other sprite images are loaded like this
ImageManager.loadSnakeBitmap = function (filename) {
    return this.loadBitmap('img/snake/', filename, 0, true);
};


//=============================================================================
// ** Game_Interpreter
//=============================================================================	

GH_Snake._Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	GH_Snake._Game_Interpreter_prototype_pluginCommand.call(this,command, args)
	if (command === "snake")  {
        $gameSystem._snake_start = true;
        this.wait(10);
    };	
	return true;
};

//=============================================================================
// ** Scene Map
// * This is where we hook in the scene flag
//=============================================================================	

GH_Snake.an_Scene_Map_prototype_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function() {
	GH_Snake.an_Scene_Map_prototype_update.call(this);
	if ($gameSystem._snake_start) {
        this.execute_snake();
    }
};

Scene_Map.prototype.execute_snake = function() {
    $gameSystem._snake_start = false;
    this.startFadeOut(this.fadeSpeed());
    $gameSystem.snake();
};

//=============================================================================
// ** Game_System
//=============================================================================	

GH_Snake._Game_System_prototype_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
    GH_Snake._Game_System_prototype_initialize.call(this);	
	this._snake = false; // is it active
	this._snake_start = false; // flag to activate
	this._snake_phase = 0; // 0 -> start, 1 -> play, 2 -> results
};

Game_System.prototype.snake = function() {
    // Maybe not important, but probably will cause issues if the party is dead for some reason
	if ($gameParty.battleMembers().length === 0) {return};
    SceneManager.push(Scene_Snake);
};

//=============================================================================
// ** Scene_Snake
// * This is the actual scene definition, its pretty straight forward
// * We have several phases, in this case intro, gameplay, and result
// * When results are finished the scene is pop'd off the scene manager stack 
// * and we go back to wherever it was called
//=============================================================================

function Scene_Snake() {
    this.initialize.apply(this, arguments);
}

Scene_Snake.prototype = Object.create(Scene_Base.prototype);
Scene_Snake.prototype.constructor = Scene_Snake;

Scene_Snake.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);	
     
    $gameSystem._snake_start = false; // already started
    $gameSystem._snake = true; // now active
    $gameSystem._snake_phase = 0; // start phase
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

Scene_Snake.prototype.load_images = function() {
    this._background_img = ImageManager.loadSnakeTexture("background");
    this._sky_img = ImageManager.loadSnakeBitmap("sky");
    this._cloud_img = ImageManager.loadSnakeTexture("cloud");
}

Scene_Snake.prototype.createDisplayObjects = function() {
    this.load_images();

    // These are basically needed for scene layout and dont have rendered images
    this._spriteField = new Sprite();	
	this.addChild(this._spriteField);

	this._spriteHudBase = new Sprite();
	this.addChild(this._spriteHudBase);

    // Setup all sprites, the order matters for layers
    this.createBackground();
    this.createObjectPoolManager();
    this.createPlayerSprite();
    this.createScoreText();
}

Scene_Snake.prototype.createBackground = function() {
    //this._sky = new Sprite(this._sky_img);
    //this._spriteField.addChild(this._sky);

    this._camera = new PIXI.projection.Camera3d(); 
    this._camera.setPlanes(100, 10, 10000, false);
    //this._camera.position.set(Graphics.boxWidth / 2, 0);
    this._camera.position3d.z = -50;
    this._camera.position3d.y = 0;
    this._camera.euler.x = Math.PI / 30;
    this._spriteField.addChild(this._camera);

    let bg = new PIXI.projection.Sprite3d();
    this._camera.addChild(bg);
    bg.texture = this._background_img;
    bg.position3d.z = 30;
}

Scene_Snake.prototype.createObjectPoolManager = function() {
    this._objectPoolManager = new Sprite_SnakeObjectPoolManager(this._camera, this._cloud_img);
    this.addChild(this._objectPoolManager);
}

Scene_Snake.prototype.createScoreText = function() {	
    this._scoretext_sprite = new Sprite(new Bitmap(250,48));
    this._scoretext_sprite.anchor.x = 0.5;
    this._scoretext_sprite.anchor.y = 0.5; 
    this._scoretext_sprite.x = Graphics.boxWidth / 2 + 48;
    this._scoretext_sprite.y = 50;
    this._scoretext_sprite.bitmap.fontSize = 36;
    this._spriteHudBase.addChild(this._scoretext_sprite);
};

Scene_Snake.prototype.createPlayerSprite = function() {	
    this._player_sprite = new Sprite_SnakePlayer();
    this._player_sprite.opacity = 255;
    this._player_sprite.anchor.x = 0;
    this._player_sprite.anchor.y = 0; 
    this._player_sprite.x = 0;
    this._player_sprite.y = 0;

    this._spriteHudBase.addChild(this._player_sprite);
};

Scene_Snake.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    
	this.update_phase();
};

Scene_Snake.prototype.update_phase = function() {
    switch ($gameSystem._snake_phase) {
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

Scene_Snake.prototype.update_start_phase = function() {
    switch (this._phase_state) {
		case 0:
			this._phase_state = 1;
     	    break;
		case 1:
            $gameSystem._snake_phase = 1;
            this._phase_state = 0;		

            // probably want this to be custom music
            BattleManager.playBattleBgm();
		    break;
	};
};

Scene_Snake.prototype.update_play_phase = function() {
    // Update score
    this._scoretext_sprite.bitmap.clear();
    this._scoretext_sprite.bitmap.drawText(this._score,0,0,100,48,"right");
}

Scene_Snake.prototype.update_end_phase = function() {
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
            $gameSystem._snake_phase = 4;
            break;
     };	
 };

Scene_Snake.prototype.terminate = function() {
	Scene_Base.prototype.terminate.call(this);
	BattleManager.replayBgmAndBgs();
	$gameSystem._snake = false;
};

// ===========================================
// * Sprite_SnakePlayer - 
// 
// ===========================================
function Sprite_SnakePlayer() {
    this.initialize.apply(this, arguments);
}

Sprite_SnakePlayer.prototype = Object.create(Sprite_Base.prototype);
Sprite_SnakePlayer.prototype.constructor = Sprite_SnakePlayer;

Sprite_SnakePlayer.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);

    this._head = new Snake_Segment(Snake_Segment.RandomActorId());
    this.addChild(this._head);
    this._head.x = 0;
    this._head.y = 0;
    this._head.dir = 2;
    this.dir = 2;

    this.dT = 0;

    let startingSegs = 3;
    for(let i = startingSegs - 1; i > 0; i--) {
        let seg = new Snake_Segment(Snake_Segment.RandomActorId());
        this.addChild(seg);
        this.AttachSeg(seg);
        seg.x = this._head.x - 48 * i;
        seg.y = this._head.y;
        seg.dir = 2;
    }

    this.spawnFruit();
};

Sprite_SnakePlayer.prototype.spawnFruit = function() {
    this.fruit = new Snake_Segment(Snake_Segment.RandomActorId());
    this.addChild(this.fruit);
    this.fruit._active = false;

    let col = true;
    while(col) {
        col = false;
        this.fruit.x = GameHam.randomIntFromInterval(1, Graphics.boxWidth / 48) * 48 - 48;
        this.fruit.y = GameHam.randomIntFromInterval(1, Graphics.boxHeight / 48) * 48 - 48;
        const checkChildCol = (s) => {
            if(s.x == this.fruit.x && s.y == this.fruit.y) {
                return true;
            }
            if(s.snakeChild) {
                checkChildCol(s.snakeChild);
            }
            return false;
        }

        col = checkChildCol(this._head);
    }
}

Snake_Segment.RandomActorId = function() {
    actor = {};
    while(!actor.characterName) {
        // actor interval can be adjusted
        // this should go to a plugin setting
        let id = GameHam.randomIntFromInterval(1,24);
        actor = $dataActors[id];
    }
    return actor.id;
}

Sprite_SnakePlayer.setActiveChildren = (seg, active) => {
    if(seg.snakeChild) {
        Sprite_SnakePlayer.setActiveChildren(seg.snakeChild, active);
        seg.snakeChild._active = active;
    }
}

Sprite_SnakePlayer.prototype.checkCollision = function() {
    pos = {x: this._head.x, y: this._head.y};
    Scene_Snake.AddDir(pos, this.dir, 48);

    const check = (s) => {
        if (s.x == pos.x && s.y == pos.y) {
            return true;
        } else if(s.snakeChild) {
            return check(s.snakeChild);
        }
        return false;
    };

    if(pos.x < 0 || pos.x > Graphics.boxWidth || pos.y > Graphics.boxHeight || pos.y < 0) {
        // death
        Snake_Segment.speed = 0;
    }

    if(check(this._head)) {
        // death
        Snake_Segment.speed = 0;
    }

    // check food
    if(this.fruit.x == this._head.x && this.fruit.y == this._head.y) {
        this.fruit.dir = this._head.dir;
        this._head.dir = this.dir;

        this.AttachSeg(this.fruit);
        this.spawnFruit();
        Sprite_SnakePlayer.setActiveChildren(this._head, false);

        this.eaten = true;
        if(Snake_Segment.speed<4) {
            Snake_Segment.speed+=0.5;
        } else if(Snake_Segment.speed<6) {
                Snake_Segment.speed+=1;
        } else if(Snake_Segment.speed<8) {
            Snake_Segment.speed+=2;
        }
        
        // add score
        this._score++;
    } else {
        this.updateChildrenDir();
    }
}

Sprite_SnakePlayer.prototype.updateChildrenDir = function() {
    const setChildrenDir = (s, dir) => {
        if(s.snakeChild) {
            setChildrenDir(s.snakeChild, s.dir);
        }
        s.dir = dir;
    }

    setChildrenDir(this._head, this.dir);
}

Sprite_SnakePlayer.prototype.AttachSeg = function(seg) {
    seg.snakeChild = this._head.snakeChild;

    this._head.snakeChild = seg;
}

Sprite_SnakePlayer.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

    // only update during gameplay phase
	if($gameSystem._snake_phase !== 1) return;

    this.updateInput();

    if(this._head.x % 48 == 0 && this._head.y % 48 == 0) {        
        // eaten
        if(this.eaten) {
            Sprite_SnakePlayer.setActiveChildren(this._head, true);
            this.eaten = false;
        }

        this.checkCollision();
    }

    // Update background
    this.dT++;
    SceneManager._scene._camera.euler.x = Math.sin(this.dT/500) / 50;
    SceneManager._scene._camera.euler.y = Math.cos(this.dT/500) / 50;
};

Scene_Snake.AddDir = function(obj, dir, scale) {
    switch(dir) {
        case 0: {
            let org = Math.floor(obj.y / 48);
            obj.y+=scale;
            if(org != Math.floor(obj.y / 48)) {
                obj.y = Math.floor(obj.y / 48) * 48;
            }
            break;
        }
        case 1: {
            let org = Math.ceil(obj.x / 48);
            obj.x-=scale;
            if(org != Math.ceil(obj.x / 48)) {
                obj.x = Math.ceil(obj.x / 48) * 48;
            }
            break;
        }
        case 2: {
            let org = Math.floor(obj.x / 48);
            obj.x+=scale;
            if(org != Math.floor(obj.x / 48)) {
                obj.x = Math.floor(obj.x / 48) * 48;
            }
            break;
        }
        case 3: {
            let org = Math.ceil(obj.y / 48);
            obj.y-=scale;
            if(org != Math.ceil(obj.y / 48)) {
                obj.y = Math.ceil(obj.y / 48) * 48;
            }
            break;
        }
    }
}

Sprite_SnakePlayer.prototype.updateInput = function() {
    Sprite_Base.prototype.update.call(this);

    if(Input.isPressed("right")) {
        this.dir = 2;
    } else if (Input.isPressed("left")) {
        this.dir = 1;
    } else if (Input.isPressed("up")) {
        this.dir = 3;
    }  else if (Input.isPressed("down")) {
        this.dir = 0;
    }
};


// ===========================================
// * Sprite_SnakeObjectPoolManager -
// *
// ===========================================
function Sprite_SnakeObjectPoolManager() {
    this.initialize.apply(this, arguments);
}

Sprite_SnakeObjectPoolManager.prototype = Object.create(Sprite_Base.prototype);
Sprite_SnakeObjectPoolManager.prototype.constructor = Sprite_SnakePlayer;

Sprite_SnakeObjectPoolManager.prototype.initialize = function(camera, texture) {
    Sprite_Base.prototype.initialize.call(this);

    this.maxClouds = 50;
    this.fieldSize = 5000;
    this.clouds = [];
    for(let i = 0; i < this.maxClouds; i++) {
        let cloud = new PIXI.projection.Sprite3d();
        camera.addChild(cloud);
        cloud.texture = texture;
        cloud.position3d.y = Math.random() * this.fieldSize - (this.fieldSize / 2);
        cloud.position3d.x = Math.random() * this.fieldSize - (this.fieldSize / 2);
        cloud.position3d.z = Math.random() * 5;
        let scale = Math.random();
        cloud.scale.x = scale;
        cloud.scale.y = scale;
        this.clouds.push(cloud);
    }
};

Sprite_SnakeObjectPoolManager.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

    this.clouds.forEach(cloud => {
        cloud.position3d.x++;
        if(cloud.position3d.x > this.fieldSize / 2) {
            cloud.position3d.x = -this.fieldSize / 2;
        }
    });
};


// yep
function Snake_Segment() {
    this.initialize.apply(this, arguments);
}

Snake_Segment.prototype = Object.create(Sprite_Base.prototype);
Snake_Segment.prototype.constructor = Snake_Segment;

Snake_Segment.prototype.initialize = function(actorIndex) {
    Sprite_Base.prototype.initialize.call(this);
    this._actorIndex = actorIndex;
    this.bitmap = ImageManager.loadCharacter(this.actor().characterName);
    this._animation_timer = 0;
    this.dir = 0;
    this.snakeChild = null;
    this._active = true;

    this.setAnimation(this.dir);
}

Snake_Segment.speed = 1;

Snake_Segment.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

    // only update during gameplay phase
	if($gameSystem._snake_phase !== 1) return;

    if(this._active) {
        Scene_Snake.AddDir(this, this.dir, Snake_Segment.speed);
        this.setAnimation(this.dir);
    }

    this.updateAnimation();
}

Snake_Segment.animationSpeed = 10;
Snake_Segment.animationFrames = 3;
Snake_Segment.animationTypes = 4;

Snake_Segment.prototype.updateAnimation = function() {
    this._animation_timer++;
    let cur = Math.floor(this._animation_timer / Snake_Segment.animationSpeed) % Snake_Segment.animationFrames; 
    this.setAnimationFrame(cur);
}

Snake_Segment.prototype.setAnimationFrame = function(frame) {
    let w = 48;
    let h = 48;
    this.setFrame((this.characterBlockX() + frame) * w, (this.characterBlockY() + this._animation_type) * h, w, h);
}

Snake_Segment.prototype.setAnimation = function(type) {
    if(this._animation_type != type) {
        this._animation_type = type;
        this.setAnimationFrame(this._animation_timer);
    }
}

Snake_Segment.prototype.actor = function() {
    return $dataActors[this._actorIndex];
};

Snake_Segment.prototype.characterBlockX = function() {
    var index = this.actor().characterIndex;
    return index % 4 * 3;
};

Snake_Segment.prototype.characterBlockY = function() {
    var index = this.actor().characterIndex;
    return Math.floor(index / 4) * 4;
};