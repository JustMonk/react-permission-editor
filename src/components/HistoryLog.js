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

      var instances = M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
   }

   componentDidUpdate() {
      var instances = M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
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

         <div class="row outside-wrapper fadeIn">

            {this.state.history.length < 1 ?
               <div id="empty-history" className="action-message">
                  <h5>На данный момент история пуста</h5>
                  <h6>Станьте первопроходцем :)</h6>
               </div>

               :

               <div className="IN_THE_FIND">

                  <ul class="collapsible">

                     {this.state.history.map((val,i) => {
                        return (
                           <li>
                              <div class="collapsible-header"><i class="material-icons">filter_drama</i>{i}) {val.timestamp}</div>
                              <div class="collapsible-body">
                              <p>{val.id}</p>
                              <p>{val.name}</p>
                              <p>{val.email}</p>
                              <p>{val.config_bool}</p>
                              <p>{val.timer_integer}</p>
                              <p>{val.flags}</p>
                              <p>{val.activate_date}</p>
                              <p>{val.update_date}</p>
                              <p>{val.timestamp}</p>
                              </div>
                           </li>
                        );
                     })}

                  </ul>
               </div>

            }


         </div>
      );
   }

}

export default HistoryLog;