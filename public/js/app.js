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
  .directive("complimentForm", [
    "$state",
    "$stateParams",
    "Compliment",
    complimentForm
  ])
  .controller("compIndexCtrl", [
    "Compliment",
    compIndexCtrl
  ])
  .controller("compShowCtrl", [
    "Compliment",
    "$stateParams",
    "$window",
    compShowCtrl
  ]);

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
    .state("show", {
      url: "/compliments/:compliment",
      templateUrl: "/assets/html/compliments-show.html",
      controller: "compShowCtrl",
      controllerAs: "compShowVM"
    });
    $urlRouterProvider.otherwise("/");
  }

  function ComplimentFactory($resource){
    var Compliment = $resource("/api/compliments/:compliment", {}, {
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

  function complimentForm($state, $stateParams, Compliment){
    var directive = {};
    directive.templateUrl = "public/html/compliments-form.html";
    directive.scope = {
      compliment: "=",
      action: "@"
    };
    directive.link = function(scope){
      var originalCompliment = $stateParams.compliment;
      scope.create = function(){
        Compliment.save({compliment: scope.compliment}, function(response){
          var compliment = new Compliment(response);
          Compliment.all.push(compliment);
          $state.go("show", {compliment: compliment.compliment});
        });
      };
      scope.update = function(){
        Compliment.update({compliment: originalCompliment}, {compliment: scope.compliment}, function(compliment){
          console.log("Updated!");
          $state.go("show", {compliment: compliment.compliment});
        });
      };
      scope.delete = function(){
        var index = Compliment.all.indexOf(scope.compliment);
        Compliment.remove({compliment: originalCompliment}, function(response){
          Compliment.all.splice(index, 1);
          $state.go("index");
        });
      };
    };
    return directive;
  }

  function compIndexCtrl(Compliment){
    var vm = this;
    vm.compliments = Compliment.all;
  }

  function compShowCtrl(Compliment, $stateParams, $window){
    var vm = this;
    Compliment.find("compliment", $stateParams.compliment, function(compliment){
      vm.compliment = compliment;
    });
    // vm.update = function(){
    //   Compliment.update({compliment: vm.compliment.compliment}, {compliment: vm.compliment}, function(){
    //     console.log("Done!");
    //   });
    // };
    // vm.delete = function(){
    //   Compliment.remove({compliment: vm.compliment.compliment}, function(){
    //     $window.location.replace("/");
    //   });
    // };
  }

})();
