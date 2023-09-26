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
        return <i-vstack padding={{ left: '1rem', right: '1rem', top: '1rem', bottom: '1rem' }} gap="2rem">
            <i-scom-accordion
                items={
                    [
                        {
                            name: 'Heading 1',
                            onRender: () => {
                                return <i-label caption='Desc 1'></i-label>
                            },
                            defaultExpanded: true
                        },
                        {
                            name: 'Heading 2',
                            onRender: () => {
                                return <i-label caption='Desc 2'></i-label>
                            }
                        }
                    ]
                }
            />
            <i-scom-accordion
                items={
                    [
                        {
                            name: 'Heading 1',
                            onRender: () => {
                                return <i-image url='https://placehold.co/600x400' width={600} height={400}></i-image>
                            },
                            defaultExpanded: true
                        },
                        {
                            name: 'Heading 2',
                            onRender: () => {
                                return <i-image url='https://placehold.co/600x400' width={600} height={400}></i-image>
                            }
                        }
                    ]
                }
                isFlush={true}
            />
        </i-vstack>
    }
}