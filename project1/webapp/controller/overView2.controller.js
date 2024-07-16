sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/util/Export",
        "sap/ui/core/util/ExportTypeCSV"
    ],
    function(Controller, Export, ExportTypeCSV) {
      "use strict";
        var header;
      return Controller.extend("uiapp.project1.controller.overView2", {
        onInit: function() {
            debugger
            window.history.pushState(null, document.title, window.location.href);    
            window.addEventListener('popstate', function (event) {      
            window.history.pushState(null, document.title, window.location.href);
 
            })
            var chartId=this.getView().byId('idChart2')
            var tabId=this.getView().byId('overTab2')
            chartId.bindElement("overView2>/ALL/")
            tabId.bindElement("overView2>/ALL/") 
        },
        // auto:function(oEvent){
        //     debugger
        //     header=oEvent.getParameters().arguments.h
        //     var chartId=this.getView().byId('idChart')
        //     var tabId=this.getView().byId('overTab')
        //     if(header=="UI5"){
        //         chartId.bindElement("overView>/UI5/")
        //         tabId.bindElement("{overView>/UI5/}")
        //     }else if(header=="ABAP"){
        //         chartId.bindElement("overView>/ABAP/")
        //         tabId.bindElement("overView>/ABAP/")
        //     }else if(header=="SALESFORCE"){
        //         chartId.bindElement("overView>/SALESFORCE/")
        //         tabId.bindElement("overView>/SALESFORCE/")
        //     }else if(header=="HYBRIS"){
        //         chartId.bindElement("overView>/HYBRIS/")
        //         tabId.bindElement("overView>/HYBRIS/")
        //     }
        // },
        onPressOverView2Back:function(){
            debugger
                this.getOwnerComponent().getRouter().navTo('AdminPage1')
            
        },
        onPressAllOverView: sap.m.Table.prototype.exportData || function() {
          debugger
          // Ensure that the model "overView" is properly loaded and available in the view
          var oModel = this.getView().getModel("overView2");
          if (!oModel) {
              console.error("Model 'overView' not found");
              return;
          }
      
         
          var oExport = new Export({
              exportType: new ExportTypeCSV({
                  fileExtension: "csv",
                  separatorChar: ","
              }),
              models: oModel,
              rows: {
                  path: "/ALL" 
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
      
         
          oExport.saveFile().catch(function(oError) {
              console.error("Error while exporting data: " + oError);
          }).then(function() {
              oExport.destroy(); 
          });
      }
      
      });
    }
  );
  