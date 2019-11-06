import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';

import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

// Note, you should import plugin from the npm package, not with relative path
import KatexMathPlugin from '../../src/katexmath.js';

export default class InlineEditorDemo {
  constructor() {
    this.instance = null;
  }

  getData() {
    return this.instance.getData();
  }

  createEditor(el) {
    InlineEditor
      .create(el, {
        plugins: [
          BoldPlugin,
          EssentialsPlugin,
          ItalicPlugin,
          KatexMathPlugin,
          ParagraphPlugin
        ],
        toolbar: [
          'bold',
          'italic',
          'insertMath',
        ],
      })
      .then(editor => {
        this.instance = editor;
      });
  }
}
