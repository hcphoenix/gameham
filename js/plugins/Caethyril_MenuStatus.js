

/*:
 * @plugindesc Rearrange the pause menu status window.
 * @help Terms of use: free to use and/or modify for any project.
 */

Window_MenuStatus.prototype.windowHeight = function() {
    return this.fittingHeight(4);   // height that fits 4 lines of text
};

Window_MenuStatus.prototype.maxCols = function() {
    return 4;
};

Window_MenuStatus.prototype.numVisibleRows = function() {
    return 1;
};

//Window_MenuStatus.prototype.drawItemImage = function(index) {
    // nothing here => don't draw faces
//};

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var x = rect.x;   // rect.x + 162;
    var y = rect.y;   // rect.height / 2 - this.lineHeight() * 1.5;
    var width = rect.width;
    var L = this.lineHeight();
    // // draw name
    // this.drawActorName(actor, x, y);
    // // draw HP (no gauge)
    // this.changeTextColor(this.systemColor());
    // this.drawText(TextManager.hpA, x, y + L, 44);
    // this.drawCurrentAndMax(actor.hp, actor.mhp, x, y + L, width,
    //                        this.hpColor(actor), this.normalColor());
    // // draw MP (no gauge)
    // this.changeTextColor(this.systemColor());
    // this.drawText(TextManager.mpA, x, y + L * 2, 44);
    // this.drawCurrentAndMax(actor.mp, actor.mmp, x, y + L * 2, width,
    //                        this.mpColor(actor), this.normalColor());
};

