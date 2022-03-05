import { AuthProvider } from './../../providers/auth/auth';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-select-country',
  templateUrl: 'select-country.html',
})
export class SelectCountryPage {
  @ViewChild('searchinput') searchinput;
  countrylist = [];
  searchList = [];
  selected_country=[];
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCountryPage');
    this.countrylist = this.navParams.get('countries');
    this.searchList = Object.assign([], this.countrylist);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      let m: any = document.getElementsByClassName('searchbar-input');
      if (m[0]) {
        m[0].focus();
      }
    }, 500)
  }


  getItems(val) {
    if (val) {
      this.searchList = this.countrylist.filter(a => {
        if (!a.name) return false;
        return a.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
      // this.selected_country=this.searchList.filter((item) =>{return item.is_check;});
    }
    else {
      this.searchList = Object.assign([], this.countrylist);
      // this.selected_country=this.searchList.filter((item) =>{return item.is_check;});
    }
  }

  select(ev:any,c:any,inx:any) {
    // for(let i=0;this.searchList.length;i++){
      // if(i==inx&&ev.value){
      //   // this.searchList[inx].is_check=true;
      // } else {
      //   //this.searchList[i].is_check=false;
      // }
    // }
    this.selected_country=this.searchList.filter((item) =>{return item.is_check;});
  }

  done() {
    // if(this.selected_country.length>0){
      this.viewCtrl.dismiss(this.selected_country);
    // }
  }

}
