import React from 'react';

export default class MultipleChoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      choices: [],
      correct: null
    }
    this.guessDog = this.guessDog.bind(this)
    this.createChoices = this.createChoices.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBreed !== null) {
      this.setState({
        correct: null,
        choices: this.createChoices(this.props.allBreeds, nextProps.currentBreed)
      })
    }
  }

  guessDog(breed) {
    this.setState({
      correct: breed === this.props.currentBreed
    })
  }

  createChoices(allBreeds, currentBreed, length = 4) {
    const shuffleArray = arr => (
      // Map to array of [randomFloat, originalValue]
      // sort based on the floats
      // pull original values back into single array
      arr.map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1])
    )
    // Remove our current breed from the possible choices before shuffling
    // we will add it back in later to ensure its a choice
    // NOTE: filter returns a new array and does not modify the original
    const choicesWithoutCurrentBreed = allBreeds.filter(b => b !== currentBreed)
    // Randomize the order of the array
    const shuffledChoices = shuffleArray(choicesWithoutCurrentBreed)
    // Pull the first few items off the array so we have a random selection
    // NOTE: slice returns a new array and does not modify the original
    const fewerChoices = shuffledChoices.slice(0, length -1)
    // Add on our actual breed so the right answer is available
    const choicesWithCurrentBreed = fewerChoices.concat(currentBreed)
    // Randomize the order again so we can't predict where the real answer is
    const shuffledFinalChoices = shuffleArray(choicesWithCurrentBreed)
    return shuffledFinalChoices
  }
  render() {
    return <div>
      {
        this.state.choices.map(choice => <button onClick={() =>this.guessDog(choice)}>{choice}</button>)
      }
      <p>{this.state.correct === null ? '' : this.state.correct ? 'Correct!' : 'Wrong!'}</p>
    </div>
  }
}
