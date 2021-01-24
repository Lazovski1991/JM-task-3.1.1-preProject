fetch('http://localhost:8080/rest/admin')
    .then(function (response) {
        return response.json()
    })
    .then(function (json) {
        var list = document.querySelector('.user_data');
        for (key in json) {
            var roles = '';
            for (key_inner in json[key].roles) {
                roles += json[key].roles[key_inner].role.replace('ROLE_', '') + ' ';
            }
            list.innerHTML +=
                '<tr ><th>' + json[key].id + '</th>' +
                '<th>' + json[key].name + '</th>' +
                '<th>' + json[key].lastName + '</th>' +
                '<th>' + json[key].age + '</th>' +
                '<th>' + json[key].email + '</th>' +
                '<th>' + json[key].password + '</th>' +
                '<th>' + roles + '</th>' +
                '<td><button class="btn btn-info" data-toggle="modal" onclick="editClick(' + json[key].id + ')" data-whatever="@mdo">Edit</button></td>' +
                '<td><button class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-whatever="@mdo">Delete</button></td></tr>';
        }
    });

function editClick(id) {
    $(document).ready(function () {
        var roles;
        fetch('http://localhost:8080/rest/role/')
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                roles = json;
                fetch('http://localhost:8080/rest/admin/' + id)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (json) {
                        /*var list = document.querySelector(".edit_user_data");*/
                        $('#id').val(json.id);
                        $('#name').val(json.name);
                        $('#lastName').val(json.lastName);
                        $('#age').val(json.age);
                        $('#password').val(json.password);
                        $('#email').val(json.email);
                        var select = document.getElementById('roles')
                        for (key in roles) {
                            var el = document.createElement('option');
                            el.text = roles[key].role.replace('ROLE_', '');
                            el.value = roles[key].id;
                            for (key_role in json.roles) {
                                if (roles[key].role === json.roles[key_role].role) {
                                    el.selected = true;
                                }
                            }
                            select.add(el);
                        }
                        $('#editModal').modal('show');
                    });
                console.log()
            });
    });
}

function save() {
    $(document).ready(function () {
        fetch('http://localhost:8080/rest/admin', {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            }),
            body: JSON.stringify({
                id: $('#id').val(),
                name: $('#name').val(),
                lastName: $('#lastName').val(),
                age: $('#age').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                roles:
                    [
                    {
                       "id": 1
                    }
                ]
            })
        }).then(function (response) {
            return response.json()
        })
    })
}

