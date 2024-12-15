import * as basic from './basic.js';
import * as modal from './modal.js';
import state from './state.js';
import * as table from './table.js';

let ckients = [];

document.addEventListener('DOMContentLoaded', () => {

  table.updateTable();

  // делаем запрос на сервер
  // рисуем таблицу
  // показываем кнопку
  
  //Добавляем функционал кнопкам сортировки
  const tableHeader = document.getElementById('table-header');
  tableHeader.querySelectorAll('[data-element-sortButton]').forEach((button) => {
    button.addEventListener('click', table.handleSortButton);
  })

  const addClientButton = document.getElementById('add-client-button');
  addClientButton.hidden = false;
  addClientButton.addEventListener('click', modal.handleOpenAddClientModal);

  document.body.querySelectorAll('[data-element-contact]').forEach((contact) => {
    contact.addEventListener('mouseover', showContactTooltip);
    contact.addEventListener('mouseout', hideContactTooltip);
  })
});



