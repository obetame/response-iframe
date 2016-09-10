/*
id在不同情况下代表不同的意思
1.如果option中参数hasIframe等于true,那么id为那个已经存在iframe的id.
2.如果option中参数hasIframe等于false,那么id为新iframe需要挂载的地方
*/
function responseIframe(id,url,option){
	if(typeof id==="undefined" || typeof url==="undefined"){
		console.error("responseIframe need id and url");
		return;
	}

	var iframe = {
		element:"",
		option:{},
		changeAttr:function(attr,value){
			this.element[attr] = value;
		},
	};
	var body = document.querySelector("body");

	// 设置元素src
	function setUrl(element,newUrl){
		element.setAttribute("src",newUrl);
	}

	// 设置其他属性
	function setAttr(iframe,attrArray){
		for(var i=0;i<attrArray.length;i++){
			iframe.element.setAttribute(attrArray[i],iframe.option[attrArray[i]]);
		}
	}

	if(typeof option!=="undefined"){
		// 是否已经有了自己的iframe
		iframe.option.hasIframe = option.hasIframe?true:false;
		iframe.option.name = option.name?option.name:"responseIframe";
		iframe.option.width = option.width?option.width:"100%";
		iframe.option.height = option.height?option.height:"100%";
		iframe.option.frameborder = option.frameborder?option.frameborder:"0";
		iframe.option.sameDomain = option.sameDomain?true:false;
		iframe.option.body = option.body?true:false;
	}
	else{
		// 否则默认创建一个新的iframe
		iframe.option.hasIframe = false;
		iframe.option.name = "responseIframe";
		iframe.option.width = "100%";
		iframe.option.height = "100%";
		iframe.option.frameborder = "0";
		iframe.option.sameDomain = false;
		iframe.option.body = true;
	}

	// 开始搭建一个iframe
	if(iframe.option.hasIframe){
		// 已经有一个iframe
		iframe.element = document.querySelector(id);
	}
	else{
		// 新建一个
		iframe.element = document.createElement("iframe");
	}

	setUrl(iframe.element,url);
	setAttr(iframe,["name","width","height","frameborder"]);

	body.style.height = "100%";
	body.style.width = "100%";
	body.style.position = "absolute";
	body.style.overflowY = iframe.option.body?"hidden":"scroll";
	body.style.overflowX = "hidden";
	
	if(iframe.option.hasIframe){
		// 有自己的框架
		iframe.element = document.querySelector(id);
	}
	else{
		// 将创建的iframe挂载到id上
		document.querySelector(id).style.height = "100%";
		document.querySelector(id).appendChild(iframe.element);
	}

	iframe.element.addEventListener("load",function(){
		if(typeof iframe.option.sameDomain!=="undefined" && iframe.option.sameDomain){
			iframe.element.height = iframe.element.contentWindow.document.body.offsetHeight;
		}
	});

	return iframe;
}