const dash_addr = 'https://group6-uf-web-app.herokuapp.com/protected/dashboard'
//const dash_addr = 'http://localhost:8080/protected/dashboard'

angular.module("listings").controller("ListingsController", [
  "$scope",
  "Listings",
  "$http",
  "$sce",
  function ($scope, Listings, $http, $sce) {

    $scope.marker = null;

    const provider = new window.GeoSearch.OpenStreetMapProvider();

    const searchControl = new window.GeoSearch.GeoSearchControl({
      provider: provider,
    });

    const map = new window.L.Map('map');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18
    }).addTo(map);

    map.addControl(searchControl);
    map.setView([29.651940, -82.324996], 13);



    Listings.getCourses().then(
      function (response) {
        $scope.courses = response.data;
        //console.log("response.data: " + JSON.stringify(response.data));
      },
      function (error) {
        console.log("Unable to retrieve listings:", error);
      }
    );

    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(
      function (response) {
        $scope.listings = response.data;
        //console.log("response.data: " + response.data);
      },
      function (error) {
        console.log("Unable to retrieve listings:", error);
      }
    );

    $scope.detailedInfo = undefined;
    $scope.detailedTwitter = undefined;

    $scope.addListing = function () {
      /**
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
      Listings.create($scope.newListing).then(
        function (res) {
          console.log('created');
          window.location.replace(dash_addr);
        },
        function (error) {
          console.log("Unable to create listing: ", error);
        }
      );
    };

    //check if password is valid.
    $scope.login = function () {
      Listings.login($scope.login_listing).then(
        function (res) {
          console.log('logged in');
          window.location.replace(dash_addr);
        },
        function (error) {
          console.log("Unable to login: ", error);
        }
      );
    };

    $scope.deleteListing = function (index) {
      /**TODO
        Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
       */
    };

    $scope.showDetails = function (index, username) {
      if (username) {
        $http.get('twitter/' + username).then(function (resposne) {
          console.log(resposne)
          $scope.detailedTwitter = $sce.trustAsHtml(resposne.data.html);
        })
      }

      $scope.detailedInfo = $scope.listings[index];
      if ($scope.detailedInfo.address) {
        const results = provider.search({
          query: $scope.detailedInfo.address
        }).then(function (results) {
          //console.log(results);
          $scope.marker = window.L.popup()
            .setLatLng([results[0].y, results[0].x])
            .setContent($scope.detailedInfo.address)
            .openOn(map);
        });
      }
    };
  }
]);
