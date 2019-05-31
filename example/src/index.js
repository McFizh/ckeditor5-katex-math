import './index.html';
import ClassicEditorDemo from './ClassicEditorDemo.js';
import InlineEditorDemo from './InlineEditorDemo.js';
import 'katex/dist/katex.css';
import Katex from 'katex';

// Create editor instances (classic & inline)
var classicEditor = new ClassicEditorDemo();
classicEditor.createEditor(document.getElementById('ckeditor-classic'));

var inlineEditor = new InlineEditorDemo();
inlineEditor.createEditor(document.getElementById('ckeditor-inline'));

// Callback for getdata button (which also renders katex math equations)
document.getElementById('getDataBtn').onclick=() => {
  const el = document.getElementById('editorContent');
  el.innerHTML = classicEditor.getData();

  const texElements = el.querySelectorAll('span.math-tex');
  texElements.forEach( tel => {
    Katex.render( tel.innerHTML, tel );
  });

};
