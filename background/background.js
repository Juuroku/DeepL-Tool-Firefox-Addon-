function errorHandle (e) {
	console.log(`Error: ${e.message}`);
}

function deeplPost (str) {
	let result = browser.i18n.getMessage('apiError');
	console.log('api');
	browser.storage.local.get('deepltool')
		.then((res) => {
			let key = res.deepltool.authkey;
			if (key == undefined || key.length == 0) {
				throw new Error(browser.i18n.getMessage("apiNoKey"));
			}
			
			let target = res.deepltool.target;
			if (target === undefined || target == "ui") target = browser.i18n.getUILanguage();
			
			var url = `https://api-free.deepl.com/v2/translate?${key}`;
	
			var params = `auth_key=${key}&text=${str}&target_lang=${target}`;
			

			var dl = "";
			var obj = null;
			
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					console.log(xhr.responseText);
					try {
						obj = JSON.parse(xhr.responseText);
						dl = obj['translations'][0]['detected_source_language'];
						result = obj['translations'][0]['text'];
						browser.tabs.query({active: true, currentWindow: true})
							.then((tabs) => {
								browser.tabs.sendMessage(tabs[0].id, {'dl': dl, 'text': result})
									.then((response) => {
										console.log(response);
									})
									.catch(errorHandle);
							});
					} catch (e) {
						result += `
						${e.message}`;
					}
				} else if (this.readyState === XMLHttpRequest.DONE) {
					console.log(this.status);
					switch (this.status) {
						case 403:
							browser.tabs.query({active: true, currentWindow: true})
								.then((tabs) => {
									browser.tabs.sendMessage(tabs[0].id, {'dl': "", 'text': browser.i18n.getMessage("apiKeyError")})
										.then((response) => {
											console.log(response);
										})
										.catch(errorHandle);
								});
							
							break;
						case 400:
						case 404:
						default:
							break;
					}
				}
			};
			xhr.send(params);
		})
		.catch((e) => {
			try {
				browser.tabs.query({active: true, currentWindow: true})
					.then((tabs) => {
						browser.tabs.sendMessage(tabs[0].id, {'dl': "", 'text': `${result} - ${e.message}`})
							.then((response) => {
								console.log(response);
							})
							.catch(errorHandle);
					});
			} catch (e) {
				result += `
				${e.message}`;
			}
		});
	
	return;
}

var str = null;
var apiRes = null;

console.log(browser.i18n.getUILanguage());

browser.contextMenus.create({
	id: "deepl-tool",
	title: browser.i18n.getMessage("contextMenu"),
	contexts: ["selection"]
});

browser.contextMenus.create({
	id: "deepl-api",
	title: browser.i18n.getMessage("contextMenu2"),
	contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
	// get text from selection
	str = info.selectionText;
	switch (info.menuItemId) {
		case 'deepl-tool':
			// open popup
			browser.browserAction.openPopup();
						
			break;
		case 'deepl-api':
		
			deeplPost(str);
			console.log('test');
			str = null;
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