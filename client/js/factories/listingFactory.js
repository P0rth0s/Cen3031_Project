angular.module("listings", []).factory("Listings", function($http) {
  var methods = {
    getAll: function() {
      return $http.get("http://localhost:8080/api/listings");
    },

    create: function(listing) {
      return $http.post("http://localhost:8080/api/listings", listing);
    },

    delete: function(id) {
      return $http.post("http://localhost:8080/api/listings", id);
    },

    login: function(login_listing) {
      return $http.post(
        "http://localhost:8080/api/listings/login",
        login_listing
      );
    },

    update: function(editListing) {
      return $http.post(
        "http://localhost:8080/api/professor-info/update",
        editListing
      );
    },

    getEditable: function() {
      return $http.get("http://localhost:8080/api/professor-info");
    }

  };

  return methods;
});
