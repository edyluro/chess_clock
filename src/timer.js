import React from "react";

export default class Timer extends React.Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 50, status: 'INITIAL' };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    this.setState({ status: 'START' });
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  pauseTimer = () => {
    this.setState({ status: 'PAUSE' });
  }

  countDown() {
    if (this.state.status === 'START') {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      // Check if we're at zero.
      if (seconds == 0) {
        clearInterval(this.timer);
      }
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.startTimer}>Start</button>
        <button onClick={this.pauseTimer}>Pause</button>
        m: {this.state.time.m} s: {this.state.time.s}
      </div>
    );
  }
}