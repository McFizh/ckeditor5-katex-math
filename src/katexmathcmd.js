import Command from '@ckeditor/ckeditor5-core/src/command';

export default class insertMathCommand extends Command {
  constructor(editor) {
    super(editor);
    this.editor = editor;
  }

  execute(data) {
    const model = this.editor.model;
    const selection = model.document.selection;

    model.change( writer => {
      const el = writer.createElement('mathtex');
      writer.insertText(data, el);
      writer.insert( el ,selection.getFirstPosition() );
    });
  }
}