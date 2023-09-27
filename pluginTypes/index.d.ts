/// <amd-module name="@scom/scom-accordion/interface.ts" />
declare module "@scom/scom-accordion/interface.ts" {
    import { Control, ControlElement } from "@ijstech/components";
    export interface IAccordionItem extends ControlElement {
        name: string;
        expanded?: boolean;
        defaultExpanded?: boolean;
        onRender: () => Control;
    }
    export interface IAccordion {
        items: IAccordionItem[];
        isFlush?: boolean;
    }
}
/// <amd-module name="@scom/scom-accordion/index.css.ts" />
declare module "@scom/scom-accordion/index.css.ts" {
    export const customStyles: string;
    export const expandablePanelStyle: string;
}
/// <amd-module name="@scom/scom-accordion/commons/accordionItem/index.css.ts" />
declare module "@scom/scom-accordion/commons/accordionItem/index.css.ts" {
    export const customStyles: string;
    export const expandablePanelStyle: string;
}
/// <amd-module name="@scom/scom-accordion/commons/accordionItem/index.tsx" />
declare module "@scom/scom-accordion/commons/accordionItem/index.tsx" {
    import { Container, Control, ControlElement, Module } from '@ijstech/components';
    import { IAccordionItem } from "@scom/scom-accordion/interface.ts";
    type onSelectedFn = (target: Control) => void;
    interface ScomAccordionItemElement extends ControlElement {
        name?: string;
        defaultExpanded?: boolean;
        onRender?: () => Control;
        onSelected?: onSelectedFn;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-accordion-item']: ScomAccordionItemElement;
            }
        }
    }
    export default class ScomAccordionItem extends Module {
        private pnlAccordionItem;
        private lbTitle;
        private pnlContent;
        private iconExpand;
        private _data;
        onSelected: onSelectedFn;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomAccordionItemElement, parent?: Container): Promise<ScomAccordionItem>;
        get name(): string;
        set name(value: string);
        get defaultExpanded(): boolean;
        set defaultExpanded(value: boolean);
        get expanded(): boolean;
        set expanded(value: boolean);
        get onRender(): any;
        set onRender(callback: any);
        setData(data: IAccordionItem): Promise<void>;
        getData(): IAccordionItem;
        private renderUI;
        private onTogglePanel;
        private updatePanel;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-accordion" />
declare module "@scom/scom-accordion" {
    import { Container, ControlElement, Module } from '@ijstech/components';
    import { IAccordion, IAccordionItem } from "@scom/scom-accordion/interface.ts";
    interface ScomAccordionElement extends ControlElement {
        items?: IAccordionItem[];
        isFlush?: boolean;
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
        private accordionItemMapper;
        private _data;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomAccordionElement, parent?: Container): Promise<ScomAccordion>;
        get items(): IAccordionItem[];
        set items(value: IAccordionItem[]);
        get isFlush(): boolean;
        set isFlush(value: boolean);
        setData(data: IAccordion): Promise<void>;
        getData(): IAccordion;
        private resetData;
        private renderUI;
        private onClickedItem;
        init(): Promise<void>;
        render(): any;
    }
}
