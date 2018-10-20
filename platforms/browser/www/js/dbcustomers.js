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

             
                  // Add list item
                    var div = document.getElementById("list");
                    var a = document.createElement("a");
                    a.classList = "list-group-item list-group-item-action";
                    var div1 = document.createElement("div");
                
                    a.appendChild(div1);
                    var img = document.createElement("img");
                    img.classList = "mr-3 img-circle";
                   div1.appendChild(img);                  
                    var div2 = document.createElement("div");
                
                   div2.classList = "media";
                    
                    img.src = "img/faces/avatar.jpg";
                  
                  div2.appendChild(img);
                  a.appendChild(div2);
                  var div3  = document.createElement("div");
                  div3.classList = "media-body";
                  div2.appendChild(div3);
                  var h5 = document.createElement("h5");
                    var p = document.createElement("p");
                  div3.appendChild(h5);
                  div3.appendChild(p)
                
                  h5.appendChild(document.createTextNode(fname + ' ' + lname));
                  p.appendChild(document.createTextNode(phone));
                  // p.appendChild(document.createTextNode(email));
                  //p.appendChild(document.createTextNode(address));
                  div.appendChild(a);




              }

          }, errorCB);
      }, errorCB, successCB);
  }



  function insertData() {

      // Insert record
      db.transaction(insertNote, errorCB, successCB);
  }


  function shortName(){
    var name = document.getElementById('fname').value;
    var lastname =  document.getElementById('lname').value;
    var initials = name.charAt(0)+""+lastname.charAt(0);
      document.getElementById("name").innerHTML = initials;
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





  


  $("#addCustomer").click(function(e){
    e.stopPropagation();
    insertData();
  })







  