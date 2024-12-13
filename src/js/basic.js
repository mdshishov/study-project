//Отменяет ввод пробелов в текстовом поле
export function keypressNoSpaces(event) {
  if (event.keyCode === 32) {
    event.preventDefault();
  }
}

//Отменяет ввод двойныхпробелов (trim() в реальном времени)
export function keypressNoDubbleSpaces(event) {
  const input = event.target;
  if (event.keyCode === 32 && (input.value === '' || input.value.slice(-1) === ' ')) {
    event.preventDefault();
  }
}

//Показывает красную строку с ошибкой
export function showError(message = null) {
  let aside = document.getElementById('aside');
  if (!aside) {
    aside = document.createElement('aside');
    aside.classList.add('error');
    aside.id = 'error';
  }
  aside.textContent = message
    ? message
    : 'Упс... Кажется, что-то пошло нет так. Пожалуйста, перезагрузите страницу.';

  document.body.append(aside);
}