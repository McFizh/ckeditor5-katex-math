import './index.html';
import EditorDemo from './EditorDemo.js';
import 'katex/dist/katex.css';

var editor = new EditorDemo();
editor.createEditor(document.getElementById('ckeditor'));

document.getElementById('getDataBtn').onclick=() => {
  const el = document.getElementById('editorContent');
  el.innerHTML = editor.getData();
};
