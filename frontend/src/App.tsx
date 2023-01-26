import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Dashboard } from './Dashboard'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Dashboard/>
  </ChakraProvider>
)
