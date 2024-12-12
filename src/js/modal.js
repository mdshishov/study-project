import * as basic from './basic.js';

function handleOpenAddClientModal() {
  openModal();
}

function handleOpenEditClientModal() {

}

function openModal(type = 'form', data = null) {
  const modal = document.createElement('div');
  modal.setAttribute('data-element-modal', '');
  modal.classList.add('modal');
  modal.addEventListener('click', handleCloseModal);

  let modalWindow
  switch (type) {
    case 'form':
      modalWindow = createFormWindow(data);
      document.addEventListener('click', hideContactInputSelectOptions);
      break;
    case 'delete':
      modalWindow = createDeleteWindow();
      break;
    default:
      showError();
      return;
      break;
  }

  modal.append(modalWindow);

  modal.classList.add('closed');
  modalWindow.classList.add('closed');
  document.body.append(modal);
  setTimeout(() => {
    modal.classList.remove('closed');
    modalWindow.classList.remove('closed');
  }, 0);
}

//Создание модального окна свопросом об удалении пользователя
function createDeleteWindow() {
  
}

//Создание модального окна с формой клиента
function createFormWindow(data = null) {
  const form = document.createElement('form');
  form.setAttribute('data-element-modalWindow', '');
  form.classList.add('modal__window');
  form.classList.add('form');

  const closeButton = document.createElement('button');
  closeButton.setAttribute('data-element-closeButton', '')
  closeButton.type = 'button';
  closeButton.classList.add('form__close-button');
  closeButton.addEventListener('click', handleCloseModal);
  form.append(closeButton);

  const nameInputsField = document.createElement('fieldset');
  nameInputsField.name = 'name-inputs';
  nameInputsField.classList.add('form__name-inputs');
  form.append(nameInputsField);

  const formHeader = document.createElement('h2');
  formHeader.classList.add('form__header');
  if (data) {
    const textNode = document.createTextNode('Изменить данные');
    const span = document.createElement('span');
    span.classList.add('header_text-light');
    span.textContent = `ID: ${data.id}`;
    formHeader.append(textNode, span);
  } else {
    formHeader.textContent = 'Новый клиент';
  }
  nameInputsField.append(formHeader);

  Object.entries({ name: 'Имя', surname: 'Фамилия', lastName: 'Отчество' }).forEach(([inputName, labelText]) => {
    const container = document.createElement('div');
    container.classList.add('form__name-input-content');

    const input = document.createElement('input');
    input.value = data ? data[inputName] : '';
    input.name = inputName;
    input.type = 'text';
    input.required = inputName !== 'lastName';
    input.classList.add('form__name-input');
    input.addEventListener('keypress', basic.keypressNoSpaces);
    input.addEventListener('input', controlInputLableSize);
    
    const label = document.createElement('label');
    label.setAttribute('data-element-nameInputLabel', '');
    label.classList.add('form__name-label');
    label.textContent = labelText;
    if (inputName !== 'lastName') {
      const span = document.createElement('span');
      span.classList.add('text-firm-color');
      span.textContent = '*';
      label.append(span);
    }

    const undrline = document.createElement('span');
    undrline.classList.add('form__name-input__underline');

    container.append(input, label, undrline);
    nameInputsField.append(container);
  })

  const contactsField = document.createElement('fieldset');
  contactsField.name = 'contacts';
  contactsField.classList.add('form__contacts', 'no-inputs');
  contactsField.setAttribute('data-element-contacts', '');
  form.append(contactsField);

  const addContactButton = document.createElement('button');
  addContactButton.type = 'button';
  addContactButton.classList.add('form__contacts__add-button');
  addContactButton.setAttribute('data-element-addContactButton', '');
  addContactButton.addEventListener('click', handleAddContactButton);
  const addContactButtonSpan = document.createElement('span');
  addContactButtonSpan.textContent = 'Добавить контакт';
  addContactButton.append(addContactButtonSpan);

  if (data && data.contacts) {
    const contactsArr = data.contacts;
    if (contactsArr.length > 0) {
      contactsField.classList.remove('no-inputs');
      contactsArr.forEach(({ type, value }) => {
        const contactInput = createContactInput(type, value);
        contactsField.append(contactInput);
      })
    }
    
    if (contactsArr.length === 10) {
      addContactButton.hidden = true;
    }
  }

  contactsField.append(addContactButton);

  

  return form;
}

function handleDeleteContactButton(event) {

}

function handleAddContactButton(event) {

}

function createContactInput(type = 'phone', value = '') {
  const container = document.createElement('div');
  container.classList.add('form__contacts__input-content');
  container.setAttribute('data-element-contactInputContainer');

  const select = document.createElement('div');
  select.classList.add('form__contacts__select');
  select.setAttribute('data-element-select','')

}

function hideContactInputSelectOptions(event) {
  const target = event.target;
  if (target.closest('[data-element-select]') === null) {
    const form = document.closest([data-element-modalWindow]);
    if (form) {
      const arrow = form.querySelector('[data-element-selectArrow].arrow-icon_up');
      if (arrow) {
        arrow.classList.remove('arrow-icon_up');
      }
      const selectOptions = form.querySelector('[data-element-selectOptions].opened');
      if (selectOptions) {
        selectOptions.classList.remove('opened');
      }
    }
  }
}

function handleAddFormSubmit() {

}

function handleEditFormSubmit() {

}

//Сбор данных из формы
function getFormData(form) {

}

//Обработка события закрытия модального окна
function handleCloseModal(event) {
  const target = event.target;
  document.removeEventListener('click', hideContactInputSelectOptions);

  if(target.closest('[data-element-modalWindow]') === null || target.closest('[data-element-closeButton]')) {
    const modal = target.closest('[data-element-modal]');
    closeModal(modal);
  }
}

//Закрытие модального окна
function closeModal(modal) {
  modal.style.pointerEvents = 'none';
  const modalWindow = modal.querySelector('[data-element-modalWindow]');

  setTimeout (() => {
    modal.classList.add('closed');
    modalWindow.classList.add('closed');

    setTimeout(() => {
      modal.remove();
    }, 500);
  }, 0)
}



//Изменяет стиль lable в зависимости от наполнения input
export function controlInputLableSize(event) {
  const input = event.target;
  input.value = input.value.trim();
  const label = input.parentNode.querySelector('[data-element-nameInputLabel]');
  if (input.value !== '') {
    label.classList.add('form__name-label_small');
  } else {
    label.classList.remove('form__name-label_small');
  }
}

export { handleOpenAddClientModal };
