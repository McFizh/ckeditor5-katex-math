import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import pluginIcon from '../theme/icons/icon.svg';

class KatexMath extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'insertMath', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Insert math',
                icon: pluginIcon,
                tooltip: true
            } );

            view.on( 'execute', () => {
                console.log("Button pressed");
            } );
        } );
    }
}