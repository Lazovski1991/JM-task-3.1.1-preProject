let modal = $('#defaultModal');
let modalTitle = $('.modal-title');
let modalBody = $('.modal-body');
let modalFooter = $('.modal-footer');

let clearFormButton = $('<button type="reset" class="btn btn-secondary">Clear</button>');
let primaryButton = $('<button type="button" class="btn btn-primary"></button>');
let dismissButton = $('<button type="button" class="btn btn-secondary" data-dismiss="modal"></button>');
let dangerButton = $('<button type="button" class="btn btn-danger"></button>');

$(document).ready(function () {
    viewAllUsers();
    /* viewAllCategories();*/
    defaultModal();
});

function defaultModal() {
    modal.modal({
        keyboard: true,
        backdrop: "static",
        show: false,
    }).on("show.bs.modal", function (event) {
        let button = $(event.relatedTarget);
        let id = button.data('id');
        let action = button.data('action');
        switch (action) {
            case 'editUser':
                editUser($(this), id);
                break;

            case 'deleteUser':
                deleteUser($(this), id);
                break;

        }
    }).on('hidden.bs.modal', function (event) {
        $(this).find('.modal-title').html('');
        $(this).find('.modal-body').html('');
        $(this).find('.modal-footer').html('');
    });
}

async function viewAllUsers() {
    $('#userTable tbody').empty();
    const usersResponse = await userService.findAll();
    const usersJson = usersResponse.json();

    usersJson.then(users => {
        users.forEach(user => {
            let strRole = '';
            user.roles.forEach(role =>
                strRole += role.role.replace('ROLE_', '') + ' ');
            strRole = strRole.trim();
            let userRow = `$(<tr>
                        <th scope="row">${user.id}</th>
                        <td>${user.name}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${strRole}</td>
                        <td><button class="btn btn-primary" data-id="${user.id}" data-action="editUser" data-toggle="modal" data-target="#defaultModal">Edit</button></td>
                        <td><button class="btn btn-danger" data-id="${user.id}" data-action="deleteUser" data-toggle="modal" data-target="#defaultModal">Delete</button></td>
                    </tr>)`;
            $('#userTable tbody').append(userRow);
        });
    });
}

async function editUser(modal, id) {
    const userResponse = await userService.findById(id);
    const userJson = userResponse.json();
    const rolesResponse = await roleService.findAll();
    const rolesJson = rolesResponse.json();

    let idInput = `<div class="form-group">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" disabled>
            <div class="invalid-feedback"></div>
        </div>`;

    modal.find(modalTitle).html('Edit User');
    let userFormHidden = $('.userForm:hidden')[0];
    modal.find(modalBody).html($(userFormHidden).clone());
    let userForm = modal.find('.userForm');
    userForm.prop('id', 'updateUserForm');
    modal.find(userForm).prepend(idInput);
    modal.find(userForm).show();
    dismissButton.html('Cancel');
    modal.find(modalFooter).append(dismissButton);
    primaryButton.prop('id', 'updateUserButton');
    primaryButton.html('Update');
    modal.find(modalFooter).append(primaryButton);

    userJson.then(user => {
        modal.find('#id').val(user.id);
        modal.find('#firstName').val(user.name);
        modal.find('#lastName').val(user.lastName);
        modal.find('#age').val(user.age);
        modal.find('#email').val(user.email);
        modal.find('#password').val(user.password);
        rolesJson.then(roles => {
            roles.forEach(role => {
                let flag = false;
                user.roles.forEach(roleUser => {
                    if (roleUser.id == role.id) {
                        flag = true;
                    }
                });
                if (flag)
                    modal.find('#role').append(new Option(role.role.replace('ROLE_', ''), role.id, false, true));
                else
                    modal.find('#role').append(new Option(role.role.replace('ROLE_', ''), role.id));
            });
        });
    });


    $('#updateUserButton').click(async function (e) {
        let id = userForm.find('#id').val().trim();
        let firstName = userForm.find('#firstName').val().trim();
        let lastName = userForm.find('#lastName').val().trim();
        let age = userForm.find('#age').val().trim();
        let email = userForm.find('#email').val().trim();
        let password = userForm.find('#password').val().trim();
        let roleIdArray = userForm.find('#role').val();
        let roleJson = roleIdArray.map(function (id) {
            return {id: id}
        });
        let data = {
            id: id,
            name: firstName,
            lastName: lastName,
            age: age,
            email: email,
            password: password,
            roles: roleJson
        };

        const userResponse = await userService.update(id, data);

        viewAllUsers();
        modal.find('.modal-title').html('Success');
        modal.find('.modal-body').html('User updated!');
        dismissButton.html('Close');
        modal.find(modalFooter).html(dismissButton);
        $('#defaultModal').modal('show');
    });
}

async function deleteUser(modal, id) {
    const userResponse = await userService.findById(id);
    const userJson = userResponse.json();

    modal.find(modalTitle).html('Delete User');
    let message = '<strong>Are you sure to delete the following user?</strong>';
    modal.find(modalBody).html(message);
    let viewTableHidden = $('.viewTable:hidden')[0];
    modal.find(modalBody).append($(viewTableHidden).clone());
    let viewTable = modal.find('.viewTable');
    modal.find(viewTable).show();
    dismissButton.html('Close');
    modal.find(modalFooter).append(dismissButton);
    dangerButton.prop('id', 'deleteUserButton');
    dangerButton.html('Delete');
    modal.find(modalFooter).append(dangerButton);

    userJson.then(user => {
        modal.find('#id').html(user.id);
        modal.find('#firstName').html(user.name);
        modal.find('#lastName').html(user.lastName);
        modal.find('#age').html(user.age);
        modal.find('#email').html(user.email);

        let strRole = '';
        user.roles.forEach(role =>
            strRole += role.role.replace('ROLE_', '') + ' ');
        strRole = strRole.trim();

        modal.find('#role').html(strRole);
    });

    $('#deleteUserButton').click(async function (e) {
        const userResponse = await userService.delete(id);
        viewAllUsers();
        modal.find('.modal-title').html('Success');
        modal.find('.modal-body').html('User deleted!');
        dismissButton.html('Close');
        modal.find(modalFooter).html(dismissButton);
        $('#defaultModal').modal('show');
    });
}


const http = {
    fetch: async function (url, options = {}) {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            ...options,
        });

        return response;
    }
};

const userService = {
    findAll: async () => {
        return await http.fetch('/rest/admin');
    },
    add: async (data) => {
        return await http.fetch('/rest/admin', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    findById: async (id) => {
        return await http.fetch('/rest/admin/' + id);
    },
    update: async (id, data) => {
        return await http.fetch('/rest/admin/' + id, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    delete: async (id) => {
        return await http.fetch('/rest/admin/' + id, {
            method: 'DELETE'
        });
    },
};

const roleService = {
    findAll: async () => {
        return await http.fetch('/rest/roles');
    }
};