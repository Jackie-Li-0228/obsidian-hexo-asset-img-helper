
---

[![GitHub latest release](https://img.shields.io/github/v/release/Jackie-Li-0228/obsidian-hexo-asset-img-helper?style=for-the-badge&sort=semver)](https://github.com/Jackie-Li-0228/obsidian-smart-completion-plugin-for-hexo/releases/latest)
[![GitHub All Releases](https://img.shields.io/github/downloads/Jackie-Li-0228/obsidian-hexo-asset-img-helper/total?style=for-the-badge)](https://github.com/Jackie-Li-0228/obsidian-smart-completion-plugin-for-hexo/releases)

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Jackie-Li-0228/obsidian-hexo-asset-img-helper/graphs/commit-activity)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Jackie-Li-0228/obsidian-smart-completion-plugin-for-hexo/blob/master/LICENSE)


# Obsidian Smart Completion Plugin For Hexo

## Introduction

This is a tool to help you make it easier to complement hexo blog posts with the `<!--more-->` identifier and the `<% asset_img sample.jpg %>` format string specified by [hexo](https://hexo.io/zh-cn/docs/asset-folders).

It automatically suggests completions for specific patterns like `<%` and `<!` in markdown files. After detecting the identifier at the cursor, the plugin pops up `<!--more-->` or `<% asset_img sample.jpg %>` format autocomplete suggestions.

_**This plugin does not provide any API keys.**_

## Usage Instructions and Installation

### Usage

Once installed, the plugin works out of the box with the following features:

**Auto-Completion for Patterns**

   When you type `<!`, the plugin automatically pops up the `<!--more-->` complementary suggestions; when you type `<%`, the plugin will automatically search the folder in the current directory with the same name as this Markdown file (If your vault root directory is *_posts*) or search *the user given directory* under *source* folder (If your vault root directory is *source*) and pop up a list of complementary suggestions in `<% asset_img sample.jpg%>` format.


> [!Important]
>Hexo naturally supports two types of resource management: global resource folder and article resource folder. See [documentation](https://hexo.io/zh-cn/docs/asset-folders) for more details.
>**The plugin only supports these two management methods:**
>
>1. When you use the global resource folder method (i.e. your images are all placed in a unified folder. For example named *img*, and your *_posts* folder is in the same path as the *img* folder, and your Vault root directory is *source*), the following structure directory tree is formed:
>
>**Vault root:*source***
>
>```
>source
>├── _data
>├── **_posts**
>├── about
>├── categories
>├── files
>├── **img**
>├── schedule
>└── tags
>└── tags
>```
>
>**At this point, you need to enter the name of the resource folder under the *source* directory in the plugin's settings panel (in this case, *img*)
>
>2. When you use the article resource folder method (i.e. your article image folder is in the same directory as the article, and the image folder name is the same as the article), the following structure directory tree is formed:
>
>**Vault root:*_posts***
>
>```
>_posts
>├── 示例文章
>│ ├── Image 1.png
>│ └── Picture 2.png
>├── 示例文章.md
>├── Sample Markdown
>│ ├── Pic1.jpg
>│ └── Pic2.jpg
>└── Sample Markdown.md
>```
>
>At this point there is no need for any extra settings, the plugin will **automatically detect the folder with the same name as the current Markdown file** and give you suggestions for completing it.

### Installation

To get started with the **Obsidian Smart Completion Plugin For Hexo**, there are two ways you can either search for and install the plugin directly in Obsidian's Community Plugin Marketplace (it's not officially on the shelves yet), or you can install it manually.

#### Install via Obsidian Plugin Marketplace

In Obsidian, navigate to `Settings > Community plugins > Browse` and search for the **Smart Completion Plugin For Hexo**. Click the Install button to add the plugin to your vault.

#### Manual Installation

Just download the obsidian-smart-completion-plugin-for-hexo-x.x.x.zip from Release and unzip it in the `<vault>/.obsidian/plugins` directory.

### Configuration

You need to configure the plugin if you are using the global resource folder method (Using the *source* folder as the Vault root directory):

- **Image Directory Name under *source* folder**: Specify a custom directory for file path suggestions.(Only type THE NAME e.g: *img*,and Only usable if your vault root directory is *source*)

### Source Code Overview

- **`main.ts`**: Entry point for the plugin, where the core logic and class is implemented.

## Contributing

Contributions are welcome! 

## License

This project is licensed under the MIT License - see the [LICENSE]([LICENSE](https://github.com/Jackie-Li-0228/obsidian-smart-completion-plugin-for-hexo/blob/master/LICENSE)) file for details.

---
