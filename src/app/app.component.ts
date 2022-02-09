import { AndroidPermissions } from '@ionic-native/android-permissions';

import { AlertProvider } from './../providers/alert/alert';
import { DownloadProvider } from './../providers/download/download';
import { GooglePlusProvider } from './../providers/google-plus/google-plus';
import { RestApiProvider } from './../providers/rest-api/rest-api';
import { OnesignalProvider } from './../providers/onesignal/onesignal';
import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, Config, Events, Nav, Platform, App, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase';
import { JobDetialPage } from '../pages/job-detial/job-detial';
import { EncryptProvider } from '../providers/encrypt/encrypt';
const config = {
  apiKey: 'AIzaSyC0ALZAVZCK8bRgP2Rm1ihdjwT-tSLk3tE',
  authDomain: 'fir-85886.firebaseapp.com',
  databaseURL: 'https://fir-85886.firebaseio.com',
  projectId: 'fir-85886',
  storageBucket: 'fir-85886.appspot.com',
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  lang: any;
  constructor(public platform: Platform, statusBar: StatusBar,
    public translate: TranslateService,
    splashScreen: SplashScreen,
    public event: Events,
    public auth: AuthProvider,
    public actionSheetCtrl: ActionSheetController,
    public onesignal: OnesignalProvider,
    public api: RestApiProvider,
    public google: GooglePlusProvider,
    public download: DownloadProvider,
    public ensp:EncryptProvider,
    // public config: Config,
    public app: App,
    public ionicApp: IonicApp,
    public alert: AlertProvider,
    public aP: AndroidPermissions
  ) {

    // this.ensp.getEncryptedData2('kamal');


    platform.ready().then(() => {
      localStorage.removeItem('guest');
      if (platform.is('cordova')) {
        this.setBackButton();
        this.onesignalsetup();
        statusBar.styleDefault();
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString('#10b4ed');
        splashScreen.hide();
      }

      this.event.subscribe('LoggedIn', r => {
        this.updateDeviceId();
      });
      this.event.subscribe('LogOut', r => {
        this.removeDeviceId();
      });

      event.subscribe('UpdateUserDetails', r => {
        this.getProfile(r);
      });

      setTimeout(() => {
        this.aP.requestPermissions(
          [this.aP.PERMISSION.CAMERA,
          this.aP.PERMISSION.READ_EXTERNAL_STORAGE,
        this.aP.PERMISSION.WRITE_EXTERNAL_STORAGE]
           ).then(r => {
          console.log('success in get permision---', r);
        });
      }, 150);     


      this.lang = this.auth.getUserLanguage();
      console.log(this.lang);
      setTimeout(() => {
        if (this.lang) {        
          this.translate.setDefaultLang(this.lang);
          if (this.lang == 'he') {
            setTimeout(() => {
            this.platform.setDir('rtl', true);              
            }, 150);
          }
        } else {
          setTimeout(() => {
            this.translate.setDefaultLang('en');            
          }, 150);
        }
      }, 150);   
      
      setTimeout(() => {
        if (this.auth.isUserLoggedIn()) {
          if (this.auth.getUserDetails().email_verified == 1) {
            setTimeout(() => {
              this.rootPage = TabsPage;              
            }, 150);
            setTimeout(() => {
              this.updateDeviceId();
              // this.google.silentLogin();
            }, 150);            
          } else {
            setTimeout(() => {
              this.rootPage = 'VerifyPage';             
            }, 150);
          }
        } else {
          if (this.lang) {
            setTimeout(() => {
              this.rootPage = 'PreloginPage';              
            }, 150);
          } else {
            setTimeout(() => {
              this.rootPage = 'SelectLangPage';              
            }, 150);
          }
        }
      }, 200);     

    });

    firebase.initializeApp(config);
  }





  onesignalsetup() {

    this.onesignal.init();
    // this.config.set('backButtonIcon', 'md-arrow-back');
    this.onesignal.oneSignal.addPermissionObserver().subscribe(r => {
      console.log('resp-------------', r);

    })
    this.onesignal.open.subscribe((data: any) => {
      console.log('Notidata----------', data);

      if (data != 0 && data) {

        if(data.screen=='rate'){
          setTimeout(() => {
            this.auth.influ_tab_type='Reviews';
            this.event.publish('SelectTab',3);
          }, 500);
        }

        if(data.screen=="job_complete"){
          setTimeout(() => {
            // alert("job complete - component")
            this.nav.push('PostDetailPage',{PostId:data.postId});          
          }, 500);
      }

        if(data.screen=="job_hired"){
          setTimeout(() => {
            this.nav.push('HiredListPage',{service_id:data.postId});            
          }, 500);
      }

        if(data.screen=='withdrawal_request'){
          setTimeout(() => {
            this.nav.push('WalletPage');
          }, 700);
        }

        if(data.screen=="job_done"){
          setTimeout(() => {
            this.nav.push('JobDetialPage',{JobId:data.postId});
          },500);         
        }

        if (data.screen == 'ChatDetailsPage') {
          setTimeout(() => {
            // this.nav.push('ChatDetailsPage', { JobId: data.other.job_id, ReceiverId: data.other.receiver });
            this.nav.push('ConversationPage', { RoomKey: data.RoomKey, JobTitle: data.JobTitle, JobId: data.JobId, other_user: data.other_user });

          }, 700)
        } 
        else if (data.screen == 'InfluencerProfile') {
          setTimeout(() => {
            // this.nav.push('InfluencerProfilePage', { InfluId: data.InfluId });
            //  this.nav.push('JobDetialPage',{JobId:data.jobId});  
             this.nav.push('AppliedInfluencerPage', { JobId: data.jobId });
          }, 700)
        }

      }
    });

    this.onesignal.received.subscribe((data: any) => {
      this.event.publish('GetNotiCount');
    });
  }

  change() {
    this.nav.push('ChangepasswordPage')
  }
  profile() {
    // this.nav.push(ProfilePage)
    this.event.publish('SelectTab', 3)
  }
  add() {
    // this.nav.push(AddJobPage)
    this.event.publish('SelectTab', 1)
  }
  job() {
    this.nav.push('JobListPage')
  }
  settings() {
    this.nav.push('SettingsPage')
  }
  login() {
    this.nav.push('PreloginPage')
  }

  wallet() {
    this.nav.push('WalletPage');
  }
  addpost() {
    // this.nav.push(AddjobInfluPage)
    this.event.publish('SelectTab', 1)
  }
  jobrequest() {
    this.nav.push('RequestListPage')
  }
  mypost() {
    this.nav.push('MyPostPage')
  }
  openHired() {
    this.nav.push('HiredServicesPage')
  }

  changel() {
    const actionSheet = this.actionSheetCtrl.create({
      title: this.translate.instant('CHANGE_LANGUAGE'),
      buttons: [
        {
          text: this.translate.instant('ENGLISH'),
          handler: () => {
            console.log('Destructive clicked');
            this.auth.updateUserLanguage('en');
            window.location.href = '';
          }
        }, {
          text: this.translate.instant('HEBREW'),
          handler: () => {
            console.log('Archive clicked');
            this.auth.updateUserLanguage('he');
            window.location.href = '';
          }
        }, {
          text: this.translate.instant('CANCEL'),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  updateDeviceId() {
    if (this.platform.is('cordova')) {
      this.onesignal.id().then(identity => {
        console.log('-------Device Id----------', identity);
        let Data = {
          user_id: { "value": this.auth.getCurrentUserId(), "type": 'NO' },
          device_id: { "value": identity, "type": 'NO' },
        }
        this.api.postData(Data, 0, 'UpdateDeviceId').then((result: any) => {
          console.log(result);
        })
      })
    }
  }

  removeDeviceId() {
    let Data = {
      user_id: { "value": this.auth.getCurrentUserId(), "type": 'NO' },
      device_id: { "value": '', "type": 'NO' },
    }
    this.api.postData(Data, 0, 'UpdateDeviceId').then((result: any) => {
      console.log(result);
    })
  }



  setBackButton() {
    this.platform.registerBackButtonAction(() => {
      let navView = this.app.getActiveNav();
      let activePortal = this.ionicApp._loadingPortal.getActive() || this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();
      //activePortal is the active overlay like a modal,toast,etc 
      if (activePortal) {
        activePortal.dismiss();
        return;
      }
      let view = this.nav.getActive();      // As none of the above have occurred, its either a page pushed from menu or tab 
      let activeVC = this.nav.getActive();      //get the active view 
      let page = activeVC.instance;      //page is the current view's instance i.e  the current component I suppose 

      if (!(page instanceof TabsPage)) {     // Check if the current page is pushed from a menu click 
        if (this.nav.canGoBack() || view && view.isOverlay) {
          if (activeVC.name == 'TabsPage') {

          } else {
            this.nav.pop();   //pop if page can go back or if its an overlay over a menu page 
          }
        }
        return;
      }
      let tabs = this.app.getActiveNav(); // So it must be a view from a tab.   The current tab's nav can be accessed by this.app.getActiveNav(); 
      if (!tabs.canGoBack()) {
        this.alert.confirmationAlert('Alert!', 'Do you want to exit from the app?').then(r => {
          if (r) {
            this.platform.exitApp();
          }
        })
        console.log("check", tabs, navView.parent);
      }
      return tabs.pop();
    }, 0);
  }

  getProfile(s) {
    let data = {
      "id": this.auth.getCurrentUserId()
    }
    this.api.get(data, s, 'GetUserProfile').then((res: any) => {
      if (res.status == 1) {
        this.auth.updateUserDetails(res.data)
      }
      else {
      }
    })
  }

  newChat() {
    this.nav.push('SigninPage');
  }
  blocklist() {
    this.nav.push('BlocklistPage');
  }
}
