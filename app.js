var baeApp = angular.module('baeApp', ['ui.router']);

baeApp.controller("baeController", function($scope, $http) {
    console.log("Bae controller loaded");
    $scope.name = "";
    $scope.onSearchClick = function(name){
        if (condition) {
            
        }
    }
});

baeApp.config(function($stateProvider, $urlRouterProvider) {
    console.log("Bae router loaded");
    $urlRouterProvider.otherwise('/home');
    var searchPageTemplate = '<section id="searchForm"><div><div class="brand-img-wrapper"><a href="#" title="Go to Google Home" id="logo"><img alt="Google" class="google-brand-img-big" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"></a></div><div class="searchForm"><div class="searchElmsWrapper"><div class="iblpc" jsname="uFMOof"><style>.uFMOof{margin:auto}.nS8rZ{color:#9AA0A6;height:20px;width:20px;margin-top:3px}</style><div class="uFMOof"><span class="nS8rZ z1asCe MZy1Rb"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></span></div></div></div><input class="gLFyf gsfi" placeholder="Type the name of the most beautiful girl here..." maxlength="2048" name="q" type="text" jsaction="paste:puy29d" aria-autocomplete="both" aria-haspopup="false" autocapitalize="off" autocomplete="off" autocorrect="off" role="combobox" spellcheck="false" title="Search" value="" aria-label="Search" ng-model="name"></div></div><div class="search-optns-wrapper"><div><input class="search-submit-btn" value="Google Search" aria-label="Google Search" name="btnK" ng-click="onSearchClick(name)"> <input class="imfeelinglucky-btn" value="Im Feeling Lucky" aria-label="Im Feeling Lucky" name="btnI"></div></div></section>';

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            template: searchPageTemplate
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('searchResults', {
            url: '/results',
            templateUrl: './views/searchResultsPage.html'       
        });

});
