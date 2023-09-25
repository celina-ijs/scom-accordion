/// <amd-module name="@scom/scom-accordion/interface.ts" />
declare module "@scom/scom-accordion/interface.ts" {
    export interface IConfig {
        name: string;
        description?: string;
        expanded?: boolean;
        defaultExpanded?: boolean;
    }
}
/// <amd-module name="@scom/scom-accordion/index.css.ts" />
declare module "@scom/scom-accordion/index.css.ts" {
    export const customStyles: string;
    export const expandablePanelStyle: string;
}
/// <amd-module name="@scom/scom-accordion" />
declare module "@scom/scom-accordion" {
    import { Container, Control, ControlElement, Module } from '@ijstech/components';
    import { IConfig } from "@scom/scom-accordion/interface.ts";
    interface ScomAccordionElement extends ControlElement {
        name: string;
        description?: string;
        defaultExpanded?: boolean;
        onChanged?: (target: Control, expanded: boolean) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-accordion']: ScomAccordionElement;
            }
        }
    }
    export default class ScomAccordion extends Module {
        private pnlAccordion;
        private lbTitle;
        private pnlContent;
        private _data;
        private isFirstLoad;
        onChanged: (target: Control, expanded: boolean) => void;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomAccordionElement, parent?: Container): Promise<ScomAccordion>;
        get name(): string;
        set name(value: string);
        get description(): string;
        set description(value: string);
        get defaultExpanded(): boolean;
        set defaultExpanded(value: boolean);
        get expanded(): boolean;
        set expanded(value: boolean);
        setData(data: IConfig): Promise<void>;
        getData(): IConfig;
        addChild(item: Control): void;
        private renderUI;
        private toggleExpandablePanel;
        private updatePanel;
        init(): Promise<void>;
        render(): any;
    }
}
