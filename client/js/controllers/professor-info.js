angular.module("listings").controller("ProfessorInfoController", [
  "$scope",
  "Listings",
  function($scope, Listings) {
    /*
      Listings.getAll().then(
        function(response) {
          $scope.listings = response.data;
          //console.log("response.data: " + response.data);
        },
        function(error) {
          console.log("Unable to retrieve listings:", error);
        }
      );
    */
    $scope.UFPeriods = [
      {
        period: "1",
        beginTime: "7:25",
        endTime: "8:15"
      },
      {
        period: "2",
        beginTime: "8:30",
        endTime: "9:20"
      },
      {
        period: "3",
        beginTime: "9:35",
        endTime: "10:25"
      },
      {
        period: "4",
        beginTime: "10:40",
        endTime: "11:30"
      },
      {
        period: "5",
        beginTime: "11:45",
        endTime: "12:35"
      },
      {
        period: "6",
        beginTime: "12:50",
        endTime: "1:40"
      },
      {
        period: "7",
        beginTime: "1:55",
        endTime: "2:45"
      },
      {
        period: "8",
        beginTime: "3:00",
        endTime: "3:50"
      },
      {
        period: "9",
        beginTime: "4:05",
        endTime: "4:55"
      },
      {
        period: "10",
        beginTime: "5:10",
        endTime: "6:00"
      },
      {
        period: "11",
        beginTime: "6:15",
        endTime: "7:05"
      },
      {
        period: "E1",
        beginTime: "7:20",
        endTime: "8:10"
      },
      {
        period: "E2",
        beginTime: "8:20",
        endTime: "9:10"
      },
      {
        period: "E3",
        beginTime: "9:20",
        endTime: "10:10"
      }
    ];

    $scope.editableListing = {};

    $scope.update = function() {
      $scope.editableListing.email = $scope.edit.email;
      console.log("update: " + $scope.editableListing);
      Listings.update($scope.editableListing).then(
        function(res) {
          console.log("Updated!");
        },
        function(error) {
          console.log("Update error: ", error);
        }
      );
      document.getElementById("form-hidden").style.display = "none";
    };

    Listings.getEditable().then(
      function(response) {
        console.log("res data " + response.data);
        $scope.listings = response.data;
        //console.log("response.data: " + response.data);
      },
      function(error) {
        console.log("Unable to retrieve listings:", error);
      }
    );

    $scope.listings = Listings;

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
      /**
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */

      Listings.create($scope.newListing).then(
        function(res) {
          $scope.listings.push(this.newListing);
          res.redirect("/");
        },
        function(error) {
          res.redirect("/"); //TODO create error page
          console.log("Unable to create listing: ", error);
        }
      );
    };

    $scope.deleteListing = function(index) {
      /**TODO
        Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
       */
      $scope.del = $scope.listings.filter(x => x.name === index)[0];
      $scope.listings.splice($scope.listings.indexOf($scope.del), 1);
      Listings.delete($scope.del._id).then(
        function(response) {},
        function(error) {
          console.log("Failed to delete entry:", error);
        }
      );
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings.filter(x => x.name === index)[0];
    };

    $scope.editListing = function(index) {
      document.getElementById("form-hidden").style.display = "block";

      $scope.edit = $scope.listings.filter(x => x.name === index)[0];
      console.log($scope.edit);

      document.getElementById("form_name").value = $scope.edit.name;
      document.getElementById("form_role").value = $scope.edit.role;
      document.getElementById("form_email").value = $scope.edit.email;
      if ($scope.edit.address !== undefined) {
        document.getElementById("form_address").value = $scope.edit.address;
      } else document.getElementById("form_address").value = "";
      if ($scope.edit.twitter !== undefined) {
        document.getElementById("form_twitter").value = $scope.edit.twitter;
      } else document.getElementById("form_twitter").value = "";
      if ($scope.edit.researchAndJobs !== undefined) {
        document.getElementById("form_researchAndJobs").value =
          $scope.edit.researchAndJobs;
      } else document.getElementById("form_researchAndJobs").value = "";

      //counter buttons for courses
      $scope.count_up = document.getElementById("count_up");
      $scope.count_up.onclick = function() {
        $scope.key = Object.keys($scope.edit.courses).length;
        $scope.edit.courses[$scope.key] = "";
      };
      $scope.count_down = document.getElementById("count_down");
      $scope.count_down.onclick = function() {
        //for now, deletes the last in the array
        //will fix to delete a selected course in the future?
        $scope.key = Object.keys($scope.edit.courses).length - 1;
        $scope.edit.courses.splice($scope.key, 1);
      };

      //counter buttons for hours

      $scope.count_up_hours = document.getElementById("count_up_hours");
      $scope.count_up_hours.onclick = function() {
        $scope.key = Object.keys($scope.edit.office_hours).length;
        $scope.edit.office_hours[$scope.key] = "";
      };
      $scope.count_down_hours = document.getElementById("count_down_hours");
      $scope.count_down_hours.onclick = function() {
        $scope.key = Object.keys($scope.edit.office_hours).length - 1;
        $scope.edit.office_hours.splice($scope.key, 1);
      };

      document.getElementById("form_cancel").onclick = function() {
        document.getElementById("form-hidden").style.display = "none";
      };

      //local save
      document.getElementById("form_submit").onclick = function() {
        //name
        $scope.edit.name = document.getElementById("form_name").value;
        //address
        $scope.edit.address = document.getElementById("form_address").value;
        //twitter
        $scope.edit.twitter = document.getElementById("form_twitter").value;
        //research and jobs
        $scope.edit.researchAndJobs = document.getElementById(
          "form_researchAndJobs"
        ).value;

        //save courses
        for (var i = 3; i <= 2 + Object.keys($scope.edit.courses).length; i++) {
          $scope.edit.courses[i - 3] = document.forms["edit"].elements[i].value;
        }

        //save hours
        //range is (3+courses.length) to (2+courses.length+hours.length)
        //index in object is i - 3 - # of courses
        //and the index from the form is i+2 for some reason

        for (
          var i = 3 + Object.keys($scope.edit.courses).length;
          i <=
          2 +
            Object.keys($scope.edit.courses).length +
            Object.keys($scope.edit.office_hours).length;
          i++
        ) {
          $scope.edit.office_hours[
            i - 3 - Object.keys($scope.edit.courses).length
          ] = document.forms["edit"].elements[i + 2].value;
        }
      };
    };
  }
]);
