jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 customers in the list
// * All 3 customers have at least one orders

sap.ui.require([
	"sap/ui/test/Opa5",
	"de/tammenit/ui5/training/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"de/tammenit/ui5/training/test/integration/pages/App",
	"de/tammenit/ui5/training/test/integration/pages/Browser",
	"de/tammenit/ui5/training/test/integration/pages/Master",
	"de/tammenit/ui5/training/test/integration/pages/Detail",
	"de/tammenit/ui5/training/test/integration/pages/Create",
	"de/tammenit/ui5/training/test/integration/pages/NotFound"
], function(Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "de.tammenit.ui5.training.view."
	});

	sap.ui.require([
		"de/tammenit/ui5/training/test/integration/MasterJourney",
		"de/tammenit/ui5/training/test/integration/NavigationJourney",
		"de/tammenit/ui5/training/test/integration/NotFoundJourney",
		"de/tammenit/ui5/training/test/integration/BusyJourney",
		"de/tammenit/ui5/training/test/integration/FLPIntegrationJourney"
	], function() {
		QUnit.start();
	});
});