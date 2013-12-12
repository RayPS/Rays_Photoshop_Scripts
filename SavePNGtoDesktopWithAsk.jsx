﻿// SavePNGtoDesktopWithAsk.jsx// Save avtive document as PNG to desktop with asking.// Please set shortcut key "SHIFT + CTRL + ALT + COMMAND + S" to this script. // Ray    RayPS.com// 2013-12-13var doc = app.activeDocumentvar docName = doc.namevar fileName = prompt ("Save PNG to Desktop, File Name:", docName, "File Name")savePNG(fileName)function savePNG(fn) {	try {		var targetFile = File(Folder.desktop + "/" + fn + ".png");		if (!/\.(png)$/.test(targetFile.name)) {			if (/\.(png)$/i.test(targetFile.name)) {				targetFile = File(targetFile.fullName.slice(0, targetFile.fullName.length - 3) + 'png')			} else {				targetFile = File(targetFile.fullName + '.png');			}		}		var png24Options = new ExportOptionsSaveForWeb();		png24Options.format = SaveDocumentType.PNG;		png24Options.PNG8 = false;		png24Options.transparency = true;		png24Options.interlaced = false;		png24Options.includeProfile = false;		activeDocument.info = null;		activeDocument.exportDocument(targetFile, ExportType.SAVEFORWEB, png24Options);	} catch (e) {		alert(e.message);	}}