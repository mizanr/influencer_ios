import { HeaderIconComponent } from './../components/header-icon/header-icon';
import { Media } from '@ionic-native/media';
import { DownloadProvider } from './../providers/download/download';
import { OneSignal } from '@ionic-native/onesignal';
import { OnesignalProvider } from './../providers/onesignal/onesignal';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

import { SocialSharing } from '@ionic-native/social-sharing';


import { PayPal } from '@ionic-native/paypal';
import { PaypalProvider } from './../providers/paypal/paypal';
import { FacebookProvider } from './../providers/facebook/facebook';
import { GooglePlusProvider } from './../providers/google-plus/google-plus';
import { GooglePlus } from '@ionic-native/google-plus';
import { VideoEditor } from '@ionic-native/video-editor';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ImageResizer } from '@ionic-native/image-resizer';
import { ImagePicker } from '@ionic-native/image-picker';
import { MediaProvider } from './../providers/media/media';
import { LoadingProvider } from './../providers/loading/loading';
import { ImageProvider } from './../providers/image/image';
import { AlertProvider } from './../providers/alert/alert';
import { AuthProvider } from './../providers/auth/auth';
import { RestApiProvider } from './../providers/rest-api/rest-api';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { Keyboard } from '@ionic-native/keyboard';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AES256 } from '@ionic-native/aes-256';
import { EncryptProvider } from '../providers/encrypt/encrypt';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';
import { AutosizeModule } from 'ngx-autosize';
import { PlayAudioProvider } from '../providers/play-audio/play-audio';
import { FileOpener } from '@ionic-native/file-opener';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { ChatmoduleProvider } from '../providers/chatmodule/chatmodule';
import { ComponentsModule } from '../components/components.module';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'ionic3-star-rating';
import { RatePopupPage } from '../pages/rate-popup/rate-popup';
import { Facebook } from '@ionic-native/facebook';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { WithdrawalPopupPage } from '../pages/withdrawal-popup/withdrawal-popup';
import { InAppBrowser } from '@ionic-native/in-app-browser';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    RatePopupPage,
    WithdrawalPopupPage,
  ],
  imports: [
    StarRatingModule,
    BrowserModule,
    AutosizeModule,
    ReactiveFormsModule,
    VirtualScrollerModule,
    ComponentsModule,
    // CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    IonicModule.forRoot(
      MyApp, {
      mode: "ios",
      backButtonText: ""
    }
    ),
    HttpClientModule],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    RatePopupPage,
    WithdrawalPopupPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestApiProvider,
    AuthProvider,
    AlertProvider,
    ImageProvider,
    LoadingProvider,
    Camera,
    File,
    Keyboard,
    MediaProvider,
    ImagePicker,
    ImageResizer,
    AndroidPermissions,
    VideoEditor,
    GooglePlus,
    GooglePlusProvider,
    FacebookProvider,
    InAppBrowser,
    PaypalProvider,
    PayPal,
    AES256,
    EncryptProvider,
    OnesignalProvider,
    OneSignal,
    FileChooser,
    FilePath,
    FileTransfer,
    DownloadProvider,
    Media,
    PlayAudioProvider,
    FileOpener,
    FirebaseProvider,
    ChatmoduleProvider,
    Facebook,
    InAppBrowser,
    IOSFilePicker,
    SocialSharing,
    InAppBrowser,
  ]
})
export class AppModule { }
