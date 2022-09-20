# DeepL Tool (Firefox Addon)
A Firefox addon using DeepL website to translate.

## Install
There are two ways to install this addon.
- Install it from product page in Firefox Browser Add-ons site. [Link](https://addons.mozilla.org/en-GB/firefox/addon/deepl-tool/)
- Use temporary installation ([official documention](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)):
  1. Download source code.
  2. Open `about:debugging` in Firerox.
  3. Go to `This Firefox` page and click `Load Temporary Add-on` button.
  4. Select any file under this repository.

## Usage 
- Use DeepL Website
	1. Enter text to input box:
		- Enter by keyboard.
		- Click 'From Clipboard' button to get text from clipboard.
		- Select text in webpage, right click the mouse to display context menu, click 'Send to DeepL Tool' to open popup and get selected text.
	2. Select source language and target language.
	3. Click 'Translate' button or press `Enter` (use `Shift` + `Enter` for newlines) to open DeepL web.
- Use DeepL API
	1. Config your DeepL auth key (free) and target language in the option page.
	2. Select text in webpage, right click the mouse to display context menu, click 'DeepL API Inpage Translate', and the result will display in right bottom of the page.

## Permisions Needed
- Active Tab
- Clipboard Read
- Context Menu
- Storage

## Reference
- Close button image from [Uxwing](https://uxwing.com/close-red-icon/)
- [DeepL API Doc](https://www.deepl.com/docs-api)
- Mozilla MDN web docs [Browser Extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- Styling using [Bootstrap](https://getbootstrap.com/).