var db = openDatabase('super8', '1.0', 'Customers and Order processing', 100 * 1024);

$(document).ready(function () {

    console.info("Initialize...");

    init();

    listarIntegrantes();

    console.info("Carga Complete...");

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////Funciones jquery///////////////////////
    ////////////////////////////////////////////////////////////////////
    $('#submit').click(function () {
        var txtId = $('#txt-id');
        var txtNombres = $('#fname');
        var txtApellidos = $('#lname');
        var input = $('input');

        if (txtNombres.val() === '' || txtApellidos.val() === '') {
            alert("All fields are Required...");
            return;
        }

        var integrante = Object();

        integrante.nombres = txtNombres.val();
        integrante.apellidos = txtApellidos.val();

        if (txtId.val() === '') { //Lo guarda
            integrante.id = new Date().getTime();
            guardarIntegrante(integrante);
        } else { //Lo actualiza
            integrante.id = parseInt(txtId.val());
            actualizarIntegrante(integrante);
        }

        listarIntegrantes();

        txtNombres.val(null);
        txtApellidos.val(null);
        txtId.val(null);
    });

    $('#li-integrantes').on("click", ".btn-editar", function () {
        var idIntegrante = $(this).data("id");
        consultarIntegrante(idIntegrante);
    });

    $('#li-integrantes').on("click", ".btn-eliminar", function () {
        var idIntegrante = $(this).data("id");
        eliminarIntegrante(idIntegrante);
        listarIntegrantes();
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

function listarIntegrantes() {
    db.readTransaction(function (t) {
        t.executeSql('SELECT ID, NOMBRES, APELLIDOS FROM INTEGRANTE', [], function (t, rs) {
            if (rs.rows.length > 0) {
                var lisHtml = '';
               
                for (var i = 0; i < rs.rows.length; i++) {
                    var integrante = rs.rows.item(i);
                    var id = integrante.ID;


                  
                 lisHtml += '<a clasz="list-group-item list-group-item-action"><div class="media">'+
                 '<a href="#" class="icon-btn toggleTools toggleTools'+ integrante.ID+'"><i class="material-icons fa-2x">more_vert</i></a>'+
                            '<img src="img/faces/avatar.jpg"  class="mr-3 img-circle" width="64" alt="Sample Image">'+
                 
                   '<div class="media-body"><h5 class="mt-0">' + integrante.NOMBRES + ' ' + integrante.APELLIDOS +'</h5><p> ' + integrante.ID +'</p><div class="showData tools" id="tools'+ integrante.ID+'">'+
                        '<button class="btn btn-info btn-editar" data-toggle="modal" data-target="#modalCart" type="button" data-id="' + id + '"><i class="material-icons">edit</i></button>' +
                        '<button class="btn btn-info btn-eliminar" type="button" data-id="' + id + '"><i class="material-icons">close</i></Eliminar></div></div></div><hr>';
               
                       
                    }

               
                $('#li-integrantes').html(lisHtml);

                $(function() {
                    
                    $('.icon-btn').on('click', function() {
                       $('.showData').toggle();    
                    });
                   });

            }

        }, error);
    });
}

function guardarIntegrante(integrante) {
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO INTEGRANTE(ID, NOMBRES, APELLIDOS) VALUES(?, ?, ?)', [integrante.id, integrante.nombres, integrante.apellidos]);
    }, error, function () {
        alert("Item Saved.");
        $(".close").trigger("click");
      /*  $("#modalCart").css("display","none");
        $("#modalCart, .modal-backdrop").removeClass("show");
        $("body").removeClass("modal-open");*/
    });
}

function consultarIntegrante(idIntegrante) {
    db.readTransaction(function (t) {
        t.executeSql('SELECT ID, NOMBRES, APELLIDOS FROM INTEGRANTE WHERE ID = ?', [idIntegrante], function (t, rs) {
            if (rs.rows.length > 0) {
                var integrante = new Object();
                integrante.nombres = rs.rows.item(0).NOMBRES;
                integrante.apellidos = rs.rows.item(0).APELLIDOS;

                $('#txt-id').val(rs.rows.item(0).ID);
                $('#fname').val(rs.rows.item(0).NOMBRES);
                $('#lname').val(rs.rows.item(0).APELLIDOS);

            }
        }, error);
    });
}

function actualizarIntegrante(integrante) {
    db.transaction(function (tx) {
        tx.executeSql('UPDATE INTEGRANTE SET NOMBRES = ?, APELLIDOS = ? WHERE ID = ?', [integrante.nombres, integrante.apellidos, integrante.id]);
    }, error, function () {
        alert("El integrante ha sido actualizado con éxito");
    });
}

function eliminarIntegrante(idIntegrante) {
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM INTEGRANTE WHERE ID = ?', [idIntegrante]);
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