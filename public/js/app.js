"use strict";

(function(){
  angular
  .module("compliments", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    Router
  ])
  // .factory("Candidate", [
  //   "$resource",
  //   ComplimentFactory
  // ])
  // .controller("compIndexCtrl", [
  //   "Compliment",
  //   compIndexCtrl
  // ])
  // .controller("compShowCtrl", [
  //   "Compliment",
  //   "$stateParams",
  //   "$window",
  //   compShowCtrl
  // ]);

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);
  $stateProvider
  .state("welcome", {
    url: "/",
    templateUrl: "/assets/html/app-welcome.html"
  });
  // .state("index", {
  //   url: "/candidates",
  //   templateUrl: "/assets/html/candidates-index.html",
  //   controller: "candIndexCtrl",
  //   controllerAs: "indexVM"
  // })
  // .state("show", {
  //   url: "/candidates/:name",
  //   templateUrl: "/assets/html/candidates-show.html",
  //   controller: "candShowCtrl",
  //   controllerAs: "showVM"
  // });
  $urlRouterProvider.otherwise("/");
}

})();
