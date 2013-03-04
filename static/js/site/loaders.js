App.Loaders = {};

var Loader = Class.$extend({
    __classvars__: {
        ITEMS_PER_FETCH: 25
    },
    __init__: function(user) {
        this.user = user;
        this.data = [];
    }
});

var PlaylistLoader = Loader.$extend({
    load: function(component) {
        this._requestPlaylists(component, 0);
    },
    _requestPlaylists: function(component, start) {
        var self = this;
        R.request({
            "method": "getUserPlaylists",
            content: {
                user: this.user.get("key"),
                kind: this.$class.playlistKind,
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

App.Loaders.Playlists = PlaylistLoader.$extend({
    __classvars__: {
        attrName: "playlists",
        playlistKind: "owned"
    }
});

App.Loaders.PlaylistsContributed = PlaylistLoader.$extend({
    __classvars__: {
        attrName: "playlists_contributed",
        playlistKind: "collab"
    }
});

App.Loaders.Collection = Loader.$extend({
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


App.Loaders.Comments = Loader.$extend({
    __classvars__: {
        attrName: "comments"
    },
    load: function(component) {
        this._requestComments(component, 0, true);
    },
    _requestComments: function(component, start, first) {
        var self = this;
        R.request({
            "method": "getUserComments",
            content: {
                user: this.user.get("key"),
                start: start,
                count: this.$class.ITEMS_PER_FETCH
            },
            success: function(response) {
                if (first) {
                    component.updateTotal(response.result.totalCount);
                }
                component.updateLoaded(response.result.comments.length);
                for (var idx in response.result.comments) {
                    self.data.push(response.result.comments[idx]);
                }
                if (response.result.comments.length >= self.$class.ITEMS_PER_FETCH) {
                    self._requestComments(component, start + self.$class.ITEMS_PER_FETCH);
                }
                else {
                    component.finished();
                }
            }
        });
    }
});
