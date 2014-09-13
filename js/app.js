
var app=angular.module('mkone', ['ionic']);



app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {

      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider,$urlRouterProvider){
  $stateProvider
  .state('main',{
    url:"/main",
    abstract: true,
    templateUrl:"templates/main.html"
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
  .state('main.editCon',{
    url:'/editCon/:id',
    views:{
      'list':{
        templateUrl:"templates/editCon.html",
        controller: 'editCon'
      }
    }
  })
  .state('main.look',{
    url:"/look",
    views:{
      'look':{
       templateUrl:"templates/looking.html",
       controller: 'lookCtrl'

     }
   }
 })
  .state('main.look-detail',{
    url:'/look-detail/:id',
    views:{
      'look':{
        templateUrl:'templates/look-detail.html',
        controller:'lookDetail'
      }
    }
  })
  .state('main.look-form',{
    url:'/look-form/:id',
    views:{
      'look':{
        templateUrl:'templates/look-form.html',
        controller:'lookForm'
      }
    }
  })
  .state('main.editLook',{
    url:'/editLooK/:id',
    views:{
      'look':{
       templateUrl:'templates/editLook.html',
       controller: 'editLook'
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
    },
    params:function(url,param){
      return $http({
        url:url,
        method:'post',
        params:param
      })
    }
  }

});

app.factory('popup',function($ionicPopup){
  var title = "<h1>mkone</h1>";
  return{
    complete :function(){
      $ionicPopup.alert({
        title:title,
        template:'<h3 class="ion-checkmark">Complete</h3>'
      })
    },
    unComplete:function(){
      $ionicPopup.alert({
        title:title,
        template:'<h3 class="ion-alert-circled">Tel. has been used</h3>'
      })
    },
    confirm :function(){
     return $ionicPopup.confirm({
       title:title,
       template: '<h4>Confirm to delete object?</h4>'
     });
   }
 }

});

app.controller('listCtrl',function($scope,$location,$http,$ionicLoading,popup,$filter,send){
 $ionicLoading.show({
  template: '<i class="icon ion-looping"></i>',
  animation: 'fade-in'
});

 var url="http://lab.cijcorp.com/mkone/server/ws/view-contacts-ws.php";
 $http.get(url).success(function(data){
   orderBy=$filter('orderBy');
   $scope.list=data;
   $scope.list= orderBy($scope.list,'1');
   console.log($scope.list[0][1])
   $ionicLoading.hide();
 });

 $scope.goEdit=function(id){

   $location.path('/main/editCon/'+id);
 }
 $scope.confirm=function(id,$index){

  popup.confirm().then(function(res) {
   if(res){
     $scope.list.splice($index,1);
     console.log(id);
     var url="http://lab.cijcorp.com/mkone/server/ws/view-remove-list-ws.php";
     var data={tel:id};
     send.http(url,data).success(function(data){
      console.log(data);
    });
   } else {
     console.log(id);
   }
 });
}


});


app.controller('detailCtrl',function($scope,$location,$stateParams,send,$ionicLoading){
  $ionicLoading.show({
    template:'<i class="icon ion-looping"></i>',
    animation:'fade-in'
  });
  console.log($stateParams.id)
  var url="http://lab.cijcorp.com/mkone/server/ws/view-contact-detail-ws.php";
  var data={tel:$stateParams.id};
  $scope.list={};
  send.http(url,data).success(function(data){
    $scope.list=data;
    console.log(data);
    $ionicLoading.hide();
  });

});

app.controller('lookCtrl',function($scope,$location,$stateParams,$http,$ionicLoading,send,popup,$filter){

  $ionicLoading.show({
    template:'<i class="icon ion-looping"></i>',
    animation:'fade-in'
  })
  var url="http://lab.cijcorp.com/mkone/server/ws/view-looking-ws.php";
  $http.get(url).success(function(data){
   orderBy = $filter('orderBy');
   $scope.list=data;
   $scope.list= orderBy($scope.list,'-2');
   console.log($scope.list)
   $ionicLoading.hide();
 });

  $scope.goEdit=function(id){
    $location.path('/main/editLooK/'+id);
  }

  $scope.confirm=function($index,id,date){
    popup.confirm().then(function(res) {
     if(res){
      $scope.list.splice($index,1);
      
      var url="http://lab.cijcorp.com/mkone/server/ws/view-remove-look-ws.php";
      var data={tel:id,date:date};
      send.http(url,data).success(function(data){
        console.log(data);
      });
    } else {
     console.log(id);
   }
 });
  }

});
app.controller('lookDetail',function($scope,$stateParams,send,$ionicLoading){

  $ionicLoading.show({
    template:'<i class="icon ion-looping"></i>',
    animation:'fade-in'
  })

  var url="http://lab.cijcorp.com/mkone/server/ws/view-looking-detail-ws.php";
  var data={tel:$stateParams.id};
  send.http(url,data).success(function(data){
    $scope.data=data;
    $ionicLoading.hide();
  });
});

app.controller('lookForm',function($scope,$stateParams,$location,send,popup){
  $scope.id=$stateParams.id;
  $scope.formData={};
  $scope.submit=function(){
   $scope.data={tel:$scope.id,look:$scope.formData.txt_look};
   var url="http://lab.cijcorp.com/mkone/server/ws/add-looking-ws.php";
   send.http(url,$scope.data).success(function(data){
    if(data==true){
      popup.complete();
      $location.path("/main/look");
    }else{
      popup.unComplete();
      console.log(data);
    } 
  })
   
 }

});
app.controller('formCtrl',function($scope,$location,send,popup,$ionicLoading){

  var user_id=window.localStorage['user_id']='540';

  $scope.des={
    hide:true
  }


  $scope.edit=function(id){
    console.log(id);
  }

  $scope.goList=function(){
    $location.path("/list");
  }
  $scope.formData={};
  $scope.save=function(){
   var url="http://lab.cijcorp.com/mkone/server/upload/add_contacts.php";
   $scope.formData.user_id=user_id;
   var data = $scope.formData;
   //console.log(data);
   send.http(url,data).success(function(data){
    if(data[0] != false){
      popup.complete();
      console.log("pass");
      $location.path("/list");
    }else{
      popup.unComplete();
      console.log(data);
    }
  }).error(function(data, status, headers, config) {
    console.log("e");
  });
}


$(function(){

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

app.controller('editCon',function($scope,$location,send,popup,$ionicLoading,$stateParams){
  var user_id=window.localStorage['user_id']='540';
  
  var url="http://lab.cijcorp.com/mkone/server/ws/view-contact-detail-ws.php";
  var data={tel:$stateParams.id};
  send.http(url,data).success(function(data){

    $scope.formData={
      name:data[0][2],
      nname:data[0][1],
      tel:data[0][0],
      email:data[0][3],
      keyword:data[0][4],
      type:data[0][5],
      user_id:user_id
    };

    var img_url="http://lab.cijcorp.com/mkone/server/real/";
    word=['a','b'];
    j=0;
    for(i=7;i<9;i++){
      if(data[0][i]=="none.jpeg"){
        data[0][i]="img/plus";
      }else{
        data[0][i]=img_url+data[0][i];
      }
      $(".img_"+word[j]).css({'background':"url('"+data[0][i]+"') 0 0 no-repeat",'background-size':'200px'}); 
      j++;
    }

  });

  $scope.save=function(){
    var url="http://lab.cijcorp.com/mkone/server/ws/edit-list-ws.php";
    var data=$scope.formData;
    console.log(data);
    send.http(url,data).success(function(data){
    
      if(data==true){
        $location.path("/main/list");
      }
    })
    
  }

  $(function(){

    var img_url="http://lab.cijcorp.com/mkone/server/temp/";
    var temp_url_c1="http://lab.cijcorp.com/mkone/server/upload/upload_c1.php?uid="+user_id;
    var temp_url_c2="http://lab.cijcorp.com/mkone/server/upload/upload_c2.php?uid="+user_id;


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

  });
});



app.controller('editLook',function($scope,$location,send,popup,$ionicLoading,$stateParams,$ionicLoading){
  var user_id=window.localStorage['user_id']='540';
  $ionicLoading.show({
    template:'<i class="icon ion-looping"></i>',
    animation:'fade-in'
  })
  var url="http://lab.cijcorp.com/mkone/server/ws/view-looking-detail-ws.php";
  var data={tel:$stateParams.id};
  send.http(url,data).success(function(data){
    $scope.list={user_id:user_id,tel:data[0],look:data[1],date:data[2]};
    var img_url="http://lab.cijcorp.com/mkone/server/real/";
    word=['c','d','e','f'];
    j=0;
    for(i=4;i<8;i++){
      if(data[i]=="none.jpeg"){
        data[i]="img/plus";
      }else{
        data[i]=img_url+data[i];
      }
      $(".img_"+word[j]).css({'background':"url('"+data[i]+"') 0 0 no-repeat",'background-size':'200px'}); 
      j++;
    }
    $ionicLoading.hide();
  });
  $scope.save=function(){
    var url="http://lab.cijcorp.com/mkone/server/ws/edit-looking-ws.php";
    var data=$scope.list;
    send.http(url,data).success(function(data){
      if(data==true){
        $location.path("/main/look");
      }
    })
    
  }

  $(function(){
    var img_url="http://lab.cijcorp.com/mkone/server/temp/";
    var temp_url_l1="http://lab.cijcorp.com/mkone/server/upload/upload_l1.php?uid="+user_id;
    var temp_url_l2="http://lab.cijcorp.com/mkone/server/upload/upload_l2.php?uid="+user_id;
    var temp_url_l3="http://lab.cijcorp.com/mkone/server/upload/upload_l3.php?uid="+user_id;
    var temp_url_l4="http://lab.cijcorp.com/mkone/server/upload/upload_l4.php?uid="+user_id;


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




