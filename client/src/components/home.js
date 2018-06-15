import React, { Component } from 'react';
import '../styles/home.css';

class Home extends Component {
  onCreate = () => {
    this.props.actions.Bords.create().then(data => {
      this.props.actions.redirect(`/bords/${data.bord.url}`);
    });
  }
  render() {
    return (
      <div className="home text-center">
        <button onClick={this.onCreate} type="button" className="btn btn-primary">Create Board</button>
      </div>
    );
  }
}

export default Home;
