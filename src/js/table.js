import * as basic from './basic.js';
import * as modal from './modal.js';
import state from './state.js'

// --- Таблица ---
// Обновляет таблицу на странице
export async function updateTable() {
  const table = document.getElementById('table');
  const tbody = document.getElementById('table-body');
  const thead = document.getElementById('table-header');
  const searchInput = document.getElementById('search-input');
  const addClientButton = document.getElementById('add-client-button');
  const tableLoadScreen = document.getElementById('table-load-screen');

  thead.classList.add('loading');
  if (tbody) {
    tbody.remove();
  }

  tableLoadScreen.hidden = false;
  addClientButton.hidden = true;

  const search = searchInput.value.trim();
  try {
    const response = await fetch(`http://localhost:3000/api/clients${search.length > 0 ? `?search=${encodeURIComponent(search)}` : '' }`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if ( !response.ok ) {
      basic.showError();
      throw new Error(`Ошибка ${response.status}: ${response.statusText}.`);
      return;
    }
    state().clients = await response.json();
  } catch(error) {
    basic.showError();
    throw error;
    return;
  }

  state().sortClients();
  const newTbody = createTableBody(state().clients);

  tableLoadScreen.hidden = true;
  table.append(newTbody);
  addClientButton.hidden = false;
  thead.classList.remove('loading');
}

// Создаёт тело таблицы
function createTableBody(data = []) {
  const tbody = document.createElement('tbody');
  tbody.id = 'table-body';
  tbody.classList.add = 'table__body';

  data.forEach((clientData) => {
    const tr = createTableRow(clientData);
    tbody.append(tr);
  })

  return tbody;
}

// Создаёт строку таблицы
function createTableRow(clientData) {
  const tr = document.createElement('tr');
  tr.classList.add('table__row', 'table__row_body');

  const tdId = document.createElement('td');
  tdId.classList.add('table__cell', 'table__cell_body', 'table__cell_body_id');
  tdId.textContent = clientData.id;

  const tdName = document.createElement('td');
  tdName.classList.add('table__cell', 'table__cell_body', 'table__cell_body_name');
  tdName.textContent = `${clientData.surname} ${clientData.name} ${clientData.lastName}`;

  const tdCreatedAt = document.createElement('td');
  tdCreatedAt.classList.add('table__cell', 'table__cell_body', 'table__cell_body_created-at');
  const [tdCreatedAtDate, tdCreatedAtTime] = basic.formatDate(clientData.createdAt).split(' ');
  tdCreatedAt.textContent = tdCreatedAtDate + ' ';
  const tdCreatedAtSpan = document.createElement('span');
  tdCreatedAtSpan.classList.add('text-grey-color');
  tdCreatedAtSpan.textContent = tdCreatedAtTime;
  tdCreatedAt.append(tdCreatedAtSpan);

  const tdUpdatedAt = document.createElement('td');
  tdUpdatedAt.classList.add('table__cell', 'table__cell_body', 'table__cell_body_updated-at');
  const [tdUpdatedAtDate, tdUpdatedAtTime] = basic.formatDate(clientData.createdAt).split(' ');
  tdUpdatedAt.textContent = tdUpdatedAtDate + ' ';
  const tdUpdatedAtSpan = document.createElement('span');
  tdUpdatedAtSpan.classList.add('text-grey-color');
  tdUpdatedAtSpan.textContent = tdUpdatedAtTime;
  tdUpdatedAt.append(tdUpdatedAtSpan);

  const tdContacts = document.createElement('td');
  tdContacts.classList.add('table__cell', 'table__cell_body', 'table__cell_body_contacts');
  const contacts = document.createElement('div');
  tdContacts.append(contacts);
  contacts.classList.add('table__contacts');
  contacts.setAttribute('data-element-tableContacts', '');
  contacts.setAttribute('data-clientId', clientData.id);

  let contactsToDraw;
  if (clientData.contacts.length > 5) {
    contactsToDraw = clientData.contacts.slice(0, 4);
  } else {
    contactsToDraw = clientData.contacts;
  }
  contactsToDraw.forEach(({ type, value }) => {
    const contact = document.createElement('div');
    contact.classList.add('table__contact');
    contact.setAttribute('data-element-contact', '');
    contact.setAttribute('data-contactType', type);
    contact.setAttribute('data-contactValue', value);
    contact.addEventListener('mouseover', showContactTooltip);
    contact.addEventListener('mouseout', hideContactTooltip);
    contacts.append(contact);
  })

  if (clientData.contacts.length > 5) {
    const contactsButton = document.createElement('button');
    contactsButton.classList.add('table__contacts__button');
    contactsButton.setAttribute('data-element-contactsButton', '');
    contactsButton.textContent = `+${clientData.contacts.length - 4}`;
    contactsButton.addEventListener('click', showAllContacts);
    contacts.append(contactsButton);
  }

  const tdActions = document.createElement('td');
  tdActions.classList.add('table__cell', 'table__cell_body', 'table__cell_body_actions');
  const actions = document.createElement('div');
  tdActions.append(actions);
  actions.classList.add('table__actions');

  const actionEdit = document.createElement('button');
  actionEdit.classList.add('table__action-button', 'table__action-button_edit', 'button_with-icon');
  actionEdit.setAttribute('data-element-clientAction', '');
  actionEdit.setAttribute('data-clientId', clientData.id);
  const actionEditSpan = document.createElement('span');
  actionEditSpan.textContent = 'Изменить';
  actionEdit.append(actionEditSpan);
  actionEdit.addEventListener('click', modal.handleOpenEditClientModal);
  actions.append(actionEdit);

  const actionDelete = document.createElement('button');
  actionDelete.classList.add('table__action-button', 'table__action-button_delete', 'button_with-icon');
  actionDelete.setAttribute('data-element-clientAction', '');
  actionDelete.setAttribute('data-clientId', clientData.id);
  const actionDeleteSpan = document.createElement('span');
  actionDeleteSpan.textContent = 'Удалить';
  actionDelete.append(actionDeleteSpan);
  actionDelete.addEventListener('click', modal.handleOpenDeleteClientModalFromTable);
  actions.append(actionDelete);

  tr.append(tdId, tdName, tdCreatedAt, tdUpdatedAt, tdContacts, tdActions);
  return tr;
}

// --- Контакты пользователя ---
//Показывает все контакты пользователя
function showAllContacts(event) {
  const button = event.target.closest('[data-element-contactsButton]');
  button.hidden = true;
  const contactsContainer = button.closest('[data-element-tableContacts]');
  const contacts = state().clients.find(({ id }) => id === contactsContainer.dataset.clientid).contacts;
  contacts.slice(4).forEach(({ type, value }) => {
    const contact = document.createElement('div');
    contact.classList.add('table__contact');
    contact.setAttribute('data-element-contact', '');
    contact.setAttribute('data-contactType', type);
    contact.setAttribute('data-contactValue', value);
    contact.addEventListener('mouseover', showContactTooltip);
    contact.addEventListener('mouseout', hideContactTooltip);
    contactsContainer.append(contact);
  })
  setTimeout(() => {
    button.remove();
  }, 0);
}

// Показывает подсказку при наведении на контакт
function showContactTooltip(event) {
  const contact = event.target.closest('[data-element-contact]');
  const contactType = state().contactTypes[contact.dataset.contacttype];
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

// --- Кнопки сортировки ---
// Обрабатывает нажатие на кнопку сортировки
export function handleSortButton(event) {
  const button = event.target.closest('[data-element-sortButton]');
  const sortField = button.dataset.sortfield;
  if (sortField === state().sortState.active) {
    const currDirection = state().sortState.directions[sortField];
    state().sortState.directions[sortField] = currDirection === '0' ? '1' : '0';
  } else {
    state().sortState.active = sortField;
  }

  updateSortButtons(state().sortState);
  state().sortClients();

  const tbody = document.getElementById('table-body');
  if (tbody) {
    const newTbody = createTableBody(state().clients);
    tbody.parentNode.replaceChild(newTbody, tbody);
  }
}

// Обновляет визуал кнопок сортировки в зависимости от объекта сортировки
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
