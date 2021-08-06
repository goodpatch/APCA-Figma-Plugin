'use strict';

// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 256, height: 256 });
let background = null;
figma.on("selectionchange", () => {
    let selection = figma.currentPage.selection[0];
    if (!selection) {
        return;
    }
    if ("parent" in selection) {
        let parent = figma.currentPage.selection[0].parent;
        if ("fills" in parent) {
            background = figma.currentPage.selection[0].parent.fills[0].color;
        }
        else if ("backgrounds" in parent) {
            background = figma.currentPage.selection[0].parent.backgrounds[0].color;
        }
    }
    figma.ui.postMessage({
        value: {
            foreground: figma.currentPage.selection[0].fills[0].color,
            background: background
        }
    });
});
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'create-shapes') ;
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
