import {
  Container,
  Control,
  ControlElement,
  customElements,
  Module,
  Panel,
  Styles,
  Icon,
  Label
} from '@ijstech/components';
import { IAccordionItem } from '../../interface';
import { customStyles, expandablePanelStyle } from './index.css';

const Theme = Styles.Theme.ThemeVars;

type onSelectedFn = (target: Control) => void;
interface ScomAccordionItemElement extends ControlElement {
  name?: string;
  defaultExpanded?: boolean;
  onRender?: () => Control;
  onSelected?: onSelectedFn;
  showRemove?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-accordion-item']: ScomAccordionItemElement;
    }
  }
}

@customElements('i-scom-accordion-item')
export default class ScomAccordionItem extends Module {
  private pnlAccordionItem: Panel;
  private lbTitle: Label;
  private pnlContent: Panel;
  private iconExpand: Icon;
  private iconRemove: Icon;

  private _data: IAccordionItem;

  public onSelected: onSelectedFn;
  public onRemoved: (target: ScomAccordionItem) => void;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  static async create(options?: ScomAccordionItemElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  get name() {
    return this._data.name ?? '';
  }
  set name(value: string) {
    this._data.name = value ?? '';
    this.lbTitle.caption = value;
  }

  get defaultExpanded() {
    return this._data.defaultExpanded ?? false;
  }
  set defaultExpanded(value: boolean) {
    this._data.defaultExpanded = value ?? false;
  }

  get expanded() {
    return this._data.expanded ?? false;
  }
  set expanded(value: boolean) {
    this._data.expanded = value ?? false;
    this.updatePanel();
  }

  get onRender() {
    return this._data.onRender;
  }
  set onRender(callback: any) {
    this._data.onRender = callback;
  }

  get contentControl() {
    return this.pnlContent.children[0] as Control;
  }

  async setData(data: IAccordionItem) {
    this._data = data;
    await this.renderUI();
  }

  getData() {
    return this._data;
  }

  private async renderUI() {
    if (!this.lbTitle.isConnected) await this.lbTitle.ready();
    this.lbTitle.caption = this._data.name ?? '';
    if (!this.pnlContent.isConnected) await this.pnlContent.ready();
    this.pnlContent.clearInnerHTML();
    if (this.onRender) {
      const control = await this.onRender();
      if (control) {
        control.parent = this.pnlContent;
        this.pnlContent.appendChild(control);
      }
    }
    this.expanded = !this.expanded && this.defaultExpanded;
    this.iconRemove.visible = this._data.showRemove;
  }

  private onTogglePanel(target: Control, event: MouseEvent) {
    // this.expanded = !this.expanded;
    // this.updatePanel();
    event.stopPropagation();
    if (this.onSelected) this.onSelected(this)
  }

  private updatePanel() {
    if (this.expanded) {
      this.iconExpand.name = 'angle-down';
      this.pnlContent.visible = true;
      this.pnlAccordionItem.classList.add('expanded');
    } else {
      this.iconExpand.name = 'angle-right';
      this.pnlContent.visible = false;
      this.pnlAccordionItem.classList.remove('expanded');
    }
  }

  private onRemoveClick() {
    if (this.onRemoved) this.onRemoved(this);
  }

  async init() {
    super.init();
    this.onSelected = this.getAttribute('onSelected', true) || this.onSelected;
    const name = this.getAttribute('name', true);
    const defaultExpanded = this.getAttribute('defaultExpanded', true, false);
    const onRender = this.getAttribute('onRender', true);
    const showRemove = this.getAttribute('showRemove', true, false);
    await this.setData({ name, defaultExpanded, onRender, showRemove });
  }

  render() {
    return (
      <i-vstack
        id="pnlAccordionItem"
        padding={{ top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }}
        class={customStyles}
      >
        <i-hstack
          horizontalAlignment="space-between"
          verticalAlignment="center"
          padding={{ top: '0.5rem', bottom: '0.5rem' }}
          class="pointer accordion-header"
          onClick={this.onTogglePanel}
        >
          <i-label id="lbTitle" caption='' font={{ size: '1rem' }} lineHeight={1.3}></i-label>
          <i-hstack verticalAlignment="center" gap='0.5rem'>
            <i-icon id="iconExpand" width={20} height={28} fill={Theme.text.primary} name="angle-down"></i-icon>
            <i-icon id="iconRemove" width={20} height={20} fill={Theme.text.primary} name="times" visible={false} onClick={this.onRemoveClick}></i-icon>
          </i-hstack>
        </i-hstack>
        <i-panel id="pnlContent" class={`accordion-body ${expandablePanelStyle}`}></i-panel>   
      </i-vstack>
    )
  }
}
