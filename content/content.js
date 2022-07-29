function getTrans(request, sender, sendResponse) {
	
	if (document.getElementById('deepl-tool-box') == null) {
		var el = document.createElement('div');

		el.setAttribute('id', 'deepl-tool-box');
		el.style.width = '20%';
		el.style.height = 'auto';
		el.style['z-index'] = 1000;
		el.style.position = 'fixed';
		el.style.right = 0;
		el.style.bottom = 0;
		el.style.backgroundColor = 'white';
		el.style['box-shadow'] = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
		el.style['border-radius'] = '0.75rem';


		var lang = document.createElement('p');
		lang.setAttribute('id', 'deepl-tool-lang');
		lang.style.margin = '1rem 1rem 1rem 1rem';
		var lang_desc = document.createElement('span');
		lang_desc.innerText = browser.i18n.getMessage('contentLang');
		lang.appendChild(lang_desc);
		var lang_cont = document.createElement('span');
		lang_cont.setAttribute('id', 'deepl-tool-lang-cont');
		lang.appendChild(lang_cont);
		el.appendChild(lang);

		var close_btn = document.createElement('button');
		var btn_img = document.createElement('img');
		btn_img.src = browser.runtime.getURL("img/close-red-icon.svg");
		btn_img.width = 20;
		btn_img.style.display = 'flex';
		close_btn.appendChild(btn_img);
		close_btn.setAttribute('type', 'button');
		close_btn.style.position = 'absolute';
		close_btn.style.right = 0;
		close_btn.style.top = 0;
		close_btn.style.backgroundColor = 'rgba(0,0,0,0)';
		close_btn.style.border = 'none';
		close_btn.addEventListener('click', () => {
			el.style.display = 'none';
		});
		el.appendChild(close_btn);

		var textbox = document.createElement('p');
		textbox.setAttribute('id', 'deepl-tool-text');
		textbox.style.margin = '1rem 1rem 1rem 1rem';
		var text_desc = document.createElement('span');
		text_desc.innerText = browser.i18n.getMessage('contentText');
		textbox.appendChild(text_desc);
		var text_cont = document.createElement('span');
		text_cont.setAttribute('id', 'deepl-tool-text-cont');
		textbox.appendChild(text_cont);
		el.appendChild(textbox);

		document.body.appendChild(el);
	}
	
	console.log(`${request.text}`);
	if (request.text.length) {
		document.getElementById('deepl-tool-lang-cont').innerText = request.dl;
		document.getElementById('deepl-tool-text-cont').innerText = request.text;
	} else {
		document.getElementById('deepl-tool-lang-cont').innerText = "";
		document.getElementById('deepl-tool-text-cont').innerText = browser.i18n.getMessage('apiError');
	}
	document.getElementById('deepl-tool-box').style.display = 'block';
	sendResponse({response: "OK"});
}
console.log('content active');



/*browser.runtime.onMessage.addListener((request, sender, sendResponse) {
	console.log(`${request.text}`);
	return Promise.resolve({response: "OK"});
});*/


//el.style.display = none;
browser.runtime.onMessage.addListener(getTrans);

