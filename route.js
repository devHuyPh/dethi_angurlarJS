let app = angular.module('myCamera', ['ngRoute'])

app.config(function ($routeProvider) {
    $routeProvider
        .when("/list-camera", {
            templateUrl: "./views/list.html",
            controller: "listCtrl"
        })
        .when("/camera/add", {
            templateUrl: "./views/add.html",
            controller: "addCtrl"
        })
        .when("/detail/camera/:id", {
            templateUrl: "./views/detail.html",
            controller: "detailCtrl"
        })
        .when("/edit/camera/:id", {
            templateUrl: "./views/list.html",
            controller: "editCtrl"
        })

        .otherwise( "/list-camera")
})

