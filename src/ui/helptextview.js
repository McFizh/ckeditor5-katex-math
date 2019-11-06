import View from '@ckeditor/ckeditor5-ui/src/view';

export default class HelpTextView extends View {
  constructor(locale, text, divClass) {
    super(locale);

    this.setTemplate({
      tag: 'div',
      attributes: {
        class: [
          'ck',
          !divClass ? 'ck-kmath-textdiv' : divClass,
        ],
      },
      children: [
        text
      ]
    });
  }
}