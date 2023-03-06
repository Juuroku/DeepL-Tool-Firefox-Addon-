# DeepL Tool (Firefox Add-on)
A Firefox add-on using DeepL website to translate.  
  
[![CodeQL](https://github.com/Juuroku/DeepL-Tool-Firefox-Addon-/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Juuroku/DeepL-Tool-Firefox-Addon-/actions/workflows/github-code-scanning/codeql)

<a href="https://addons.mozilla.org/en-GB/firefox/addon/deepl-tool/" target="_blank">
<picture>
	<img alt="Get the Add-on" src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg" width="149"/>
</picture>
</a>

## Installation
There are two ways to install this add-on.
- Install it from the product page on the Firefox Browser Add-ons site. [Link](https://addons.mozilla.org/en-GB/firefox/addon/deepl-tool/)
- Use temporary installation ([official documention](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)):
  1. Download the source code.
  2. Open `about:debugging` in Firefox.
  3. Go to `This Firefox` and click the `Load Temporary Add-on` button.
  4. Select any file from this repository. ([manifest.json](manifest.json) is good)
  
### Updating the Add-on
- Install from product page
	- If the add-on is set to update automatically, it should update automatically. If not, you can manually check or update by going to `about:addons`, clicking the gear icon in the upper right corner, and click on `Check for Updates`.
	- If you prefer to update manually:
		1. Open `about:addons`
		2. Click on the add-on.
		3. If `Automatic Updates` is turned off, there should be a `Check for Updates` button. Click on it.
	- For more information, see [Mozilla's official support](https://support.mozilla.org/en-US/kb/how-update-add-ons).
- Install from the files
	1. Download the source code of the version you want to update. You can download specific version from the `Releases` section in the right of the reposiry page.
	2. Open `about:debugging` page.
	3. Go to `This Firefox` and find the add-on.
	4. If you put the updated files in the original directory, click `refresh`. Alternatively, you can delete the old version and reinstall.

## Usage 
- Use DeepL Website
	1. Use POPUP
		1. Enter text to input box:
			- Enter by keyboard.
			- Click 'From Clipboard' button to get text from clipboard.
			- Select text on the webpage, right-click the mouse to display context menu, click 'Send to DeepL Tool' to open popup and get selected text.
		2. Select source language and target language.
		3. Click 'Translate' button or press `Enter` (use `Shift` + `Enter` for newlines) to open DeepL web.
	2. Directly open DeepL site
		1. Select text on the webpage.
		2. Right-click the mouse to display context menu, click 'Activate DeepL Tab with Selected Text'.
		3. The add-on will open a new tab with DeepL site. The target language is set by default to your browser's UI language, you can change it in the options page.
- Use DeepL API
	1. Configure your DeepL auth key (free) and the target language in the options page.
	2. Select text on the webpage, right-click the mouse to display context menu, click 'DeepL API Inpage Translate'. The translation result will be displayed in the bottom right corner of the page.

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