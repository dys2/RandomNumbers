import React, { Component } from 'react';
import { sequenceGen } from './canvas.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loadingValue: "Loading"
    }
    this.loadingInterval = this.loadingInterval.bind(this);
    this.animFrame = this.animFrame.bind(this);
  }
  componentDidMount() {
    this.int = setInterval(() => this.loadingInterval(), 1000);
    requestAnimationFrame(this.animFrame);
  }
  async animFrame() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, 128, 128);
    const pixels = imageData.data;
    const drawPixel = (x, y, r, g, b) => {
      let i = ((y * 128) + x) * 4;
        pixels[i] = r;
        pixels[i + 1] = g;
        pixels[i + 2] = b;
        pixels[i + 3] = 0xff;
    }
    for (let i = 0; i < 32; i ++) {
      const seq = await sequenceGen();
      seq.forEach((val, j) => drawPixel(j, i, val[0], val[1], val[2]));
    }
    ctx.putImageData(imageData, 0, 0);
    this.setState({loading: false});
    clearInterval(this.int);
  }
  loadingInterval() {
    this.state.loadingValue.length >= 10 ? 
      this.setState({ loadingValue: "Loading" }) : 
      this.setState({ loadingValue: `${this.state.loadingValue}.` });
  }
  render() {
    return (
      <div className="App">
        <div ref="loading" className={this.state.loading ? "show-load" : "hide-load"} >
          <h1>{this.state.loadingValue}</h1>
        </div>
        <canvas ref="canvas" width={128} height={128} />
      </div>
    );
  }
}
export default App;