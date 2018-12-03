//const addr = 'https://group6-uf-web-app.herokuapp.com';
const addr = 'http://localhost:8080';

angular.module("listings", []).factory("Listings", function ($http) {
  var methods = {
    getAll: function () {
      return $http.get(addr + "/api/listings");
    },

    create: function (listing) {
      return $http.post(addr + "/api/listings", listing);
    },

    delete: function (id) {
      return $http.post(addr + "/api/listings", id);
    },

    login: function (login_listing) {
      return $http.post(
        addr + "/api/listings/login",
        login_listing
      );
    },

    update: function (editListing) {
      return $http.post(
        addr + "/api/professor-info/update",
        editListing
      );
    },

    getEditable: function () {
      return $http.get(addr + "/api/professor-info");
    },

    getCourses: function (params) {
      return $http.get(
        addr + "/api/listings/courses",
        { params });
    }

  };

  return methods;
});
