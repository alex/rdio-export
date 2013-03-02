var Loaders = {};

var Loader = Class.$extend({
    __classvars__: {
        ITEMS_PER_FETCH: 25
    },
    __init__: function(user) {
        this.user = user;
        this.data = [];
    }
});

Loaders.Playlists = Loader.$extend({
    __classvars__: {
        attrName: "playlists"
    },
    load: function(component) {
        this._requestPlaylists(component, 0);
    },
    _requestPlaylists: function(component, start) {
        var self = this;
        R.request({
            "method": "getUserPlaylists",
            content: {
                user: this.user.get("key"),
                kind: "owned",
                start: start,
                count: this.$class.ITEMS_PER_FETCH,
                extras: ["tracks"]
            },
            success: function(response) {
                component.updateTotal(response.result.length);
                component.updateLoaded(response.result.length);
                for (var idx in response.result) {
                    self.data.push(response.result[idx]);
                }
                if (response.result.length >= self.$class.ITEMS_PER_FETCH) {
                    self._requestPlaylists(component, start + self.$class.ITEMS_PER_FETCH);
                }
                else {
                    component.finished();
                }
            }
        });
    }
});

Loaders.Collection = Loader.$extend({
    __classvars__: {
        attrName: "collection"
    },
    load: function(component) {
        this._requestCollection(component, 0, true);
    },
    _requestCollection: function(component, start, first) {
        var self = this;
        R.request({
            "method": "getAlbumsInCollection",
            content: {
                user: this.user.get("key"),
                start: start,
                count: this.$class.ITEMS_PER_FETCH,
                v: 20130301
            },
            success: function(response) {
                if (first) {
                    component.updateTotal(response.result.total);
                }
                component.updateLoaded(response.result.items.length);
                for (var idx in response.result.items) {
                    self.data.push(response.result.items[idx]);
                }
                if (response.result.items.length >= self.$class.ITEMS_PER_FETCH) {
                    self._requestCollection(component, start + self.$class.ITEMS_PER_FETCH);
                }
                else {
                    component.finished();
                }
            }
        });
    }
});
