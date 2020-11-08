'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const jQuery = require("jquery");
require('./calculator.scss');

export default class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      error: false // If last query calculation had an error.
    };
  }

  // Add characters to end of query string.
  addToDisplay(i) {
    let oldQuery = '';

    // If last query had error, empty whole screen.
    // Otherwise add character.
    if (this.state.error) {
      this.setState({
        error: false
      });
    }
    else {
      oldQuery = this.state.query;
    }

    let newQuery = oldQuery + i;
    this.setState({query: newQuery});
  }

  // Remove one character from the end of query string.
  removeFromDisplay() {
    // If last query had error, empty whole screen.
    // Otherwise remove just last character.
    if (this.state.error) {
      this.setState({
        query: '',
        error: false
      });
    }
    else {
      let newQuery = this.state.query.slice(0, -1);
      this.setState({query: newQuery});
    }
  }

  // Update query string with result from request.
  calculateQuery() {
    if (typeof CALC_HOST === 'undefined') {
      var CALC_HOST = 'https://node-js-calculator.herokuapp.com/calculus';
    }

    let base64Hash = window.btoa(this.state.query);
    let json = {error: true, message: 'Request failed'};
    let component = this;

    jQuery.ajax({
      method: "GET",
      url: CALC_HOST,
      data: {query: base64Hash}
    })
    .done(function(data) {
      json = JSON.parse(data);

      if (!json.error) {
        component.setState({
          query: json.result
        });
      }
      else {
        component.setState({
          query: 'Error',
          error: true
        });
      }
    })
    .fail(function() {
      component.setState({
        query: 'Error',
        error: true
      });
    });
  }

  render() {
    return(
      <div className="calculator">
        <Display query={this.state.query}/>
        <ButtonSmall mark="+" onClick={() => this.addToDisplay('+')} />
        <ButtonSmall mark="-" onClick={() => this.addToDisplay('-')} />
        <ButtonSmall mark="/" onClick={() => this.addToDisplay('/')} />
        <ButtonSmall mark="*" onClick={() => this.addToDisplay('*')} />
        <ButtonSmall mark="1" onClick={() => this.addToDisplay('1')} />
        <ButtonSmall mark="2" onClick={() => this.addToDisplay('2')} />
        <ButtonSmall mark="3" onClick={() => this.addToDisplay('3')} />
        <ButtonSmall mark="0" onClick={() => this.addToDisplay('0')} />
        <ButtonSmall mark="4" onClick={() => this.addToDisplay('4')} />
        <ButtonSmall mark="5" onClick={() => this.addToDisplay('5')} />
        <ButtonSmall mark="6" onClick={() => this.addToDisplay('6')} />
        <ButtonSmall mark="&larr;" onClick={() => this.removeFromDisplay()} />
        <ButtonSmall mark="7" onClick={() => this.addToDisplay('7')} />
        <ButtonSmall mark="8" onClick={() => this.addToDisplay('8')} />
        <ButtonSmall mark="9" onClick={() => this.addToDisplay('9')} />
        <ButtonSmall mark="=" onClick={() => this.calculateQuery()} addClass="calculator__button--orange" />
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return <div className="calculator__display">{this.props.query}</div>;
  }
}

class ButtonSmall extends React.Component {
  render() {
    let classes = [];
    classes.push('calculator__button');
    classes.push('calculator__button--small');
    classes.push(this.props.addClass);
    return <div className={classes.join(' ')} onClick={() => this.props.onClick()}>{ this.props.mark }</div>;
  }
}
