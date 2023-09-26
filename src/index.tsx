import {
  Container,
  Control,
  ControlElement,
  customElements,
  Module,
  VStack
} from '@ijstech/components';
import { IAccordion, IAccordionItem } from './interface';
import { customStyles } from './index.css';
import ScomAccordionItem from './commons/accordionItem/index';

interface ScomAccordionElement extends ControlElement {
  items?: IAccordionItem[];
  isFlush?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-accordion']: ScomAccordionElement;
    }
  }
}

@customElements('i-scom-accordion')
export default class ScomAccordion extends Module {
  private pnlAccordion: VStack;
  private accordionItemMapper: ScomAccordionItem[];

  private _data: IAccordion = {
    items: []
  };

  public onChanged: (target: Control, expanded: boolean) => void;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.onClickedItem = this.onClickedItem.bind(this);
  }

  static async create(options?: ScomAccordionElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  get items() {
    return this._data.items ?? [];
  }
  set items(value: IAccordionItem[]) {
    this._data.items = value ?? [];
  }

  get isFlush() {
    return this._data.isFlush ?? false;
  }
  set isFlush(value: boolean) {
    this._data.isFlush = value ?? false;
  }

  async setData(data: IAccordion) {
    this._data = data;
    await this.renderUI();
  }

  getData() {
    return this._data;
  }

  private resetData() {
    this.pnlAccordion.clearInnerHTML();
    this.accordionItemMapper = [];
  }

  private async renderUI() {
    this.resetData();
    for (let i = 0; i < this.items.length; i++) {
      const itemElm = <i-scom-accordion-item class="accordion-item"></i-scom-accordion-item>;
      await itemElm.setData({...this.items[i]});
      itemElm.id = `accordion-${i}`
      itemElm.onClick = this.onClickedItem;
      this.pnlAccordion.appendChild(itemElm);
      this.accordionItemMapper.push(itemElm);
    }
  }

  private onClickedItem(target: Control) {
    const id = target.id;
    const currentActive = this.accordionItemMapper.find(item => item.id === id);
    if (this.isFlush) {
      for (let item of this.accordionItemMapper) {
        if (item.id !== id) item.expanded = false;
      }
    }
    if (currentActive) currentActive.expanded = !currentActive.expanded;
  }

  async init() {
    super.init();
    const items = this.getAttribute('items', true, []);
    const isFlush = this.getAttribute('isFlush', true, false);
    await this.setData({ items, isFlush });
  }

  render() {
    return (
      <i-vstack id="pnlAccordion" class={customStyles}></i-vstack>
    )
  }
}
