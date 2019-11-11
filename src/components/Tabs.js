import React from 'react';
import M from 'materialize-css';
import EditorForm from './EditorForm';
import HistoryLog from './HistoryLog';
import firebase from './firebase-config';

//TEMP FOR TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import SaveScreen from './SaveScreen';

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
         this.setState({ historyRecords: Object.values(snapshot.val()).length ? Object.values(snapshot.val()).length : 0 });
      });
   }

   render() {
      return (
         <div class="row outside-wrapper">

            <div class="col s8">
               <ul class="tabs">
                  <li class="tab col s3"><a href="#editor-wrapper">Редактор</a></li>
                  <li class="tab col s3"><a href="#history-wrapper">История ({this.state.historyRecords})</a></li>
               </ul>
            </div>

            <div id="editor-wrapper" class="col s12">
               <EditorForm />
            </div>

            <div id="history-wrapper" class="col s12">
               <HistoryLog />
            </div>

         </div>
      );
   }

}

export default Tabs;