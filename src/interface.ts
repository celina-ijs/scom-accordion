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
