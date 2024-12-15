let _activeClient = 0;

let _clients = [];

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

    get activeClient() {
      return _activeClient;
    },
    set activeClient(value) {
      _activeClient = value;
    },

    get sortState() {
      return _sortState;
    },
    set sortState(value) {},

    get clients() {
      return _clients;
    },
    set clients(value) {
      _clients = value;
    },
  }
}

export default state;