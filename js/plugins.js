// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"YEP_BattleEngineCore","status":true,"description":"v1.49 Have more control over the flow of the battle system\nwith this plugin and alter various aspects to your liking.","parameters":{"---General---":"","Action Speed":"agi","Default System":"ctb","---Escape---":"","Escape Ratio":"0.5 * $gameParty.agility() / $gameTroop.agility()","Fail Escape Boost":"0.10","---Animation---":"","Animation Base Delay":"0","Animation Next Delay":"0","Certain Hit Animation":"0","Physical Animation":"52","Magical Animation":"51","Enemy Attack Animation":"39","Reflect Animation":"42","Motion Waiting":"false","---Frontview---":"","Front Position X":"Graphics.boxWidth / 8 + Graphics.boxWidth / 4 * index","Front Position Y":"Graphics.boxHeight - 180","Front Actor Sprite":"false","Front Sprite Priority":"1","---Sideview---":"","Home Position X":"screenWidth - 16 - (maxSize + 2) * 32 + index * 32","Home Position Y":"screenHeight - statusHeight - maxSize * 48 + (index+1) * 48 - 32","Side Sprite Priority":"1","---Sprites---":"","Default X Anchor":"0.50","Default Y Anchor":"0.50","Step Distance":"48","Flinch Distance":"12","Show Shadows":"true","---Damage Popups---":"","Popup Duration":"128","Newest Popup Bottom":"true","Popup Overlap Rate":"0.9","Critical Popup":"255, 0, 0, 160","Critical Duration":"60","---Tick-Settings---":"","Timed States":"false","Timed Buffs":"false","Turn Time":"100","AI Self Turns":"true","---Window Settings---":"","Lower Windows":"true","Window Rows":"4","Command Window Rows":"4","Command Alignment":"center","Start Actor Command":"true","Current Max":"false","---Selection Help---":"","Mouse Over":"true","Select Help Window":"true","User Help Text":"User","Ally Help Text":"Ally","Allies Help Text":"Allies","Enemy Help Text":"Enemy","Enemies Help Text":"Enemies","All Help Text":"All %1","Random Help Text":"%2 Random %1","---Enemy Select---":"","Visual Enemy Select":"true","Show Enemy Name":"true","Show Select Box":"false","Enemy Font Size":"20","Enemy Auto Select":"this.furthestRight()","---Actor Select---":"","Visual Actor Select":"true","---Battle Log---":"","Show Emerge Text":"false","Show Pre-Emptive Text":"true","Show Surprise Text":"true","Optimize Speed":"true","Show Action Text":"false","Show State Text":"false","Show Buff Text":"false","Show Counter Text":"true","Show Reflect Text":"true","Show Substitute Text":"true","Show Fail Text":"false","Show Critical Text":"false","Show Miss Text":"false","Show Evasion Text":"false","Show HP Text":"false","Show MP Text":"false","Show TP Text":"false"}},
{"name":"YEP_TargetCore","status":true,"description":"v1.05 Expand the target scope from RPG Maker's default\nlimitations for better target control.","parameters":{"---Battle Engine---":"","Everybody Text":"All Allies and Enemies","All But User Text":"All %1 But %2","Random Any Text":"%1 Random","---Multiple Of---":"","Multiple Text":"%1 with %2 as a Multiple of %3","Multiple Everybody":"Anyone","Multiple Allies":"Any Ally","Multiple Foes":"Any Foe","---Row Formation---":"","Target Row Text":"%1's Row","Front Row Text":"%1 Front Row","Back Row Text":"%1 Back Row","Specific Row Text":"Specific %1 Row","Row Enemies":"Enemy","Row Allies":"Allied"}},
{"name":"YEP_DamageCore","status":true,"description":"v1.08 Expand the control you have over the game's damage\ncalculation with more features and effects.","parameters":{"---Damage Cap---":"","Enable Cap":"true","Maximum Damage":"9999","Maximum Healing":"9999","---Damage Steps---":"","Damage Step 1":"baseDamage = this.modifyBaseDamage(value, baseDamage, target);","Damage Step 2":"baseDamage *= this.calcElementRate(target);","Damage Step 3":"","Damage Step 4":"","Damage Step 5":"","Damage Step 6":"critical = this.modifyCritical(critical, baseDamage, target);","Damage Step 7":"target.result().critical = critical;","Damage Step 8":"value = baseDamage;","Damage Step 9":"","Damage Step 10":"if (baseDamage > 0) {","Damage Step 11":"value = this.applyDamageRate(value, baseDamage, target);","Damage Step 12":"","Damage Step 13":"","Damage Step 14":"","Damage Step 15":"","Damage Step 16":"","Damage Step 17":"","Damage Step 18":"}","Damage Step 19":"","Damage Step 20":"if (baseDamage < 0) {","Damage Step 21":"value = this.applyHealRate(value, baseDamage, target);","Damage Step 22":"","Damage Step 23":"","Damage Step 24":"","Damage Step 25":"","Damage Step 26":"","Damage Step 27":"","Damage Step 28":"}","Damage Step 29":"","Damage Step 30":"if (critical) {","Damage Step 31":"value = this.applyCriticalRate(value, baseDamage, target);","Damage Step 32":"","Damage Step 33":"","Damage Step 34":"","Damage Step 35":"","Damage Step 36":"","Damage Step 37":"","Damage Step 38":"}","Damage Step 39":"","Damage Step 40":"if (this.isPhysical()) {","Damage Step 41":"value = this.applyPhysicalRate(value, baseDamage, target);","Damage Step 42":"","Damage Step 43":"","Damage Step 44":"","Damage Step 45":"","Damage Step 46":"","Damage Step 47":"value = this.applyFlatPhysical(value, baseDamage, target);","Damage Step 48":"}","Damage Step 49":"","Damage Step 50":"if (this.isMagical()) {","Damage Step 51":"value = this.applyMagicalRate(value, baseDamage, target);","Damage Step 52":"","Damage Step 53":"","Damage Step 54":"","Damage Step 55":"","Damage Step 56":"","Damage Step 57":"value = this.applyFlatMagical(value, baseDamage, target);","Damage Step 58":"}","Damage Step 59":"","Damage Step 60":"if (baseDamage > 0) {","Damage Step 61":"value = this.applyFlatDamage(value, baseDamage, target);","Damage Step 62":"","Damage Step 63":"","Damage Step 64":"","Damage Step 65":"","Damage Step 66":"","Damage Step 67":"","Damage Step 68":"}","Damage Step 69":"","Damage Step 70":"if (baseDamage < 0) {","Damage Step 71":"value = this.applyFlatHeal(value, baseDamage, target);","Damage Step 72":"","Damage Step 73":"","Damage Step 74":"","Damage Step 75":"","Damage Step 76":"","Damage Step 77":"","Damage Step 78":"}","Damage Step 79":"","Damage Step 80":"if (critical) {","Damage Step 81":"value = this.applyFlatCritical(value, baseDamage, target);","Damage Step 82":"","Damage Step 83":"","Damage Step 84":"","Damage Step 85":"","Damage Step 86":"","Damage Step 87":"","Damage Step 88":"}","Damage Step 89":"","Damage Step 90":"value = this.applyVariance(value, item.damage.variance);","Damage Step 91":"","Damage Step 92":"","Damage Step 93":"","Damage Step 94":"","Damage Step 95":"value = this.applyGuard(value, target);","Damage Step 96":"","Damage Step 97":"","Damage Step 98":"","Damage Step 99":"value = this.applyFlatGlobal(value, baseDamage, target);","Damage Step 100":"value = this.applyMinimumDamage(value, baseDamage, target);"}},
{"name":"YEP_X_SelectionControl","status":true,"description":"v1.15 (Requires YEP_BattleEngineCore & YEP_TargetCore.js)\nControl what targets can and can't be selected for actions.","parameters":{"---Default---":"","Single Multiple":"true","Disperse Damage":"true","Actor or Enemy":"true","Physical Front Row":"false","Physical Weapon Range":"true","Default Weapon Range":"false","---Text Display---":"","All Enemies":"All Enemies","All Allies":"All Allies","---Visual All Window Select---":"","Enable Visual All":"true","Visual Enemy X":"0","Visual Enemy Y":"this.fittingHeight(2)","Visual Enemy Width":"240","Visual Enemy Height":"this.fittingHeight(1)","Visual Ally X":"Graphics.boxWidth - 240","Visual Ally Y":"this.fittingHeight(2)","Visual Ally Width":"240","Visual Ally Height":"this.fittingHeight(1)"}},
{"name":"YEP_X_BattleSysCTB","status":true,"description":"v1.17 (Requires YEP_BattleEngineCore.js) Add CTB (Charge\nTurn Battle) into your game using this plugin!","parameters":{"---CTB Settings---":"","Per Tick":"user.agi","Initial Speed":"0","Full Gauge":"Math.max(7000, BattleManager.highestBaseAgi() * 120)","Pre-Emptive Bonuses":"0.8","Surprise Bonuses":"0.8","---Escape---":"","Escape Ratio":"0.125 * $gameParty.agility() / $gameTroop.agility()","Fail Escape Boost":"0.025","---Turn---":"","Full Turn":"Math.min(200, BattleManager.lowestBaseAgi() * 8)","---Rubberband---":"","Enable Rubberband":"true","Minimum Speed":"0.5 * BattleManager.highestBaseAgi()","Maximum Speed":"1.5 * BattleManager.highestBaseAgi()","---Sound---":"","Ready Sound":"Decision1","Ready Volume":"90","Ready Pitch":"120","Ready Pan":"0","---Turn Order---":"","Show Turn Order":"true","Icon Size":"48","Position Y":"screenHeight - 86","Position X":"right","Turn Direction":"left","Ally Border Color":"4","Ally Back Color":"22","Ally Icon":"0","Enemy Border Color":"2","Enemy Back Color":"19","Enemy Icon":"0","Enemy SV Battlers":"false"}},
{"name":"YEP_RowFormation","status":true,"description":"v1.16 Places party members into row formations to give\nthem distinct advantages based on row location.","parameters":{"---General---":"","Maximum Rows":"2","Command Name":"Altitude","Auto Add Menu":"true","Show Menu Command":"true","Enable Menu Command":"true","Show Battle Command":"false","Enable Battle Command":"false","Battle Cooldown":"1","---Defaults---":"","Default Row":"1","Enemy Row Lock":"false","---Menu Settings---":"","Use Map Sprite":"true","Front Buffer Y":"(rect.height - 48) / 2;","Side Buffer Y":"(rect.height - 64) / 2;","---Position Settings---":"","Alive Row Index":"false","Maximum Row X":"screenWidth - partySize * 32 - 16","Maximum Row Y":"screenHeight - statusHeight - 16","Minimum Row Y":"screenHeight - statusHeight - 16 - (maxSize * 64)","Center Row Y":"(maxRowY + minRowY) / 2 + 16","---Row 1 Settings---":"","Row 1 Name":"Low","Row 1 Help Line 1":"Close to the ground","Row 1 Help Line 2":"Birds come here occasionally","Row 1 States":"","Row 1 States 1.5.0":"[]","Row 1 Home X":"maxRowX - (maxRows - rowId) * 112 + rowIndex * 32","Row 1 Home Y":"centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32","---Row 2 Settings---":"","Row 2 Name":"High","Row 2 Help Line 1":"Up in the air","Row 2 Help Line 2":"The home of the birds","Row 2 States":"","Row 2 States 1.5.0":"[]","Row 2 Home X":"maxRowX - (maxRows - rowId) * 112 + rowIndex * 32","Row 2 Home Y":"centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32","---Row 3 Settings---":"","Row 3 Name":"Back Row","Row 3 Help Line 1":"This is the back row.","Row 3 Help Line 2":"Place allies here to take less melee damage.","Row 3 States":"","Row 3 States 1.5.0":"[]","Row 3 Home X":"maxRowX - (maxRows - rowId) * 112 + rowIndex * 32","Row 3 Home Y":"centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32","---Row 4 Settings---":"","Row 4 Name":"Row 4","Row 4 Help Line 1":"Help Description","Row 4 Help Line 2":"Help Description","Row 4 States":"","Row 4 States 1.5.0":"[]","Row 4 Home X":"maxRowX - (maxRows - rowId) * 112 + rowIndex * 32","Row 4 Home Y":"centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32","---Row 5 Settings---":"","Row 5 Name":"Row 5","Row 5 Help Line 1":"Help Description","Row 5 Help Line 2":"Help Description","Row 5 States":"","Row 5 States 1.5.0":"[]","Row 5 Home X":"maxRowX - (maxRows - rowId) * 112 + rowIndex * 32","Row 5 Home Y":"centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32","---Row 6 Settings---":"","Row 6 Name":"Row 6","Row 6 Help Line 1":"Help Description","Row 6 Help Line 2":"Help Description","Row 6 States":"","Row 6 States 1.5.0":"[]","Row 6 Home X":"maxRowX - (maxRows - rowId) * 112 + rowIndex * 32","Row 6 Home Y":"centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32","---Row 7 Settings---":"","Row 7 Name":"Row 7","Row 7 Help Line 1":"Help Description","Row 7 Help Line 2":"Help Description","Row 7 States":"","Row 7 States 1.5.0":"[]","Row 7 Home X":"maxRowX - (maxRows - rowId) * 112 + rowIndex * 32","Row 7 Home Y":"centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32","---Row 8 Settings---":"","Row 8 Name":"Row 8","Row 8 Help Line 1":"Help Description","Row 8 Help Line 2":"Help Description","Row 8 States":"","Row 8 States 1.5.0":"[]","Row 8 Home X":"maxRowX - (maxRows - rowId) * 112 + rowIndex * 32","Row 8 Home Y":"centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32","---Row 9 Settings---":"","Row 9 Name":"Row 9","Row 9 Help Line 1":"Help Description","Row 9 Help Line 2":"Help Description","Row 9 States":"","Row 9 States 1.5.0":"[]","Row 9 Home X":"maxRowX - (maxRows - rowId) * 112 + rowIndex * 32","Row 9 Home Y":"centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32","---Row 10 Settings---":"","Row 10 Name":"Row 10","Row 10 Help Line 1":"Help Description","Row 10 Help Line 2":"Help Description","Row 10 States":"","Row 10 States 1.5.0":"[]","Row 10 Home X":"maxRowX - (maxRows - rowId) * 112 + rowIndex * 32","Row 10 Home Y":"centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32","---Enemy Rows---":"","Adjust Relative":"false","Enemy Row X":"screenX - (rowId - 1) * 64","Enemy Row Y":"screenY"}},
{"name":"YEP_AutoPassiveStates","status":true,"description":"v1.17 This plugin allows for some states to function as\npassives for actors, enemies, skills, and equips.","parameters":{"---Basic---":"","Actor Passives":"0","Enemy Passives":"0","Global Passives":"0","---List---":"...Requires RPG Maker MV 1.5.0+...","Actor Passives List":"[\"11\"]","Enemy Passives List":"[]","Global Passives List":"[]"}},
{"name":"YEP_Taunt","status":true,"description":"v1.02 Adds a Taunt mechanic to battle. Battlers with a\ntaunt property become the target of enemy focus.","parameters":{}},
{"name":"HIME_CustomDeathStates","status":true,"description":"Additional states that should be considered \"death\" which\r\nwill be used to trigger battle defeat or game over.","parameters":{}},
{"name":"SRD_SuperToolsEngine","status":true,"description":"The heart of all maker-style plugins; it adds a playtesting editor that can be opened with F12.","parameters":{"Connect Editor":"true","Auto Open Window":"true","Auto Move Window":"true","Menu Editor Exempt List":"[\"Window_BattleLog\",\"Window_MapName\"]"}},
{"name":"SimpleMsgSideView","status":true,"description":"at sideview battle, only display item/skill names.","parameters":{"displayAttack":"0","position":"1"}},
{"name":"MadeWithMv","status":false,"description":"Show a Splash Screen \"Made with MV\" and/or a Custom Splash Screen before going to main screen.","parameters":{"Show Made With MV":"true","Made with MV Image":"MadeWithMv","Show Custom Splash":"false","Custom Image":"","Fade Out Time":"120","Fade In Time":"120","Wait Time":"160"}},
{"name":"QPlus","status":false,"description":"<QPlus> (Should go above all Q Plugins)\r\nSome small changes to MV for easier plugin development.","parameters":{"Quick Test":"false","Default Enabled Switches":"[]","Ignore Mouse when inactive":"false"}},
{"name":"QMovement","status":false,"description":"<QMovement>\r\nMore control over character movement","parameters":{"Main Settings":"","Grid":"1","Tile Size":"48","Off Grid":"true","Optional Settings":"","Smart Move":"2","Mid Pass":"false","Move on click":"false","Diagonal":"true","Diagonal Speed":"0","Colliders":"","Player Collider":"{\"Type\":\"box\",\"Width\":\"36\",\"Height\":\"24\",\"Offset X\":\"6\",\"Offset Y\":\"24\"}","Event Collider":"{\"Type\":\"box\",\"Width\":\"36\",\"Height\":\"24\",\"Offset X\":\"6\",\"Offset Y\":\"24\"}","Presets":"[]","Debug Settings":"","Show Colliders":"true"}},
{"name":"SRD_HUDMaker","status":true,"description":"Allows developers to create their own map-based HUD through an in-game GUI window!","parameters":{"Active Updating":"true","Show During Events":"transparent","Map Global Condition":"","Battle Global Condition":"","Disable Delete Key":"true"}},
{"name":"YEP_RegionRestrictions","status":true,"description":"v1.04 Use regions to block out Events and/or the player from\nbeing able to venture into those spots.","parameters":{"Player Restrict":"1","Event Restrict":"0","All Restrict":"0","Player Allow":"0","Event Allow":"0","All Allow":"0"}},
{"name":"GALV_EventSpawner","status":true,"description":"(v.1.8) Spawn events from a specified spawn map to a desired location.","parameters":{"Spawn Map Id":"2"}},
{"name":"Cae_ScoreTable","status":true,"description":"v1.2 - Adds a customisable high-score scene to the game.","parameters":{"--- Scores ---":"","Score Count":"10","Default Score List":"[]","Score Format":"[\"{\\\"Type\\\":\\\"Data\\\",\\\"Ext\\\":\\\"Index\\\",\\\"Width\\\":\\\"32\\\",\\\"Align\\\":\\\"center\\\",\\\"Colour\\\":\\\"1\\\"}\",\"{\\\"Type\\\":\\\"Data\\\",\\\"Ext\\\":\\\"Name\\\",\\\"Width\\\":\\\"this.contentsWidth() / 2 - 32 - this.formatPadding()\\\",\\\"Align\\\":\\\"left\\\",\\\"Colour\\\":\\\"0\\\"}\",\"{\\\"Type\\\":\\\"Data\\\",\\\"Ext\\\":\\\"Score\\\",\\\"Width\\\":\\\"this.contentsWidth() / 2 - 2 * this.formatPadding()\\\",\\\"Align\\\":\\\"right\\\",\\\"Colour\\\":\\\"14\\\"}\",\"{\\\"Type\\\":\\\"Text\\\",\\\"Ext\\\":\\\"\\\",\\\"Width\\\":\\\"0\\\",\\\"Align\\\":\\\"left\\\",\\\"Colour\\\":\\\"0\\\"}\"]","Format Padding":"-1","--- Title Command ---":"","Title Command Name":"View Scores","Title Command Position":"10000","Title Command Symbol":"scoreTable","--- Pause Command ---":"","Pause Command Name":"","Pause Command Position":"-3","Pause Command Symbol":"scoreTable","--- Table Settings ---":"","Table X":"Graphics.boxWidth * 1 / 10","Table Y":"Graphics.boxHeight * 2 / 8","Table Width":"Graphics.boxWidth * 8 / 10","Table Height":"10 * this.lineHeight() + 2 * this.standardPadding()","Table Background Type":"0","--- Scene Extras ---":"","Scores Title":"{\"Text\":\"Scores\",\"X\":\"0\",\"Y\":\"(this.y - this.lineHeight()) / 2\",\"Width\":\"-1\",\"Font Size\":\"60\",\"Align\":\"center\",\"Colour\":\"white\",\"Outline Colour\":\"black\",\"Outline Width\":\"6\"}","Scores Background 1":"","Scores Background 2":"","Scores BGM":"","--- File Settings ---":"","Score File (Web Key)":"Scores","Score File (Local)":"scores"}},
{"name":"YEP_CreditsPage","status":true,"description":"v1.02 Adds a 'Credits' command to the title screen that\nwill take the player to a credits scene.","parameters":{"---General---":"","Command Name":"Credits","---Credit Lines---":"","Line 1 Text":"Celeste - Music & SFX","Line 1 URL":"","Line 2 Text":" ","Line 2 URL":"","Line 3 Text":"Jacob - Coding & UI","Line 3 URL":"","Line 4 Text":" ","Line 4 URL":"","Line 5 Text":"Kali - Art & itch.io Page","Line 5 URL":"","Line 6 Text":" ","Line 6 URL":"","Line 7 Text":"Haley - Coding & Implementation","Line 7 URL":"","Line 8 Text":" ","Line 8 URL":"","Line 9 Text":"Made with RPG Maker MV","Line 9 URL":"","Line 10 Text":"with plugins by: ","Line 10 URL":"","Line 11 Text":"Yanfly, Galv, HimeWorks, SRD, Kath, and Cae","Line 11 URL":"","Line 12 Text":"","Line 12 URL":"","Line 13 Text":"","Line 13 URL":"","Line 14 Text":"","Line 14 URL":"","Line 15 Text":"","Line 15 URL":"","Line 16 Text":"","Line 16 URL":"","Line 17 Text":"","Line 17 URL":"","Line 18 Text":"","Line 18 URL":"","Line 19 Text":"","Line 19 URL":"","Line 20 Text":"","Line 20 URL":"","Line 21 Text":"","Line 21 URL":"","Line 22 Text":"","Line 22 URL":"","Line 23 Text":"","Line 23 URL":"","Line 24 Text":"","Line 24 URL":"","Line 25 Text":"","Line 25 URL":"","Line 26 Text":"","Line 26 URL":"","Line 27 Text":"","Line 27 URL":"","Line 28 Text":"","Line 28 URL":"","Line 29 Text":"","Line 29 URL":"","Line 30 Text":"","Line 30 URL":"","Line 31 Text":"","Line 31 URL":"","Line 32 Text":"","Line 32 URL":"","Line 33 Text":"","Line 33 URL":"","Line 34 Text":"","Line 34 URL":"","Line 35 Text":"","Line 35 URL":"","Line 36 Text":"","Line 36 URL":"","Line 37 Text":"","Line 37 URL":"","Line 38 Text":"","Line 38 URL":"","Line 39 Text":"","Line 39 URL":"","Line 40 Text":"","Line 40 URL":"","Line 41 Text":"","Line 41 URL":"","Line 42 Text":"","Line 42 URL":"","Line 43 Text":"","Line 43 URL":"","Line 44 Text":"","Line 44 URL":"","Line 45 Text":"","Line 45 URL":"","Line 46 Text":"","Line 46 URL":"","Line 47 Text":"","Line 47 URL":"","Line 48 Text":"","Line 48 URL":"","Line 49 Text":"","Line 49 URL":"","Line 50 Text":"","Line 50 URL":"","Line 51 Text":"","Line 51 URL":"","Line 52 Text":"","Line 52 URL":"","Line 53 Text":"","Line 53 URL":"","Line 54 Text":"","Line 54 URL":"","Line 55 Text":"","Line 55 URL":"","Line 56 Text":"","Line 56 URL":"","Line 57 Text":"","Line 57 URL":"","Line 58 Text":"","Line 58 URL":"","Line 59 Text":"","Line 59 URL":"","Line 60 Text":"","Line 60 URL":"","Line 61 Text":"","Line 61 URL":"","Line 62 Text":"","Line 62 URL":"","Line 63 Text":"","Line 63 URL":"","Line 64 Text":"","Line 64 URL":"","Line 65 Text":"","Line 65 URL":"","Line 66 Text":"","Line 66 URL":"","Line 67 Text":"","Line 67 URL":"","Line 68 Text":"","Line 68 URL":"","Line 69 Text":"","Line 69 URL":"","Line 70 Text":"","Line 70 URL":"","Line 71 Text":"","Line 71 URL":"","Line 72 Text":"","Line 72 URL":"","Line 73 Text":"","Line 73 URL":"","Line 74 Text":"","Line 74 URL":"","Line 75 Text":"","Line 75 URL":"","Line 76 Text":"","Line 76 URL":"","Line 77 Text":"","Line 77 URL":"","Line 78 Text":"","Line 78 URL":"","Line 79 Text":"","Line 79 URL":"","Line 80 Text":"","Line 80 URL":"","Line 81 Text":"","Line 81 URL":"","Line 82 Text":"","Line 82 URL":"","Line 83 Text":"","Line 83 URL":"","Line 84 Text":"","Line 84 URL":"","Line 85 Text":"","Line 85 URL":"","Line 86 Text":"","Line 86 URL":"","Line 87 Text":"","Line 87 URL":"","Line 88 Text":"","Line 88 URL":"","Line 89 Text":"","Line 89 URL":"","Line 90 Text":"","Line 90 URL":"","Line 91 Text":"","Line 91 URL":"","Line 92 Text":"","Line 92 URL":"","Line 93 Text":"","Line 93 URL":"","Line 94 Text":"","Line 94 URL":"","Line 95 Text":"","Line 95 URL":"","Line 96 Text":"","Line 96 URL":"","Line 97 Text":"","Line 97 URL":"","Line 98 Text":"","Line 98 URL":"","Line 99 Text":"","Line 99 URL":"","Line 100 Text":"","Line 100 URL":"","Line 101 Text":"","Line 101 URL":"","Line 102 Text":"","Line 102 URL":"","Line 103 Text":"","Line 103 URL":"","Line 104 Text":"","Line 104 URL":"","Line 105 Text":"","Line 105 URL":"","Line 106 Text":"","Line 106 URL":"","Line 107 Text":"","Line 107 URL":"","Line 108 Text":"","Line 108 URL":"","Line 109 Text":"","Line 109 URL":"","Line 110 Text":"","Line 110 URL":"","Line 111 Text":"","Line 111 URL":"","Line 112 Text":"","Line 112 URL":"","Line 113 Text":"","Line 113 URL":"","Line 114 Text":"","Line 114 URL":"","Line 115 Text":"","Line 115 URL":"","Line 116 Text":"","Line 116 URL":"","Line 117 Text":"","Line 117 URL":"","Line 118 Text":"","Line 118 URL":"","Line 119 Text":"","Line 119 URL":"","Line 120 Text":"","Line 120 URL":"","Line 121 Text":"","Line 121 URL":"","Line 122 Text":"","Line 122 URL":"","Line 123 Text":"","Line 123 URL":"","Line 124 Text":"","Line 124 URL":"","Line 125 Text":"","Line 125 URL":"","Line 126 Text":"","Line 126 URL":"","Line 127 Text":"","Line 127 URL":"","Line 128 Text":"","Line 128 URL":"","Line 129 Text":"","Line 129 URL":"","Line 130 Text":"","Line 130 URL":"","Line 131 Text":"","Line 131 URL":"","Line 132 Text":"","Line 132 URL":"","Line 133 Text":"","Line 133 URL":"","Line 134 Text":"","Line 134 URL":"","Line 135 Text":"","Line 135 URL":"","Line 136 Text":"","Line 136 URL":"","Line 137 Text":"","Line 137 URL":"","Line 138 Text":"","Line 138 URL":"","Line 139 Text":"","Line 139 URL":"","Line 140 Text":"","Line 140 URL":"","Line 141 Text":"","Line 141 URL":"","Line 142 Text":"","Line 142 URL":"","Line 143 Text":"","Line 143 URL":"","Line 144 Text":"","Line 144 URL":"","Line 145 Text":"","Line 145 URL":"","Line 146 Text":"","Line 146 URL":"","Line 147 Text":"","Line 147 URL":"","Line 148 Text":"","Line 148 URL":"","Line 149 Text":"","Line 149 URL":"","Line 150 Text":"","Line 150 URL":"","Line 151 Text":"","Line 151 URL":"","Line 152 Text":"","Line 152 URL":"","Line 153 Text":"","Line 153 URL":"","Line 154 Text":"","Line 154 URL":"","Line 155 Text":"","Line 155 URL":"","Line 156 Text":"","Line 156 URL":"","Line 157 Text":"","Line 157 URL":"","Line 158 Text":"","Line 158 URL":"","Line 159 Text":"","Line 159 URL":"","Line 160 Text":"","Line 160 URL":"","Line 161 Text":"","Line 161 URL":"","Line 162 Text":"","Line 162 URL":"","Line 163 Text":"","Line 163 URL":"","Line 164 Text":"","Line 164 URL":"","Line 165 Text":"","Line 165 URL":"","Line 166 Text":"","Line 166 URL":"","Line 167 Text":"","Line 167 URL":"","Line 168 Text":"","Line 168 URL":"","Line 169 Text":"","Line 169 URL":"","Line 170 Text":"","Line 170 URL":"","Line 171 Text":"","Line 171 URL":"","Line 172 Text":"","Line 172 URL":"","Line 173 Text":"","Line 173 URL":"","Line 174 Text":"","Line 174 URL":"","Line 175 Text":"","Line 175 URL":"","Line 176 Text":"","Line 176 URL":"","Line 177 Text":"","Line 177 URL":"","Line 178 Text":"","Line 178 URL":"","Line 179 Text":"","Line 179 URL":"","Line 180 Text":"","Line 180 URL":"","Line 181 Text":"","Line 181 URL":"","Line 182 Text":"","Line 182 URL":"","Line 183 Text":"","Line 183 URL":"","Line 184 Text":"","Line 184 URL":"","Line 185 Text":"","Line 185 URL":"","Line 186 Text":"","Line 186 URL":"","Line 187 Text":"","Line 187 URL":"","Line 188 Text":"","Line 188 URL":"","Line 189 Text":"","Line 189 URL":"","Line 190 Text":"","Line 190 URL":"","Line 191 Text":"","Line 191 URL":"","Line 192 Text":"","Line 192 URL":"","Line 193 Text":"","Line 193 URL":"","Line 194 Text":"","Line 194 URL":"","Line 195 Text":"","Line 195 URL":"","Line 196 Text":"","Line 196 URL":"","Line 197 Text":"","Line 197 URL":"","Line 198 Text":"","Line 198 URL":"","Line 199 Text":"","Line 199 URL":"","Line 200 Text":"","Line 200 URL":"","Line 201 Text":"","Line 201 URL":"","Line 202 Text":"","Line 202 URL":"","Line 203 Text":"","Line 203 URL":"","Line 204 Text":"","Line 204 URL":"","Line 205 Text":"","Line 205 URL":"","Line 206 Text":"","Line 206 URL":"","Line 207 Text":"","Line 207 URL":"","Line 208 Text":"","Line 208 URL":"","Line 209 Text":"","Line 209 URL":"","Line 210 Text":"","Line 210 URL":"","Line 211 Text":"","Line 211 URL":"","Line 212 Text":"","Line 212 URL":"","Line 213 Text":"","Line 213 URL":"","Line 214 Text":"","Line 214 URL":"","Line 215 Text":"","Line 215 URL":"","Line 216 Text":"","Line 216 URL":"","Line 217 Text":"","Line 217 URL":"","Line 218 Text":"","Line 218 URL":"","Line 219 Text":"","Line 219 URL":"","Line 220 Text":"","Line 220 URL":"","Line 221 Text":"","Line 221 URL":"","Line 222 Text":"","Line 222 URL":"","Line 223 Text":"","Line 223 URL":"","Line 224 Text":"","Line 224 URL":"","Line 225 Text":"","Line 225 URL":"","Line 226 Text":"","Line 226 URL":"","Line 227 Text":"","Line 227 URL":"","Line 228 Text":"","Line 228 URL":"","Line 229 Text":"","Line 229 URL":"","Line 230 Text":"","Line 230 URL":"","Line 231 Text":"","Line 231 URL":"","Line 232 Text":"","Line 232 URL":"","Line 233 Text":"","Line 233 URL":"","Line 234 Text":"","Line 234 URL":"","Line 235 Text":"","Line 235 URL":"","Line 236 Text":"","Line 236 URL":"","Line 237 Text":"","Line 237 URL":"","Line 238 Text":"","Line 238 URL":"","Line 239 Text":"","Line 239 URL":"","Line 240 Text":"","Line 240 URL":"","Line 241 Text":"","Line 241 URL":"","Line 242 Text":"","Line 242 URL":"","Line 243 Text":"","Line 243 URL":"","Line 244 Text":"","Line 244 URL":"","Line 245 Text":"","Line 245 URL":"","Line 246 Text":"","Line 246 URL":"","Line 247 Text":"","Line 247 URL":"","Line 248 Text":"","Line 248 URL":"","Line 249 Text":"","Line 249 URL":"","Line 250 Text":"","Line 250 URL":"","Line 251 Text":"","Line 251 URL":"","Line 252 Text":"","Line 252 URL":"","Line 253 Text":"","Line 253 URL":"","Line 254 Text":"","Line 254 URL":"","Line 255 Text":"","Line 255 URL":"","Line 256 Text":"","Line 256 URL":"","Line 257 Text":"","Line 257 URL":"","Line 258 Text":"","Line 258 URL":"","Line 259 Text":"","Line 259 URL":"","Line 260 Text":"","Line 260 URL":"","Line 261 Text":"","Line 261 URL":"","Line 262 Text":"","Line 262 URL":"","Line 263 Text":"","Line 263 URL":"","Line 264 Text":"","Line 264 URL":"","Line 265 Text":"","Line 265 URL":"","Line 266 Text":"","Line 266 URL":"","Line 267 Text":"","Line 267 URL":"","Line 268 Text":"","Line 268 URL":"","Line 269 Text":"","Line 269 URL":"","Line 270 Text":"","Line 270 URL":"","Line 271 Text":"","Line 271 URL":"","Line 272 Text":"","Line 272 URL":"","Line 273 Text":"","Line 273 URL":"","Line 274 Text":"","Line 274 URL":"","Line 275 Text":"","Line 275 URL":"","Line 276 Text":"","Line 276 URL":"","Line 277 Text":"","Line 277 URL":"","Line 278 Text":"","Line 278 URL":"","Line 279 Text":"","Line 279 URL":"","Line 280 Text":"","Line 280 URL":"","Line 281 Text":"","Line 281 URL":"","Line 282 Text":"","Line 282 URL":"","Line 283 Text":"","Line 283 URL":"","Line 284 Text":"","Line 284 URL":"","Line 285 Text":"","Line 285 URL":"","Line 286 Text":"","Line 286 URL":"","Line 287 Text":"","Line 287 URL":"","Line 288 Text":"","Line 288 URL":"","Line 289 Text":"","Line 289 URL":"","Line 290 Text":"","Line 290 URL":"","Line 291 Text":"","Line 291 URL":"","Line 292 Text":"","Line 292 URL":"","Line 293 Text":"","Line 293 URL":"","Line 294 Text":"","Line 294 URL":"","Line 295 Text":"","Line 295 URL":"","Line 296 Text":"","Line 296 URL":"","Line 297 Text":"","Line 297 URL":"","Line 298 Text":"","Line 298 URL":"","Line 299 Text":"","Line 299 URL":"","Line 300 Text":"","Line 300 URL":""}},
{"name":"Kath_GameOver","status":true,"description":"Change what happens when the party dies or Game Over is called.","parameters":{"Party Death Common Event ID":"1","Show Game Over Scene":"true","Reload Last Save":"false","After Game Over Common Event ID":""}},
{"name":"HIME_ActorBattleCommands","status":true,"description":"v1.6 - Provides you with tools to customize and manage actor\r\nbattle commands.","parameters":{}},
{"name":"HIME_BattleCommandUseSkill","status":true,"description":"v1.3 - Allows you to use a skill directly from the command menu\r\nrather than going to the skill menu.","parameters":{}},
{"name":"GameHam","status":true,"description":"","parameters":{}}
];
