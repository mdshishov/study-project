import * as basic from './basic.js';
import * as modal from './modal.js';
import state from './state.js';
import * as table from './table.js';

document.addEventListener('DOMContentLoaded', () => {
  // Обновляем таблицу (внутри уже есть запрос на сервер)
  table.updateTable();

  //Добавляем функционал кнопкам сортировки
  const tableHeader = document.getElementById('table-header');
  tableHeader.querySelectorAll('[data-element-sortButton]').forEach((button) => {
    button.addEventListener('click', table.handleSortButton);
  })

  // Добавляем функционал кнопки добавления клиента
  const addClientButton = document.getElementById('add-client-button');
  addClientButton.addEventListener('click', modal.handleOpenAddClientModal);
});



