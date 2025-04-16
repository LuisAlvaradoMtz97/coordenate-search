import Navigation from './components/Navigation.jsx'
import AppRouter from './routes/AppRouter.jsx'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <Navigation />
      <Container>
        <AppRouter />

      </Container>

    </>
  )
}

export default App
