function saveOptions(e) {
	var sel = document.getElementById("target-lang-api");
	var sel2 = document.getElementById("target-lang-dir");
	let deepltool = {
		authkey: document.getElementById('auth-key').value,
		target_api: sel.options[sel.selectedIndex].value,
		target_dir: sel2.options[sel2.selectedIndex].value
	}
	browser.storage.local.set({deepltool})
		.then(() => console.log('Save Success'))
		.catch((e) => console.log(`Failed: ${e.message}`));
	e.preventDefault();
}

function readSavedOptions() {
	browser.storage.local.get('deepltool')
		.then((res) => {
			let key = res.deepltool.authkey;
			if (key !== undefined) document.getElementById("auth-key").value = key;
			
			let target_api = res.deepltool.target || res.deepltool.target_api;
			let target_dir = res.deepltool.target_dir;
			//let query = `option[value=${target_api}]`;
			//let query_dir = `option[value=${target_dir}]`;
			//console.log(query);
			if (target_api !== undefined) document.getElementById("target-lang-api").value = target_api;
			if (target_dir !== undefined) document.getElementById("target-lang-dir").value = target_dir;
		})
		.catch((e) => console.log(e.message));
}

function i18nConv(id, key, place) {
	let desc = browser.i18n.getMessage(key);
	if (desc.length) {
		document.getElementById(id)[place] = desc;
	}
}

let opts = document.getElementsByTagName("option");

for (opt of opts) {
	let val = opt.value;
	let desc = browser.i18n.getMessage(val.toLowerCase());
	
	if (desc.length) {
		opt.text = `${desc} (${val.toUpperCase()})`;
	}
}
let obj = [
	['auth-key-label', 'authkeyDesc', 'innerText'],
	['auth-key', 'authkeyPlace', 'placeholder'],
	['target-lang-api-label', 'optionTargetAPI', 'innerText'],
	['target-lang-dir-label', 'optionTargetDir', 'innerText'],
	['sub', 'submit', 'innerText']
];

for (idx in obj) {
	arr = obj[idx];
	console.log(arr[0]);
	if (arr.length) i18nConv(arr[0], arr[1], arr[2]);
}

document.addEventListener('DOMContentLoaded', readSavedOptions);
document.getElementById("config-form").addEventListener('submit', saveOptions);