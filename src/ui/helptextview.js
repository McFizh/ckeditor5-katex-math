import View from '@ckeditor/ckeditor5-ui/src/view';

export default class HelpTextView extends View {
  constructor(locale, text, divClass) {
    super(locale);

    if(!divClass || divClass==='') {
      divClass='ck-kmath-textdiv';
    }

    this.setTemplate({
      tag: 'div',
      attributes: {
        class: [
          'ck',
          divClass,
        ],
      },
      children: [
        text
      ]
    });
  }
}