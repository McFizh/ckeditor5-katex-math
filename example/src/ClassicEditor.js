import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import KatexMathPlugin from '../../src/katexmath.js';

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

export default class ClassicEditor extends ClassicEditorBase {}
