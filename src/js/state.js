let _activeUser = 0;

const _sortState = {
  active: 'id',
  directions: {
    id: '0',
    name: '0',
    createdAt: '0',
    updatedAt:'0',
  },
}

const _contactTypes = {
  phone: 'Телефон',
  email: 'Email',
  facebook: 'Facebook',
  vk: 'VK',
  other: 'Другое',
};

function state() {
  return {
    get contactTypes() {
      return _contactTypes;
    },
    set contactTypes(value) {},

    get activeUser() {
      return _activeUser;
    },
    set activeUser(value) {
      _activeUser = value;
    },

    get sortState() {
      return _sortState;
    },
    set sortState(value) {},
  }
}

export default state;