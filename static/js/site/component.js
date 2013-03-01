var Component = Class.$extend({
    __init__: function($el) {
        this.$el = $el || null;
        if (this.$class.events) {
            for (var evt in this.$class.events) {
                var parts = evt.split(" ", 2);
                this.$el.on(parts[0], parts[1], this._makeEventHandler(this.$class.events[evt]));
            }
        }
    },
    _makeEventHandler: function(name) {
        var self = this;
        return function() {
            return self[name].apply(self, arguments);
        };
    },
    getData: function(extraData) {
        return extraData;
    },
    render: function(data) {
        var self = this;
        data = this.getData(data || {});
        new plate.Template(this.$class.template).render(data, function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                self.$el.html(data);
            }
        });
    }
});
