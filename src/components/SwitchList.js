import React from 'react';

class SwitchList extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         list: this.props.flags,
         isIncrease: false,
      };
      this.addRow = this.addRow.bind(this);
      this.deleteLastRow = this.deleteLastRow.bind(this);
   }

   addRow() {
      this.setState({isIncrease: true});
      let currentList = this.state.list;
      currentList.push('0');
      this.setState({list: currentList});
   }

   deleteLastRow() {
      this.setState({isIncrease: false});
      let currentList = this.state.list;
      currentList.pop();
      this.setState({list: currentList});
   }

   getRows() {
      return this.state.list.map((val, i) => {
         let checkbox = +val ? <input defaultChecked type="checkbox"></input> : <input type="checkbox"></input>;
         return (
            <tr key={i} className={this.state.isIncrease && this.state.list.length-1 === i ? 'fadeIn' : ''}>
               <td>Доступ к модулю {i + 1}</td>
               <td><div className="switch">
                  <label>
                     {checkbox}
                     <span className="lever"></span>
                  </label>
               </div></td>
            </tr>
         );
      })
   }

   render() {
      return (
         <div id={this.props.id} className="switch-list-wrapper">
            <table>
               <thead>
                  <tr>
                     <th>Привилегия:</th>
                     
                     {this.state.list.length < 1 ? "" : <th>Разрешено?</th>}
                  </tr>
               </thead>

               <tbody>

                  {this.state.list.length < 1 ? <tr><td>Пользователь не обладает доступом к системе</td></tr> : this.getRows()}

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