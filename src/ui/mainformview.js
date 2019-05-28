import Katex from 'katex';

import View from '@ckeditor/ckeditor5-ui/src/view';
import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import KeystrokeHandler from '@ckeditor/ckeditor5-utils/src/keystrokehandler';
import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';
import FocusCycler from '@ckeditor/ckeditor5-ui/src/focuscycler';

import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/check.svg';
import cancelIcon from '@ckeditor/ckeditor5-core/theme/icons/cancel.svg';

import submitHandler from '@ckeditor/ckeditor5-ui/src/bindings/submithandler';

import TextareaView from './textareaview';
import HelpTextView from './helptextview';

export default class MainFormView extends View {
  constructor(locale) {
    super(locale);

    // Create key event & focus trackers
    this.createKeyAndFocusTrackers();

    // Create help texts
    const textView1 = new HelpTextView(locale, 'Insert tex equation:');
    const textView2 = new HelpTextView(locale, 'Equation preview:');
    this.renderView = new HelpTextView(locale, '', 'ck-kmath-preview');

    //
    this.set({
      texEq: ''
    });

    // Create buttons & select element
    const children = [
      textView1,
      ...this.createUiElements(locale),
      textView2,
      this.renderView
    ];

    // Add ui elements to template
    this.setTemplate({
      tag: 'form',
      attributes: {
        class: [
          'ck',
          'ck-kmath-form',
        ],
      },
      children,
    });

  }

  render() {
    super.render();

    // Prevent default form submit event & trigger custom 'submit'
    submitHandler({
      view: this,
    });

    // Register form elements to focusable elements
    const childViews = [
      this.mathTextarea,
      this.saveBtn,
      this.cancelBtn,
    ];

    childViews.forEach(v => {
      this.focusables.add(v);
      this.focusTracker.add(v.element);
    });

    // Listen to keypresses inside form element
    this.keystrokes.listenTo(this.element);
  }

  focus() {
    this.focusCycler.focusFirst();
  }

  createKeyAndFocusTrackers() {
    this.focusTracker = new FocusTracker();
    this.keystrokes = new KeystrokeHandler();
    this.focusables = new ViewCollection();

    this.focusCycler = new FocusCycler({
      focusables: this.focusables,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        focusPrevious: 'shift + tab',
        focusNext: 'tab'
      }
    });
  }

  createUiElements(locale) {
    // Create save & cancel buttons
    this.saveBtn = this.createButton('Add', checkIcon, 'ck-button-save', null);
    this.saveBtn.type = 'submit';
    this.saveBtn.isEnabled = false;
    this.cancelBtn = this.createButton('Cancel', cancelIcon, 'ck-button-cancel', 'cancel');

    // Create textarea for equation
    this.mathTextarea = new TextareaView(locale);
    this.mathTextarea.on('texchanged', (e, data) => {
      this.saveBtn.isEnabled = data !== '';
      this.texEq = data;
      Katex.render(data, this.renderView.element);
    });


    // Return created elements
    return [
      this.mathTextarea,
      this.saveBtn,
      this.cancelBtn,
    ];
  }

  createButton(label, icon, className, eventName) {
    const button = new ButtonView(this.locale);
    button.set({ label, icon, tooltip: true });
    button.extendTemplate({ attributes: { class: className } });
    if (eventName) {
      button.delegate('execute').to(this, eventName);
    }
    return button;
  }
}