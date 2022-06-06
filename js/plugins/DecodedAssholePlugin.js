var Imported = Imported || {};
Imported['Olivia_StateOlivia_StateTooltipDisplay'] = !![];
var Olivia = Olivia || {};
Olivia['StateTooltipDisplay'] = Olivia['StateTooltipDisplay'] || {};
var parameters = $plugins['filter'](function (_0xcc7885) {
    return _0xcc7885['description']['contains']('<Olivia_StateTooltipDisplay>');
})[0x0]['parameters'];
Olivia['StateTooltipDisplay']['Window'] = {
    'scaleRate': Number(parameters['WindowScale']),
    'textFmt': JSON['parse'](parameters['TextFormat']),
    'buffFmt': JSON['parse'](parameters['BuffFormat']),
    'debuffFmt': JSON['parse'](parameters['DebuffFormat']),
    'durationFmt': JSON['parse'](parameters['DurationFormat']),
    'windowSkin': String(parameters['WindowSkin']),
    'windowSkinOpacity': Number(parameters['SkinOpacity'])
};
Olivia['StateTooltipDisplay']['Enabled'] = {
    'windowHelp': eval(String(parameters['Window_Help'])),
    'windowSkillStatus': eval(String(parameters['Window_SkillStatus'])),
    'windowBattleSideStates': eval(String(parameters['Window_BattleSideStates'])),
    'windowBattleStatus': eval(String(parameters['Window_BattleStatus']))
};
Olivia['SetupStateIconTooltipDescription'] = function (_0x3a7c76) {
    if (!_0x3a7c76['description']) {
        _0x3a7c76['description'] = '';
        var _0x27bab2 = _0x3a7c76['note']['split'](/[\r\n]+/);
        var _0xc6443b = 'none';
        for (var _0x33375e = 0x0; _0x33375e < _0x27bab2['length']; _0x33375e++) {
            var _0x1d7806 = _0x27bab2[_0x33375e];
            var _0x33a5a0 = 0x0;
            if (_0x1d7806['match'](/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i)) {
                _0xc6443b = 'help description';
            } else if (_0x1d7806['match'](/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i)) {
                _0xc6443b = 'none';
            } else if (_0xc6443b === 'help description') {
                if (_0x3a7c76['description']['length'] > 0x0) _0x3a7c76['description'] +='\x0a';
                _0x3a7c76['description'] += _0x1d7806;
            }
        }
    }
};
if (Imported['YEP_X_InBattleStatus']) {
    Yanfly['Param']['IBSStateHelp1'] = '';
    Yanfly['Param']['IBSStateHelp2'] = '';
}
Olivia['StateTooltipDisplay']['___TouchInput_onMouseMove___'] = TouchInput['_onMouseMove'];
TouchInput['_onMouseMove'] = function (_0x3f42c2) {
    Olivia['StateTooltipDisplay']['___TouchInput_onMouseMove___']['call'](this, _0x3f42c2);
    this['_mouseOverX'] = Graphics['pageToCanvasX'](_0x3f42c2['pageX']);
    this['_mouseOverY'] = Graphics['pageToCanvasY'](_0x3f42c2['pageY']);
};
Olivia['StateTooltipDisplay']['Game_BattlerBase_refresh'] = Game_BattlerBase['prototype']['refresh'];
Game_BattlerBase['prototype']['refresh'] = function () {
    Olivia['StateTooltipDisplay']['Game_BattlerBase_refresh']['call'](this);
    if ($gameParty['inBattle']() && !!SceneManager['_scene']['_stateIconTooltipWindow']) {
        if (SceneManager['_scene']['_stateIconTooltipWindow']['_battler'] === this) {
            SceneManager['_scene']['_stateIconTooltipWindow']['updateNewData']();
        }
    }
};
Olivia['StateTooltipDisplay']['Game_Troop_increaseTurn'] = Game_Troop['prototype']['increaseTurn'];
Game_Troop['prototype']['increaseTurn'] = function () {
    Olivia['StateTooltipDisplay']['Game_Troop_increaseTurn']['call'](this);
    if ($gameParty['inBattle']() && !!SceneManager['_scene']['_stateIconTooltipWindow']) {
        SceneManager['_scene']['_stateIconTooltipWindow']['updateNewData']();
    }
};
Olivia['StateTooltipDisplay']['___Scene_Base_createWindowLayer___'] = Scene_Base['prototype']['createWindowLayer'];
Scene_Base['prototype']['createWindowLayer'] = function () {
    Olivia['StateTooltipDisplay']['___Scene_Base_createWindowLayer___']['call'](this);
    this['createStateIconTooltipWindow']();
};
Scene_Base['prototype']['createStateIconTooltipWindow'] = function () {
    this['_stateIconTooltipWindow'] = new Window_StateIconTooltip();
    this['addChild'](this['_stateIconTooltipWindow']);
};
Olivia['StateTooltipDisplay']['___Sprite_StateIcon_update___'] = Sprite_StateIcon['prototype']['update'];
Sprite_StateIcon['prototype']['update'] = function () {
    Olivia['StateTooltipDisplay']['___Sprite_StateIcon_update___']['call'](this);
    if (!!this['tooltipWindow']() && this['isMouseOverStates']()) {
        this['updateStateIconTooltipWindow']();
    }
};
Sprite_StateIcon['prototype']['updateStateIconTooltipWindow'] = function () {
    this['tooltipWindow']()['setTargetHost'](this);
};
Sprite_StateIcon['prototype']['tooltipWindow'] = function () {
    return SceneManager['_scene']['_stateIconTooltipWindow'];
};
Sprite_StateIcon['prototype']['isMouseOverStates'] = function () {
    var _0x592fcc = this['canvasToLocalX'](TouchInput['_mouseOverX']);
    var _0x36b500 = this['canvasToLocalY'](TouchInput['_mouseOverY']);
    _0x592fcc += this['anchor']['x'] * this['width'];
    _0x36b500 += this['anchor']['y'] * this['height'];
    return this['isFullyVisible']() && _0x592fcc >= 0x0 && _0x36b500 >= 0x0 && _0x592fcc < this['width'] && _0x36b500 < this['height'];
};
Sprite_StateIcon['prototype']['canvasToLocalX'] = function (_0xc094ef) {
    var _0x15fd1d = this;
    while (_0x15fd1d) {
        _0xc094ef -= _0x15fd1d['x'];
        _0x15fd1d = _0x15fd1d['parent'];
    }
    return _0xc094ef;
};
Sprite_StateIcon['prototype']['canvasToLocalY'] = function (_0x29ac69) {
    var _0x5d3e53 = this;
    while (_0x5d3e53) {
        _0x29ac69 -= _0x5d3e53['y'];
        _0x5d3e53 = _0x5d3e53['parent'];
    }
    return _0x29ac69;
};
Sprite_StateIcon['prototype']['isFullyVisible'] = function () {
    var _0x8f94bd = this;
    while (_0x8f94bd) {
        if (!this['visible']) {
            return ![];
        } else if (this['opacity'] <= 0x0) {
            return ![];
        } else {
            _0x8f94bd = _0x8f94bd['parent'];
        }
    }
    return !![];
};
Olivia['StateTooltipDisplay']['___Sprite_StateOverlay_update___'] = Sprite_StateOverlay['prototype']['update'];
Sprite_StateOverlay['prototype']['update'] = function () {
    Olivia['StateTooltipDisplay']['___Sprite_StateOverlay_update___']['call'](this);
    if (!!this['tooltipWindow']() && this['isMouseOverStates']()) {
        this['updateStateIconTooltipWindow']();
    }
};
Sprite_StateOverlay['prototype']['updateStateIconTooltipWindow'] = function () {
    this['tooltipWindow']()['setTargetHost'](this);
};
Sprite_StateOverlay['prototype']['tooltipWindow'] = function () {
    return SceneManager['_scene']['_stateIconTooltipWindow'];
};
Sprite_StateOverlay['prototype']['isMouseOverStates'] = function () {
    var _0x2b1ea8 = this['canvasToLocalX'](TouchInput['_mouseOverX']);
    var _0x5e23f1 = this['canvasToLocalY'](TouchInput['_mouseOverY']);
    _0x2b1ea8 += this['anchor']['x'] * this['width'];
    _0x5e23f1 += this['anchor']['y'] * this['height'];
    return this['isFullyVisible']() && _0x2b1ea8 >= 0x0 && _0x5e23f1 >= 0x0 && _0x2b1ea8 < this['width'] && _0x5e23f1 < this['height'];
};
Sprite_StateOverlay['prototype']['canvasToLocalX'] = function (loc) {
    var cur = this;
    while (cur) {
        loc -= cur.x;
        cur = cur.parent;
    }
    return loc;
};
Sprite_StateOverlay['prototype']['canvasToLocalY'] = function (_0x129528) {
    var _0x1a00cd = this;
    while (_0x1a00cd) {
        _0x129528 -= _0x1a00cd['y'];
        _0x1a00cd = _0x1a00cd['parent'];
    }
    return _0x129528;
};
Sprite_StateOverlay['prototype']['isFullyVisible'] = function () {
    var _0x295820 = this;
    while (_0x295820) {
        if (!this['visible']) {
            return ![];
        } else if (this['opacity'] <= 0x0) {
            return ![];
        } else {
            _0x295820 = _0x295820['parent'];
        }
    }
    return !![];
};
function Window_StateIconTooltip() {
    this['initialize']['apply'](this, arguments);
}
Window_StateIconTooltip['prototype'] = Object['create'](Window_Base['prototype']);
Window_StateIconTooltip['prototype']['constructor'] = Window_StateIconTooltip;
Window_StateIconTooltip['prototype']['initialize'] = function () {
    this['_text'] = '';
    this['_targetHost'] = undefined;
    this['_battler'] = undefined;
    this['_visibilityTimer'] = 0x0;
    Window_Base['prototype']['initialize']['call'](this, 0x0, 0x0, Graphics['boxWidth'], Graphics['boxHeight']);
};
Window_StateIconTooltip['prototype']['loadWindowskin'] = function () {
    this['windowskin'] = ImageManager['loadSystem'](Olivia['StateTooltipDisplay']['Window']['windowSkin']);
};
Window_StateIconTooltip['prototype']['updateTone'] = function () {};
Window_StateIconTooltip['prototype']['scaleRate'] = function () {
    return Olivia['StateTooltipDisplay']['Window']['scaleRate'];
};
Window_StateIconTooltip['prototype']['lineHeight'] = function () {
    return Math['round'](Window_Base['prototype']['lineHeight']['call'](this) * this['scaleRate']());
};
Window_StateIconTooltip['prototype']['standardFontSize'] = function () {
    return Math['round'](Window_Base['prototype']['standardFontSize']['call'](this) * this['scaleRate']());
};
Window_StateIconTooltip['prototype']['standardPadding'] = function () {
    return Math['round'](Window_Base['prototype']['standardPadding']['call'](this) * this['scaleRate']());
};
Window_StateIconTooltip['prototype']['textPadding'] = function () {
    return Math['round'](Window_Base['prototype']['textPadding']['call'](this) * this['scaleRate']());
};
Window_StateIconTooltip['prototype']['standardBackOpacity'] = function () {
    return Olivia['StateTooltipDisplay']['Window']['windowSkinOpacity'];
};
Window_StateIconTooltip['prototype']['standardBackOpacity'] = function () {
    return Olivia['StateTooltipDisplay']['Window']['windowSkinOpacity'];
};
Window_StateIconTooltip['prototype']['processDrawIcon'] = function (_0x5200b2, _0x6bf23d) {
    this['drawIcon'](_0x5200b2, _0x6bf23d['x'] + 0x2, _0x6bf23d['y'] + 0x2);
    _0x6bf23d['x'] += Math['round'](Window_Base['_iconWidth'] * this['scaleRate']()) + 0x4;
};
Window_StateIconTooltip['prototype']['makeFontBigger'] = function () {
    this['contents']['fontSize'] += Math['ceil'](0xc * this['scaleRate']());
};
Window_StateIconTooltip['prototype']['makeFontSmaller'] = function () {
    this['contents']['fontSize'] -= Math['ceil'](0xc * this['scaleRate']());
};
Window_StateIconTooltip['prototype']['drawIcon'] = function (_0x1de4ee, _0x3e5314, _0x3925a0) {
    var _0x12cc61 = ImageManager['loadSystem']('IconSet');
    var _0x56fc30 = Window_Base['_iconWidth'];
    var _0x246525 = Window_Base['_iconHeight'];
    var _0xc0ba5b = _0x1de4ee % 0x10 * _0x56fc30;
    var _0x1e0c18 = Math['floor'](_0x1de4ee / 0x10) * _0x246525;
    var _0x174b87 = this['scaleRate']();
    this['contents']['blt'](_0x12cc61, _0xc0ba5b, _0x1e0c18, _0x56fc30, _0x246525, _0x3e5314, _0x3925a0, Math['round'](_0x56fc30 * _0x174b87), Math['round'](_0x246525 * _0x174b87));
};
Window_StateIconTooltip['prototype']['update'] = function () {
    Window_Base['prototype']['update']['call'](this);
    this['updateVisibility']();
    this['updateCoordinates']();
};
Window_StateIconTooltip['prototype']['updateVisibility'] = function () {
    visible = !!this['visible'];
    this['visible'] = this['_visibilityTimer'] > 0x0;
    this['_visibilityTimer']--;
    if (visible !== this['visible'] && !!this['visible']) {
        this['updateNewData']();
    }
};
Window_StateIconTooltip['prototype']['updateCoordinates'] = function () {
    if (this['visible'] && !!this['_targetHost']) {
        this['x'] = TouchInput['_mouseOverX'];
        if (this['x'] + this['width'] >= Graphics['boxWidth']) {
            this['x'] = Graphics['boxWidth'] - this['width'];
        }
        this['y'] = TouchInput['_mouseOverY'];
        if (this['y'] + this['height'] >= Graphics['boxHeight']) {
            this['y'] = Graphics['boxHeight'] - this['height'];
        }
    }
};
Window_StateIconTooltip['prototype']['setTargetHost'] = function (_0x222b2f) {
    if (this['_targetHost'] !== _0x222b2f && this['_visibilityTimer'] !== 0x0) {
        this['_targetHost'] = _0x222b2f;
        this['updateNewData']();
    }
    this['_visibilityTimer'] = 0x1;
};
Window_StateIconTooltip['prototype']['updateNewData'] = function () {
    this['setupWindow']();
    this['setupDimensions']();
    this['setupChildPosition']();
    this['refresh']();
};
Window_StateIconTooltip['prototype']['setupWindow'] = function () {
    this['setupText']();
};
Window_StateIconTooltip['prototype']['setupText'] = function () {
    this['_text'] = '';
    if (!!this['_targetHost']) {
        if (!!this['_targetHost']['_battler']) {
            this['_battler'] = this['_targetHost']['_battler'];
        }
        if (!!this['_battler']) {
            this['setupStateText']();
            this['setupBuffText']();
        }
    }
};
Window_StateIconTooltip['prototype']['setupBuffText'] = function () {
    if (!this['_battler']) return this['_text'] = '';
    var _0x391df2 = Olivia['StateTooltipDisplay']['Window']['buffFmt'];
    var _0x1e4ad2 = Olivia['StateTooltipDisplay']['Window']['debuffFmt'];
    var _0x1ec297 = Olivia['StateTooltipDisplay']['Window']['durationFmt'];
    for (var _0x2cca18 = 0x0; _0x2cca18 < 0x8; _0x2cca18++) {
        if (this['_battler']['isBuffAffected'](_0x2cca18)) {
            var _0x2ab53b = _0x391df2;
        } else if (this['_battler']['isDebuffAffected'](_0x2cca18)) {
            var _0x2ab53b = _0x1e4ad2;
        } else {
            continue;
        }
        var _0x423790 = this['_battler']['buffIconIndex'](this['_battler']['_buffs'][_0x2cca18], _0x2cca18);
        var _0x9ac930 = '\i[' + _0x423790 + ']';
        var _0x211ccf = TextManager['param'](_0x2cca18);
        var _0x1f518d = Math['floor'](this['_battler']['paramBuffRate'](_0x2cca18) * 0x64);
        var _0x269e29 = this['_battler']['_buffTurns'][_0x2cca18] || 0x0;
        var _0x4e1cf6 = _0x1ec297['format'](_0x269e29);
        if (_0x269e29 <= 0x0) _0x4e1cf6 = '';
        var _0xa9860e = _0x2ab53b['format'](_0x9ac930, _0x211ccf, _0x1f518d, _0x4e1cf6);
        this['_text'] += _0xa9860e + '\x0a';
    }
};
Window_StateIconTooltip['prototype']['setupStateText'] = function () {
    if (!this['_battler']) return this['_text'] = '';
    var _0x5d6e44 = this['_battler']['states']();
    var _0x3249dc = Olivia['StateTooltipDisplay']['Window']['textFmt'];
    var _0x4833ac = Olivia['StateTooltipDisplay']['Window']['durationFmt'];
    this['_text'] = '';
    for (var _0x57dfb6 = 0x0; _0x57dfb6 < _0x5d6e44['length']; _0x57dfb6++) {
        var _0x5db59a = _0x5d6e44[_0x57dfb6];
        Olivia['SetupStateIconTooltipDescription'](_0x5db59a);
        if (this['meetStateTooltipRequirements'](_0x5db59a)) {
            var _0x395718 = '\i[' + _0x5db59a['iconIndex'] + ']';
            var _0x5a3fea = _0x5db59a['name'];
            var _0x401417 = _0x5db59a['description'];
            var _0x4f7820 = this['_battler']['_stateTurns'][_0x5db59a['id']] || 0x0;
            var _0xb5a90a = _0x4833ac['format'](_0x4f7820);
            if (_0x4f7820 <= 0x0) _0xb5a90a = '';
            if (_0x5db59a['autoRemovalTiming'] <= 0x0) _0xb5a90a = '';
            var _0x3383da = _0x3249dc['format'](_0x395718, _0x5a3fea, _0x401417, _0xb5a90a);
            this['_text'] += _0x3383da + '\x0a';
        }
    }
};
Window_StateIconTooltip['prototype']['setupDimensions'] = function () {
    if (this['_text'] === '') {
        this['width'] = 0x0;
        this['height'] = 0x0;
    } else {
        var _0x4ad2f6 = this['_text']['split'](/[]+/);
        if (_0x4ad2f6['length'] > 0x0) {
            var _0x466321 = 0x0;
            for (var _0xbaef01 = 0x0; _0xbaef01 < _0x4ad2f6['length']; _0xbaef01++) {
                var _0x2d366d = _0x4ad2f6[_0xbaef01];
                var _0x1acdb9 = Window_ChoiceList['prototype']['textWidthEx']['call'](this, _0x2d366d);
                _0x466321 = Math['max'](_0x1acdb9, _0x466321);
            }
            this['width'] = this['standardPadding']() * 0x2 + this['textPadding']() * 0x2 + _0x466321;
            this['height'] = this['standardPadding']() * 0x2 + (_0x4ad2f6['length'] - 0x1) * this['lineHeight']();
        } else {
            this['width'] = 0x0;
            this['height'] = 0x0;
        }
    }
};
Window_StateIconTooltip['prototype']['setupChildPosition'] = function () {
    if (this['parent']) {
        var _0x89190a = this['parent']['children'];
        _0x89190a['push'](_0x89190a['splice'](_0x89190a['indexOf'](this), 0x1)[0x0]);
    }
};
Window_StateIconTooltip['prototype']['meetStateTooltipRequirements'] = function (_0x4935f5) {
    if (!_0x4935f5) {
        return ![];
    } else if (_0x4935f5['description'] === '') {
        return ![];
    } else {
        return !![];
    }
};
Window_StateIconTooltip['prototype']['refresh'] = function () {
    this['createContents']();
    this['contents']['clear']();
    if (this['_text'] !== '') {
        var _0x315035 = this['_text']['split'](/[]+/);
        var _0x3b4bb6 = this['textPadding']();
        var _0x3ad3b8 = 0x0;
        for (var _0x9bb50e = 0x0; _0x9bb50e < _0x315035['length']; _0x9bb50e++) {
            var _0x561bda = _0x315035[_0x9bb50e];
            this['drawTextEx'](_0x561bda, _0x3b4bb6, _0x3ad3b8);
            _0x3ad3b8 += this['lineHeight']();
        }
    }
};
Window_Base['prototype']['tooltipWindow'] = function () {
    return SceneManager['_scene']['_stateIconTooltipWindow'];
};
Window_Base['prototype']['updateStateIconTooltipWindow'] = function () {
    this['tooltipWindow']()['setTargetHost'](this);
    if (this['_battler'] !== this['tooltipWindow']()['_battler']) {
        this['tooltipWindow']()['updateNewData']();
    }
};
Window_Base['prototype']['isMouseOverStates'] = function () {
    var _0x30e0ea = this['canvasToLocalX'](TouchInput['_mouseOverX']);
    var _0x530683 = this['canvasToLocalY'](TouchInput['_mouseOverY']);
    return this['isFullyVisible']() && _0x30e0ea >= 0x0 && _0x530683 >= 0x0 && _0x30e0ea < this['width'] && _0x530683 < this['height'];
};
Window_Base['prototype']['canvasToLocalX'] = function (_0x1b39c4) {
    var _0x16866a = this;
    while (_0x16866a) {
        _0x1b39c4 -= _0x16866a['x'];
        _0x16866a = _0x16866a['parent'];
    }
    return _0x1b39c4;
};
Window_Base['prototype']['canvasToLocalY'] = function (_0x51a047) {
    var _0x4dcae1 = this;
    while (_0x4dcae1) {
        _0x51a047 -= _0x4dcae1['y'];
        _0x4dcae1 = _0x4dcae1['parent'];
    }
    return _0x51a047;
};
Window_Base['prototype']['isFullyVisible'] = function () {
    var _0x306945 = this;
    while (_0x306945) {
        if (!this['visible']) {
            return ![];
        } else if (this['contentsOpacity'] <= 0x0) {
            return ![];
        } else if (this['isClosed']()) {
            return ![];
        } else {
            _0x306945 = _0x306945['parent'];
        }
    }
    return !![];
};
Window_Base['prototype']['determineStateTooltipBattler'] = function () {
    this['_battler'] = undefined;
};
if (Imported['YEP_BattleEngineCore'] && Imported['YEP_BuffsStatesCore'] && Olivia['StateTooltipDisplay']['Enabled']['windowHelp']) {
    Olivia['StateTooltipDisplay']['___Window_Help_clear___'] = Window_Help['prototype']['clear'];
    Window_Help['prototype']['clear'] = function () {
        Olivia['StateTooltipDisplay']['___Window_Help_clear___']['call'](this);
        this['_battler'] = undefined;
    };
    Olivia['StateTooltipDisplay']['___Window_Help_setBattler___'] = Window_Help['prototype']['setBattler'];
    Window_Help['prototype']['setBattler'] = function (_0x380b27) {
        Olivia['StateTooltipDisplay']['___Window_Help_setBattler___']['call'](this, _0x380b27);
        this['_battler'] = _0x380b27;
    };
    Window_Help['prototype']['update'] = function () {
        Window_Base['prototype']['update']['call'](this);
        if (!!this['_battler'] && !!this['tooltipWindow']() && this['isMouseOverStates']()) {
            this['updateStateIconTooltipWindow']();
        }
    };
}
if (Olivia['StateTooltipDisplay']['Enabled']['windowSkillStatus']) {
    Olivia['StateTooltipDisplay']['___Window_SkillStatus_setActor___'] = Window_SkillStatus['prototype']['setActor'];
    Window_SkillStatus['prototype']['setActor'] = function (_0x4f65a2) {
        Olivia['StateTooltipDisplay']['___Window_SkillStatus_setActor___']['call'](this, _0x4f65a2);
        this['_battler'] = this['_actor'];
    };
    Olivia['StateTooltipDisplay']['___Window_SkillStatus_update___'] = Window_SkillStatus['prototype']['update'];
    Window_SkillStatus['prototype']['update'] = function () {
        Olivia['StateTooltipDisplay']['___Window_SkillStatus_update___']['call'](this);
        if (!!this['_battler'] && !!this['tooltipWindow']() && this['isMouseOverStates']()) {
            this['updateStateIconTooltipWindow']();
        }
    };
}
if (Olivia['OctoBattle'] && Olivia['OctoBattle']['SideBattleUI'] && Olivia['OctoBattle']['SideBattleUI']['Enabled'] && Olivia['StateTooltipDisplay']['Enabled']['windowBattleSideStates']) {
    Olivia['StateTooltipDisplay']['___Window_BattleSideBase_setNewActor___'] = Window_BattleSideBase['prototype']['refresh'];
    Window_BattleSideBase['prototype']['setNewActor'] = function () {
        Olivia['StateTooltipDisplay']['___Window_BattleSideBase_setNewActor___']['call'](this);
        this['_battler'] = this['_actor'];
    };
    Olivia['StateTooltipDisplay']['___Window_BattleSideBase_refresh___'] = Window_BattleSideBase['prototype']['refresh'];
    Window_BattleSideBase['prototype']['refresh'] = function () {
        Olivia['StateTooltipDisplay']['___Window_BattleSideBase_refresh___']['call'](this);
        this['_battler'] = this['_actor'];
    };
    Olivia['StateTooltipDisplay']['___Window_BattleSideStates_update___'] = Window_BattleSideStates['prototype']['update'];
    Window_BattleSideStates['prototype']['update'] = function () {
        Olivia['StateTooltipDisplay']['___Window_BattleSideStates_update___']['call'](this);
        if (!!this['_battler'] && !!this['tooltipWindow']() && this['isMouseOverStates']()) {
            this['updateStateIconTooltipWindow']();
        }
    };
}
if (Olivia['StateTooltipDisplay']['Enabled']) {
    Olivia['StateTooltipDisplay']['___Window_BattleStatus_update___'] = Window_BattleStatus['prototype']['update'];
    Window_BattleStatus['prototype']['update'] = function () {
        Olivia['StateTooltipDisplay']['___Window_BattleStatus_update___']['call'](this);
        if (!!this['tooltipWindow']() && this['isMouseOverStates']()) {
            this['determineStateTooltipBattler']();
            if (!!this['_battler']) {
                this['updateStateIconTooltipWindow']();
            }
        }
    };
    Window_BattleStatus['prototype']['determineStateTooltipBattler'] = function () {
        var _0x1b87e0 = this['canvasToLocalX'](TouchInput['_mouseOverX']);
        var _0x20e268 = this['canvasToLocalY'](TouchInput['_mouseOverY']);
        if (_0x1b87e0 <= this['standardPadding']() || _0x1b87e0 >= this['width'] - this['standardPadding']()) {
            this['_battler'] = undefined;
        } else if (_0x20e268 <= this['standardPadding']() || _0x20e268 >= this['height'] - this['standardPadding']()) {
            this['_battler'] = undefined;
        } else if (Imported['YEP_BattleStatusWindow']) {
            var _0x419f69 = this['contentsWidth']() / this['maxCols']();
            var _0x24f8ae = Math['floor']((_0x1b87e0 - this['standardPadding']()) / _0x419f69);
            this['_battler'] = $gameParty['members']()[_0x24f8ae];
        } else {
            var _0x3f285d = this['basicAreaRect'](_0x24f8ae)['height'];
            var _0x24f8ae = this['topIndex']() + Math['floor']((_0x20e268 - this['standardPadding']()) / _0x3f285d);
            this['_battler'] = $gameParty['members']()[_0x24f8ae];
        }
    };
}