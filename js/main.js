//=============================================================================
// main.js
//=============================================================================

PluginManager.setup($plugins);

window.onload = function() {
    SceneManager.run(Scene_Boot);
};
1 + Math.round(Math.min(2,Math.random()*$gameVariables.value(1)/100))