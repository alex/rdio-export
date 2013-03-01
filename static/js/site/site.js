utils = {
    stopEvent: function(e) {
        e.preventDefault();
        e.stopPropagation();
    }
};

$(function() {
    R.ready(function() {
        plate.Template.Meta.registerFilter("get", function(obj, fieldName) {
            return obj.get(fieldName);
        });
        if (R.authenticated()) {
            new Components.StartExportComponent($("#body"), R.currentUser).render();
        }
        else {
            new Components.LogInComponent($("#body")).render();
        }
    });
});
