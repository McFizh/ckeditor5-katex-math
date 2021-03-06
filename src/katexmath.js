import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ContextualBalloon from '@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon';

import clickOutsideHandler from '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler';

import pluginIcon from '../theme/icons/icon.svg';
import './katexmath.css';

import MainFormView from './ui/mainformview';
import insertMathCommand from './katexmathcmd';

export default class KatexMath extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }

  static get pluginName() {
    return 'katex-math';
  }

  init() {
    const editor = this.editor;

    // Create button for toolbar & register schema
    this.createButton();
    this.registerSchema(editor);

    // Create UI
    this.formView = this.createPluginUiForm(editor);
    this.balloon = editor.plugins.get(ContextualBalloon);

    // Register UI events
    this.registerEventHandlers(editor);

    // Register math command
    editor.commands.add('insertmath', new insertMathCommand(editor));
  }

  registerSchema(editor) {
    // Register: <span class='math-tex'></span> element for ckeditor model
    editor.model.schema.register('mathtex', {
      allowWhere: '$text',
      allowContentOf: '$block',
      isLimit: true,
    });

    editor.conversion.elementToElement({
      model: 'mathtex',
      view: {
        name: 'span',
        classes: 'math-tex'
      }
    });
  }

  registerEventHandlers(editor) {
    // Remove UI panel (if esc pressed and ui doesn't have focus)
    editor.keystrokes.set('esc', (data, cancel) => {
      if (this.isPluginUiFormInPanel) {
        this.removePluginUiForm();
        cancel();
      }
    });

    // Remove UI panel, if user clicks ouside the plugin UI
    clickOutsideHandler({
      emitter: this.formView,
      activator: () => this.isPluginUiFormInPanel,
      contextElements: [this.balloon.view.element],
      callback: () => this.removePluginUiForm()
    });

    //
    editor.keystrokes.set('Tab', (data, cancel) => {
      if (this.isPluginUiFormInPanel) {
        this.formView.focus();
        cancel();
      }
    }, {
      priority: 'high',
    });
  }

  openPluginUiForm() {
    // Prevent adding ui twice
    if (this.isPluginUiFormInPanel) {
      return;
    }

    // Remove CK editor reset styles (they interfere with katex)
    const balloonHolder = this.balloon.view.element.parentNode;
    Array.prototype.forEach.call(balloonHolder.children, e => {
      if ( Array.prototype.find.call(e.classList, c => c ==='ck-toolbar-container' ) ) {
        e.classList.add('ck-reset_all');
      }
    });

    balloonHolder.classList.remove('ck-reset_all');

    // Create contextual balloon (ui for plugin)
    this.balloon.add({
      view: this.formView,
      position: this.getBalloonPositionData(),
    });
  }

  removePluginUiForm() {
    this.balloon.remove(this.formView);

    // Restore ckeditor reset style
    const balloonHolder = this.balloon.view.element.parentNode;
    balloonHolder.classList.add('ck-reset_all');

    Array.prototype.forEach.call(balloonHolder.children, e => {
      if ( Array.prototype.find.call(e.classList, c => c ==='ck-toolbar-container' ) ) {
        e.classList.remove('ck-reset_all');
      }
    });

    // Finally focus the view back to editor
    this.editor.editing.view.focus();
  }

  get isPluginUiFormInPanel() {
    return this.balloon.hasView(this.formView);
  }

  getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    const target = view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());
    return { target };
  }

  createPluginUiForm(editor) {
    const formView = new MainFormView(editor.locale);

    // Listen to 'submit' button click
    this.listenTo(formView, 'submit', () => {
      editor.execute('insertmath', this.formView.texEq);
      this.removePluginUiForm();
    });

    // Listen to cancel button click
    this.listenTo(formView, 'cancel', () => {
      this.removePluginUiForm();
    });

    // Close plugin ui, if esc is pressed (while ui is focused)
    formView.keystrokes.set('esc', (data, cancel) => {
      this.removePluginUiForm();
      cancel();
    });

    return formView;
  }

  createButton() {
    this.editor.ui.componentFactory.add('insertMath', locale => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Insert math',
        icon: pluginIcon,
        tooltip: true
      });

      view.on('execute', () => {
        this.openPluginUiForm();
      });

      return view;
    });
  }

}