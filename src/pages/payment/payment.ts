import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';


/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  constructor(public navCtrl: NavController,public payPal:  PayPal) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  pay(amount){
  

  
                  this.payPal.init({
                  PayPalEnvironmentProduction: 'AXrpLWvfOz81QETgk97EJpSFt8dAMjk8r6_pzNuOX2h_AiA5ZuOiptOvax4LGAszWtosC2G6ZFJDB1GM',
                  PayPalEnvironmentSandbox: 'AYI3CuFBwDEjYgobd4AiTVzE4tvVP_V8IXlo3BsOt72SeB8lhFcs5NC9G1C2jjQwWbDD1gLE6Zm8ZGV8'
                }).then(() => {
                   //Environments: PayPalEnvironmentProduction,
                  this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
                    // Only needed if you get an "Internal Service Error" after PayPal login!
                    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
                  })).then(() => {
                    let payment = new PayPalPayment(amount, 'USD', 'Description', 'sale');
                    this.payPal.renderSinglePaymentUI(payment).then(resp => {
                      console.log(resp);
                      // Successfully paid

                      // Example sandbox response
                      //
                      // {
                      //   "client": {
                      //     "environment": "sandbox",
                      //     "product_name": "PayPal iOS SDK",
                      //     "paypal_sdk_version": "2.16.0",
                      //     "platform": "iOS"
                      //   },
                      //   "response_type": "payment",
                      //   "response": {
                      //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                      //     "state": "approved",
                      //     "create_time": "2016-10-03T13:33:33Z",
                      //     "intent": "sale"
                      //   }
                      // }
                    }, () => {
                      // Error or render dialog closed without being successful
                    });
                  }, () => {
                    // Error in configuration
                  });
                }, () => {
                  // Error in initialization, maybe PayPal isn't supported or something else
                });
  
  }
  
   goToHome(){
    this.navCtrl.setRoot(HomePage,{});
  }
  
  goToFavs(){
    this.navCtrl.push(FavoritesPage,{});
  }  


}
