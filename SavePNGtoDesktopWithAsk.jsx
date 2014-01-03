﻿// SavePNGtoDesktopWithAsk.jsx// Save avtive document as PNG to desktop with asking.// Please set shortcut key "SHIFT + CTRL + ALT + COMMAND + S" to this script. // Ray    RayPS.com// 2013-12-19if (app.documents.length > 0){    var selectedLayerCount = getSelectedLayersCount()    if (selectedLayerCount > 0) {        var defaultText = app.activeDocument.activeLayer.name    } else {        var defaultText = getFileName(app.activeDocument.name)    }    var fileName = prompt ("Saving [" + app.activeDocument.name + "] As PNG To Desktop, Please Input The File Name:", defaultText, "Save PNG for Web")    if (fileName) {savePNG(fileName)}    app.beep()}function savePNG(fn) {	try {		var targetFile = File(Folder.desktop + "/" + fn + ".png");		if (!/\.(png)$/.test(targetFile.name)) {			if (/\.(png)$/i.test(targetFile.name)) {				targetFile = File(targetFile.fullName.slice(0, targetFile.fullName.length - 3) + 'png')			} else {				targetFile = File(targetFile.fullName + '.png');			}		}		var png24Options = new ExportOptionsSaveForWeb();		png24Options.format = SaveDocumentType.PNG;		png24Options.PNG8 = false;		png24Options.transparency = true;		png24Options.interlaced = false;		png24Options.includeProfile = false;		activeDocument.info = null;		activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);	} catch (e) {		alert(e.message);	}}function getFileName(fullFileName) {	var fileNameWithoutExt = /.*(?=\.)/.exec(fullFileName)	if (!fileNameWithoutExt) {		fileNameWithoutExt = fullFileName	}	return fileNameWithoutExt}function getSelectedLayersCount() {    function checkVisability() {        var desc = new ActionDescriptor();        var list = new ActionList();        var ref = new ActionReference();        ref.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));        list.putReference(ref);        desc.putList(charIDToTypeID('null'), list);        executeAction(charIDToTypeID('Shw '), desc, DialogModes.NO);    }    var res = new Number();    var ref = new ActionReference();    ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));    var desc = executeActionGet(ref);    if (desc.hasKey(stringIDToTypeID('targetLayers'))) {        desc = desc.getList(stringIDToTypeID('targetLayers'));        res = desc.count    } else {        var vis = app.activeDocument.activeLayer.visible;        if (vis == true) app.activeDocument.activeLayer.visible = false;        checkVisability();        if (app.activeDocument.activeLayer.visible == true) {            res = 1;        } else {            res = 0;        }        app.activeDocument.activeLayer.visible = vis;    }    return res;}