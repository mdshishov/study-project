import * as basic from './basic.js';
import state from './state.js'

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
  const [tdCreatedAtDate, tdCreatedAtTime] = basic.formatDate(clientData.createdAt).split;
  tdCreatedAt.textContent = tdCreatedAtDate;
  const tdCreatedAtSpan = document.createElement('span');
  tdCreatedAtSpan.classList.add('text-grey-color');
  tdCreatedAtSpan.textContent = tdCreatedAtTime;
  tdCreatedAt.append(tdCreatedAtSpan);

  const tdUpdatedAt = document.createElement('td');
  tdUpdatedAt.classList.add('table__cell', 'table__cell_body', 'table__cell_body_updated-at');
  const [tdUpdatedAtDate, tdUpdatedAtTime] = basic.formatDate(clientData.createdAt).split;
  tdUpdatedAt.textContent = tdUpdatedAtDate;
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
  }

  const tdActions = document.createElement('td');
  tdActions.classList.add('table__cell', 'table__cell_body', 'table__cell_body_actions');
  const actions = document.createElement('div');
  tdActions.append(actions);
  actions.classList.add('table__actions');

  const actionEdit = document.createElement('button');
  actionEdit.classList.add('table__action-button', 'table__action-button_edit', 'button_with-icon');
  actionEdit.setAttribute('data-clientId', clientData.id);
  actionEdit.addEventListener('click', () => {
    //ФУНКЦИЯ ИЗМЕНЕНИЯ КЛИЕНТА
  });
  actions.append(actionEdit);

  const actionDelete = document.createElement('button');
  actionDelete.classList.add('table__action-button', 'table__action-button_delete', 'button_with-icon');
  actionDelete.setAttribute('data-clientId', clientData.id);
  actionDelete.addEventListener('click', () => {
    //ФУНКЦИЯ УДАЛЕНИЯ КЛИЕНТА
  });
  actions.append(actionDelete);

  tr.append(tdId, tdName, tdCreatedAt, tdUpdatedAt, tdContacts, tdActions);
  return tr;
}

//Показывает все контакты пользователя
function showAllContacts(event) {
  const button = event.target.closest('[data-element-contactsButton]');
  button.hidden = true;
  const contactsContainer = button.closest('[data-element-tableContacts]');
  const contacts = state().clients.filter(({ id }) => id === contactsContainer.dataset.clientid)[0].contacts;
  contacts.slice(4).forEach(({ type, value }) => {
    const contact = document.createElement('div');
    contact.classList.add('table__contact');
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

//Показ подсказки при наведении на контакт
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
