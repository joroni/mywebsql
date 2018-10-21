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
        var txtPhone = $('#phone');
        var txtEmail = $('#email');

        var input = $('input');

        if (txtFname.val() === '' || txtLname.val() === ''  || txtPhone.val() === '' || txtEmail.val() === '') {
            alert("All fields are Required...");
            return;
        }

        var integrante = Object();

        integrante.fname = txtFname.val();
        integrante.lname = txtLname.val();
        integrante.phone = txtPhone.val();
        integrante.email = txtEmail.val();
      
        

        if (txtId.val() === '') { //Lo guarda
            integrante.id = new Date().getTime();
            saveMember(integrante);
        } else { //Lo actualiza
            integrante.id = parseInt(txtId.val());
            updateMember(integrante);
        }

        memberList();

        txtFname.val(null);
        txtLname.val(null);
        txtPhone.val(null);
        txtEmail.val(null);
        txtId.val(null);
    });


    
    $('#li-integrantes').on("click", ".btn-user-info", function () {
        var idMember = $(this).data("id");
        selectMember(idMember);
        $("label").addClass("active");
        //$("#modal-Title").html("View Customer");

    });


    $('#li-integrantes').on("click", ".btn-editar", function () {
        var idMember = $(this).data("id");
        selectMember(idMember);
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
        tx.executeSql('create table if not exists CUSTOMERS(ID, FNAMES, LNAMES,PHONE, EMAIL)');
    }, error, exito);
}

function memberList() {
    db.readTransaction(function (t) {
        t.executeSql('SELECT ID, FNAMES, LNAMES, PHONE, EMAIL FROM CUSTOMERS', [], function (t, rs) {
            if (rs.rows.length > 0) {
                var lisHtml = '';

                for (var i = 0; i < rs.rows.length; i++) {
                    var integrante = rs.rows.item(i);
                    var id = integrante.ID;



                    lisHtml += '<div class="list-group-item customer-list list-group-item-action"><div class="media">' +
                        '<div href="#" data-toggle="class" data-target="#tools' + integrante.ID + '" class="icon-btn toggleTools" id="toggleTools' + integrante.ID + '"><i class="material-icons fa-2x">more_vert</i></div>' +
                        '<a href="#" onclick="viewMember('+ id +')"><img src="img/user.svg" class="mr-3 btn-user-info img-circle" width="64" alt="Sample Image" /></a>' +

                        '<div class="media-body"><h5 class="mt-0">' + integrante.FNAMES + ' ' + integrante.LNAMES + '</h5><p> ' + integrante.PHONE + '</p><div id="tools' + integrante.ID + '" class="showData edittool">' +
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

function saveMember(integrante) {
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO CUSTOMERS(ID, FNAMES, LNAMES, PHONE, EMAIL) VALUES(?, ?, ?,?,?)', [integrante.id, integrante.fname, integrante.lname, integrante.phone, integrante.email]);
    }, error, function () {
        alert("Item Saved.");
        $(".close").trigger();
    });
}

function selectMember(idMember) {
    db.readTransaction(function (t) {
        t.executeSql('SELECT ID, FNAMES, LNAMES , PHONE, EMAIL FROM CUSTOMERS WHERE ID = ?', [idMember], function (t, rs) {
            if (rs.rows.length > 0) {
                var integrante = new Object();
                integrante.fname = rs.rows.item(0).FNAMES;
                integrante.lname = rs.rows.item(0).LNAMES;
                integrante.phone = rs.rows.item(0).PHONE;
                integrante.email = rs.rows.item(0).EMAIL;
                $('#txt-id').val(rs.rows.item(0).ID);
                $('#fname').val(rs.rows.item(0).FNAMES);
                $('#lname').val(rs.rows.item(0).LNAMES);
                $('#phone').val(rs.rows.item(0).PHONE);
                $('#email').val(rs.rows.item(0).EMAIL);
              
//console.log($(this).attr([id]));
            }
        }, error);
    });
}




function viewMember(idMember) {
    localStorage.setItem("idMember",idMember);
    alert(idMember);
    db.readTransaction(function (t) {
        t.executeSql('SELECT ID, FNAMES, LNAMES , PHONE, EMAIL FROM CUSTOMERS WHERE ID = ?', [idMember], function (t, rs) {
            if (rs.rows.length > 0) {
                var integrante = new Object();
                integrante.fname = rs.rows.item(0).FNAMES;
                integrante.lname = rs.rows.item(0).LNAMES;
                integrante.phone = rs.rows.item(0).PHONE;
                integrante.email = rs.rows.item(0).EMAIL;
                $('#txt-id').val(rs.rows.item(0).ID);
                $('#fname').val(rs.rows.item(0).FNAMES);
                $('#lname').val(rs.rows.item(0).LNAMES);
                $('#phone').val(rs.rows.item(0).PHONE);
                $('#email').val(rs.rows.item(0).EMAIL);
              //console.log($(this).attr([id]));
            }
        }, error);
    });
}

function updateMember(integrante) {
    db.transaction(function (tx) {
        tx.executeSql('UPDATE CUSTOMERS SET FNAMES = ?, LNAMES = ?, PHONE = ?, EMAIL = ?, WHERE ID = ?', [integrante.phone,integrante.fname,integrante.lname, integrante.id]);
    }, error, function () {
        alert("The member has been updated successfully");
    });
}

function removeMember(idMember) {
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM CUSTOMERS WHERE ID = ?', [idMember]);
    }, error, function () {
        alert("The member has been rem successfully");
    });
}




////////////////////////////////////////////////////////////////////
////////////////////////Funciones de logueo////////////////////
////////////////////////////////////////////////////////////////////
var error = function (err) {
    console.error(err);
};

var exito = function () {
    console.info("Tabla created...");
};