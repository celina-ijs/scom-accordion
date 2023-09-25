import { Module, customModule, Container, Panel } from '@ijstech/components';
import ScomAccordion from '@scom/scom-accordion';

@customModule
export default class Module1 extends Module {
    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        super.init();
    }

    render() {
        return <i-vstack padding={{ left: '1rem', right: '1rem', top: '1rem', bottom: '1rem' }} id="panel">
            <i-scom-accordion
                name="Heading 1"
                description='Description'
                defaultExpanded={true}
            />
             <i-scom-accordion
                name="Heading 2"
                description='Description'
            />
        </i-vstack>
    }
}