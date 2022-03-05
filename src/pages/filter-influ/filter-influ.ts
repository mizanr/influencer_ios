import { AuthProvider } from './../../providers/auth/auth';

import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
@IonicPage()

@Component({
  selector: 'page-filter-influ',
  templateUrl: 'filter-influ.html',
})
export class FilterInfluPage {
  // filter:any= {
  //   country_show:[],
  // };

  filter:any = {
    name: '',
    country: [],
    "country_show": [],
    category: [],
    reviews: '',
    age: '',
    gender: '',
    post_type:[],
    is_filter:false,
  }

  countries: any;
  categories: any = [];
  services: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public api: RestApiProvider,
    public auth:AuthProvider) {
    this.getCategory();
    this.filter = this.navParams.get('Filter');
  }


  ionViewWillEnter() {
    this.get_service();
  }

  openModal() {
    let modal = this.api.modalCtrl.create('SelectCountryPage', { countries: this.countries });
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.filter.country=[];
        this.filter.country_show=[];
        console.log(data);
        for(let i=0;i<data.length;i++){
          if(this.filter.country_show){
          this.filter.country_show.push(data[i].nicename);
        }
        else {
          this.filter['country_show']=[data[i].nicename];
        }
          this.filter.country.push(data[i].id);
        }
        // if(this.filter.country_show){
        //   this.filter.country_show.push(data.nicename);
        // }
        // else {
        //   this.filter['country_show']=[data.nicename];
        // }
        //console.log('filter country array---',this.filter.country_show);

        // this.filter.country.nicename = data.nicename;
        
        // this.filter.country.push(data.id);
      }
    });
    modal.present();
  }

  getCategory() {
    let data = {
    }
    this.api.postData(data, 0, 'category').then((res: any) => {
      if (res.status == 1) {
        this.categories = res.data;
        this.getCodes();
      }
      else {
      }
    })
  }


  get_service() {
    this.api.get({},0,'getService').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.services=res.data;
      }
    })
  }



  getCodes() {
    let data = {
      // "email": { "value": this.formData.email, "type": "NO" },
    };
    this.api.get(data, 0, 'country').then((result: any) => {
      if (result.status == "0") {
        // this.alertP.show("", result.message);
      } else {
        this.countries = result.data;
        // this.getDeviceCountry()
        // let k = this.countries.filter(a => {
        //   if (a.id == 226) {
        //     return a;
        //   }
        // });
        // console.log(k);
        // this.formData.country_code = k[0].phonecode;
        // this.formData.countryFlag = k[0].image;
      }
    }, (err) => {
    });
  }

  reset() {
    this.filter = {
      name: '',
      country: [],
      category: [],
      reviews: '',
      age: '',
      gender: '',
      post_type:[],
      is_filter:false,
    }
    this.viewCtrl.dismiss(this.filter);
  }

  type_change() {
    console.log(this.filter.post_type);
  }

  cate_change() {
    console.log(this.filter.category);
  }

  remove_country(c,inx) {
    this.filter.country.splice(inx,1);
    this.filter.country_show.splice(inx,1);
  }

  apply(){
    this.filter['is_filter']=true;
    this.viewCtrl.dismiss(this.filter);
  }

}
