/*:
* @plugindesc Adds a Critical Popup.
* @author Jory4001
*
* @help
*
*
* Must be placed below YEP_BattleEngineCore
*
*
*/

// This function taken from Yanfly's YEP_BattleEngineCore.js for compatibility
Sprite_Damage.prototype.setup = function(target) {
    var result = target.shiftDamagePopup();
    if (result.missed || result.evaded) {
        this.createMiss();
    } else if (result.hpAffected) {
        this.createDigits(0, result.hpDamage);
    } else if (target.isAlive() && result.mpDamage !== 0) {
        this.createDigits(2, result.mpDamage);
    }
    if (result.critical) {
        this.createCrit(); // My Added line to Yanfly's Function
        Sprite_Damage.playSting();
        this.setupCriticalEffect();
        $gameScreen.startFlash([255,255,255,128],10);
    }
};
    
//draws the Critical graphic
Sprite_Damage.prototype.createCrit = function() {
    var w = this.digitWidth();
    var h = this.digitHeight();
    var sprite = this.createChildSprite();
    sprite.setFrame(4 * w, 4 * h, 5 * w, h);
    sprite.anchor.y = 2;
    sprite.dy = 0;
}; 

Sprite_Damage.playSting = function() {
    let sting = ['cool1','cool2','cool3'].pick();
    AudioManager.playSe({name: sting, pan: 0, pitch: 100, volume: 100});
}