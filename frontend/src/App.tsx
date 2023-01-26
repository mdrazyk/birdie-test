import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { RecipientDashboard } from './RecipientDashboard/RecipientDashboard.container'

export const App = () => (
  <ChakraProvider theme={theme}>
    <RecipientDashboard/>
  </ChakraProvider>
)
