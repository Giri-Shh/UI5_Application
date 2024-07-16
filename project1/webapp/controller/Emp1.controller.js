sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox) {
        "use strict";
        var deptName;
        var index;

        return Controller.extend("uiapp.project1.controller.Emp1", {
            reViewPopUp: null,
            onInit: function () {
                window.history.pushState(null, document.title, window.location.href);    
   window.addEventListener('popstate', function (event) {      
        window.history.pushState(null, document.title, window.location.href);
 
            })
                sap.ui.core.UIComponent.getRouterFor(this).attachRoutePatternMatched(this.emp1, this)
            },
            emp1: function (oEvent) {
                debugger
                deptName = oEvent.getParameters().arguments.y
                index = oEvent.getParameters().arguments.z
                var idList = this.getView().byId('requestList')
                if (deptName == 'UI5') {
                    idList.bindElement('requestData>/UI52/')
                } else if (deptName == 'ABAP') {
                    idList.bindElement('requestData>/ABAP2/')
                } else if (deptName == 'SALESFORCE') {
                    idList.bindElement('requestData>/SALESFORCE2/')
                } else if (deptName == 'HYBRIS') {
                    idList.bindElement('requestData>/HYBRIS2/')
                }
                var loginName=this.getView().getModel('loginData').oData.EMPDETAIL[0].name
                var rModel=this.getView().getModel('requestData')
                if (deptName == 'UI5') {
                    var rModelData=rModel.oData.UI5
                } else if (deptName == 'ABAP') {
                    var rModelData=rModel.oData.ABAP
                } else if (deptName == 'SALESFORCE') {
                    var rModelData=rModel.oData.SALESFORCE
                } else if (deptName == 'HYBRIS') {
                    var rModelData=rModel.oData.HYBRIS
                }
                var count=0;
                var spliceIndex;
                debugger
                var listId=sap.ui.getCore().byId('requestList');
                if (deptName == 'UI5') {
                    var rModelData2=rModel.oData.UI52
                } else if (deptName == 'ABAP') {
                    var rModelData2=rModel.oData.ABAP2
                } else if (deptName == 'SALESFORCE') {
                    var rModelData2=rModel.oData.SALESFORCE2
                } else if (deptName == 'HYBRIS') {
                    var rModelData2=rModel.oData.HYBRIS2
                }


                for(let i=0;i<rModelData.length;i++){
                    if(loginName!=rModelData[i].name){
                        // count++;
                        // spliceIndex=i
                        // rModelData.slice(spliceIndex,1)
                        rModelData2.push(rModelData[i])
                    }
                    
                }
                rModel.refresh(true)







                  
                var requestModel=this.getView().getModel("requestData")
                var requestModelData=requestModel.oData
                var uiLength=requestModel.oData.UI5.length
                var abapLength=requestModel.oData.ABAP.length
                var salesLength=requestModel.oData.SALESFORCE.length
                var hybLength=requestModel.oData.HYBRIS.length
                var idNotify=this.getView().byId('notify')
                if(deptName=='UI5'){
                    idNotify.setProperty("value", uiLength)
                }else if(deptName=='ABAP'){
                    idNotify.setProperty("value", abapLength)
                }else if(deptName=='SALESFORCE'){
                    idNotify.setProperty("value", salesLength)
                }else if(deptName=='HYBRIS'){
                    idNotify.setProperty("value", hybLength)
                }


            },
            onPress222: function (oEvent) {
                debugger
                var f = this.getView().byId('hhh')
                f.setSize('40%')
                var s = this.getView().byId('empForm')
                var sPath = oEvent.getParameter("listItem").getBindingContextPath()
                s.bindElement('requestData>' + sPath)
            },
            onEmpLogout: function () {
                debugger
                this.getOwnerComponent().getRouter().navTo('RouteLogin')
                var oModel = this.getView().getModel('loginData')
                var ologdata = oModel.oData.EMPDETAIL
                ologdata.splice(0, 1)
                oModel.refresh(true)
                oModel.setData(oModel, ologdata)
                sap.ui.getCore().setModel(oModel)
                var rModel=this.getView().getModel('requestData')
                if(deptName=='UI5'){
                    rModel.oData.UI52=[]
                }else if(deptName=='ABAP'){
                    rModel.oData.ABAP2=[]
                }else if(deptName=='SALESFORCE'){
                    rModel.oData.SALESFORCE2=[]
                }else if(deptName=='HYBRIS'){
                    rModel.oData.HYBRIS2=[]
                }
                
            },
            profilePopup: null,
            userProfile: function () {
                debugger
                if (!this.profilePopup) {
                    debugger
                    this.profilePopup = new sap.ui.xmlfragment("uiapp.project1.fragments.profile", this)
                    this.profilePopup.setTitle("Your profile")
                    this.getView().addDependent(this.profilePopup);
                    this.profilePopup.open()

                }
            },
            profileCancel: function () {
                debugger
                this.profilePopup.close()
                this.profilePopup.destroy(true);
                this.profilePopup = null
            },
            reViewPopUp2: null,
            onPressReview: function () {
                debugger

                if (!this.reViewPopUp2) {
                    debugger
                    this.reViewPopUp2 = new sap.ui.xmlfragment("uiapp.project1.fragments.reView2", this)
                    // this.reViewPopUp.setTitle("Your profile")
                    this.getView().addDependent(this.reViewPopUp2);
                    this.reViewPopUp2.open()
                }
                else {
                    this.reViewPopUp2.open()

                }

            },
            reViewCancel: function () {
                debugger
                this.reViewPopUp2.close()
                this.reViewPopUp2.destroy(true);
                this.reViewPopUp2 = null
            },
            liveUpdate: function (oEvent) {
                debugger
                var mock = sap.ui.getCore().byId("rMock")
                var rate = sap.ui.getCore().byId("rRatingId")
                var skill = sap.ui.getCore().byId("rSkillId")
                var senior = sap.ui.getCore().byId("rSeniorId")
                var junior = sap.ui.getCore().byId("rJuniorId")
                var tech = sap.ui.getCore().byId("rTechId")
                var code = sap.ui.getCore().byId("rCodeId")

                var rateValue = rate.getValue()
                var skillValue = skill.getValue()
                var seniouValue = senior.getValue()
                var juniorValue = junior.getValue()
                var techValue = tech.getValue()
                var codeValue = code.getValue()

                var avg2 = (rateValue + skillValue + seniouValue + juniorValue + techValue + codeValue) / 6
                var avg=Math.floor(avg2)
                MessageToast.show(avg)


                var oView = sap.ui.getCore().byId('overView')
                oView.setText(avg)

            },
            onReviewSave: function () {
                debugger
                var mock = sap.ui.getCore().byId("rMock")
                var rate = sap.ui.getCore().byId("rRatingId")
                var skill = sap.ui.getCore().byId("rSkillId")
                var senior = sap.ui.getCore().byId("rSeniorId")
                var junior = sap.ui.getCore().byId("rJuniorId")
                var tech = sap.ui.getCore().byId("rTechId")
                var code = sap.ui.getCore().byId("rCodeId")
                var fBack = sap.ui.getCore().byId("rFeedBack")

                var mockValue = mock.mProperties.selectedKey
                var rateValue = rate.getValue()
                var skillValue = skill.getValue()
                var seniouValue = senior.getValue()
                var juniorValue = junior.getValue()
                var techValue = tech.getValue()
                var codeValue = code.getValue()
                var fBackValue = fBack.getValue()
                var index2;
                var avg2 = (rateValue + skillValue + seniouValue + juniorValue + techValue + codeValue) / 6
                var avg=Math.floor(avg2)
                var date=new Date()
                var year=date.getFullYear()
                var month=date.getMonth()
                var day=date.getDate()
                var rDate=day+"/"+month+"/"+year
                var reviewrName=this.getView().getModel('loginData').oData.EMPDETAIL[0].name
                var reviewrId=this.getView().getModel('loginData').oData.EMPDETAIL[0].empId
                var empName = this.getView().byId('rEmp').getValue()
                var orgModel = this.getView().getModel('empData')
                var overModel=this.getView().getModel('overView')
                var overModel2=this.getView().getModel('overView2')
                var requestData=this.getView().getModel('requestData')
                var nModel=this.getView().getModel("requestData")
                var idNotify=this.getView().byId('notify')
                var empDlt=this.getView().byId('empForm').mObjectBindingInfos.requestData.path
                var orgData = orgModel.oData
                var rr = Object.keys(orgData)
                var reviewObject={
                    "mockType":mockValue,
                    "mockrating":avg,
                    "rDate":rDate,
                    "reviewName":reviewrName,
                    "reviewrId":reviewrId,
                    "feedBack":fBackValue
                }

                debugger
                if (deptName == "UI5") {
                    for (let j = 0; j < orgData.UI5.length; j++) {
                        if (empName == orgData.UI5[j].name) {
                            index2=j
                        }
                    }
                } else if (deptName == "ABAP") {
                    for (let j = 0; j < orgData.ABAP.length; j++) {
                        if (empName == orgData.ABAP[j].name) {
                            index2=j
                        }
                    }
                } else if (deptName == "SALESFORCE") {
                    for (let j = 0; j < orgData.SALESFORCE.length; j++) {
                        if (empName == orgData.SALESFORCE[j].name) {
                            index2=j
                        }
                    }
                }
                else if (deptName == "HYBRIS") {
                    for (let j = 0; j < orgData.HYBRIS.length; j++) {
                        if (empName == orgData.HYBRIS[j].name) {
                            index2=j
                        }
                    }
                }
                
                
                if(mockValue=="" && fBackValue==""){
                    mock.setValueState('Error')
                    mock.setValueStateText('Select Typeof Mock')

                    fBack.setValueState('Error')
                    fBack.setValueStateText('Please Give Feedback')
                }else if(mockValue=="" && fBackValue==""){
                    if(mockValue==""){
                        mock.setValueState('Error')
                        mock.setValueStateText('Select Typeof Mock')
                    }else if(fBackValue==""){
                        fBack.setValueState('Error')
                        fBack.setValueStateText('Please Give Feedback')
                    }
                }else if(rateValue=="" && skillValue=="" && seniouValue=="" && juniorValue=="" && techValue=="" && codeValue==""){
                    MessageBox.confirm('ALl THE RATINGS ARE ZERO WOULD YOU LIKE TO CONTINUE',{
                        title: "Confirmation",
                            onClose: function(oAction) {
                                if (oAction === sap.m.MessageBox.Action.OK) {
                                    debugger
                                        if(deptName=='UI5'){
                                            var reviewArray=orgData.UI5[index2].empReview
                                        }else if(deptName=='ABAP'){
                                            var reviewArray=orgData.ABAP[index2].empReview
                                        }else if(deptName=='SALESFORCE'){
                                            var reviewArray=orgData.SALESFORCE[index2].empReview
                                        }else if(deptName=='HYBRIS'){
                                            var reviewArray=orgData.HYBRIS[index2].empReview
                        
                                        }
                                        reviewArray.push(reviewObject)
                                        debugger
                                        orgModel.refresh(true)
                                        orgModel.setData(orgModel,reviewArray)
                                        sap.ui.getCore().setModel(orgModel)
                                        debugger
                                        
                                       debugger
                                        let overObject={
                                            "name":empName,
                                            "mock":avg,
                                            "mockType":mockValue,
                                            "rDate":rDate,
                                            "reviewName":reviewrName,
                                            "reviewrId":reviewrId,
                                            "feedBack":fBackValue
                                        }
                                        
                                        var overData=overModel.oData
                        
                                        if(deptName=="UI5"){
                                            var overData2=overData.UI5
                                        }else if(deptName=="ABAP"){
                                            var overData2=overData.ABAP
                                        }else if(deptName=='SALESFORCE'){
                                            var overData2=overData.SALESFORCE
                                        }else if(deptName=='HYBRIS'){
                                            var overData2=overData.HYBRIS
                                        }
                                        overData2.push(overObject)
                                        overModel.refresh(true)
                                        overModel.setData(overData2,overData)
                                        sap.ui.getCore().setModel(overModel)
                                        
                                        
                                        var overModel2Data=overModel2.oData
                                        var overModel2All=overModel2Data.ALL
                                        overModel2All.push(overObject)
                                        overModel.refresh(true)
                                        overModel.setData(overModel2All,overModel2Data)
                                        sap.ui.getCore().setModel(overModel2)
                                        debugger
                                       
                                        var empDlt2=empDlt.split('/')[empDlt.split('/').length-1]
                                       
                                        // var requestData2=requestData.oData
                                        // if(deptName=="UI5"){
                                        //     var requestData3=requestData2.UI5
                                        // }else if(deptName=="ABAP"){
                                        //     var requestData3=requestData2.ABAP
                                        // }else if(deptName=="SALESFORCE"){
                                        //     var requestData3=requestData2.SALESFORCE
                                        // }else if(deptName=="HYBRIS"){
                                        //     var requestData3=requestData2.HYBRIS
                                        // }
                                        // for(let i=0;i<requestData3.length;i++){
                                        //     if(requestData3[i].name==empName){
                                        //         requestData3.splice(i,1)

                                        //     }
                                        // }
                                        // requestData.setData(requestData)
                                        // sap.ui.getCore().setModel(requestData)
                                        
                                                        
                                          
                                        var requestModelData=nModel.oData
                                        var uiLength=requestModelData.UI5.length
                                        var abapLength=requestModelData.ABAP.length
                                        var salesLength=requestModelData.SALESFORCE.length
                                        var hybLength=requestModelData.HYBRIS.length
                                       
                                       
                                        if(deptName=='UI5'){
                                            idNotify.setProperty("value", uiLength)
                                        }else if(deptName=='ABAP'){
                                            idNotify.setProperty("value", abapLength)
                                        }else if(deptName=='SALESFORCE'){
                                            idNotify.setProperty("value", salesLength)
                                        }else if(deptName=='HYBRIS'){
                                            idNotify.setProperty("value", hybLength)
                                        }
                                        

                                        if(deptName=='UI5'){
                                            var a=requestData.oData.UI52
                                        }else if(deptName=='ABAP'){
                                            var a=requestData.oData.ABAP2
                                        }else if(deptName=='SALESFORCE'){
                                            var a=requestData.oData.SALESFORCE2
                                        }else if(deptName=='HYBRIS'){
                                            var a=requestData.oData.SALESFORCE2
                                        }
                                        for(let i=0;i<a.length;i++){
                                            if(a[i].name==empName){
                                                a.splice(i,1)
                                            }
                                        }
                                        requestData.refresh(true)
                                        requestData.setData(a,requestData)
                                        sap.ui.getCore().setModel(requestData)
                                        MessageToast.show("REVIEW SENT")
                                
                                } else {
                                MessageBox.show('ENTER ALL THE DETAILS')
                }
            }
                    })
                                this.reViewPopUp2.close()
                                        this.reViewPopUp2.destroy(true);
                                        this.reViewPopUp2 = null
                }else{
                    if(deptName=='UI5'){
                        var reviewArray=orgData.UI5[index2].empReview
                    }else if(deptName=='ABAP'){
                        var reviewArray=orgData.ABAP[index2].empReview
                    }else if(deptName=='SALESFORCE'){
                        var reviewArray=orgData.SALESFORCE[index2].empReview
                    }else if(deptName=='HYBRIS'){
                        var reviewArray=orgData.HYBRIS[index2].empReview
    
                    }
                    reviewArray.push(reviewObject)
                    debugger
                    orgModel.refresh(true)
                    orgModel.setData(orgModel,reviewArray)
                    sap.ui.getCore().setModel(orgModel)
                    debugger
                    
                   debugger
                    let overObject={
                        "name":empName,
                        "mock":avg,
                        "mockType":mockValue,
                        "rDate":rDate,
                        "reviewName":reviewrName,
                        "reviewrId":reviewrId,
                        "feedBack":fBackValue
                    }
                    
                    var overData=overModel.oData
    
                    if(deptName=="UI5"){
                        var overData2=overData.UI5
                    }else if(deptName=="ABAP"){
                        var overData2=overData.ABAP
                    }else if(deptName=='SALESFORCE'){
                        var overData2=overData.SALESFORCE
                    }else if(deptName=='HYBRIS'){
                        var overData2=overData.HYBRIS
                    }
                    overData2.push(overObject)
                    overModel.refresh(true)
                    overModel.setData(overData2,overData)
                    sap.ui.getCore().setModel(overModel)
                    
                    
                    var overModel2Data=overModel2.oData
                    var overModel2All=overModel2Data.ALL
                    overModel2All.push(overObject)
                    overModel.refresh(true)
                    overModel.setData(overModel2All,overModel2Data)
                    sap.ui.getCore().setModel(overModel2)
                    debugger
                   
                    var empDlt2=empDlt.split('/')[empDlt.split('/').length-1]
                   
                    var requestData2=requestData.oData
                    if(deptName=="UI5"){
                        var requestData3=requestData2.UI5
                    }else if(deptName=="ABAP"){
                        var requestData3=requestData2.ABAP
                    }else if(deptName=="SALESFORCE"){
                        var requestData3=requestData2.SALESFORCE
                    }else if(deptName=="HYBRIS"){
                        var requestData3=requestData2.HYBRIS
                    }
                    for(let i=0;i<requestData3.length;i++){
                        if(requestData3[i].name==empName){
                            requestData3.splice(i,1)

                        }
                    }
                    
                    requestData.setData(requestData,requestData2)
                    sap.ui.getCore().setModel(requestData)
                    if(deptName=='UI5'){
                        var a=requestData.oData.UI52
                    }else if(deptName=='ABAP'){
                        var a=requestData.oData.ABAP2
                    }else if(deptName=='SALESFORCE'){
                        var a=requestData.oData.SALESFORCE2
                    }else if(deptName=='HYBRIS'){
                        var a=requestData.oData.SALESFORCE2
                    }
                    for(let i=0;i<a.length;i++){
                        if(a[i].name==empName){
                            a.splice(i,1)
                        }
                    }
                    requestData.refresh(true)
                    requestData.setData(a,requestData)
                    sap.ui.getCore().setModel(requestData)
                    
                    var requestModelData=nModel.oData
                    var uiLength=nModel.oData.UI5.length
                    var abapLength=nModel.oData.ABAP.length
                    var salesLength=nModel.oData.SALESFORCE.length
                    var hybLength=nModel.oData.HYBRIS.length
                   
                    if(deptName=='UI5'){
                        idNotify.setProperty("value", uiLength)
                    }else if(deptName=='ABAP'){
                        idNotify.setProperty("value", abapLength)
                    }else if(deptName=='SALESFORCE'){
                        idNotify.setProperty("value", salesLength)
                    }else if(deptName=='HYBRIS'){
                        idNotify.setProperty("value", hybLength)
                    }
                    
                    MessageToast.show("REVIEW SENT")
                    this.reViewPopUp2.close()
                    this.reViewPopUp2.destroy(true);
                    this.reViewPopUp2 = null
            
                }



            //     
            }
        });
    });