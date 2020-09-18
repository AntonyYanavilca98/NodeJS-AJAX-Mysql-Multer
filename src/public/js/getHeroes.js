$(document).ready(function() {
    // $.get("/heroesAJAX",
    //     function(response) {
    //         let { data } = response;
    //         data.forEach((element, index) => {
    //             console.log(element, index);
    //             let { nombre, poder, image, edad, id } = element;
    //             $('#add').append('<tr>' +
    //                 '<td>' + index + ' </td>' +
    //                 '<td>' + nombre + ' </td>' +
    //                 '<td>' + poder + ' </td>' +
    //                 '<td>' + edad + ' </td>' +
    //                 '<td><img src=' + image + ' width="50px" height="30px" alt=' + image + '></td>' +
    //                 '<td><a href="/editar/' + id + '" class="btn btn-warning">Editar</a>' +
    //                 '<a href="/delete/' + id + '" class="btn btn-success">Eliminar</a></td>' +
    //                 '</tr>');
    //         });
    //     }
    // );


    var lista = [];
    $.ajax({
        type: "GET",
        url: "/heroesAJAX",
        data: lista,
        success: function(response) {
            let { data } = response;
            data.forEach((element, index) => {
                console.log(element, index);
                let { nombre, poder, image, edad, id } = element;
                $('#add').append('<tr>' +
                    '<td>' + id + ' </td>' +
                    '<td>' + nombre + ' </td>' +
                    '<td>' + poder + ' </td>' +
                    '<td>' + edad + ' </td>' +
                    '<td><img src=' + image + ' width="50px" height="30px" alt=' + image + '></td>' +
                    '<td><a href="/editar/' + id + '" class="btn btn-warning">Editar</a>' +
                    '<a href="/delete/' + id + '"  class="btn btn-success">Eliminar</a></td>' +
                    '</tr>');
            });
        }
    });



    $("#formulario").submit(function(e) {
        e.preventDefault();
        var formData = new FormData()
        formData.append('nombre', document.getElementById('nombre').value);
        formData.append('image', document.getElementById('image').files[0]);
        formData.append('edad', document.getElementById('edad').value);
        formData.append('poder', document.getElementById('poder').value);
        $.ajax({
            type: "POST",
            url: "/agregar",
            processData: false,
            contentType: false,
            dataType: 'json',
            data: formData,
            success: function(response) {
                let { resp } = response;
                console.log(resp);
                resp.forEach((element, index) => {
                    console.log(element, index);
                    let { nombre, poder, image, edad, id } = element;
                    $('#add').append('<tr>' +
                        '<td>' + id + ' </td>' +
                        '<td>' + nombre + ' </td>' +
                        '<td>' + poder + ' </td>' +
                        '<td>' + edad + ' </td>' +
                        '<td><img src=' + image + ' width="50px" height="30px" alt=' + image + '></td>' +
                        '<td><a href="/editar/' + id + '" class="btn btn-warning">Editar</a>' +
                        '<a href="/delete/' + id + '" class="btn btn-success">Eliminar</a></td>' +
                        '</tr>');
                });
            }
        });

        return false;

    });




    $("#removeHeroe").click(function() {
        console.log("HOLA");
    });

});