angular.module("directoryApp").controller("ProfessorInfoController", [
  "$scope",
  function($scope) {
    $scope.officeHours = [{ begin: "", end: "" }];
    $scope.courses = [""];
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

    $scope.addHoursInput = function() {
      $scope.officeHours.push({ begin: "", end: "" });
    };

    $scope.removeHoursInput = function(index) {
      $scope.officeHours.splice(index, 1);
    };

    $scope.addCourseInput = function() {
      $scope.courses.push({ begin: "", end: "" });
    };

    $scope.removeCourseInput = function(index) {
      $scope.courses.splice(index, 1);
    };

    $scope.log = x => {
      console.log(x);
    };
  }
]);
