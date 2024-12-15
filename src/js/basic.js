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

//Форматрует фаду в формат 'dd.mm.yy hh:mm'
export function formatDate(str) {
  const date = new Date(str);
  const dayStr = date.getDate().toString().padStart(2, '0');
  const monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
  const yearStr = date.getFullYear().toString();
  const hoursStr = date.getHours().toString().padStart(2, '0');
  const minutesStr = date.getMinutes().toString().padStart(2, '0');

  return `${dayStr}.${monthStr}.${yearStr} ${hoursStr}:${minutesStr}`;
}

//Блокирует экран для кликов
export function disableClicks() {
  if(!document.getElementById('disable-clicks')) {
    const div = document.createElement('div');
    div.id = 'disable-clicks';
    div.style.zIndex = '2000';
    div.style.position = 'fixed';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.width = '100%';
    div.style.height = '100%';
    document.body.append(div);
  }
}
export function enableClicks() {
  const div = document.getElementById('disable-clicks')
  if(div) {
    div.remove();
  }
}