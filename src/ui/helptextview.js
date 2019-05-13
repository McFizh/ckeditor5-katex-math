import View from '@ckeditor/ckeditor5-ui/src/view';

export default class HelpTextView extends View {
  constructor(locale, text) {
    super(locale);

    this.setTemplate({
      tag: 'div',
      attributes: {
        class: [
          'ck',
          'ck-kmath-textdiv',
        ],
      },
      children: [
        text
      ]
    });
  }
}