import React from 'react';
import M from 'materialize-css';
import { isArray } from 'util';

class SwitchList extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         list: this.props.flags
      };
      this.addRow = this.addRow.bind(this);
      this.deleteLastRow = this.deleteLastRow.bind(this);
   }

   componentDidMount() {

   }

   componentDidUpdate() {

   }

   addRow() {
      let currentList = this.state.list;
      currentList.push('0');
      this.setState({list: currentList});
   }

   deleteLastRow() {
      let currentList = this.state.list;
      currentList.pop();
      this.setState({list: currentList});
   }

   getRows() {
      return this.state.list.map((val, i) => {
         let checkbox = +val ? <input defaultChecked type="checkbox"></input> : <input type="checkbox"></input>;
         return (
            <tr>
               <td>Доступ к модулю {i + 1}</td>
               <td><div class="switch">
                  <label>
                     {checkbox}
                     <span class="lever"></span>
                  </label>
               </div></td>
            </tr>
         );
      })
   }


   render() {
      return (
         <div className="switch-list-wrapper">
            <table>
               <thead>
                  <tr>
                     <th>Привилегия:</th>
                     <th>Разрешено?</th>
                  </tr>
               </thead>

               <tbody>

                  {this.state.list.length < 1 ? 'Не передан ни один флаг' : this.getRows()}

               </tbody>
            </table>
            <div className="table-config">
               <a className="table-link" onClick={this.addRow}>Добавить строку</a>
               <a className="table-link" onClick={this.deleteLastRow}>Удалить последнюю</a>

            </div>
         </div>
      );
   }

}

export default SwitchList;