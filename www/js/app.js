// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ion-place-tools', 'ngCordova'])

.run(function($ionicPlatform, $rootScope) {
	$ionicPlatform.ready(function() {
	  document.addEventListener("backbutton", onBackKeyDown, false);  
function onBackKeyDown(e) { 
   e.preventDefault(); 
  // alert('Back Button is Pressed!'); 
	}})
	document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("447459d9-ad89-44f8-9377-875aa87da3b3")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
  
  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);
  var userrole = window.localStorage.getItem('role');
	if(userrole=="admin"){
		$rootScope.admincontent = true
	}
})

.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
})
  
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom');
  $stateProvider

  .state('additionalphotos', {
      url: '/additionalphotos',
     templateUrl: 'templates/additionalphotos.html',
	controller: 'additionalphotosctrl'
      })
  .state('additionalphotosadmin', {
      url: '/additionalphotosadmin',
     templateUrl: 'templates/additionalphotosadmin.html',
	controller: 'additionalphotosadminctrl'
      })
	  .state('additionaldetailsadmin', {
      url: '/additionaldetailsadmin',
     templateUrl: 'templates/additionaldetailsadmin.html',
	controller: 'additionaldetailsadminctrl'
      })
	  .state('matrimonialmessages', {
      url: '/matrimonialmessages',
     templateUrl: 'templates/matrimonialmessages.html',
	controller: 'matrimonialmessagesctrl'
      })
	  .state('suitablematch', {
      url: '/suitablematch',
     templateUrl: 'templates/suitablematch.html',
	controller: 'suitablematchctrl'
      })
	  .state('adduser', {
      url: '/adduser',
     templateUrl: 'templates/adduser.html',
	controller: 'adduserctrl'
      })
	    .state('totalrequests', {
      url: '/totalrequests',
     templateUrl: 'templates/totalrequests.html',
	controller: 'totalrequestsctrl'
      })
	   .state('sentrequests', {
      url: '/sentrequests',
     templateUrl: 'templates/sentrequests.html',
	controller: 'sentrequestsctrl'
      })
	  .state('membermessagelist', {
      url: '/membermessagelist',
     templateUrl: 'templates/membermessagelist.html',
	controller: 'membermessagelistctrl'
      })
	  .state('upgradeaccount', {
      url: '/upgradeaccount',
     templateUrl: 'templates/upgradeaccount.html',
	controller: 'upgradeaccountctrl'
      })
  .state('adminmatrimonial', {
      url: '/adminmatrimonial',
     templateUrl: 'templates/admincreatematrimonial.html',
	controller: 'adminmatrimonialctrl'
      })
	  .state('filteredmatrimonials', {
      url: '/filteredmatrimonials',
     templateUrl: 'templates/filteredmatrimonials.html',
	controller: 'filteredmatrimonialsctrl'
      })
	  .state('updatephotos', {
      url: '/updatephotos',
     templateUrl: 'templates/updatephotos.html',
	controller: 'updatephotosctrl'
      })
	  .state('resetpassword', {
      url: '/resetpassword',
     templateUrl: 'templates/resetpassword.html',
	controller: 'resetpasswordctrl'
      })
 
  .state('thanks', {
      url: '/thanks',
     templateUrl: 'templates/thanks.html',
	controller: 'thanksctrl'
      })
	  .state('filteredsearchmatrimonials', {
      url: '/filteredsearchmatrimonials',
     templateUrl: 'templates/filteredsearchmatrimonials.html',
	controller: 'fileteredsearchmatrimonialctrl'
      })
	  .state('careerprofiledetails', {
      url: '/careerprofiledetails',
     templateUrl: 'templates/careerprofiledetails.html',
	controller: 'careerprofiledetailsctrl'
      })
	  .state('requestdetail', {
      url: '/requestdetail',
     templateUrl: 'templates/requestsdetail.html',
	controller: 'requestdetailctrl'
      })
	  .state('states', {
      url: '/states',
     templateUrl: 'templates/states.html',
	controller: 'statesctrl'
      })
	.state('cities', {
      url: '/cities',
     templateUrl: 'templates/cities.html',
	controller: 'citiesctrl'
      })
	  .state('filteredmembers', {
      url: '/filteredmembers',
     templateUrl: 'templates/filteredmembers.html',
	controller: 'filteredmembersctrl'
      })
/*Buisness Profile*/
  .state('business-profile', {
    url: '/business-profile',
   
        templateUrl: 'templates/business-profile.html',
		controller : 'updateprofilectrl'
    
  })
  .state('agentprofile', {
      url: '/agentprofile',
      templateUrl: 'templates/agentprofile.html',
	 controller: 'adminctrl'
      
    })
  .state('members', {
      url: '/members',
     templateUrl: 'templates/members.html',
	controller: 'membersctrl'
      })
	   .state('membermessage', {
      url: '/membermessage',
     templateUrl: 'templates/membermessage.html',
	controller: 'membermessagectrl'
      })
	  .state('memberpersonalmessages', {
      url: '/memberpersonalmessages',
     templateUrl: 'templates/memberpersonalmessages.html',
	controller: 'memberpersonalmessagesctrl'
      })
	   .state('about', {
      url: '/about',
     templateUrl: 'templates/about.html',
     controller: 'homectrl'
      })
	  .state('filteredbysearchmembers', {
      url: '/filteredbysearchmembers',
     templateUrl: 'templates/filteredbysearchmembers.html',
     controller: 'filteredbysearchmembersctrl'
      })
	  .state('searchmatrimonials', {
      url: '/searchmatrimonials',
     templateUrl: 'templates/searchmatrimonials.html',
     controller: 'searchmatrimonialsctrl'
      })
	  .state('additionaldetails', {
      url: '/additionaldetails',
     templateUrl: 'templates/additionaldetails.html',
     controller: 'additionaldetailsctrl'
      })
	.state('searchmember', {
      url: '/searchmember',
     templateUrl: 'templates/searchmember.html',
     controller: 'searchmemberctrl'
      })
	   .state('privacy', {
      url: '/privacy',
     templateUrl: 'templates/privacy.html',
    controller: 'homectrl'
      })
	   .state('help', {
      url: '/help',
     templateUrl: 'templates/help.html',
    controller: 'homectrl'
      })
/*Career Profile*/
  .state('career-profile', {
      url: '/career-profile',
     templateUrl: 'templates/career-profile.html',
	 controller: 'careerprofilectrl'
      })
	  
	   .state('splash', {
      url: '/splash',
     templateUrl: 'templates/splash.html', 
	controller: 'splashctrl'
      })
	 .state('registermember', {
      url: '/registermember',
     templateUrl: 'templates/registermember.html',
	controller: 'registermemberctrl'
      })
	
    /*Register Page*/
  .state('register', {
      url: '/register',
    templateUrl: 'templates/register.html', 
	  controller: 'registerctrl'
      })
	  .state('matrimony', {
      url: '/matrimony',
    templateUrl: 'templates/matrimony.html',
	controller : 'matrimonyctrl'
    
      })
	    .state('matrimonial-detail', {
      url: '/matrimonial-detail',
    templateUrl: 'templates/matrimonial-detail.html',
	controller:'matrimonydetailctrl'
    
      })
	
	 /*Home Page*/
  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    })
	 /*Message Page*/
  .state('messages', {
   url: '/messages',
   templateUrl: 'templates/messages.html',
   controller:'messagesctrl'
    })
	/*Message Page*/
  .state('business-listing', {
      url: '/business-listing',
      templateUrl: 'templates/business-listing.html', 
	  controller: 'businessprofilectrl'
    })
	.state('login', {
      url: '/login',
      templateUrl: 'templates/login.html', 
	  controller: 'loginctrl'
      
    })
	.state('createprofile', {
      url: '/createprofile',
      templateUrl: 'templates/createprofile.html',
	  controller: 'createprofilectrl'
      
    })
	.state('myprofiles', {
      url: '/myprofiles',
      templateUrl: 'templates/myprofiles.html',
	 controller: 'myprofilectrl'
      
    })
		.state('menus', {
      url: '/menus',
      templateUrl: 'templates/menus.html',
	  controller: 'menusctrl'
      
    })
	.state('requests', {
      url: '/requests',
      templateUrl: 'templates/requests.html',
	 controller: 'requestsctrl'
	 
      
    })
	

	
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splash');
});
