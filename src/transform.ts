import * as vscode from 'vscode';
import * as mammoth from 'mammoth';
import jsbeautify from 'js-beautify';
import { convertToHtml } from './utils';

export class TransformProvider {
  public static register(): vscode.Disposable {
    return vscode.commands.registerCommand(TransformProvider.viewType, async (uri: vscode.Uri) => {
      vscode.window.setStatusBarMessage('Converting...');
      
      let imageIndex = 0;
      const filePath = uri.path.replace(/\.docx$/, '');

      const html: string = await convertToHtml(uri, {
        convertImage: mammoth.images.imgElement(function (image) {
          const imageType = image.contentType.replace('image/', '');
          return image.read().then(function (imageBuffer) {
            imageIndex += 1;
            vscode.workspace.fs.writeFile(
              vscode.Uri.file(`${filePath}/${imageIndex}.${imageType}`),
              imageBuffer
            );
            return { src: `${imageIndex}.${imageType}` };
          });
        })
      });

      const fileUri = vscode.Uri.file(`${filePath}.html`);
      
      vscode.workspace.fs.writeFile(
        fileUri,
        Buffer.from(jsbeautify.html(html))
      );

      vscode.window.setStatusBarMessage('');
      vscode.window.setStatusBarMessage('Conversion succeeded!', 2000);
    });
  }

  private static readonly viewType = 'mammoth.transform';
}
