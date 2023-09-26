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

interface ScomAccordionItemElement extends ControlElement {
  name?: string;
  defaultExpanded?: boolean;
  onRender?: () => Control;
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

  private _data: IAccordionItem;

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

  async setData(data: IAccordionItem) {
    this._data = data;
    await this.renderUI();
  }

  getData() {
    return this._data;
  }

  private async renderUI() {
    this.lbTitle.caption = this._data.name ?? '';
    this.pnlContent.clearInnerHTML();
    if (this.onRender) {
      const control = await this.onRender();
      if (control) {
        control.parent = this.pnlContent;
        this.pnlContent.appendChild(control);
      }
    }
    this.expanded = !this.expanded && this.defaultExpanded;
  }

  private onTogglePanel(target: Control, event: MouseEvent) {
    // this.expanded = !this.expanded;
    // this.updatePanel();
    if (this.onClick) this.onClick(this, event)
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

  async init() {
    super.init();
    const name = this.getAttribute('name', true);
    const defaultExpanded = this.getAttribute('defaultExpanded', true, false);
    const onRender = this.getAttribute('onRender', true);
    await this.setData({ name, defaultExpanded, onRender });
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
          <i-icon id="iconExpand" width={20} height={28} fill={Theme.text.primary} name="angle-down"></i-icon>
        </i-hstack>
        <i-panel id="pnlContent" class={`accordion-body ${expandablePanelStyle}`}></i-panel>   
      </i-vstack>
    )
  }
}
