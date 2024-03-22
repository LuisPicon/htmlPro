const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function htmlBasicFiles() {
  const activeTextEditor = vscode.window.activeTextEditor;
  if (!activeTextEditor) {
    vscode.window.showErrorMessage("No active text editor found.");
    return;
  }
  const htmlFilePath = activeTextEditor.document.uri.fsPath;
  const rootPath = path.dirname(htmlFilePath);
  const cssFileName = "style.css";
  const jsFileName = "script.js";
  const cssFilePath = path.join(rootPath, cssFileName);
  const jsFilePath = path.join(rootPath, jsFileName);
  if (!fs.existsSync(cssFilePath)) {
    fs.writeFileSync(cssFilePath, "");
  }
  if (!fs.existsSync(jsFilePath)) {
    fs.writeFileSync(jsFilePath, "");
  }
}

function htmlProFiles() {
  const activeTextEditor = vscode.window.activeTextEditor;
  if (!activeTextEditor) {
    vscode.window.showErrorMessage("No active text editor found.");
    return;
  }

  const htmlFilePath = activeTextEditor.document.uri.fsPath;
  const rootPath = path.dirname(htmlFilePath);

  const cssFolderPath = path.join(rootPath, "css");
  const scriptsFolderPath = path.join(rootPath, "scripts");
  const cssFilePath = path.join(cssFolderPath, "style.css");
  const jsFilePath = path.join(scriptsFolderPath, "main.js");

  if (!fs.existsSync(cssFolderPath)) {
    fs.mkdirSync(cssFolderPath);
  }

  if (!fs.existsSync(scriptsFolderPath)) {
    fs.mkdirSync(scriptsFolderPath);
  }
  if (!fs.existsSync(cssFilePath)) {
    fs.writeFileSync(cssFilePath, "");
  }
  if (!fs.existsSync(jsFilePath)) {
    fs.writeFileSync(jsFilePath, "");
  }
}
function activate() {
  vscode.workspace.onDidChangeTextDocument((event) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    const basicFiles = "<h1 data-basic>";
    const proFiles = "<h1 data-pro>";

    const text = event.contentChanges[0].text;

    if (text.includes(basicFiles)) {
      htmlBasicFiles();
    } else if (text.includes(proFiles)) {
      htmlProFiles();
    }
  });
}

module.exports = {
  activate,
};
