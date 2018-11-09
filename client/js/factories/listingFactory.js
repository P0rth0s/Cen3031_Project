angular.module("listings", []).factory("Listings", function($http) {
  var methods = {
    getAll: function() {
      return $http.get("https://group6-uf-web-app.herokuapp.com/api/listings");
    },

    create: function(listing) {
      return $http.post("https://group6-uf-web-app.herokuapp.com/api/listings", listing);
    },

    delete: function(id) {
      return $http.post("https://group6-uf-web-app.herokuapp.com/api/listings", id);
    },

    login: function(login_listing) {
      return $http.post(
        "https://group6-uf-web-app.herokuapp.com/api/listings/login",
        login_listing
      );
    },

    update: function(editListing) {
      return $http.post(
        "https://group6-uf-web-app.herokuapp.com:8080/api/professor-info/update",
        editListing
      );
    },

    getEditable: function() {
      return $http.get("https://group6-uf-web-app.herokuapp.com/api/professor-info");
    }

  };

  return methods;
});
