import * as vscode from 'vscode';
import { EditorProvider } from './editor';
import { TransformProvider } from './transform';

export function activate(context: vscode.ExtensionContext) {
  // Register our custom editor providers
  context.subscriptions.push(EditorProvider.register(context));
  context.subscriptions.push(TransformProvider.register());
}
