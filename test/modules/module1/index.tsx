import { Module, customModule, Container, Panel } from '@ijstech/components';
import ScomAccordion from '@scom/scom-accordion';

@customModule
export default class Module1 extends Module {
    private elm: ScomAccordion
    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        super.init();
    }

    render() {
        return <i-panel padding={{ left: '1rem', right: '1rem', top: '1rem', bottom: '1rem' }} id="panel">
            <i-scom-accordion
                id="elm"
                name="Example"
                description='Description'
            />
        </i-panel>
    }
}