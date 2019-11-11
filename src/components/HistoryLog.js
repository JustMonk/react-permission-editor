import React from 'react';
import M from 'materialize-css';
import firebase from './firebase-config';

class HistoryLog extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         history: [] //array of object
      };
      this.insertToDatabase = this.insertToDatabase.bind(this);
      this.logState = this.logState.bind(this);
   }

   componentDidMount() {
      var historyRef = firebase.database().ref('history');
      historyRef.on('value', (snapshot) => {
         console.log(snapshot.val())
         if (!snapshot.val()) return;
         this.setState({ history: Object.values(snapshot.val()) });
      });
      console.log(this.state.history);
   }

   insertToDatabase() {
      /*пушить так:*/
      let newPostKey = firebase.database().ref().child('history').push().key;
      firebase.database().ref('history/' + newPostKey).set({
         id: "666",
         name: 'iseedeadpeople',
         email: 'test@box.com',
         config_bool: '1',
         timer_integer: 743,
         flags: ['1', '0', '1'],
         activate_date: '2019-01-01T08:21:20Z',
         update_date: '2014-06-03 17:45:12',
         timestamp: Date.now()
      });
      console.log('запушили');
   }

   logState() {
      console.log(this.state.history);
   }

   render() {
      return (

         <div class="row outside-wrapper">

            {this.state.history.length < 1 ?
               <div id="empty-history" className="action-message">
                  <h5>На данный момент история пуста</h5>
                  <h6>Станьте первопроходцем :)</h6>
               </div>

               :

               <table class="responsive-table">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Конфигуратор</th>
                        <th>Таймер</th>
                        <th>Права</th>
                        <th>Активен</th>
                        <th>Обновлен</th>
                        <th>Изменен</th>
                     </tr>
                  </thead>

                  <tbody>
                     {this.state.history.map(val => {
                        return (
                           <tr>
                              <td>{val.id}</td>
                              <td>{val.name}</td>
                              <td>{val.email}</td>
                              <td>{val.config_bool}</td>
                              <td>{val.timer_integer}</td>
                              <td>{val.flags}</td>
                              <td>{val.activate_date}</td>
                              <td>{val.update_date}</td>
                              <td>{val.timestamp}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>



            }


         </div>
      );
   }

}

export default HistoryLog;