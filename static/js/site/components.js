App.Components = {};

App.Components.LogInComponent = Component.$extend({
    __classvars__: {
        template: "log-in.html",
        events: {
            "click .btn.log-in": "onLogInClicked"
        }
    },
    onLogInClicked: function(e) {
        App.utils.stopEvent(e);
        R.authenticate(function(authenticated) {
            if (authenticated) {
                new App.Components.StartExportComponent(this.$el, R.currentUser).render();
            }
            else {
                alert("You didn't log in. Why not? :(");
            }
        });
    }
});

App.Components.StartExportComponent = Component.$extend({
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
        App.utils.stopEvent(e);
        var options = [
            ["playlists", App.Loaders.Playlists],
            ["playlists-contributed", App.Loaders.PlaylistsContributed],
            ["collection", App.Loaders.Collection]
            // ["comments", null],
            // ["play-history", null]
        ];
        var loaders = [];
        for (var idx in options) {
            var name = options[idx][0];
            var loader = options[idx][1];
            if (this.$el.find("#" + name).is(":checked")) {
                loaders.push(new loader(this.user));
            }
        }
        new App.Components.Export(this.$el.find("#export-body"), this.user, loaders).render();
    }
});

App.Components.Export = Component.$extend({
    __classvars__: {
        template: "export.html"
    },
    __init__: function($el, user, loaders) {
        this.$super($el);
        this.user = user;
        this.loaders = loaders;
        this.loaded = 0;
        this.total = 0;
        this.finishedLoaders = 0;
    },
    getData: function(extraData) {
        return $.extend({
            user: this.user,
            loaders: this.loaders
        }, extraData);
    },
    _updateProgress: function() {
        this.$el.find(".bar").css("width", (this.loaded / this.total) * 100 + "%");
    },
    updateLoaded: function(value) {
        this.loaded += value;
        this._updateProgress();
    },
    updateTotal: function(value) {
        this.total += value;
        this._updateProgress();
    },
    finished: function() {
        this.finishedLoaders += 1;
        if (this.finishedLoaders == this.loaders.length) {
            var data = {};
            for (var idx in this.loaders) {
                data[this.loaders[idx].$class.attrName] = this.loaders[idx].data;
            }
            new App.Components.Download(this.$el, data).render();
        }
    },
    onRendered: function() {
        for (var idx in this.loaders) {
            this.loaders[idx].load(this);
        }
    }
});

App.Components.Download = Component.$extend({
    __classvars__: {
        template: "download.html"
    },
    __init__: function($el, data) {
        this.$super($el);
        this.data = data;
    },
    getData: function(extraData) {
        return $.extend({
            url: window.URL.createObjectURL(new Blob([JSON.stringify(this.data)]))
        }, extraData);
    }
});
