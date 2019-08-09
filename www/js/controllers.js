angular.module('starter.controllers', [])


.controller('loginctrl', function($scope, $ionicPopup, $state, $ionicLoading, $ionicModal, $http, $rootScope, $window, $location){
	
	$scope.credentials = {};
	$scope.user = {};
	$ionicModal.fromTemplateUrl('templates/resendotp.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalo = modal;
  });
	$ionicModal.fromTemplateUrl('templates/emaillink.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.sendlink = function(credentials){
if (credentials.number){
$http.post('http://listingapp.ssalumni.com/api/user/forget_password', {
"mobile": credentials.number
}).success(function(res){
		console.log(res);
		alert("new password sent to your number");
		$scope.credentials.number = "";
		$scope.modal.hide();
})}
 else{
  alert('please enter number');
  
  } }
$scope.newotp = function(user){
	if (user.number){
$http.post('http://listingapp.ssalumni.com/api/user/resendOTP', {
"mobile": user.number
}).success(function(res){
		console.log(res);
		alert("new otp sent to your number");
		$scope.user.number = "";
		$window.location.reload(true);
		$state.go('thanks');
})}
 else{
  alert('please enter number');
  
  }
}
  $scope.resendotp = function(){
     $scope.modalo.show();	
	 // document.getElementById('demo').innerHTML = Date();
	}
  $scope.sendemail = function(){
	  $scope.modal.show();
  }
	$scope.loginData = {};
	$scope.signup = function(){
		
		$state.go('register');
	}
$scope.login = function(loginData) {
	 if (loginData.number && loginData.password) {
	$http.post("http://listingapp.ssalumni.com/api/user/login", {mobile : loginData.number,  password : loginData.password   })
    .then(function(response) {
		console.log(response);
		
       console.log(response.data.message);
	   
	   if(response.data.message ==  'Login Successfully!'){
		   $ionicLoading.show({
                template: 'Signing In...',
            });
		
	  
          $ionicLoading.hide();
			$rootScope.id = response.data.user_id;
	       $rootScope.username = response.data.name ; 
	    window.localStorage.setItem('username',$rootScope.username);
		 window.localStorage.setItem('mobile',loginData.number);
	   console.log($rootScope.id);
	   window.localStorage.setItem('id',$rootScope.id);
	   window.localStorage.setItem('role',response.data.role);
	   if(response.data.role=="admin"){
		   $rootScope.admincontent = true;
	   } else{$rootScope.admincontent = false;}
		
	 
	 $http.post("http://listingapp.ssalumni.com/api/user/payment", {user_id: $rootScope.id  })
    .then(function(response) {
	console.log(response);
	// alert("please pay your matrimonial fee" + response.data[0].total_payment )})
	 $window.location.reload(true);
	window.localStorage.setItem('payment', response.data[0].total_payment);})
		   $state.go('menus');
		
		   $scope.loginData.number = "";
	       $scope.loginData.password = "";
			 } else if (response.data.code == 1){
	   alert(response.data.message);
	      $scope.loginData.number = "";
		  $scope.loginData.password = "";} 
	   else{
		   alert(response.data.message);
		    $scope.loginData.number = "";
		    $scope.loginData.password = "";
		   $state.go('thanks');
	   }
    });
	
    } else
            alert("Please enter mobile number and password both");  
   
 }
})
.controller('suitablematchctrl', function($scope, $state, $http, $ionicModal, $ionicLoading, $timeout, $ionicPopup){
	$scope.profilepage = function(){
		$state.go('myprofiles');
	}
	
	
	var senderid =   window.localStorage.getItem('id');
	$ionicModal.fromTemplateUrl('templates/individualprofile.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
   $ionicModal.fromTemplateUrl('templates/sendinterest.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
 
 
  $scope.membersdetail  = function(member){
    console.log('userid', senderid)
	  console.log(member.id);
	  $scope.modal.show();
	  $http.post('http://listingapp.ssalumni.com/api/user/matrimonial_profile', {id:member.id}).success(function(res){
		console.log(res);
		$scope.postingdate = res[0].posted_by;
		$scope.dob = res[0].dob;
	$scope.birthplace = res[0].birth_place;
	$scope.birthtime = res[0].birth_time;
	$scope.dateofbirth = res[0].date_of_birth;
	$scope.brotheroccupation = res[0].brother_occupation;
	$scope.sisteroccupation = res[0].sister_occupation;
	$scope.Fatheroccupation = res[0].father_occupation;
	$scope.Motheroccupation = res[0].mother_occupation;
	$scope.gotra = res[0].gotra;
	$scope.preferencehightfrom = res[0].preference_height_from;
	$scope.preferencehightto = res[0].preference_height_to;
	$scope.occupation = res[0].occupation;
	$scope.income = res[0].income;
	$scope.kuldevta = res[0].kul_devta;
	$scope.kundli = res[0].kundli;
	$scope.hobby = res[0].hobby;
	$scope.agefrom = res[0].age_from;
	$scope.ageto = res[0].age_to;
	$scope.preferencelocation = res[0].preference_location;
	$scope.preferenceservice = res[0].preference_service;
	$scope.photo = res[0].photo;
	$scope.name = res[0].name;
	$scope.location = res[0].location;
	$scope.complexion =  res[0].complexion;
	$scope.joindate =  res[0].join_date;
	$scope.gender = res[0].gender ; 
	$scope.company = res[0].job_company;
	$scope.designation = res[0].designation;
	$scope.about = res[0].about;
	$scope.fathername = res[0].father_name;
	$scope.education = res[0].education;
	$scope.height = res[0].height;
	$scope.weight = res[0].weight;
	 $scope.id = res[0].id;
   $scope.userid = res[0].user_id;
    $scope.emailid = res[0].email_id;
	if(res[0].photo1=="http://listingapp.ssalumni.com/uploads/additional/"){
	  $scope.photo1 = "img/blankperson.jpg"}
	  else{  $scope.photo1 = res[0].photo1}
	   if(res[0].photo2=="http://listingapp.ssalumni.com/uploads/additional/"){
	  $scope.photo2 = "img/blankperson.jpg"}
	  else{  $scope.photo2 = res[0].photo2}
	});
  } 
  $scope.newlink3 = function(){
		document.addEventListener('deviceready', function () {
		var ref = cordova.InAppBrowser.open('https://www.payumoney.com/paybypayumoney/#/CA3C99BF606F9B383A90432B769DF916', '_blank', 'location=yes');
		window.open = cordova.InAppBrowser.open;})
	}
   $scope.sendinterest = function(){
		$scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: 'Are you sure you selected the profile as suitable match?',
         scope: $scope,
			
         buttons: [
            { text: 'Yes', type: 'button-energized',  onTap: function(e){ $scope.modal2.show();
  
   var link = "http://listingapp.ssalumni.com/api/user/filltered_my_matrimonials" ; 
 var userid = window.localStorage.getItem('id');
 console.log($scope.gender);
 $http.post(link, {user_id: userid, gender: $scope.gender})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	if(res.data==""){
	  	$scope.creatematrimonial = "No matrimonial profile! Click here to create one"
		$scope.profiles = "";
  } else{
  $scope.profiles = res.data;
  $scope.creatematrimonial = "";}
}); return $scope.data.model; } }, {
               text: '<b>No</b>',
               type: 'button-positive',
                  onTap: function(e) {
						
                     if (!$scope.data.model) {
                        //don't allow the user to close unless he enters model...
                          return $scope.data.model;
                     } else {
                        // return $scope.data.model;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
  /*  $scope.modal2.show();
  
   var link = "http://listingapp.ssalumni.com/api/user/filltered_my_matrimonials" ; 
 var userid = window.localStorage.getItem('id');
 console.log($scope.gender);
 $http.post(link, {user_id: userid, gender: $scope.gender})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	if(res.data==""){
	  	$scope.creatematrimonial = "No matrimonial profile! Click here to create one"
		$scope.profiles = "";
  } else{
  $scope.profiles = res.data;
  $scope.creatematrimonial = "";}
})*/}
   $scope.sendmessage = function(profile){
	     $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model" style="height:80px;">',
         title: 'Type Your Message',
         scope: $scope,
			
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Send</b>',
               type: 'button-positive',
                  onTap: function(e) {
						
                     if ($scope.data.model) {
						 console.log($scope.data.model);
						 var link = "http://listingapp.ssalumni.com/api/user/send_message";
	 $http.post(link, {sender_id: senderid, reciever_id: $scope.userid , requester_parent_id: profile.id,  parent_id: $scope.id,"type": "M","message": $scope.data.model})
   .success(function (res){  //if a response is recieved from the server.
  console.log(res);
  if(res.status==true){
  $ionicLoading.show({
                template: '<h2>Your Request has been sent</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
  });
  $scope.modal2.hide();}else{alert(res.message)
  $scope.modal2.hide();} 
}) 
return $scope.data.model
 e.preventDefault();
                     } else {
						 var link = "http://listingapp.ssalumni.com/api/user/send_message";
	 $http.post(link, {sender_id: senderid, reciever_id: $scope.userid , requester_parent_id: profile.id,  parent_id: $scope.id,"type": "M","message": "I am interested"})
   .success(function (res){  //if a response is recieved from the server.
  console.log(res);
  if(res.status==true){
  $ionicLoading.show({
                template: '<h2>Your Request has been sent</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
  });
  $scope.modal2.hide();}else{alert(res.message)
  $scope.modal2.hide();} 
}) 
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
   }
	  /* console.log(senderid + $scope.userid + profile.id + $scope.id)
 var link = "http://listingapp.ssalumni.com/api/user/send_message";
	 $http.post(link, {sender_id: senderid, reciever_id: $scope.userid , requester_parent_id: profile.id,  parent_id: $scope.id,"type": "M","message": "I am interested"})
   .success(function (res){  //if a response is recieved from the server.
  console.log(res);
  if(res.status==true){
  $ionicLoading.show({
                template: '<h2>Your Request has been sent</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
  });
  $scope.modal2.hide();}else{alert(res.message)
  $scope.modal2.hide();} 
}) */
 
  $scope.setbackgroundimage = function(member){
	 if(member.gender=="Female"){
	return {  background:"url('img/female_icon.png') no-repeat left", "background-position":"270px 130px", "background-size": "50px"} }
	else{return {  background:"url('img/male_icon.png') no-repeat left", "background-position":"270px 130px", "background-size":"50px"} }}
	$scope.statepage = function(){
		$state.go('states');
	}
	$ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
	  $timeout(function(){
		  var gender1 =  window.localStorage.getItem('profilegender');
    var dob1 =  window.localStorage.getItem('profiledob');  
    var height1 =  window.localStorage.getItem('profileheight');  
  var profileid = window.localStorage.getItem('profileid');
console.log(gender1 + dob1 + height1 + profileid);  
		 $ionicLoading.hide();
		$http.post("http://listingapp.ssalumni.com/api/user/suitable_matches", {height: height1, dob:dob1, gender: gender1, matrimonial_id:profileid})
			.then(function (res){
				//if a response is recieved from the server.
	if(res.data!=""){
		console.log(res);
		$scope.matches = res;
	}else{
		$scope.norecord = "Sorry! unable to find any suitable match"
	$scope.searchbox = true;}
	});
      }, 2000); 
	  $scope.paymentcolor = function(profile){
	  if(profile.payment == "Paid"){
		 return {  color:"green"} 
	  } else{ return {  color:"red"} 
	  }
  }
	
})
.controller('upgradeaccountctrl', function($scope, $state){
	$scope.newlink = function(){
		document.addEventListener('deviceready', function () {
		var ref = cordova.InAppBrowser.open('https://www.payumoney.com/paybypayumoney/#/FF4B5C15C55ED3FAB539FE7E70DFE339', '_blank', 'location=yes');
		window.open = cordova.InAppBrowser.open;})
	}
	$scope.newlink2 = function(){
		document.addEventListener('deviceready', function () {
		var ref = cordova.InAppBrowser.open('https://www.payumoney.com/paybypayumoney/#/1A94819C582E8A5023F6FF69B353D577', '_blank', 'location=yes');
		window.open = cordova.InAppBrowser.open;})
	}
	$scope.newlink3 = function(){
		document.addEventListener('deviceready', function () {
		var ref = cordova.InAppBrowser.open('https://www.payumoney.com/paybypayumoney/#/CA3C99BF606F9B383A90432B769DF916', '_blank', 'location=yes');
		window.open = cordova.InAppBrowser.open;})
	}
	$scope.home = function(){
		$state.go('menus');
	}
})
.controller('resetpasswordctrl', function($scope, $state, $http){
	$scope.olduser = {};
	var mobile = window.localStorage.getItem('mobile');
	
	$scope.resetpassword = function(olduser){
		console.log(mobile + olduser.oldpassword + olduser.newpassword);
		$http.post('http://listingapp.ssalumni.com/api/user/reset_password', {"mobile":mobile, "current_password":olduser.oldpassword, "new_password":olduser.newpassword}).success(function(response){
	console.log(response);
	if(response){
		alert("password changed successfully");
		$scope.olduser.oldpassword = "";
		$scope.olduser.newpassword = "";
	}else{alert("type correct old password");
	    $scope.olduser.oldpassword = "";
		$scope.olduser.newpassword = "";}
	});
		
	}
	$scope.home = function(){
		$state.go('menus');
	}
})
.controller('careerprofiledetailsctrl', function($scope, $state, $http){
	$http.post('http://listingapp.ssalumni.com/api/user/careers').success(function(response){
	console.log(response);
	$scope.careerlist = response});
	$scope.home = function(){
		$state.go('menus');
	}
	$scope.setbackgroundimage = function(data){
		if(data.type=="0"){
	return {  background:"url('img/lookingjob.png') no-repeat left", "background-position":"270px 130px", "background-size": "50px"} }
	else if (data.type=="1"){return {  background:"url('img/providejob4.png') no-repeat left", "background-position":"270px 130px", "background-size":"50px"} }
	else{return {  background:"url('img/providejob2.png') no-repeat left", "background-position":"270px 130px", "background-size":"50px"} }
	}
})
.controller('careerprofilectrl', function($scope, $state, $http){
	console.clear();
	var uid= window.localStorage.getItem('id');
	console.log(uid);
	
	$scope.user = {}
	$scope.changestate = function(user){
		$http.post('http://listingapp.ssalumni.com/api/user/cities_list',{"State":user.locationstate}).success(function(response){
	 console.log(response)
	 $scope.cities = response;
	//	window.localStorage.setItem('cities',JSON.stringify(response));
	 })
	}
	$http.post('http://listingapp.ssalumni.com/api/user/state_list').success(function(res){
	 console.log(res)
	 $scope.India = res;})
	$scope.careerprofile = function(user){
		console.log(user.number);
 $http.post('http://listingapp.ssalumni.com/api/user/create_career',{
"user_id": uid,"name": user.name,"type": "1","qualification": user.education,"state": user.locationstate,"city": user.locationcity,"skills": user.skills,"industry": user.industry,"objective_details": user.objective,"email": user.email,"mobile": "user.number"
}).success(function(res){
	console.log(res);
	alert("profilecreated");
	$state.go('careerprofiledetails');}) }
/*	$scope.careerprofile = function(user){
		console.log(user.name);}
$scope.capturephoto = function() {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgpath = "data:image/jpg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    } */

	$scope.home = function(){
		$state.go('menus');
	}
	$(document).on('change', '.div-toggle', function() {
  var target = $(this).data('target');
  var show = $("option:selected", this).data('show');
  $(target).children().addClass('hide');
  $(show).removeClass('hide');
});
$(document).ready(function(){
	$('.div-toggle').trigger('change');
});
	
}) 
.controller('thanksctrl', function($scope, $state, $http){
	
	$scope.person = {};
	
	$scope.checkotp = function(person){
		$http.post('http://listingapp.ssalumni.com/api/user/Verify_otp', {
"otp": person.otp
}).success(function(res){
		console.log(res);
		 if(res[0].message =="You have Verified your Number & you can login!"){
			$state.go('login')
	   alert(res[0].message) 
		}else{alert(res[0].message);}
		
	});}
})
.controller('citiesctrl', function($scope, $state, $http, $window){
	$scope.showmember = function(city){
		var city = city.city;
		 window.localStorage.setItem('city',city);
		 $window.location.reload(true);
		$state.go('filteredmembers');
	}
	$scope.back = function(){
		$state.go('members');
	}
	 var state = window.localStorage.getItem('state');
	$http.post('http://listingapp.ssalumni.com/api/user/cities_list',{"State":state}).success(function(response){
	 console.log(response)
	 $scope.cities = response;
	//	window.localStorage.setItem('cities',JSON.stringify(response));
	 })
	//$scope.cities =  window.localStorage.getItem('cities');
	//console.log($scope.cities);
})
.controller('filteredmembersctrl', function($scope, $state, $http, $ionicModal, $ionicLoading, $timeout){
	$ionicModal.fromTemplateUrl('templates/membersdetail.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
 $scope.individualprofile = function(member){
	 $http.post('http://listingapp.ssalumni.com/api/user/profile_detail', {user_id: member.id}).success(function(res){
	 console.log(res)
		$scope.modal.show()
		 $scope.name = res[0].name;
  $scope.location = res[0].location;
  $scope.joindate = res[0].join_date;
  $scope.image = res[0].image ; 
  $scope.email = res[0].Email ;
  $scope.mobile = res[0].mobile ;
  $scope.aboutme = res[0].about_me;
  $scope.designation = res[0].designation;
 $scope.gender = res[0].gender;
	$scope.jobcompany = res[0].job_company;
   })  
	} 
	$ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
	  $timeout(function(){
		 $ionicLoading.hide();
		 var state = window.localStorage.getItem('state');
	  var city =   window.localStorage.getItem('city');
	  console.log(city + state);
	$http.post('http://listingapp.ssalumni.com/api/user/members', {state:state, city: city}).success(function(res){
		console.log(res);
		if(res){
		$scope.members = res ;}
		else{$scope.member = "No Members Found"
		$scope.searchbox = true;}
	});
		
      }, 2000); 
	
	 
	$scope.citypage = function(){
		$state.go('cities');
	}
})
.controller('fileteredsearchmatrimonialctrl', function($scope, $state, $http, $window, $ionicModal, $ionicLoading, $timeout, $ionicPopup){
	var senderid =   window.localStorage.getItem('id');
	$ionicModal.fromTemplateUrl('templates/individualprofile.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
   $ionicModal.fromTemplateUrl('templates/sendinterest.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
 
 
  $scope.membersdetail  = function(member){
	  console.log(member.id);
	  $scope.modal.show();
	  $http.post('http://listingapp.ssalumni.com/api/user/matrimonial_profile', {id:member.id}).success(function(res){
		console.log(res);
		$scope.postingdate = res[0].posted_by;
		$scope.dob = res[0].dob;
	$scope.birthplace = res[0].birth_place;
	$scope.birthtime = res[0].birth_time;
	$scope.dateofbirth = res[0].date_of_birth;
	$scope.brotheroccupation = res[0].brother_occupation;
	$scope.sisteroccupation = res[0].sister_occupation;
	$scope.Fatheroccupation = res[0].father_occupation;
	$scope.Motheroccupation = res[0].mother_occupation;
	$scope.gotra = res[0].gotra;
	$scope.preferencehightfrom = res[0].preference_height_from;
	$scope.preferencehightto = res[0].preference_height_to;
	$scope.occupation = res[0].occupation;
	$scope.income = res[0].income;
	$scope.kuldevta = res[0].kul_devta;
	$scope.kundli = res[0].kundli;
	$scope.hobby = res[0].hobby;
	$scope.agefrom = res[0].age_from;
	$scope.ageto = res[0].age_to;
	$scope.preferencelocation = res[0].preference_location;
	$scope.preferenceservice = res[0].preference_service;
	$scope.photo = res[0].photo;
	$scope.name = res[0].name;
	$scope.location = res[0].location;
	$scope.complexion =  res[0].complexion;
	$scope.joindate =  res[0].join_date;
	$scope.gender = res[0].gender ; 
	$scope.company = res[0].job_company;
	$scope.designation = res[0].designation;
	$scope.about = res[0].about;
	$scope.fathername = res[0].father_name;
	$scope.education = res[0].education;
	$scope.height = res[0].height;
	$scope.weight = res[0].weight;
	 $scope.id = res[0].id;
   $scope.userid = res[0].user_id;
    $scope.emailid = res[0].email_id;
	if(res[0].photo1=="http://listingapp.ssalumni.com/uploads/additional/"){
	  $scope.photo1 = "img/blankperson.jpg"}
	  else{  $scope.photo1 = res[0].photo1}
	   if(res[0].photo2=="http://listingapp.ssalumni.com/uploads/additional/"){
	  $scope.photo2 = "img/blankperson.jpg"}
	  else{  $scope.photo2 = res[0].photo2}
	});
  }
   $scope.sendinterest = function(){
		$scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: 'Are you sure you selected the profile as suitable match?',
         scope: $scope,
			
         buttons: [
            { text: 'Yes', type: 'button-energized',  onTap: function(e){ $scope.modal2.show();
  
   var link = "http://listingapp.ssalumni.com/api/user/filltered_my_matrimonials" ; 
 var userid = window.localStorage.getItem('id');
 console.log($scope.gender);
 $http.post(link, {user_id: userid, gender: $scope.gender})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	if(res.data==""){
	  	$scope.creatematrimonial = "No matrimonial profile! Click here to create one"
		$scope.profiles = "";
  } else{
  $scope.profiles = res.data;
  $scope.creatematrimonial = "";}
}); return $scope.data.model; } }, {
               text: '<b>No</b>',
               type: 'button-positive',
                  onTap: function(e) {
						
                     if (!$scope.data.model) {
                        //don't allow the user to close unless he enters model...
                          return $scope.data.model;
                     } else {
                        // return $scope.data.model;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
  /*  $scope.modal2.show();
  
   var link = "http://listingapp.ssalumni.com/api/user/filltered_my_matrimonials" ; 
 var userid = window.localStorage.getItem('id');
 console.log($scope.gender);
 $http.post(link, {user_id: userid, gender: $scope.gender})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	if(res.data==""){
	  	$scope.creatematrimonial = "No matrimonial profile! Click here to create one"
		$scope.profiles = "";
  } else{
  $scope.profiles = res.data;
  $scope.creatematrimonial = "";}
})*/}
   $scope.sendmessage = function(profile){
	     $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model" style="height:80px;">',
         title: 'Type Your Message',
         scope: $scope,
			
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Send</b>',
               type: 'button-positive',
                  onTap: function(e) {
						
                     if ($scope.data.model) {
						 console.log($scope.data.model);
						 var link = "http://listingapp.ssalumni.com/api/user/send_message";
	 $http.post(link, {sender_id: senderid, reciever_id: $scope.userid , requester_parent_id: profile.id,  parent_id: $scope.id,"type": "M","message": $scope.data.model})
   .success(function (res){  //if a response is recieved from the server.
  console.log(res);
  if(res.status==true){
  $ionicLoading.show({
                template: '<h2>Your Request has been sent</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
  });
  $scope.modal2.hide();}else{alert(res.message)
  $scope.modal2.hide();} 
}) 
return $scope.data.model
 e.preventDefault();
                     } else {
						 var link = "http://listingapp.ssalumni.com/api/user/send_message";
	 $http.post(link, {sender_id: senderid, reciever_id: $scope.userid , requester_parent_id: profile.id,  parent_id: $scope.id,"type": "M","message": "I am interested"})
   .success(function (res){  //if a response is recieved from the server.
  console.log(res);
  if(res.status==true){
  $ionicLoading.show({
                template: '<h2>Your Request has been sent</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
  });
  $scope.modal2.hide();}else{alert(res.message)
  $scope.modal2.hide();} 
}) 
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
   }
	  /* console.log(senderid + $scope.userid + profile.id + $scope.id)
 var link = "http://listingapp.ssalumni.com/api/user/send_message";
	 $http.post(link, {sender_id: senderid, reciever_id: $scope.userid , requester_parent_id: profile.id,  parent_id: $scope.id,"type": "M","message": "I am interested"})
   .success(function (res){  //if a response is recieved from the server.
  console.log(res);
  if(res.status==true){
  $ionicLoading.show({
                template: '<h2>Your Request has been sent</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
  });
  $scope.modal2.hide();}else{alert(res.message)
  $scope.modal2.hide();} 
}) */
 
  $scope.setbackgroundimage = function(member){
	 if(member.gender=="Female"){
	return {  background:"url('img/female_icon.png') no-repeat left", "background-position":"270px 130px", "background-size": "50px"} }
	else{return {  background:"url('img/male_icon.png') no-repeat left", "background-position":"270px 130px", "background-size":"50px"} }}
	$scope.statepage = function(){
		$state.go('states');
	}
	$ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
	  $timeout(function(){
		 $ionicLoading.hide();
		var state = window.localStorage.getItem('state1');
	$http.post('http://listingapp.ssalumni.com/api/user/matrimonials', {state:state}).success(function(res){
		console.log(res);
		if(res){
		$scope.members = res ;}
		else{$scope.member = "No Existing Member";
		$scope.searchbox = true;}
	});
      }, 2000); 
	  $scope.paymentcolor = function(profile){
	  if(profile.payment == "Paid"){
		 return {  color:"green"} 
	  } else{ return {  color:"red"} 
	  }
  }
	
})
.controller('statesctrl', function($scope, $state, $http, $window){
	$scope.home = function(){
		$state.go('menus');
	}	
	$http.post('http://listingapp.ssalumni.com/api/user/state_list').success(function(res){
	 console.log(res)
	 $scope.India = res;})
	 $scope.showcities = function(state){
		 //	 $window.location.reload(true);
		$state.go('filteredsearchmatrimonials');
		var state1 = state.State;
	 window.localStorage.setItem('state1',state1);}
})
.controller('filteredbysearchmembersctrl', function($scope, $http, $state, $rootScope, $ionicModal, $timeout, $ionicLoading,  $window){
	$http.post('http://listingapp.ssalumni.com/api/user/profile_detail', {user_id: "175", logged_in_user_id:"545"}).success(function(res){
	console.log(res)});
	var userid = window.localStorage.getItem('id');
	$ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
	  $timeout(function(){
		 $ionicLoading.hide();
		var searchmember  = window.localStorage.getItem('searchmember');
$http.post('http://listingapp.ssalumni.com/api/user/members_search_name', {search_name: searchmember }).success(function(res){
		console.log(res);
		if (res){$scope.searchedmembers = res ;}
		else{$scope.member = "No Matrimonial Profile Found (कोई वैवाहिक प्रोफ़ाइल नहीं मिला)"}
	});
      }, 2000); 
	
$scope.searchmemberpage = function(){
		$state.go('searchmember');
	}	
	$ionicModal.fromTemplateUrl('templates/membersdetail.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
	$scope.showall = function(member){
		$http.post('http://listingapp.ssalumni.com/api/user/profile_detail', {user_id: member.id, logged_in_user_id: userid}).success(function(res){
	 console.log(res)
	  window.localStorage.setItem('memberid', member.id);
		$scope.modal.show()
		 $scope.name = res[0].name;
		  window.localStorage.setItem('name',res[0].name);
  $scope.location = res[0].location;
  $scope.joindate = res[0].join_date;
  $scope.image = res[0].image ; 
  $scope.email = res[0].Email ;
  $scope.mobile = res[0].mobile ;
  $scope.aboutme = res[0].about_me;
  $scope.messages = res[0].messages;
  $scope.designation = res[0].designation;
 $scope.gender = res[0].gender;
	$scope.jobcompany = res[0].job_company;
   })  
	}
$scope.membermessagepage = function(){
	 $window.location.reload(true);
	 var messageid = window.localStorage.getItem('messageid');
	 console.log(messageid);
	 if($scope.messages == "0"){
	 window.localStorage.removeItem('messageid');}
	$state.go('membermessage');
}
})
.controller('memberpersonalmessagesctrl', function($scope, $state, $http, $window){
	var membername = window.localStorage.getItem('name');
	console.log(membername);
	$scope.membername = membername;
	$scope.user = {};
	 var userid = window.localStorage.getItem('id');
	 var membersenderid = window.localStorage.getItem('membersenderid');
	 var memberreceiverid = window.localStorage.getItem('memberreceiverid');
	 console.log(userid+ memberreceiverid+ membersenderid );
	 console.log(userid);
	var memberid = window.localStorage.getItem('personamemberid');
	 console.log(memberid);
	  $scope.home = function(){
		$state.go('membermessagelist');
	}	
	
	$scope.sendmessage = function(user){
		if(userid!=membersenderid){
	$http.post('http://listingapp.ssalumni.com/api/user/reply_message', {sender_id: userid,reciever_id: membersenderid,parent_id: '0' ,"type": "MSG", message: user.message, reply_id: memberid}).then(function(res){
		console.log(res);
		$window.location.reload(true);
	})}
	else{
		$http.post('http://listingapp.ssalumni.com/api/user/reply_message', {sender_id: userid,reciever_id: memberreceiverid,parent_id: '0' ,"type": "MSG", message: user.message, reply_id: memberid}).then(function(res){
		console.log(res);
		$window.location.reload(true);
	})
	}
	}
	
	$scope.setbackgroundcolor = function(message){
	 if(message.sender_id==userid){
	return {  background:"rgba(228, 33, 18, 0.68)", float:"left", clear:"both", "margin-top":"6px", color:"#fff", "border-radius":"0px 10px 10px 0px",  padding:"5px 9px", "max-width":"65%", "min-width":"34%"
     } }
	else{return { background:"#6b46e5", float:"right", clear:"both", "margin-top":"6px", color:"#fff", "border-radius":"0px 10px 10px 0px", "max-width":"65%", padding:"5px 9px", "min-width":"34%"
	}} }
	$http.post('http://listingapp.ssalumni.com/api/user/messages_full_thread_general', {
"user_id": userid,"message_id": memberid
}).success(function(res){
		console.log(res);
		 window.localStorage.setItem('replyid',res[0].reply_id);
		$scope.membermessages = res;
	}) 
})
.controller('membermessagectrl', function($scope, $state, $http, $window){
	var messageid = window.localStorage.getItem('messageid');
	var messageid2  = window.localStorage.getItem('personamemberid');	
	console.log(messageid2);
	console.log(messageid);
	$scope.user = {};
	 var userid = window.localStorage.getItem('id');
	 console.log(userid);
	 var memberid = window.localStorage.getItem('memberid');
	 console.log(memberid);
	$scope.membername = window.localStorage.getItem('name');
	$scope.home = function(){
	// window.localStorage.setItem('messageid', '3');
		$state.go('filteredbysearchmembers');
	}
   
	var messageid = window.localStorage.getItem('messageid');
	var messageid2 = window.localStorage.getItem('personamemberid');	
	console.log(messageid2);
	console.log(messageid);
	$scope.sendmessage = function(user){
		 if(messageid){
	
	$http.post('http://listingapp.ssalumni.com/api/user/reply_message', {sender_id: userid,reciever_id: memberid,parent_id: '0' ,"type": "MSG", message: user.message, reply_id: messageid }).then(function(res){
		console.log(res);
 $window.location.reload(true);
		})} else{$http.post('http://listingapp.ssalumni.com/api/user/reply_message', {sender_id: userid,reciever_id: memberid,parent_id: '0' ,"type": "MSG", message: user.message, reply_id: "0" }).then(function(res){
		console.log(res);
	window.localStorage.setItem('messageid', res.data.message_id);
	})
	// $window.location.reload(true);
	} 
	}
	
	$scope.setbackgroundcolor = function(message){
	 if(message.sender_id==userid){
	return {  background:"rgba(228, 33, 18, 0.68)", float:"left", clear:"both", "margin-top":"20px", color:"#fff", "border-radius":"0px 10px 10px 0px",  padding:"5px 9px", "max-width":"65%", "min-width":"34%"
     } }
	else{return { background:"#6b46e5", float:"right", clear:"both", "margin-top":"20px", color:"#fff", "border-radius":"0px 10px 10px 0px", "max-width":"65%", padding:"5px 9px", "min-width":"34%"
	}} }
	if(messageid=="3"){
		messageid = messageid2
	} 
	if(messageid){
$http.post('http://listingapp.ssalumni.com/api/user/messages_full_thread_general', {
"user_id": userid,"message_id": messageid
}).success(function(res){
		console.log(res);
		$scope.membermessages = res;
	}) }
	 


	
	
})
.controller('membermessagelistctrl', function($scope, $http, $window, $state){
	 var userid = window.localStorage.getItem('id');
	 console.log(userid);
	 $http.post('http://listingapp.ssalumni.com/api/user/my_messages_general', {user_id: userid}).success(function(res){
		console.log(res);
		if(res){
		$scope.messages = res ; }else{$scope.message = "No Message Received"}
	});

	$scope.reply = function(message){
	  $window.location.reload(true);
		$scope.messagesenderid = message.sender_id ;
		console.log($scope.messagesenderid);
		window.localStorage.setItem('name', message.name);
		window.localStorage.setItem('personamemberid', message.id);
		window.localStorage.setItem('membersenderid', message.sender_id);
		window.localStorage.setItem('membernameid', message.name_id);
		window.localStorage.setItem('memberreceiverid', message.reciever_id);
		$state.go('memberpersonalmessages');
	}
	
	var msgsndrid = window.localStorage.getItem('membernameid');
	console.log(msgsndrid);
	$http.post('http://listingapp.ssalumni.com/api/user/Total_my_messages_Sendergeneral', {
"user_id": userid, name_id:msgsndrid
}).success(function(res){
		console.log(res);
		if(res[0].status != "false"){
			$scope.totalmessages = res[0].total_messages;
		}
	}) 
	$scope.home = function(){
		$state.go('menus');
	}
})
.controller('searchmatrimonialsctrl', function($scope, $state, $http, $window){

	$scope.details = {};
	$scope.home = function(){
		$state.go('menus');
	}
	$scope.height = [{
    value: '4.0',
    text: '4F'
  }, {
    value: '4.1',
    text: '4F 1"'
  },
   {
    value: '4.2',
    text: '4F 2"'
  },
   {
    value: '4.3',
    text: '4F 3"'
  },
   {
    value: '4.4',
    text: '4F 4"'
  },
   {
    value: '4.4',
    text: '4F 4"'
  },
   {
    value: '4.5',
    text: '4F 5"'
  },
   {
    value: '4.6',
    text: '4F 6"'
  },
   {
    value: '4.7',
    text: '4F 7"'
  },
   {
    value: '4.8',
    text: '4F 8"'
  },
   {
    value: '4.9',
    text: '4F 9"'
  },
   {
    value: '4.10',
    text: '4F 10"'
  },
   {
    value: '4.11',
    text: '4F 11"'
  },
  {
    value: '4.12',
    text: '4F 12"'
  },{
    value: '5.0',
    text: '5F'
  }, {
    value: '5.1',
    text: '5F 1"'
  },
   {
    value: '5.2',
    text: '5F 2"'
  },
   {
    value: '5.3',
    text: '5F 3"'
  },
   {
    value: '5.4',
    text: '5F 4"'
  },
   {
    value: '5.5',
    text: '5F 5"'
  },
   {
    value: '5.6',
    text: '5F 6"'
  },
   {
    value: '5.7',
    text: '5F 7"'
  },
   {
    value: '5.8',
    text: '5F 8"'
  },
   {
    value: '5.9',
    text: '5F 9"'
  },
   {
    value: '5.10',
    text: '5F 10"'
  },
   {
    value: '5.11',
    text: '5F 11"'
  },
  {
    value: '5.12',
    text: '5F 12"'
  },
  {
    value: '6.0',
    text: '6F'
  },
  {
    value: '6.1',
    text: '6F 1"'
  },
   {
    value: '6.2',
    text: '6F 2"'
  },
   {
    value: '6.3',
    text: '6F 3"'
  },
   {
    value: '6.4',
    text: '6F 4"'
  },
   {
    value: '6.5',
    text: '6F 5"'
  },
   {
    value: '6.6',
    text: '6F 6"'
  },
   {
    value: '6.7',
    text: '6F 7"'
  },
   {
    value: '6.8',
    text: '6F 8"'
  },
   {
    value: '6.9',
    text: '6F 9"'
  },
   {
    value: '6.10',
    text: '5F 10"'
  },
   {
    value: '6.11',
    text: '5F 11"'
  },
  {
    value: '6.12',
    text: '6F 12"'
  }]; 
  $scope.height1 = [{
    value: '4.0',
    text: '4F'
  }, {
    value: '4.1',
    text: '4F 1"'
  },
   {
    value: '4.2',
    text: '4F 2"'
  },
   {
    value: '4.3',
    text: '4F 3"'
  },
   {
    value: '4.4',
    text: '4F 4"'
  },
   {
    value: '4.4',
    text: '4F 4"'
  },
   {
    value: '4.5',
    text: '4F 5"'
  },
   {
    value: '4.6',
    text: '4F 6"'
  },
   {
    value: '4.7',
    text: '4F 7"'
  },
   {
    value: '4.8',
    text: '4F 8"'
  },
   {
    value: '4.9',
    text: '4F 9"'
  },
   {
    value: '4.10',
    text: '4F 10"'
  },
   {
    value: '4.11',
    text: '4F 11"'
  },
  {
    value: '4.12',
    text: '4F 12"'
  },{
    value: '5.0',
    text: '5F'
  }, {
    value: '5.1',
    text: '5F 1"'
  },
   {
    value: '5.2',
    text: '5F 2"'
  },
   {
    value: '5.3',
    text: '5F 3"'
  },
   {
    value: '5.4',
    text: '5F 4"'
  },
   {
    value: '5.5',
    text: '5F 5"'
  },
   {
    value: '5.6',
    text: '5F 6"'
  },
   {
    value: '5.7',
    text: '5F 7"'
  },
   {
    value: '5.8',
    text: '5F 8"'
  },
   {
    value: '5.9',
    text: '5F 9"'
  },
   {
    value: '5.10',
    text: '5F 10"'
  },
   {
    value: '5.11',
    text: '5F 11"'
  },
  {
    value: '5.12',
    text: '5F 12"'
  },
  {
    value: '6.0',
    text: '6F'
  },
  {
    value: '6.1',
    text: '6F 1"'
  },
   {
    value: '6.2',
    text: '6F 2"'
  },
   {
    value: '6.3',
    text: '6F 3"'
  },
   {
    value: '6.4',
    text: '6F 4"'
  },
   {
    value: '6.5',
    text: '6F 5"'
  },
   {
    value: '6.6',
    text: '6F 6"'
  },
   {
    value: '6.7',
    text: '6F 7"'
  },
   {
    value: '6.8',
    text: '6F 8"'
  },
   {
    value: '6.9',
    text: '6F 9"'
  },
   {
    value: '6.10',
    text: '5F 10"'
  },
   {
    value: '6.11',
    text: '5F 11"'
  },
  {
    value: '6.12',
    text: '6F 12"'
  }]; 
  $scope.limits = [{
    value: 'Male',
    text: 'Bride'
  },
  {
    value: 'Female',
    text: 'Bridegroom'
  }]; 
  $scope.age1 = [{
    value: '18',
    text: '18 Yrs'
  }, {
    value: '19',
    text: '19 Yrs'
  },
   {
    value: '20',
    text: '20 Yrs'
  },
   {
    value: '21',
    text: '21 Yrs'
  },
   {
    value: '22',
    text: '22 Yrs'
  },
   {
    value: '23',
    text: '20 Yrs'
  },
   {
    value: '24',
    text: '24 Yrs'
  },
   {
    value: '25',
    text: '25 Yrs'
  },
   {
    value: '26',
    text: '26 Yrs'
  },
   {
    value: '27',
    text: '27 Yrs'
  },
   {
    value: '28',
    text: '28 Yrs'
  },
   {
    value: '29',
    text: '29 Yrs'
  },
   {
    value: '30',
    text: '30 Yrs'
  },
  {
    value: '31',
    text: '31 Yrs"'
  },{
    value: '32',
    text: '32 Yrs'
  }, {
    value: '33',
    text: '33 Yrs'
  },
   {
    value: '34',
    text: '34 Yrs'
  },
   {
    value: '35',
    text: '35 Yrs'
  },
   {
    value: '36',
    text: '36 Yrs'
  },
   {
    value: '37',
    text: '37 Yrs'
  },
   {
    value: '38',
    text: '38 Yrs'
  },
   {
    value: '39',
    text: '39 Yrs'
  },
   {
    value: '40',
    text: '40 Yrs'
  }];
$scope.age = [{
    value: '18',
    text: '18 Yrs'
  }, {
    value: '19',
    text: '19 Yrs'
  },
   {
    value: '20',
    text: '20 Yrs'
  },
   {
    value: '21',
    text: '21 Yrs'
  },
   {
    value: '22',
    text: '22 Yrs'
  },
   {
    value: '23',
    text: '20 Yrs'
  },
   {
    value: '24',
    text: '24 Yrs'
  },
   {
    value: '25',
    text: '25 Yrs'
  },
   {
    value: '26',
    text: '26 Yrs'
  },
   {
    value: '27',
    text: '27 Yrs'
  },
   {
    value: '28',
    text: '28 Yrs'
  },
   {
    value: '29',
    text: '29 Yrs'
  },
   {
    value: '30',
    text: '30 Yrs'
  },
  {
    value: '31',
    text: '31 Yrs"'
  },{
    value: '32',
    text: '32 Yrs'
  }, {
    value: '33',
    text: '33 Yrs'
  },
   {
    value: '34',
    text: '34 Yrs'
  },
   {
    value: '35',
    text: '35 Yrs'
  },
   {
    value: '36',
    text: '36 Yrs'
  },
   {
    value: '37',
    text: '37 Yrs'
  },
   {
    value: '38',
    text: '38 Yrs'
  },
   {
    value: '39',
    text: '39 Yrs'
  },
   {
    value: '40',
    text: '40 Yrs'
  }];
  
$scope.education = [{
    id: 'Any',
    class: 'Any'
  }, {
    id: '10th',
    class: '10th'
  },
  {
    id: '12th',
    class: '12th'
  },
  {
    id: 'B.B.A',
    class: 'B.B.A'
  },
  {
    id: 'B.C.A',
    class: 'B.C.A'
  },
  {
    id: 'B.Com',
    class: 'B.Com'
  },
  {
    id: 'B.D.S',
    class: 'B.D.S'
  },
  {
    id: 'B.Des/B.D',
    class: 'B.Des/B.D'
  },
  {
    id: 'B.E./B.Tech',
    class: 'B.E./B.Tech'
  },
  {
    id: 'B.Ed',
    class: 'B.Ed'
  },
  {
    id: 'B.F.Sc/B.Sc',
    class: 'B.F.Sc/B.Sc'
  },
  {
    id: 'B.H.M.S',
    class: 'B.H.M.S'
  },
  {
    id: 'B.Lib/B.Lib.Sc',
    class: 'B.Lib/B.Lib.Sc'
  },
  {
    id: 'B.M.C/B.M.M',
    class: 'B.M.C/B.M.M'
  },
  {
    id: 'B.P.Ed',
    class: 'B.P.Ed'
  },
  {
    id: 'B.P.T',
    class: 'B.P.T'
  },
  {
    id: 'B.Pharm/B.Pharma',
    class: 'B.Pharm/B.Pharma'
  },
  {
    id: 'B.Sc',
    class: 'B.Sc'
  },
  {
    id: 'B.V.Sc',
    class: 'B.V.Sc'
  },
  {
    id: 'bachelor of nursing',
    class: 'bachelor of nursing'
  },
  {
    id: 'Bechelor degrees',
    class: 'Bechelor degrees'
  },
  {
    id: 'BFA/BVA',
    class: 'BFA/BVA'
  },
  {
    id: 'BSW/B.A.',
    class: 'BSW/B.A.'
  },
  {
    id: 'D.M',
    class: 'D.M'
  },
  {
    id: 'L.L.B',
    class: 'L.L.B'
  },
  {
    id: 'L.L.M',
    class: 'L.L.M'
  },
  {
    id: 'M.A',
    class: 'M.A'
  },
  {
    id: 'M.Arch',
    class: 'M.Arch'
  },
  {
    id: 'M.B.A',
    class: 'M.B.A'
  },
  {
    id: 'M.B.B.S',
    class: 'M.B.B.S'
  },
  {
    id: 'M.C.A',
    class: 'M.C.A'
  },
  {
    id: 'M.Ch',
    class: 'M.Ch'
  },
  {
    id: 'M.Com',
    class: 'M.Com'
  },
  {
    id: 'M.D',
    class: 'M.D'
  },
  {
    id: 'M.D.S',
    class: 'M.D.S'
  },
  {
    id: 'M.Des/M.Design',
    class: 'M.Des/M.Design'
  },
  {
    id: 'M.Ed',
    class: 'M.Ed'
  },
  {
    id: 'M.Lib.Sc',
    class: 'M.Lib.Sc'
  },
  {
    id: 'M.M.C',
    class: 'M.M.C'
  },
  {
    id: 'M.P.Ed',
    class: 'M.P.Ed'
  },
  {
    id: 'M.P.T',
    class: 'M.P.T'
  },
  {
    id: 'M.Pharm',
    class: 'M.Pharm'
  },
  {
    id: 'M.Phil',
    class: 'M.Phil'
  },
  {
    id: 'M.S',
    class: 'M.S'
  },
  {
    id: 'M.S.W',
    class: 'M.S.W'
  },
  {
    id: 'M.Sc',
    class: 'M.Sc'
  },
  {
    id: 'M.Tech',
    class: 'M.Tech'
  },
  {
    id: 'M.V.Sc',
    class: 'M.V.Sc'
  },
  {
    id: 'MFA',
    class: 'MFA'
  },
  {
    id: 'Ph.D',
    class: 'Ph.D'
  },
  {
    id: 'Pharm.D',
    class: 'Pharm.D'
  }];     
$scope.findvalue = function(selectedage1, selectedage,selectedheight1, selectedheight, myeducation, selectedLimit){
	// $window.location.reload(true);
	window.localStorage.setItem('age1',selectedage1);
	window.localStorage.setItem('age2',selectedage);
	window.localStorage.setItem('height1',selectedheight1);
	window.localStorage.setItem('height2',selectedheight);
	window.localStorage.setItem('qualification', myeducation);
	window.localStorage.setItem('weddingperson',selectedLimit); 
	
$state.go('filteredmatrimonials');

}	
	$scope.changestate = function(details){
		$http.post('http://listingapp.ssalumni.com/api/user/cities_list',{"State":details.locationstate}).success(function(response){
	 console.log(response)
	 $scope.cities = response;
	//	window.localStorage.setItem('cities',JSON.stringify(response));
	 })
	}
	$scope.find = function(){
		$state.go('states');
	}	
	$http.post('http://listingapp.ssalumni.com/api/user/state_list').success(function(res){
	 console.log(res)
	 $scope.India = res;})
})
.controller('searchmemberctrl', function($scope, $state, $rootScope, $window){
$scope.home = function(){
		$state.go('menus');
	}	
	$scope.search = function(searchText){
		 window.localStorage.setItem('searchmember',searchText);
		 $window.location.reload(true);
		$state.go('filteredbysearchmembers');
	}	
	$scope.find = function(){
		$state.go('members');
	}	
})
.controller('membersctrl', function($scope, $state, $http, $ionicModal, $window){
	$scope.user = {};
	 $http.post('http://listingapp.ssalumni.com/api/user/state_list').success(function(res){
	 console.log(res)
	 $scope.India = res;})
	 $scope.showcity = function(state){
		 	 $window.location.reload(true);
		$state.go('cities');
		var state = state.State;
	 window.localStorage.setItem('state',state);}
	

	$scope.home = function(){
		$state.go('menus');
	}
	$http.post('http://listingapp.ssalumni.com/api/user/members').success(function(res){
		console.log(res);
		$scope.members = res ;
	});
})
.controller('registerctrl', function($scope, $state, $ionicLoading, $http, $ionicPopup){
	console.clear();
	/* function initialize() {

    new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), {
        types: ['geocode']
    });
}

initialize(); */
$scope.locationChanged = function (location) {
   $scope.location = location ; 
   $scope.place = location;
 };
$scope.loginpage = function(){
$state.go('login');}
	$scope.credentials = {};
	
	
	$scope.register = function(credentials){
		if($scope.place!= undefined){userlocation = $scope.location}
else{userlocation = credentials.location}
console.log(userlocation);
		 if (credentials.name && credentials.password && credentials.location&& credentials.number ) {
			var check = document.getElementById("myCheck").checked
				 if(check){
            $ionicLoading.show({
                template: 'Signing Up...'
            });
	var link = "http://listingapp.ssalumni.com/api/user/register" ; 
	$http.post(link, {name : credentials.name,  password : credentials.password, location:userlocation, mobile:credentials.number /* username:credentials.username, interested : credentials.isinterested */})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	if(res.data.status==true){
	$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
						title: "Your account has been successfully created!Please Verify Otp"
						//template: $scope.template
				});
				$state.go('thanks');
				$scope.credentials.name = "";
				$scope.credentials.password = "";
				$scope.credentials.location = "";
				$scope.credentials.number = "";
	$scope.credentials.confirmpassword = "";}else{
		$ionicLoading.hide();alert("mobile number is already used! please try different number");}
	})
	} 
	else {alert("please mark field - Are you From Keshri Samaj ?  ");}
			
  } else{alert("please fill all details")}
                 $scope.credentials.name = "";
				$scope.credentials.password = "";
				$scope.credentials.location = "";
				$scope.credentials.number = "";
		
	}
	
})
.controller('menusctrl', function( $scope, $state, $ionicPopup,  $window, $http, $rootScope){
	 var userid = window.localStorage.getItem('id');
	 $http.post("http://listingapp.ssalumni.com/api/user/payment", {user_id: userid  })
    .then(function(response) {
	console.log(response);
	// alert("please pay your matrimonial fee" + response.data[0].total_payment )})
	// $window.location.reload(true);
//	window.localStorage.setItem('payment', response.data[0].total_payment);
//	$scope.payment = window.localStorage.getItem('payment');
	console.log(response.data[0].total_payment);
	
	$scope.payment = response.data[0].total_payment; 
	console.log($scope.payment);
	if($scope.payment!=undefined){
		$scope.paymentbutton = true;
	}else{
		$scope.paidmember = true;
	}
	if($scope.payment=="500"){
	$scope.newlink3 = function(){
		document.addEventListener('deviceready', function () {
		var ref = cordova.InAppBrowser.open('https://www.payumoney.com/paybypayumoney/#/1A94819C582E8A5023F6FF69B353D577', '_blank', 'location=yes');
		window.open = cordova.InAppBrowser.open;})
	}}
	else if($scope.payment=="1500"){
	$scope.newlink3 = function(){
		document.addEventListener('deviceready', function () {
		var ref = cordova.InAppBrowser.open('https://www.payumoney.com/paybypayumoney/#/FF4B5C15C55ED3FAB539FE7E70DFE339', '_blank', 'location=yes');
		window.open = cordova.InAppBrowser.open;})
	}}
	else{
		$scope.newlink3 = function(){
		document.addEventListener('deviceready', function () {
		var ref = cordova.InAppBrowser.open('https://www.payumoney.com/paybypayumoney/#/CA3C99BF606F9B383A90432B769DF916', '_blank', 'location=yes');
		window.open = cordova.InAppBrowser.open;})
	}
	} })
	
	
	 var userid = window.localStorage.getItem('id');
	  $http.post("http://listingapp.ssalumni.com/api/user/Total_my_messages_matrimonialMSG", {
"user_id": userid
}).then(function(response){
console.log(response);
if(response.data[0].status == false){
		 $scope.messagesnumber = "0";
		 console.log($scope.requestscount);
	 }else{
	 $scope.messagesnumber = response.data[0].total_messages;}})
	 $http.post("http://listingapp.ssalumni.com/api/user/Total_my_request_matrimonial", {
"user_id": userid
}).then(function(result){
	 console.log(result);
	 if(result.data[0].status == false){
		 $scope.requestscount = "0";
		 console.log($scope.requestscount);
	 }else{
	 $scope.requestscount = result.data[0].total_messages;}
   window.localStorage.setItem('rcount',$scope.requestscount)});
	$http.post("http://listingapp.ssalumni.com/api/user/currentversion").then(function(result){
		console.log(result.data.version);
		if(result.data.version!="0.1.0"){
      var confirmPopup = $ionicPopup.confirm({
         title: 'Title',
         template: 'Do you want to update the version ?'
      });

      confirmPopup.then(function(res) {
         if(res) {
    window.open(result.data.applink);
		 return false;
         } else {
            console.log('Not sure!');
			
         }
		});}
	});
	$http.post('http://listingapp.ssalumni.com/api/user/Total_my_messages_general', {
"user_id": userid
}).success(function(res){
		console.log(res);
		if(res[0].status == false){
			$scope.messages = "0"; 
		}else{
		$scope.messages = res[0].total_messages;}
	}) 	
	$scope.username = window.localStorage.getItem('username');
	$scope.myprofiles= function(){
	//	$window.location.reload(true)
	$state.go('myprofiles');
	
	
}
$scope.upgradeaccount = function(){
//	$window.location.reload(true);
	$state.go('upgradeaccount');
}
$scope.careerdetail = function(){
	$state.go('careerprofiledetails');
}
$scope.requests = function(){
	// $window.location.reload(true);
	$state.go('totalrequests');
	
}
$scope.invite = function(){
	$state.go('adduser');
}
$scope.agent = function(){
	$state.go('agentprofile');
}
$scope.members = function(){
	$state.go('searchmember');
}
$scope.createprofile = function(){
	$state.go('createprofile');
}

$scope.mymessages = function(){
	$state.go('messages');
}
$scope.membermessages = function(){
	$state.go('membermessagelist');
}

	$scope.search = function(){
		$state.go('searchmatrimonials');
	}
	$scope.signinpage = function(){
		$state.go('login');
	}
	$scope.listing = function(){
		$state.go('business-listing');
	}
	$scope.career = function(){
		$state.go('career-profile');
	}
	$scope.profile = function(){
	//	$window.location.reload(true);
		$state.go('business-profile');
	}
	$scope.matrimony = function(){
		$state.go('matrimony');
	}
	$scope.resetpassword = function(){
		 $window.location.reload(true);
		$state.go('resetpassword');
	}
	$scope.logout = function(){
		
  
     var confirmPopup = $ionicPopup.confirm({
		 title:'Are you sure?'
     });
     confirmPopup.then(function(res) {
       if(res) {
	//	window.localStorage.removeItem('username');
		window.localStorage.clear();
       $state.go('login');
	  // $window.location.reload(true);
       } else {
         console.log('not sure');
       }
     });
  }
})
.controller('messagesctrl', function($scope, $state, $http, $ionicModal, $window, $ionicLoading){
	 var userid = window.localStorage.getItem('id');
	 $ionicModal.fromTemplateUrl('templates/replymessage.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
	$scope.home = function(){
		$state.go('menus');
	}
	$http.post('http://listingapp.ssalumni.com/api/user/my_approvedmessages', {user_id: userid}).success(function(res){
		console.log(res);
		if(res){
		$scope.messages = res ; }else{$scope.message = "No Message Received"}
	});
	$scope.reply = function(message){
		$window.location.reload(true);
		window.localStorage.setItem('name', message.name);
		window.localStorage.setItem('messagesenderid', message.sender_id);
		window.localStorage.setItem('messageparentid', message.parent_id);
		window.localStorage.setItem('messagereceiverid', message.reciever_id);
		window.localStorage.setItem('messageid', message.id);
		 $state.go('matrimonialmessages');
	 


	}
	/* $scope.reply = function(message){
		window.localStorage.setItem('name', message.name);
		window.localStorage.setItem('messagesenderid', message.sender_id);
		window.localStorage.setItem('messageparentid', message.parent_id);
		window.localStorage.setItem('messagereceiverid', message.reciever_id);
		window.localStorage.setItem('messageid', message.id);
		$scope.replyid = message.id;
		$scope.messagename = message.name ; 
		$scope.modal.show();
		$scope.messageid = message.sender_id;
		$scope.messagereceiverid = message.reciever_id;
		$scope.messageparentid = message.parent_id;
		$http.post('http://listingapp.ssalumni.com/api/user/messages_full_thread', {message_id: message.id,user_id: userid }).success(function(res){
		console.log(res);
		$scope.sendermessages = res;
	 


	});
	}
	$scope.user = {};

$scope.setbackgroundcolor = function(message){
	 if(message.reciever_id==userid){
	return {  background:"rgba(228, 33, 18, 0.68)", float:"left", clear:"both", "margin-top":"20px", color:"#fff", "border-radius":"0px 10px 10px 0px",  padding:"5px 9px", "max-width":"65%", "min-width":"34%"
     } }
	else{return { background:"#6b46e5", float:"right", clear:"both", "margin-top":"20px", color:"#fff", "border-radius":"0px 10px 10px 0px", "max-width":"65%", padding:"5px 9px", "min-width":"34%"
   }} 

}
  $scope.send = function(user) {
	  if(userid!=$scope.messagereceiverid){
	$http.post('http://listingapp.ssalumni.com/api/user/reply_message', {sender_id:userid ,reciever_id: $scope.messagereceiverid,parent_id: $scope.messageparentid ,"type": "M", message: user.message, reply_id: $scope.replyid}).success(function(res){
		console.log(res);
	$scope.messages = res ; 
	 $ionicLoading.show({
                template: '<p>message sent</p>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:6000
            });
	  $window.location.reload(true);})}
	else{
		$http.post('http://listingapp.ssalumni.com/api/user/reply_message', {sender_id: userid,reciever_id: $scope.messageid,parent_id: $scope.messageparentid ,"type": "M", message: user.message, reply_id: $scope.replyid}).success(function(res){
		console.log(res);
	$scope.messages = res ; 
	 $ionicLoading.show({
                template: '<p>message sent</p>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:6000
            });
	$window.location.reload(true);
	
	}); 
	}
	
   } */
  
})
.controller('homectrl', function($scope, $state){
	$scope.home = function(){
		$state.go('login');
	}
})
.controller('requestsctrl', function($scope, $state, $http, $ionicModal, $ionicLoading, $rootScope, $window, $ionicPopup){
	 $scope.pendingrequests = window.localStorage.getItem('rcount');
	 console.log($scope.pendingrequests);
	 if($scope.pendingrequests!="0"){
		 $scope.requestscount = true;
		 
	 }
	 var userid = window.localStorage.getItem('id');
	/*	$ionicModal.fromTemplateUrl('templates/requestdetail.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });*/
  $scope.edit1 = function(user){
	  $window.location.reload(true);
	   window.localStorage.setItem('userid',user.id);
	  $state.go('requestdetail');
  }
	/*	$scope.edit = function(user){
		    $scope.modal.show();
			$scope.userid = user.id ;
			$scope.sender_name = user.sender_name ;
			
	var link =  "http://listingapp.ssalumni.com/api/user/request_detail ";
	 $http.post(link, {message_id: user.id})
   .success(function (res){  //if a response is recieved from the server.
   console.log(res);
  $scope.sendername = res[0].name1 ; 
  $scope.receivername = res[0].name2 ;
  $scope.senderabout = res[0].about1 ;
  $scope.senderpostingtime = res[0].time1 ;
  $scope.receiverpostingtime = res[0].time2 ;
  $scope.receiverabout= res[0].about2 ;
  $scope.sendercomplexion = res[0].complexion1 ;
  $scope.receivercomplexion = res[0].complexion2 ;
  $scope.senderpostedby= res[0].Posted_by1 ;
   $scope.receiverpostedby= res[0].Posted_by2 ;
  $scope.sendereducation  = res[0].education1;
  $scope.receivereducation  = res[0].education2;
  $scope.senderimage = res[0].photo1;
  $scope.receiverimage = res[0].photo2;
  $scope.senderdob  = res[0].dob1;
  $scope.receiverdob  = res[0].dob2;
  $scope.senderfathersname = res[0].father_name1;
  $scope.receiverfathersname = res[0].father_name2;
  $scope.senderheight = res[0].height1 ; 
  $scope.receiverheight = res[0].height2 ; 
 $scope.senderweight = res[0].weight1 ; 
 $scope.receiverweight = res[0].weight2 ; 
 $scope.senderlocation = res[0].location1 ;
 $scope.receiverlocation = res[0].location2 ;
 $scope.sendermobile = res[0].profile1_mobile;
 $scope.receivermobile = res[0].profile2_mobile;
  $scope.senderbirthplace = res[0].birth_place1;
  $scope.receiverbirthplace = res[0].profile2_birth_place2;
  $scope.senderbirthtime = res[0].birth_time1;
  $scope.receiverbirthtime= res[0].profile2_birth_time2;
  $scope.senderbrotheroccupation = res[0].brother_occupation1;
  $scope.receiverbrotheroccupation = res[0].brother_occupation2;
   $scope.senderfatheroccupation = res[0].father_occupation1;
  $scope.receiverfatheroccupation = res[0].father_occupation2;
   $scope.sendergotra = res[0].gotra1;
  $scope.receivergotra = res[0].gotra2;
  $scope.senderhobby= res[0].hobby1;
  $scope.receiverhobby = res[0].hobby2;
   $scope.senderincome= res[0].income1;
  $scope.receiverincome= res[0].income2;
   $scope.senderkuldevta= res[0].kul_devta1;
  $scope.receiverkuldevta= res[0].kul_devta2;
   $scope.senderkundli= res[0].kundli1;
  $scope.receiverkundli= res[0].kundli2;
   $scope.sendermotheroccupation= res[0].mother_occupation1;
  $scope.receivermotheroccuptaion= res[0].mother_occupation2;
  $scope.senderoccupation= res[0].occupation1;
  $scope.receiveroccuptaion= res[0].occupation2;
  $scope.senderpreferenceservice= res[0].preference_service1;
  $scope.receiverpreferenceservice= res[0].preference_service2;
  $scope.sendersisteroccupation= res[0].sister_occupation1;
  $scope.receiversisteroccupation= res[0].sister_occupation2;
  $scope.senderdateofbirth = res[0].date_of_birth1;
  $scope.receiverdateofbirth= res[0].date_of_birth2;
  $scope.senderemailid = res[0].email_id1;
  $scope.receiveremailid= res[0].email_id2;
  
   });
		}
		$scope.closerequests = function(){
			$scope.modal.hide();
			$window.location.reload(true);
			
		}
		$scope.accept = function(){
	var link =  "http://listingapp.ssalumni.com/api/user/messages_accept";
	 $http.post(link, {message_id:$scope.userid , response :"Yes"})
   .success(function (res){  //if a response is recieved from the server.
   console.log(res);
  // $window.location.reload(true);
  /*  $ionicLoading.show({
                template: '<h2>Your request has been accepted</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
            }); 
			
			$state.go('messages');
   });
		}
 $scope.reject = function(){
	  $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model" style="height:100px;">',
         title: 'Please provide a reason for your rejection',
         scope: $scope,
			
         buttons: [
            { text: 'Close' }, {
               text: '<b>Reject</b>',
               type: 'button-positive',
                  onTap: function(e) {
						
                     if ($scope.data.model) {
						 console.log($scope.data.model);
          var link =  "http://listingapp.ssalumni.com/api/user/messages_accept";
	 $http.post(link, {message_id:$scope.userid , response :"No", reject_answer: $scope.data.model})
   .success(function (res){  //if a response is recieved from the server.
   console.log(res);})
	/* $ionicLoading.show({
                template: '<h2>Your request has been rejected</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
            }); 
			// $window.location.reload(true);
			$state.go('menus'); 
		//	return $scope.data.model;
			// $scope.modal.hide();
			
                     } else {
                        alert("please provide the rejection reason");
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
	 var link =  "http://listingapp.ssalumni.com/api/user/messages_accept";
	 $http.post(link, {message_id:$scope.userid , response :"No", reject_answer: $scope.data.model})
   .success(function (res){  //if a response is recieved from the server.
   console.log(res);})
	 $ionicLoading.show({
                template: '<h2>Your request has been rejected</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
            });
			$window.location.reload(true);
			$state.go('menus'); 
 } */
		
	$scope.home = function(){
		var userrole = window.localStorage.getItem('role');
		if(userrole=="admin"){
		$rootScope.admincontent = true
		}$state.go('totalrequests');
	}
	 var link = "http://listingapp.ssalumni.com/api/user/my_messages" ; 

 console.log(userid);
 $http.post(link, {user_id: userid})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	if(res.data==""){
		$scope.request = "No Request Received (कोई अनुरोध प्राप्त नहीं हुआ)"
	}else{
	$scope.senders = res.data;
	$scope.sendermessage = res.data[0].message;}
	})
	
})
.controller('sentrequestsctrl', function($scope, $state, $http, $window){
	 var userid = window.localStorage.getItem('id');
	var link =  "http://listingapp.ssalumni.com/api/user/my_sent_request";
	 $http.post(link, {user_id: userid})
   .success(function (res){  //if a response is recieved from the server.
   console.log(res);
   $scope.senders = res;});
	
	$scope.home = function(){
		$state.go('totalrequests')
	}
})
.controller('requestdetailctrl', function($scope, $http, $state, $ionicPopup, $ionicLoading, $window){
	$scope.userid =  window.localStorage.getItem('userid');
	$scope.requestspage = function(){
		$state.go('requests')
	}
	var link =  "http://listingapp.ssalumni.com/api/user/request_detail ";
	 $http.post(link, {message_id: $scope.userid})
   .success(function (res){  //if a response is recieved from the server.
   console.log(res);
  $scope.sendername = res[0].name1 ; 
  $scope.receivername = res[0].name2 ;
  $scope.senderabout = res[0].about1 ;
  $scope.senderpostingtime = res[0].time1 ;
  $scope.receiverpostingtime = res[0].time2 ;
  $scope.receiverabout= res[0].about2 ;
  $scope.sendercomplexion = res[0].complexion1 ;
  $scope.receivercomplexion = res[0].complexion2 ;
  $scope.senderpostedby= res[0].Posted_by1 ;
   $scope.receiverpostedby= res[0].Posted_by2 ;
  $scope.sendereducation  = res[0].education1;
  $scope.receivereducation  = res[0].education2;
  $scope.senderimage = res[0].photo1;
  $scope.receiverimage = res[0].photo2;
  $scope.senderdob  = res[0].dob1;
  $scope.receiverdob  = res[0].dob2;
  $scope.senderfathersname = res[0].father_name1;
  $scope.receiverfathersname = res[0].father_name2;
  $scope.senderheight = res[0].height1 ; 
  $scope.receiverheight = res[0].height2 ; 
 $scope.senderweight = res[0].weight1 ; 
 $scope.receiverweight = res[0].weight2 ; 
 $scope.senderlocation = res[0].location1 ;
 $scope.receiverlocation = res[0].location2 ;
 $scope.sendermobile = res[0].profile1_mobile;
 $scope.receivermobile = res[0].profile2_mobile;
  $scope.senderbirthplace = res[0].birth_place1;
  $scope.receiverbirthplace = res[0].profile2_birth_place2;
  $scope.senderbirthtime = res[0].birth_time1;
  $scope.receiverbirthtime= res[0].profile2_birth_time2;
  $scope.senderbrotheroccupation = res[0].brother_occupation1;
  $scope.receiverbrotheroccupation = res[0].brother_occupation2;
   $scope.senderfatheroccupation = res[0].father_occupation1;
  $scope.receiverfatheroccupation = res[0].father_occupation2;
   $scope.sendergotra = res[0].gotra1;
  $scope.receivergotra = res[0].gotra2;
  $scope.senderhobby= res[0].hobby1;
  $scope.receiverhobby = res[0].hobby2;
   $scope.senderincome= res[0].income1;
  $scope.receiverincome= res[0].income2;
   $scope.senderkuldevta= res[0].kul_devta1;
  $scope.receiverkuldevta= res[0].kul_devta2;
   $scope.senderkundli= res[0].kundli1;
  $scope.receiverkundli= res[0].kundli2;
   $scope.sendermotheroccupation= res[0].mother_occupation1;
  $scope.receivermotheroccuptaion= res[0].mother_occupation2;
  $scope.senderoccupation= res[0].occupation1;
  $scope.receiveroccuptaion= res[0].occupation2;
  $scope.senderpreferenceservice= res[0].preference_service1;
  $scope.receiverpreferenceservice= res[0].preference_service2;
  $scope.sendersisteroccupation= res[0].sister_occupation1;
  $scope.receiversisteroccupation= res[0].sister_occupation2;
  $scope.senderdateofbirth = res[0].date_of_birth1;
  $scope.receiverdateofbirth= res[0].date_of_birth2;
  $scope.senderemailid = res[0].email_id1;
  $scope.receiveremailid= res[0].email_id2;
  
   });
   	$scope.accept = function(){
	var link =  "http://listingapp.ssalumni.com/api/user/messages_accept";
	 $http.post(link, {message_id:$scope.userid , response :"Yes"})
   .success(function (res){  //if a response is recieved from the server.
   console.log(res);
  // $window.location.reload(true);
    $ionicLoading.show({
                template: '<h2>Request has been accepted! Start Chatting</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
            }); 
			$state.go('messages');
   });
		}
 $scope.reject = function(){
	  $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model" style="height:100px;">',
         title: 'Please provide a reason for your rejection',
         scope: $scope,
			
         buttons: [
            { text: 'Close' }, {
               text: '<b>Reject</b>',
               type: 'button-positive',
                  onTap: function(e) {
						
                     if ($scope.data.model) {
						 console.log($scope.data.model);
          var link =  "http://listingapp.ssalumni.com/api/user/messages_accept";
	 $http.post(link, {message_id:$scope.userid , response :"No", reject_answer: $scope.data.model})
   .success(function (res){  //if a response is recieved from the server.
   console.log(res);})
	 $ionicLoading.show({
                template: '<h2>Request has been rejected</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
            }); 
			
			$state.go('menus'); 
			// $window.location.reload(true);
		//	return $scope.data.model;
			// $scope.modal.hide();
			
                     } else {
                        alert("please provide the rejection reason");
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
	/* var link =  "http://listingapp.ssalumni.com/api/user/messages_accept";
	 $http.post(link, {message_id:$scope.userid , response :"No", reject_answer: $scope.data.model})
   .success(function (res){  //if a response is recieved from the server.
   console.log(res);})
	 $ionicLoading.show({
                template: '<h2>Your request has been rejected</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
            });
			$window.location.reload(true);
			$state.go('menus'); */
 }
})
.controller('totalrequestsctrl', function($scope, $http, $state, $rootScope, $window){
	$scope.home = function(){
		var userrole = window.localStorage.getItem('role');
		if(userrole=="admin"){
		$rootScope.admincontent = true
		}$state.go('menus');
	}
	$scope.requestspage = function(){
		$window.location.reload(true);
		$state.go('requests');
	}
	$scope.sentrequest = function(){
		$state.go('sentrequests');
	}
})
.controller('matrimonialmessagesctrl', function($scope, $http, $state, $ionicLoading, $window){
	$scope.user = {};
	 var userid = window.localStorage.getItem('id');
	 $scope.sendername =   window.localStorage.getItem('name');
	$scope.msgsenderid = window.localStorage.getItem('messagesenderid');
	$scope.msgparentid	= window.localStorage.getItem('messageparentid');
	$scope.msgrecieverid = window.localStorage.getItem('messagereceiverid');
		$scope.messageid = window.localStorage.getItem('messageid');
	$http.post('http://listingapp.ssalumni.com/api/user/messages_full_thread', {message_id: $scope.messageid,user_id: userid }).success(function(res){
		console.log(res);
		$scope.sendermessages = res;
	 


	});
	$scope.messagespage = function(){
		$state.go('messages')
	}
	$scope.setbackgroundcolor = function(message){
	 if(message.sender_id==userid){
	return {  background:"rgba(228, 33, 18, 0.68)", float:"left", clear:"both", "margin-top":"6px", color:"#fff", "border-radius":"0px 10px 10px 0px",  padding:"5px 9px", "max-width":"65%", "min-width":"34%"
     } }
	else{return { background:"#6b46e5", float:"right", clear:"both", "margin-top":"6px", color:"#fff", "border-radius":"0px 10px 10px 0px", "max-width":"65%", padding:"5px 9px", "min-width":"34%"
	}} }
	$scope.sendmessage = function(user) {
	  if(userid!=$scope.msgrecieverid){
	$http.post('http://listingapp.ssalumni.com/api/user/reply_message', {sender_id:userid ,reciever_id: $scope.msgrecieverid,parent_id: $scope.msgsenderid ,"type": "M", message: user.message, reply_id: $scope.messageid}).success(function(res){
		console.log(res);
	$scope.messages = res ; 
	/* $ionicLoading.show({
                template: '<p>message sent</p>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:6000
            }); */
	  $window.location.reload(true);})}
	else{
		$http.post('http://listingapp.ssalumni.com/api/user/reply_message', {sender_id: userid,reciever_id: $scope.msgsenderid,parent_id: $scope.msgsenderid ,"type": "M", message: user.message, reply_id: $scope.messageid}).success(function(res){
		console.log(res);
	$scope.messages = res ; 
	 /* $ionicLoading.show({
                template: '<p>message sent</p>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:6000
            }); */
	$window.location.reload(true);
	
	}); 
	}
	
   }
})
.controller('adduserctrl', function($scope, $http, $state){
	$scope.agent = {};
	$scope.home = function(){
		$state.go('menus');
	}
	var memberid = window.localStorage.getItem('id');
	

$scope.locationChanged = function (location) {
   $scope.location = location ; 
 };
	$scope.agentaccount = function(agent){
		if($scope.location!= undefined){agentlocation = $scope.location}
else{agentlocation = agent.address}
		console.log(memberid);
		if(agent.aname && agent.address && agent.mobile && agent.password){
	$http.post('http://listingapp.ssalumni.com/api/user/account_created_byadmin', {"name": agent.aname,"location": agentlocation,"mobile": agent.mobile,"password": agent.password, created_by: memberid})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	if(res.data.status != false){
	alert("invitation sent")}
	else{alert(res.data.message);}
	/* $rootScope.adminid = res.data.user_id;
	window.localStorage.setItem('adminuid', $rootScope.adminid);
			$state.go('adminmatrimonial'); */
//	alert("reply sent");
	})
	}else{alert("please fill all details")}
	$scope.agent.aname = "";
	$scope.agent.address = "";
	$scope.agent.mobile="";
	$scope.agent.password = "";}
})
.controller('adminctrl', function($scope, $state, $http, $ionicModal){
	$scope.creatematrimonial = function(){
	$state.go('adminmatrimonial');
}

$scope.newpassword = function(credentials){
		var link = "http://listingapp.ssalumni.com/api/user/confirm_Account"
		$http.post(link, {mobile: credentials.number})
			.then(function (res){	 //if a response is recieved from the server.
			console.log(res);
			alert(res.data[0].message);})
	}
$ionicModal.fromTemplateUrl('templates/changepassword.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.changepassword = function(){
	  $scope.modal.show();
  }
	

$scope.register = function(){
	$state.go('registermember');
	
}

	$scope.agent = function(){
		$state.go('agentprofile');
	}
	$scope.home = function(){
		$state.go('menus');
	}
})
.controller('adminmatrimonialctrl', function($scope, $state, $http,  $cordovaCamera, $ionicLoading, $window){
	$scope.getpicture = function() {
        var options = { 
            quality : 100, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgpath = "data:image/jpg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
	$http.post('http://listingapp.ssalumni.com/api/user/education_list')
			.then(function (res){	 //if a response is recieved from the server.
			console.log(res)
			$scope.list = res.data;});
	var adminid = window.localStorage.getItem('id');
	$scope.adminpage = function(){
	$state.go('agentprofile');
	}
$scope.locationChanged = function (location) {
   $scope.location = location ; 
 };
$scope.createadminmatrimony = function(user){
	if($scope.location!= undefined){agentlocation = $scope.location}
else{agentlocation = user.address}
	var adminuserid = window.localStorage.getItem('adminuid');
	var adminid = window.localStorage.getItem('id');
	console.log($scope.location + adminuserid + adminid );
	var link="http://listingapp.ssalumni.com/api/user/create_matrimonial_admin"
	$http.post(link, {profile_id: adminuserid, created_by:adminid, name: user.name,education: user.education,location:  agentlocation,father_name: user.father_name,height: user.height,weight: user.weight,dob: user.dob,complexion: user.complexion,about: user.about,gender: user.gender, profile_for:user.profilefor,image:  $scope.imgpath})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	window.localStorage.setItem('matrimonialadminid',res.data.matrimonial_id);
	  $ionicLoading.show({
                template: '<p>Profile Created</p>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
            });
			$window.location.reload(true);
			$state.go('additionaldetailsadmin');
})
user.name = "";
user.education = "";
user.location = "";
user.father_name = "";
user.height = "";
user.weight = "";
user.about = "";
user.gender = "";
user.dob = "";
user.complexion = ""; }
	
})
.controller('updatephotosctrl', function($scope, $http, $state,$cordovaCamera){
	var matrimonialid =  window.localStorage.getItem('usermatrimonialid');	
	console.log(matrimonialid);
	$scope.lastpage = function(){
		$state.go('myprofiles');
	}
	var link = "http://listingapp.ssalumni.com/api/user/matrimonial_profile1";
	 $http.post(link, {id:matrimonialid})
			.then(function (res){	 //if a response is recieved from the server.
			console.log(res); 
			$scope.photo1 = res.data[0].photo1;
			$scope.photo2 = res.data[0].photo2;
			})
	$scope.capturephoto = function() {
        var options = { 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPG,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgpath2 = "data:image/jpg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
	$scope.capturephoto1 = function() {
       var options = { 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            encodingType: Camera.EncodingType.JPG,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgpath3 = "data:image/jpg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
	$scope.uploadphotos = function(){
	$http.post("http://listingapp.ssalumni.com/api/user/create_additional_photo", {matrimonial_id: matrimonialid, photo1:$scope.imgpath2, photo2: $scope.imgpath3})
			.then(function (res){
console.log(res);				//if a response is recieved from the server.
	if(res){
		alert("photos uploaded successfully");
			$state.go('myprofiles');
	}else{alert("failed to add photos!try again")}
	}) }
})
.controller('additionalphotosctrl', function($scope, $state, $cordovaCamera, $http){
	var matrimonialid = window.localStorage.getItem('matrimonialid');
	$scope.additionaldetapage = function(){
		$state.go('additionaldetails');
	}
	$scope.capturephoto = function() {
        var options = { 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            encodingType: Camera.EncodingType.JPG,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgpath = "data:image/jpg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
	$scope.capturephoto1 = function() {
       var options = { 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPG,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgpath1 = "data:image/jpg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
	$scope.save = function(){
		$http.post("http://listingapp.ssalumni.com/api/user/create_additional_photo", {matrimonial_id: matrimonialid, photo1:$scope.imgpath, photo2: $scope.imgpath1})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
			alert("photos uploaded successfully");
			$state.go('myprofiles');
	 })
	}
})
.controller('additionalphotosadminctrl', function($scope, $state, $cordovaCamera, $http){
	var matrimonialadminid = window.localStorage.getItem('matrimonialadminid');
	console.log(matrimonialadminid);
	$scope.additionaldetapage = function(){
		$state.go('additionaldetailsadmin');
	}
	$scope.capturephoto = function() {
        var options = { 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            encodingType: Camera.EncodingType.JPG,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgpath = "data:image/jpg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
	$scope.capturephoto1 = function() {
       var options = { 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPG,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgpath1 = "data:image/jpg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
	$scope.save = function(){
		$http.post("http://listingapp.ssalumni.com/api/user/create_additional_photo", {matrimonial_id: matrimonialadminid, photo1:$scope.imgpath, photo2: $scope.imgpath1})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
			alert("photos uploaded successfully");
			$state.go('myprofiles');
	 })
	}
})
.controller('registermemberctrl', function($scope, $state, $http, $ionicLoading, $rootScope){
	var memberid = window.localStorage.getItem('id');
	$scope.agent = {};
	$scope.adminpage = function(){
	$state.go('agentprofile');
	
}
$scope.locationChanged = function (location) {
   $scope.location = location ; 
 };
	$scope.agentaccount = function(agent){
		if($scope.location!= undefined){agentlocation = $scope.location}
else{agentlocation = agent.address}
		console.log(memberid);
		if(agent.aname && agent.address && agent.mobile && agent.password){
	$http.post('http://listingapp.ssalumni.com/api/user/account_created_byadmin', {"name": agent.aname,"location": agentlocation,"mobile": agent.mobile,"password": agent.password, created_by: memberid})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	if(res.data.status != false){
	alert("matrimonial created successfully with userid" +   res.data.user_id)
	$rootScope.adminid = res.data.user_id;
	window.localStorage.setItem('adminuid', $rootScope.adminid);
			$state.go('adminmatrimonial');}
	else{alert(res.data.message);}
	
//	alert("reply sent");
	})
	}else{alert("please fill all details")}
	$scope.agent.aname = "";
	$scope.agent.address = "";
	$scope.agent.mobile="";
	$scope.agent.password = "";}
})
.controller('splashctrl', function($scope, $timeout, $state){
	
 $timeout(function(){
        var id =  window.localStorage.getItem('id');
        if (id==null){
        $state.go('login')}else {$state.go('menus')}
     }, 6000); 
})
.controller('additionaldetailsctrl', function($scope, $timeout, $state, $http, $ionicLoading){
	var matrimonialid = window.localStorage.getItem('matrimonialid');
	$scope.createpage = function(){
		$state.go('createprofile');
	}
	$scope.newuser = {};
	$scope.userdetails = function(newuser){
		var link = "http://listingapp.ssalumni.com/api/user/create_matrimonialadditional" ;
 $http.post(link, {"mobile1": newuser.Mobile,"matrimonial_id": matrimonialid,"birth_time": newuser.Birth_time
,"birth_place": newuser.Birth_place,"date_of_birth": newuser.Date_of_birth,"occupation": newuser.occupation,"income": newuser.Income,"hobby": newuser.hobby
,"father_occupation": newuser.FatherOccupation,"mother_occupation": newuser.MotherOccupation,"brother_occupation": newuser.BrotherOccupation,"sister_occupation": newuser.SisterOccupation,"gotra": newuser.Gotra
,"kul_devta": newuser.KulDevta,"kundli": newuser.Kundle,"preference_service": newuser.services,"age_from":newuser.agefrom ,"age_to": newuser.ageto,"preference_location": newuser.preferencelocation ,"preference_height_from": newuser.height1 ,"preference_height_to": newuser.height1, email_id:newuser.Emailid }) 
			.then(function (res){	 //if a response is recieved from the server.
			console.log(res);
			 $ionicLoading.show({
                template: '<p>Details Saved</p>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
            });
			$state.go('additionalphotos');})	
	}
})
.controller('additionaldetailsadminctrl', function($scope, $timeout, $state, $http, $ionicLoading){
	var matrimonialadminid = window.localStorage.getItem('matrimonialadminid');
	console.log(matrimonialadminid);
	$scope.createpage = function(){
		$state.go('adminmatrimonial');
	}
	$scope.newuser = {};
	$scope.userdetails = function(newuser){
		var link = "http://listingapp.ssalumni.com/api/user/create_matrimonialadditional" ;
 $http.post(link, {"mobile1": newuser.Mobile,"matrimonial_id": matrimonialadminid,"birth_time": newuser.Birth_time
,"birth_place": newuser.Birth_place,"date_of_birth": newuser.Date_of_birth,"occupation": newuser.occupation,"income": newuser.Income,"hobby": newuser.hobby
,"father_occupation": newuser.FatherOccupation,"mother_occupation": newuser.MotherOccupation,"brother_occupation": newuser.BrotherOccupation,"sister_occupation": newuser.SisterOccupation,"gotra": newuser.Gotra
,"kul_devta": newuser.KulDevta,"kundli": newuser.Kundle,"preference_service": newuser.services,"age_from":newuser.agefrom ,"age_to": newuser.ageto,"preference_location": newuser.preferencelocation ,"preference_height_from": newuser.height1 ,"preference_height_to": newuser.height1, email_id:newuser.Emailid }) 
			.then(function (res){	 //if a response is recieved from the server.
			console.log(res);
			 $ionicLoading.show({
                template: '<p>Details Saved</p>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
            });
			$state.go('additionalphotosadmin');})	
	}
})
.controller('myprofilectrl', function($scope, $state, $http, $ionicModal, $ionicLoading, $window, $cordovaCamera, $ionicPopup,  $cordovaFileTransfer){
	$scope.user = {};
/*	$http.post('http://listingapp.ssalumni.com/api/user/education_list')
			.then(function (res){	 //if a response is recieved from the server.
			console.log(res)
			$scope.list = res.data;}); */
$scope.activeuser = {};
 var link = "http://listingapp.ssalumni.com/api/user/my_matrimonials" ; 
 var userid = window.localStorage.getItem('id');
 $http.post(link, {user_id:userid})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	if(res.data==""){
	  	$scope.creatematrimonial = "No matrimonial profile! Click here to create one"
  } else{
  $scope.profiles = res.data;}

})
	$scope.home = function(){
		$state.go('menus');
	}
	$ionicModal.fromTemplateUrl('templates/profiledetail.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $ionicModal.fromTemplateUrl('templates/playlists.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalupdate = modal;
  });
  $scope.updateprofile = function(){
	  $scope.modalupdate.show();
  }
  $scope.takePhoto = function() {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgpath = "data:image/jpg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
  $scope.profiledetail = function(profile){
	  var link = "http://listingapp.ssalumni.com/api/user/matrimonial_profile1" ; 
	  $http.post(link, {id:profile.id})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res); 
	  $scope.status = profile.status;
	  $scope.matrimonialid = profile.id ;
    window.localStorage.setItem('usermatrimonialid', profile.id);	  
	  $scope.activeuser.myphoto = res.data[0].photo ; 
	  if(res.data[0].photo1=="http://listingapp.ssalumni.com/uploads/additional/"){
	  $scope.activeuser.photo1 = "img/blankperson.jpg"}
	  else{ $scope.activeuser.photo1 = res.data[0].photo1 ; }
	   if(res.data[0].photo2=="http://listingapp.ssalumni.com/uploads/additional/"){
	  $scope.activeuser.photo2 = "img/blankperson.jpg"}
	  else{ $scope.activeuser.photo2 = res.data[0].photo2 ; }
	   $scope.activeuser.fathername = res.data[0].father_name ; 
	  $scope.activeuser.profilefor = profile.profile_for;
	  $scope.activeuser.dob = res.data[0].dob;
	  $scope.activeuser.name = res.data[0].name;
	  $scope.activeuser.education = res.data[0].education;
	  $scope.activeuser.location = res.data[0].location;
	  $scope.activeuser.about = res.data[0].about;
	  $scope.activeuser.gender = res.data[0].gender;
	  $scope.activeuser.height = res.data[0].height;
	   $scope.activeuser.weight = res.data[0].weight;
		$scope.activeuser.complexion = res.data[0].complexion;
	$scope.activeuser.Birth_place = res.data[0].birth_place;
	$scope.activeuser.Birth_time = res.data[0].birth_time;
	$scope.activeuser.Date_of_birth = res.data[0].date_of_birth;
	$scope.activeuser.BrotherOccupation = res.data[0].brother_occupation;
	$scope.activeuser.SisterOccupation = res.data[0].sister_occupation;
	$scope.activeuser.FatherOccupation = res.data[0].father_occupation;
	$scope.activeuser.MotherOccupation = res.data[0].mother_occupation;
	$scope.activeuser.Gotra = res.data[0].gotra;
	$scope.activeuser.preferencehightfrom = res.data[0].preference_height_from;
	$scope.activeuser.preferencehightto = res.data[0].preference_height_to;
	$scope.activeuser.Occupation = res.data[0].occupation;
	$scope.activeuser.Income = res.data[0].income;
	$scope.activeuser.KulDevta = res.data[0].kul_devta;
	$scope.activeuser.Kundle = res.data[0].kundli;
	$scope.activeuser.hobby = res.data[0].hobby;
	$scope.activeuser.age1 = res.data[0].age_from;
	$scope.activeuser.age2= res.data[0].age_to;
	$scope.activeuser.height1 = res.data[0].preference_height_from;
	$scope.activeuser.height2 = res.data[0].preference_height_to;
	$scope.activeuser.preferencelocation = res.data[0].preference_location;
	$scope.activeuser.preferenceservice = res.data[0].preference_service;
	$scope.activeuser.Mobile = res.data[0].mobile1;
	$scope.activeuser.Emailid =res.data[0].email_id;
	 if($scope.status =="Activated"){
		    $scope.buttontext = "DEACTIVATE";
	  }else if($scope.status =="Deactivated"){
		    $scope.buttontext = "ACTIVATE";
	  }
	})
  $scope.modal.show();}
  $scope.activate = function(){
	  var link = "http://listingapp.ssalumni.com/api/user/ActivatedMatrimonilal"
	  if($scope.buttontext == "DEACTIVATE"){
	  $http.post(link, {matrimonial_id:$scope.matrimonialid, status:"Deactivated"})
			.then(function (res){	 //if a response is recieved from the server.
	  console.log(res);
	  $ionicLoading.show({
                template: '<p>Profile Deactivated</p>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:4000
            });
	$window.location.reload(true);})
	  } else if($scope.buttontext == "ACTIVATE"){$http.post(link, {matrimonial_id:$scope.matrimonialid, status:"Activated"})
			.then(function (res){	 //if a response is recieved from the server.
	  console.log(res);
	  $ionicLoading.show({
                template: '<p>Profile Activated</p>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:4000
            });
	$window.location.reload(true);})}
	  
  }
  $scope.createnewprofile = function(){
	$state.go('createprofile');
}
$scope.updatematrimonial = function(activeuser, user){
	console.log(activeuser.education);
  var link = "http://listingapp.ssalumni.com/api/user/update_matrimonialprofile"
	 $http.post(link, {"mobile1": activeuser.Mobile,name:activeuser.name,profile_for:activeuser.profilefor,photo: $scope.imgpath, education:activeuser.education,father_name:activeuser.fathername, height:activeuser.height, weight:activeuser.weight, location:activeuser.location,dob:activeuser.dob,  "id":  $scope.matrimonialid,"birth_time": activeuser.Birth_time, complexion:activeuser.complexion, about:activeuser.about,gender:activeuser.gender,
"birth_place": activeuser.Birth_place,"date_of_birth": activeuser.Date_of_birth,"occupation": activeuser.Occupation,"income": activeuser.Income,"hobby": activeuser.hobby
,"father_occupation": activeuser.FatherOccupation,"mother_occupation": activeuser.MotherOccupation,"brother_occupation": activeuser.BrotherOccupation,"sister_occupation": activeuser.SisterOccupation,"gotra": activeuser.Gotra
,"kul_devta": activeuser.KulDevta,"kundli": activeuser.Kundle,"preference_service": activeuser.preferenceservice,"age_from":activeuser.age1 ,"age_to": activeuser.age2,"preference_location": activeuser.preferencelocation ,"preference_height_from": activeuser.height1 ,"preference_height_to": activeuser.height2, email_id:activeuser.Emailid, status: "activated" }) 
			.then(function (res){	 //if a response is recieved from the server.
			console.log(res)});
			var confirmPopup = $ionicPopup.confirm({
		 title:'Do you want to update photos'
     });
     confirmPopup.then(function(res) {
       if(res) {
	   $window.location.reload(true);
			$state.go('updatephotos'); 
       } else {
         console.log('not sure');
       }
     }); 
		   
} 
$scope.suitablematch = function(profile){
	// $window.location.reload(true);
console.log(profile.gender+ profile.dob + profile.height);
  window.localStorage.setItem('profilegender', profile.gender);
 window.localStorage.setItem('profiledob', profile.dob1);  
 window.localStorage.setItem('profileheight', profile.height1);  
  window.localStorage.setItem('profileid', profile.id);  
	 $state.go('suitablematch');
	
	}
		
	$scope.link = function(profile){
		
		var url = "http://www.listingapp.ssalumni.com/admin/create_pdf/" +profile.id;
		
		 var windowref = window.open(url, '_system');

		windowref.addEventListener('loadstart', function(e) {
  var url = e.url;
  var extension = url.substr(url.length - 4);
  if (extension == '.pdf') {
    var targetPath = cordova.file.documentsDirectory + "receipt.pdf";
    var options = {};
    var args = {
      url: url,
      targetPath: targetPath,
      options: options
    };
    windowref.close(); // close window or you get exception
    document.addEventListener('deviceready', function () {
      $timeout(function() {
        downloadReceipt(args); // call the function which will download the file 1s after the window is closed, just in case..
      }, 1000);
    });
  }
});
function downloadReceipt(args) {
  var fileTransfer = new FileTransfer();
  var uri = encodeURI(args.url);

  fileTransfer.download(
    uri, // file's uri
    args.targetPath, // where will be saved
    function(entry) {
      console.log("download complete: " + entry.toURL());
      window.open(entry.toURL(), '_blank', 'location=no,closebuttoncaption=Cerrar,toolbar=yes,enableViewportScale=yes');
    },
    function(error) {
      alert("error");
    },
    true,
    args.options
  );
}
     
	}
	

})
.controller('filteredmatrimonialsctrl', function($scope, $state, $http, $ionicModal, $timeout, $ionicLoading, $ionicPopup){
	// $scope.var = true;
	var senderid =   window.localStorage.getItem('id');
	//document.getElementById("cardtext").disabled = true;
	$ionicModal.fromTemplateUrl('templates/individualprofile.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
	var age1 = window.localStorage.getItem('age1');
	var age2 = window.localStorage.getItem('age2');
    var height1 = 	window.localStorage.getItem('height1');
	var height2 = window.localStorage.getItem('height2');
	var qualification = window.localStorage.getItem('qualification');
	var weddingperson = window.localStorage.getItem('weddingperson');
	console.log(age1 + age2 + height1 + height2 + qualification + weddingperson);
	$ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
	$timeout(function(){
		 $ionicLoading.hide();
		var link = "http://listingapp.ssalumni.com/api/user/matrimonials_search"
	$http.post(link, {"height_from": height1,"height_to": height2,"age_from": age1,"age_to": age2,"education": qualification,"gender": weddingperson})
			.then(function (res){	 //if a response is recieved from the server.
			console.log(res);
			if(res.data){
		$scope.memberssearch  = res;}
		else{$scope.member = "No Existing Member";
		$scope.searchbox = true;}
	});
      }, 2000); 
	
		$scope.membersdetail  = function(member){
	  console.log(member.id, senderid);
	   
	  $scope.modal.show();
	  
	  $http.post('http://listingapp.ssalumni.com/api/user/matrimonial_profile', {id:member.id, user_id : senderid}).success(function(res){
		console.log(res);
		$scope.postingdate = res[0].posted_by;
		$scope.dob = res[0].dob;
	$scope.birthplace = res[0].birth_place;
	$scope.birthtime = res[0].birth_time;
	$scope.dateofbirth = res[0].date_of_birth;
	$scope.brotheroccupation = res[0].brother_occupation;
	$scope.sisteroccupation = res[0].sister_occupation;
	$scope.Fatheroccupation = res[0].father_occupation;
	$scope.Motheroccupation = res[0].mother_occupation;
	$scope.gotra = res[0].gotra;
	$scope.preferencehightfrom = res[0].preference_height_from;
	$scope.preferencehightto = res[0].preference_height_to;
	$scope.occupation = res[0].occupation;
	$scope.income = res[0].income;
	$scope.kuldevta = res[0].kul_devta;
	$scope.kundli = res[0].kundli;
	$scope.hobby = res[0].hobby;
	$scope.agefrom = res[0].age_from;
	$scope.ageto = res[0].age_to;
	$scope.preferencelocation = res[0].preference_location;
	$scope.preferenceservice = res[0].preference_service;
	$scope.photo = res[0].photo;
	$scope.name = res[0].name;
	$scope.location = res[0].location;
	$scope.complexion =  res[0].complexion;
	$scope.joindate =  res[0].join_date;
	$scope.gender = res[0].gender ; 
	$scope.company = res[0].job_company;
	$scope.designation = res[0].designation;
	$scope.about = res[0].about;
	$scope.fathername = res[0].father_name;
	$scope.education = res[0].education;
	$scope.height = res[0].height;
	$scope.weight = res[0].weight;
	 $scope.id = res[0].id;
   $scope.userid = res[0].user_id;
    $scope.emailid = res[0].email_id;
	 if(res[0].photo1=="http://listingapp.ssalumni.com/uploads/additional/"){
	  $scope.photo1 = "img/blankperson.jpg"}
	  else{  $scope.photo1 = res[0].photo1}
	   if(res[0].photo2=="http://listingapp.ssalumni.com/uploads/additional/"){
	  $scope.photo2 = "img/blankperson.jpg"}
	  else{  $scope.photo2 = res[0].photo2}
	});
  }
  
  $scope.sendinterest = function(){
		$scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: 'Are you sure you selected the profile as suitable match?',
         scope: $scope,
			
         buttons: [
            { text: 'Yes', type: 'button-energized',  onTap: function(e){ $scope.modal2.show();
  
   var link = "http://listingapp.ssalumni.com/api/user/filltered_my_matrimonials" ; 
 var userid = window.localStorage.getItem('id');
 console.log($scope.gender);
 $http.post(link, {user_id: userid, gender: $scope.gender})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	if(res.data==""){
	  	$scope.creatematrimonial = "No matrimonial profile! Click here to create one"
		$scope.profiles = "";
  } else{
	//  console.log(res.data[1].status);
	
  $scope.profiles = res.data;
  $scope.creatematrimonial = "";}
}); return $scope.data.model; } }, {
               text: '<b>No</b>',
               type: 'button-positive',
                  onTap: function(e) {
						
                     if (!$scope.data.model) {
                        //don't allow the user to close unless he enters model...
                          return $scope.data.model;
                     } else {
                        // return $scope.data.model;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
   }
   $scope.sendmessage = function(profile){
	     $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model" style="height:80px;">',
         title: 'Type Your Message',
         scope: $scope,
			
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Send</b>',
               type: 'button-positive',
                  onTap: function(e) {
						
                     if ($scope.data.model) {
						 console.log($scope.data.model);
						 var link = "http://listingapp.ssalumni.com/api/user/send_message";
	 $http.post(link, {sender_id: senderid, reciever_id: $scope.userid , requester_parent_id: profile.id,  parent_id: $scope.id,"type": "M","message": $scope.data.model})
   .success(function (res){  //if a response is recieved from the server.
  console.log(res);
  if(res.status==true){
  $ionicLoading.show({
                template: '<h2>Your Request has been sent</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
  });
  $scope.modal2.hide();}else{alert(res.message)
  $scope.modal2.hide();} 
}) 
return $scope.data.model
 e.preventDefault();
                     } else {
						 var link = "http://listingapp.ssalumni.com/api/user/send_message";
	 $http.post(link, {sender_id: senderid, reciever_id: $scope.userid , requester_parent_id: profile.id,  parent_id: $scope.id,"type": "M","message": "I am interested"})
   .success(function (res){  //if a response is recieved from the server.
  console.log(res);
  if(res.status==true){
  $ionicLoading.show({
                template: '<h2>Your Request has been sent</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
  });
  $scope.modal2.hide();}else{alert(res.message)
  $scope.modal2.hide();} 
}) 
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
   }
   
  $scope.setbackgroundimage = function(member){
	 if(member.gender=="Female"){
	return {  background:"url('img/female_icon.png') no-repeat left", "background-position":"270px 130px", "background-size": "50px"} }
	else{return {  background:"url('img/male_icon.png') no-repeat left", "background-position":"270px 130px", "background-size":"50px"} }}
	$scope.statepage = function(){
		$state.go('states');
	}
	//		window.localStorage.setItem('matrimonials',JSON.stringify(res));})
	// console.log(response);
//	 $scope.data = response;
	$scope.filteredpage = function(){
		$state.go('searchmatrimonials');
	}
	
	
   $ionicModal.fromTemplateUrl('templates/sendinterest.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
  $scope.paymentcolor = function(profile){
	  if(profile.payment == "Paid"){
		 return {  color:"green"} 
	  } else{ return {  color:"red"} 
	  }
  }
})
.controller('createprofilectrl', function($scope, $state, $http, $window, $ionicLoading, $cordovaCamera){
	$http.post('http://listingapp.ssalumni.com/api/user/education_list')
			.then(function (res){	 //if a response is recieved from the server.
			console.log(res)
			$scope.list = res.data;});
	
	$( "#datepicker" ).datepicker();
	$scope.takePicture = function() {
        var options = { 
            quality : 100, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgpath = "data:image/jpg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
	console.clear();

	$scope.user = {};
	  $scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];

	
$scope.locationChanged = function (location) {
	console.log(location);
   $scope.location = location ;
  $scope.place = location   
 };

	$scope.home = function(){
		$state.go('menus');
	}
	$scope.create = function(user){
		if($scope.place!= undefined){userplace = $scope.location}
else{userplace = user.location}
console.log(userplace);
if(user.name && user.education  && user.father_name && user.height && user.weight && user.dob && user.complexion && user.about && user.gender && user.profilefor){
 if($scope.imgpath != undefined){
		
	var link = "http://listingapp.ssalumni.com/api/user/create_matrimonial" ; 
	var userid = window.localStorage.getItem('id');
$http.post(link, {user_id: userid,name: user.name,education: user.education,location:userplace
,father_name: user.father_name,height: user.height,weight: user.weight,dob: user.dob,complexion: user.complexion,about: user.about,gender: user.gender, profile_for:user.profilefor, image: $scope.imgpath})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	console.log(res.data.matrimonial_id)
	window.localStorage.setItem('matrimonialid', res.data.matrimonial_id)
	 
	$window.location.reload(true);
	$state.go('additionaldetails');
		
	}) 
	user.name = "";
	user.education = "";
	user.location = "";
	user.father_name = "";
	user.height = "";
	user.weight = "";
	user.about = "";
	user.gender = "";
	user.dob = "";
	user.complexion = "";
 }else {alert("please select image")}
		} else {alert("please fill all details")} }
})

.controller('updateprofilectrl', function($scope, $cordovaImagePicker, $ionicPlatform, $cordovaContacts, $cordovaCamera, $http, $state, $ionicLoading, $rootScope, $ionicModal) {
	
	 document.getElementById("myText").disabled = true;
     $scope.credentials = {};
	
	$scope.takePicture = function() {
        var options = { 
            quality : 100, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
        
  
	console.clear();
	$scope.user = {}
	var userid = window.localStorage.getItem('id');
	console.log(userid);
	var link = "http://listingapp.ssalumni.com/api/user/profile_detail" ; 
	$http.post(link, {user_id: userid})
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res);
	$scope.user.name = res.data[0].name;
	$scope.user.location = res.data[0].location;
	$scope.user.mobile = res.data[0].mobile;
	$scope.user.joindate = res.data[0].join_date;
	$scope.user.email = res.data[0].Email;
	$scope.user.interested = res.data[0].interested ; 
	$scope.image = res.data[0].image ;
	$scope.user.gender = res.data[0].gender;
	$scope.user.company = res.data[0].job_company;
	$scope.user.designation = res.data[0].designation;
	$scope.user.about = res.data[0].about_me;
	// window.localStorage.setItem('img', $scope.image);
	})
	// var img = window.localStorage.getItem('img');
	// console.log(img);
	$scope.home = function(){
		var userrole = window.localStorage.getItem('role');
		if(userrole=="admin"){
			$rootScope.admincontent = true
		} $state.go('menus')
	}
	var userid = window.localStorage.getItem('id');
	$scope.user = {}
	$scope.update = function(user){
		console.log(user.name);
		if(user.name!=""){
	var link = "http://listingapp.ssalumni.com/api/user/update_userprofile";
	$http.post(link, {user_id: userid, name: $scope.user.name, email: $scope.user.email , mobile: $scope.user.mobile , location: $scope.user.location, image: $scope.imgURI, gender:$scope.user.gender, job_company : user.company, about_me:$scope.user.about, designation:$scope.user.designation })
			.then(function (res){	 //if a response is recieved from the server.
	console.log(res)
	 
	})
	  $ionicLoading.show({
                template: '<h2>Profile has been successfully Updated</h2>',
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                showDelay: 0,
				duration:2000
		});}else(alert("name cannot be blank"))
	}
	
});
/*.controller('matrimonydetailctrl', function($scope, $state){
	console.clear();
	$scope.home = function(){
		$state.go('menus');
	}
	$scope.backpage = function(){
		$state.go('matrimony');
	}
}); */



