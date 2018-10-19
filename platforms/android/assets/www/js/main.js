var AppRouter = Backbone.Router.extend({

    routes: {
        "employees/add"         : "addEmployee",
        "employees/:id"         : "editEmployee",
        "customers/add"         : "addCustomer",
        "customers/:id"         : "editCustomer"
    },

    initialize: function(options) {
        this.employees = options.employees;
        this.customers = options.customers;
    },

    editEmployee: function (id) {
        var employee = this.employees.get(id);
        if (this.currentView) {
            this.currentView.undelegateEvents();
            $(this.currentView.el).empty();
        }
        this.currentView = new EmployeeView({model: employee, el: "#content"});
    },

    editCustomer: function (id) {
        var customer = this.customers.get(id);
        if (this.currentView) {
            this.currentView.undelegateEvents();
            $(this.currentView.el).empty();
        }
        this.currentView = new CustomerView({model: customer, el: "#content"});
    },

	addEmployee: function() {
        var employee = new Employee();
        if (this.currentView) {
            this.currentView.undelegateEvents();
            $(this.currentView.el).empty();
        }
        this.currentView = new EmployeeView({model: employee, el: "#content"});
    },
    addCustomer: function() {
        var customer = new Customer();
        if (this.currentView) {
            this.currentView.undelegateEvents();
            $(this.currentView.el).empty();
        }
        this.currentView = new CustomerView({model: customer, el: "#content"});
	}

});

utils.loadTemplate(['HeaderView', 'EmployeeView', 'EmployeeListItemView','CustomerView', 'CustomerListItemView'], function() {
    var headerView = new HeaderView({el: '.header'});
    var employees = new EmployeeCollection();
    var customers = new CustomerCollection();
    employees.fetch({success: function(){
        var listView = new EmployeeListView({model: employees, el: "#list"});
        this.app = new AppRouter({employees: employees});
        Backbone.history.start();
    }});
    customers.fetch({success: function(){
        var listView2 = new CustomerListView({model: customers, el: "#list2"});
        this.app = new AppRouter({customers: customers});
        Backbone.history.start();
    }});
});