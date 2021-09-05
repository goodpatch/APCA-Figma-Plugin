'use strict';

// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 300, height: 380 });
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
let foreground = null;
let background = null;
let foregroundName = null;
let backgroundName = null;
figma.on("run", () => {
    CheckColors(figma.currentPage.selection);
});
figma.on("selectionchange", () => {
    CheckColors(figma.currentPage.selection);
});
function CheckColors(selection) {
    if (!selection[0] || !selection[0].fills.length) {
        figma.notify("Select one or two objects with solid or linear gradient fill");
        return;
    }
    foreground = CheckColor(selection[0]);
    foregroundName = selection[0].name;
    if (selection.length === 1) {
        CheckParent(selection[0]);
    }
    else {
        background = CheckColor(selection[1]);
        backgroundName = selection[1].name;
    }
    figma.ui.postMessage({
        value: {
            foreground: foreground,
            background: background,
            foregroundName: foregroundName,
            backgroundName: backgroundName
        }
    });
}
function CheckColor(element) {
    if (!element || !element.fills.length) {
        figma.notify("Select one or two objects with solid or linear gradient fill");
        return;
    }
    if (element.fills[0].type === "SOLID") {
        return element.fills[0].color;
    }
    else if (element.fills[0].type === "GRADIENT_LINEAR") {
        return element.fills[0].gradientStops[0].color;
    }
    else {
        figma.notify("Try selecting a different layer");
        return;
    }
}
function CheckParent(element) {
    if ("parent" in element) {
        let parent = element.parent;
        backgroundName = parent.name;
        if ("fills" in parent && parent.fills.length) {
            background = parent.fills[0].color;
        }
        else if ("backgrounds" in parent && parent.backgrounds.length) {
            background = parent.backgrounds[0].color;
        }
        else {
            CheckParent(parent);
        }
    }
}
