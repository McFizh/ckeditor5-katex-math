import View from '@ckeditor/ckeditor5-ui/src/view';
import Katex from 'katex';

export default class TextareaView extends View {
  constructor(locale) {
    super(locale);

    const bind = this.bindTemplate;

    this.debounceTimer = null;

    this.set({
      tabindex: -1,
    });

    this.setTemplate({
      tag: 'textarea',
      attributes: {
        class: [
          'ck',
          'ck-kmath-textarea',
        ],
      },
      tabindex: bind.to('tabindex'),
      on: {
        keyup: bind.to('change'),
      }
    });

    this.on('change', e => {
      const value = e.source.element.value;
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.fire('texchanged',value);
      }, 300);
    });
  }

  focus() {
    this.element.focus();
  }

}