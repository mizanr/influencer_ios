import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { Component } from '@angular/core';
import { ActionSheetController, ModalController, NavController, NavParams, IonicPage } from 'ionic-angular';
import { RatePopupPage } from '../rate-popup/rate-popup';

@IonicPage()
@Component({
  selector: 'page-influencer-profile',
  templateUrl: 'influencer-profile.html',
})
export class InfluencerProfilePage {
  grown: string = "Profile";
  public buttonClicked: boolean = false;
  inFluId: any = '';
  profile: any = '';
  images: any = [];
  noImages = false;
  services: any = [];
  noData = false;
  postId: any = '';
  appliedJobList = [];
  noAppliedData = false;
  ratings:any = new Array();
  all_ratings:any = new Array();
  filter_counts:any=new Array();
  rate_status:any;

  public ngIfCtrl() {

    this.buttonClicked = !this.buttonClicked;
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public api: RestApiProvider,
    public auth: AuthProvider,
    public alert: AlertProvider,
    public iab: InAppBrowser,
    public actionSheetCtrl: ActionSheetController,
    public trans: TranslateService) {
      this.grown=this.auth.influ_tab_type || 'Profile';
  }

  ionViewWillEnter() {
    if (this.navParams.get('InfluId')) {
      this.inFluId = this.navParams.get('InfluId');
    } else {
      this.inFluId = this.auth.isUserLoggedIn()?this.auth.getCurrentUserId():this.auth.guest_id();
    }
    this.postId = this.navParams.get('PostId');
    if (this.postId) {
      this.grown = 'Service';
    }
    this.getProfile();
  }

  getProfile() {
    let data = {
      "id": this.inFluId,
      "sessionId":this.auth.isUserLoggedIn()?this.auth.getCurrentUserId():this.auth.guest_id()
    }
    this.api.get(data, 1, 'GetUserProfile').then((res: any) => {
      this.getImages();
      if (res.status == 1) {

        this.filter_counts=res.filter_count;
        this.rate_status=res.rate_status;
        this.profile = res.data;
        this.ratings=res.data.rate_data;
        this.all_ratings=res.data.rate_data;
      }
      else {
      }
    })
  }

  opneEdit() {
    this.navCtrl.push('EditProfilePage')
  }
  getImages() {
    let data = {
      "user_id": this.inFluId,
    }
    this.api.get(data, 0, 'getTopInfluImages').then((res: any) => {
      if (res.status == 1) {
        this.images = res.images;
        this.getService();
      }
      else {
        this.images = [];
      }
      if (this.images.length == 0) {
        this.noImages = true;
      } else {
        this.noImages = false
      }
    })
  }


  getService() {
    let data = {
      "created_by": { "value": this.inFluId, "type": "NO" },
      "user_id": { "value": this.auth.isUserLoggedIn()?this.auth.getCurrentUserId():this.auth.guest_id(), "type": "NO" },
      "type": { "value": 2, "type": "NO" },
    }
    this.api.postData(data, 0, 'getPostList').then((res: any) => {
      this.getApplied();
      if (res.status == 1) {
        this.services = res.data;
      }
      else {
        this.services = [];
      }
      if (this.services.length == 0) {
        this.noData = true
      } else {
        this.noData = false
      }
    })
  }


  back() {
    this.navCtrl.pop();
  }
  buy() {
    const modal = this.modalCtrl.create('PaymentPage', {}, { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }


  openAction() {
    const actionSheet = this.actionSheetCtrl.create({
      title: this.trans.instant('REPORT'),//this.trans.instant('BLOCK_THIS_INFLUENCER'),
      buttons: [
        {
          text: this.trans.instant('REPORT'),
          handler: () => {
            this.report_influ();
            // this.block_user();
            // this.navCtrl.pop();
          }
        },
        {
          text: this.trans.instant('CANCEL'),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

  }


  openSlider(imgNameArr, index) {
    let profileModal = this.modalCtrl.create('ImagesViewerPage', { imgs: imgNameArr, index: index });
    profileModal.present();
  }

  detail(id) {
    // let profileModal = this.modalCtrl.create('PostDe0tailPage', { PostId: id }, { cssClass: "alertModal", enableBackdropDismiss: true, showBackdrop: true });
    // profileModal.present();
   
    this.navCtrl.push('PostDetailPage', { PostId: id });
  }


  getApplied() {
    let data = {
      "apply_by": { "value": this.inFluId, "type": "NO" },
    }
    this.api.postDataNoLoader(data, 0, 'ServiceAppliedJobs').then((res: any) => {
      if (res.status == 1) {
        this.appliedJobList = res.data;
      }
      else {
        this.appliedJobList = [];
      }
      if (this.appliedJobList.length == 0) {
        this.noAppliedData = true
      } else {
        this.noAppliedData = false
      }
    })
  }

  block_user(){
    let data = {
      "block_to": this.inFluId,
      "block_by":this.auth.getCurrentUserId()
    }
    //https://www.webwiders.com/WEB01/Influ/Api/BlockCompany?block_by=51&block_to=52
      this.api.get(data,1,'BlockCompany').then((res:any)=>{
            if(res.status==1){
              this.navCtrl.pop();
              //this.getProfile();
            }
      })
    
  }



  jobdetail(id) {
    // let profileModal = this.modalCtrl.create('PostDet0ailPage', { PostId: id }, { cssClass: "alertModal", enableBackdropDismiss: true, showBackdrop: true });
    // profileModal.present();
    this.navCtrl.push('JobDetialPage', { JobId: id });
  }


  openNoti() {
    this.navCtrl.push('NotificationPage');
  }

  rating_filter(filter:any) {
    console.log(filter);
    this.ratings=this.all_ratings.filter((item) => {
      return item.rate==filter;
    })
  }

  rate_now() {
    // console.log('working');
    let ratemodal = this.api.modalCtrl.create(RatePopupPage, {data:this.profile}, { cssClass: 'ratemodal' });
    ratemodal.present();
    ratemodal.onDidDismiss((data) => {
      if(data){
        // this.getPost();
        this.getProfile();
      }
    })
  }

  report_influ() {
    let textModal = this.api.modalCtrl.create('TextModalPage', { PostId: this.inFluId ,is_influ:1}, { cssClass: 'myModal' });
    textModal.present();
  }

}
