import AllRoutes from './routes/Routes'
import { AuthProvider, ThemeProvider } from './context'
import { Toaster } from 'sonner'
import '@/assets/scss/app.scss'
import '@/assets/scss/icons.scss'

function App() {

  return (
    <>
    <ThemeProvider>
      <AuthProvider>
        <AllRoutes />
        <Toaster richColors/>
      </AuthProvider>
    </ThemeProvider>
    </>
  )
}

export default App
