//autolink.js
//5-31	jchoy	v1.341 AutoLink GtcqHandler
//6-1	*	v1.411 TweetoffImport
//6-1	*	v1.413 fix bug in TweetoffImport
//6-2	*	v1.414 use href instead innerHTML to pass data
//6-2	*	v1.416 Dropbox for cqtabulofl

function AutoLink(){
	this.schemes= [];
	this.handlerClasses= [];
	this.doClick= function(lnk){
		var at=this.getRegisteredSchemes();
		for (var i=0,at;i<at.length;i++)
		  if (lnk.innerHTML.indexOf(at[i])==0){
			//var clean= at[i].replace(/[^a-zA-Z0-9]/g,'');
			new (this.getSingleton().handlerClasses[i])(
				).start(lnk);
		  }
	}
	this.getSingleton= function(){
		if (!window["autoLinkSingleton"])
			autoLinkSingleton= new AutoLink();
		return autoLinkSingleton;
	}
	this.getRegisteredSchemes= function(){
		return this.getSingleton().schemes;
	}
	this.registerScheme= function(s,hc){
		this.getSingleton().schemes.push(s);
		this.getSingleton().handlerClasses.push(hc);
		return;
	}
	this.autolink= function(s){
		var res= s, at=this.getRegisteredSchemes();
		for (var i=0;i<at.length;i++)
			res= this.autolinkScheme(res,at[i]);
		return res;
	}
	this.linkDisplay= function(s,scheme){
		var title= unescape(new Ajaxo().cgi("title","",s));
		return (title)? (scheme+' ** '+title):s;
	}
	this.autolinkScheme= function(s,scheme){
		if (s.indexOf(scheme)<0) return s;
		var at=s.split("\n");
		for (var i=0; i<at.length; i++)
		  if (at[i].substring(0,scheme.length)==scheme){
			var pos= at[i].indexOf("?");
			var cq= (pos==-1)? "":at[i].substr(pos);
			at[i] = "<a href='#auto"+cq
				+"' onclick="
				+"'new AutoLink().doClick(this)'>"
				+this.linkDisplay(at[i],scheme)+"</a>";
		 }
		return at.join("\n");
	}
}

function RipHandler(){
	this.cqUrl="http://rip.okdaily.com/svc/amdisk/cq/"
}

function OkHandler(){
	this.cqUrl= "http://dl.dropboxusercontent.com/u/28448395/"
		+"okdaily/svc/amdisk/cq/";
}
function GtcqHandler(){
	this.constructor= OkHandler;
	this.constructor();
	//remap url
	this.start= function(lnk){
		this.url= lnk.href;
		var ms = new MoshiShare();
		ms.channel = "gaets_" 
			+new Ajaxo().cgi("gaets","",this.url);
		var ajax= ms.getAjax();
		ajax.write= new OOcallback(this,"webGot").fcn;
		ajax.webGet(ms.url.g);
	}
	this.webGot= function(s){
		var pos= s.indexOf("?");
		if (pos < 0) return;
		var url=this.cqUrl+"tabulofl.htm" +s.substr(pos);
		location= url;
	}
}
function CqtabHandler(){
	this.constructor= OkHandler;
	this.constructor();
	this.start= function(lnk){
		var url= lnk.href;
		var pos=url.indexOf("?");
		res= this.cqUrl+"tabulofl.htm"+(url).substr(pos);
		location= res;
	}
}
new AutoLink().registerScheme("http://gtcq.ok88.com/", GtcqHandler);
new AutoLink().registerScheme("http://cqtab.ok88.com/", CqtabHandler);


function AutoLink_TweetoffImport_Handler(){
	this.ajax= new Ajaxo();
	this.findApp= function(){
		return this.app = document.forms[0].master;
		//tweetoffApp
	}
	this.start= function(lnk){
		var uurl = (lnk.href).replace(/\&amp;/g,"&");
		this.app= this.findApp();
		for (var i=1,isMore=true; isMore; i++)
		  isMore= this.processRow(this.ajax.cgi("row"+i,"",uurl));
	}
	this.processRow= function(row){
		if (!row) return false;
		var at = unescape(row).split("^^");
		var id= parseInt(at[0]);
		this.importTweetoffRow(id, at[1]);
		return true;
	}
	this.importTweetoffRow= function(id,val){
		this.app.form.content.value=val;
		this.app.doHold(this.app.form);
	}
	this.findRowById= function(id){
		for (var i=0,at=this.app.outboxDisp; i<at.length; i++)
			if (at[i][0]==id)
				return at[i];
			//TODO: use sorted order
		return null;
	}
}
new AutoLink().registerScheme("http://tweetoff.okdaily.com/tweetoff/", 
		AutoLink_TweetoffImport_Handler);

/*-----
function OutboxTmpDb(){
	this.constructor= OutboxDb;
	this.constructor();
	this.dbapp.init("mgw_tmp","initMsgs");	
}
function AutoLink_CqView_Handler(){
	this.constructor= AutoLink_TweetoffImport_Handler;
	this.constructor();
	this.start= function(url){
		var uurl = url.replace(/\&amp;/g,"&");
		this.app= this.findApp();
		var res= new Array();
		for (var i=1,isMore=true; isMore; i++){
			var row= this.ajax.cgi("row"+i,"",uurl);
			if (row)
				res.push(unescape(row).split("?^^");
		}
		this.display(res);
	}
}
-----*/
