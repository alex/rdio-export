var Components = {};

Components.LogInComponent = Component.$extend({
    __classvars__: {
        template: (
            '<div class="hero-unit">' +
            '    <h1>Start exporting</h1>' +
            '    <p>' +
            '        <a href="#" class="btn btn-primary btn-large log-in">Log In!</a>' +
            '    </p>' +
            '</div>'),
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
        template: 'Hello {{ user|get:"vanityName" }}'
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
