import { AppRouter }   from '@/router'
import { AuthProvider } from '@/store/AuthContext'
import { MatchProvider } from '@/store/MatchContext'

function App() {
  return (
    <AuthProvider>
      <MatchProvider>
        <AppRouter />
      </MatchProvider>
    </AuthProvider>
  )
}

export default App
