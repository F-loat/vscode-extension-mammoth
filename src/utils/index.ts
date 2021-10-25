import * as vscode from 'vscode';
import * as mammoth from 'mammoth';

export const convertToHtml = async (uri: vscode.Uri, options?: any) => {
  const buffer = await vscode.workspace.fs.readFile(uri);
  return mammoth
    .convertToHtml({ buffer: buffer as Buffer }, options)
    .then((result: any) => result.value);
};
