var Components = {};

Components.LogInComponent = Component.$extend({
    __classvars__: {
        template: "log-in.html",
        events: {
            "click .btn.log-in": "onLogInClicked"
        }
    },
    onLogInClicked: function(e) {
        utils.stopEvent(e);
        R.authenticate(function(authenticated) {
            if (authenticated) {
                new Components.StartExportComponent(this.$el, R.currentUser).render();
            }
            else {
                alert("You didn't log in. Why not? :(");
            }
        });
    }
});

Components.StartExportComponent = Component.$extend({
    __classvars__: {
        template: "start-export.html",
        events: {
            "click .btn.export": "onExportClicked"
        }
    },
    __init__: function($el, user) {
        this.$super($el);
        this.user = user;
    },
    getData: function(extraData) {
        return $.extend({
            user: this.user
        }, extraData);
    },
    onExportClicked: function(e) {
        utils.stopEvent(e);
        var options = [
            ["playlists"],
            ["playlists-contributed"],
            ["collection"],
            ["comments"],
            ["play-history"]
        ];
        var chosen = [];
        for (var option in options) {
            if (this.$el.children("#" + options[option]).is(":checked")) {
                chosen.push(options[option]);
            }
        }
        new Components.Export(this.$el.children("#export-body"), this.user, options).render();
    }
});

Components.Export = Component.$extend({
    __classvars__: {
        template: "export.html"
    },
    __init__: function($el, user, options) {
        this.$super($el);
        this.user = user;
        this.options = options;
    },
    getData: function(extraData) {
        return $.extend({
            user: this.user,
            options: this.options
        }, extraData);
    }
});
