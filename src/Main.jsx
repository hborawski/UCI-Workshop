import React from 'react';
import DogImage from './DogImage'
import MultipleChoice from './MultipleChoice'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
      breed: null,
      allBreeds: []
    }
    this.getDogImage = this.getDogImage.bind(this)
    this.getChoices = this.getChoices.bind(this)
  }

  componentWillMount() {
    this.getChoices()
    this.getDogImage()
  }

  getChoices() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {
      // The response from the api is an object where the key is breed name
      // and the value is an array of sub-breeds
      const breedNames = Object.keys(data.message)
      // Map returns a new array that is populated with the return values from
      // the function passed to it
      const subbreedArrays = breedNames.map(breed => {
        const subbreeds = data.message[breed]
        // If the length is 0, there are no sub-breeds
        if (subbreeds.length === 0) {
          // return it as an array so we can concatenate it later to other arrays
          return [breed]
        } else {
          // If there are sub-breeds, we need to merge the main breed name
          // with the sub-breed name
          return subbreeds.map(subbreedName => `${breed}-${subbreedName}`)
        }
      })
      const flattenedBreedArray = subbreedArrays.reduce(
        // Merge the arrays by concatenating them
        (accumulation, currentValue) => accumulation.concat(currentValue)
      )
      this.setState({
        allBreeds: flattenedBreedArray
      })
    })
  }

  getDogImage() {
    this.setState({
      breed: null,
      url: null
    })
    fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      this.setState({
        url: json.message,
        breed: json.message.split('/')[5]
      })
    })
  }
  render() {
    return <div>
      <DogImage url={this.state.url}/>
      <MultipleChoice currentBreed={this.state.breed} allBreeds={this.state.allBreeds}/>
      <button onClick={this.getDogImage}>New Dog</button>
    </div>
  }
}
