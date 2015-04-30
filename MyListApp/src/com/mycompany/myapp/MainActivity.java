package com.mycompany.myapp;

//import android.app.Activity;
import android.app.ListActivity;
import android.app.*;
//import android.content.Context;
import android.os.*;
import android.view.*;
import android.widget.*;
import android.widget.ListView;
import java.util.ArrayList;
import java.util.Scanner;
import java.io.*;
import java.io.InputStream;
import java.io.File;
import java.io.FileNotFoundException;

public class MainActivity extends ListActivity
{
    //public int selectedItemNo = -1;
	//String[] dataArr;
	ArrayList dataStack; 
	ArrayList <DataMag> magStack;
	
	/** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState)
	{
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.main);
		//  int level
		dataStack = new ArrayList();
		magStack = new ArrayList<DataMag>();
		
		try {	
		  setListAdapter(new ArrayAdapter<String>(this, R.layout.list_fruit,getAssetData()));
		} catch (IOException e) {}
		ListView listView = getListView();
		listView.setTextFilterEnabled(true);
		
	}
	
	@Override
	protected void onListItemClick(ListView l, View v, int position, long id) {
		int selectedItemNo= magStack.get(magStack.size()-1).selectedRow;
		if (selectedItemNo<0){
			//get int magStack 
			//String selectedValue = (String) getListAdapter().getItem(position);
			//Toast.makeText(this, selectedValue, Toast.LENGTH_SHORT).show();
			setListAdapter(new ArrayAdapter<String>(this, R.layout.list_fruit,getDetails(position)));
			magStack.get(magStack.size()-1).selectedRow = position;
		} else if (isFieldType(position,"link1")) {
				try {	
					setListAdapter(new ArrayAdapter<String>(this, R.layout.list_fruit,getListData(position)));
				} catch (IOException e) {}
				//Toast.makeText(this, "linking to ", Toast.LENGTH_SHORT).show();
		} else
				Toast.makeText(this, "not allowed ", Toast.LENGTH_SHORT).show();
	}
	
	@Override 
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		//custom override method to handle hard buttons

	    switch (keyCode) {
			case KeyEvent.KEYCODE_MENU:
				{
					//allow default action
					break;
				}
			case KeyEvent.KEYCODE_BACK:
				{
					int selectedItemNo= magStack.get(magStack.size()-1).selectedRow;
					if (selectedItemNo>=0)	{ //
						magStack.get(magStack.size()-1).selectedRow=-1;
						showMasterLevel();
						return true;  //hijack  
					} else{
						int msz=magStack.size();
						int dsz=dataStack.size();
						if (dsz>1) {
							dataStack.remove(dsz-1);
						}
						if (msz>1) {
							magStack.remove(msz-1);
							showMasterLevel();
							return true;
						}
					}
					break;
				} //case   
	    } //switch
	    return super.onKeyDown(keyCode, event);
	}
	
	////////////////////////
	//control methods 
	private void  showAnyLevel(){
		int selNo=magStack.get(magStack.size()-1).selectedRow;
		Toast.makeText(this, "selNo "+selNo , Toast.LENGTH_SHORT).show();
		try {
			setListAdapter(new ArrayAdapter<String>(this, R.layout.list_fruit,
				(selNo<0)? getAssetData():getDetails(selNo)));
		} catch (IOException e) {}
	}
	
	private void  showMasterLevel(){
		showAnyLevel();
	}
	
	public boolean isFieldType(int position, String fType){
		String[] dataArr=getDataArr();
		String[] at=dataArr[0].split(",")[position].split(":");
		for (int i=1; i<at.length; i++)
			if ((fType.equals(at[i])) && (i>0))
				return true;
		return false;
	} //
	
	/////////////////////
	//data methods
	public String[] getDataArr()
	{
		int nz= magStack.size()-1;
		return	((DataMag)magStack.get(nz)).rows;
	}//
	
	public String[] getDetails(int position)
	{	//Details  
		String[] dataArr= getDataArr();	
		String[] nameArr= dataArr[0].split(",");
		String[] valArr= dataArr[position+1].split(",");
		for (int i=0; i<nameArr.length; i++)
			nameArr[i]= nameArr[i].split(":")[0]+": "+
				((i<valArr.length)? valArr[i]:"");
		return nameArr;
	}
	
	public String[] getDisplayArr()
	{	//Details d get 
		String[] dataArr= getDataArr();
		String[] namesArr=new String[dataArr.length-1];
		for (int i=1; i<dataArr.length; i++)
			namesArr[i-1]=dataArr[i].split(",")[0];
		return namesArr;
	}
	
	public String[] getListData(int position)
	throws IOException
	{ //
		int selectedItemNo= magStack.get(magStack.size()-1).selectedRow;
		String[] dataArr= getDataArr();		String[] afn=dataArr[selectedItemNo+1].split(",");
		//Toast.makeText(this, "afnlength "+afn.length, Toast.LENGTH_SHORT).show();
		if (afn.length>position) {
			String fn=afn[position];
			File ffi=Environment.getExternalStorageDirectory();
			Toast.makeText(this, "sdd "+ffi.getAbsolutePath()+fn, Toast.LENGTH_SHORT).show();
			
			//"file:///android_asset/data01.txt";
			ArrayList <String> names= new ArrayList <String>();
			Scanner scanner = new Scanner(new File(ffi.getAbsolutePath()+fn));
			Toast.makeText(this, "scanner "+scanner.hasNextLine(), Toast.LENGTH_SHORT).show();
			while (scanner.hasNextLine()){
				names.add(scanner.nextLine());
			}//DataMag 
			scanner.close();
			dataArr= names.toArray(new String[0]);
			magStack.add(new DataMag(dataArr));
		}
		//selectedItemNo = -1;
		return getDisplayArr();
	}
	
	public String[] getAssetData()
	throws IOException
	{
		if (magStack.size()>0){
			return getDisplayArr();
		}
		if (dataStack.size()>0){
			return getDisplayArr();
		}
		InputStream input = this.getAssets().open("data01.txt",1);
		int size = input.available();
		
		if (size>0){	
			// file
             byte[] buffer = new byte[size];
            input.read(buffer);
            input.close();
            String text = new String(buffer);
			magStack.add(new DataMag(text.split("\n")));
			return getDisplayArr();
		} 
		return getDisplayArr();
		//return names.toArray(new String[0]);//namesArr;
	}
}
