/*:
 * @plugindesc (v1.0) Chess
 * @author contentdeleted
 *
 * @help  
 * =============================================================================
 * 
 * RPG maker chess 
 * 
 * ============================================================================= 
*/

var Imported = Imported || {};
Imported.GH_RpgChess = true;

var GH_RpgChess = GH_RpgChess || {};

// For loading images that are used in 3d perspective objects
ImageManager.loadRpgChessTexture = function(filename) {
    var path = 'img/rpgchess/' + encodeURIComponent(filename) + '.png';
    return PIXI.Texture.from(path);
};

// All other sprite images are loaded like this
ImageManager.loadRpgChessBitmap = function (filename) {
    return this.loadBitmap('img/rpgchess/', filename, 0, true);
};


//=============================================================================
// ** Game_Interpreter
//=============================================================================	

GH_RpgChess._Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	GH_RpgChess._Game_Interpreter_prototype_pluginCommand.call(this,command, args)
	if (command === "rpgchess")  {
        $gameSystem._rpgchess_start = true;
        this.wait(10);
    };	
	return true;
};

//=============================================================================
// ** Scene Map
// * This is where we hook in the scene flag
//=============================================================================	

GH_RpgChess.an_Scene_Map_prototype_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function() {
	GH_RpgChess.an_Scene_Map_prototype_update.call(this);
	if ($gameSystem._rpgchess_start) {
        this.execute_rpgchess();
    }
};

Scene_Map.prototype.execute_rpgchess = function() {
    $gameSystem._rpgchess_start = false;
    this.startFadeOut(this.fadeSpeed());
    $gameSystem.rpgchess();
};

//=============================================================================
// ** Game_System
//=============================================================================	

GH_RpgChess._Game_System_prototype_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
    GH_RpgChess._Game_System_prototype_initialize.call(this);	
	this._rpgchess = false; // is it active
	this._rpgchess_start = false; // flag to activate
	this._rpgchess_phase = 0; // 0 -> start, 1 -> play, 2 -> results
};

Game_System.prototype.rpgchess = function() {
    // Maybe not important, but probably will cause issues if the party is dead for some reason
	if ($gameParty.battleMembers().length === 0) {return};
    SceneManager.push(Scene_RpgChess);
};

//=============================================================================
// ** Scene_RpgChess
// * This is the actual scene definition, its pretty straight forward
// * We have several phases, in this case intro, gameplay, and result
// * When results are finished the scene is pop'd off the scene manager stack 
// * and we go back to wherever it was called
//=============================================================================

function Scene_RpgChess() {
    this.initialize.apply(this, arguments);
}

Scene_RpgChess.prototype = Object.create(Scene_Base.prototype);
Scene_RpgChess.prototype.constructor = Scene_RpgChess;

Scene_RpgChess.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);	
     
    $gameSystem._rpgchess_start = false; // already started
    $gameSystem._rpgchess = true; // now active
    $gameSystem._rpgchess_phase = 0; // start phase
    this._phase_state = 0; // incremented at each point in a phase ie fade in -> wait for input -> fade out

    BattleManager.saveBgmAndBgs();
	AudioManager.fadeOutBgm(2);
	AudioManager.stopBgs();

    this.chess = new ChessModule.Chess();

    this.createDisplayObjects();
    this.startFadeIn(60, false);

    this._timer = 0;
    this.holding = false;
    this.canMove = true;
}

Scene_RpgChess.prototype.load_images = function() {
    //this._player_img = ImageManager.loadRpgChessBitmap("player");
    this.cursor_img = ImageManager.loadSystem("talon");
    this.hold_img = ImageManager.loadSystem("clutch");
}

Scene_RpgChess.prototype.createDisplayObjects = function() {
    this.load_images();

    // These are basically needed for scene layout and dont have rendered images
    this._spriteField = new Sprite();	
	this.addChild(this._spriteField);

	this._spriteHudBase = new Sprite();
	this.addChild(this._spriteHudBase);

    this.createPieceSprites();
    
    this.createTextSprite();

    this.createCursorSprite();
}

Scene_RpgChess.prototype.createTextSprite = function() {
    this.textSprite = new Sprite(new Bitmap(300, 48));
    this.textSprite.anchor.x = 0.5;
    this.textSprite.anchor.y = 0.5;
    this.textSprite.x = Graphics.boxWidth / 2;
    this.textSprite.y = Graphics.boxHeight / 2;
    this.textSprite.bitmap.sfont = VictorEngine.SFont.defaultSFont();
    this.addChild(this.textSprite);
}

Scene_RpgChess.prototype.createCursorSprite = function() {
    this.cursorSprite = new Sprite(this.cursor_img);
    this.cursorSprite.anchor.x = 0.5;
    this.cursorSprite.anchor.y = 0.5;
	this.addChild(this.cursorSprite);

    let piece = new Sprite_ChessPiece();
    piece.anchor.x = 0.5;
    piece.anchor.y = 0;
    this.addChild(piece);
    this.cursorSprite.piece = piece;

    this.addChild(this.cursorSprite);
}

Scene_RpgChess.boardX = 200; // Position of the upper left of the board
Scene_RpgChess.boardY = 100;
Scene_RpgChess.tileSize = 50; // height and width of a square

Scene_RpgChess.prototype.createPieceSprites = function() {
    let current = this.chess.board();
    this.pieceSprites = [];
    for(let y = 0; y < current.length; y++) {
        this.pieceSprites[y] = this.pieceSprites[y] || [];
        for(let x = 0; x < current[y].length; x++) {
            let piece = new Sprite_ChessPiece();
            piece.x = Scene_RpgChess.boardX + x * Scene_RpgChess.tileSize;
            piece.y = Scene_RpgChess.boardY + y * Scene_RpgChess.tileSize;
            this.pieceSprites[y][x] = piece;
            this.addChild(piece);

            // create new sprite size of a tile
            let flash = new Sprite(new Bitmap(Scene_RpgChess.tileSize, Scene_RpgChess.tileSize));
            flash.x = piece.x;
            flash.y = piece.y;

            // fill sprite with white
            let color = 'rgba(255, 255, 255, 0.5)';
            flash.bitmap.fillRect(0, 0, Scene_RpgChess.tileSize, Scene_RpgChess.tileSize, color);

            flash.opacity = 0;
            this.addChild(flash);
            piece.flashSprite = flash;
        }
    }
};

Scene_RpgChess.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    
	this.update_phase();
};

Scene_RpgChess.prototype.update_phase = function() {
    switch ($gameSystem._rpgchess_phase) {
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

Scene_RpgChess.prototype.update_start_phase = function() {
    switch (this._phase_state) {
		case 0:
			this._phase_state = 1;
     	    break;
		case 1:
            $gameSystem._rpgchess_phase = 1;
            this._phase_state = 0;		

            // probably want this to be custom music
            BattleManager.playBattleBgm();
		    break;
	};
};

Scene_RpgChess.bActorIds = {
    'p': [0, "enemy_maps_1"], // PAWN
    'n': [0, "enemy_maps_3"], // KNIGHT
    'b': [5, "enemy_maps_7"], // BISHOP
    'r': [0, "enemy_maps_2"], // ROOK
    'q': [5, "enemy_maps_2"], // QUEEN
    'k': [1, "enemy_maps_7"], // KING
};


Scene_RpgChess.wActorIds = {
    'p': 1, // PAWN
    'n': 4, // KNIGHT
    'b': 7, // BISHOP
    'r': 10, // ROOK
    'q': 13, // QUEEN
    'k': 16, // KING
}

Scene_RpgChess.prototype.update_play_phase = function() {
    this.updateCursor();
    this.updateEnemy();
    this.updatePieces();
    this.checkState();

    this._timer++;
}

Scene_RpgChess.prototype.checkState = function() {
    if(this.chess.in_checkmate()) {
        $gameSystem._rpgchess_phase = 2;
        this.gameResult = this.canMove ? 'won' : 'lost';
        console.log(this.gameResult);
    } else if(this.chess.in_draw()) {
        $gameSystem._rpgchess_phase = 2;
        this.gameResult = 'tie';
        console.log(this.gameResult);
    }
}

Scene_RpgChess.prototype.updateEnemy = function() {
    if(!this.canMove) {
        const moves = this.chess.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        this.chess.move(move);
        this.canMove = true;
    }
}

Scene_RpgChess.prototype.updatePieces = function() {
    let current = this.chess.board();
    let pickedUp = this.holding ? this.fromSquare(this.pieceFrom) : null;
    for(let y = 0; y < current.length; y++) {
        for(let x = 0; x < current[y].length; x++) {
            let piece = this.pieceSprites[y][x];
            let boardSquare = current[y][x];
            if( (!pickedUp || pickedUp[0] != x || pickedUp[1] != y) && boardSquare) {
                piece.visible = true;
                piece.opacity = 255;
                if(boardSquare.color === 'b') {
                    let info = Scene_RpgChess.bActorIds[boardSquare.type];
                    piece.setActor(info[1], info[0]);
                } else {
                    let info = $dataActors[Scene_RpgChess.wActorIds[boardSquare.type]];
                    piece.setActor(info.characterName, info.characterIndex);
                }
            } else {
                piece.visible = false;
                piece.opacity = 0;
            }
        }
    }
}

Scene_RpgChess.prototype.cursorTile = function() {
    let x = Math.floor((this.cursorSprite.x - Scene_RpgChess.boardX) / Scene_RpgChess.tileSize);
    let y = Math.floor((this.cursorSprite.y - Scene_RpgChess.boardY) / Scene_RpgChess.tileSize);

    if(x >= 0 && x < 8 && y >= 0 && y < 8) {
        return [x, y];
    }

    return null;
}

Scene_RpgChess.prototype.toSquare = function(x, y) {
    return `${String.fromCharCode(97 + x)}${8 - y}`
}

Scene_RpgChess.anyNumber = /\d+/;
Scene_RpgChess.prototype.fromSquare = function(str) {
    let l = str.length;
    while(str[l-1].match(Scene_RpgChess.anyNumber) == null)
    {
        l--;
    }
    return [parseInt(str[l-2], 36) - 10, 8 - parseInt(str[l-1])];
}

Scene_RpgChess.prototype.updateCursor = function() {
    this.cursorSprite.x = TouchInput._mouseX;
    this.cursorSprite.y = TouchInput._mouseY;

    let currentTile = this.cursorTile();
    if(this.holding) {
        // make the viable spaces flash
        for(let i = 0; i < this.validMoves.length; i++) {
            let cur = this.fromSquare(this.validMoves[i]);
            let flash = this.pieceSprites[cur[1]][cur[0]].flashSprite;
            flash.visible = true;
            flash.opacity = 2 * Math.abs(50 - this._timer % 100);
        }

        if(TouchInput.isReleased() && currentTile != null ) {
            let currentTile = this.cursorTile();
            let square = this.toSquare(currentTile[0], currentTile[1]);
            if(this.validMoves.some( move => move.contains(square))) {
                this.canMove = false;
                //this.chess.move(`${this.heldPiece.toUpperCase()}${this.pieceFrom}${square}`, {sloppy: true});
                this.chess.move({ from: this.pieceFrom, to: square, promotion: 'q', sloppy: true });
            }
            this.holding = false;

            // clear flashing
            for(let i = 0; i < this.validMoves.length; i++) {
                let cur = this.fromSquare(this.validMoves[i]);
                let flash = this.pieceSprites[cur[1]][cur[0]].flashSprite;
                flash.visible = false;
            }

            // clear held piece
            this.cursorSprite.piece.visible = false;
            this.cursorSprite.piece.opacity = 0;
        }
    } else {
        if(this.canMove && TouchInput.isTriggered() && currentTile != null) {
            let square = this.toSquare(currentTile[0], currentTile[1]);
            this.validMoves = this.chess.moves({ 'square': square });
            if(this.validMoves && this.validMoves.length) {
                this.holding = true;
                this.heldPiece = this.chess.get(square).type;
                this.pieceFrom = square;
                
                // set held piece 
                this.cursorSprite.piece.opacity = 255;
                this.cursorSprite.piece.visible = true;
                let info = $dataActors[Scene_RpgChess.wActorIds[this.heldPiece]];
                this.cursorSprite.piece.setActor(info.characterName, info.characterIndex);

                console.log(this.validMoves);
            }
        }
    }

    this.updateCursorSprite();
}

Scene_RpgChess.prototype.updateCursorSprite = function()  {
    let w = 48;
    let h = 45;
    if(this.holding) {
        this.cursorSprite.bitmap = this.hold_img;
        this.cursorSprite.setFrame(0,0,w,h);
    } else {
        let x = Math.floor(this._timer / 5) % 3;
        this.cursorSprite.bitmap = this.cursor_img;
        this.cursorSprite.setFrame(x * w, 0, w, h);
    }

    this.cursorSprite.piece.x = this.cursorSprite.x;
    this.cursorSprite.piece.y = this.cursorSprite.y;
    
}


Scene_RpgChess.prototype.update_end_phase = function() {
    switch (this._phase_state) {
        case 0:
            this._phase_state = 1;
            this.gameResult = this.gameResult || "won?";
            this._gameFinalText = `GAME ${this.gameResult.toUpperCase()}`;
            this._gameTextTimer = 0;
            AudioManager.fadeOutBgm(1);
            break;
        case 1:
            let cur = Math.floor(this._gameTextTimer / 10);
            if(cur <= this._gameFinalText.length) {
                let text = this._gameFinalText.substring(0, cur);
                this.textSprite.bitmap.clear();
                this.textSprite.bitmap.drawText(text, 0, 0, this.textSprite.bitmap.width, this.textSprite.bitmap.height, "center");
            } else {
                this._phase_state = 2;
            }
            this._gameTextTimer++;
            break;
        case 2:
            // wait for input
            if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
                SoundManager.playCursor();
                this._phase_state = 3;
            }
            break;
        case 3:
            // probably set a game variable with the score
            this.fadeOutAll();
            SceneManager.pop();
            $gameSystem._rpgchess_phase = 4;
            break;
     };	
 };

Scene_RpgChess.prototype.terminate = function() {
	Scene_Base.prototype.terminate.call(this);
	BattleManager.replayBgmAndBgs();
	$gameSystem._rpgchess = false;
};


// ===========================================
// * Sprite_ChessPiece
// 
// This sprite definition exists for actor map sprites
// I could probably make it a global sprite since I figure Ill probably use it
// more than just here (already copied from snake and character select) but I am lazy
//
// Holy shit I gotta stop doing this
//
// ===========================================
function Sprite_ChessPiece() {
    this.initialize.apply(this, arguments);
}

Sprite_ChessPiece.prototype = Object.create(Sprite_Base.prototype);
Sprite_ChessPiece.prototype.constructor = Sprite_ChessPiece;

Sprite_ChessPiece.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
    
    this._animation_timer = 0;
    this.dir = 0;

    this.characterName = "";
    this.characterIndex = "";
    this.visible = false;

    this.setAnimation(this.dir);
}

Sprite_ChessPiece.speed = 1;

Sprite_ChessPiece.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);

    this._animation_timer++;
    this.updateAnimation();
}

Sprite_ChessPiece.prototype.setActor = function(characterName, characterIndex) {
    this.characterName = characterName;
    this.characterIndex = characterIndex;
    this.bitmap = ImageManager.loadCharacter(this.characterName);
    this.updateAnimation();
}

Sprite_ChessPiece.animationSpeed = 10;
Sprite_ChessPiece.animationFrames = 3;
Sprite_ChessPiece.animationTypes = 4;

Sprite_ChessPiece.prototype.updateAnimation = function() {
    let cur = Math.floor(this._animation_timer / Sprite_ChessPiece.animationSpeed) % Sprite_ChessPiece.animationFrames; 
    this.setAnimationFrame(cur);
}

Sprite_ChessPiece.prototype.setAnimationFrame = function(frame) {
    if(!this.visible) return;
    let w = 48;
    let h = 48;
    this.setFrame((this.characterBlockX() + frame) * w, (this.characterBlockY() + this._animation_type) * h, w, h);
}

Sprite_ChessPiece.prototype.setAnimation = function(type) {
    if(this._animation_type != type) {
        this._animation_type = type;
        this.setAnimationFrame(this._animation_timer);
    }
}


Sprite_ChessPiece.prototype.characterBlockX = function() {
    var index = this.characterIndex;
    return index % 4 * 3;
};

Sprite_ChessPiece.prototype.characterBlockY = function() {
    var index = this.characterIndex;
    return Math.floor(index / 4) * 4;
};