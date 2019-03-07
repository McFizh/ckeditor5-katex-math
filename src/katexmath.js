import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import pluginIcon from '../theme/icons/icon.svg';

export default class KatexMath extends Plugin {

    init() {
        const editor = this.editor;

        // Create button for toolbar
        this.createButton();

        // Register: <span class='math-tex'></span> element for ckeditor model
        editor.model.schema.register('span', {
            allowWhere: '$text',
            allowContentOf: '$block',
            isBlock: true,
            allowAttributes: [ 'class' ],
        });

        editor.conversion.elementToElement({
            model: 'span', 
            view: 'span'
        });

        editor.conversion.attributeToAttribute({
            model: { name: 'span', key: 'class' },
            view: { name: 'span', key: 'class' },
        });   

    }

    createButton() {
        this.editor.ui.componentFactory.add( 'insertMath', locale => {
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