import { LightningElement, track, api,wire } from 'lwc';
import jk from '@salesforce/apex/wheatherController2.A';
import pk from '@salesforce/apex/wheatherController2.D';
import retrieveContactData from '@salesforce/apex/wheatherController2.B';
import retrieveContactData2 from '@salesforce/apex/wheatherController2.C';
import generatePDF from '@salesforce/apex/wheatherController.generatePDF';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const columns = [{ label: 'Region', fieldName: 'Region__c', type: 'text' },
{ label: 'City', fieldName: 'City__c' },
{ label: 'Country', fieldName: 'Country__c' },
{ label: 'Time Zone', fieldName: 'Time_Zone__c' },
{ label: 'Current Humidity', fieldName: 'Current_Humidity__c' },
{ label: 'Current Temperator', fieldName: 'Current_Temperator__c' },
{ label: 'Region', fieldName: 'Date__c' },
{ label: 'Image', fieldName: 'Pic__c' }]


export default class ThirdPartyApiWheather extends LightningElement {
    columns = columns;
    @track data = [];
    @api recordId;
    @track searchkey = '';

    @track value = 0;
    @track myval = [];
    @track forfilter;
    accountName='';
   @track dt='';

    
    @track accountList=[];
    
    update(){
        retervivedata({ keySearch:this.accountName })
          .then(data => {
            if(data){
                this.accountList=data;
            }
          })
          .catch(error => {
            console.error('Error:', error);
        });
    }
    handlekeyChange(event){
        this.accountName=event.target.value;

    }

    ///drop down
    @track l_All_Types;
    @track TypeOptions;

   /* dropdown(){
        pk()
          .then(data => {
            if(data){
            this.l_All_Types = data; 
                let options = [];
                 console.log
                for (var key in data) {
                    // Here key will have index of list of records starting from 0,1,2,....
                    options.push({ label: data[key].Name, value: data[key].Name  });
 
                    // Here Name and Id are fields from sObject list.
                }
                this.TypeOptions = options;
            }
          })
          .catch(error => {
            console.error('Error:', error);
        });
    }*/
 
    @wire (pk, {})
    WiredObjects_Type({ error, data }) {
 
        if (data) {
            try {
                this.l_All_Types = data; 
                let options = [];
                 
                for (var key in data) {
                    // Here key will have index of list of records starting from 0,1,2,....
                    options.push({ label: data[key].Name, value: data[key].Name  });
 
                    // Here Name and Id are fields from sObject list.
                }
                this.TypeOptions = options;
            } catch (error) {
                console.error('check error here', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }
 
    }
 
    handleTypeChange(event){
        this.forfilter = event.target.value; 
        // Do Something.
        window.alert('forfilter'+this.forfilter);
    }
    @track contacts='';
    @track selecteddatacoll=[];
    @track selecteddatacoll2=[];
    saveAsPdf(){
    	window.print();
	}

    handleAccountSearch(){
        retrieveContactData({keySearch:this.accountName})
        .then(result =>{
            this.selecteddatacoll2 = result;
            window.alert('result'+this.accountName);
        })
        .catch(error =>{
            this.errorMsg = error;
        })
            
        retrieveContactData2({keySearch:this.accountName,dat:this.forfilter})
        .then(result =>{
            this.selecteddatacoll = result;
            window.alert('result'+this.forfilter);
        })
        .catch(error =>{
            this.errorMsg = error;
        })
    }
    //generatePDF
    allowedFormats =  ['font', 'size', 'bold', 'italic', 'underline', 'strike',
    'list', 'indent', 'align', 'link', 'image', 'clean', 'table', 'header', 'color',
    'background','code','code-block'];

    //this method will display initial text
    get myVal() {
        return '**Generate PDF using LWC Component**';
    }

    attachment; //this will hold attachment reference

    /*This method extracts the html from input rich text 
        and pass this to apex class' method via implcit call
    */
    
    
    /*
        This method updates the selected text with defined format
    */
    handleClick() {
        const editor  = this.template.querySelector('th');
        const textToInsert = 'Journey to Salesforce'
        editor.setRangeText(textToInsert, undefined, undefined, 'select')
        editor.setFormat({bold: true, size:24, color: 'green', align: 'center',});
    }
    
    }
