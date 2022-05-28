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

    _.Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
    Sprite_StateIcon.prototype.update = function() {
        _.Sprite_StateIcon_update.call(this);

        if(this._hovered) {
            let text = ""
            let states = this._battler.states();
            states.forEach(s => 
            {
                text += s.name + ": " + _.formatNote(s.note);
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
                
                if(icon._hovered) {
                    let s = states[i];
                    let text = s.name + ": " + _.formatNote(s.note);
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
        
        if(this._back_bar._hovered) {
            let text = _.Enemy_Bar_Text[this._prop];
            SceneManager._scene._tooltip_window.show(text, this._back_bar);
        }
    };

   

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

    function Window_Tooltip() {
        this.initialize.apply(this, arguments);
    };

    Window_Tooltip.prototype = Object.create(Window_Base.prototype);
    Window_Tooltip.prototype.constructor = Window_Tooltip;

    Window_Tooltip.prototype.initialize = function() {
        Window_Base.prototype.initialize.call(this, 0, 0, 700, 120);
        
        this.visible = false;
        this.deactivate();
    };

    Window_Tooltip.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if(this.visible) {
            // check if we're hovering if not then hide
            if(!this._target._hovered) {
                this.hide();
            }
        }
    };

    Window_Tooltip.prototype.show = function(text, target) {
        this.visible = true;
        this.active = true;
        // get the target position and move this sprite to it
        this.x = TouchInput.x;
        if(this.x + this.width > Graphics.boxWidth) this.x = Graphics.boxWidth - this.width;
        this.y = TouchInput.y;
        if(this.x + this.width > Graphics.boxHeight) this.y = Graphics.boxHeight - this.height;
    
        if(this._target != target) {
            this.contents.clear();
            this.drawTextEx(text, 5, 5);
            this._target = target;
        }
    };

    Window_Tooltip.prototype.hide = function() {
        this.visible = false;
        this.active = false;
        // if you're not on the window hide this
    };

})(GH_Tooltips);