import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Routes, Route } from 'react-router-dom'
import { Container, Divider } from '@material-ui/core'

function App() {
  return (
    <Container maxWidth="md">
      <div>
        <SignIn />
        {/* <SignUp /> */}
      </div>
    </Container>

  );
}

export default App;
