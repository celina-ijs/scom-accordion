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
  onCustomItemRemoved?: (item: ScomAccordionItem) => Promise<void>;
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
  public onCustomItemRemoved: (item: ScomAccordionItem) => Promise<void>;

  private _data: IAccordion = {
    items: []
  };

  // public onChanged: (target: Control, expanded: boolean) => void;

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

  resetData() {
    this.items = [];
    this.pnlAccordion.clearInnerHTML();
    this.accordionItemMapper = [];
  }

  private async renderUI() {
    this.pnlAccordion.clearInnerHTML();
    this.accordionItemMapper = [];
    for (let i = 0; i < this.items.length; i++) {
      await this.addItem({...this.items[i]});
    }
  }

  async addItem(item: IAccordionItem) {
    const itemElm = await ScomAccordionItem.create(item);
    itemElm.classList.add('accordion-item');
    // itemElm.id = item.id ?? `accordion-${this.items.length}`
    itemElm.id = item.id ?? itemElm.uuid;
    itemElm.onSelected = this.onClickedItem;
    itemElm.onRemoved = this.onItemRemoved.bind(this);
    this.pnlAccordion.appendChild(itemElm);
    this.accordionItemMapper.push(itemElm);
    this.items.push(item);
    return itemElm;
  }

  updateItemName(id: string, name: string) {
    const item = this.accordionItemMapper.find(item => item.id === id);
    if (item) item.name = name;
  }

  removeItem(id: string) {
    const item = this.accordionItemMapper.find(item => item.id === id);
    if (item) {
      item.remove();
      this.accordionItemMapper = this.accordionItemMapper.filter(item => item.id !== id);
      this.items = this.items.filter(item => item.id !== id);
    }
  }

  private onClickedItem(target: ScomAccordionItem) {
    const id = target.id;
    const currentActive = this.accordionItemMapper.find(item => item.id === id);
    if (this.isFlush) {
      for (let item of this.accordionItemMapper) {
        if (item.id !== id) item.expanded = false;
      }
    }
    if (currentActive) currentActive.expanded = !currentActive.expanded;
  }

  private async onItemRemoved(target: ScomAccordionItem) {
    const id = target.id;
    this.removeItem(id);
    if (this.onCustomItemRemoved) await this.onCustomItemRemoved(target);
  }

  async init() {
    super.init();
    const items = this.getAttribute('items', true, []);
    const isFlush = this.getAttribute('isFlush', true, false);
    this.onCustomItemRemoved = this.getAttribute('onCustomItemRemoved', true);
    await this.setData({ items, isFlush });
  }

  render() {
    return (
      <i-vstack id="pnlAccordion" class={customStyles}></i-vstack>
    )
  }
}
