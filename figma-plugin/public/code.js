"use strict";figma.showUI(__html__,{width:300,height:380});let l=null,e=null,n=null,i=null;function o(o){o[0]&&o[0].fills.length?(l=t(o[0]),n=o[0].name,1===o.length?function l(n){if("parent"in n){let o=n.parent;i=o.name,"fills"in o&&o.fills.length?e=o.fills[0].color:"backgrounds"in o&&o.backgrounds.length?e=o.backgrounds[0].color:l(o)}}(o[0]):(e=t(o[1]),i=o[1].name),figma.ui.postMessage({value:{foreground:l,background:e,foregroundName:n,backgroundName:i}})):figma.notify("Select one or two objects with solid or linear gradient fill")}function t(l){if(l&&l.fills.length)return"SOLID"===l.fills[0].type?l.fills[0].color:"GRADIENT_LINEAR"===l.fills[0].type?l.fills[0].gradientStops[0].color:void figma.notify("Try selecting a different layer");figma.notify("Select one or two objects with solid or linear gradient fill")}figma.on("run",()=>{o(figma.currentPage.selection)}),figma.on("selectionchange",()=>{o(figma.currentPage.selection)});
