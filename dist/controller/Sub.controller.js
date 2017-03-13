sap.ui.define([
	"./Main.controller"
], function(BaseController) {
	"use strict";
	return BaseController.extend("edu.v01education_01.controller.Sub", {
		// onInit: function() {
		// },
		onPressA: function(evt) {
			// var oSrc = evt.getSource();
			this.MT.show("Hello Dark World!\nSorry to meet you again!");
			var oArgs = arguments;
			setTimeout(function(){
				var oMe = this,
					oBase = BaseController;
				oBase.prototype.onPressA.apply(this, oArgs);
				// this.BaseController.prototype.onPressA
			}.bind(this), 2000);
		}
	});
});