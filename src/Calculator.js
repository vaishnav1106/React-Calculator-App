import React, { Component } from 'react';
import Display from './Display';
import Button from './Button';
import './Calculator.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      input: '0',
    };
  }

  handleButtonClick = (value) => {
    if (value === '=' || value === 'C') {
      this.handleSpecialButton(value);
    } else {
      this.handleNumberOrOperator(value);
    }
  };

  handleSpecialButton = (value) => {
    if (value === '=') {
      this.handleEquals();
    } else if (value === 'C') {
      this.handleClear();
    }
  };

  handleNumberOrOperator = (value) => {
    this.setState((prevState) => ({
      input: prevState.input === '0' ? value : prevState.input + value,
    }));
  };

  handleClear = () => {
    this.setState({ input: '0' });
  };

  handleEquals = () => {
    try {
      const result = eval(this.state.input);
      this.setState({ input: result.toString() });
    } catch (error) {
      this.setState({ input: 'Error' });
    }
  };

  render() {
    const buttons = [];
    for (let i = 0; i <= 9; i++) {
      buttons.push(<Button key={i} value={i} onClick={this.handleButtonClick} />);
    }

    const operators = ['+', '-', '*', '/'];
    operators.forEach((operator) => {
      buttons.push(<Button key={operator} value={operator} onClick={this.handleButtonClick} />);
    });

    buttons.push(<Button key="=" value="=" onClick={this.handleButtonClick} />);
    buttons.push(<Button key="C" value="C" onClick={this.handleButtonClick} />);

    return (
      <div className="calculator">
        <Display input={this.state.input} />
        <div className="buttons">{buttons}</div>
      </div>
    );
  }
}

export default Calculator;