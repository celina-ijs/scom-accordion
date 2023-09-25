import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const customStyles = Styles.style({
  $nest: {
    '.accordion': {

    }
  }
})

export const expandablePanelStyle = Styles.style({
  $nest: {
    'i-panel': {
      border: 'none'
    }
  }
})
