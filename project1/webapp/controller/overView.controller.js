
sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/util/Export",
        "sap/ui/core/util/ExportTypeCSV"
    ],
    function(Controller, Export, ExportTypeCSV, XLSX) {
      "use strict";
        var header;
        var workbook
      return Controller.extend("uiapp.project1.controller.overView", {
        onInit: function() {
            debugger
            
            window.history.pushState(null, document.title, window.location.href);    
            window.addEventListener('popstate', function (event) {      
            window.history.pushState(null, document.title, window.location.href);
 
            })
            sap.ui.core.UIComponent.getRouterFor(this).attachRoutePatternMatched(this.auto,this)
        },
        auto:function(oEvent){
            debugger
            header=oEvent.getParameters().arguments.h
            var chartId=this.getView().byId('idChart')
            var tabId=this.getView().byId('overTab')
            if(header=="UI5"){
                chartId.bindElement("overView>/UI5/")
                tabId.bindElement("overView>/UI5/")
            }else if(header=="ABAP"){
                chartId.bindElement("overView>/ABAP/")
                tabId.bindElement("overView>/ABAP/")
            }else if(header=="SALESFORCE"){
                chartId.bindElement("overView>/SALESFORCE/")
                tabId.bindElement("overView>/SALESFORCE/")
            }else if(header=="HYBRIS"){
                chartId.bindElement("overView>/HYBRIS/")
                tabId.bindElement("overView>/HYBRIS/")
            }
            
        },
        onPressOverViewBack:function(){
            debugger
          
                // this.getOwnerComponent().getRouter().navTo('AdminPage1')
          
                this.getOwnerComponent().getRouter().navTo('AdminPage2',{y:header})
            
        },
        
deptExport: sap.m.Table.prototype.exportData || function() {
    // Ensure that the model "overView" is properly loaded and available in the view
    var oModel = this.getView().getModel("overView");
                     if (header=="UI5"){
                            var s="/UI5/"
                        }else if (header=="ABAP"){
                            var s="/ABAP/"
                        }else if (header=="SALESFORCE"){
                            var s="/SALESFORCE/"
                        }else if (header=="SALESFORCE"){
                            var s="/SALESFORCE/"
                        }
    if (!oModel) {
        console.error("Model 'overView' not found");
        return;
    }

    // Define the export configuration
    var oExport = new Export({
        exportType: new ExportTypeCSV({
            fileExtension: "csv",
            separatorChar: ","
        }),
        models: oModel,
        rows: {
            path: s // Adjust the path according to your model structure
        },
        columns: [
            { name: "Name", template: { content: "{name}" } },
            { name: "Mock Type", template: { content: "{mockType}" } },
            { name: "Mock Rating", template: { content: "{mock}" } },
            { name: "Review Date", template: { content: "{rDate}" } },
            { name: "Reviewer Name", template: { content: "{reviewName}" } },
            { name: "Reviewer ID", template: { content: "{reviewrId}" } },
            { name: "Feedback", template: { content: "{feedBack}" } }
        ]
    });

    // Save the file and handle any errors
    oExport.saveFile().catch(function(oError) {
        console.error("Error while exporting data: " + oError);
    }).then(function() {
        oExport.destroy(); // Destroy the export object after saving the file
    });
}

      });
    }
  );
  