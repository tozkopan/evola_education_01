sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(Controller, MT, JSONModel) {
	"use strict";
	return Controller.extend("edu.v01education_01.controller.Main", {
		MT: MT,
		onInit: function() {
			var oModel = new JSONModel({
				letters: [
					"a", "b", "c"
				]
			});
			this.getView().setModel(oModel);
		},
		onPressA: function(evt) {
			// var oSrc = evt.getSource();
			this.MT.show("Hello World!\nNice to meet you!");
		},
		getModel: function(sName){
			return this.getView().getModel(sName);
		},
		byId: function(sId){
			return this.getView().byId(sId) || sap.ui.getCore().byId(sId);
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