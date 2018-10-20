var db = openDatabase('super8', '1.0', 'Customers and Order processing', 100 * 1024);

$(document).ready(function () {

    console.info("Initialize...");

    init();

    memberList();

    console.info("Carga Complete...");

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////Funciones jquery///////////////////////
    ////////////////////////////////////////////////////////////////////
    $('#submit').click(function () {
        var txtId = $('#txt-id');
        var txtFname = $('#fname');
        var txtLname = $('#lname');
        var input = $('input');

        if (txtFname.val() === '' || txtLname.val() === '') {
            alert("All fields are Required...");
            return;
        }

        var integrante = Object();

        integrante.fname = txtFname.val();
        integrante.lname = txtLname.val();

        if (txtId.val() === '') { //Lo guarda
            integrante.id = new Date().getTime();
            guardarIntegrante(integrante);
        } else { //Lo actualiza
            integrante.id = parseInt(txtId.val());
            actualizarIntegrante(integrante);
        }

        memberList();

        txtFname.val(null);
        txtLname.val(null);
        txtId.val(null);
    });


    
    $('#li-integrantes').on("click", ".btn-user-info", function () {
        var idMember = $(this).data("id");
        consultarIntegrante(idMember);
        $("label").addClass("active");
        //$("#modal-Title").html("View Customer");

    });


    $('#li-integrantes').on("click", ".btn-editar", function () {
        var idMember = $(this).data("id");
        consultarIntegrante(idMember);
        $("label").addClass("active");
        $("#modal-Title").html("Edit Customer");

    });

    $('#li-integrantes').on("click", ".btn-eliminar", function () {
        var idMember = $(this).data("id");
        removeMember(idMember);
        memberList();
    });

});

////////////////////////////////////////////////////////////////////
///////////////////////funciones para el CRUd///////////////////////
////////////////////////////////////////////////////////////////////
function init() {
    db.transaction(function (tx) {
        tx.executeSql('create table if not exists INTEGRANTE(ID, NOMBRES, APELLIDOS)');
    }, error, exito);
}

function memberList() {
    db.readTransaction(function (t) {
        t.executeSql('SELECT ID, NOMBRES, APELLIDOS FROM INTEGRANTE', [], function (t, rs) {
            if (rs.rows.length > 0) {
                var lisHtml = '';

                for (var i = 0; i < rs.rows.length; i++) {
                    var integrante = rs.rows.item(i);
                    var id = integrante.ID;



                    lisHtml += '<a class="list-group-item list-group-item-action"><div class="media">' +
                        '<div href="#"  data-toggle="class" data-target="#tools' + integrante.ID + '" class="icon-btn toggleTools" id="toggleTools' + integrante.ID + '"><i class="material-icons fa-2x">more_vert</i></div>' +
                        '<img src="img/user.svg"  class="mr-3  btn-user-info img-circle" width="64" alt="Sample Image">' +

                        '<div class="media-body"><h5 class="mt-0">' + integrante.NOMBRES + ' ' + integrante.APELLIDOS + '</h5><p> ' + integrante.ID + '</p><div id="tools' + integrante.ID + '" class="showData edittool">' +
                        '<button class="btn btn-info btn-editar" data-toggle="modal" data-target="#modalCart" type="button" data-id="' + id + '"><i class="material-icons">edit</i></button>' +
                        '<button class="btn btn-info btn-eliminar" type="button" data-id="' + id + '"><i class="material-icons">delete</i></Eliminar></div></div></div>';


                }


                $('#li-integrantes').html(lisHtml);

               /* $(function () {
                    $('.icon-btn').on('click', function () {
                        $('.showData').toggle();
                    });
                });*/


                $('[data-toggle="class"]').click(function(){
                    var $target = $($(this).data('target'));
                    var classes = $(this).data('classes');
                    $target.toggleClass(classes);
                    return false;
                });
                



                $("#btnNew").click(function () {
                    console.log("reset fields");
                    $('#dynamic-form')[0].reset();
                    $('#txt-id').val("");
                      $("#modal-Title").html("Add Customer");

                })



            }

        }, error);
    });
}

function guardarIntegrante(integrante) {
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO INTEGRANTE(ID, NOMBRES, APELLIDOS) VALUES(?, ?, ?)', [integrante.id, integrante.fname, integrante.lname]);
    }, error, function () {
        alert("Item Saved.");
        $(".close").trigger();
    });
}

function consultarIntegrante(idMember) {
    db.readTransaction(function (t) {
        t.executeSql('SELECT ID, NOMBRES, APELLIDOS FROM INTEGRANTE WHERE ID = ?', [idMember], function (t, rs) {
            if (rs.rows.length > 0) {
                var integrante = new Object();
                integrante.fname = rs.rows.item(0).NOMBRES;
                integrante.lname = rs.rows.item(0).APELLIDOS;
                $('#txt-id').val(rs.rows.item(0).ID);
                $('#fname').val(rs.rows.item(0).NOMBRES);
                $('#lname').val(rs.rows.item(0).APELLIDOS);

            }
        }, error);
    });
}

function actualizarIntegrante(integrante) {
    db.transaction(function (tx) {
        tx.executeSql('UPDATE INTEGRANTE SET NOMBRES = ?, APELLIDOS = ? WHERE ID = ?', [integrante.fname, integrante.lname, integrante.id]);
    }, error, function () {
        alert("El integrante ha sido actualizado con éxito");
    });
}

function removeMember(idMember) {
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM INTEGRANTE WHERE ID = ?', [idMember]);
    }, error, function () {
        alert("El integrante ha sido eliminado con éxito");
    });
}




////////////////////////////////////////////////////////////////////
////////////////////////Funciones de logueo////////////////////
////////////////////////////////////////////////////////////////////
var error = function (err) {
    console.error(err);
};

var exito = function () {
    console.info("Tabla creada...");
};