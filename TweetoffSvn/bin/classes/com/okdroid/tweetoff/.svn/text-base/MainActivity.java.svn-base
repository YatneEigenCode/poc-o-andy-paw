/*
 * Copyright (C) 2013 JChoy
 * 5/2/2013 tweetoff
 * Write and save tweets offline for sending later when online.
 * A blank activity project with webview. 
 * Features implemented in HTML5 using sqlite db. 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.okdroid.tweetoff;

import com.okdroid.tweetoff.R;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.WebStorage;
import android.util.Log;
import android.content.Context;
import android.content.res.Configuration;
import android.webkit.JavascriptInterface;
import android.view.KeyEvent;
import android.os.Handler;
import java.util.Date;
import android.view.MenuItem;
import android.os.Vibrator;
import android.content.Intent;

public class MainActivity extends Activity {
	final Handler myHandler = new Handler();
	long lDateTime = -1;
	boolean isOnHomePage = true;
	boolean isBlockBackAction = false;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		//use custom-added webview with sqlite in mind.
		WebView myWebView = (WebView) findViewById(R.id.webview);
		WebSettings webSettings = myWebView.getSettings();
		webSettings.setJavaScriptEnabled(true);
		webSettings.setDatabaseEnabled(true);
		webSettings.setDomStorageEnabled(true);
		//webSettings.setDatabasePath("/data/data/"+myWebView.context.getPackageName()+"/databases/");
		webSettings.setDatabasePath("/data/data/com.okdroid.tweetoff/database/");
		Log.d("webview","webSettings done");

		//give js access to native thru pre-defined methods of exposed instance named "androidGate"
        webSettings.setLightTouchEnabled(true);
        myWebView.addJavascriptInterface(new JavaScriptGate(this), "androidGate");
        
        //remain in webview instead of opening in browser
        myWebView.setWebViewClient(new WebViewClient());
        
        //for html5 sqlite
		myWebView.setWebChromeClient( new WebChromeClient() {
			   @Override
			   public void onExceededDatabaseQuota(String url,
			                        String databaseIdentifier,
			                        long currentQuota,
			                        long estimatedSize,
			                        long totalUsedQuota,
			                        WebStorage.QuotaUpdater quotaUpdater)
			   {
			       quotaUpdater.updateQuota(estimatedSize * 2);
			   }
			});

		this.restartHomePage();
	}
		
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public void onConfigurationChanged(Configuration newConfig) {
	  super.onConfigurationChanged(newConfig);
	}

	//----------
	//user action responders
	//----------
	@Override 
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		//custom override method to handle hard buttons

	    switch (keyCode) {
        case KeyEvent.KEYCODE_MENU:
        {
            Log.d("key","menu down");
            //allow default action
            break;
        }
        case KeyEvent.KEYCODE_BACK:
        {
            Log.d("key","back down");
            if (!checkTouchTime())	{ //back x2 = ?
            	//finish();
            }
    		WebView myWebView = (WebView) findViewById(R.id.webview);
    		if (myWebView.canGoBack()) {
    			myWebView.goBack();
            	return true;	//this would hijack
            }
            if (isBlockBackAction){
        		myWebView.loadUrl("javascript:new ActionCard().closeAllActionCards()");
            	return true;	//this would hijack
            }
            //break;
	    } //case
	    } //switch
	    return super.onKeyDown(keyCode, event);
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		Log.d("menu item","options item");
		WebView myWV = (WebView) findViewById(R.id.webview);
	    switch (item.getItemId()) {
	    case R.id.action_exit_help:
        	android.os.Process.killProcess(android.os.Process.myPid());
	        return true;
	    case R.id.action_reload:
	    	this.restartHomePage();
	        return true;
	    case R.id.action_count:
			myWV.loadUrl("javascript:tweetoffApp.countData()");
	        return true;
	    case R.id.action_purge:
			myWV.loadUrl("javascript:tweetoffApp.purgeData()");
	        return true;
	    case R.id.action_command:
	        myWV.loadUrl("javascript:tweetoffApp.moreMenu()");
	        return true;
	    case R.id.action_showall:
	        myWV.loadUrl("javascript:tweetoffApp.scriptAction_showall()");
	        //Intent intent = new Intent(this, MainActivity.class);
	        //intent.putExtra("scriptAction", "showall");
	        //startActivity(intent);
	        return true;
	    }
	    return super.onOptionsItemSelected(item);
	}
	public boolean onContextItemSelected(MenuItem item) {
		Log.d("menu item","context item");
	    return super.onOptionsItemSelected(item);
	}
	public boolean onMenuItemSelected(MenuItem item) {
		Log.d("menu item","menu item");
	    return super.onOptionsItemSelected(item);
	}
	
	//-----custom methods
	public void restartHomePage(){
		//load html5 code wrapped inside this apk under assets

		WebView myWebView = (WebView) findViewById(R.id.webview);
		myWebView.clearView();
		myWebView.freeMemory();
		//myWebView.loadUrl("http://dl.dropboxusercontent.com/u/28448395/projects/geoWall/geowall.html");
		//myWebView.loadDataWithBaseURL("","Hello Webview<br><a href='file:///android_asset/tweetoff/tweetoff.html'>tweetoff</a>", "text/html", "utf-8", "");
		myWebView.loadUrl("file:///android_asset/tweetoff/tweetoff.html");
		Log.d("webview","restart home page");
		isOnHomePage = true;
		
		String sa= getIntent().getStringExtra("scriptAction");
		if ("showall".equalsIgnoreCase(sa))
			myWebView.setWebViewClient(
					new WebViewClient() {
						@Override  
						public void onPageFinished(WebView view, String url) {
							super.onPageFinished(view, url);
							view.loadUrl("javascript:tweetoffApp.intentMsg='showall'");
						}  
					}
			);
	}

	public boolean checkTouchTime(){
		if(lDateTime == -1)
		{
			lDateTime = new Date().getTime();
			return true;
		}
		
		long lDateCurrentTime = new Date().getTime();
		if(lDateCurrentTime - lDateTime > 900)
		{
			lDateTime = lDateCurrentTime;
			return true;
		}
		return false;
	}
	
	//----------
	//javascript programatic responders
	//inner class defines native methods exposed to js.
	//----------
    public class JavaScriptGate {
    	//see http://developer.android.com/guide/webapps/webview.html#BindingJavaScript
    	//see http://www.codeproject.com/Articles/392603/Android-addJavaScriptInterface
		Context mContext;

	    JavaScriptGate(Context c) {
	        mContext = c;
	    }
	    
	    //methad that js can call
	    @JavascriptInterface
	    public void logd(String webMessage){	    	
	    	Log.d("JS", webMessage);
	    }
	    @JavascriptInterface
	    public void fbPost(String webMessage){	    	
	    	Log.d("JS", "post to fb "+webMessage);
	    	isOnHomePage = false;
	    	actFbPost( webMessage );
	    }
	    @JavascriptInterface
	    public void vibrate(long durationMs){
	    	Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
	    	v.vibrate(durationMs);
	    }
	    @JavascriptInterface
	    public void setIsBlockBackAction(boolean val){
	    	isBlockBackAction = val;
	    }
	    @JavascriptInterface
	    public void sendJson(String json){
	    	Log.d("JS", "json: "+json);
	    }

	    //internal method that js CANNOT call
		private void actFbPost(String msg){
			final String escMsg = msg;
			String url= "https://www.facebook.com/sharer/sharer.php?"
					+"u=https://www.facebook.com/ZoobaloResource";
			final WebView myWebView = (WebView) findViewById(R.id.webview);
			//OnPageFinished - inject js
			myWebView.setWebViewClient(
					new WebViewClient() {
						@Override  
						public void onPageFinished(WebView view, String url) {
							super.onPageFinished(view, url);
							String jsurl= "javascript:"
								+"x=document.getElementsByTagName('textarea');"
								+"x[0].value=unescape('" + escMsg + "');false;";
							myWebView.loadUrl(jsurl);
						}  
					}
			);
			
			myWebView.loadUrl(url);
			Log.d("webview","fbPost: "+msg);
	    } //actFbPost
			
    } //class
}

