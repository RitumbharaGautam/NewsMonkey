import React, { Component } from 'react'

export default class Loader extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-4' src="../loader.gif" alt="loader" />
      </div>
    )
  }
}
