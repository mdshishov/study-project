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

  document.body.querySelectorAll('[data-element-contact]').forEach((contact) => {
    contact.addEventListener('mouseover', showContactTooltip);
    contact.addEventListener('mouseout', hideContactTooltip);
  })
});

//Обновляет визуал кнопок в зависимости от объекта сортировки
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

//Обрабатыает нажатие на кнопку сортировки
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

//Создаёт тело таблицы
function createTableBody(data) {
  return tbody;
}

function showContactTooltip(event) {
  const contact = event.target.closest('[data-element-contact]');
  const contactType = contact.dataset.contacttype;
  const contactValue = contact.dataset.contactvalue;

  const tooltip = document.createElement('div');
  tooltip.classList.add('contact-tooltip');
  tooltip.setAttribute('data-element-contactTooltip', '');

  const tooltipText = document.createElement('div');
  tooltipText.classList.add('contact-tooltip__text');
  const text = document.createTextNode(`${contactType}: `);
  const boldText = document.createElement('span');
  boldText.classList.add('text-bold');
  boldText.textContent = contactValue;
  tooltipText.append(text, boldText);

  const triangle = document.createElement('div');
  triangle.classList.add('contact-tooltip__triangle');

  tooltip.append(tooltipText, triangle);
  contact.append(tooltip);
}
function hideContactTooltip(event) {
  const contact = event.target.closest('[data-element-contact]');
  const tooltip = contact.querySelector('[data-element-contactTooltip]');
  tooltip.remove();
}


