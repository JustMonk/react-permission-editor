import React from 'react';
import M from 'materialize-css';
import DatePicker from './DatePicker';
import Range from './Range';
import SwitchList from './SwitchList';

class EditorForm extends React.Component {

   constructor(props) {
      super(props);
      this.state = {};
      //userData = {};
      this.getUserData = this.getUserData.bind(this);
      this.cancelChanges = this.cancelChanges.bind(this);
   }

   componentDidUpdate() {
      //reset placeholders
      M.updateTextFields();
      //fix range
      M.Range.init(document.querySelectorAll("input[type=range]"));

      //tooltips
      M.Tooltip.init(document.querySelectorAll('.title-icon'), {position: 'top'});
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

   cancelChanges() {
      this.setState({serverData: null});
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
                              <input id="first_name" value={this.state.serverData.name} placeholder="Введите имя пользователя" type="text" class="validate"></input>
                              <label for="first_name">Имя</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="last_name" value={this.state.serverData.email} placeholder="Введите адрес электронной почты" type="text" class="validate"></input>
                              <label for="last_name">Эл.почта</label>
                           </div>
                        </div>

                        <div className="input-title"><i class="material-icons title-icon" data-tooltip="Право редактировать настройки, передается в «config_bool»">help_outline</i>Особые разрешения:</div>
                        <div class="row">
                           <div className="input-field col s12">
                              <div class="switch">
                                 Доступ к конфигуратору
                              <label>
                                    <input id="config_bool" type="checkbox"></input>
                                    <span class="lever"></span>
                                 </label>
                              </div>
                           </div>
                        </div>


                        <div className="input-title"><i class="material-icons title-icon" data-tooltip="Передвигайте ползунок для установки значения">help_outline</i>Настройка таймера:</div>
                        <div className="row">
                           <div class="input-field col s12">
                              <Range min="100" max="1000" default={this.state.serverData.timer_integer} />
                           </div>
                        </div>


                        <div className="input-title"><i class="material-icons title-icon" data-tooltip="Выберите нужную дату, нажав на календарь, либо отредактируйте строку. Все даты заранее преобразованы к удобному для чтения виду">help_outline</i>Настройка времени:</div>
                        <div class="row">
                           <DatePicker id="activate_date" label="Дата активации" default={this.state.serverData.dateactivate} colSize="6" />
                           <DatePicker id="update_date" label="Дата обновления" default={this.state.serverData.dateupdate} colSize="6" />
                        </div>



                        <div className="input-title"><i class="material-icons title-icon" data-tooltip="Редактируйте список для предоставления или ограничения доступа">help_outline</i>Настройка доступа:</div>
                        <div className="row">
                           <div class="input-field col s12">

                              <SwitchList flags={this.state.serverData.flags} />

                           </div>
                        </div>


                        <div className="form-action">
                           <a class="waves-effect waves-light btn-large">Сохранить</a>
                           <a class="waves-effect waves-grey btn-flat btn-large white" onClick={this.cancelChanges}>Отменить изменения</a>
                        </div>
                     </form>
                  </div>
               </div>
            }


         </div>
      );
   }

}

export default EditorForm;