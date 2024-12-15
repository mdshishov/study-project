let _activeClient = null;

let _clients = [];

let _lastInput = null;

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

function sortClients() {
  const directions = _sortState.directions;
  switch (_sortState.active) {
    case 'id':
      _clients.sort(({ id: id1 }, { id: id2 }) => {
        return directions.id === '0' ? Number(id1) - Number(id2) : Number(id2) - Number(id1);
      })
      break;
    case 'name':
      _clients.sort((client1, client2) => {
        const fullName1 = `${client1.surname} ${client1.name} ${client1.lastName}`.toLowerCase();
        const fullName2 = `${client2.surname} ${client2.name} ${client2.lastName}`.toLowerCase();
        return directions.name === '0' ? fullName1.localeCompare(fullName2) : fullName2.localeCompare(fullName1);
      });
      break;
    case 'createdAt':
      _clients.sort(( { createdAt: date1 }, { createdAt: date2 }) => {
        const time1 = (new Date(date1)).getTime();
        const time2 = (new Date(date2)).getTime();
        return directions.createdAt === '0' ? time1 - time2 : time2 - time1;
      });
      break;
    case 'updatedAt':
      _clients.sort(( { updatedAt: date1 }, { updatedAt: date2 }) => {
        const time1 = (new Date(date1)).getTime();
        const time2 = (new Date(date2)).getTime();
        return directions.updatedAt === '0' ? time1 - time2 : time2 - time1;
      });
      break;
    default:
      break;
  }
}

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

    get lastInput() {
      return _lastInput;
    },
    set lastInput(value) {
      _lastInput = value;
    },

    sortClients,
  }
}

export default state;