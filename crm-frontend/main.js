const FORMS_ACTIONS = {
  getClientField(CLIENT_DATA) {
  },
  createClientField(CLIENT_DATA) {
    // Create Client Fields
    const clientsWrapper = document.querySelector('.table__body');

    const client = document.createElement('div');
    client.setAttribute('id', CLIENT_DATA.id);
    client.classList.add('client');

    const clientID = document.createElement('div');
    clientID.classList.add('client__id');

    const clientName = document.createElement('div');
    clientName.classList.add('client__name');

    const clientCreateDate = document.createElement('div');
    const clientCreateDate_date = document.createElement('div');
    const clientCreateDate_time = document.createElement('div');
    clientCreateDate.classList.add('client__create-date');
    clientCreateDate_date.classList.add('client__date');
    clientCreateDate_time.classList.add('client__time');

    const clientChangeDate = document.createElement('div');
    const clientChangeDate_date = document.createElement('div');
    const clientChangeDate_time = document.createElement('div');
    clientChangeDate.classList.add('client__change-date');
    clientChangeDate_date.classList.add('client__date');
    clientChangeDate_time.classList.add('client__time');

    const clientContactsWrapper = document.createElement('div');
    clientContactsWrapper.classList.add('client__contacts');

    const clientActionsWrapper = document.createElement('div');
    const clientActionEdit = document.createElement('div');
    const clientActionDelete = document.createElement('div');
    clientActionsWrapper.classList.add('client__actions');
    clientActionEdit.classList.add('client__actions-change');
    clientActionDelete.classList.add('client__actions-delete');


    // Add EventListener
    clientActionEdit.addEventListener('click', async () => {
      const EditForm = document.getElementById('editClientForm');
      EditForm.setAttribute('clientID', CLIENT_DATA.id);
      EditForm.classList.remove('element--disabled');

      // ID field
      const idField = document.querySelector('.edit-client__ID');
      idField.textContent = `ID: ${CLIENT_DATA.id}`;

      // Clear Old Fields
      this.clearFields(EditForm);

      const currentClientData = await (await fetch(`http://localhost:3000/api/clients/${CLIENT_DATA.id}`)).json();
      
      const surnameField = document.querySelector('.edit-client #editClientSurname');
      const nameField = document.querySelector('.edit-client #editClientName');
      const lastNameField = document.querySelector('.edit-client #editClientLastName');

      surnameField.value = currentClientData.surname;
      nameField.value = currentClientData.name;
      lastNameField.value = currentClientData.lastName;

      const contactsWrapper = document.getElementById('editClientContactsWrapper');

      currentClientData.contacts.forEach(contact => {
        this.createContactForm(contactsWrapper, true, contact);
      });
    });
    clientActionDelete.addEventListener('click', async () => {
      this.deleteClient(CLIENT_DATA.id);
    });


    // Add Fields content
    clientID.textContent = CLIENT_DATA.id;
    clientName.textContent = `${CLIENT_DATA.name} ${CLIENT_DATA.surname} ${CLIENT_DATA.lastName}`;

    function dateValidation(date) {
      if (date >= 10) return date;
      return `0${date}`;
    };
    const createAtDate = new Date(CLIENT_DATA.createdAt);
    clientCreateDate_date.textContent = `${dateValidation(createAtDate.getDate())}.${dateValidation(createAtDate.getMonth())}.${createAtDate.getFullYear()}`;
    clientCreateDate_time.textContent = `${dateValidation(createAtDate.getHours())}:${dateValidation(createAtDate.getMinutes())}`;

    const changeAtDate = new Date(CLIENT_DATA.updatedAt);
    clientChangeDate_date.textContent = `${dateValidation(createAtDate.getDate())}.${dateValidation(createAtDate.getMonth())}.${createAtDate.getFullYear()}`;
    clientChangeDate_time.textContent = `${dateValidation(changeAtDate.getHours())}:${dateValidation(changeAtDate.getMinutes())}`;

    const contactsIcon = {
      'Другое': 'icons/other.svg',
      'VK': 'icons/vk.svg',
      'Телефон': 'icons/phone.svg',
      'Email': 'icons/email.svg',
      'Facebook': 'icons/facebook.svg',
    };
    CLIENT_DATA.contacts.forEach(contact => {
      const contactWrapper = document.createElement('div');
      contactWrapper.classList.add('client__contact-icon');

      const contactTooltip = document.createElement('div');
      contactTooltip.classList.add('client__contact-tooltip');

      const contactTooltipType = document.createElement('span');
      contactTooltipType.classList.add('client__contact-type');

      const contactTooltipValue = document.createElement('span');
      contactTooltipValue.classList.add('client__contact-value');

      contactWrapper.style.backgroundImage = `url("${contactsIcon[contact.type]}")`;

      contactTooltipType.innerHTML = `${contact.type}:&nbsp;`;
      contactTooltipValue.textContent = contact.value;

      contactTooltip.append(contactTooltipType);
      contactTooltip.append(contactTooltipValue);

      contactWrapper.append(contactTooltip);

      clientContactsWrapper.append(contactWrapper);
    });

    clientActionEdit.innerHTML = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M0 10.5002V13.0002H2.5L9.87333 5.62687L7.37333 3.12687L0 10.5002ZM11.8067 3.69354C12.0667 3.43354 12.0667 3.01354 11.8067 2.75354L10.2467 1.19354C9.98667 0.933535 9.56667 0.933535 9.30667 1.19354L8.08667 2.41354L10.5867 4.91354L11.8067 3.69354Z" fill="#9873FF" /></svg> Изменить';
    clientActionDelete.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#F06A4D" /></svg> Удалить';

    // Append fields
    clientCreateDate.append(clientCreateDate_date);
    clientCreateDate.append(clientCreateDate_time);

    clientChangeDate.append(clientChangeDate_date);
    clientChangeDate.append(clientChangeDate_time);

    clientActionsWrapper.append(clientActionEdit);
    clientActionsWrapper.append(clientActionDelete);

    client.append(clientID);
    client.append(clientName);
    client.append(clientCreateDate);
    client.append(clientChangeDate);
    client.append(clientContactsWrapper);
    client.append(clientActionsWrapper);

    clientsWrapper.append(client);
  },
  createContactForm(CONTACT_WRAPPER, filled, contact) {
    // CreateWrapper
    const addContactWrapper = document.createElement('div');
    addContactWrapper.classList.add('add-contant');

    // Create Selector
    const addContactSelect = document.createElement('select');
    addContactSelect.classList.add('add-contant__select');

    ['Телефон', 'Email', 'Facebook', 'VK', 'Другое'].forEach(optionValue => {
      const newOption = document.createElement('option');
      newOption.classList.add('add-contant__option');
      newOption.value = optionValue;
      newOption.innerHTML = optionValue;

      addContactSelect.append(newOption);
    });

    // Create Input
    const addContactInput = document.createElement('input');
    addContactInput.classList.add('add-contant__input');
    addContactInput.setAttribute('placeholder', 'Введите данные контакта');

    // Create CloseBtn
    const addContactCloseBtn = document.createElement('button');
    addContactCloseBtn.classList.add('add-contant__close-btn');
    addContactCloseBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0"/></svg>`;

    if(filled) {
      addContactSelect.value = contact.type;
      addContactInput.value = contact.value;
    }

    addContactCloseBtn.addEventListener('click', () => {
      addContactWrapper.remove();
    });

    // Append ContactForm
    addContactWrapper.append(addContactSelect);
    addContactWrapper.append(addContactInput);
    addContactWrapper.append(addContactCloseBtn);

    CONTACT_WRAPPER.prepend(addContactWrapper);
  },
  checkValidation(formContainer, errorMessageWrapper, formType) {
    let validationFlag = true;
    const nameFields = document.querySelectorAll(`#${formContainer.id} > .form-client__input`);
    const contactsFields = document.querySelectorAll(`#${formContainer.id} .add-contant`);

    // Check FIO
    nameFields.forEach(field => {
      if (!field.value) {
        // Вывод ошибки
        field.classList.add('form-client__input--error');
        errorMessageWrapper.innerHTML = 'Ошибка: поле не заполнено';

        validationFlag = false;
      } else {
        field.classList.remove('form-client__input--error');
      };
    });

    // Check Contacts
    let contactsList = [];
    contactsFields.forEach(contactWrapper => {
      let [contactType, contactValue] = contactWrapper.childNodes;

      if (!contactValue.value) {
        // Вывод ошибки
        contactValue.classList.add('add-contant__input--error');
        errorMessageWrapper.innerHTML = 'Ошибка: поле не заполнено';

        validationFlag = false;
      } else {
        contactsList.push({'type': contactType.value, 'value': contactValue.value});
      };
    });

    if (validationFlag) {
      return {
        name: document.getElementById(`${formType}ClientName`).value,
        surname: document.getElementById(`${formType}ClientSurname`).value,
        lastName: document.getElementById(`${formType}ClientLastName`).value,
        contacts: contactsList,
      };
    } else {
      return false;
    };
  },
  clearFields(currentForm) {
    const nameFields = document.querySelectorAll(`#${currentForm.id} > .form-client__input`);
    const contactsWrapper = document.querySelectorAll(`#${currentForm.id} .add-contant`);

    // Clear FIO
    nameFields.forEach(field => {
      field.value = '';
    });

    // Clear Contacts
    contactsWrapper.forEach(selector => {
      selector.remove();
    });
  },

  // Server Methods
  async showClient() {
    const clientsData = await (await fetch(`http://localhost:3000/api/clients`)).json();
    clientsData.forEach(client => {
      this.createClientField(client);
    });
  },
  async getClientData(ID) {
    const clientData = await (await fetch(`http://localhost:3000/api/clients/${ID}`)).json();
    return clientData;
  },
  async saveClient(clientData) {
    return await(fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(clientData),
    }));
  },
  async editClient(ID, clientData) {
    return await(fetch(`http://localhost:3000/api/clients/${ID}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(clientData),
    }));
  },
  deleteClient(ID) {
    // Delete from server
    fetch(`http://localhost:3000/api/clients/${ID}`, {
      method: 'DELETE',
    });

    // Clear table
    const clientTableItem = document.getElementById(ID);
    clientTableItem.remove();
  },
}

function new_client_form() {
  const FORM = document.getElementById('newClientForm');
  const ACTION = {
    'openForm': document.getElementById('newClientOpen'),
    'closeForm': document.getElementById('newClientClose'),
    'newContact': document.getElementById('newClientAddContact'),
    'saveData': document.getElementById('newClientSave'),
    'cancelForm': document.getElementById('newClientCancel'),
  };

  ACTION.openForm.addEventListener('click', (event) => {
    event.preventDefault();
    FORM.classList.remove('element--disabled');
  });

  ACTION.cancelForm.addEventListener('click', (event) => {
    event.preventDefault();
    FORM.classList.add('element--disabled');
  });

  ACTION.closeForm.addEventListener('click', (event) => {
    event.preventDefault();
    FORM.classList.add('element--disabled');
  });

  ACTION.newContact.addEventListener('click', (event) => {
    event.preventDefault();

    const newContactWrapper = document.getElementById('newClientContactsWrapper');
    FORMS_ACTIONS.createContactForm(newContactWrapper, false);
  });

  ACTION.saveData.addEventListener('click', async (event) => {
    event.preventDefault();

    const ERROR_MESSAGE = document.getElementById('newClientErrorMessage');
    const DATA = FORMS_ACTIONS.checkValidation(FORM, ERROR_MESSAGE, 'new');

    if (DATA) {
      FORMS_ACTIONS.clearFields(FORM);
      FORM.classList.add('element--disabled');

      const NEW_CLIENT_DATA = await (await FORMS_ACTIONS.saveClient(DATA)).json();
      FORMS_ACTIONS.createClientField(NEW_CLIENT_DATA);
    } else {
      console.log('ОШИБКА');
    };
  });
};
function edit_client_form() {
  const FORM = document.getElementById('editClientForm');
  const ERROR_MESSAGE = document.getElementById('editClientErrorMessage');

  const ACTION = {
    'saveEdit': document.getElementById('editClientSave'),
    'deleteClient': document.getElementById('deleteClient'),
    'editContact': document.getElementById('editClientAddContact'),
    'editContactWrapper': document.getElementById('editClientContactsWrapper'),
    'closeForm': document.getElementById('editClientClose'),
  };

  ACTION.editContact.addEventListener('click', event => {
    event.preventDefault();

    FORMS_ACTIONS.createContactForm(ACTION.editContactWrapper, false);
  });

  ACTION.saveEdit.addEventListener('click', async event => {
    event.preventDefault();

    // FORMS_ACTIONS.editClient(FORM.getAttribute('clientID'), );
    const DATA = FORMS_ACTIONS.checkValidation(FORM, ERROR_MESSAGE, 'edit');

    if (DATA) {
      // Clean form
      FORMS_ACTIONS.clearFields(FORM);
      FORM.classList.add('element--disabled');

      // Delete old DOM element
      const clientTableItem = document.getElementById(FORM.getAttribute('clientID'));
      clientTableItem.remove();

      // Update data
      const NEW_CLIENT_DATA = await (await FORMS_ACTIONS.editClient(FORM.getAttribute('clientID'), DATA)).json();
      console.log(NEW_CLIENT_DATA);
      FORMS_ACTIONS.createClientField(NEW_CLIENT_DATA);
    } else {
      console.log('ОШИБКА');
    };
  });

  ACTION.deleteClient.addEventListener('click', event => {
    event.preventDefault();

    // Clear form
    FORMS_ACTIONS.clearFields(FORM);
    FORM.classList.add('element--disabled');

    //Delete client function
    FORMS_ACTIONS.deleteClient(FORM.getAttribute('clientID'));
  });

  ACTION.closeForm.addEventListener('click', event => {
    event.preventDefault();

    FORM.classList.add('element--disabled');
  });
};
function init_clients_filters() {
  // Get clients
  const getClients = async() => {
    return ((await fetch(`http://localhost:3000/api/clients`)).json());
  };

  // Container
  const container = document.querySelector('.table__body');
  // Filter buttons
  const IDFilter = document.querySelector('.section-id');
  const nameFilter = document.querySelector('.section-name');
  const createDateFilter = document.querySelector('.section-create-date');
  const changeDateFilter = document.querySelector('.section-change-date');

  // Init filters
  IDFilter.addEventListener('click', async() => {
    const CLIENT_DATA = (await getClients());

    for (let i = 0; i < CLIENT_DATA.length; i++) {
      for (let j = 0; j < CLIENT_DATA.length; j++) {
        if (Number(CLIENT_DATA[i].id) < Number(CLIENT_DATA[j].id)) {
          const oldValue = CLIENT_DATA[i];
          CLIENT_DATA[i] = CLIENT_DATA[j];
          CLIENT_DATA[j] = oldValue;
        };
      };
    };

    if (IDFilter.getAttribute('filterID') === 'max-to-min') {
      IDFilter.setAttribute('filterID', 'min-to-max');
    } else {
      IDFilter.setAttribute('filterID', 'max-to-min');
      CLIENT_DATA.reverse();
    };

    container.innerHTML = '';
    CLIENT_DATA.forEach(client => {
      FORMS_ACTIONS.createClientField(client);
    });
  });

  nameFilter.addEventListener('click', async() => {
    const CLIENT_DATA = (await getClients());

    for (let i = 0; i < CLIENT_DATA.length; i++) {
      for (let j = 0; j < CLIENT_DATA.length; j++) {
        if (CLIENT_DATA[i].name[0] < CLIENT_DATA[j].name[0]) {
          const oldValue = CLIENT_DATA[i];
          CLIENT_DATA[i] = CLIENT_DATA[j];
          CLIENT_DATA[j] = oldValue;
        };
      };
    };

    if (nameFilter.getAttribute('filterName') === 'a-to-z') {
      nameFilter.setAttribute('filterName', 'z-to-a');
    } else {
      nameFilter.setAttribute('filterName', 'a-to-z');
      CLIENT_DATA.reverse();
    };

    container.innerHTML = '';
    CLIENT_DATA.forEach(client => {
      FORMS_ACTIONS.createClientField(client);
    });
  });

  createDateFilter.addEventListener('click', async() => {
    const CLIENT_DATA = (await getClients());

    for (let i = 0; i < CLIENT_DATA.length; i++) {
      for (let j = 0; j < CLIENT_DATA.length; j++) {
        const firstDate = new Date(CLIENT_DATA[i].createdAt);
        const secondDate = new Date(CLIENT_DATA[j].createdAt);

        if (Number(firstDate.getTime()) < Number(secondDate.getTime())) {
          const oldValue = CLIENT_DATA[i];
          CLIENT_DATA[i] = CLIENT_DATA[j];
          CLIENT_DATA[j] = oldValue;
        };
      };
    };

    if (createDateFilter.getAttribute('filterID') === 'max-to-min') {
      createDateFilter.setAttribute('filterID', 'min-to-max');
    } else {
      createDateFilter.setAttribute('filterID', 'max-to-min');
      CLIENT_DATA.reverse();
    };

    container.innerHTML = '';
    CLIENT_DATA.forEach(client => {
      FORMS_ACTIONS.createClientField(client);
    });
  });

  changeDateFilter.addEventListener('click', async() => {
    const CLIENT_DATA = (await getClients());

    for (let i = 0; i < CLIENT_DATA.length; i++) {
      for (let j = 0; j < CLIENT_DATA.length; j++) {
        let firstDate = new Date(CLIENT_DATA[i].updatedAt);
        let secondDate = new Date(CLIENT_DATA[j].updatedAt);

        // console.log(`${Number(firstDate.getTime())} > ${Number(secondDate.getTime())} = ${Number(firstDate.getTime()) > Number(secondDate.getTime())}`);
        if (Number(firstDate.getTime()) > Number(secondDate.getTime())) {
          const oldValue = CLIENT_DATA[i];
          CLIENT_DATA[i] = CLIENT_DATA[j];
          CLIENT_DATA[j] = oldValue;
        } else {
          continue;
        };
      };
    };

    console.log(CLIENT_DATA);
    if (changeDateFilter.getAttribute('filterChangeDate') === 'max-to-min') {
      changeDateFilter.setAttribute('filterChangeDate', 'min-to-max');
    } else {
      changeDateFilter.setAttribute('filterChangeDate', 'max-to-min');
      CLIENT_DATA.reverse();
    };

    container.innerHTML = '';
    CLIENT_DATA.forEach(client => {
      FORMS_ACTIONS.createClientField(client);
    });
  });

};


// Initialization
new_client_form();
edit_client_form();
init_clients_filters();
FORMS_ACTIONS.showClient();

// [{"name":"Арсений","surname":"Скрипников","lastName":"Дмитриевич","contacts":[{"type":"VK","value":"id-13131"},{"type":"Email","value":"ars@ma.ru"},{"type":"Телефон","value":"75757575"}],"id":"1704295325852","updatedAt":"2024-01-03T15:22:05.852Z","createdAt":"2024-01-03T15:22:05.852Z"},{"name":"Петрович","surname":"Иван","lastName":"Мосвич","contacts":[{"type":"Телефон","value":"54365346"}],"id":"1704296143792","updatedAt":"2024-01-03T15:35:43.792Z","createdAt":"2024-01-03T15:35:43.792Z"},{"name":"Ивановна","surname":"Галя","lastName":"Оляпка","contacts":[{"type":"Email","value":"ojr.ru"}],"id":"1704296166713","updatedAt":"2024-01-03T15:36:06.713Z","createdAt":"2024-01-03T15:36:06.713Z"},{"name":"Петрович","surname":"Илья","lastName":"Слукич","contacts":[{"type":"Facebook","value":"fa.131"},{"type":"Телефон","value":"63463463"},{"type":"VK","value":"id_1241251"}],"id":"1704296200469","updatedAt":"2024-01-03T15:36:40.469Z","createdAt":"2024-01-03T15:36:40.469Z"},{"name":"Мусага","surname":"Макар","lastName":"Владимиров","contacts":[{"type":"VK","value":"id_13131450050"},{"type":"Телефон","value":"21516798797"}],"id":"1704296242156","updatedAt":"2024-01-03T15:37:22.156Z","createdAt":"2024-01-03T15:37:22.156Z"}]