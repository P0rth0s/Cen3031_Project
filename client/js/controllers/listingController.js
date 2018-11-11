//const dash_addr = 'https://group6-uf-web-app.herokuapp.com/protected/dashboard'
const dash_addr = 'http://localhost:8080/protected/dashboard'

angular.module("listings").controller("ListingsController", [
  "$scope",
  "Listings",
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(
      function(response) {
        $scope.listings = response.data;
        //console.log("response.data: " + response.data);
      },
      function(error) {
        console.log("Unable to retrieve listings:", error);
      }
    );

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
      /**
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
      Listings.create($scope.newListing).then(
        function(res) {
          console.log('created');
          window.location.replace(dash_addr);
        },
        function(error) {
          console.log("Unable to create listing: ", error);
        }
      );
    };

    //check if password is valid.
    $scope.login = function() {
      Listings.login($scope.login_listing).then(
        function(res) {
          console.log('logged in');
          window.location.replace(dash_addr);
        },
        function(error) {
          console.log("Unable to login: ", error);
        }
      );
    };

    $scope.deleteListing = function(index) {
      /**TODO
        Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
       */
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);
