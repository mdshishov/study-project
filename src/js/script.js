import * as basic from './basic.js';
import * as modal from './modal.js';
import state from './state.js';

let ckients = [];

document.addEventListener('DOMContentLoaded', () => {

  // делаем запрос на сервер
  // рисуем таблицу
  // показываем кнопку

  const addClientButton = document.getElementById('add-client-button');
  addClientButton.hidden = false;
  addClientButton.addEventListener('click', modal.handleOpenAddClientModal);
  
  const tableHeader = document.getElementById('table-header');
  tableHeader.querySelectorAll('[data-element-sortButton]').forEach((button) => {
    button.addEventListener('click', handleSortButton);
  })
});

// кликае на кнопку соритировки
// изменяем объект
// обновляем ативность в соостествии с объектом
// ерерисовываем таблицу

function updateSortButtons(sortState) {
  const { active, directions } = sortState;
  const header = document.getElementById('table-header');

  const buttons = header.querySelectorAll('[data-element-sortButton]');
  buttons.forEach((button) => {
    if (button.dataset.sortfield === active) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
    button.dataset.sortdirection = directions[button.dataset.sortfield];
  });
}

function handleSortButton(event) {
  const button = event.target.closest('[data-element-sortButton]');
  const sortField = button.dataset.sortfield;
  if (sortField === state().sortState.active) {
    const currDirection = state().sortState.directions[sortField];
    state().sortState.directions[sortField] = currDirection === '0' ? '1' : '0';
  } else {
    state().sortState.active = sortField;
  }
  updateSortButtons(state().sortState);
}


