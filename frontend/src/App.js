//jsx file (js file with html in a function)
//html must all be within one <>

import Footer from "./componets/Footer";
import Header from "./componets/Header";
import {Container} from 'react-bootstrap'

/*function App() {
  return (
    <>
     
    </>
  );
}*/

//es7 (standards for js syntax) has a different way to write a function
// arrow function uses =>
const App = () => {
  return(
    <>
    <Header />
      <main>
        <Container>
          <HomeScreen/>
        </Container>
      </main>
    <Footer />
    </>
  );
}


export default App;
