import './App.css';
import { Button, Container } from 'reactstrap';
import PokemonDetailCard from './Components/PokemonDetailCard/PokemonDetailCard';
import CardSlider from './Components/CardSlider/CardSlider';

function App() {
  return (
    <div className="App">
      <Container className='container-background'>
        
        <div className='page-header-logo'>
          <div className='page-header-logo-inner-block-border'>
            <div className='text-logo-block'>
              <img className='header-logo' src='/assets/Pokeball_icon-icons.com_67533.png' alt='Logo' />
              <h3 className='header-text'>Pokemon Search Portal</h3>
            </div>
          </div>
        </div>

        {/* <PokemonDetailCard></PokemonDetailCard> */}
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
          <CardSlider></CardSlider>
          <CardSlider></CardSlider>
          <CardSlider></CardSlider>
          <CardSlider></CardSlider>
        </div>
        <br />
      </Container>
    </div>
  );
}

export default App;
