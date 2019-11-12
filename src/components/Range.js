import React from 'react';
import M from 'materialize-css';

class Range extends React.Component {

   constructor(props) {
      super(props);
      this.state = {};
   }

   componentDidMount() {
      //reset placeholders
      M.updateTextFields();
      //reinit
      M.Range.init(document.querySelectorAll("input[type=range]"));
   }

   componentDidUpdate() {
      //reset placeholders
      M.updateTextFields();
      //reinit
      M.Range.init(document.querySelectorAll("input[type=range]"));
   }

   showCurrentValue(e) {
       let valueContainer = e.target.parentElement.querySelector('.current-value');
       valueContainer.innerHTML = e.target.value;
   }

   render() {
      return (
         <p className="range-field">
            <p className="range-helper">
               <span>{this.props.min}</span>
               <span>Выбранное значение: <span className="current-value">{this.props.default}</span></span>
               <span>{this.props.max}</span>
            </p>
            <input type="range" id={this.props.id} defaultValue={this.props.default} min={this.props.min} max={this.props.max} onChange={this.showCurrentValue} />
         </p>
      );
   }

}

export default Range;