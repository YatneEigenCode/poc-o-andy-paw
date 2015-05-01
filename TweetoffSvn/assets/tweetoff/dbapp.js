//2-4-11 JChoy sqllite on iPhone
//2-26 JChoy dbName, firstSql
//3-9  JChoy dbsim
//3-17-2013 JChoy v1.113 adjust cfg for android
//5-8	*	v1.121 DbTableApp


function SqlDb(){
 var $=this;
 $.dbCfg= {name:'custom_sqlite',ver:'1.0',dispName:'ctmsql',max:1000000};
 $.openDb=function( name, ver, dispName, max ){
  var $=this;
  if (max) $.dbCfg= {name:name,ver:ver,dispName:dispName,max:max};
  $.db= openDatabase($.dbCfg.name,$.dbCfg.ver,$.dbCfg.dispName,$.dbCfg.max);
 }
 $.execParamSql=function(sql,aParms,callback){
  var fcn=function(txn){ txn.executeSql(sql,aParms,callback) };
  this.db.transaction( fcn );
 }
}
 
function DbApp(){
 this.version = "v1.113";
 var $=this;
 $.sql= {
   savePup:"INSERT INTO pups (name) VALUES (?);"
   ,getPups:"SELECT * FROM pups ORDER BY name ASC;"
   ,deletePups:"DELETE FROM pups;"
   ,initPups:"CREATE TABLE IF NOT EXISTS pups (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL);" 
 }
 $.init=function(dbName, firstSql){
  var $=this;
  $.sd= new SqlDb();
  if (dbName) $.sd.dbCfg.name= $.sd.dbCfg.dispName= dbName;
  $.sd.openDb();
  var sql1= (firstSql)? firstSql : 'initPups';
  if ( $.sql[sql1] )  $.sd.execParamSql( $.sql[sql1] );
  for (var m in $.sql) $[m+'Db']=
   new Function("parms","cb","this.dbAction('"+m+"',parms,cb)");
  //note: will call cb( transaction, results );
 }
 $.dbAction= function( methName, parms, cb ){
  this.sd.execParamSql( $.sql[methName], parms, cb );
 }
 $.enableOutput=function(cols,divName){
  var v=document.getElementById(divName), s;
  v.cols=cols; v.mas=this;
  s="v.innerHTML=v.mas.renderResultsTable(tx,rs,v.cols);";
  this['output_'+divName]=new Function("tx","rs",
   "var v=document.getElementById('"+divName+"'); "+s);
 }
 $.rsToArray= function(txn, rs, cols){
  var res=new Array();
  for (var i=0; i<rs.rows.length; i++)
   for (var j=0,a=res[i]=new Array(); j<cols.length; j++) 
    res[i][j]= rs.rows.item(i)[cols[j]];
  return res;
 }
 $.renderResultsTable= function(txn, rs, cols){
  var res="<table border=1>", at=this.rsToArray(txn, rs, cols);
  res+="<tr><th>"+cols.join("</th><th>")+"</th></tr>";
  for (var i=0,x=res=res+'</tr>'; i<at.length; i++)
   res+="<tr><td>"+at[i].join("</td><td>")+"</td></tr>";
  return res+"</table>";
 }
}

//extends DbApp to allow column definition for a single table
function DbTableApp(){
	this.constructor= DbApp;
	this.constructor();

	this.preserveSuperMethod= function(methNm){
		var sumena= "super_"+methNm;
		if (this[methNm]) 
		  this[this.preserveSuperMethod(sumena)]=this[methNm];
		return methNm;
	}

	this[this.preserveSuperMethod("init")]= 
	function(dbName, firstSql, colNames){
		this.sql= this.defineSqlStmts(dbName, colNames);
		this.super_init(dbName, firstSql);
		return this;
	}
	this.defineSqlStmts = function(name,aColNames){
		var ph,res = {};
		var tableName = "tbl_" + name.replace(/ /g,"_");
		for (var i=0,ph=[]; i<aColNames.length; i++) ph[i]='?';
		res.addItem= "INSERT INTO "+tableName+" ("
			+aColNames.join(",") +") VALUES ("
			+ph.join(",") + ");"
		res.saveItem= res.addItem;
		res.getItems="SELECT * FROM "+tableName+" ORDER BY id ASC;"
		res.getItem="SELECT * FROM "+tableName+" WHERE id=?;"
		res.deleteItem="DELETE FROM "+tableName+" WHERE id=?;"
		res.dropItem="DROP TABLE "+tableName+";"
		res.dropTable="DROP TABLE "+tableName+";"

		var s="CREATE TABLE IF NOT EXISTS "+tableName
			+" (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT";
		for (var i=0; i<aColNames.length; i++) 
			s+= ", "+aColNames[i]+" TEXT NULL";
		s+=");"
		res.initItems=s;
		res.initTable=s;
		return res;
	}
}

//-----dbsim
function DbSim() {
 //--simulate a (dummy) client side sqlite
 //-- $.db= openDatabase($.dbCfg.name,$.dbCfg.ver,$.dbCfg.dispName,$.dbCfg.max)
 //-- $.db= new DbSim( ['id','name'] );
 this.setDummy= function( num, dcn ){
	this.colNames= dcn;
	this.numDummyRows= num;
 }
 this.transaction=function( fcn ){
	fcn( this );
 }
 this.executeSql=function( sql, aParms, callback ){
	var rs = {};
	rs.rows= {item:this.dummyRow, length: this.numDummyRows, colNames:this.colNames };
	if (callback) callback( this, rs );
 }
 this.dummyRow= function(i){
  var res={}
  for (var j=0,cn=this.colNames; j<cn.length; j++)
   res[j]= res[cn[j]]= cn[j]+'_'+i;
  return res;
 }
 this.fakeOpenDatabase= function(){
	var res= new DbSim();
	res.setDummy( 5, ['id','name'] );
	return res;
 }
}

if (!window['openDatabase']) openDatabase= (new DbSim()).fakeOpenDatabase;