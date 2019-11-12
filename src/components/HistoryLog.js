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
         this.setState({ history: Object.values(snapshot.val()).reverse() });
      });
      M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
   }

   componentDidUpdate() {
      M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
   }

   render() {
      return (

         <div className="row outside-wrapper fadeIn">

            {this.state.history.length < 1 ?
               <div id="empty-history" className="action-message">
                  <h5>На данный момент история пуста</h5>
                  <h6>Станьте первопроходцем :)</h6>
               </div>

               :

               <div className="expand-wrapper">

                  <ul className="collapsible">

                     {this.state.history.map((val, i) => {
                        return (
                           <li key={`${val.timestamp}`}>

                              <div className="collapsible-header">
                                 <i className="material-icons">history</i>
                                 <div className="history-expand">
                                 <span>Дата: {new Date(val.timestamp).toISOString()}</span>
                                 <span>ID: {val.id}</span>
                                 <span>Name: {val.name}</span>
                                 <span>Editor: admin</span>
                                 </div>
                              </div>

                              <div className="collapsible-body">
                                 <p>id: {val.id}</p>
                                 <p>name: {val.name}</p>
                                 <p>email: {val.email}</p>
                                 <p>config_bool: {val.config_bool}</p>
                                 <p>timer_integer: {val.timer_integer}</p>
                                 <p>flags: {val.flags}</p>
                                 <p>activate_date: {val.activate_date}</p>
                                 <p>update_date: {val.update_date}</p>
                                 <p>timestamp: {val.timestamp}</p>
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