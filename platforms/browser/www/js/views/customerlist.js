window.CustomerListView = Backbone.View.extend({

    initialize:function () {
        var self = this;
        this.model.on("add", function (customer) {
            $(self.el).append(new CustomerListItemView({model:customer}).render().el);
        });
        this.render();
    },

    render:function () {
        $(this.el).empty();
        _.each(this.model.models, function (customer) {
            $(this.el).append(new CustomerListItemView({model:customer}).render().el);
        }, this);
        return this;
    }
});

window.CustomerListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.destroyHandler, this);
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    destroyHandler: function() {
        $(this.el).remove();
    }

});