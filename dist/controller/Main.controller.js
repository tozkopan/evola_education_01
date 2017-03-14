sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(Controller, MT, JSONModel) {
	"use strict";
	return Controller.extend("edu.v01education_01.controller.Main", {
		MT: MT,
		colorApp: function(evt) {
			var oSrc = evt.getSource(),
				oApp = this.byId("__xmlview0--app"),
				sColor = oSrc.data("color");
			oApp.setBackgroundColor(sColor);
				
		},
		onInit: function() {
			var that = this,
				oModel = new JSONModel({
					letters: [
						"a", "b", "c"
					]
				});
			this.getView().setModel(oModel);
			
			console.log("onInit controller: Main, "
				+ " view: " + this.getView().sViewName.split(".").pop());
			
			var oRouter = this.getOwnerComponent().getRouter();
			if(!oRouter._bInitialized){
				oRouter._bInitialized = true;
				oRouter.attachRouteMatched(function(evt){
					var sRouteName = evt.getParameter("name"),
						utilModel = that.getModel("util");
					console.log("RouteMatched: " + sRouteName);
					if(sRouteName === "Mood"){
						var sMood = evt.getParameter("arguments").isGood,
							bMood = sMood === "true" || sMood === true;
						console.log("Is good : " + sMood);
						utilModel.setProperty("/moodState", bMood);
					}
				});
			}
		},
		
		onAlterMood: function(evt) {
			var oButton = evt.getSource(),
				bPressed = oButton.getPressed();
			console.log("onAlterMood: " + bPressed);
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Mood",{
				isGood: bPressed
			});
		},
		
		onPressA: function(evt) {
			// var oSrc = evt.getSource();
			this._onAbstractPress("Hello World!\nNice to meet you!");
		},
		onPressB: function(evt) {
			// var oSrc = evt.getSource();
			this._onAbstractPress("Goodbye Cruel World!");
		},
		_onAbstractPress: function(sName){
			this.MT.show(sName);
		},
		getModel: function(sName){
			return this.getView().getModel(sName);
		},
		byId: function(sId){
			return this.getView().byId(sId) || sap.ui.getCore().byId(sId);
		},
		
		/**
		 * Back navigation
		 */
		navBack: function() {
			var oHistory = sap.ui.core.routing.History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				window.history.go(-1);
			}else{
				this.getOwnerComponent().getRouter().navTo("Default");
			}
		},
		onDelete: function(evt) {
			var oModel = this.getModel(),
				// oList = evt.getSource(),
				oList = this.byId("myList"),
				sMainPath = oList.getBinding("items").getPath(),
				aItems = oModel.getProperty( sMainPath ), // /letters
				oListItem = evt.getParameter("listItem"),
				sItemPath = oListItem.getBindingContextPath(),
				iIndex = +sItemPath.split("/").pop(); // /letters/1
				//var aItemsCopy = $.extend([], aItems, false);
				
			aItems.splice(iIndex, 1);
			oModel.setProperty(sMainPath, aItems);
		}
	});
});