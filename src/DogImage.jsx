import React from 'react';

const DogImage = (props) => {
  if (props.url !== null) {
    return <img src={props.url}/>
  } else {
    return <p>Loading</p>
  }
}

export default DogImage
