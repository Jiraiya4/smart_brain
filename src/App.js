import { Component } from 'react';
import Particles from 'react-tsparticles';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecognation from './components/FaceRecognation/FaceRecognation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
 apiKey: 'd4182f77bcf646ca8e4a37f4115b05ec'
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (Box) => {
    this.setState({box: Box});
  }
  //https://www.faceapp.com/img/content/compare/beard-example-before@3x.jpg

  onInputChange = (event) => {
    this.setState({imageUrl: event.target.value})
  }

  onButtonSubmit = () => {
    //this.setState({imageUrl: this.state.input});
    app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a', this.state.imageUrl)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  }

  onRouteChange = (auth) => {
    if(auth === 'home'){
      this.setState({...this.state, route: auth, isSignedIn: true})
    } else if (auth === 'signin') {
      this.setState({...this.state, route: auth, isSignedIn: false})
    } else {
      this.setState({...this.state, route: auth, isSignedIn: false})
    }
  }

  particlesInit(main) {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  }

  particlesLoaded(container) {
    console.log(container);
  }
  render(){
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
        id="tsparticles"
        init={this.particlesInit}
        loaded={this.particlesLoaded}
        options={{
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 50,
                duration: 22,
                opacity: 0.8,
                size: 100,
              },
              push: {
                quantity: 1,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 170,
              enable: true,
              opacity: 0.5,
              width: 1.5,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 150,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 2,
            },
          },
          detectRetina: true,
        }}
      />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
        ? 
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognation box={box} imageUrl={imageUrl}/>
        </div>
        :(
          route === 'signin'
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
        )
        }
      </div>
    );
  }
}

export default App;
