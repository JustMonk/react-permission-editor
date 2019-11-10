import React from 'react';
import M from 'materialize-css';
import DatePicker from './DatePicker';
import Range from './Range';
import SwitchList from './SwitchList';
import SaveScreen from './SaveScreen';
import firebase from './firebase-config';

class EditorForm extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         isSaved: false,
         savedData: null
      };
      //userData = {};
      this.getUserData = this.getUserData.bind(this);
      this.cancelChanges = this.cancelChanges.bind(this);
      this.applyChanges = this.applyChanges.bind(this);
   }

   componentDidMount() {
      var historyRef = firebase.database().ref('history');
      historyRef.on('value', (snapshot) => {
         console.log(snapshot.val())
         if (!snapshot.val()) return;
         this.setState({ history: Object.values(snapshot.val()) });
      });
   }

   componentDidUpdate() {
      //reset placeholders
      M.updateTextFields();
      //fix range
      M.Range.init(document.querySelectorAll("input[type=range]"));

      //tooltips
      M.Tooltip.init(document.querySelectorAll('.title-icon'), { position: 'top' });
   }

   async getUserData() {
      try {
         let response = await fetch('https://raw.githubusercontent.com/JustMonk/react-permission-editor/json/data.json');
         let userData = await response.json();
         console.log(userData);
         this.setState({ serverData: userData });
      } catch (e) {
         console.log(e);
      }
   }

   insertToDatabase(obj) {
      /*пушим :)*/
      let newPostKey = firebase.database().ref().child('history').push().key;
      firebase.database().ref('history/' + newPostKey).set({
         id: obj.id,
         name: obj.name,
         email: obj.email,
         config_bool: obj.config_bool,
         timer_integer: obj.timer_integer,
         flags: obj.flags,
         activate_date: obj.activate_date,
         update_date: obj.update_date,
         timestamp: Date.now()
      });
  }

   cancelChanges() {
      this.setState({ serverData: null });
      this.setState({ isSaved: false });
   }

   applyChanges() {
      //флаг
      let isValid = true;

      let responseObj = { id: this.state.serverData.id };

      responseObj.name = document.getElementById('user_name').value;

      responseObj.email = document.getElementById('user_email').value;
      let regExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!regExp.test(responseObj.email)) {
         isValid = false;
         document.getElementById('user_email').classList.add('invalid');
      }

      responseObj.config_bool = document.getElementById('config_bool').checked ? '1' : '0';

      responseObj.timer_integer = document.getElementById('timer_range').value;
      if (responseObj.timer_integer < 100 || responseObj.timer_integer > 1000) isValid = false;

      responseObj.flags = [];
      let tableBody = document.getElementById('flag_list').querySelector('table').tBodies[0];
      tableBody.querySelectorAll('tr').forEach(val => {
         responseObj.flags.push(val.querySelector('input').checked ? '1' : '0')
      });

      let userInputDate = new Date(document.getElementById('activate_date').value + ' GMT');
      try {
         if (new Date(document.getElementById('activate_date').value) < new Date()) throw new Error();
         responseObj.activate_date = userInputDate.toISOString().split('.')[0] + "Z"; //cut ms
      } catch (e) {
         isValid = false;
         document.getElementById('activate_date').classList.add('invalid');
      }

      userInputDate = new Date(document.getElementById('update_date').value + ' GMT');
      try {
         let iso = userInputDate.toISOString();
         responseObj.update_date = `${iso.split('T')[0]} ${iso.split('T')[1].slice(0, 8)}`;
      } catch (e) {
         isValid = false;
         document.getElementById('update_date').classList.add('invalid');
      }

      if (isValid) {
         this.setState({ savedData: JSON.stringify(responseObj)});
         this.setState({ isSaved: true });
         this.insertToDatabase(responseObj);
      } else {
         M.toast({ html: 'Пожалуйста проверьте введенные данные!' });
      }
   }

   showCurrentForm() {
      if (this.state.isSaved) {
         return (
            <SaveScreen data={this.state.savedData} returnAction={this.cancelChanges} />
         );
      } else {
         return (
            <div id="editor-form">

               <div class="row outside-wrapper">
                  <form class="col s12">

                     <div className="input-title"><i class="material-icons title-icon" data-tooltip="Информация, недоступная для редактирования">help_outline</i>Служебные данные:</div>
                     <div class="row">
                        <div class="input-field col s12">
                           <input disabled value={this.state.serverData.id} id="disabled" type="text" class="validate"></input>
                           <label for="disabled">Идентификатор</label>
                        </div>
                     </div>


                     <div className="input-title"><i class="material-icons title-icon" data-tooltip="Данные пользователя, которые можно изменить">help_outline</i>Личные данные:</div>
                     <div class="row">
                        <div class="input-field col s6">
                           <input id="user_name" defaultValue={this.state.serverData.name} placeholder="Введите имя пользователя" type="text" class="validate"></input>
                           <label for="user_name">Имя</label>
                        </div>
                        <div class="input-field col s6">
                           <input id="user_email" defaultValue={this.state.serverData.email} placeholder="Введите адрес электронной почты" type="text" class="validate"></input>
                           <label for="user_email">Эл.почта</label>
                        </div>
                     </div>

                     <div className="input-title"><i class="material-icons title-icon" data-tooltip="Право редактировать настройки, передается в «config_bool»">help_outline</i>Особые разрешения:</div>
                     <div class="row">
                        <div className="input-field col s12">
                           <div class="switch">
                              Доступ к конфигуратору
                              <label>
                                 {+this.state.serverData.config_bool ? <input id="config_bool" defaultChecked type="checkbox"></input> : <input id="config_bool" type="checkbox"></input>}
                                 <span class="lever"></span>
                              </label>
                           </div>
                        </div>
                     </div>


                     <div className="input-title"><i class="material-icons title-icon" data-tooltip="Передвигайте ползунок для установки значения">help_outline</i>Настройка таймера:</div>
                     <div className="row">
                        <div class="input-field col s12">
                           <Range id="timer_range" min="100" max="1000" default={this.state.serverData.timer_integer} />
                        </div>
                     </div>


                     <div className="input-title"><i class="material-icons title-icon" data-tooltip="Выберите нужную дату, нажав на календарь, либо отредактируйте строку. Часовой пояс по умолчанию GMT +0">help_outline</i>Настройка времени:</div>
                     <div class="row">
                        <DatePicker key={1} id="activate_date" label="Дата активации" default={this.state.serverData.dateactivate} minDate={new Date()} colSize="6" type={"GMT"} />
                        <DatePicker key={2} id="update_date" label="Дата обновления" default={this.state.serverData.dateupdate} minDate={null} colSize="6" />
                     </div>



                     <div className="input-title"><i class="material-icons title-icon" data-tooltip="Редактируйте список для предоставления или ограничения доступа">help_outline</i>Настройка доступа:</div>
                     <div className="row">
                        <div class="input-field col s12">

                           <SwitchList id="flag_list" flags={this.state.serverData.flags} />

                        </div>
                     </div>


                     <div className="form-action">
                        <a class="waves-effect waves-light btn-large" onClick={this.applyChanges}>Сохранить</a>
                        <a class="waves-effect waves-grey btn-flat btn-large white" onClick={this.cancelChanges}>Отменить изменения</a>
                     </div>
                  </form>
               </div>
            </div>
         );
      }

   }

   render() {
      return (
         <div class="row outside-wrapper">

            {!this.state.serverData ?

               <div id="get-user" className="action-message">

                  <h5>Шаг 1: загрузите данные пользователя</h5>
                  <a class="waves-effect waves-light btn-large" id="start-button" onClick={this.getUserData}>Начать работу</a>

               </div>

               :
               this.showCurrentForm()
            }

         </div>
      );
   }

}

export default EditorForm;