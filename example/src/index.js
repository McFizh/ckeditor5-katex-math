import './index.html';
import EditorDemo from './EditorDemo.js';
import 'katex/dist/katex.css';
import Katex from 'katex';

// Create editor instance
var editor = new EditorDemo();
editor.createEditor(document.getElementById('ckeditor'));

// Callback for getdata button (which also renders katex math equations)
document.getElementById('getDataBtn').onclick=() => {
  const el = document.getElementById('editorContent');
  el.innerHTML = editor.getData();

  const texElements = el.querySelectorAll('span.math-tex');
  texElements.forEach( tel => {
    Katex.render( tel.innerHTML, tel );
  });

};
