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
define("@scom/scom-accordion", ["require", "exports", "@ijstech/components", "@scom/scom-accordion/index.css.ts"], function (require, exports, components_2, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    let ScomAccordion = class ScomAccordion extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this.isFirstLoad = false;
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get name() {
            var _a;
            return (_a = this._data.name) !== null && _a !== void 0 ? _a : '';
        }
        set name(value) {
            this._data.name = value !== null && value !== void 0 ? value : '';
        }
        get description() {
            var _a;
            return (_a = this._data.description) !== null && _a !== void 0 ? _a : '';
        }
        set description(value) {
            this._data.description = value !== null && value !== void 0 ? value : '';
        }
        get defaultExpanded() {
            var _a;
            return (_a = this._data.defaultExpanded) !== null && _a !== void 0 ? _a : false;
        }
        set defaultExpanded(value) {
            this._data.defaultExpanded = value !== null && value !== void 0 ? value : false;
        }
        get expanded() {
            var _a;
            return (_a = this._data.expanded) !== null && _a !== void 0 ? _a : false;
        }
        set expanded(value) {
            this._data.expanded = value !== null && value !== void 0 ? value : false;
        }
        async setData(data) {
            this._data = data;
            await this.renderUI();
            this.isFirstLoad = false;
        }
        getData() {
            return this._data;
        }
        async renderUI() {
            var _a;
            console.log('renderUI');
            this.lbTitle.caption = (_a = this._data.name) !== null && _a !== void 0 ? _a : '';
            this.pnlContent.clearInnerHTML();
            if (this.description) {
                const lb = this.$render("i-label", { caption: this.description });
                this.pnlContent.appendChild(lb);
            }
            if (!this.expanded && this.isFirstLoad && this.defaultExpanded)
                this.expanded = true;
            this.updateUI();
        }
        toggleExpandablePanel(c) {
            this.expanded = !this.expanded;
            this.updateUI();
            if (this.onChanged)
                this.onChanged(this, this.expanded);
        }
        updateUI() {
            const icon = this.pnlAccordion.querySelector('i-icon.expandable-icon');
            if (this.expanded) {
                if (icon)
                    icon.name = 'angle-down';
                this.pnlContent.visible = true;
                this.pnlAccordion.classList.add('expanded');
            }
            else {
                if (icon)
                    icon.name = 'angle-right';
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
            return (this.$render("i-panel", { class: index_css_1.customStyles },
                this.$render("i-vstack", { id: "pnlAccordion", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, class: 'accordion' },
                    this.$render("i-hstack", { horizontalAlignment: "space-between", verticalAlignment: "center", padding: { top: '0.5rem', bottom: '0.5rem' }, class: "expanded pointer", onClick: this.toggleExpandablePanel },
                        this.$render("i-label", { id: "lbTitle", caption: '', font: { size: '1rem' }, lineHeight: 1.3 }),
                        this.$render("i-icon", { class: "expandable-icon", width: 20, height: 28, fill: Theme.text.primary, name: "angle-down" })),
                    this.$render("i-panel", { id: "pnlContent", class: `accordion-content ${index_css_1.expandablePanelStyle}` }))));
        }
    };
    ScomAccordion = __decorate([
        (0, components_2.customElements)('i-scom-accordion')
    ], ScomAccordion);
    exports.default = ScomAccordion;
});
