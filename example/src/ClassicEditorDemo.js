import ClassicEditor from './ClassicEditor';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

export default class ClassicEditorDemo {
  constructor() {
    this.instance = null;
  }

  getData() {
    return this.instance.getData();
  }

  createEditor(el) {
    ClassicEditor
      .create(el, {
      })
      .then(editor => {
        CKEditorInspector.attach({editor: editor});
        this.instance = editor;
      });
  }
}
