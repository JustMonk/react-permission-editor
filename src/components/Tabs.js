import React from 'react';
import M from 'materialize-css';
import EditorForm from './EditorForm';
import HistoryLog from './HistoryLog';

class Tabs extends React.Component {

   componentDidMount() {
      M.Tabs.init(document.querySelector('.tabs'), {});
   }

   render() {
      return (
         <div class="row outside-wrapper">

            <div class="col s8">
               <ul class="tabs">
                  <li class="tab col s3"><a href="#editor-wrapper">Редактирование</a></li>
                  <li class="tab col s3"><a href="#history-wrapper">История (1)</a></li>
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