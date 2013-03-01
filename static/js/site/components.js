var Components = {};

Components.LogInComponent = Component.$extend({
    __classvars__: {
        template: "log-in.html",
        events: {
            "click .btn.log-in": "onLogInClicked"
        }
    },
    onLogInClicked: function() {
        R.authenticate(function(authenticated) {
            if (authenticated) {
                new Components.StartExportComponent(this.$el, R.currentUser).render();
            }
            else {
                alert("You didn't log in. Why not? :(");
            }
        });
        return false;
    }
});

Components.StartExportComponent = Component.$extend({
    __classvars__: {
        template: "start-export.html"
    },
    __init__: function($el, user) {
        this.$super($el);
        this.user = user;
    },
    getData: function(extraData) {
        return $.extend({
            user: this.user
        }, extraData);
    }
});
