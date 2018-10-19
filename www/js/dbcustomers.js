  // window.openDatabase("database-name","version","database description","database size in bytes")
  var db = window.openDatabase("super8", "1.0", "tutorial database", 1000000); //will create database tutorialdb or open it
  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {

      // Create Table
      db.transaction(populateDB, errorCB, successCB);

      // Select records
      fetchData();
  }

  function populateDB(tx) {
      //tx.executeSql('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT,note TEXT NOT NULL)');

      tx.executeSql('CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, fname TEXT NOT NULL, lname TEXT NULL,' +
          'email TEXT NULL, phone TEXT NULL, address TEXT NULL)');
  }



  // Fetch all records
  function fetchData() {



      db.transaction(function (tx) {



          tx.executeSql("select * from customers", [], function (tx1, result) {
              var len = result.rows.length;

              for (var i = 0; i < len; i++) {
                  var fname = result.rows.item(i).fname;
                  var lname = result.rows.item(i).lname;
                  var phone = result.rows.item(i).phone;
                  var email = result.rows.item(i).email;
                  var address = result.rows.item(i).address;

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
                    var div1 = document.createElement("div");
                    div1.classList = "media";
                   // div.append(div)
                    var img = document.createElement("img");
                    img.classList = "mr-3";
                    var div2 = document.createElement("div");
                    a.appendChild(div2);
                    div2.classList = "media-body";
a.appendChild(div1);
                    img.src = "img/faces/avatar.jpg";
                   var h5 = document.createElement("h5");
                  div2.appendChild(h5);
                  var p = document.createElement("p");
                  div2.appendChild(img);
                  a.appendChild(div2);
                  // img.appendChild(document.createTextNode('src="img/faces/avatar.jpg"'));

                  div2.appendChild(h5);
                  h5.appendChild(document.createTextNode(fname + ' ' + lname));
                  p.appendChild(document.createTextNode(phone));
                  // p.appendChild(document.createTextNode(email));
                  //p.appendChild(document.createTextNode(address));
                  div2.appendChild(p)
                  div.appendChild(a);




              }

          }, errorCB);
      }, errorCB, successCB);
  }

  function insertData() {

      // Insert record
      db.transaction(insertNote, errorCB, successCB);
  }

  function insertNote(tx) {
      var fname = document.getElementById('fname').value;
      var lname = document.getElementById('lname').value;
      var phone = document.getElementById('phone').value;
      var email = document.getElementById('email').value;
      var address = document.getElementById('address').value;
      // var datejoined = document.getElementById('datejoined').value;
      /*
Submit*/
      // Insert query
      console.log("hh")
      tx.executeSql("INSERT INTO customers(fname,lname, phone,email,address) VALUES (?,?,?,?,?)", [fname, lname, phone, email, address]);

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
      alert("Error processing SQL: " + err.code);
  }

  function successCB() {
      document.getElementById('fname').innerHTML = '';
      //alert("success!");
  }
