  // window.openDatabase("database-name","version","database description","database size in bytes")
  var db = window.openDatabase("super8", "1.0", "tutorial database", 1000000); //will create database tutorialdb or open it
  document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    // Create Table
    db.transaction(populateDB, errorCB, successCB);

    // Select records
    fetchData();
}

function populateDB(tx){
    //tx.executeSql('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT,note TEXT NOT NULL)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT NOT NULL, sku TEXT NULL,'+
'name TEXT NULL, cat TEXT NULL, state TEXT NULL, statecolor TEXT NULL, size TEXT NULL, img TEXT NULL, oldprice TEXT NULL, price TEXT NULL, desc TEXT NULL, stock TEXT NULL,'+
'cname TEXT NULL, smname TEXT NULL, timestamp TEXT NULL )');


}



// Fetch all records
function fetchData(){
    db.transaction(function(tx){
        

        
        tx.executeSql("select * from orders",[],function(tx1,result){
            var len = result.rows.length;
            
            for (var i=0; i<len; i++){
                var note = result.rows.item(i).note;
                var sku = result.rows.item(i).sku;
             
               /* var ul = document.getElementById("list").getElementsByTagName("UL")[0];
                for (var i=0; i<len; i++){
                    var str = "Row = " + i + " ID = " + note + " Data =  " +sku;
                    str = str.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;"); // entity encode
                    ul.innerHTML += "<li>" + str + "</li>";
                }*/
                // Add list item
                var div = document.getElementById("list");
                var a = document.createElement("a");
                    a.classList = "list-group-item list-group-item-action";
                    var p = document.createElement("p");
                a.appendChild(document.createTextNode(note));
                p.appendChild(document.createTextNode(sku));
                a.appendChild(p)
                div.appendChild(a);



                
            }
            
        },errorCB);
    }, errorCB, successCB);
}

function insertData(){

    // Insert record
    db.transaction(insertNote, errorCB, successCB);
}

function insertNote(tx){
    var note = document.getElementById('note').value;
    var cname = document.getElementById('cname').value;
    var sku = document.getElementById('sku').value;
    var name = document.getElementById('name').value;
    var cat = document.getElementById('cat').value;
    var state = document.getElementById('cname').value;
    var statecolor = document.getElementById('statecolor').value;
    var size = document.getElementById('size').value;
    var img = document.getElementById('img').value;
    var oldprice = document.getElementById('oldprice').value;
    var price = document.getElementById('price').value;
    var desc = document.getElementById('desc').value;
    var stock = document.getElementById('stock').value;
    var smname = document.getElementById('smname').value;
    var timestamp = document.getElementById('timestamp').value;
  
    // Insert query
    tx.executeSql("INSERT INTO orders(note,cname,name, sku,cat,state,statecolor,size,img,oldprice,price,desc,stock,smname,timestamp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[note,sku,name,cname,cat,state,statecolor,size,img,oldprice,price,desc,stock,smname,timestamp]);
   
    document.getElementById("list").innerHTML = '';
    window.fetchData();
//    // Append new list item
   // var ul = document.getElementById("list");
    //var li = innerHTML("li");
    //document.getElementById('list').innerHTML += "<li>"+note+"</li>";
    //document.getElementById('list').innerHTML += "<li>"+cname+"</li>";
  /* var li = */
   /* li.appendChild(document.createTextNode(note));
    span.appendChild(document.createTextNode(cname));
    span.appendChild(document.createTextNode(sku));
    
     
    ul.appendChild(li);*/
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
//    alert("success!");
}
