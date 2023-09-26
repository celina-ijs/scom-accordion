import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const customStyles = Styles.style({
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
})

export const expandablePanelStyle = Styles.style({
  $nest: {
    'i-panel': {
      border: 'none'
    }
  }
})
