window.Employee = Backbone.Model.extend({

    urlRoot:"../api/employees",

    defaults: {
        id: null,
        firstName: "",
        lastName: "",
        title: "",
        officePhone: "",
        lastModified: ""
    }


});

window.EmployeeCollection = Backbone.Collection.extend({

    model: Employee,

    url:"../api/employees"

});





window.Customer = Backbone.Model.extend({

    urlRoot:"../api/customers",

    defaults: {
        id: null,
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: ""
    }


});



window.CustomerCollection = Backbone.Collection.extend({

    model: Customer,

    url:"../api/customers"

});
