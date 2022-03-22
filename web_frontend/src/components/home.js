import { Container, Divider } from '@material-ui/core'
import  SignIn from './sign-in/SignIn'
// import Blog from './blog/Blog'
import Dashboard from './dashboard/Dashboard'

function Home() {
  return (
    // <Container maxWidth="md">
      <div>
        {/* <SignIn /> */}
        <Dashboard/>

      </div>
    // </Container>

  );
}

export default Home;
