import * as basic from './basic.js';
import * as modal from './modal.js';

document.addEventListener('DOMContentLoaded', () => {

  // делаем запрос на сервер
  // рисуем таблицу
  // показываем кнопку

  const addClientButton = document.getElementById('add-client-button');
  addClientButton.hidden = false;
  addClientButton.addEventListener('click', modal.handleOpenAddClientModal);
  
});


