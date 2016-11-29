sap.ui.define([
	"de/tammenit/ui5/training/controller/BaseController",
	"sap/ui/core/routing/History"
], function(BaseController, History) {
	"use strict";

	return BaseController.extend("de.tammenit.ui5.training.controller.OrderDetails", {

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit : function () {
			var oRouter;
			oRouter = this.getRouter();
			oRouter.getRoute("orderDetail").attachPatternMatched(this._onObjectMatched, this);
		},

		onNavButtonPress: function() {
			var sPreviousHash = History.getInstance().getPreviousHash(),
				oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			if (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {
				history.go(-1);
			} else {
				this.getRouter().navTo("master", {}, true);
			}
		},
		
		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched : function (oEvent) {
			var sObjectId =  oEvent.getParameter("arguments").orderid;
			this.getModel().metadataLoaded().then( function() {
				var sObjectPath = this.getModel().createKey("orders", {
					id :  sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},
		
			/**
			 * Binds the view to the object path.
			 * @function
			 * @param {string} sObjectPath path to the object to be bound
			 * @private
			 */
			_bindView : function (sObjectPath) {
				var //oViewModel = this.getModel(this._viewModel),
					oDataModel = this.getModel();

				this.getView().bindElement({
					path: sObjectPath,
					events: {
						change: this._onBindingChange.bind(this),
						dataRequested: function () {
							oDataModel.metadataLoaded().then(function () {
								// Busy indicator on view should only be set if metadata is loaded,
								// otherwise there may be two busy indications next to each other on the
								// screen. This happens because route matched handler already calls '_bindView'
								// while metadata is loaded.
								//oViewModel.setProperty("/busy", true);
							});
						},
						dataReceived: function () {
							//oViewModel.setProperty("/busy", false);
						}
					}
				});
			},

			_onBindingChange : function () {
				var oView = this.getView(),
					//oViewModel = this.getModel(this._viewModel),
					oElementBinding = oView.getElementBinding();

				// No data for the binding
				if (!oElementBinding.getBoundContext()) {
					this.getRouter().getTargets().display("objectNotFound");
					return;
				}

					/*oObject = oView.getBindingContext().getObject(),*/
				var oResourceBundle = this.getResourceBundle(),
					oObject = oView.getModel().getObject(oElementBinding.getPath());

				// Everything went fine.
				//oViewModel.setProperty("/busy", false);
			}
		

	});

});