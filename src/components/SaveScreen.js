import React from 'react';
import M from 'materialize-css';

class SaveScreen extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         json: this.props.data
      };
      this.copyInClipboard = this.copyInClipboard.bind(this);
      this.saveFile = this.saveFile.bind(this);
   }

   saveFile() {
      var file = new Blob([this.state.json], { type: 'application/json' });
      if (window.navigator.msSaveOrOpenBlob)
         window.navigator.msSaveOrOpenBlob(file, "response.json");
      else { //legasy
         var a = document.createElement("a"),
            url = URL.createObjectURL(file);
         a.href = url;
         a.download = "response.json";
         document.body.appendChild(a);
         a.click();
         setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
         }, 0);
      }
   }

   copyInClipboard() {
      navigator.clipboard.writeText(this.state.json).then(function () {
         M.toast({ html: 'Готово!' });
      }, function (err) {
         M.toast({ html: 'Не удалось скопировать!' });
      });
   }

   formatData(json) {
      let obj = JSON.parse(json);
      let formatted = [];
      for (let key in obj) {
         if (Array.isArray(obj[key])) {
            formatted.push(<p key={formatted.length} className="syntax-new-line">"<span className="syntax-key">{key}</span>": [{obj[key].map(val => typeof (val) == "number" ? `${val}` : `"${val}"`).join(',')}],</p>);
            continue;
         }
         formatted.push(<p key={formatted.length} className="syntax-new-line">"<span className="syntax-key">{key}</span>": {typeof (obj[key]) == 'number' ? <span className="syntax-number">{obj[key]}</span> : <span className="syntax-string">"{obj[key]}"</span>}
            {formatted.length + 1 === Object.keys(obj).length ? "" : ","}</p>);
      }

      return (
         <div>
            <p>{"{"}</p>
            {formatted}
            <p>{"}"}</p>
         </div>
      );
   }

   render() {
      return (
         <div className="save-screen-wrapper fadeIn">

            <a className="return-button" onClick={this.props.returnAction}><i className="material-icons">arrow_back</i>Вернуться</a>

            <div className="card-panel teal z-depth-0">
               <span className="white-text">Изменения опубликованы!</span>
            </div>

            <h6>Данные в запросе:</h6>

            <pre>
               <code>{this.formatData(this.props.data)}</code>
            </pre>

            <h5 className="continue-header">Продолжить работу?</h5>
            <div className="save-action">
               <a className="waves-effect waves-light btn-large blue" onClick={this.copyInClipboard}><i className="material-icons">file_copy</i>Скопировать</a>
               <span>или</span>
               <a className="waves-effect waves-light btn-large indigo" onClick={this.saveFile}><i className="material-icons">cloud_download</i>Сохранить</a>
            </div>

         </div>
      );
   }

}

export default SaveScreen;