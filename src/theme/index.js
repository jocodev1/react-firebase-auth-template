import { theme, extendTheme } from "@chakra-ui/react"

const colors = {
  ...theme,
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}

export const customTheme = extendTheme({ colors })

export default customTheme
