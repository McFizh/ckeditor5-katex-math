import "./index.html";
import EditorDemo from './EditorDemo.js';

var editor = new EditorDemo();
editor.createEditor(document.getElementById('ckeditor'));

document.getElementById('getDataBtn').onclick=() => {
  const el = document.getElementById('editorContent');
  el.innerHTML = editor.getData();
}