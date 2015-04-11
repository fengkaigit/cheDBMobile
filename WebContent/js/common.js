//alert("location:"+window.location);
//alert("href: "+window.location.href);
//alert("protocol: "+window.location.protocol);
//alert("host&port: "+window.location.host);
//alert("port: "+window.location.port);
//alert("hostname: "+window.location.hostname);
//gloabObj.serverUrl = window.location.protocol+"//"+window.location.hostname+":8088/SpringMVC";
function onTargetPage(pageName, trans,reverse) {
	$.mobile.changePage(pageName, {
		transition : trans,
		reverse : reverse
	});
}
function ajaxGet(url,fun){
	if(url.indexOf("?")>-1)
		url = url + "&callback=?";
		else
		url = url + "?callback=?";
    url = window.localStorage.serverUrl + url;
   
	$.getJSON(url, function(data) {
		fun(data);
	});
}
function ajaxPost(url,fun,async,paramObj){
    url = window.localStorage.serverUrl + url;
	$.ajax({
	    type : "POST",
	    url : url,
	    dataType : "jsonp",
	    async:async?async:true,
	    data:paramObj?paramObj:null,
	    jsonp: "callback",//服务端用于接收callback调用的function名的参数
	    jsonpCallback:"call",//callback的function名称
	    success : function(data){
	    	fun(data);
	    },
	    error:function(){
	        alert('fail');
	    }
	});
	
}
function showLoadMsg(){
	$.mobile.loadingMessageTextVisible = false;
	$.mobile.showPageLoadingMsg('a', "数据加载中...");
	//$.mobile.showPageLoadingMsg();
}
function hideLoadMsg(){
	$.mobile.hidePageLoadingMsg();
}
function queryserviceByCarId(carId){
			var url = "chooseCar.do?appId="+window.localStorage.carName+"&carId="+carId;
			//var paramObj = {appId:window.localStorage.carName,carId:carId};
			ajaxGet(url,function(data){
				if(data=="success"){
					var classId = sessionStorage.classId;
					if(classId=="04"){
						onTargetPage('cartyre.html',"slide",false);
					}
					if(classId=="03"){
						onTargetPage('carrepaire.html',"slide",false);
					
					}
					if(classId=="02"){
						onTargetPage("carmaintains.html","slide",false);
					}
				}else{
					alert("添加信息不成功！");
				}
			});
		
}