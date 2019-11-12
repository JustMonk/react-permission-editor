import React from 'react';
import M from 'materialize-css';
import firebase from './firebase-config';

class HistoryLog extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         history: [] //array of object
      };
   }

   componentDidMount() {
      var historyRef = firebase.database().ref('history');
      historyRef.on('value', (snapshot) => {
         if (!snapshot.val()) return;
         this.setState({ history: Object.values(snapshot.val()) });
      });
      var instances = M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
   }

   componentDidUpdate() {
      var instances = M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
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
                           <li key={`${val.timestamp}`}>
                              <div class="collapsible-header"><i class="material-icons">filter_drama</i>{i}) ID:{val.id} TIMESTAMP:{val.timestamp}</div>
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