document.addEventListener('DOMContentLoaded', () => {
  showModal();
  const contactTypes = {
    phone: 'Телефон',
    email: 'Email',
    facebook: 'Facebook',
    vk: 'VK',
    other: 'Другое',
  }

  // const form = document.getElementById('form');
  // form.querySelectorAll('.form__name-input').forEach((input) => {
  //   input.addEventListener('keypress', noSpaces);
  //   input.addEventListener('blur', controlInputLable);
  // })

  // const select = document.querySelector('.form__contacts__select__toggle');
  
  // document.addEventListener('click', (event) => {
  //   const target = event.target;
  //   if (target.closest('[data-select]') === null) {
  //     const form = document.getElementById('form');
  //     if (form) {
  //       form.querySelectorAll('[data-arrow-icon].arrow-icon_up').forEach((icon) => {
  //         icon.classList.remove('arrow-icon_up')
  //       });
  //       form.querySelectorAll('[data-select-options]').forEach((selectOptions) => {
  //         selectOptions.classList.add('closed');
  //       });
  //     }
  //   }
  // })

  // select.addEventListener('click', () => {
  //   select.parentNode.querySelector('[data-arrow-icon]').classList.toggle('arrow-icon_up');
  //   select.parentNode.querySelector('[data-select-options]').classList.toggle('closed');
  // })
});

function showModal(data = null) {
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.classList.add('modal');

  const form = document.createElement('form');
  form.id = 'form';
  form.classList.add('form');
  modal.append(form);

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.classList.add('form__close-button');
  closeButton.addEventListener('click', () => {
    //Функция закрытия модалки
  })
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

  ['name', 'surname', 'lastName'].forEach((inputName) => {
    
  })

  document.body.append(modal);

  function closeForm(event) {
    
  } 

  //Отменяет ввод пробелов в текстовом поле
  function noSpaces(event) {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  }

  //Отменяет ввод двойныхпробелов (trim() в реальном времени)
  function noDubbleSpaces(event) {
    const input = event.target;
    if (event.keyCode === 32 && (input.value === '' || input.value.slice(-1) === ' ')) {
      event.preventDefault();
    }
  }

  //Изменяет стиль lable в зависимости от наполнения input
  function controlInputLable(event) {
    const input = event.target;
    input.value = input.value.trim();
    const label = input.parentNode.querySelector('.form__name-label');
    if (input.value !== '') {
      label.classList.add('form__name-label_small');
    } else {
      label.classList.remove('form__name-label_small');
    }
  }
}

//Показывает красную строку с ошибкой
function showError(message = null) {
  let aside = document.getElementById('aside');
  if (!aside) {
    aside = document.createElement('aside');
    aside.classList.add('error');
    aside.id = 'error';
  }
  aside.textContent = message
    ? 'Упс... Кажется, что-то пошло нет так. Пожалуйста, перезагрузите страницу.'
    : message;
}

