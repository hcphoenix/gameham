/*
 * ==============================================================================
 * ** Bitmap Smooth Fix
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2016.01.05 > First release.
 * ==============================================================================
 */
 
var Imported = Imported || {};
Imported['VE - Bitmap Smooth Fix'] = '1.00';

var VictorEngine = VictorEngine || {};
VictorEngine.BitmapSmoothFix = VictorEngine.BitmapSmoothFix || {};

/*:
*------------------------------------------------------------------------------ 
 * @plugindesc v1.00 - Bug fix for unwanted bitmap smoothing
 * @author Victor Sant
 *
 * ------------------------------------------------------------------------------
 * @help 
 * ------------------------------------------------------------------------------ 
 *  When the maker tries to draw a bitmap using float values for bitmap 
 *  coordinates the bitmap suffer an unwanted anti-alias.
 *  This can be a hinder for those wanting to create a pixelated visual.
 *  This plugin fix this issue, by ensuring that no float value will be
 *  used for the bitmaps.
 * 
 * ------------------------------------------------------------------------------
 */

(function() {

	//=============================================================================
	// Bitmap
	//=============================================================================
	
	VictorEngine.BitmapSmoothFix.blt = Bitmap.prototype.blt;
	Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
		dx = Math.floor(dx);
		dy = Math.floor(dy);
		VictorEngine.BitmapSmoothFix.blt.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
	};
	
	VictorEngine.BitmapSmoothFix.fillRect = Bitmap.prototype.fillRect;
	Bitmap.prototype.fillRect = function(x, y, width, height, color) {
		x = Math.floor(x);
		y = Math.floor(y);
		VictorEngine.BitmapSmoothFix.fillRect.call(this, x, y, width, height, color);
	};
	
	VictorEngine.BitmapSmoothFix.gradientFillRect = Bitmap.prototype.gradientFillRect;
	Bitmap.prototype.gradientFillRect = function(x, y, width, height, color1, color2, vertical) {
		x = Math.floor(x);
		y = Math.floor(y);
		VictorEngine.BitmapSmoothFix.gradientFillRect.call(this, x, y, width, height, color1, color2, vertical);
	};
	
	VictorEngine.BitmapSmoothFix.drawCircle = Bitmap.prototype.drawCircle;
	Bitmap.prototype.drawCircle = function(x, y, radius, color) {
		x = Math.floor(x);
		y = Math.floor(y);
		VictorEngine.BitmapSmoothFix.drawCircle.call(this, x, y, radius, color);
	};

	VictorEngine.BitmapSmoothFix.drawText = Bitmap.prototype.drawText;
	Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
		x = Math.floor(x);
		y = Math.floor(y);
		VictorEngine.BitmapSmoothFix.drawText.call(this, text, x, y, maxWidth, lineHeight, align);
	};
	
})(); 