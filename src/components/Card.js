import React from 'react';
import M from 'materialize-css';
import Tabs from './Tabs';

class Card extends React.Component {

   render() {
      return (
         <div className="card-wrapper container">
            <div class="card-panel white">
               <h5>Настройка полномочий пользователя</h5>

               <Tabs />

            </div>
         </div>
      );
   }

}

export default Card;