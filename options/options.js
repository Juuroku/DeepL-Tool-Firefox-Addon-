function saveOptions(e) {
	var sel = document.getElementById("target-lang");
	let deepltool = {
		authkey: document.getElementById('auth-key').value,
		target: sel.options[sel.selectedIndex].value
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
			
			let target = res.deepltool.target;
			let query = `option[value=${target}]`;
			console.log(query);
			if (target !== undefined) document.querySelector(query).selected = true;
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
	['target-lang-label', 'target', 'innerText'],
	['sub', 'submit', 'innerText']
];

for (idx in obj) {
	arr = obj[idx];
	console.log(arr[0]);
	if (arr.length) i18nConv(arr[0], arr[1], arr[2]);
}

document.addEventListener('DOMContentLoaded', readSavedOptions);
document.getElementById("config-form").addEventListener('submit', saveOptions);