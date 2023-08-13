import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import Rank from './components/rank/rank';
import PhotoInput from './components/photoInput/photoInput';
import FaceRecognition from './components/facerecognition/facerecognition';
import Signin from './components/signin/signin';
import Register from './components/register/register';
// import ParticlesBg from 'particles-bg';
import { Component } from 'react';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id : '',
    name : '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id : data.id,
      name : data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined,
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('imageInput');
    const width = Number(image.width);
    const height = Number(image.height);
    const box = {topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      rightCol: width - (clarifaiFace.right_col * width)}
    return box;
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    }
    else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  updateFaceBox = (box) => {
    this.setState({box:box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
  //   // Your PAT (Personal Access Token) can be found in the portal under Authentification
  //   const PAT = '889bc45afa8e41e188f86db0c437581c';
  //   // Specify the correct user_id/app_id pairings
  //   // Since you're making inferences outside your app's scope
  //   const USER_ID = 'thomasravetto';
  //   const APP_ID = 'facerecognition';
  //   // Change these to whatever model and image URL you want to use
  //   const MODEL_ID = 'face-detection';
  //   const IMAGE_URL = this.state.input;

  //     ///////////////////////////////////////////////////////////////////////////////////
  //   // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  //   ///////////////////////////////////////////////////////////////////////////////////

  //   const raw = JSON.stringify({
  //     "user_app_id": {
  //         "user_id": USER_ID,
  //         "app_id": APP_ID
  //     },
  //     "inputs": [
  //         {
  //             "data": {
  //                 "image": {
  //                     "url": IMAGE_URL
  //                 }
  //             }
  //         }
  //     ]
  // });


  // const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Authorization': 'Key ' + PAT
  //     },
  //     body: raw
  // };
        fetch("http://localhost:3500/imageurl", {
          method:'post',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
        .then(response => response.json())
        .then(result => {
          if (result.status && result.status.description === 'Ok') {
            fetch("http://localhost:3500/image", {
              method:'put',
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
          }
          this.updateFaceBox(this.calculateFaceLocation(result))
        })
        .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className="App">
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home'
          ? <div>
          <Logo/>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <PhotoInput onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          {/* <ParticlesBg type="cobweb" bg={true} /> */}
        </div>
        : (
          this.state.route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
          }
      </div>
    );
  }
}

export default App;