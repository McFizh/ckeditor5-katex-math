import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

// Note, you should import plugin from the npm package, not with relative path
import KatexMathPlugin from '../../src/katexmath.js';

class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  BoldPlugin,
  EssentialsPlugin,
  ItalicPlugin,
  KatexMathPlugin,
  ParagraphPlugin
];

ClassicEditor.defaultConfig = {
  toolbar: [
    'bold',
    'italic',
    'insertMath',
  ]
};

export default ClassicEditor;