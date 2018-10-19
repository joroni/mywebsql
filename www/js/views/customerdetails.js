window.CustomerView = Backbone.View.extend({

    initialize: function () {
        this.model.on("change", this.render, this);
        this.render();
    },

    events: {
        "click .save":      "save",
        "click .delete":    "destroy"
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    save: function () {
        this.model.set({first_name: $('#first_name').val(), last_name: $('#last_name').val(), email: $('#email').val()});
        if (this.model.isNew()) {
            app.customers.create(this.model, {
                success: function (model) {
                    
                    app.navigate('/api/customer/add' + model.id, false);
                },
                error: function(model, response) {
                    alert(response.responseText);
                }
            });
        } else {
            this.model.save();
        }
        return false;
    },

    destroy: function () {
        this.model.destroy({
            success: function () {
                alert('Customer deleted successfully');
                window.history.back();
            }
        });
        return false;
    }

});