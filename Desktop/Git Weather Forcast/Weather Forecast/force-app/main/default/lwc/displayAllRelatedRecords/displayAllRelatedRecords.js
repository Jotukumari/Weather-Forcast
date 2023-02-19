import { LightningElement,track,wire } from 'lwc';
import retrieveContactData from '@salesforce/apex/fetchRelatedRecords.retrieveContact';

export default class DisplayAllRelatedRecords extends LightningElement {
    @track currentName;
@track searchName;
handleChangeAccName(event){
this.currentAccountName = event.target.value;
}
handleAccountSearch(){
this.searchName = this.currentName;
}
@track records;
@track dataNotFound;
@wire (retrieveContactData,{keySearch:this.searchName})
wireRecord({data,error}){
if(data){
this.records = data;
this.error = undefined;
this.dataNotFound = '';
if(this.records == ''){
this.dataNotFound = 'There is no Contact found related to Account name';
}
}else{
this.error = error;
this.data=undefined;
}
}
}