/**
 * Created by bjwsl-001 on 2016/10/10.
 */

//完成模块的声明
var app = angular.module('dnf',['ng','ngRoute']);

//创建一个parentCtrl
app.controller('parentCtrl',
    ["$scope","$location",
        function ($scope,$location) {
            $scope.jump = function (url) {
                $location.path(url);
            }
    }]);

//声明控制器mainCtrl main.html 功能是支持搜索和分页加载
app.controller('mainCtrl',['$scope','$http',
    function($scope,$http){
        $scope.hasMore = true;
        //加载数据
        $http.get('data/dnf_getbypage.php?start=0')
            .success(function (data) {
                //console.log(data);
                $scope.dnfList = data;
            })
        //加载更多数据
        $scope.loadMore = function () {
            $http.get('data/dnf_getbypage.php?start='+$scope.dnfList.length)
                .success(function (data) {
                    if(data.length < 5)
                    {
                        $scope.hasMore = false;
                    }
                    $scope.dnfList = $scope.dnfList.concat(data);
                });
        }
        $scope.gjs = function () {
            $http.get('data/dnf_getbypage.php?start=0')
                .success(function (data) {
                    $scope.dnfList = data;
                });
        }
        $scope.sqs = function () {
            $http.get('data/dnf_getbypage.php?start=5')
                .success(function (data) {
                    $scope.dnfList = data;
                });
        }
        $scope.gdj = function () {
            $http.get('data/dnf_getbypage.php?start=10')
                .success(function (data) {
                    $scope.dnfList = data;
                });
        }
        $scope.mfs = function () {
            $http.get('data/dnf_getbypage.php?start=15')
                .success(function (data) {
                    $scope.dnfList = data;
                });
        }
        $scope.szz = function () {
            $http.get('data/dnf_getbypage.php?start=20')
                .success(function (data) {
                    $scope.dnfList = data;
                });
        }

        //添加搜索功能
        $scope.$watch('kw', function () {
            console.log($scope.kw);
            if($scope.kw)
            {
                $http.get('data/dnf_getbykw.php?kw='+$scope.kw)
                    .success(function (data) {
                        $scope.dnfList = data;
                    })
            }

        });
}]);

//声明控制器 detailCtrl,功能是根据传过来的dnfId查找详情
app.controller('detailCtrl',['$scope','$http','$routeParams',
    function ($scope,$http,$routeParams) {
        console.log($routeParams.dnfId);
        $http.get('data/dnf_getbyid.php?id='+$routeParams.dnfId)
            .success(function (data) {
                console.log(data);
                $scope.dnf = data[0];
            })
}]);

//声明控制器orderDetail 拿到dnfId，把用户所输入的所有信息和dnfId 传递给服务器
app.controller('orderDetail',['$scope','$http','$routeParams','$rootScope',
    function ($scope,$http,$routeParams,$rootScope) {
        //console.log($routeParams.dnfId);

        $scope.order = {"did":$routeParams.dnfId};

        $scope.submitOrder = function () {
            var args = jQuery.param($scope.order);
            console.log(args);
            $http.get('data/order_add.php?'+args)
                .success(function (data) {
                    console.log(data);
                    if(data.msg == 'succ')
                    {
                        $rootScope.num = $scope.order.num;
                        $scope.succMsg = "收藏成功！编号为："+data.oid;
                    }
                    else
                    {
                        $scope.errMsg = '收藏失败';
                    }
                })
        }

}]);
app.controller('myOrderCtrl',['$scope','$http','$rootScope',
    function ($scope,$http,$rootScope){
        if($rootScope.num === undefined){
            $rootScope.num = 0;
        }
        $http.get('data/order_getbynum.php?num='+$rootScope.num)
            .success(function(data){
                console.log(data);
                $scope.orderList = data;
            })
    }
]);
app.controller('allOrderCtrl',['$scope','$http','$rootScope',
    function ($scope,$http,$rootScope){
        $http.get('data/order_getall.php')
            .success(function(data){
                console.log(data);
                $scope.orderList = data;
            })
    }
]);

//配置路由词典
app.config(function ($routeProvider) {

    $routeProvider
        .when('/start',{
            templateUrl:'tpl/start.html'
        })
        .when('/main',{
            templateUrl:'tpl/main.html',
            controller:'mainCtrl'
        })
        .when('/detail',{
            templateUrl:'tpl/detail.html'
        })
        .when('/detail/:dnfId',{
            templateUrl:'tpl/detail.html',
            controller:'detailCtrl'
        })
        .when('/order',{
            templateUrl:'tpl/order.html'
        })
        .when('/order/:dnfId',{
            templateUrl:'tpl/order.html',
            controller:'orderDetail'
        })
        .when('/myOrder',{
            templateUrl:'tpl/myOrder.html',
            controller:'myOrderCtrl'
        })
        .when('/allOrder',{
            templateUrl:'tpl/allOrder.html',
            controller:'allOrderCtrl'
        })
        .otherwise({redirectTo:'/start'})
});