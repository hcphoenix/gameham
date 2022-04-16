var Imported = Imported || {};
Imported["GH_KeywordTooltips"] = true;

var GH_KeywordTooltips = GH_KeywordTooltips || {};


(function (_) { 
    "use strict";

    Scene_Battle.prototype.execute_keyword_tooltips = function() {
        SceneManager.snapForBackground();
        $gameSystem.keywordTooltips();
    };

    // Disable battle fading
    _.Scene_Battle_prototype_stop = Scene_Battle.prototype.stop;
    Scene_Battle.prototype.stop = function() {
        if(SceneManager._nextScene && SceneManager._nextScene.constructor == Scene_KeywordTooltips) {
            Scene_Base.prototype.stop.call(this);
            //this._statusWindow.close();
            //this._partyCommandWindow.close();
            //this._actorCommandWindow.close();
        } else {
            _.Scene_Battle_prototype_stop.call(this);
        }
    };

    _.Scene_Battle_prototype_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        if(SceneManager._previousClass == Scene_KeywordTooltips) {
            Scene_Base.prototype.start.call(this);
            BattleManager.playBattleBgm();
            //q BattleManager.startBattle()
        } else {
            _.Scene_Battle_prototype_start.call(this);
        }
    };

    _.Scene_Battle_prototype_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        if(SceneManager._nextScene && SceneManager._nextScene.constructor == Scene_KeywordTooltips) {
            Scene_Base.prototype.terminate.call(this);
        } else {
            _.Scene_Battle_prototype_terminate.call(this);
        }
    };

    _.Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _.Scene_Battle_update.call(this);

        if(Input.isTriggered("#shift")) {
            this.execute_keyword_tooltips();
        }
    };

    /* ============================
        Game_System
    
    */
    _._Game_System_prototype_initialize = Game_System.prototype.initialize
    Game_System.prototype.initialize = function() {
        _._Game_System_prototype_initialize.call(this);	
        this._keyword_tooltips = false; // is it active
    };

    Game_System.prototype.keywordTooltips = function() {
        if (this._keyword_tooltips) {return};
        let previousScene = SceneManager._scene;
        Scene_KeywordTooltips._previous_scene = previousScene;
        SceneManager.push(Scene_KeywordTooltips);
    };
    
    /* ============================
        Scene_KeywordTooltips
    */
    function Scene_KeywordTooltips() {
        this.initialize.apply(this, arguments);
    }

    Scene_KeywordTooltips.prototype = Object.create(Scene_Base.prototype);
    Scene_KeywordTooltips.prototype.constructor = Scene_KeywordTooltips;

    Scene_KeywordTooltips.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
    };


    Scene_KeywordTooltips.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);	
        
        $gameSystem._keyword_tooltips = true; // now active

        this._battlers = $gameParty.battleMembers();

        this.setupButtons();
    }

    Scene_KeywordTooltips.prototype.setupButtons = function() {
        this.load_images();
        
        this.setupBackground();
        this.scrapeChildren(Scene_KeywordTooltips._previous_scene);
        
        this.createWindowLayer();
        this.setupTooltipWindow();
    }

    Scene_KeywordTooltips.prototype.setupTooltipWindow = function() {
        this._helpWindow = new Window_Help();
        this.addWindow(this._helpWindow);
        this._helpWindow.opacity = 0;
    }

    Scene_KeywordTooltips.prototype.setupBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
        this._backgroundSprite.opacity = 255;
    }
    
    Scene_KeywordTooltips.prototype.scrapeChildren = function(container) {
        let text = container._text;
        if(text != undefined) {
            if(text != "") {
                console.log(container);
                console.log(text);
                let index = text.indexOf("bird");
                if(index != -1) {
                    let btn = new Sprite_TooltipNode();
                    btn.bitmap = this._helper_node_img;
                    btn.anchor.set(0.5, 0.5);
                    
                    btn.x = container.x + index * 20;
                    btn.y = container.y + 20;
                    this.addChild(btn);
                }
            }
        } else {
            if(container.children != undefined) {
                container.children.forEach(c => this.scrapeChildren(c));
            }
        }
    }

    Scene_KeywordTooltips.prototype.load_images = function() {
        this._helper_node_img = ImageManager.loadBitmap('img/cursors/', "crosshair", 0, true);
    }

    Scene_KeywordTooltips.prototype.update = function() {
        Scene_Base.prototype.update.call(this);

        if(Input.isTriggered("#esc") || Input.isTriggered("#shift")) {
            console.log("test");
            SceneManager.pop();
        }
    };

    Scene_KeywordTooltips.prototype.terminate = function() {
        Scene_Base.prototype.terminate.call(this);

        $gameSystem._keyword_tooltips = false;
    };

    /* ====================================== 
        SPRITE TOOLTIP NODE 
    ==================================
    */
    function Sprite_TooltipNode() {
        this.initialize.apply(this, arguments);
    }
    
    Sprite_TooltipNode.prototype = Object.create(Sprite.prototype);
    Sprite_TooltipNode.prototype.constructor = Sprite_TooltipNode;
    
    Sprite_TooltipNode.prototype.initialize = function () {
        Sprite.prototype.initialize.call(this);
    }

    Sprite_TooltipNode.prototype.update = function () {
        Sprite.prototype.update.call(this);

        if(this._hovered) {
            SceneManager._scene._helpWindow.x = TouchInput._mouseOverX;
            SceneManager._scene._helpWindow.y = TouchInput._mouseOverY;
            SceneManager._scene._helpWindow.opacity = 255;
        } else {
            SceneManager._scene._helpWindow.opacity = 0;
        }
    }

})(GH_KeywordTooltips);