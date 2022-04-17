var Imported = Imported || {};
Imported["GH_EnemyBars"] = true;

var GH_EnemyBars = GH_EnemyBars || {};


(function (_) { 
    "use strict";
    
    // Helper for loading images from our subfolder
    ImageManager.loadBarBitmap = function (filename) {
        return this.loadBitmap('img/enemybars/', filename, 0, true);
    };

    // Extend the enemy sprite init to add bars
    _.Sprite_Enemy_prototype_initialize = Sprite_Enemy.prototype.initialize;
    Sprite_Enemy.prototype.initialize = function (battler) {
        _.Sprite_Enemy_prototype_initialize.call(this, battler);

        let hp_bar = new Enemy_Bar(this, "hp", "left");
        let mp_bar = new Enemy_Bar(this, "mp", "right");

        this.addChild(hp_bar);
        this.addChild(mp_bar);
    };

    // ------------------------
    //        Enemy_Bar
    // Defines the enemy bar type which is a sprite with
    // a custom update function
    // ------------------------
    function Enemy_Bar() {
        this.initialize.apply(this, arguments);
    }
    
    Enemy_Bar.prototype = Object.create(Sprite_Base.prototype);
    Enemy_Bar.prototype.constructor = Sprite_Battler;
    
    // Enemy bar constructor takes
    // enemySprite - enemy battler sprite this is attached to
    // prop - battler property to track ie hp, mp, tp
    // pos - which side of the enemy to display on ie left right
    Enemy_Bar.prototype.initialize = function(enemySprite, prop, pos) {
        Sprite_Base.prototype.initialize.call(this);
        
        this._enemySprite = enemySprite;
        this._enemy = enemySprite._enemy;
        this._prop = prop;
        this._pos = pos;
        
        this.SetPosition(this._pos);
        this.SetupSprites();
        this.setFill();
    };

    Enemy_Bar.prototype.SetupSprites = function() {
        // load images
        this._bar_front_img = ImageManager.loadBarBitmap(this._prop+"_bar_front");
        this._bar_back_img = ImageManager.loadBarBitmap(this._prop+"_bar_back");
        this._numbers_img = ImageManager.loadBarBitmap("numbers");

        // create new sprites
        this._back_bar = new Sprite(this._bar_back_img);
        this._back_bar.anchor.set(0.5, 0.5);
        this.addChild(this._back_bar);

        this._front_bar = new Sprite(this._bar_front_img);
        this._front_bar.anchor.set(0.5, 0.5);
        this.addChild(this._front_bar);

        // support up to 3 digits
        this._text_sprites = [];
        for(let i = 0; i < 3; i++) {
            let text_sprite = new Sprite(this._numbers_img);
            text_sprite.anchor.set(0.5, 0.5);
            text_sprite.opacity = 0;
            this.addChild(text_sprite);
            this._text_sprites[i] = text_sprite;
        }
    }

    Enemy_Bar.prototype.SetPosition = function(dir) {
        //let w = this._enemySprite._mainSprite.width;
        //let h = this._enemySprite._mainSprite.height;

        // this is probably what we want for the outer ones ie items
        //(w / 3) * (dir == 'left' ? -1 : 1);
        this.x = 25 * (dir == 'left' ? -1 : 1);
        this.y = 25;
        this._positionSet = true;
    }

    Enemy_Bar.prototype.setFill = function() {
        if(!this._enemySprite.visible) {
            this.visible = false;
            return;
        }
        let w = this._front_bar._bitmap.width;
        let h = this._front_bar._bitmap.height;
        // example: _hp / _mhp
        let fillAmount = this._enemy["_"+this._prop] / this._enemy["m"+this._prop];
        this._front_bar.setFrame(0, h * (1 - fillAmount), w, h * fillAmount);
        this._front_bar.y = h/2 * (1 - fillAmount);
    }

    Enemy_Bar.prototype.setText = function() {
        let cur = this._enemy["_"+this._prop];
        let numbers = Math.abs(cur).toString().split("").reverse();
        let count = numbers.length;

        for(let i = 0; i < 3; i++) {
            let sprite = this._text_sprites[i];
            if(i < count) {
                sprite.opacity = 255;
                let w = sprite._bitmap.width / 10;
                let h = sprite._bitmap.height;
                sprite.setFrame(w * Number(numbers[i]), 0, w, h);
                sprite.x = i * w;
            } else {
                sprite.opacity = 0;
            }
        }
        // This part is kinda hard im tired bye
    }

    Enemy_Bar.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);

        //if(this._enemySprite._mainSprite._bitmap) 
        this.setFill();
        this.setText();
    }



})(GH_EnemyBars);