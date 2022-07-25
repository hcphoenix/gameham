/* 
 * GAME HAM TOOLTIPS: 
 * TODO: 
 *  ADD WORDS TO THIS HEADER 
*/
var Imported = Imported || {};
Imported["GH_Tooltips"] = true;

var GH_Tooltips = GH_Tooltips || {};

(function (_) { 
    "use strict";

    _.formatNote = function(note) {
        // I actually dont feel like we need a tag since we dont use the notes for anything else
        // but here's how we'd do that
        //let notes = note.match(/<HELP DESCRIPTION>(.*?)<\/HELP DESCRIPTION>/i);
        return note || "No description";
    };

    _.formatStateMessage = function(name, id, note) {
        return `<WordWrap>\\I[${id}] ${name} - ${_.formatNote(note)}`
    }
    _.findWindowDepth = function (obj) {
        if(obj == null || obj.parent == null) return null;

        if(obj.parent.constructor.toString().contains("Window")) {
            let c = obj.parent.parent.children;
            for(let i = 0; i < c.length; i++) {
                if(c[i] == obj.parent) {
                    return i;
                }
            }

            return null;
        } else {
            return _.findWindowDepth(parent);
        }
    };

    _.Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
    Sprite_StateIcon.prototype.update = function() {
        _.Sprite_StateIcon_update.call(this);

        if(this._hovered) {
            let text = ""
            let states = this._battler.states();
            states.forEach(s => 
            {
                text += _.formatStateMessage(s.name, s.iconIndex, s.note);
            });
            SceneManager._scene._tooltip_window.show(text, this);
        }
    };

    // MOG Battle HUD support
    _.Battle_Hud_update = Battle_Hud.prototype.update;
    Battle_Hud.prototype.update = function () {
        _.Battle_Hud_update.call(this);
        if(this._battler) {
            let states = this._battler.states();
            for (i = 0; i < this._stateIconsCount; i++){
                let icon = this._stateIcons[i];
                
                if(icon && icon._hovered) {
                    let s = states[i];
                    let text = _.formatStateMessage(s.name, s.iconIndex, s.note);
                    SceneManager._scene._tooltip_window.show(text, icon);
                }
            }

            if(this._hp_meter_red && this._hp_meter_red._hovered) {
                let text = "Health: Tracks the birds vitality.\nDeath occurs when it drops to zero."
                SceneManager._scene._tooltip_window.show(text, this._hp_meter_red);
            }

            if(this._mp_meter_red && this._mp_meter_red._hovered) {
                let text = "Stomach: Tracks the birds hunger.\nStarvation occurs when it drops to zero."
                SceneManager._scene._tooltip_window.show(text, this._mp_meter_red);
            }

            if(this._tp_meter_red && this._tp_meter_red._hovered) {
                let text = "Uhh rage maybe?: Tracks something i dont know you write this one"
                SceneManager._scene._tooltip_window.show(text, this._tp_meter_red);
            }
        }
    };

    _.Enemy_Bar_Text = {
        hp: "Fear: When this fills the enemy runs away.\nEscape damage is lessened the more fear an enemy has.",
        mp: "Distraction: Effects steal chance,\nhigher distraction is higher chance to steal.",
        tp: "Rage: Does this work like players? I should never be hired as a technical writer.",
    };

    _.Enemy_Bar_prototype_update = Enemy_Bar.prototype.update;
    Enemy_Bar.prototype.update = function() {
        _.Enemy_Bar_prototype_update.call(this);
        
        if(SceneManager._scene._tooltip_window && this._back_bar._hovered) {
            let text = _.Enemy_Bar_Text[this._prop];
            SceneManager._scene._tooltip_window.show(text, this._back_bar);
        }
    };

    // --------------------------
    //         Window_Base
    // Inject code to catalog anytime an icon is printed in text
    //--------------------------
    _.Window_Base_Init = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        _.Window_Base_Init.call(this, x, y, width, height);
        this._stateIcons = [];
    }

    _.Window_Base_DrawIcon = Window_Base.prototype.drawIcon;
    Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
        _.Window_Base_DrawIcon.call(this, iconIndex, x, y);
        let thisY = this.y;
        let thisX = this.x;
        // This is neccessary for MOG_BattleHud
        if(this.org && this.org.length > 1) {
            thisY = this.org[1];
            thisX = this.org[0];
        }
        this._stateIcons.push({x:(thisX + x), y:(thisY + y), id: iconIndex});
    };

    // On refresh we clear the icon list
    _.Window_Base_Refresh = Window_Base.prototype.refresh;
    Window_Base.prototype.refresh = function() {
        _.Window_Base_Refresh.call(this);

        this._stateIcons = [];
    }

    _.Window_Selectable_Refresh = Window_Selectable.prototype.refresh;
    Window_Selectable.prototype.refresh = function() {
        this._stateIcons = [];
        _.Window_Selectable_Refresh.call(this);
    }

    _.Window_ItemList_Refresh = Window_ItemList.prototype.refresh;
    Window_ItemList.prototype.refresh = function() {
        this._stateIcons = [];
        _.Window_ItemList_Refresh.call(this);
    }
    
    _.Window_SkillList_Refresh = Window_SkillList.prototype.refresh;
    Window_SkillList.prototype.refresh = function() {
        this._stateIcons = [];
        _.Window_SkillList_Refresh.call(this);
    }

    //----------------------------------------------------
    //   Sprite tooltip markers can be hovered to see info
    //----------------------------------------------------
    function Sprite_Tooltip_Marker() {
        this.initialize.apply(this, arguments);
    };

    Sprite_Tooltip_Marker.prototype = Object.create(Sprite_Base.prototype);
    Sprite_Tooltip_Marker.prototype.constructor = Sprite_Tooltip_Marker;

    Sprite_Tooltip_Marker.prototype.initialize = function() {
        Sprite_Base.prototype.initialize.call(this);
        
    };

    Sprite_Tooltip_Marker.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);
        
    };


    //----------------------------------------------------
    //   Sprite tooltip shows up when you hover
    //----------------------------------------------------
    // Hook
    _.createBattleWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function () {
        _.createBattleWindows.call(this);
        this._tooltip_window = new Window_Tooltip();
        this.addWindow(this._tooltip_window);
    }

    _.createMapWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        _.createMapWindows.call(this);
        this._tooltip_window = new Window_Tooltip();
        this.addWindow(this._tooltip_window);
    }

    function Window_Tooltip() {
        this.initialize.apply(this, arguments);
    };

    Window_Tooltip.prototype = Object.create(Window_Base.prototype);
    Window_Tooltip.prototype.constructor = Window_Tooltip;


    // Here we setup the text for each icon in the game
    // This is cached on start and will be used by the text icons later
    _.allIcons = {};
    _.getTextFromIndex = function(index) {
        let i = _.allIcons[index];
        if(i) {
            return _.formatStateMessage(i.name, index, i.note);
        } else {
            return null; // "Not a state";
        }
    };
    Window_Tooltip.prototype.initialize = function() {
        Window_Base.prototype.initialize.call(this, 0, 0, 700, 120);
        
        this.visible = false;
        this.deactivate();
        
        // Setup tooltip text for in text icons
        $dataStates.filter(x => x != null).forEach(s => _.allIcons[s.iconIndex] = s);
    };

    _.checkIconOverlap = function(target) {
        return (TouchInput.x > target.x + Window_Base._iconWidth / 2
            && TouchInput.x < target.x + Window_Base._iconWidth * 1.5
            && TouchInput.y > target.y + Window_Base._iconHeight / 2
            && TouchInput.y < target.y + Window_Base._iconHeight * 1.5);
    };

    // Set x and y to the center of the tile thats being hovered
    Window_Tooltip.prototype.setTileCenter = function() {
        let w = $gameMap.tileWidth();
        let h = $gameMap.tileHeight();
        this.x = Math.floor(TouchInput.x / w) * w + (w/2);
        this.y = Math.floor(TouchInput.y / h) * h + (h/2);
    }

    Window_Tooltip.prototype.update = function() {
        Window_Base.prototype.update.call(this);

        // Seperate processing for map screen now its getting kind of complicated :/
        if(SceneManager._scene instanceof Scene_Map) {
            let mapY = $gameMap.canvasToMapY(TouchInput.y)
            let mapX = $gameMap.canvasToMapX(TouchInput.x);
            let id = $gameMap.tileId(mapX, mapY, 3);
            let tile = Window_Tooltip.Spaces[id];

            if(tile) {
                this.setTileCenter();
                let target = { transient: true };
                
                this.show(tile.text, target, false);
                return;
            }

            let events = $gameMap.eventsXy(mapX, mapY);
            for(let i = 0; i < events.length; i++) {
                // Check for larget hitbox enemies
                if(events[i].x != mapX || events[i].y != mapY) {
                    continue;
                }
                // Handle for spawn events
                let id = events[i]._spawnEventId;
                let event = {};
                if(id) {
                    event = $dataSpawnMap.events[id];
                } else {
                    id = events[i]._eventId;
                    event = $dataMap.events[id];
                }
                if(event.note) {
                    this.setTileCenter();
                    let target = { transient: true };
                    this.show(event.note, target, false);
                    return;
                }
            }
        }

        // erase transient targets 
        if(this._target && this._target.transient) {
            this._target = null;
        }

        // Seperate update process for in text icons
        // We only bother checking for the current active icon
        if(this._target && this._target._isIconText) {
            if(_.checkIconOverlap(this._target)) {
                let text = _.getTextFromIndex(this._target.id);
                if(text) this.show(text, this._target);
                return;
            } else {
                this.hide();
            }
        }

        if(this.visible) {
            // check if we're hovering if not then hide
            if(!this._target || !this._target._hovered) {
                this.hide();
            }
        }

        // Update process to see if any new in text icons are being hovered
        let windows = SceneManager._scene._windowLayer.children.filter(x => x.visible && x.active && x._openness > 0);
        for(let i = 0; i < windows.length; i++) {
            let window = windows[i];

            window._stateIcons.forEach(icon => {
                if(_.checkIconOverlap(icon)) {
                    let text = _.getTextFromIndex(icon.id);
                    if(text) {
                        this.show(text, icon);
                        this._target._isIconText = true;
                        return;
                    }
                }
            });
        }
    };

    Window_Tooltip.Spaces = {
        4: {
            name: "CYOA",
            text: "\\I[1] CYOA - These involve chance encounters and require you to choose how you react."
        },
        12: {
            name: "SHOP",
            text: "\\I[1] Shop - Choose from a selection of three items, if you have the shiny."
        },
        20: {
            name: "INN",
            text: "\\I[1] Inn - Rest your party and recover their health hp points."
        },
        28: {
            name: "WEATHER",
            text: "\\I[1] Bad Weather - Landing on this space will trigger a dangerous effect for the season."
        },
    }

    Window_Tooltip.prototype.show = function(text, target, setXY = true) {
        this.visible = true;
        this.active = true;
        // get the target position and move this sprite to it
        if(setXY) {
            this.x = TouchInput.x;
            this.y = TouchInput.y;
        }
    
        if(this.x + this.width > Graphics.boxWidth) this.x = Graphics.boxWidth - this.width;
        if(this.y + this.height > Graphics.boxHeight) this.y = Graphics.boxHeight - this.height;
    
        if(this._target != target) {
            this.contents.clear();
            this.drawTextEx("<WordWrap>" + text, 5, 5);
            this._target = target;
        }
    };

    Window_Tooltip.prototype.hide = function() {
        this.visible = false;
        this.active = false;
        this._isIconText = false;
        // if you're not on the window hide this
    };

})(GH_Tooltips);