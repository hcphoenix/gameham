//============================================================================
// Eli_HelpWindows.js
//============================================================================

/*:

@plugindesc ♦5.1.0♦ Add a Help Window for each default scene/window.
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Plugin Requirements
============================================================================

Order Before Choice Manager

============================================================================
Features
============================================================================

Adds and makes it possible to edit help window content in the following 
scenes/menus:
• Main menu.
• Item Category
• Skills.
• Equipment.
• Options.
• Save / Load.
• End Game.
• Title Screen.
• Name window.
• Shop.
• Battle.
• Choices.
• Select item.
• Input number.

In addition to the texts, you can also decide for bottom or top position 
and number of lines.

If you want to add a help window in other place, just talk to me.

============================================================================
How to use
============================================================================

♦ Plugin Parameters ♦

The plugin parameters were structured mostly as follows:
• Enable - True to use this help window in-game, false to not use.
• Position - Top or bottom.
• Lines - Choose a number of lines.
• Contents - Here you can create as many help texts as you want.
But you need to know and specify, the symbol of each command.

There are some exceptions:
Select Item which will take the help text from the items.
Choice Window, Number Input Window, and Name Input scene, you will need to 
write the texts for each of them with plugin commands.

Also, there are some commands, like the skill type, that are not handled 
by symbols, but for extensions.
So, extension 1 means the first Skill type set on the database.
Extension 2 means the second Skill type set on the database.
Etc...

NOTE¹: The position parameter doens't work on battle. 
The help windows are always on top.

♦ Plugin Commands ♦

You can change the Choice, Number Input, and Name Input help texts using 
plugin commands together with comments.
So, you call a plugin command, and right after it, you use a comment 
command to write your text.

• HelpChoice Index - Replace Index with the choice number you want to 
apply the help text. Starts at 0.

Example:

◆Plugin Command：HelpChoice 0
◆Comment：Craft an item
◆Plugin Command：HelpChoice 1
◆Comment：Recycle an item

• HelpNumberInput
• HelpNameInput

============================================================================
Special thanks and considerations
============================================================================

Thanks to Silva for clarifying to me how help windows works.
Thanks to Caethril that help me understand a lot of things in the year 
of 2019 when I started to make this plugin.
Thanks to LTN games that help me with the plugin parameters.

============================================================================
Update Log
============================================================================

https://tinyurl.com/helpWindowsLog

============================================================================

@param title
@text Title Help Window
@type struct<helpWinSt>
@desc Help Window for the title scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[\"{\\\"symbol\\\":\\\"newGame\\\",\\\"text\\\":\\\"\\\\\\\"This is the new game command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"continue\\\",\\\"text\\\":\\\"\\\\\\\"This is the continue command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"options\\\",\\\"text\\\":\\\"\\\\\\\"This is the options command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"soundTest\\\",\\\"text\\\":\\\"\\\\\\\"This is the sound test command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"mapSelect\\\",\\\"text\\\":\\\"\\\\\\\"This is the map select command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\"]"}

@param menu
@text Menu Help Window
@type struct<helpWinSt>
@desc Help Window for the menu scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[\"{\\\"symbol\\\":\\\"item\\\",\\\"text\\\":\\\"\\\\\\\"This is the item command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"skill\\\",\\\"text\\\":\\\"\\\\\\\"This is the skill command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"equip\\\",\\\"text\\\":\\\"\\\\\\\"This is the equip command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"status\\\",\\\"text\\\":\\\"\\\\\\\"This is the status command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"formation\\\",\\\"text\\\":\\\"\\\\\\\"This is the formation command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"options\\\",\\\"text\\\":\\\"\\\\\\\"This is the options command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"save\\\",\\\"text\\\":\\\"\\\\\\\"This is the save command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"gameEnd\\\",\\\"text\\\":\\\"\\\\\\\"This is the game end command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"infoMenu\\\",\\\"text\\\":\\\"\\\\\\\"This is the information command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"soundTest\\\",\\\"text\\\":\\\"\\\\\\\"This is the sound test command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\"]"}

@param menuStatusRows
@text Status Rows
@type number
@desc The number of visible rows in the status menu.
@default 3
@parent menu

@param itemCategory
@text Item Help Window
@type struct<helpWinSt>
@desc Help Window for the item scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[\"{\\\"symbol\\\":\\\"item\\\",\\\"text\\\":\\\"\\\\\\\"This is the item command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"weapon\\\",\\\"text\\\":\\\"\\\\\\\"This is the weapon command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"armor\\\",\\\"text\\\":\\\"\\\\\\\"This is the armor command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"shield\\\",\\\"text\\\":\\\"\\\\\\\"This is the shield command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"keyItem\\\",\\\"text\\\":\\\"\\\\\\\"This is the keyItem command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\"]"}

@param skill
@text Skill Help Window
@type struct<helpWinSt>
@desc Help Window for the skill scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[\"{\\\"symbol\\\":\\\"1\\\",\\\"text\\\":\\\"\\\\\\\"This is the first skill type on the database.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"2\\\",\\\"text\\\":\\\"\\\\\\\"This is the second skill type on the database.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\"]"}

@param equip
@text Equip Help Window
@type struct<helpWinSt>
@desc Help Window for the equip scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[\"{\\\"symbol\\\":\\\"equip\\\",\\\"text\\\":\\\"\\\\\\\"This is the equip command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"optimize\\\",\\\"text\\\":\\\"\\\\\\\"This is the optimize command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"clear\\\",\\\"text\\\":\\\"\\\\\\\"This is the clear command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"cancel\\\",\\\"text\\\":\\\"\\\\\\\"This is the cancel command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"customize\\\",\\\"text\\\":\\\"\\\\\\\"This is the customize command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"0\\\",\\\"text\\\":\\\"\\\\\\\"This is the first slot of equipment.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"1\\\",\\\"text\\\":\\\"\\\\\\\"This is the second slot of equipment.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"2\\\",\\\"text\\\":\\\"\\\\\\\"This is the third slot of equipment.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"3\\\",\\\"text\\\":\\\"\\\\\\\"This is the fourth slot of equipment.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"4\\\",\\\"text\\\":\\\"\\\\\\\"This is the fifth slot of equipment.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\"]"}

@param save
@text Save Help Window
@type struct<helpWinSt>
@desc Help Window for the save scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[\"{\\\"symbol\\\":\\\"\\\\\\\"\\\\\\\"\\\",\\\"text\\\":\\\"\\\\\\\"This is the autosave help text\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"\\\\\\\"\\\"}\"]"}

@param load
@text Load Help Window
@type struct<helpWinSt>
@desc Help Window for the load scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[\"{\\\"symbol\\\":\\\"\\\\\\\"\\\\\\\"\\\",\\\"text\\\":\\\"\\\\\\\"This is the auto save slot.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"\\\\\\\"\\\"}\"]"}

@param options
@text Options Help Window
@type struct<helpWinSt>
@desc Help Window for the options scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[\"{\\\"symbol\\\":\\\"alwaysDash\\\",\\\"text\\\":\\\"\\\\\\\"This is the always dash option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"commandRemember\\\",\\\"text\\\":\\\"\\\\\\\"This is the command remember option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"touchUI\\\",\\\"text\\\":\\\"\\\\\\\"This is the Touch Ui option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"bgmVolume\\\",\\\"text\\\":\\\"\\\\\\\"This is the Bgm volume option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"bgsVolume\\\",\\\"text\\\":\\\"\\\\\\\"This is the Bgs volume option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"meVolume\\\",\\\"text\\\":\\\"\\\\\\\"This is the Me volume option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"seVolume\\\",\\\"text\\\":\\\"\\\\\\\"This is the Se volume option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"language\\\",\\\"text\\\":\\\"\\\\\\\"This is the language option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"Iavra Localization.js\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"animateTiles\\\",\\\"text\\\":\\\"\\\\\\\"This is the language option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"YEP_AnimateTilesOption\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"atbSpeed\\\",\\\"text\\\":\\\"\\\\\\\"This is the atbSpeed option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_X_BattleSysATB)\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"battleAniSpeed\\\",\\\"text\\\":\\\"\\\\\\\"This is the battleAniSpeed option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_BattleAniSpeedOpt)\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"battleCamera\\\",\\\"text\\\":\\\"\\\\\\\"This is the battleCamera option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_X_ActSeqPack3)\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"difficultySlider\\\",\\\"text\\\":\\\"\\\\\\\"This is the difficultySlider option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_X_DifficultySlider)\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"messageSpeed\\\",\\\"text\\\":\\\"\\\\\\\"This is the messageSpeed option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_X_MessageSpeedOpt)\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"mapQuestWindow\\\",\\\"text\\\":\\\"\\\\\\\"This is the mapQuestWindow option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_X_MapQuestWindow)\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"masterVolume\\\",\\\"text\\\":\\\"\\\\\\\"This is the masterVolume option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_OptionsCore(Master Volume))\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"windowToneRed\\\",\\\"text\\\":\\\"\\\\\\\"This is the windowToneRed option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_OptionsCore)\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"windowToneGreen\\\",\\\"text\\\":\\\"\\\\\\\"This is the windowToneGreen option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_OptionsCore)\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"windowToneBlue\\\",\\\"text\\\":\\\"\\\\\\\"This is the windowToneBlue option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_OptionsCore)\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"synchFps\\\",\\\"text\\\":\\\"\\\\\\\"This is the synchFps option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_SynchFpsOption)\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"gamepadConfig\\\",\\\"text\\\":\\\"\\\\\\\"This is the gamepadConfig option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(GamepadConfig)\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"keyConfig\\\",\\\"text\\\":\\\"\\\\\\\"This is the keyConfig option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_KeyboardConfig)\\\\\\\"\\\"}\",\"{\\\"symbol\\\":\\\"autosave\\\",\\\"text\\\":\\\"\\\\\\\"This is the autosave option.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"(YEP_X_Autosave)\\\\\\\"\\\"}\"]"}

@param gameEnd
@text Game End Help Window
@type struct<helpWinSt>
@desc Help Window for the game end scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[\"{\\\"symbol\\\":\\\"toTitle\\\",\\\"text\\\":\\\"\\\\\\\"This is the Go to Title command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"cancel\\\",\\\"text\\\":\\\"\\\\\\\"This is the cancel command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\"]"}

@param name
@text Scene Name Help Window
@type struct<helpWinSt>
@desc Help Window for the name input scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[]"}

@param nameInputLineHeight
@text Name Input Line Height
@type number
@desc Change the name input line height if you need to resize the window to fit better on screen.
@default 32
@parent name

@param shop
@text Shop Help Window
@type struct<helpWinSt>
@desc Help Window for the shop scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[\"{\\\"symbol\\\":\\\"buy\\\",\\\"text\\\":\\\"\\\\\\\"This is the buy command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"sell\\\",\\\"text\\\":\\\"\\\\\\\"This is the sell command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"cancel\\\",\\\"text\\\":\\\"\\\\\\\"This is the cancel command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"equip\\\",\\\"text\\\":\\\"\\\\\\\"This is the equip command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\\\\\"YEP_ShopMenuCore\\\\\\\"\\\"}\"]"}

@param partyCmd
@text Party Command Window
@type struct<helpWinSt>
@desc Help Window for the battle scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[\"{\\\"symbol\\\":\\\"fight\\\",\\\"text\\\":\\\"\\\\\\\"This is the fight command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"escape\\\",\\\"text\\\":\\\"\\\\\\\"This is the escape command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\"]"}

@param actorCmd
@text Actor Command Window
@type struct<helpWinSt>
@desc Help Window for the battle scene.
@default {"enable":"true","lines":"2","position":"Top","contents":"[\"{\\\"symbol\\\":\\\"attack\\\",\\\"text\\\":\\\"\\\\\\\"This is the attack command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"guard\\\",\\\"text\\\":\\\"\\\\\\\"This is the guard command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"item\\\",\\\"text\\\":\\\"\\\\\\\"This is the item command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"1\\\",\\\"text\\\":\\\"\\\\\\\"This is the first magic type command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\",\"{\\\"symbol\\\":\\\"2\\\",\\\"text\\\":\\\"\\\\\\\"This is the second magic type command.\\\\\\\"\\\",\\\"note\\\":\\\"\\\"}\"]"}

@param selectItem
@text Select Item Help Window
@type struct<helpWinSt>
@desc Help Window for the select item on map.
@default {"enable":"true","lines":"2","position":"Top","contents":"[]"}

@param selectItemSwitch
@text Show Select Item Help
@type switch
@desc If this switch is on, the select item will show the help window.
@default 0
@parent selectItem

@param choice
@text Choice Help Window
@type struct<helpWinSt>
@desc Help Window for the choice window.
@default {"enable":"true","lines":"2","position":"Top","contents":"[]"}

@param choiceSwitch
@text Show Choice Help
@type switch
@desc If this switch is on, the choice will show the help window.
@default 0
@parent choice

@param numberInput
@text Number Input Help Window
@type struct<helpWinSt>
@desc Help Window for the input number window.
@default {"enable":"true","lines":"2","position":"Top","contents":"[]"}

@param numberInputSwitch
@text Show Number Help
@type switch
@desc If this switch is on, the number input will show the help window.
@default 0
@parent numberInput

*/

/* -------------------------------- HELP ALL -------------------------------- */
{
/*~struct~helpWinSt:

@param enable
@text Enable Window
@type boolean
@desc Enable or disable this help window.
@default true

@param lines
@text Lines
@type number
@desc Set the text that will be show in the help window of each command. You can use escape codes too.
@default 2

@param position
@text Position
@type select
@option Top
@option Bottom
@desc The default position of the window.
@default Top

@param contents
@text Contents
@type struct<helpTextSt>[]
@desc Set the text that will be show in the help window of each command. You can use escape codes too.
@default []

*/
}

/* -------------------------- TEXT AND SYMBOL HELP -------------------------- */
{
/*~struct~helpTextSt:

@param symbol
@text Symbol / Index
@type text
@desc Set Symbol or Index that this text belongs.
@default

@param text
@text Help Text
@type note
@desc Set the text that will be show in the help window of each command. You can use escape codes too.
@default

@param note
@text Observation
@type note
@desc This doesn't have any effect on game. Is just a field for the developer write an observation.
@default 

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_HelpWindows = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

class Window_HelpTitle extends Window_Help{

    update(){
        super.update()
        this.openness = SceneManager._scene._commandWindow.openness
    }
}

class Window_HelpChoice extends Window_Help {

    update(){
        super.update()
        this.visible = Plugin.isChoiceHelpVisible()
        this.openness = SceneManager._scene._messageWindow._choiceWindow.openness
    }
}

class Window_HelpNumberInput extends Window_Help {

    update(){
        super.update()
        this.visible = Plugin.isNumberInputHelpVisible()
        this.openness = SceneManager._scene._messageWindow._numberWindow.openness
    }
}

class Window_HelpSelectItem extends Window_Help {

    update(){
        super.update()
        this.visible = Plugin.isSelectItemHelpVisible()
        this.openness = SceneManager._scene._messageWindow._itemWindow.openness
    }
}

class Window_HelpPartyCommand extends Window_Help {

    update(){
        super.update()
        this.openness = SceneManager._scene._partyCommandWindow.openness
        this.visible = SceneManager._scene._partyCommandWindow.active
    }
}

class Window_HelpActorCommand extends Window_Help {

    update(){
        super.update()
        this.openness = SceneManager._scene._actorCommandWindow.openness
        this.visible = SceneManager._scene._actorCommandWindow.active
    }
}

Eli.HelpWindows = {

    version: 5.10,
    url: "https://hakuenstudio.itch.io/eli-help-windows-for-rpg-maker-mv",
    parameters: {
        title: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        menu: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        menuStatusRows: 3,
        itemCategory: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        skill: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        equip: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        save: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        load: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        options: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        gameEnd: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        name: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        nameInputLineHeight: 32,
        shop: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        partyCmd: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        actorCmd: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        selectItem: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        selectItemSwitch: 0,
        choice: {
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        choiceSwitch: 0,
        numberInput:{
            enable: true,
            lines: 2,
            position: "Top",
            contents: [
                {text: "", symbol: "", note:""},
            ]
        },
        numberInputSwitch: 0,
    },
    commentHelps: [],
    Window_HelpTitle: Window_HelpTitle,
    Window_HelpChoice: Window_HelpChoice,
    Window_HelpNumberInput: Window_HelpNumberInput,
    Window_HelpSelectItem: Window_HelpSelectItem,
    Window_HelpPartyCommand: Window_HelpPartyCommand,
    Window_HelpActorCommand: Window_HelpActorCommand,
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
        this.formatParameters()
    },

    initPluginCommands(){},

    formatParameters(){
        this.parameters.choice.contents = []
        this.resetChoiceHelpTexts()
        this.parameters.numberInput.contents = []
        this.parameters.numberInput.contents = [{text: "", symbol: "", note:""}]
        this.parameters.name.contents = []
        this.parameters.name.contents = [{text: "", symbol: "", note:""}]
    },

    resetChoiceHelpTexts(){
        for(let i = 0; i < 50; i++){
            this.parameters.choice.contents[i] = {text: "", symbol: i, note:""}
        }
    },

	param() { return this.parameters },

	title() { return this.param().title},

	menu() { return this.param().menu },

	itemCategory() { return this.param().itemCategory },

	skill() { return this.param().skill },

	equip() { return this.param().equip },

	save() { return this.param().save },

	load() { return this.param().load },

	options() { return this.param().options },

	gameEnd() { return this.param().gameEnd },

	name() { return this.param().name },

	shop() { return this.param().shop },

	partyCmd() { return this.param().partyCmd },

	actorCmd() { return this.param().actorCmd },

    selectItem() { return this.param().selectItem },

    choice() { return this.param().choice },

    numberInput() { return this.param().numberInput },

    isChoiceHelpVisible(){
        const id = this.param().choiceSwitch
        const value = $gameSwitches.value(id)

        return value
    },

    isNumberInputHelpVisible(){
        const id = this.param().numberInputSwitch
        const value = $gameSwitches.value(id)

        return value
    },

    isSelectItemHelpVisible(){
        const id = this.param().selectItemSwitch
        const value = $gameSwitches.value(id)

        return value
    },

    setHelpTextByComments(type, index, helpText){
        this.parameters[type].contents[index].text = helpText
        this.parameters[type].contents[index].symbol = index
    },

    cmdMV_choice(args){
        const data = {type: "choice", index: Number(args[0])}
        this.commentHelps.push(data)
    },

    cmdMV_numberInput(args){
        const data = {type: "numberInput", index: 0}
        this.commentHelps.push(data)
    },

    cmdMV_nameHelp(args){
        const data = {type: "name", index: 0}
        this.commentHelps.push(data)
    },

    executePluginCommandMV(command, args){
        const cmdList = {
            HELPCHOICE: 'cmdMV_choice',
            HELPNUMBERINPUT: 'cmdMV_numberInput',
            HELPNAMEINPUT: 'cmdMV_nameHelp'
        }
        const cmd = cmdList[command.toUpperCase()]

        if(this[cmd]) {
            this[cmd](args)
        }
    },

}

const Plugin = Eli.HelpWindows
const Alias = Eli.HelpWindows.alias

Plugin.initialize()


/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

// Comment
Alias.Game_Interpreter_command108 = Game_Interpreter.prototype.command108
Game_Interpreter.prototype.command108 = function() {
    const cmd = Alias.Game_Interpreter_command108.call(this)
    if(Plugin.commentHelps.length > 0){
        const helpText = this._comments.join("\n")
        const {type, index} = Plugin.commentHelps.shift()
        Plugin.setHelpTextByComments(type, index, helpText)
    }
    
    return cmd
}

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executePluginCommandMV(command, args)
}

}

/* -------------------------------- SCENE MAP ------------------------------- */
{

Alias.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows
Scene_Map.prototype.createAllWindows = function() {
    Alias.Scene_Map_createAllWindows.call(this)
    if(Plugin.choice().enable){
        this.createChoiceHelpWindow()
    }
    if(Plugin.numberInput().enable){
        this.createNumberInputHelpWindow()
    }
    if(Plugin.selectItem().enable){
        this.createSelectItemHelpWindow()
    }
}

Scene_Map.prototype.calcHelpY = function(type, height){
    const position = { Top: 0, Bottom: Graphics.boxHeight - height }

    return position[type]
}

Scene_Map.prototype.createChoiceHelpWindow = function() {
    const {lines, position} = Plugin.choice()
    this.choiceHelpWindow = new Window_HelpChoice(lines)
    this.choiceHelpWindow.y = this.calcHelpY(position, this.choiceHelpWindow.height)
    this._messageWindow._choiceWindow.setHelpWindow(this.choiceHelpWindow)
    this.addWindow(this.choiceHelpWindow)
}

Scene_Map.prototype.createNumberInputHelpWindow = function() {
    const {lines, position} = Plugin.numberInput()
    this.numberInputHelpWindow = new Window_HelpNumberInput(lines)
    this.numberInputHelpWindow.y = this.calcHelpY(position, this.numberInputHelpWindow.height)
    this._messageWindow._numberWindow.setHelpWindow(this.numberInputHelpWindow)
    this.addWindow(this.numberInputHelpWindow)
}

Scene_Map.prototype.createSelectItemHelpWindow = function() {
    const {lines, position} = Plugin.selectItem()
    this.selectItemHelpWindow = new Window_HelpSelectItem(lines)
    this.selectItemHelpWindow.y = this.calcHelpY(position, this.selectItemHelpWindow.height)
    this._messageWindow._itemWindow.setHelpWindow(this.selectItemHelpWindow)
    this.addWindow(this.selectItemHelpWindow)
}

}

/* ------------------------------ SCENE BATTLE ------------------------------ */
{

Alias.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows
Scene_Battle.prototype.createAllWindows = function() {
    Alias.Scene_Battle_createAllWindows.call(this)
    if(Plugin.choice().enable){
        this.createChoiceHelpWindow()
    }
    if(Plugin.numberInput().enable){
        this.createNumberInputHelpWindow()
    }
    if(Plugin.selectItem().enable){
        this.createSelectItemHelpWindow()
    }
    if(Plugin.partyCmd().enable){
        this.createPartyCommandHelpWindow()
    }
    if(Plugin.actorCmd().enable){
        this.createActorCommandHelpWindow()
    }
}

Scene_Battle.prototype.calcHelpY = function(type, height){
    const position = { Top: 0, Bottom: Graphics.boxHeight - height }

    return position[type]
}

Scene_Battle.prototype.createChoiceHelpWindow = function() {
    this.choiceHelpWindow = new Window_HelpChoice(Plugin.choice().lines)
    this._messageWindow._choiceWindow.setHelpWindow(this.choiceHelpWindow)
    this.addWindow(this.choiceHelpWindow)
}

Scene_Battle.prototype.createNumberInputHelpWindow = function() {
    this.numberInputHelpWindow = new Window_HelpNumberInput(Plugin.numberInput().lines)
    this._messageWindow._numberWindow.setHelpWindow(this.numberInputHelpWindow)
    this.addWindow(this.numberInputHelpWindow)
}

Scene_Battle.prototype.createSelectItemHelpWindow = function() {
    this.selectItemHelpWindow = new Window_HelpSelectItem(Plugin.selectItem().lines)
    this._messageWindow._itemWindow.setHelpWindow(this.selectItemHelpWindow)
    this.addWindow(this.selectItemHelpWindow)
}

Scene_Battle.prototype.createPartyCommandHelpWindow = function(){
    this.helpWindowPartyCmd = new Window_HelpPartyCommand(Plugin.partyCmd().lines)
    this._partyCommandWindow.setHelpWindow(this.helpWindowPartyCmd)
    this.addWindow(this.helpWindowPartyCmd)
}

Scene_Battle.prototype.createActorCommandHelpWindow = function(){
    this.helpWindowActorCmd = new Window_HelpActorCommand(Plugin.actorCmd().lines)
    this._actorCommandWindow.setHelpWindow(this.helpWindowActorCmd)
    this.addWindow(this.helpWindowActorCmd)
}

}

/* ------------------------------- WINDOW HELP ------------------------------ */
{

Alias.Window_Help_setItem = Window_Help.prototype.setItem
Window_Help.prototype.setItem = function(item) {
	if(item) {
		item.description = item.description.replace(/\\n/g, '\n') || ''
	}
	Alias.Window_Help_setItem.call(this, item)
}

Window_Help.prototype.setTextWrap = function(text) {
	if (this._text !== text) {
		this._text = text.replace(/\\n/g, '\n')
		this.refresh()
	}
}

}

/* ========================================================================== */
/*                                 TITLE HELP                                 */
/* ========================================================================== */

if(Plugin.title().enable){

/* ------------------------------- SCENE TITLE ------------------------------ */
{

Alias.Scene_Title_create = Scene_Title.prototype.create
Scene_Title.prototype.create = function() {
    Alias.Scene_Title_create.call(this)
    this.createHelpWindow()
    this.adjustWindowsForHelp()
    this.associateHelpWindow()
}

Scene_Title.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_HelpTitle(Plugin.title().lines)
    this.addWindow(this._helpWindow)
}

Scene_Title.prototype.associateHelpWindow = function(){
    this._commandWindow.setHelpWindow(this._helpWindow)
}

Scene_Title.prototype.isBottomHelpMode = function(){
    return Plugin.title().position === "Bottom"
}

Scene_Title.prototype.adjustWindowsForHelp = function(){
    if(this.isBottomHelpMode()){
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height
        const cmdWinSize = this._commandWindow.y + this._commandWindow.height
        if(cmdWinSize >= this._helpWindow.y){
            this._commandWindow.y = this._helpWindow.y - this._commandWindow.height - 4
        } 
    }else{

    }
}

}

/* -------------------------- WINDOW TITLE COMMAND -------------------------- */
{

Alias.Window_TitleCommand_updateHelp = Window_TitleCommand.prototype.updateHelp
Window_TitleCommand.prototype.updateHelp = function() {
    Alias.Window_TitleCommand_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_TitleCommand.prototype.updateMoreHelp = function() {
    const symbol = this.currentSymbol()
    const contents = Plugin.title().contents.find(item => item.symbol === symbol)

    this._helpWindow.setTextWrap(contents ? contents.text : '')
}

}

} // Plugin.title().enable

/* ========================================================================== */
/*                               MAIN MENU HELP                               */
/* ========================================================================== */

if(Plugin.menu().enable){

/* ------------------------------- SCENE MENU ------------------------------- */
{

Alias.Scene_Menu_create = Scene_Menu.prototype.create
Scene_Menu.prototype.create = function() {
    Alias.Scene_Menu_create.call(this)
    this.createHelpWindow()
    this.associateHelpWindow()
    this.adjustWindowsForHelp()
}

Scene_Menu.prototype.isBottomHelpMode = function() {
    return Plugin.menu().position === "Bottom"
}

Scene_Menu.prototype.associateHelpWindow = function() {
    this._commandWindow.setHelpWindow(this._helpWindow)
}

Scene_Menu.prototype.adjustWindowsForHelp = function() {
    if(this.isBottomHelpMode()){
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height
        this._goldWindow.y = this._helpWindow.y - this._goldWindow.height
    }else{
        this._commandWindow.y = this._helpWindow.height
        this._statusWindow.y = this._helpWindow.height
    }
    
}

}

/* --------------------------- WINDOW MENU COMMAND -------------------------- */
{

Alias.Window_MenuCommand_updateHelp = Window_MenuCommand.prototype.updateHelp
Window_MenuCommand.prototype.updateHelp = function() {
    Alias.Window_MenuCommand_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_MenuCommand.prototype.updateMoreHelp = function(){
    const symbol = this.currentSymbol()
    const contents =  Plugin.menu().contents.find(item => item.symbol === symbol)

    this._helpWindow.setTextWrap(contents ? contents.text : "")
}

}

/* --------------------------- WINDOW MENU STATUS --------------------------- */
{

Window_MenuStatus.prototype.numVisibleRows = function() {
    return Plugin.param().menuStatusRows
}

//Overwrite
Window_MenuStatus.prototype.windowHeight = function() {
    return Graphics.boxHeight - this.fittingHeight(Plugin.menu().lines)
}

}

} // Plugin.menu().enable

/* ========================================================================== */
/*                                  ITEM HELP                                 */
/* ========================================================================== */

if(Plugin.itemCategory().enable) {

/* ------------------------------- SCENE ITEM ------------------------------- */
{

Alias.Scene_Item_create = Scene_Item.prototype.create
Scene_Item.prototype.create = function() {
    Alias.Scene_Item_create.call(this)
    if(this.isBottomHelpMode()){
        this.adjustWindowsForHelp()
    }
}

Scene_Item.prototype.adjustWindowsForHelp = function() {
    this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height
    this._categoryWindow.y = 0
    this._itemWindow.y = this._categoryWindow.height 
}

Scene_Item.prototype.isBottomHelpMode = function() {
    return Plugin.itemCategory().position === "Bottom"
}

}

/* --------------------------------- WINDOW --------------------------------- */
{

Alias.Window_ItemCategory_updateHelp = Window_ItemCategory.prototype.updateHelp
Window_ItemCategory.prototype.updateHelp = function (){
    Alias.Window_ItemCategory_updateHelp.call(this)
    if(this.active) this.updateMoreHelp()
}

Window_ItemCategory.prototype.updateMoreHelp = function() {
    const symbol = this.currentSymbol()
    const contents = Plugin.itemCategory().contents.find(item => item.symbol === symbol)

    this._helpWindow.setTextWrap(contents ? contents.text : "")
}

}

} // Plugin.itemCategory().enable

/* ========================================================================== */
/*                                 SKILL HELP                                 */
/* ========================================================================== */

if(Plugin.skill().enable){

/* ------------------------------- SCENE SKILL ------------------------------ */
{

Alias.Scene_Skill_create = Scene_Skill.prototype.create
Scene_Skill.prototype.create = function() {
    Alias.Scene_Skill_create.call(this)
    if(this.isBottomHelpMode()){
        this.adjustWindowsForHelp()
    }
}

Scene_Skill.prototype.adjustWindowsForHelp = function() {
    this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height
    this._skillTypeWindow.y = 0
    this._statusWindow.y = 0
    this._itemWindow.y = this._skillTypeWindow.height 
}

Scene_Skill.prototype.isBottomHelpMode = function() {
    return Plugin.skill().position === "Bottom"
}

}

/* ---------------------------- WINDOW SKILL TYPE --------------------------- */
{

Alias.Window_SkillType_updateHelp = Window_SkillType.prototype.updateHelp
Window_SkillType.prototype.updateHelp = function(){
    Alias.Window_SkillType_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_SkillType.prototype.updateMoreHelp = function() {
    const ext = this.currentExt()
    const symbol = this.currentSymbol()

    if(symbol === "skill"){
        var contents = Plugin.skill().contents.find(item => item.symbol === ext)
    }else{
        var contents = Plugin.skill().contents.find(item => item.symbol === symbol)
    }

    this._helpWindow.setTextWrap(contents ? contents.text : "")
}

}

} // Plugin.skill().enable

/* ========================================================================== */
/*                                 EQUIP HELP                                 */
/* ========================================================================== */

if(Plugin.equip().enable){

/* ------------------------------- SCENE EQUIP ------------------------------ */
{

Alias.Scene_Equip_create = Scene_Equip.prototype.create
Scene_Equip.prototype.create = function() {
    Alias.Scene_Equip_create.call(this)
    if(this.isBottomHelpMode()){
        this.adjustWindowsForHelp()
    }
}

Scene_Equip.prototype.adjustWindowsForHelp = function() {
    this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height
    this._commandWindow.y = 0
    this._statusWindow.y = 0
    this._slotWindow.y = this._commandWindow.height
    this._itemWindow.y = this._statusWindow.height
}

Scene_Equip.prototype.isBottomHelpMode = function() {
    return Plugin.equip().position === "Bottom"
}

}

/* -------------------------- WINDOW EQUIP COMMAND -------------------------- */
{

Alias.Window_EquipCommand_updateHelp = Window_EquipCommand.prototype.updateHelp
Window_EquipCommand.prototype.updateHelp = function(){
    Alias.Window_EquipCommand_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_EquipCommand.prototype.updateMoreHelp = function() {
    const symbol = this.currentSymbol()
    const contents = Plugin.equip().contents.find(item => item.symbol === symbol)

    this._helpWindow.setTextWrap(contents ? contents.text : "")
}

}

/* --------------------------- WINDOW SLOT COMMAND -------------------------- */
{

Alias.Window_EquipSlot_updateHelp = Window_EquipSlot.prototype.updateHelp
Window_EquipSlot.prototype.updateHelp = function(){
    Alias.Window_EquipSlot_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_EquipSlot.prototype.updateMoreHelp = function() {
    const slotIndex = this._index
    const contents = Plugin.equip().contents.find(item => item.symbol === slotIndex)

    this._helpWindow.setTextWrap(contents ? contents.text : "")
}

}

} // Plugin.equip().enable

/* ========================================================================== */
/*                                  SAVE HELP                                 */
/* ========================================================================== */

if(Plugin.save().enable){

/* ------------------------------- SCENE SAVE ------------------------------- */
{

Alias.Scene_Save_create = Scene_Save.prototype.create
Scene_Save.prototype.create = function() {
    Alias.Scene_Save_create.call(this)
    if(this.isBottomHelpMode()){
        this.adjustWindowsForHelp()
    }
}

Alias.Scene_Save_createListWindow = Scene_Save.prototype.createListWindow
Scene_Save.prototype.createListWindow = function() {
    Alias.Scene_Save_createListWindow.call(this)
    this._listWindow.setHelpWindow(this._helpWindow)
}

Alias.Scene_Save_start = Scene_Save.prototype.start
Scene_Save.prototype.start = function() {
    Alias.Scene_Save_start.call(this)
    this._listWindow.updateHelp()
}

Scene_Save.prototype.adjustWindowsForHelp = function() {
    this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height
    this._listWindow.y = 0
}

Scene_Save.prototype.isBottomHelpMode = function() {
    return Plugin.save().position === "Bottom"
}

}

} // Plugin.save().enable

/* ========================================================================== */
/*                                  LOAD HELP                                 */
/* ========================================================================== */

if(Plugin.load().enable) {

/* ------------------------------- SCENE LOAD ------------------------------- */
{

Alias.Scene_Load_create = Scene_Load.prototype.create
Scene_Load.prototype.create = function() {
    Alias.Scene_Load_create.call(this)
    if(this.isBottomHelpMode()){
        this.adjustWindowsForHelp()
    }
}

Alias.Scene_Load_createListWindow = Scene_Load.prototype.createListWindow
Scene_Load.prototype.createListWindow = function() {
    Alias.Scene_Load_createListWindow.call(this)
    this._listWindow.setHelpWindow(this._helpWindow)
}

Alias.Scene_Load_start = Scene_Load.prototype.start
Scene_Load.prototype.start = function() {
    Alias.Scene_Load_start.call(this)
    this._listWindow.updateHelp()
}

Scene_Load.prototype.adjustWindowsForHelp = function() {
    this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height
    this._listWindow.y = 0
}

Scene_Load.prototype.isBottomHelpMode = function() {
    return Plugin.load().position === "Bottom"
}

}

} // Plugin.load().enable

/* ========================================================================== */
/*                             SAVE E LOAD WINDOW                             */
/* ========================================================================== */

if(Plugin.load().enable || Plugin.save().enable){

Alias.Window_SavefileList_updateHelp = Window_SavefileList.prototype.updateHelp
Window_SavefileList.prototype.updateHelp = function(){
    Alias.Window_SavefileList_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_SavefileList.prototype.updateMoreHelp = function(){
    if(this._mode === 'save'){
        this.updateSaveHelp()

    }else if(this._mode === 'load'){
        this.updateLoadHelp()
    }
}

Window_SavefileList.prototype.updateSaveHelp = function(){
    if(this._index === 0 && this._autosave){
        const text = Plugin.save().contents[0].text
        this._helpWindow.setText(text || '')

    }else{
        const text = TextManager.saveMessage
        this._helpWindow.setText(text || '')
    }
}

Window_SavefileList.prototype.updateLoadHelp = function(){
    if(this._index === 0 && this._autosave){
        const text = Plugin.load().contents[0].text
        this._helpWindow.setText(text || '')

    }else{
        const text = TextManager.loadMessage
        this._helpWindow.setText(text || '')
    }
}

} // Plugin.load().enable || Plugin.save().enable

/* ========================================================================== */
/*                                OPTIONS HELP                                */
/* ========================================================================== */

if(Plugin.options().enable && !Imported.YEP_OptionsCore){

/* ---------------------------------- SCENE --------------------------------- */
{

Alias.Scene_Options_create = Scene_Options.prototype.create
Scene_Options.prototype.create = function() {
    Alias.Scene_Options_create.call(this)
    this.createHelpWindow()
    this.associateHelpWindow()
}

Alias.Scene_Options_createHelpWindow = Scene_Options.prototype.createHelpWindow
Scene_Options.prototype.createHelpWindow = function() {
    Alias.Scene_Options_createHelpWindow.call(this)
    if(this.isBottomHelpMode()){
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height
    }
}

Scene_Options.prototype.associateHelpWindow = function() {
    this._optionsWindow.setHelpWindow(this._helpWindow)
}

Scene_Options.prototype.isBottomHelpMode = function() {
    return Plugin.options().position === "Bottom"
}

}

/* ------------------------------ WINDOW OPTION ----------------------------- */
{

Alias.Window_Options_updateHelp = Window_Options.prototype.updateHelp
Window_Options.prototype.updateHelp = function(){
    Alias.Window_Options_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_Options.prototype.updateMoreHelp = function(){
    const symbol = this.currentSymbol()
    const contents = Plugin.options().contents.find(item => item.symbol === symbol)

    this._helpWindow.setTextWrap(contents ? contents.text : "")
}

}

} // Plugin.options().enable && !Imported.YEP_OptionsCore

/* ========================================================================== */
/*                                GAME END HELP                               */
/* ========================================================================== */

if(Plugin.gameEnd().enable){

/* ----------------------------- SCENE GAME END ----------------------------- */
{

Alias.Scene_GameEnd_create = Scene_GameEnd.prototype.create
Scene_GameEnd.prototype.create = function() {
    Alias.Scene_GameEnd_create.call(this)
    this.createHelpWindow()
    this.associateHelpWindow()
}

Scene_GameEnd.prototype.associateHelpWindow = function() {
    this._commandWindow.setHelpWindow(this._helpWindow)
}

Scene_GameEnd.prototype.isBottomHelpMode = function() {
    return Plugin.gameEnd().position === "Bottom"
}

}

/* ----------------------------- WINDOW GAME END ---------------------------- */
{

Alias.Window_GameEnd_updateHelp = Window_GameEnd.prototype.updateHelp
Window_GameEnd.prototype.updateHelp = function(){
    Alias.Window_GameEnd_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_GameEnd.prototype.updateMoreHelp = function() {
    const symbol = this.currentSymbol()
    const contents = Plugin.gameEnd().contents.find(item => item.symbol === symbol)

    this._helpWindow.setTextWrap(contents ? contents.text : "")
}

}

} // Plugin.gameEnd().enable

/* ========================================================================== */
/*                                  NAME HELP                                 */
/* ========================================================================== */

if(Plugin.name().enable) {

/* ------------------------------- SCENE NAME ------------------------------- */
{

Alias.Scene_Name_create = Scene_Name.prototype.create
Scene_Name.prototype.create = function() {
    Alias.Scene_Name_create.call(this)
    this.createHelpWindow()
    this.adjustWindowsForHelp()
}

Alias.Scene_Name_createHelpWindow = Scene_Name.prototype.createHelpWindow
Scene_Name.prototype.createHelpWindow = function() {
    Alias.Scene_Name_createHelpWindow.call(this)
    this.updateHelpText()
}

Scene_Name.prototype.adjustWindowsForHelp = function() {
    if(this.isBottomHelpMode()){
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height
        this._editWindow.y = this._inputWindow.y - this._editWindow.height - 8
        this._inputWindow.y = this._helpWindow.y - this._inputWindow.height - 8
        
    }else{
        this._editWindow.y = this._helpWindow.height
        this._inputWindow.y = this._editWindow.y + this._editWindow.height + 8
    }
}

Scene_Name.prototype.updateHelpText = function() {
    const contents = Plugin.name().contents
    this._helpWindow.setTextWrap(contents[0].text || "")
}

Scene_Name.prototype.isBottomHelpMode = function() {
    return Plugin.name().position === "Bottom"
}

}

/* ---------------------------- WINDOW NAME INPUT --------------------------- */
{

Window_NameInput.prototype.lineHeight = function() {
    return Plugin.param().nameInputLineHeight
}

}

} // Plugin.name().enable

/* ========================================================================== */
/*                                  SHOP HELP                                 */
/* ========================================================================== */

if(Plugin.shop().enable){

/* ------------------------------- SCENE SHOP ------------------------------- */
{

Alias.Scene_Shop_create = Scene_Shop.prototype.create
Scene_Shop.prototype.create = function() {
    Alias.Scene_Shop_create.call(this)
    if(this.isBottomHelpMode()){
        this.adjustWindowsForHelp()
    }
}

Alias.Scene_Shop_createCommandWindow = Scene_Shop.prototype.createCommandWindow;
Scene_Shop.prototype.createCommandWindow = function() {
    Alias.Scene_Shop_createCommandWindow.call(this)
    this._commandWindow.setHelpWindow(this._helpWindow)
}

Alias.Scene_Shop_start = Scene_Shop.prototype.start
Scene_Shop.prototype.start = function(){
    Alias.Scene_Shop_start.call(this)
    this._commandWindow.updateMoreHelp()
}

Alias.Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel
Scene_Shop.prototype.onBuyCancel = function() {
    Alias.Scene_Shop_onBuyCancel.call(this)
    this._commandWindow.activate()
}

Scene_Shop.prototype.adjustWindowsForHelp = function() {
    this._commandWindow.y = 0
    this._goldWindow.y = 0
    this._categoryWindow.y = this._commandWindow.height
    this._buyWindow.y = this._commandWindow.height
    this._statusWindow.y = this._commandWindow.height
    this._numberWindow.y = this._commandWindow.height
    this._dummyWindow.y = this._commandWindow.height
    this._sellWindow.y = this._categoryWindow.y + this._categoryWindow.height
    this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height

}

Scene_Shop.prototype.isBottomHelpMode = function() {
    const type = Plugin.shop().position
    const position = { Top: false, Bottom: true }

    return position[type]
}

}

/* --------------------------- WINDOW SHOP COMMAND -------------------------- */
{

Alias.Window_ShopCommand_updateHelp = Window_ShopCommand.prototype.updateHelp
Window_ShopCommand.prototype.updateHelp = function() {
    Alias.Window_ShopCommand_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_ShopCommand.prototype.updateMoreHelp = function() {
    const symbol = this.currentSymbol()
    const contents = Plugin.shop().contents.find(item => item.symbol === symbol)

    this._helpWindow.setTextWrap(contents ? contents.text : "")
}

}

} // Plugin.shop().enable

/* ========================================================================== */
/*                                 BATTLE HELP                                */
/* ========================================================================== */

if(Plugin.partyCmd().enable || Plugin.actorCmd().enable){

/* -------------------------- WINDOW PARTY COMMAND -------------------------- */
{

Window_PartyCommand.prototype.updateHelp = function(){
    this.updateMoreHelp()
}

Window_PartyCommand.prototype.updateMoreHelp = function() {
    const symbol = this.currentSymbol()
    const contents = Plugin.partyCmd().contents.find(item => item.symbol === symbol)

    this._helpWindow.setTextWrap(contents ? contents.text : "")
}

}

/* -------------------------- WINDOW ACTOR COMMAND -------------------------- */
{

Window_ActorCommand.prototype.updateHelp = function(){
    this.updateMoreHelp()
}

// EDITED BY HALEY
Window_ActorCommand.prototype.updateMoreHelp = function() {
    const name = this.currentData().name
    //var contents = name
    var contents = Plugin.actorCmd().contents.find(item => item.symbol === name)
    //console.log(contents)
    this._helpWindow.setTextWrap(contents ? contents.text : ("No description set for " + name))

    /*
    const ext = this.currentExt()
    const symbol = this.currentSymbol()
    
    if(symbol === "skill"){
        var contents = Plugin.actorCmd().contents.find(item => item.symbol === ext)
    }else{
        var contents = Plugin.actorCmd().contents.find(item => item.symbol === symbol)
    }

    this._helpWindow.setTextWrap(contents ? contents.text : "")
    */
}

}

} // Plugin.partyCmd().enable || Plugin.actorCmd().enable

/* ========================================================================== */
/*                              SELECT ITEM HELP                              */
/* ========================================================================== */

if(Plugin.selectItem().enable){

/* ---------------------------- WINDOW EVENT ITEM --------------------------- */
{

Alias.Window_EventItem_updatePlacement = Window_EventItem.prototype.updatePlacement
Window_EventItem.prototype.updatePlacement = function() {
    Alias.Window_EventItem_updatePlacement.call(this)
    this.updateHelpPosition()
}

Window_EventItem.prototype.updateHelpPosition = function(){
    if(this.y === 0){
        this._helpWindow.y = this.y + this.height + 4
    }else{
        this._helpWindow.y = 0
    } 
}

}

} // Plugin.selectItem().enable

/* ========================================================================== */
/*                                 CHOICE HELP                                */
/* ========================================================================== */

if(Plugin.choice().enable){

Alias.Window_ChoiceList_updateHelp = Window_ChoiceList.prototype.updateHelp
Window_ChoiceList.prototype.updateHelp = function() {
    Alias.Window_ChoiceList_updateHelp.call(this)
    this.updateMoreHelp()
}

Alias.Window_ChoiceList_close = Window_ChoiceList.prototype.close
Window_ChoiceList.prototype.close = function(){
    Alias.Window_ChoiceList_close.call(this)
    Plugin.resetChoiceHelpTexts()
}

Window_ChoiceList.prototype.updateMoreHelp = function(){
    const index = this.index()
    if(index > -1){
        const contents = Plugin.choice().contents[index]
        this._helpWindow.setText(contents ? contents.text : "")
    }
}



} // Plugin.choice().enable

/* ========================================================================== */
/*                              NUMBER INPUT HELP                             */
/* ========================================================================== */

if(Plugin.numberInput().enable){

/* --------------------------- WINDOW NUMBER INPUT -------------------------- */
{

Alias.Window_NumberInput_updateHelp = Window_NumberInput.prototype.updateHelp
Window_NumberInput.prototype.updateHelp = function() {
    Alias.Window_NumberInput_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_NumberInput.prototype.updateMoreHelp = function() {
    this._helpWindow.setText(Plugin.numberInput().contents[0].text)
}

}

} // Plugin.numberInput().enable

}