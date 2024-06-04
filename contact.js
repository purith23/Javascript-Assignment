$(document).ready(function() {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let editingIndex = null;

    const renderContacts = () => {
        $('#contactList').empty();
        contacts.forEach((contact, index) => {
            $('#contactList').append(`
                <div class="card">
                    <div class="card-header">
                        <strong>${contact.name}</strong>
                        <div>
                            <button class="btn btn-secondary btn-sm edit-contact" data-index="${index}">
                               <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-contact" data-index="${index}">
                               <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="mb-0"><strong>Phone:</strong> ${contact.phone}</p>
                        <p class="mb-0"><strong>Email:</strong> ${contact.email}</p>
                    </div>
                </div>
            `);
        });
    };

    const saveContacts = () => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    };

    $('#contactForm').on('submit', function(event) {
        event.preventDefault();
        const name = $('#name').val();
        const phone = $('#phone').val();
        const email = $('#email').val();

        const newContact = { name, phone, email };

        if (editingIndex === null) {
            contacts.push(newContact);
        } else {
            contacts[editingIndex] = newContact;
            editingIndex = null;
        }

        saveContacts();
        renderContacts();
        this.reset();
        $('#index').val('');
    });

    $(document).on('click', '.delete-contact', function() {
        const index = $(this).data('index');
        contacts.splice(index, 1);
        saveContacts();
        renderContacts();
    });

    $(document).on('click', '.edit-contact', function() {
        const index = $(this).data('index');
        const contact = contacts[index];
        $('#name').val(contact.name);
        $('#phone').val(contact.phone);
        $('#email').val(contact.email);
        $('#index').val(index);
        editingIndex = index;
    });

    renderContacts();
});
