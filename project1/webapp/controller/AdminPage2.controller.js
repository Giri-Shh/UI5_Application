sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast,Filter, FilterOperator, JSONModel) {
        "use strict";
        count:null;
        var header;
        return Controller.extend("uiapp.project1.controller.AdminPage2", {
            onInit: function () {
                window.history.pushState(null, document.title, window.location.href);    
                window.addEventListener('popstate', function (event) {      
                window.history.pushState(null, document.title, window.location.href);
 
            })
                sap.ui.core.UIComponent.getRouterFor(this).attachRoutePatternMatched(this.auto,this)
            },
            auto:function(oEvent){
                debugger
                
                header=oEvent.getParameters().arguments.y
                
                var listId=this.getView().byId("idList")
                if(header=="UI5"){
                    listId.bindElement("empData>/UI5/")
                }else if(header=="ABAP"){
                    listId.bindElement("empData>/ABAP/")
                }else if(header=="SALESFORCE"){
                    listId.bindElement("empData>/SALESFORCE/")
                }else if(header=="HYBRIS"){
                    listId.bindElement("empData>/HYBRIS/")
                }
                var requestModel=this.getView().getModel("overView")
                var uiLength=requestModel.oData.UI5.length
                var abapLength=requestModel.oData.ABAP.length
                var salesLength=requestModel.oData.SALESFORCE.length
                var hybLength=requestModel.oData.HYBRIS.length
                var adminNotifyId=this.getView().byId('adminNotify')
                // sap.ui.getCore().byId('adminNotify')
                
                if(header=='UI5'){
                    adminNotifyId.setProperty("value", uiLength)
                }else if(header=='ABAP'){
                    adminNotifyId.setProperty("value", abapLength)
                }else if(header=='SALESFORCE'){
                    adminNotifyId.setProperty("value", salesLength)
                }else if(header=='HYBRIS'){
                    adminNotifyId.setProperty("value", hybLength)
                }
                
            },
            onItemPress:function(oEvent){
                debugger
                var sPath=oEvent.getParameter("listItem").getBindingContextPath()
                var s=this.getView().byId("ObjectPageLayout")
                s.bindElement("empData>"+sPath)
                var t=this.getView().byId("myTable")
                t.bindElement("empData>"+sPath)



            },
          
            addPopUp:null,
            addEmp:function(){
                debugger

                

                if(!this.addPopUp){
                    debugger
                    this.addPopUp=new sap.ui.xmlfragment("uiapp.project1.fragments.addEmp", this)
                    
                    this.getView().addDependent(this.addPopUp);
                    this.addPopUp.setTitle(`ENTER EMPLOYEE DETAILS FOR ${header}`)
                //  
                    this.addPopUp.open()
                     
                }else{
                    this.addPopUp.open()

                }

                var dropDownId=sap.ui.getCore().byId('_IDGenInput3')
                if(header=="UI5"){
                    dropDownId.bindElement("dropDown>/UI5/")
                }else if(header=="ABAP"){
                    dropDownId.bindElement("dropDown>/ABAP/")
                }else if(header=="SALESFORCE"){
                    dropDownId.bindElement("dropDown>/SALESFORCE/")
                }else if(header=="HYBRIS"){
                    dropDownId.bindElement("dropDown>/HYBRIS/")
                }

                var empModel=this.getView().getModel('empData')
                if(header=='UI5'){
                    var empoo=empModel.oData.UI5.length
                }else if(header=="ABAP"){
                    var empoo=empModel.oData.ABAP.length
                }else if(header=="SALESFORCE"){
                    var empoo=empModel.oData.SALESFORCE.length
                }else if(header=="HYBRIS"){
                    var empoo=empModel.oData.HYBRIS.length
                }
                var b=sap.ui.getCore().byId("_IDGenInput2")
                if(header=='UI5'){
                    b.setValue(empoo+701)
                }else if(header=="ABAP"){
                    b.setValue(empoo+601)
                }else if(header=="SALESFORCE"){
                    b.setValue(empoo+501)
                }else if(header=="HYBRIS"){
                    b.setValue(empoo+401)
                }
                

            },
            cancelDialog:function(){
                debugger
                this.addPopUp.close()
                this.addPopUp.destroy(true);
                this.addPopUp = null
            },
            onSave : function() {
                debugger
                var addTitle=sap.ui.getCore().byId('addEmpDailog')
                addTitle.setTitle('ADD EMPLOYS FOR UI5 Department')

                var a=sap.ui.getCore().byId("_IDGenInput1")
                var b=sap.ui.getCore().byId("_IDGenInput2")
                var c=sap.ui.getCore().byId("_IDGenInput3")
                var d=sap.ui.getCore().byId("_IDGenInput4")
                var e=sap.ui.getCore().byId("_IDGenInput5")
                var f=sap.ui.getCore().byId("_IDGenInput6")
                var g=sap.ui.getCore().byId("_IDGenInput7")
                var h=sap.ui.getCore().byId("_IDGenInput8")
                var i=sap.ui.getCore().byId("_IDGenInput9")

                var NameVal =/^[A-Za-z]{3,25}$/
                var PhoneVal =/^[6-9][0-9]{9}$/
                var EmailVal =/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
                var UserPassRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
                
                
                

                var empName=a.getValue()
                var empId=b.getValue()
                var empDesignation=c.mProperties.selectedKey
                var empNJoinDate=d.getValue()
                var empExp=e.getValue()
                var empContactNo=f.getValue()
                var empMail=g.getValue()
                var empPwd=h.getValue()
                var confPwd=i.getValue()
                let empObj={
                    name: empName,
                    designation:empDesignation,
                    joiningDate:empNJoinDate,
                    clientCompany:"",
                    experienceInYear:empExp,
                    contactNo:empContactNo,
                    mailId:empMail,
                    image:"sap-icon://employee",
                    empId:empId,
                    pwd:empPwd,
                    empReview:[],
                    pStatus:"notChanged",
                    }
                var oldPwd;
                var oldMail;
                var oldId;
                var oModel =this.getView().getModel("empData")
                oModel.refresh(true)
                if(header=="UI5"){
                    var oldData=oModel.oData.UI5
                }else if(header=="ABAP"){
                    var oldData=oModel.oData.ABAP
                }else if(header=="SALESFORCE"){
                    var oldData=oModel.oData.SALESFORCE
                }else if(header=="HYBRIS"){
                    var oldData=oModel.oData.HYBRIS
                }
                //to get old Password email and ID
                var x=this.getView().getModel('empData').oData;
                var y=Object.keys(x)
                for(let i=0;i<y.length;i++){
                    debugger
                    if(y[i]=="UI5"){
                        for (let j=0;j<x.UI5.length;j++){
                            if(x.UI5[j].pwd==empPwd || x.UI5[j].empId==empId ||  x.UI5[j].mailId==empMail){
                                oldId=x.UI5[j].empId
                                oldPwd=x.UI5[j].pwd
                                oldMail=x.UI5[j].mailId
                            }
                        }
                    }else if(y[i]=="ABAP"){
                        for (let j=0;j<x.ABAP.length;j++){
                            if(x.ABAP[j].pwd==empPwd || x.ABAP[j].empId==empId ||  x.ABAP[j].mailId==empMail){
                                oldId=x.ABAP[j].empId
                                oldPwd=x.ABAP[j].pwd
                                oldMail=x.ABAP[j].mailId
                            }
                        }
                    }else if(y[i]=="SALESFORCE"){
                        for (let j=0;j<x.SALESFORCE.length;j++){
                            if(x.SALESFORCE[j].pwd==empPwd || x.SALESFORCE[j].empId==empId ||  x.SALESFORCE[j].mailId==empMail){
                                oldId=x.SALESFORCE[j].empId
                                oldPwd=x.SALESFORCE[j].pwd
                                oldMail=x.SALESFORCE[j].mailId
                            }
                        }
                    }if(y[i]=="HYBRIS"){
                        for (let j=0;j<x.HYBRIS.length;j++){
                            if(x.HYBRIS[j].pwd==empPwd || x.HYBRIS[j].empId==empId ||  x.HYBRIS[j].mailId==empMail){
                                oldId=x.HYBRIS[j].empId
                                oldPwd=x.HYBRIS[j].pwd
                                oldMail=x.HYBRIS[j].mailId
                            }
                        }
                    }
                }  
                if(empName=="" &&  empDesignation=="" && empNJoinDate=="" && empExp=="" && empContactNo=="" && empMail=="" && empPwd=="" && confPwd==""){
                    a.setValueState("Error");
                    a.setValueStateText("Emp Name cannot be empty");
                    
                    b.setValueState("Error");
                    b.setValueStateText("EMP ID cannot be empty");

                    c.setValueState("Error");
                    c.setValueStateText("Designationn Field cannot be empty");

                    d.setValueState("Error");
                    d.setValueStateText("Date field cannot be empty");

                    e.setValueState("Error");
                    e.setValueStateText("Experience field cannot be empty");

                    f.setValueState("Error");
                    f.setValueStateText("Contact Number field cannot be empty");

                    g.setValueState("Error");
                    g.setValueStateText("Mail field cannot be empty");

                    h.setValueState("Error");
                    h.setValueStateText("Password cannot be empty");

                    i.setValueState("Error");
                    i.setValueStateText("Confirm password cannot be empty");

                    MessageToast.show('ENTER ALL THE FIELDS');
                }else if(empId=="" && empDesignation=="" && empNJoinDate=="" && empExp=="" && empContactNo=="" && empMail=="" && empPwd=="" && confPwd==""){
                    b.setValueState("Error");
                    b.setValueStateText("EMP ID cannot be empty");

                    c.setValueState("Error");
                    c.setValueStateText("Designationn Field cannot be empty");

                    d.setValueState("Error");
                    d.setValueStateText("Date field cannot be empty");

                    e.setValueState("Error");
                    e.setValueStateText("Experience field cannot be empty");

                    f.setValueState("Error");
                    f.setValueStateText("Contact Number field cannot be empty");

                    g.setValueState("Error");
                    g.setValueStateText("Mail field cannot be empty");

                    h.setValueState("Error");
                    h.setValueStateText("Password cannot be empty");

                    i.setValueState("Error");
                    i.setValueStateText("Confirm password cannot be empty");

                    MessageToast.show('ENTER ALL THE FIELDS');
                }else if(empDesignation=="" && empNJoinDate=="" && empExp=="" && empContactNo=="" && empMail=="" && empPwd=="" && confPwd==""){
                    c.setValueState("Error");
                    c.setValueStateText("Designationn Field cannot be empty");

                    d.setValueState("Error");
                    d.setValueStateText("Date field cannot be empty");

                    e.setValueState("Error");
                    e.setValueStateText("Experience field cannot be empty");

                    f.setValueState("Error");
                    f.setValueStateText("Mail field cannot be empty");

                    g.setValueState("Error");
                    g.setValueStateText("Contact No field cannot be empty");

                    h.setValueState("Error");
                    h.setValueStateText("Password cannot be empty");

                    i.setValueState("Error");
                    i.setValueStateText("Confirm password cannot be empty");

                    MessageToast.show('ENTER ALL THE FIELDS');
                }else if(empNJoinDate=="" && empExp=="" && empContactNo=="" && empMail=="" && empPwd=="" && confPwd==""){
                    d.setValueState("Error");
                    d.setValueStateText("Date field cannot be empty");

                    e.setValueState("Error");
                    e.setValueStateText("Experience field cannot be empty");

                    f.setValueState("Error");
                    f.setValueStateText("Contact Number field cannot be empty");

                    g.setValueState("Error");
                    g.setValueStateText("Mail field cannot be empty");

                    h.setValueState("Error");
                    h.setValueStateText("Password cannot be empty");

                    i.setValueState("Error");
                    i.setValueStateText("Confirm password cannot be empty");

                    MessageToast.show('ENTER ALL THE FIELDS');
                }else if(empExp=="" && empContactNo=="" && empMail=="" && empPwd=="" && confPwd==""){
                    e.setValueState("Error");
                    e.setValueStateText("Experience field cannot be empty");

                    f.setValueState("Error");
                    f.setValueStateText("Contact Number field cannot be empty");

                    g.setValueState("Error");
                    g.setValueStateText("Mail field cannot be empty");

                    h.setValueState("Error");
                    h.setValueStateText("Password cannot be empty");

                    i.setValueState("Error");
                    i.setValueStateText("Confirm password cannot be empty");

                    MessageToast.show('ENTER ALL THE FIELDS');
                }else if(empContactNo=="" && empMail=="" && empPwd=="" && confPwd==""){
                    f.setValueState("Error");
                    f.setValueStateText("Contact Number field cannot be empty");

                    g.setValueState("Error");
                    g.setValueStateText("Mail field cannot be empty");

                    h.setValueState("Error");
                    h.setValueStateText("Password cannot be empty");

                    i.setValueState("Error");
                    i.setValueStateText("Confirm password cannot be empty");

                    MessageToast.show('ENTER ALL THE FIELDS');
                }else if(empMail=="" && empPwd=="" && confPwd==""){
                    g.setValueState("Error");
                    g.setValueStateText("Mail field cannot be empty");

                    h.setValueState("Error");
                    h.setValueStateText("Password cannot be empty");

                    i.setValueState("Error");
                    i.setValueStateText("Confirm password cannot be empty");

                    MessageToast.show('ENTER ALL THE FIELDS');
                }else if(empPwd=="" && confPwd==""){
                    h.setValueState("Error");
                    h.setValueStateText("Password cannot be empty");

                    i.setValueState("Error");
                    i.setValueStateText("Confirm password cannot be empty");

                    MessageToast.show('ENTER ALL THE FIELDS');
                }else if(confPwd==""){
                    i.setValueState("Error");
                    i.setValueStateText("Confirm password cannot be empty");

                    MessageToast.show('ENTER ALL THE FIELDS');

                }else  if(!NameVal.test(empName)){
                    a.setValueState("Error");
                    a.setValueStateText("Please enter valid user name");
                
                }else if(!PhoneVal.test(empContactNo)){
                   
                    f.setValueState("Error");
                    f.setValueStateText("Please enter valid contact number");
                
                }else if(!EmailVal.test(empMail)){
                    
                    g.setValueState("Error");
                    g.setValueStateText("Please enter valid email id");

                } else if(!UserPassRegex.test(empPwd)){

                    h.setValueState("Error");
                    h.setValueStateText("Password Should Contain atleason one digit, on special Character and length should be 7 to 15 characters");
                }
                else if(empName==""||empId==""||empDesignation==""||empNJoinDate==""||empExp==""||empContactNo==""||empMail==""||empPwd==""){
                    if(empName==""){
                        a.setValueState("Error")
                        MessageToast.show("ENTER EMPLOYEE NAME")
                    }else if(empId==""){
                        b.setValueState("Error")
                        MessageToast.show("Enter Employee ID")
                    }else if(empDesignation==""){
                        c.setValueState("Error")
                        MessageToast.show("Enter Designation")
                    }else if(empNJoinDate==""){
                        d.setValueState("Error")
                        MessageToast.show("Enter Employee Join Date")
                    }else if(empExp==""){
                        e.setValueState("Error")
                        MessageToast.show("Enter Employee Experience")
                    }else if(empContactNo==""){
                        f.setValueState("Error")
                        MessageToast.show("Enter Employee Contact Number")
                    }else if(empMail==""){
                        g.setValueState("Error")
                        MessageToast.show("Enter Employee Email")
                    }else if(empPwd==""){
                        h.setValueState("Error")
                        MessageToast.show("Enter Employee Password")
                    }
                }else if(oldPwd==empPwd||oldId==empId||oldMail==empMail){
                    if(oldPwd==empPwd){
                        h.setValueState("Error")
                        MessageToast.show("PASSWORD ID ALREADY TRY OTHER")
                    }else if(oldId==empId){
                        b.setValueState("Error")
                        MessageToast.show("ID IS ALREADY GIVEN TRY OTHER")
                    }else if(oldMail==empMail){
                        g.setValueState("Error")
                        MessageToast.show("MAIL IS ALREADY GIVEN TRY OTHER")
                    }
                }else if(empPwd!=confPwd){
                    h.setValueState("Error")

                    i.setValueState("Error")
                    h.setValueStateText("Passwords are not Matching");
                }else {
                    oldData.push(empObj)
                    oModel.setData(empObj,"oldData")
                    sap.ui.getCore().setModel(oModel)


                    this.addPopUp.close()
                    this.addPopUp.destroy(true);
                    this.addPopUp = null
                    MessageToast.show("SAVED")
                }
                
                
            },
            deletePopUp:null,
            deleteEmp:function(oEvent){
                debugger
                // MessageToast.show("Okk I'll Come")
                var listId=this.getView().byId("idList")
                // listId.setProperty("mode","SingleSelect")
                var header=listId.mElementBindingContexts.empData.sPath
                
                if(!this.deletePopUp){
                    debugger
                    this.deletePopUp=new sap.ui.xmlfragment("uiapp.project1.fragments.deleteEmp", this)
                    this.deletePopUp.setTitle("Select Employs to Delete")
                    var listId2=sap.ui.getCore().byId('idDeleteList')
                    this.getView().addDependent(this.deletePopUp);
                    if(header=="/UI5"){
                        listId2.bindElement("empData>/UI5/")
                    }else if(header=="/ABAP"){
                        listId2.bindElement("empData>/ABAP/")
                    }else if(header=="/SALESFORCE"){
                        listId2.bindElement("empData>/SALESFORCE/")
                    }else if(header=="/HYBRIS"){
                        listId2.bindElement("empData>/HYBRIS/")
                    }
                    
                    
                    this.deletePopUp.open()   
                }
            },
            deleteCancel:function(){
                debugger
                this.deletePopUp.close()
                this.deletePopUp.destroy(true);
                this.deletePopUp = null
            },
            onItemPressDelete:function(oEvent){
                debugger
                

                
                var oList = sap.ui.getCore().byId("idDeleteList"); 
                var aSelectedItems = oList.getSelectedItems();
                var oModel = oList.getModel("empData");
                if(header=="UI5"){
                    var aData = oModel.getProperty("/UI5");
                }else if(header=="ABAP"){
                    var aData = oModel.getProperty("/ABAP");
                }else if(header=="SALESFORCE"){
                    var aData = oModel.getProperty("/SALESFORCE");
                }else if(header=="HYBRIS"){
                    var aData = oModel.getProperty("/HYBRIS");
                }
                
 
       
                
                var aIndices = [];
                aSelectedItems.forEach(function(oItem) {
                    debugger
                    var sPath = oItem.getBindingContext("empData").getPath();
                    var nIndex = parseInt(sPath.substring(sPath.lastIndexOf("/") + 1));
                    aIndices.push(nIndex);
                });
       
                
                aIndices.sort(function(a, b) {
                    debugger
                    return b - a;
                });
       
               
                aIndices.forEach(function(index) {
                    debugger
                    aData.splice(index, 1);
                });
                if(header=="UI5"){
                    oModel.setProperty("/UI5", aData);
                }else if(header=="ABAP"){
                    oModel.setProperty("/ABAP", aData);
                }else if(header=="SALESFORCE"){
                    oModel.setProperty("/SALESFORCE", aData);
                }else if(header=="HYBRIS"){
                    oModel.setProperty("/HYBRIS", aData);
                }
                
                
       
                
                oList.removeSelections();
                this.deletePopUp.close()
                this.deletePopUp.destroy(true);
                this.deletePopUp = null
                MessageToast.show('DELETE SUCCESSFUL')
            },
            onRequest:function(){
                debugger
               
    
                var data=this.getView().getModel('empData').oData
               
                var s=this.getView().byId("ObjectPageLayout")
                var ss=s.mObjectBindingInfos.empData.path
                var index=ss.split('/')[ss.split('/').length-1]
               
                if(header=="UI5"){
                   var empobj= data.UI5[index]
                }else if(header=="ABAP"){
                    var empobj= data.ABAP[index]
                }else if(header=="SALESFORCE"){
                    var empobj= data.SALESFORCE[index]
                }else if(header=="HYBRIS"){
                    var empobj= data.HYBRIS[index]
                }
                console.log(empobj);
                var rData=this.getView().getModel('requestData')
                var rObject={
                    name:empobj.name ,
                    designation:empobj.designation,
                    contactNo:empobj.contactNo,
                    mailId:empobj.mailId,
                    empId:empobj.empId
                }
                if(header=="UI5"){
                    rData.oData.UI5.push(rObject)
                }else if(header=="ABAP"){
                    rData.oData.ABAP.push(rObject)
                }else if(header=="SALESFORCE"){
                    rData.oData.SALESFORCE.push(rObject)
                }else if(header=="HYBRIS"){
                    rData.oData.HYBRIS.push(rObject)
                }
                rData.refresh(true)
                rData.setData(rData,rObject)
                sap.ui.getCore().setModel(rData)
                MessageToast.show('Request Sent Successfully')
   
            },
            adminLogout2:function(){
                debugger
                this.getOwnerComponent().getRouter().navTo("RouteLogin")
            },
            goBack:function(){
                debugger
                this.getOwnerComponent().getRouter().navTo("AdminPage1")
            },
            onEnterDetails1:function(){
                debugger
                var a=sap.ui.getCore().byId("_IDGenInput1")
                a.setValueState("None")  
            },
            onEnterDetails2:function(){
                debugger
                var b=sap.ui.getCore().byId("_IDGenInput2")
                b.setValueState("None")
            },
            onEnterDetails3:function(){
                debugger
                var c=sap.ui.getCore().byId("_IDGenInput3")
                c.setValueState("None")
            },
            onEnterDetails4:function(){
                debugger
                var d=sap.ui.getCore().byId("_IDGenInput4")
                d.setValueState("None")
            },
            onEnterDetails5:function(){
                debugger
                var e=sap.ui.getCore().byId("_IDGenInput5")
                e.setValueState("None")
            },
            onEnterDetails6:function(){
                debugger
                var f=sap.ui.getCore().byId("_IDGenInput6")
                f.setValueState("None")
            },
            onEnterDetails7:function(){
                debugger
                var g=sap.ui.getCore().byId("_IDGenInput7")
                g.setValueState("None")
            },
            onEnterDetails8:function(){
                debugger
                var h=sap.ui.getCore().byId("_IDGenInput8")
                h.setValueState("None")
            },
            onEnterDetails9:function(){
                debugger
                var i=sap.ui.getCore().byId("_IDGenInput9")
                i.setValueState("None")
            },
            onOverView:function(){
                debugger
                this.getOwnerComponent().getRouter().navTo('overView', {h:header})
            },
            onSearch:function(oEvent){
                debugger
                var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("name", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var oList = this.byId("idList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");

            },
            editPopUp:null,
            editEmpDetails:function(){
                debugger
                if(!this.editPopUp){
                    debugger
                    this.editPopUp=new sap.ui.xmlfragment("uiapp.project1.fragments.editEmp", this)
                    
                    this.getView().addDependent(this.editPopUp);
                    
                //  
                    this.editPopUp.open()
                }else{
                    this.editPopUp.open()
                }

                var data=this.getView().getModel('empData').oData
                var s=this.getView().byId("ObjectPageLayout")
                var ss=s.mObjectBindingInfos.empData.path
                var index=ss.split('/')[ss.split('/').length-1]
               
                if(header=="UI5"){
                   var name2= data.UI5[index].name
                }else if(header=="ABAP"){
                    var name2= data.ABAP[index].name
                }else if(header=="SALESFORCE"){
                    var name2= data.SALESFORCE[index].name
                }else if(header=="HYBRIS"){
                    var name2= data.HYBRIS[index].name
                }
                // console.log(empobj);
                var x=sap.ui.getCore().byId('editEmpForm')
                x.bindElement('empData>'+ss)

                var editTitle=sap.ui.getCore().byId('editEmpDialog')
                editTitle.setTitle("Change Details For "+ name2) 
                sap.ui.getCore().byId("editedJoinDate").setMaxDate(new Date())  
            },
            cancelEdit:function(){
                debugger
                this.editPopUp.close()
                this.editPopUp.destroy(true);
                this.editPopUp = null
            },
            onPresEditSave:function(){
                debugger
            },
            onPresEditSave:function(){
                debugger
                var a=sap.ui.getCore().byId('editedName')
                var b=sap.ui.getCore().byId('editedContactNo')
                var c=sap.ui.getCore().byId('editedMail')
                var d=sap.ui.getCore().byId('editedJoinDate')
                var e=sap.ui.getCore().byId('editedExperience')

                var editedName=a.getValue()
                var editedContactNo=b.getValue()
                var editedMail=c.getValue()
                var editedJoinDate=d.getValue()
                var editedExperience=e.getValue()

                var s=this.getView().byId("ObjectPageLayout")
                var ss=s.mObjectBindingInfos.empData.path
                var index=ss.split('/')[ss.split('/').length-1]
                var oModel=this.getView().getModel('empData')
                if(header=="UI5"){
                   var oModelData=oModel.oData.UI5[index]
                }else if(header=="ABAP"){
                    var oModelData=oModel.oData.ABAP[index]
                }else if(header=="SALESFORCE"){
                    var oModelData=oModel.oData.SALESFORCE[index]
                }else if(header=="HYBRIS"){
                    var oModelData=oModel.oData.HYBRIS[index]
                }

                var NameVal =/^[A-Za-z]{3,25}$/
                var PhoneVal =/^[6-9][0-9]{9}$/
                var EmailVal =/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/

                if(editedName=="" && editedContactNo=="" && editedMail=="" && editedJoinDate=="" && editedExperience==""){
                    a.setValueState('Error')
                    a.setValueStateText('Name Field Cannot be Empty')

                    b.setValueState('Error')
                    b.setValueStateText('Contact Number Field Cannot be Empty')

                    c.setValueState('Error')
                    c.setValueStateText('Mail Field Cannot be Empty')

                    d.setValueState('Error')
                    d.setValueStateText('JoinDate Field Cannot be Empty')

                    e.setValueState('Error')
                    e.setValueStateText('Experience Field Cannot be Empty')

                    MessageToast.show('ENTER ALL THE DETAILS')
                }else if(editedContactNo=="" && editedMail=="" && editedJoinDate=="" && editedExperience==""){
                    b.setValueState('Error')
                    b.setValueStateText('Contact Number Field Cannot be Empty')

                    c.setValueState('Error')
                    c.setValueStateText('Mail Field Cannot be Empty')

                    d.setValueState('Error')
                    d.setValueStateText('JoinDate Field Cannot be Empty')

                    e.setValueState('Error')
                    e.setValueStateText('Experience Field Cannot be Empty')

                    MessageToast.show('ENTER ALL THE DETAILS')
                }else if(editedMail=="" && editedJoinDate=="" && editedExperience==""){
                    c.setValueState('Error')
                    c.setValueStateText('Mail Field Cannot be Empty')

                    d.setValueState('Error')
                    d.setValueStateText('JoinDate Field Cannot be Empty')

                    e.setValueState('Error')
                    e.setValueStateText('Experience Field Cannot be Empty')

                    MessageToast.show('ENTER ALL THE DETAILS')
                }else if(editedJoinDate=="" && editedExperience==""){
                    d.setValueState('Error')
                    d.setValueStateText('JoinDate Field Cannot be Empty')

                    e.setValueState('Error')
                    e.setValueStateText('Experience Field Cannot be Empty')

                    MessageToast.show('ENTER ALL THE DETAILS')
                }else if(editedExperience==""){
                    e.setValueState('Error')
                    e.setValueStateText('Experience Field Cannot be Empty')
                }else if(editedName=="" || editedContactNo=="" || editedMail=="" || editedJoinDate=="" || editedExperience==""){
                    if(editedName==""){
                        a.setValueState('Error')
                        a.setValueStateText('Name Field Cannot be Empty')
                        MessageToast.show('ENTER NAME')
                    }else if(editedContactNo==""){
                        b.setValueState('Error')
                        b.setValueStateText('Contact Number Field Cannot be Empty')
                        MessageToast.show('ENTER CONTACT NUMBER')
                    }else if(editedMail==""){
                        c.setValueState('Error')
                        c.setValueStateText('Mail Field Cannot be Empty')
                        MessageToast.show('ENTER MAIL ID')
                    }else if(editedJoinDate==""){
                        d.setValueState('Error')
                        d.setValueStateText('JoinDate Field Cannot be Empty')
                        MessageToast.show('SELECT JOIN DATE')
                    }else if(editedExperience==""){
                        e.setValueState('Error')
                        e.setValueStateText('Experience Field Cannot be Empty')
                        MessageToast.show('ENTER EXPERIENCE')
                    }
                }else if(!NameVal.test(editedName)){
                    a.setValueState('Error')
                    a.setValueStateText('ENTER VALID NAME')
                }else if(!PhoneVal.test(editedContactNo)){
                   
                    b.setValueState("Error");
                    b.setValueStateText("Please enter valid contact number");
                
                }else if(!EmailVal.test(editedMail)){
                    
                    c.setValueState("Error");
                    c.setValueStateText("Please enter valid email id");

                }else {
                    oModelData.name=editedName
                    oModelData.contactNo=editedContactNo
                    oModelData.mailId=editedMail
                    oModelData.joiningDate=editedJoinDate
                    oModelData.experienceInYear=editedExperience

                    oModel.refresh(true)
                    MessageToast.show('UPDATED SUCCESSFULLY')
                    // rData.setData(rData,rObject)
                    // sap.ui.getCore().setModel(rData)
                    this.editPopUp.close()
                    this.editPopUp.destroy(true);
                    this.editPopUp = null


                }




            },
            abcd1:function(){
                debugger
                var a=sap.ui.getCore().byId('editedName')
                a.setValueState('None')
            },
            abcd2:function(){
                debugger
                var b=sap.ui.getCore().byId('editedContactNo')
                b.setValueState('None')
            },
            abcd3:function(){
                debugger
                var c=sap.ui.getCore().byId('editedMail')
                c.setValueState('None')
            },
            abcd4:function(){
                debugger
                var d=sap.ui.getCore().byId('editedJoinDate')
                d.setValueState('None')
            },
            abcd5:function(){
                debugger
                var e=sap.ui.getCore().byId('editedExperience')
                e.setValueState('None')
            },
            
            
        });
    });
