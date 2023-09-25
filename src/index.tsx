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
import { IConfig } from './interface';
import { customStyles, expandablePanelStyle } from './index.css';

const Theme = Styles.Theme.ThemeVars;

interface ScomAccordionElement extends ControlElement {
  name: string;
  description?: string;
  defaultExpanded?: boolean;
  onChanged?: (target: Control, expanded: boolean) => void;
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
  private pnlAccordion: Panel;
  private lbTitle: Label;
  private pnlContent: Panel;

  private _data: IConfig;
  private isFirstLoad: boolean = false;

  public onChanged: (target: Control, expanded: boolean) => void;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  static async create(options?: ScomAccordionElement, parent?: Container) {
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

  get description() {
    return this._data.description ?? '';
  }
  set description(value: string) {
    this._data.description = value ?? '';
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
  }

  async setData(data: IConfig) {
    this._data = data;
    await this.renderUI();
    this.isFirstLoad = false;
  }

  getData() {
    return this._data;
  }

  addChild(item: Control) {
    this.pnlContent.clearInnerHTML();
    if (!item) return;
    item.parent = this.pnlContent;
    this.pnlContent.appendChild(item);
  }

  private async renderUI() {
    this.lbTitle.caption = this._data.name ?? '';
    this.pnlContent.clearInnerHTML();
    if (this.description) {
      this.pnlContent.appendChild(<i-label caption={this.description}></i-label>);
    }
    if (!this.expanded && this.isFirstLoad && this.defaultExpanded) {
      this.expanded = true;
    }
    this.updatePanel();
  }

  private toggleExpandablePanel(c: Control) {
    this.expanded = !this.expanded;
    this.updatePanel();
    if (this.onChanged) this.onChanged(this, this.expanded);
  }

  private updatePanel() {
    const icon: Icon = this.pnlAccordion.querySelector('i-icon.expandable-icon');
    if (this.expanded) {
      if (icon) icon.name = 'angle-down';
      this.pnlContent.visible = true;
      this.pnlAccordion.classList.add('expanded');
    } else {
      if (icon) icon.name = 'angle-right';
      this.pnlContent.visible = false;
      this.pnlAccordion.classList.remove('expanded');
    }
  }

  async init() {
    super.init();
    const name = this.getAttribute('name', true);
    const description = this.getAttribute('description', true, '');
    const defaultExpanded = this.getAttribute('defaultExpanded', true, false);
    this.isFirstLoad = true;
    await this.setData({ name, defaultExpanded, description });
  }

  render() {
    return (
      <i-panel class={customStyles}>
        <i-vstack
          id="pnlAccordion"
          padding={{ top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }}
          class='accordion'
        >
          <i-hstack
            horizontalAlignment="space-between"
            verticalAlignment="center"
            padding={{ top: '0.5rem', bottom: '0.5rem' }}
            class="expanded pointer"
            onClick={this.toggleExpandablePanel}
          >
            <i-label id="lbTitle" caption='' font={{ size: '1rem' }} lineHeight={1.3}></i-label>
            <i-icon class="expandable-icon" width={20} height={28} fill={Theme.text.primary} name="angle-down"></i-icon>
          </i-hstack>
          <i-panel id="pnlContent" class={`accordion-content ${expandablePanelStyle}`}></i-panel>   
        </i-vstack>
      </i-panel>
    )
  }
}
