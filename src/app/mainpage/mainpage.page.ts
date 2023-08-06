import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { DbserviceService } from '../services/dbservice.service';
import { MessagingService } from '../services/messaging.service';
import { getMessaging, getToken, onMessage, } from "firebase/messaging";
import { environment } from 'src/environments/environment';
import * as $ from 'jquery'
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.page.html',
  styleUrls: ['./mainpage.page.scss'],
})
export class MainpagePage implements OnInit {

  @Input()title!: string;
  dropdown = false;
  dropdownmobile = false;
  istrue: any;
  iconName = "chevron-up"
  @ViewChild('productbtn', {read: ElementRef}) productbtn!: ElementRef;
  @ViewChild(IonContent) content!: IonContent;
public products: any[] = []
public category: any
  constructor(
    //private afauth: AngularFireAuth, 
    //private afstore: AngularFirestore,
    private actRoute: ActivatedRoute,
    private router : Router,
    private alertCtrl: AlertController,
    private dbservice: DbserviceService,
    private messagingservice: MessagingService
    ) 
    {
      // this.dbservice.getData('Products').subscribe((data) => 
      // {
      //   this.products = data;
      //   this.actRoute.queryParams.subscribe((params: any) => 
      //   {
      //     if (params.category == undefined)
      //     {
      //       this.products = data;
      //     }
      //     else 
      //     {
      //       this.products = data.filter((f) => f.Category == params.category);
      //     }
      //   })
      // })
   }
  ngOnInit() 
  {

     (function ($) {

      // Spinner
      // var spinner = function () {
      //     setTimeout(function () {
      //         if ($('#spinner').length > 0) {
      //             $('#spinner').removeClass('show');
      //         }
      //     }, 1);
      // };
      // spinner();
      
      // Initiate the wowjs
     // new WOW().init();
  
  
      // // Sticky Navbar
      // $(window).scroll(function (e) {

      //     if ($(this).scrollTop() > 300) {
      //         $('.sticky-top').addClass('shadow-sm').css('top', '0px');
      //     } else {
      //         $('.sticky-top').removeClass('shadow-sm').css('top', '-150px');
      //     }
      // });
      
      
      // // Back to top button
      // $(window).scroll(function () {
      //     if ($(this).scrollTop() > 300) {
      //         $('.back-to-top').fadeIn('slow');
      //     } else {
      //         $('.back-to-top').fadeOut('slow');
      //     }
      // });
      // $('.back-to-top').click(function () {
      //     $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
      //     return false;
      // });
  
  
      // Modal Video
      // var $videoSrc: any;
      // $('.btn-play').click(function () {
      //     $videoSrc = $(this).data("src");
      // });
      // console.log($videoSrc);
      // $('#videoModal').on('shown.bs.modal', function (e) {
      //     $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
      // })
      // $('#videoModal').on('hide.bs.modal', function (e) {
      //     $("#video").attr('src', $videoSrc);
      // })
  
  
      // Product carousel
      (<any>$(".product-carousel")).owlCarousel({
          autoplay: true,
          smartSpeed: 1000,
          margin: 25,
          loop: true,
          center: true,
          dots: false,
          nav: true,
          navText : [
              '<i class="bi bi-chevron-left"></i>',
              '<i class="bi bi-chevron-right"></i>'
          ],
          responsive: {
        0:{
                  items:1
              },
              576:{
                  items:1
              },
              768:{
                  items:2
              },
              992:{
                  items:3
              }
          }
      });
  
  
      // Testimonial carousel
      (<any>$(".testimonial-carousel")).owlCarousel({
          autoplay: true,
          smartSpeed: 1000,
          items: 1,
          loop: true,
          dots: true,
          nav: false,
      });
     })(jQuery);
  
  
    }
    onScroll(event: any)
    {
      //console.log("Wew", event.detail.scrollTop)
      if (event.detail.scrollTop > 300)
      {
        $('.sticky-top').addClass('shadow-sm').css('top', '0px');
      }
      else 
      {
        $('.sticky-top').removeClass('shadow-sm').css('top', '-150px');
      }
    }
  
  hideDropdown(event: any) 
  {
    const xTouch = (event.clientX)
    const yTouch = (event.clientY)
    
    const rec = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rec.top+2
    const leftBoundary = rec.left+2
    const rightBoundary = rec.right-2
    
    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false
    }
    
      }
    
      categories() 
      {
        this.dropdownmobile = true
    this.alertCtrl.create({
      header: 'Choose Category',
      
      buttons: [
        {
          text: 'All',
          handler: (data) => {
          this.router.navigateByUrl('/mainpage')
          }
        },
        {
          text: 'Milktea',
          handler: (data) => {
            this.router.navigateByUrl('/mainpage?category=Milktea')
          }
        },
        {
          text: 'Fruit Tea',
          handler: (data) => {
            this.router.navigateByUrl('/mainpage?category=Fruit tea')
          }
        },
        {
          text: 'Slushee',
          handler: (data) => {
            this.router.navigateByUrl('/mainpage?category=Slushee')
          }
        }
      ]
    }).then(El => {
      El.present()
    })
    
        }
        async categoriesdown() {
          this.dropdownmobile = false
        }

        backtoTop()
        {
          this.content.scrollToTop(400);
        }

}
