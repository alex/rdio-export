var Component = Class.$extend({
    __init__: function($el) {
        this.$el = $el;
        if (this.$class.events) {
            for (var evt in this.$class.events) {
                var parts = evt.split(" ", 2);
                this.$el.on(parts[0], parts[1], this._makeEventHandler(this.$class.events[evt]));
            }
        }
        if (this.$class.template && !this.$class._loadedTemplate && !this.$class._templateLoader) {
            var self = this;
            this.$class._templateLoader = $.ajax("/static/js/site/templates/" + this.$class.template).done(function(data) {
                self.$class._loadedTemplate = data;
            });
        }
    },
    _makeEventHandler: function(name) {
        var self = this;
        return Raven.wrap(function() {
            return self[name].apply(self, arguments);
        });
    },
    getData: function(extraData) {
        return extraData;
    },
    onRendered: function() {},
    render: function(data) {
        data = this.getData(data || {});
        if (!this.$class._loadedTemplate) {
            var self = this;
            this.$class._templateLoader.done(function() {
                self._renderTemplate(data);
            });
        }
        else {
            this._renderTemplate(data);
        }
    },
    _renderTemplate: function(data) {
        var self = this;
        new plate.Template(this.$class._loadedTemplate).render(data, function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                self.$el.html(data);
                self.onRendered();
            }
        });
    }
});
