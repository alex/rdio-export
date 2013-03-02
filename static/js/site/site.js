App.utils = {
    stopEvent: function(e) {
        e.preventDefault();
        e.stopPropagation();
    }
};

Raven.config("https://1c57a3e6b639450cafc418709c7e9a54@app.getsentry.com/5995").install();

$(function() {
    R.ready(function() {
        plate.Template.Meta.registerFilter("get", function(obj, fieldName) {
            return obj.get(fieldName);
        });
        if (R.authenticated()) {
            new App.Components.StartExportComponent($("#body"), R.currentUser).render();
        }
        else {
            new App.Components.LogInComponent($("#body")).render();
        }
    });
});
