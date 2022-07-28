function send(tab, str) {
	let s = browser.runtime.sendMessage({input: str});
	s.then((msg) => {
		console.log(`Got Res: ${msg.response}`);
	}, (err) => {
		console.log(`Error: ${err}`);
	});
}

var str = null;

console.log(browser.i18n.getUILanguage());

browser.contextMenus.create({
	id: "deepl-tool",
	title: browser.i18n.getMessage("contextMenu"),
	contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
	switch (info.menuItemId) {
		case 'deepl-tool':
			// get text from selection
			str = info.selectionText;
			
			// open popup
			browser.browserAction.openPopup();
			break;
	}
});

browser.runtime.onConnect.addListener((p) => {
	// connected by popup
	if (str != null) {
		// send input to popup
		p.postMessage({input: str});
	} else {
		console.log("No Input");
	}
	
	// delete sent input
	str = null;
});