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
        template: (
            '<h3>Hello {{ user|get:"vanityName" }},</h3>' +
            '<p>First you need to choose what data you want to export:</p>' +
            '<ul class="unstyled">' +
            '    <li><label class="checkbox"><input type="checkbox" checked />Your playlists</label></li>' +
            '    <li><label class="checkbox"><input type="checkbox" checked />Playlists you\'ve contributed to</label></li>' +
            '    <li><label class="checkbox"><input type="checkbox" checked />Your collection</label></li>' +
            '    <li><label class="checkbox"><input type="checkbox" checked />Your comments</label></li>' +
            '    <li><label class="checkbox"><input type="checkbox" disabled />Your play history</label></li>' +
            '</ul>')
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
