'use strict';

/* Controllers */

var hpaControllers = angular.module('hpaControllers', []);


/* Login Controller ****************************************************************/

hpaControllers.controller('LoginCtrl', ['$scope', '$location', '$window', '$http', 'commonSvc',
  function($scope,  $location, $window, $http, commonSvc) {
    /*
    Figure out authentication, initial loading of variables
      - Load student IDs here
      - Handle errors
      - Router here by default
      - Update UI to MD

    */
    console.log("LoginCtrl entry");
    
    //var vdArray = { [ {val:'1'}, {val:'2'} ], [ {val:'3'}, {val:'4'} ]};
    //var vdArray = [[ {val:'1'},{val:2} ], [ {val:3}, {val:4} ]];
    //$scope.dArray = vdArray;
   
    $scope.fakeLogin = function(idParm) {
    
    console.log("LoginCtrl fakeLogin() enter, parm: "+idParm);
    $http.get('service/model/0001-'+idParm+'.json').success(function(data) {
        console.log('LoginCtrl fakeLogin() userModel:',data);
        commonSvc.setData("userModel",data);
      });
      console.log("LoginCtrl fakeLogin() exit");
      $window.location="#/home";
    }


  }]);

/* Analyze Controller ****************************************************************/

hpaControllers.controller('AnalyzeCtrl', ['$scope', '$location', '$http', 'commonSvc',
  function($scope,  $location, $http, commonSvc) {
    
    console.log("AnalyzeCtrl entry");
    $scope.userModel = commonSvc.getData("userModel");
    console.log("AnalyzeCtrl, userModel: " + $scope.userModel);

    if (typeof $scope.userModel === "undefined"){
      console.log('AnalyzeCtrl, userModel is not yet defined.  Seed with defaults....');

      $http.get('service/model/0001-2.json').success(function(data) {
        console.log('success!  userModel:',data);
        commonSvc.setData("userModel",data);
        $scope.userModel = commonSvc.getData("userModel");
      });
 
    } //end if

    $scope.starterChartConfig = {

        options: {
            //This is the Main Highcharts chart config. Any Highchart options are valid here.
            //will be overriden by values specified below.
            chart: {
                type: 'bar'
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            }
        },
        //The below properties are watched separately for changes.

        //Series object (optional) - a list of series using normal highcharts series options.
        series: [{
           data: [10, 15, 12, 8, 7]
        }],
        //Title configuration (optional)
        title: {
           text: 'Hello'
        },
        //Boolean to control showng loading status on chart (optional)
        //Could be a string if you want to show specific loading text.
        loading: false,
        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
        xAxis: {
        currentMin: 0,
        currentMax: 20,
        title: {text: 'values'}
        },
        //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
        useHighStocks: false,
        //size (optional) if left out the chart will default to size of the div or something sensible.
        size: {
         width: 400,
         height: 300
        },
        //function (optional)
        //func: function (chart) {
         //setup some logic for the chart
        //}
      };  //end chartConfig

   
    $scope.beginOnSelect = function() {
      console.log("AnalyzeCtrl beginOnSelect()"); 
    }

    $scope.beginOnDeselect = function() {
      console.log("AnalyzeCtrl beginOnDeselect()"); 
    }

    $scope.planOnSelect = function() {
      console.log("AnalyzeCtrl planOnSelect()"); 
    }

    $scope.planOnDeselect = function() {
      console.log("AnalyzeCtrl planOnDeselect()"); 
    }

    $scope.analyzeOnSelect = function() {
      //$scope.calcsCleanData();
      //$scope.calcsSvcsIncurred();



      //console.log("AnalyzeCtrl analyzeOnSelect(), chart data: " + $scope.starterChartConfig);
      $scope.chartConfig1 = JSON.parse(JSON.stringify($scope.starterChartConfig));
      $scope.chartConfig1.title.text = "Scenario: "+$scope.userModel.scenarios[0].name;
      $scope.chartConfig1.options.chart.type= "bar";
      $scope.chartConfig1.series = [{
            data: [ $scope.userModel.calcs.plan_0_scen_0.incur_paid + $scope.userModel.calcs.plan_0_scen_0.prem_paid, 
                    $scope.userModel.calcs.plan_1_scen_0.incur_paid + $scope.userModel.calcs.plan_1_scen_0.prem_paid ]}];
 
      $scope.chartConfig1.xAxis= { categories: [$scope.userModel.plans[0].name, $scope.userModel.plans[1].name] };

      //$scope.chartConfig1.plotOptions.pie.datalabels.enabled=true;
      //scope.chartConfig1.plotOptions.pie.datalabels.enabled='<b>{point.name}</b>: ${point.y:,.0f}';
      $scope.chartConfig1.dataLabels= {
                    format: '<b>{point.name}</b>: ${point.y:,.0f}',
                    enabled: true
                  };
      $scope.chartConfig1.legend = null;
      
      /*
      $scope.chartConfig1.plotOptions= {
            bar: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: ${point.y:,.0f}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        };
      */

      $scope.chartConfig2 = JSON.parse(JSON.stringify($scope.starterChartConfig));
      $scope.chartConfig2.title.text = "Scenario: "+$scope.userModel.scenarios[1].name;
      $scope.chartConfig2.options.chart.type= "bar";
      $scope.chartConfig2.series = [{
            data: [ $scope.userModel.calcs.plan_0_scen_1.incur_paid + $scope.userModel.calcs.plan_0_scen_1.prem_paid, 
                    $scope.userModel.calcs.plan_1_scen_1.incur_paid + $scope.userModel.calcs.plan_1_scen_1.prem_paid ]}];
 
      $scope.chartConfig2.xAxis= { categories: [$scope.userModel.plans[0].name, $scope.userModel.plans[1].name] };

      //$scope.chartConfig1.plotOptions.pie.datalabels.enabled=true;
      //scope.chartConfig1.plotOptions.pie.datalabels.enabled='<b>{point.name}</b>: ${point.y:,.0f}';
      $scope.chartConfig2.dataLabels= {
                    format: '<b>{point.name}</b>: ${point.y:,.0f}',
                    enabled: true
                  };
      $scope.chartConfig2.legend = null;

      //$scope.chartConfig2.title.text = $scope.userModel.scenarios[1].name;
      //$scope.chartConfig2.options.chart.type= "pie";
      //$scope.chartConfig2.series = [{data: [430,2020]}];
      
      $scope.chartConfig3 = JSON.parse(JSON.stringify($scope.starterChartConfig));
      $scope.chartConfig3.title.text = "Scenario: "+$scope.userModel.scenarios[0].name;

      $scope.chartConfig4 = JSON.parse(JSON.stringify($scope.starterChartConfig));
      $scope.chartConfig4.title.text = "Scenario: "+$scope.userModel.scenarios[1].name;

      $scope.chartConfig5 = JSON.parse(JSON.stringify($scope.starterChartConfig));
      $scope.chartConfig5.title.text = "Scenario: "+$scope.userModel.scenarios[0].name;
      $scope.chartConfig5.options.chart.type='pie';

      $scope.chartConfig6 = JSON.parse(JSON.stringify($scope.starterChartConfig));
      $scope.chartConfig6.title.text = "Scenario: "+$scope.userModel.scenarios[1].name;
      $scope.chartConfig6.options.chart.type='pie';

    }

    $scope.analyzeOnDeselect = function() {
      console.log("AnalyzeCtrl analyzeOnDeselect()"); 

    }


    /*$scope.onChangeDollar = function(from, to) {
      console.log("AnalyzeCtrl onChangeDollar()");
      to = commonSvc.convertDollar(from);
      //console.log("AnalyzeCtrl onChangeDollar() userModel.plans[0].premium_n:"+$scope.userModel.plans[0].premium_n)

    }


    $scope.onChangePctg = function(from, to) {
      console.log("AnalyzeCtrl onChangePctg()");
      to = commonSvc.convertPctg(from);

    }*/


    $scope.calcsCleanData = function () {
      console.log("AnalyzeCtrl calcsCleanData()");
      
      $scope.plans[0].premium_n = commonSvc.convertDollar($scope.plans[0].premium);
      $scope.plans[0].periods_n = commonSvc.convertDollar($scope.plans[0].periods);
      $scope.plans[0].hsa_payment_n = commonSvc.convertDollar($scope.plans[0].hsa_payment);
      $scope.plans[0].dr_visit.coins_n = commonSvc.convertPctg($scope.plans[0].dr_visit.coins);
      $scope.plans[0].dr_visit.copay_n = commonSvc.convertDollar($scope.plans[0].dr_visit.copay);
      $scope.plans[0].spec_visit.coins_n = commonSvc.convertPctg($scope.plans[0].spec_visit.coins);
      $scope.plans[0].spec_visit.copay_n = commonSvc.convertDollar($scope.plans[0].spec_visit.copay);
      $scope.plans[0].er_visit.coins_n = commonSvc.convertPctg($scope.plans[0].er_visit.coins);
      $scope.plans[0].er_visit.copay_n = commonSvc.convertDollar($scope.plans[0].er_visit.copay);
      $scope.plans[0].hosp_visit_n = commonSvc.convertPctg($scope.plans[0].hosp_visit);
      $scope.plans[0].out_surgery_n = commonSvc.convertPctg($scope.plans[0].out_surgery);
      $scope.plans[0].deductable_n = commonSvc.convertDollar($scope.plans[0].deductable);
      $scope.plans[0].out_max_annual_n = commonSvc.convertDollar($scope.plans[0].out_max_annual);

      $scope.scenarios[0].dr_visit.number_n = commonSvc.convertDollar($scope.scenarios[0].dr_visit.number);
      $scope.scenarios[0].dr_visit.price_n = commonSvc.convertDollar($scope.scenarios[0].dr_visit.price);
      $scope.scenarios[0].spec_visit.number_n = commonSvc.convertDollar($scope.scenarios[0].spec_visit.number);
      $scope.scenarios[0].spec_visit.price_n = commonSvc.convertDollar($scope.scenarios[0].spec_visit.price);
      $scope.scenarios[0].er_visit.number_n = commonSvc.convertDollar($scope.scenarios[0].er_visit.number);
      $scope.scenarios[0].er_visit.price_n = commonSvc.convertDollar($scope.scenarios[0].er_visit.price);
      $scope.scenarios[0].hosp_visits_n = commonSvc.convertDollar($scope.scenarios[0].hosp_visits);
      $scope.scenarios[0].out_surgeries_n = commonSvc.convertDollar($scope.scenarios[0].out_surgeries);

      $scope.plans[1].premium_n = commonSvc.convertDollar($scope.plans[1].premium);
      $scope.plans[1].periods_n = commonSvc.convertDollar($scope.plans[1].periods);
      $scope.plans[1].hsa_payment_n = commonSvc.convertDollar($scope.plans[1].hsa_payment);
      $scope.plans[1].dr_visit.coins_n = commonSvc.convertPctg($scope.plans[1].dr_visit.coins);
      $scope.plans[1].dr_visit.copay_n = commonSvc.convertDollar($scope.plans[1].dr_visit.copay);
      $scope.plans[1].spec_visit.coins_n = commonSvc.convertPctg($scope.plans[1].spec_visit.coins);
      $scope.plans[1].spec_visit.copay_n = commonSvc.convertDollar($scope.plans[1].spec_visit.copay);
      $scope.plans[1].er_visit.coins_n = commonSvc.convertPctg($scope.plans[1].er_visit.coins);
      $scope.plans[1].er_visit.copay_n = commonSvc.convertDollar($scope.plans[1].er_visit.copay);
      $scope.plans[1].hosp_visit_n = commonSvc.convertPctg($scope.plans[1].hosp_visit);
      $scope.plans[1].out_surgery_n = commonSvc.convertPctg($scope.plans[1].out_surgery);
      $scope.plans[1].deductable_n = commonSvc.convertDollar($scope.plans[1].deductable);
      $scope.plans[1].out_max_annual_n = commonSvc.convertDollar($scope.plans[1].out_max_annual);

      $scope.scenarios[1].dr_visit.number_n = commonSvc.convertDollar($scope.scenarios[1].dr_visit.number);
      $scope.scenarios[1].dr_visit.price_n = commonSvc.convertDollar($scope.scenarios[1].dr_visit.price);
      $scope.scenarios[1].spec_visit.number_n = commonSvc.convertDollar($scope.scenarios[1].spec_visit.number);
      $scope.scenarios[1].spec_visit.price_n = commonSvc.convertDollar($scope.scenarios[1].spec_visit.price);
      $scope.scenarios[1].er_visit.number_n = commonSvc.convertDollar($scope.scenarios[1].er_visit.number);
      $scope.scenarios[1].er_visit.price_n = commonSvc.convertDollar($scope.scenarios[1].er_visit.price);
      $scope.scenarios[1].hosp_visits_n = commonSvc.convertDollar($scope.scenarios[1].hosp_visits);
      $scope.scenarios[1].out_surgeries_n = commonSvc.convertDollar($scope.scenarios[1].out_surgeries);

      commonSvc.setData("userModel",$scope.userModel);
    }


    $scope.calcsSvcsIncurred = function () {
      console.log("AnalyzeCtrl calcsSvcsIncurred()"); 

      $scope.plans[0].premium_n = commonSvc.convertDollar($scope.plans[0].premium);
      $scope.plans[0].hsa_payment_n = commonSvc.convertDollar($scope.plans[0].hsa_payment);
      $scope.plans[0].dr_visit.coins_n = commonSvc.convertPctg($scope.plans[0].dr_visit.coins);
      $scope.plans[0].dr_visit.copay_n = commonSvc.convertDollar($scope.plans[0].dr_visit.copay);
      $scope.plans[0].spec_visit.coins_n = commonSvc.convertPctg($scope.plans[0].spec_visit.coins);
      $scope.plans[0].spec_visit.copay_n = commonSvc.convertDollar($scope.plans[0].spec_visit.copay);
      $scope.plans[0].er_visit.coins_n = commonSvc.convertPctg($scope.plans[0].er_visit.coins);
      $scope.plans[0].er_visit.copay_n = commonSvc.convertDollar($scope.plans[0].er_visit.copay);
      $scope.plans[0].hosp_visit_n = commonSvc.convertPctg($scope.plans[0].hosp_visit);
      $scope.plans[0].out_surgery_n = commonSvc.convertPctg($scope.plans[0].out_surgery);
      $scope.plans[0].deductable_n = commonSvc.convertDollar($scope.plans[0].deductable);
      $scope.plans[0].out_max_annual_n = commonSvc.convertDollar($scope.plans[0].out_max_annual); 

      $scope.scenarios[0].calcs.prem_paid = $scope.plans[0].premium_n * $scope.plans[0].periods_n;
      $scope.scenarios[0].calcs.dr_svcs_incur = 
        $scope.plans[0].dr_visit.copay * $scope.scenarios[0].dr_visit.number +
        $scope.plans[0].dr_visit.coins * $scope.scenarios[0].dr_visit.number * $scope.scenarios[0].dr_visit.price;
      $scope.scenarios[0].calcs.spec_svcs_incur = 
        $scope.plans[0].spec_visit.copay * $scope.scenarios[0].spec_visit.number +
        $scope.plans[0].spec_visit.coins * $scope.scenarios[0].spec_visit.number * $scope.scenarios[0].spec_visit.price;
      $scope.scenarios[0].calcs.er_svcs_incur = 
        $scope.plans[0].er_visit.copay * $scope.scenarios[0].er_visit.number +
        $scope.plans[0].er_visit.coins * $scope.scenarios[0].er_visit.number * $scope.scenarios[0].er_visit.price;
      $scope.scenarios[0].calcs.er_svcs_incur =
        $scope.scenarios[0].calcs.dr_svcs_incur +
        $scope.scenarios[0].calcs.spec_svcs_incur +
        $scope.scenarios[0].calcs.er_svcs_incur;

    }


    $scope.calcsHSA = function () {
      console.log("AnalyzeCtrl calcsHSA()");
    }


    $scope.calcsMain = function () {
      console.log("AnalyzeCtrl calcsMain()");
    }

    
  }]);


/* Guidance Controller ****************************************************************/

hpaControllers.controller('GuidanceCtrl', ['$scope', '$location',  'commonSvc',
  function($scope,  $location, commonSvc) {
    /*
    Figure out authentication, initial loading of variables
      - Load student IDs here
      - Handle errors
      - Router here by default
      - Update UI to MD

    */
    console.log("GuidanceCtrl entry");
    
   
    $scope.someFunction = function(option) {
      console.log("GuidanceCtrl someFunction()");
    }

  }]);


/* ExtRsc Controller ****************************************************************/

hpaControllers.controller('ExtRscCtrl', ['$scope', '$location',  'commonSvc',
  function($scope,  $location, commonSvc) {
    /*
    Figure out authentication, initial loading of variables
      - Load student IDs here
      - Handle errors
      - Router here by default
      - Update UI to MD

    */
    console.log("ExtRscCtrl entry");
    
   
    $scope.someFunction = function(option) {
      console.log("ExtRscCtrl someFunction()");
    }

  }]);

/* Home Controller ****************************************************************/

hpaControllers.controller('HomeCtrl', ['$scope', '$http', '$location', '$window', '$route', 'commonSvc',
  function($scope, $http, $location, $window, $route, commonSvc) {
    
    $scope.userModel = commonSvc.getData("userModel");
    console.log("HomeCtrl enter, userModel:" + $scope.userModel);
    console.log("HomeCtrl var: "+ $scope.userModel.calcs.plan_0_scen_0.incur_paid);

    
    //console.log('home before call');
    //$http.get('service/student/' + $scope.studentID + '.json').success(function(data) {
      
      //console.log('data:',data);
      //$scope.student = data;
      //$scope.student = {"id": "0001","name": {"first": "Gabi","last": "Claiborne"}};
      //console.log('student:',$scope.student);
      //console.log('studentID:',$scope.student.id);
      //console.log('first:',$scope.student.name.first);


    $scope.selectMenu = function(option) {
      commonSvc.setData("homeOption",option);
      //console.log("in selectOption(), option= "+commonSvc.getData("homeOption"));
      //console.log("in selectOption(), cur location= "+$window.location.href);
      //$location.path("#/practiceSight");
      //$route.reload();
      //$window.location.href="#/practiceSight";
      //$window.location.assign("#/practiceSight/");
      $window.location="#/practiceSight";
      //console.log("in selectOption(), location="+ $location.path());
      //$window.location.assign("#/practiceSight");
      
      //commonSvc.dumpData("1");
    }

    $scope.cConvertPctg = function(parm) {
      return commonSvc.convertPctg(parm);

    }

    $scope.cConvertDollar = function(parm) {
      return commonSvc.convertDollar(parm);

    }

  }]);



