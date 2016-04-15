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
  .factory("Compliment", [
    "$resource",
    ComplimentFactory
  ])
  .controller("compIndexCtrl", [
    "Compliment",
    compIndexCtrl
  ]);
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
    })
    .state("index", {
      url: "/compliments",
      templateUrl: "/assets/html/compliments-index.html",
      controller: "compIndexCtrl",
      controllerAs: "compIndexVM"
    })
    // .state("show", {
    //   url: "/candidates/:name",
    //   templateUrl: "/assets/html/candidates-show.html",
    //   controller: "candShowCtrl",
    //   controllerAs: "showVM"
    // });
    $urlRouterProvider.otherwise("/");
  }

  function ComplimentFactory($resource){
    var Compliment = $resource("/api/compliments/:name", {}, {
      update: {method: "PUT"}
    });
    Compliment.all = Compliment.query();
    Compliment.find = function(property, value, callback){
      Compliment.all.$promise.then(function(){
        Compliment.all.forEach(function(compliment){
          if(compliment[property] == value) callback(compliment);
        });
      });
    };
    return Compliment;
  }

  function compIndexCtrl(Compliment){
    var vm = this;
    vm.compliments = Compliment.all;
  }

})();
