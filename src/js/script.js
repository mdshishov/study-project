document.addEventListener('DOMContentLoaded', () => {
  const contactTypes = {
    phone: 'Телефон',
    email: 'Email',
    facebook: 'Facebook',
    vk: 'VK',
    other: 'Другое',
  }

  const form = document.getElementById('form');
  form.querySelectorAll('.form__name-input').forEach((input) => {
    input.addEventListener('keypress', noSpaces);
    input.addEventListener('blur', controlInputLable);
  })

  console.log(form.elements.lastName);

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
});

