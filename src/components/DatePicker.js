import React from 'react';
import M from 'materialize-css';

class DatePicker extends React.Component {

   constructor(props) {
      super(props);
      let locale = {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit',
         timeZoneName: 'short'
      };
      this.state = {
         localeSettings: locale,
         defaultDate: new Date(this.props.default).toLocaleDateString('ru-RU', locale)
      };
   }

   datePickerInit() {

      let localeSettings = this.state.localeSettings;

      //date
      M.Datepicker.init(document.querySelectorAll('.input-date-picker'), {
         onSelect: function (date) {
            console.log(date);
            //если есть атрибут ISO, то вызываем ISOшный метод
            console.log(this.date);
            let selectedDate = this.date;

            selectedDate.setHours(0);
            selectedDate.setMinutes(0);
            selectedDate.setSeconds(0);

            console.log(selectedDate);
            this.el.parentElement.querySelector('input').value = selectedDate.toLocaleDateString('ru-RU', localeSettings);;
         },
         onClose: function () {
            let timePick = M.Timepicker.init(this.el, {
               twelveHour: false,
               onCloseStart: () => {
                  console.log(this);
                  this.addTime = function (timeStr) {
                     let selectedDate = new Date(this.date);
                     let timeArr = timeStr.split(':');

                     selectedDate.setHours(timeArr[0]);
                     selectedDate.setMinutes(timeArr[1]);
                     selectedDate.setSeconds(timeArr[2]);

                     this.el.parentElement.querySelector('input').value = selectedDate.toLocaleDateString('ru-RU', localeSettings);
                  }
                  this.addTime(timePick.time ? timePick.time + ':00' : '');
                  timePick.destroy();
               }
            });
            timePick.open();
         },
         i18n: {
            months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Авгус','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            monthsShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
            weekdays: ['Воскресеньк','Понедельник','Вторник','Среда','Черверг','Пятница','Суббота'],
            weekdaysShort: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            weekdaysAbbrev: ['В','П','В','С','Ч','П','С']
         }
         
      });
   }

   componentDidMount() {
      //reset placeholders
      M.updateTextFields();
      //reinit
      this.datePickerInit();
   }

   componentDidUpdate() {
      //reset placeholders
      M.updateTextFields();
      //reinit
      this.datePickerInit();
   }

   render() {
      return (
         <div class={'input-field col s' + this.props.colSize}>
            <input id={this.props.id} type="text" placeholder="введите или выберите дату" class="validate" defaultValue={this.state.defaultDate}></input>
            <label for={this.props.id}>{this.props.label}</label>
            <i class="material-icons input-date-picker">calendar_today</i>
         </div>
      );
   }

}

export default DatePicker;