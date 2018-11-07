const dash_addr = 'http://localhost:8080/protected/dashboard'

angular
	.module("listings")
	.controller("ListingsController", [
		"$scope",
		"Listings",
		"$http",
		"$sce",
		ListingsController
	]);

function ListingsController($scope, Listings, $http, $sce) {
	$scope.detailedInfo = undefined;

	/* Get all the listings, then bind it to the scope */
	Listings
		.getAll()
		.then(function (response) {
			$scope.listings = response.data.filter(function (listing) {
				return listing.role !== 'student'
			});
			$scope.listings[0].courses.push("test");
		})
		.catch(function (error) {
			console.log("Unable to retrieve listings:", error);
		});

	$scope.onDetailedClick = function (username) {
		if (username) {
			$http.get('https://publish.twitter.com/oembed', {
				params: {
					"url": "https://twitter.com/" + username,
					"limit": "6",
					"maxwidth": "500"
				}
			}).then(function (resposne) {
				console.log(resposne)
				$scope.detailedInfo = $sce.trustAsHtml(resposne.data.html);
			})
		}
	}
};