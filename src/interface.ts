import { Control } from "@ijstech/components";

export interface IAccordionItem {
  name: string;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onRender: () => Control;
}

export interface IAccordion {
  items: IAccordionItem[];
  isFlush?: boolean;
}
