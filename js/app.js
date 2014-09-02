// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('mkone', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if(window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider,$urlRouterProvider){
  $stateProvider
  .state('main',{
    url:"/main",
    abstract: true,
    templateUrl:"templates/main.html",
    controller: 'formCtrl'
  })
  .state('main.list', {
    url: "/list",
    views:{
      'list':{
       templateUrl: "templates/list.html",
       controller: 'listCtrl'
     }
   }
 })
  .state('main.detail', {
    url: "/detail/:id",
    views:{
      'list':{
       templateUrl: "templates/detail.html",
       controller: 'detailCtrl'
     }
   }
 })
  .state('main.form',{
    url:"/form",
    views:{
      'form':{
       templateUrl:"templates/form.html",
       controller: 'formCtrl'
     }
   }
 })
  .state('main.look',{
    url:"/look",
    views:{
      'look':{
       templateUrl:"templates/looking.html",
       controller: 'listCtrl'
     }
   }
 });


  $urlRouterProvider.otherwise('/main/list');

});

app.factory('send',function($http){
  return{
    http : function(url,data){
      return $http({
        url:url,
        method:'post',
        data:data
      })
    }
  }

});


app.controller('listCtrl',function($scope,$location){
  $scope.minus={
    behavior:false
  }
  $scope.list=[
  {on:1},
  {on:2},
  {on:3},
  {on:4},
  {on:5},
  {on:6},
  {on:7}
  ];

  $scope.del=function(id){
    console.log(id);
  }
  $scope.goDetail=function(id){
    $location.path("/detail/"+id);
  }
  $scope.goForm=function(){
    $location.path("/form");
  }

});


app.controller('detailCtrl',function($scope,$location,$stateParams){
  console.log($stateParams.id)
  $scope.des={
    hide:true
  }
  $scope.edit=function(id){
    console.log(id);
  }
  $scope.goList=function(){
    $location.path("/list");
  }
});


app.controller('formCtrl',function($scope,$location,send){

  $scope.des={
    hide:true
  }
  $scope.form={};
  $scope.edit=function(id){
    console.log(id);
  }
  $scope.goList=function(){
    $location.path("/list");
  }

  $scope.save=function(){
   //var url="http://lab.cijcorp.com/mkone/server/upload/upload_c1.php"
   var data = $scope.form;
   console.log(data);
  /* send.http(url,"d").success(function(data){
    console.log("data");
  }).error(function(data, status, headers, config) {
    console.log("e");
  }); */
}


$(function(){
  var user_id=window.localStorage['user_id']='540';
  var img_url="http://lab.cijcorp.com/mkone/server/temp/";
  var temp_url_c1="http://lab.cijcorp.com/mkone/server/upload/upload_c1.php?uid="+user_id;
  var temp_url_c2="http://lab.cijcorp.com/mkone/server/upload/upload_c2.php?uid="+user_id;
  var temp_url_l1="http://lab.cijcorp.com/mkone/server/upload/upload_l1.php?uid="+user_id;
  var temp_url_l2="http://lab.cijcorp.com/mkone/server/upload/upload_l2.php?uid="+user_id;
  var temp_url_l3="http://lab.cijcorp.com/mkone/server/upload/upload_l3.php?uid="+user_id;
  var temp_url_l4="http://lab.cijcorp.com/mkone/server/upload/upload_l4.php?uid="+user_id;
        /*var img_url="server/temp/";
        var temp_url_c1="server/upload/upload_c1.php?uid="+user_id;
        var temp_url_c2="server/upload/upload_c2.php?uid="+user_id;
        var temp_url_l1="server/upload/upload_l1.php?uid="+user_id;
        var temp_url_l2="server/upload/upload_l2.php?uid="+user_id;
        var temp_url_l3="server/upload/upload_l3.php?uid="+user_id;
        var temp_url_l4="server/upload/upload_l4.php?uid="+user_id;*/

        $("#file_a").on("change",function(){
          if($("#file_a").val()!=""){
            $("#prog_a").css('display','block');
            $("#prog_a").val(0);    
            $(".img_a").css({'background':"url('')"}); 
            setTimeout(function () { $(".img_a").css({'background':"rgba(88,88,88,.1)"}); }, 2);
            $("#file_a").upload(temp_url_c1,function(success){
              console.log("done",success);
              if(success!=false){
                $(".img_a").css('display','none');
                $("#prog_a").fadeOut();
                $(".img_a").css({'background':"url('"+img_url+success+"') 0 0 no-repeat",'background-size':'200px'});
                $(".img_a").fadeIn();
              }else{
                console.log("fail !");
              }
            },function(prog,value){
                    //console.log(value);
                    $("#prog_a").val(value);
                  });
          }else{
           $("#prog_a").css('display','none');
         }
       });

        $("#file_b").on("change",function(){
          if($("#file_b").val()!=""){
            $("#prog_b").css('display','block');
            $("#prog_b").val(0);    
            $(".img_b").css({'background':"url('')"}); 
            setTimeout(function () { $(".img_b").css({'background':"rgba(88,88,88,.1)"}); }, 2);
            $("#file_b").upload(temp_url_c2,function(success){
              console.log("done",success);
              if(success!=false){
                $(".img_b").css('display','none');
                $("#prog_b").fadeOut();
                $(".img_b").css({'background':"url('"+img_url+success+"') 0 0 no-repeat",'background-size':'200px'});
                $(".img_b").fadeIn();
              }else{
                console.log("fail !");
              }
            },function(prog,value){
                    //console.log(value);
                    $("#prog_b").val(value);
                  });
          }else{
           $("#prog_b").css('display','none');
         }
       });


        $("#file_c").on("change",function(){
          if($("#file_c").val()!=""){
            $("#prog_c").css('display','block');
            $("#prog_c").val(0);    
            $(".img_c").css({'background':"url('')"}); 
            setTimeout(function () { $(".img_c").css({'background':"rgba(88,88,88,.1)"}); }, 2);
            $("#file_c").upload(temp_url_l1,function(success){
              console.log("done",success);
              if(success!=false){
                $(".img_c").css('display','none');
                $("#prog_c").fadeOut();
                $(".img_c").css({'background':"url('"+img_url+success+"') 0 0 no-repeat",'background-size':'200px'});
                $(".img_c").fadeIn();
              }else{
                console.log("fail !");
              }
            },function(prog,value){
                    //console.log(value);
                    $("#prog_c").val(value);
                  });
          }else{
           $("#prog_c").css('display','none');
         }
       });



        $("#file_d").on("change",function(){
          if($("#file_d").val()!=""){
            $("#prog_d").css('display','block');
            $("#prog_d").val(0);    
            $(".img_d").css({'background':"url('')"}); 
            setTimeout(function () { $(".img_d").css({'background':"rgba(88,88,88,.1)"}); }, 2);
            $("#file_d").upload(temp_url_l2,function(success){
              console.log("done",success);
              if(success!=false){
                $(".img_d").css('display','none');
                $("#prog_d").fadeOut();
                $(".img_d").css({'background':"url('"+img_url+success+"') 0 0 no-repeat",'background-size':'200px'});
                $(".img_d").fadeIn();
              }else{
                console.log("fail !");
              }
            },function(prog,value){
                    //console.log(value);
                    $("#prog_d").val(value);
                  });
          }else{
           $("#prog_d").css('display','none');
         }
       });



        $("#file_e").on("change",function(){
          if($("#file_e").val()!=""){
            $("#prog_e").css('display','block');
            $("#prog_e").val(0);    
            $(".img_e").css({'background':"url('')"}); 
            setTimeout(function () { $(".img_e").css({'background':"rgba(88,88,88,.1)"}); }, 2);
            $("#file_e").upload(temp_url_l3,function(success){
              console.log("done",success);
              if(success!=false){
                $(".img_e").css('display','none');
                $("#prog_e").fadeOut();
                $(".img_e").css({'background':"url('"+img_url+success+"') 0 0 no-repeat",'background-size':'200px'});
                $(".img_e").fadeIn();
              }else{
                console.log("fail !");
              }
            },function(prog,value){
                    //console.log(value);
                    $("#prog_e").val(value);
                  });
          }else{
           $("#prog_e").css('display','none');
         }
       });


        $("#file_f").on("change",function(){
          if($("#file_f").val()!=""){
            $("#prog_f").css('display','block');
            $("#prog_f").val(0);    
            $(".img_f").css({'background':"url('')"}); 
            setTimeout(function () { $(".img_f").css({'background':"rgba(88,88,88,.1)"}); }, 2);
            $("#file_f").upload(temp_url_l4,function(success){
              console.log("done",success);
              if(success!=false){
                $(".img_f").css('display','none');
                $("#prog_f").fadeOut();
                $(".img_f").css({'background':"url('"+img_url+success+"') 0 0 no-repeat",'background-size':'200px'});
                $(".img_f").fadeIn();
              }else{
                console.log("fail !");
              }
            },function(prog,value){
                    //console.log(value);
                    $("#prog_f").val(value);
                  });
          }else{
           $("#prog_f").css('display','none');
         }
       });


        //end jquery
      });
});
app.controller('upload', function($scope,$http){
  $scope.form={};
  $scope.save=function(){
    form=$scope.form;
    console.log(form);
  }
});

