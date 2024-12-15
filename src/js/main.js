import * as basic from './basic.js';
import * as modal from './modal.js';
import state from './state.js';

let ckients = [];

document.addEventListener('DOMContentLoaded', () => {

  // делаем запрос на сервер
  // рисуем таблицу
  // показываем кнопку
  
  //Добавляем функционал кнопкам сортировки
  const tableHeader = document.getElementById('table-header');
  tableHeader.querySelectorAll('[data-element-sortButton]').forEach((button) => {
    button.addEventListener('click', handleSortButton);
  })

  const addClientButton = document.getElementById('add-client-button');
  addClientButton.hidden = false;
  addClientButton.addEventListener('click', modal.handleOpenAddClientModal);

  document.body.querySelectorAll('[data-element-contact]').forEach((contact) => {
    contact.addEventListener('mouseover', showContactTooltip);
    contact.addEventListener('mouseout', hideContactTooltip);
  })
});

//Обновляет визуал кнопок сортировки в зависимости от объекта сортировки
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

//Обрабатывает нажатие на кнопку сортировки
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
  //сортируем клиетов
  //перерисовываем таблицу
}

