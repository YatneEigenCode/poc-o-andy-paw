package com.mycompany.myapp;

public class DataMag
{
	public String[] rows;
	public int selectedRow;
	//selected Dtring rows  this 
	public DataMag(String[] rows){
		this.rows = rows;
		this.selectedRow=-1;
	}
	
	public String[] getDetails()
	{
		return getDetails(selectedRow);
	}
	
	public String[] getDetails(int position)
	{	//Details i Asset return 
		selectedRow=position;
		String[] nameArr= rows[0].split(",");
		String[] valArr= rows[position+1].split(",");
		for (int i=0; i<nameArr.length; i++)
			nameArr[i]= nameArr[i].split(":")[0]+": "+
				((i<valArr.length)? valArr[i]:"");
		return nameArr;
	}
	
	public String[] getDisplayArr()
	{	//Details d get 
		String[] namesArr=new String[rows.length-1];
		for (int i=1; i<rows.length; i++)
			namesArr[i-1]=rows[i].split(",")[0];
		return namesArr;
	}
}
