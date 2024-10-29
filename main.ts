import { App, Editor, Plugin, PluginSettingTab, Setting ,TFile,TFolder} from 'obsidian';

interface SmartCompletionSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: SmartCompletionSettings = {
	mySetting: 'default'
}

export default class SmartCompletion extends Plugin {
	settings: SmartCompletionSettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SmartCompletionSettingTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
		this.registerEditorSuggest(new SmartCompletionSuggestion(this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
class SmartCompletionSettingTab extends PluginSettingTab {
	plugin: SmartCompletion;

	constructor(app: App, plugin: SmartCompletion) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Image Directory Name under \'source\' folder (Only type THE NAME e.g: image)')
			.setDesc('Specify the directory where your images are stored (Only usable if your vault root directory is \'source\')')
			.addText(text => text
				.setPlaceholder('Enter directory path')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}

import { EditorSuggest,EditorPosition,EditorSuggestContext,EditorSuggestTriggerInfo } from 'obsidian';
class SmartCompletionSuggestion extends EditorSuggest<string> {
	plugin: SmartCompletion;

	constructor	(plugin: SmartCompletion) {
		super(plugin.app);
		this.plugin = plugin;
	}

	getSuggestions(context: EditorSuggestContext): string[] {
		const suggestions:string[]=[];

		if (context.query.startsWith('<!')) {
			suggestions.push('<!--more-->');
		}
		else if (context.query.startsWith('<%')) {
			//在这里添加从文件夹中扫描并添加建议的逻辑
			const fileSuggestions = this.getFileSuggestions(context.file);
        	suggestions.push(...fileSuggestions);
		} 	

		return suggestions;		
	}

	renderSuggestion(suggestion: string, el: HTMLElement): void {
		el.createEl('div', {text: suggestion});
	}

	selectSuggestion(suggestion: string, evt: MouseEvent | KeyboardEvent): void {
		const context = this.context;
		if (context && context.editor) {
			const { editor } = context;
			const cursor = editor.getCursor();
			const line = editor.getLine(cursor.line);
	
			editor.replaceRange(suggestion, { line: cursor.line, ch: line.length-2 }, cursor);
		}
	}
	

	getFileSuggestions(currentFile: TFile): string[] {
		const suggestions: string[] = [];

		
	
		// 获取当前md文件的名称
		const fileNameWithoutExtension = currentFile.name.slice(0, -3);
	
		// // 获取用户在插件设置中提供的"_post-dir"参数值,如果没有设置则使用当前文件夹
		// const postDirSetting = 
		// //将路径结果删去前面的43个字符，并删去后面的14个字符
		// this.app.vault.adapter.getResourcePath('').slice(43,-14);
		
		// //console.log("postDirSetting:",postDirSetting);
		// //console.log("Root:",this.app.vault.adapter.getResourcePath('/'));

		// // 构造与当前文件同名的文件夹路径
		// const folderPath = `${postDirSetting}/${fileNameWithoutExtension}`;

		let folder;

		if (this.app.vault.getAbstractFileByPath(`_posts`) === null) {
			folder = this.app.vault.getAbstractFileByPath(fileNameWithoutExtension);	
		}
		else {
			folder = this.app.vault.getAbstractFileByPath(`${this.plugin.settings.mySetting}`);
		}

		//console.log("path:",`${this.plugin.settings.mySetting}`);
		//console.log("folder:",folder);
	
		if (folder && folder instanceof TFolder) {
			// 读取文件夹中的文件
			const files = folder.children;
			
			//console.log("files:",files);

			// 将文件名加入建议列表
			suggestions.push(...files.map(file => `<% asset_img ${file.name} %>`));
		}
	
		return suggestions;
	}
	
	
	
	onTrigger(cursor: EditorPosition, editor: Editor, file: TFile): EditorSuggestTriggerInfo | null {
		const line = editor.getLine(cursor.line);
		const sub = line.substring(0, cursor.ch);
		
		


		if (sub.endsWith("<!") || sub.endsWith("<%")) {
			//console.log("Triggered with sub:", sub);
			//console.log("Cursor position:", cursor);
			return {
				start: { line: cursor.line, ch: cursor.ch - 2 },
				end: cursor,
				query: sub.slice(-2)
			};
		}
		return null;
	}
}