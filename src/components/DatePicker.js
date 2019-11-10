import React from 'react';
import M from 'materialize-css';

class DatePicker extends React.Component {

   constructor(props) {
      super(props);
      this.pickerRef = React.createRef();
      this.state = {
         defaultDate: this.dateView(this.props.default),
         minDate: this.props.minDate ? this.props.minDate : null,
         currentDate: null,
         currentTime: null
      };
      this.dateView = this.dateView.bind(this);
   }

   datePickerInit() {
      //контекст
      let dateView = this.dateView;

      //M.Datepicker.init(document.querySelectorAll('.input-date-picker'), {
      M.Datepicker.init(this.pickerRef.current, {
         defaultDate: new Date(),
         firstDay: 1,
         minDate: this.state.minDate,
         onSelect: function (date) {
            let selectedDate = this.date;

            selectedDate.setHours(0);
            selectedDate.setMinutes(0);
            selectedDate.setSeconds(0);

            this.el.parentElement.querySelector('input').value = dateView(selectedDate);
         },
         onClose: function () {
            if (!this.date) return;
            let timePick = M.Timepicker.init(this.el, {
               twelveHour: false,
               onCloseStart: () => {
                  if (!timePick.time) {
                     timePick.destroy();
                     return;
                  }
                  this.addTime = function (timeStr) {
                     let selectedDate = new Date(this.date);
                     let timeArr = timeStr.split(':');

                     selectedDate.setHours(timeArr[0]);
                     selectedDate.setMinutes(timeArr[1]);
                     selectedDate.setSeconds(timeArr[2]);

                     this.el.parentElement.querySelector('input').value = dateView(selectedDate);
                  }
                  this.addTime(timePick.time ? timePick.time + ':00' : '');
                  timePick.destroy();
               }
            });
            timePick.open();
         },
         i18n: {
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Авгус', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            weekdays: ['Воскресеньк', 'Понедельник', 'Вторник', 'Среда', 'Черверг', 'Пятница', 'Суббота'],
            weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekdaysAbbrev: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'],
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
   }

   dateView(date) {
      let utcStr;

      if (this.props.type === "GMT" && typeof(date) === 'string') {
         utcStr = date;
      } else {
         let dateObj = new Date(date);
         utcStr = new Date(`${dateObj.toDateString()} ${dateObj.toTimeString().slice(0, 8)} GMT`).toISOString();
      }

      let userDate = utcStr.split('T')[0];
      //userDate = `${userDate.split('-')[2]}.${userDate.split('-')[1]}.${userDate.split('-')[0]}`;

      let userTime = utcStr.split('T')[1];
      userTime = userTime.slice(0, 8);

      return `${userDate}, ${userTime}`;
   }

   render() {
      return (
         <div class={'input-field col s' + this.props.colSize}>
            <input id={this.props.id} type="text" placeholder="введите или выберите дату" class="validate" defaultValue={this.state.defaultDate}></input>
            <label for={this.props.id}>{this.props.label}</label>
            <i class="material-icons input-date-picker" ref={this.pickerRef}>calendar_today</i>
         </div>
      );
   }

}

export default DatePicker;