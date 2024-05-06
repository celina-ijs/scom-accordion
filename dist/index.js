var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-accordion/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-accordion/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.expandablePanelStyle = exports.customStyles = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.customStyles = components_1.Styles.style({
        $nest: {
            '.accordion': {}
        }
    });
    exports.expandablePanelStyle = components_1.Styles.style({
        $nest: {
            'i-panel': {
                border: 'none'
            }
        }
    });
});
define("@scom/scom-accordion/commons/accordionItem/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.expandablePanelStyle = exports.customStyles = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
    exports.customStyles = components_2.Styles.style({
        $nest: {
            '.accordion-body': {
                transition: 'height 0.4s ease-in',
                height: 0
            },
            '&.expanded > .accordion-body': {
                height: 'auto'
            },
            '.accordion-header': {}
        }
    });
    exports.expandablePanelStyle = components_2.Styles.style({
        $nest: {
            'i-panel': {
                border: 'none'
            }
        }
    });
});
define("@scom/scom-accordion/commons/accordionItem/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-accordion/commons/accordionItem/index.css.ts"], function (require, exports, components_3, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    let ScomAccordionItem = class ScomAccordionItem extends components_3.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get name() {
            return this._data.name ?? '';
        }
        set name(value) {
            this._data.name = value ?? '';
            this.lbTitle.caption = value;
        }
        get defaultExpanded() {
            return this._data.defaultExpanded ?? false;
        }
        set defaultExpanded(value) {
            this._data.defaultExpanded = value ?? false;
        }
        get expanded() {
            return this._data.expanded ?? false;
        }
        set expanded(value) {
            this._data.expanded = value ?? false;
            this.updatePanel();
        }
        get onRender() {
            return this._data.onRender;
        }
        set onRender(callback) {
            this._data.onRender = callback;
        }
        get contentControl() {
            return this.pnlContent.children[0];
        }
        async setData(data) {
            this._data = data;
            await this.renderUI();
        }
        getData() {
            return this._data;
        }
        async renderUI() {
            if (!this.lbTitle.isConnected)
                await this.lbTitle.ready();
            this.lbTitle.caption = this._data.name ?? '';
            if (!this.pnlContent.isConnected)
                await this.pnlContent.ready();
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
        onTogglePanel(target, event) {
            // this.expanded = !this.expanded;
            // this.updatePanel();
            event.stopPropagation();
            if (this.onSelected)
                this.onSelected(this);
        }
        updatePanel() {
            if (this.expanded) {
                this.iconExpand.name = 'angle-down';
                this.pnlContent.visible = true;
                this.pnlAccordionItem.classList.add('expanded');
            }
            else {
                this.iconExpand.name = 'angle-right';
                this.pnlContent.visible = false;
                this.pnlAccordionItem.classList.remove('expanded');
            }
        }
        onRemoveClick() {
            if (this.onRemoved)
                this.onRemoved(this);
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
            return (this.$render("i-vstack", { id: "pnlAccordionItem", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, class: index_css_1.customStyles },
                this.$render("i-hstack", { horizontalAlignment: "space-between", verticalAlignment: "center", padding: { top: '0.5rem', bottom: '0.5rem' }, class: "pointer accordion-header", onClick: this.onTogglePanel },
                    this.$render("i-label", { id: "lbTitle", caption: '', font: { size: '1rem' }, lineHeight: 1.3 }),
                    this.$render("i-hstack", { verticalAlignment: "center", gap: '0.5rem' },
                        this.$render("i-icon", { id: "iconExpand", width: 20, height: 28, fill: Theme.text.primary, name: "angle-down" }),
                        this.$render("i-icon", { id: "iconRemove", width: 20, height: 20, fill: Theme.text.primary, name: "times", visible: false, onClick: this.onRemoveClick }))),
                this.$render("i-panel", { id: "pnlContent", class: `accordion-body ${index_css_1.expandablePanelStyle}` })));
        }
    };
    ScomAccordionItem = __decorate([
        (0, components_3.customElements)('i-scom-accordion-item')
    ], ScomAccordionItem);
    exports.default = ScomAccordionItem;
});
define("@scom/scom-accordion", ["require", "exports", "@ijstech/components", "@scom/scom-accordion/index.css.ts", "@scom/scom-accordion/commons/accordionItem/index.tsx"], function (require, exports, components_4, index_css_2, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ScomAccordion = class ScomAccordion extends components_4.Module {
        // public onChanged: (target: Control, expanded: boolean) => void;
        constructor(parent, options) {
            super(parent, options);
            this._data = {
                items: []
            };
            this.onClickedItem = this.onClickedItem.bind(this);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get items() {
            return this._data.items ?? [];
        }
        set items(value) {
            this._data.items = value ?? [];
        }
        get isFlush() {
            return this._data.isFlush ?? false;
        }
        set isFlush(value) {
            this._data.isFlush = value ?? false;
        }
        async setData(data) {
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
        async renderUI() {
            this.pnlAccordion.clearInnerHTML();
            this.accordionItemMapper = [];
            for (let i = 0; i < this.items.length; i++) {
                const item = { ...this.items[i] };
                await this.createAccordionItem(item);
            }
        }
        async createAccordionItem(item) {
            const itemElm = await index_1.default.create(item);
            itemElm.classList.add('accordion-item');
            // itemElm.id = item.id ?? `accordion-${this.items.length}`
            itemElm.id = item.id ?? itemElm.uuid;
            itemElm.onSelected = this.onClickedItem;
            itemElm.onRemoved = this.onItemRemoved.bind(this);
            this.pnlAccordion.appendChild(itemElm);
            this.accordionItemMapper.push(itemElm);
            return itemElm;
        }
        async addItem(item) {
            const itemElm = await this.createAccordionItem(item);
            this.items.push(item);
            return itemElm;
        }
        updateItemName(id, name) {
            const item = this.accordionItemMapper.find(item => item.id === id);
            if (item)
                item.name = name;
        }
        removeItem(id) {
            const item = this.accordionItemMapper.find(item => item.id === id);
            if (item) {
                item.remove();
                this.accordionItemMapper = this.accordionItemMapper.filter(item => item.id !== id);
                this.items = this.items.filter(item => item.id !== id);
            }
        }
        onClickedItem(target) {
            const id = target.id;
            const currentActive = this.accordionItemMapper.find(item => item.id === id);
            if (this.isFlush) {
                for (let item of this.accordionItemMapper) {
                    if (item.id !== id)
                        item.expanded = false;
                }
            }
            if (currentActive)
                currentActive.expanded = !currentActive.expanded;
        }
        async onItemRemoved(target) {
            const id = target.id;
            this.removeItem(id);
            if (this.onCustomItemRemoved)
                await this.onCustomItemRemoved(target);
        }
        async init() {
            super.init();
            const items = this.getAttribute('items', true, []);
            const isFlush = this.getAttribute('isFlush', true, false);
            this.onCustomItemRemoved = this.getAttribute('onCustomItemRemoved', true);
            await this.setData({ items, isFlush });
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlAccordion", class: index_css_2.customStyles }));
        }
    };
    ScomAccordion = __decorate([
        (0, components_4.customElements)('i-scom-accordion')
    ], ScomAccordion);
    exports.default = ScomAccordion;
});
