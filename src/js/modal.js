import * as basic from './basic.js';
import state from './state.js'

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

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal__content');
  modal.append(modalContent);

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

  modalContent.append(modalWindow);

  modal.classList.add('closed');
  modalWindow.classList.add('closed');
  document.body.append(modal);
  setTimeout(() => {
    modal.classList.remove('closed');
    modalWindow.classList.remove('closed');
  }, 0);
}

//Создание модального окна с вопросом об удалении пользователя
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
  closeButton.addEventListener('click', handleCloseModalButton);
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
  
  Object.entries({ surname: 'Фамилия', name: 'Имя', lastName: 'Отчество' }).forEach(([inputName, labelText]) => {
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

    const underline = document.createElement('span');
    underline.classList.add('form__name-input__underline');

    container.append(input, label, underline);
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

  const buttonsField = document.createElement('fieldset');
  buttonsField.name = 'buttons';
  buttonsField.classList.add('form__buttons');
  form.append(buttonsField);

  const errorMessage = document.createElement('p');
  errorMessage.classList.add('form__error-message');
  errorMessage.setAttribute('data-element-errorMessage', '');
  buttonsField.append(errorMessage);

  const submitButton = document.createElement('button');
  submitButton.classList.add('button', 'button_primary', 'form__submit-button');
  submitButton.setAttribute('data-element-submit', '');
  const submitButtonSpan = document.createElement('span');
  submitButton.append(submitButtonSpan);
  buttonsField.append(submitButton);

  const cancelButton = document.createElement('button');
  cancelButton.classList.add('form__cancel-button');
  cancelButton.type = 'button';
  buttonsField.append(cancelButton);

  if (data) {
    submitButtonSpan.textContent = 'Сохранить';
    form.addEventListener('submit', handleEditFormSubmit);
    cancelButton.textContent = 'Удалить клиента';
    cancelButton.addEventListener('click', () => {
      //ФУНКЦИЯ МОДАЛЬНОГО ОКНА УДАЛЕНИЯ
    });
  } else {
    submitButtonSpan.textContent = 'Добавить';
    form.addEventListener('submit', handleAddFormSubmit);
    cancelButton.textContent = 'Отмена';
    cancelButton.addEventListener('click', handleCloseModalButton);
  }

  return form;
}

function handleAddContactButton(event) {
  const target = event.target.closest('[data-element-addContactButton]');
  const contactInput = createContactInput('phone');
  target.before(contactInput);

  const container = target.closest('[data-element-contacts]');
  container.classList.remove('no-inputs');
  const contactInputs = container.querySelectorAll('[data-element-contactInputContainer]');
  if (contactInputs.length === 10) {
    target.hidden = true;
  }
}

function createContactInput(type = 'phone', value = '') {
  const container = document.createElement('div');
  container.classList.add('form__contacts__input-content');
  container.setAttribute('data-element-contactInputContainer', '');

  const select = document.createElement('div');
  select.classList.add('form__contacts__select');
  select.setAttribute('data-element-select', '');

  const selectToggle = document.createElement('button');
  selectToggle.type = 'button';
  selectToggle.classList.add('form__contacts__select__toggle');
  selectToggle.setAttribute('data-element-selectToggle', '');
  selectToggle.setAttribute('data-selectValue', type);
  selectToggle.textContent = state().contactTypes[type];
  selectToggle.addEventListener('click', toggleContactInputSelectOptions)
  select.append(selectToggle);

  const arrow = document.createElement('div');
  arrow.classList.add('arrow-icon', 'form__contacts__select__arrow');
  arrow.setAttribute('data-element-selectArrow', '');
  select.append(arrow);

  const options = document.createElement('div');
  options.classList.add('form__contacts__select__options');
  options.setAttribute('data-element-selectOptions', '');
  select.append(options);

  Object.entries(state().contactTypes).forEach(([optionValue, text]) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.classList.add('form__contacts__select__option');
    option.setAttribute('data-element-option', '');
    option.setAttribute('data-optionValue', optionValue);
    option.textContent = text;
    option.addEventListener('click', selectOption);
    if (optionValue === type) {
      option.classList.add('active');
    }
    options.append(option);
  })

  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('form__contacts__input');
  input.required = true;
  input.placeholder = 'Введите данные';
  input.setAttribute('data-element-contactInput', '');
  input.addEventListener('keypress', basic.keypressNoDubbleSpaces);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('form__contacts__delete-button');
  deleteButton.addEventListener('click', handleDeleteContactButton);

  container.append(select, input, deleteButton);

  return container;
}

function handleDeleteContactButton(event) {
  const contactInput = event.target.closest('[data-element-contactInputContainer]');
  const container = contactInput.closest('[data-element-contacts]');
  container.querySelector('[data-element-addContactButton]').hidden = false;

  setTimeout(() => {
    contactInput.remove();

    const contactInputs = container.querySelectorAll('[data-element-contactInputContainer]');
    if (contactInputs.length === 0) {
      container.classList.add('no-inputs');
    }
  }, 0);
}

function selectOption(event) {
  const option = event.target.closest('[data-element-option]');
  const optionValue = option.dataset.optionvalue;

  const select = event.target.closest('[data-element-select]');
  const selectToggle = select.querySelector('[data-element-selectToggle]');
  selectToggle.dataset.selectvalue = optionValue;
  selectToggle.textContent = state().contactTypes[optionValue];

  select.querySelector('[data-element-option].active').classList.remove('active');
  option.classList.add('active');

  toggleContactInputSelectOptions(event);
}

function toggleContactInputSelectOptions(event) {
  const select = event.target.closest('[data-element-select]');
  select.querySelector('[data-element-selectArrow]').classList.toggle('arrow-icon_up');
  select.querySelector('[data-element-selectOptions]').classList.toggle('opened');
}

function hideContactInputSelectOptions(event) {
  const target = event.target;
  if (target.closest('[data-element-select]') === null) {
    const form = target.closest('[data-element-modalWindow]');
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

async function handleAddFormSubmit(event) {
  event.preventDefault();
  const form = event.target.closest('[data-element-modalWindow]');
  hideFormErrorMessage(form);

  const data = getFormData(form);
  try {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if ( response.ok ) {
      //ПАРСИМ ОТВЕТ ОБНОВЛЯЕМ ТАБЛИЦУ ЗАКРЫВАЕМ МОДАЛКУ И ТД
    } else {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}.`);
    }
  } catch(error) {
    const errorText = error.name === 'TypeError' 
      ? 'Что-то пошло не так...'
      : error.message;
    showFormErrorMessage(form, errorText);
    throw error;
  }

}

function handleEditFormSubmit() {

}

//Сбор данных из формы
function getFormData(form) {
  const data = {};

  data.name = form.elements.name.value;
  data.surname = form.elements.surname.value;
  if (form.elements.lastName.value.length > 0) {
    data.lastName = form.elements.lastName.value;
  };

  const contacts = [];
  form.querySelectorAll('[data-element-contactInputContainer]').forEach((inputContainer) => {
    const type = inputContainer.querySelector('[data-element-selectToggle]').dataset.selectvalue;
    const value = inputContainer.querySelector('[data-element-contactInput]').value;
    contacts.push({ type, value });
  })

  if (contacts.length > 0) {
    data.contacts = contacts;
  }

  return data;
}

//Обработка события закрытия модального окна
function handleCloseModal(event) {
  const target = event.target;

  if(target.closest('[data-element-modalWindow]') === null) {
    const modal = target.closest('[data-element-modal]');
    closeModal(modal);
  }
}
function handleCloseModalButton(event) {
  const target = event.target;
  const modal = target.closest('[data-element-modal]');
  closeModal(modal);
}

//Закрытие модального окна
function closeModal(modal) {
  document.removeEventListener('click', hideContactInputSelectOptions);
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

function showFormErrorMessage(form, message = 'Что-то пошло не так...') {
  const errorMessage = form.querySelector('[data-element-errorMessage]');
  errorMessage.textContent = message;
}
function hideFormErrorMessage(form) {
  showFormErrorMessage(form, '');
}

export { handleOpenAddClientModal };
