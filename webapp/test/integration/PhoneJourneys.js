jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"de/tammenit/ui5/training/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"de/tammenit/ui5/training/test/integration/pages/App",
	"de/tammenit/ui5/training/test/integration/pages/Browser",
	"de/tammenit/ui5/training/test/integration/pages/Master",
	"de/tammenit/ui5/training/test/integration/pages/Detail",
	"de/tammenit/ui5/training/test/integration/pages/NotFound"
], function(Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "de.tammenit.ui5.training.view."
	});

	sap.ui.require([
		"de/tammenit/ui5/training/test/integration/NavigationJourneyPhone",
		"de/tammenit/ui5/training/test/integration/NotFoundJourneyPhone",
		"de/tammenit/ui5/training/test/integration/BusyJourneyPhone"
	], function() {
		QUnit.start();
	});
});