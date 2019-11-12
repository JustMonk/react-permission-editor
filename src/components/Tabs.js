import React from 'react';
import M from 'materialize-css';
import EditorForm from './EditorForm';
import HistoryLog from './HistoryLog';
import firebase from './firebase-config';

class Tabs extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         historyRecords: 0
      };
   }

   componentDidMount() {
      M.Tabs.init(document.querySelector('.tabs'), {});

      var historyRef = firebase.database().ref('history');
      historyRef.on('value', (snapshot) => {
         if (!snapshot.val()) return;
         this.setState({ historyRecords: Object.values(snapshot.val()).length ? Object.values(snapshot.val()).length : 0 });
      });
   }

   render() {
      return (
         <div className="row outside-wrapper">

            <div className="col s8">
               <ul className="tabs">
                  <li className="tab col s3"><a href="#editor-wrapper">Редактор</a></li>
                  <li className="tab col s3"><a href="#history-wrapper">История ({this.state.historyRecords})</a></li>
               </ul>
            </div>

            <div id="editor-wrapper" className="col s12">
               <EditorForm />
            </div>

            <div id="history-wrapper" className="col s12">
               <HistoryLog />
            </div>

         </div>
      );
   }

}

export default Tabs;