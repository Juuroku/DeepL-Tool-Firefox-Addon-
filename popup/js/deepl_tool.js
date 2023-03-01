function translateSubmit() {
	let last = document.getElementById("last-error");
	if (last != null) {
		last.parentNode.removeChild(last);
	}
	
	let str = document.getElementById("input-text").value;
	
	let sl_el = document.getElementById("source_lang");
	let sl = sl_el.options[sl_el.selectedIndex].value;
	
	let tl_el = document.getElementById("target_lang");
	let tl = tl_el.options[tl_el.selectedIndex].value;
	
	if (!str.length) {
		throw 'No Input';
	}
	
	let url = `https://www.deepl.com/translator#${sl}/${tl}/${encodeURIComponent(str).replaceAll("%2F", "\\%2F").replaceAll("%7C", "\\%7C").replaceAll("%5C", "%5C%5C")}`;
	let querying = browser.tabs.query({currentWindow: true, windowType: "normal", active: true});
	
	let index = 0;
	let id = 0;
	
	querying.then((tabs) => {
		index = tabs[0].index;
		id = tabs[0].id;
		
		browser.tabs.create({
			url: url,
			active: true,
			index: index + 1,
			openerTabId: id
		});
	}, (reason) => {
		console.log(reason);
	});
}

function listenForClicks() {
	let btn = document.getElementById("translate");
	let clp_btn = document.getElementById("clip");
	
	btn.addEventListener("click", translateSubmit);
	
	clp_btn.removeAttribute("diabled");
	clp_btn.addEventListener("click", (e) => {
		navigator.clipboard.readText().then((clipText) => {
			document.getElementById("input-text").value += clipText;
		});
		console.log("copy");
	});
	
	navigator.permissions.query({name:'clipboard-read'})
		.then(function(result) {
			if (result.state === 'granted') {
				clp_btn.disabled = false;
			}
		})
		.catch((e) => {
			clp_btn.removeAttribute("diabled");
			clp_btn.disabled = false;
		});
	
	console.log('popup');
}

function handleContenx(request, sender, sendResponse) {
	let input = request.input;
	let cont = document.getElementById("input-text");
	
	console.log('handdle');
	
	cont.value += input;
	
	sendResponse({response: "OK"});
}

function reportExecuteScriptError(error) {
	let el = document.getElementById("error-content");
	let error_report = document.createElement("div");
	
	error_report.textContent = error.error;
	error_report.classList.add("mx-3");
	error_report.setAttribute("id", "last-error");
	
	el.appendChild(error_report);
	
	console.error(`Failed while executing add-on "Deepl Tool" : ${error.error}`);
}

function readSavedOptions() {
	browser.storage.local.get('deepltool_pop')
		.then((res) => {
			let tg = res.deepltool_pop.pop_tg;
			if (tg !== undefined) document.getElementById("target_lang").value = tg;
		})
		.catch((e) => console.log(e.message));
}

function saveOptions(e) {
	var sel = document.getElementById("target_lang");
	let deepltool_pop = {
		pop_tg: sel.options[sel.selectedIndex].value
	}
	browser.storage.local.set({deepltool_pop})
		.then(() => console.log('Save Success'))
		.catch((e) => console.log(`Failed: ${e.message}`));
	e.preventDefault();
}

function checkEnter(e) {
	var key = window.event.keyCode;
	
	if (key === 13 && !e.shiftKey) {
		e.preventDefault();
		translateSubmit();
	}
}

// Localization
let opts = document.getElementsByTagName("option");

for (opt of opts) {
	let val = opt.value;
	let desc = browser.i18n.getMessage(val.toLowerCase());
	
	if (desc.length) {
		opt.text = `${desc} (${val.toUpperCase()})`;
	}
}
let inst = browser.i18n.getMessage("inst");
if (inst.length) document.getElementById("inst").innerText = inst;

let clip_name = browser.i18n.getMessage("clip");
if (clip_name.length) document.getElementById("clip").innerText = clip_name;

let trans_name = browser.i18n.getMessage("translate");
if (trans_name.length) document.getElementById("translate").innerText = trans_name;

let sl_label = browser.i18n.getMessage("source");
if (sl_label.length) document.getElementById("sl-label").innerText = sl_label;
let tl_label = browser.i18n.getMessage("target");
if (tl_label.length) document.getElementById("tl-label").innerText = tl_label;

window.addEventListener('error', (e) => reportExecuteScriptError(e));
readSavedOptions();

document.getElementById("target_lang").addEventListener('change', saveOptions);
document.getElementById("input-text").addEventListener('keydown', checkEnter);
listenForClicks();

var port = browser.runtime.connect({name: "context"});

port.onMessage.addListener((msg) => {
	if (msg.input.length > 0) {
		document.getElementById("input-text").value += msg.input;
	}
});