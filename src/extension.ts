import * as vscode from 'vscode';
import fs = require('fs');
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('flixelprojectcreator.newProject', () => {
		// TODO: The user should be prompted if they don't have flixel-tools or flixel-templates installed.
		let projectLocation:string;
		let folderName:string;

		let folders = vscode.workspace.workspaceFolders;
		if (folders != undefined)
		{
			projectLocation = folders[0].uri.path;
			folderName = folders[0].name;

			exec(`cd ${projectLocation} && cd .. && yes y | haxelib run flixel-tools tpl -n "${folderName}" -ide none && haxelib run flixel-tools configure ${projectLocation} -ide vscode`, (error, _, stderr) => {
				if (error) {
					vscode.window.showErrorMessage(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					vscode.window.showErrorMessage(`stderr: ${stderr}`);
					return;
				}
				vscode.window.showInformationMessage('Project created successfully!');
			});
		}
		else
			vscode.window.showErrorMessage('Please open a folder for the project files to be created in.');
	});

	context.subscriptions.push(disposable);
}
