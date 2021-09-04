// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 300, height: 300 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
let foreground = null;
let background = null;
let foregroundName = null;
let backgroundName = null;
figma.on("selectionchange", () => {
	let selection = figma.currentPage.selection;

	if (!selection[0] || !selection[0].fills.length) {
		return
	}

	foreground = CheckColor(selection[0]);
	foregroundName = selection[0].name;


	if (selection.length === 1) {
		CheckParent(selection[0])
	}
	else {
		background = CheckColor(selection[1])
		backgroundName = selection[1].name
	}

	figma.ui.postMessage({
		value: {
			foreground: foreground,
			background: background,
			foregroundName: foregroundName,
			backgroundName: backgroundName
		}
	})
})

function CheckColor(element) {
	if (!element || !element.fills.length) {
		return
	}

	if (element.fills[0].type === "SOLID") {
		return element.fills[0].color
	}
	else if (element.fills[0].type === "GRADIENT_LINEAR") {
		return element.fills[0].gradientStops[0].color
	}
	else {
		return
	}
}

function CheckParent(element) {
	if ("parent" in element) {
		let parent = element.parent
		backgroundName = parent.name
		if ("fills" in parent && parent.fills.length) {
			background = parent.fills[0].color
		}
		else if ("backgrounds" in parent && parent.backgrounds.length) {
			background = parent.backgrounds[0].color
		}
		else {
			CheckParent(parent);
		}

	}
}

figma.ui.onmessage = msg => {
	// One way of distinguishing between different types of messages sent from
	// your HTML page is to use an object with a "type" property like this.
	if (msg.type === 'create-shapes') {

	}

	// Make sure to close the plugin when you're done. Otherwise the plugin will
	// keep running, which shows the cancel button at the bottom of the screen.
	figma.closePlugin();
};
