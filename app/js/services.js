'use strict';

var varCommonServices = angular.module('commonServices', []);

varCommonServices.factory('commonSvc', function() {
	 var savedData = {}
	 
	 function setData(pName, pValue) {
	   savedData[pName] = pValue;
	 }
	 
	 function getData(pName) {
	  return savedData[pName];
	 }

	 function dumpData(place) {
	    console.log("dumpData(): "+place);
	  	for (var i in savedData) {
	    	if (savedData.hasOwnProperty(i)) {
	        	console.log(">>> "+i+" = "+savedData[i]);
	   		}

	 	}
	 }	

	 function convertPctg(numParm) {
	 	// return a number between 0-1
	 	// ToDo - how handle special case of 1?
	 	// ToDo - improve handling exception cases and performance
	 	console.log("commonServices.convertPctg(): "+numParm);
	 	if (null==numParm) {return 0;}
	 	
	 	var numNat = "not def";
	 	if (-1 != numParm.indexOf("%")) {
		 	numParm = numParm.replace("%"," ").trim();
	 		numNat = parseInt(numParm);
	 	} else {
	 		numNat = parseFloat(numParm);
	 	}

	 	if (numNat >=1 ) {
	 		numNat = numNat/100;
	 	}
	 	console.log("commonServices.convertPctg(): ["+numParm+"] -> ["+numNat+"]");
	 	return numNat;
	 }


	 function convertDollar(numParm) {
	 	// return an int 
	 	// ToDo - improve handling exception cases and performance
	 	console.log("commonServices.convertDollar(): in parm: "+numParm);
	 	if (null==numParm) {return 0;}

	 	if (-1 != numParm.indexOf("$")) {
	 		numParm = numParm.replace("$"," ").trim();
	 	}
	 	var numNat = parseInt(numParm);	 	
	 	console.log("commonServices.convertDollar(): ["+numParm+"] -> ["+numNat+"]");
	 	return numNat;
	 }


	 return {
	  setData: setData,
	  getData: getData,
	  convertDollar: convertDollar,
	  convertPctg: convertPctg,
	  dumpData: dumpData
	 }

});
