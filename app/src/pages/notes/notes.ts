import { Component, OnInit } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { Http } from '@angular/http';


import 'rxjs/add/operator/map'
import { NoteViewPage } from '../note-view/note-view';
@Component({
  selector: 'page-home',
  templateUrl: 'notes.html'
})
// AKA NotesPage
export class NotesPage {
    notes: Array<string> = [];
    items: Array<{title: string, course: string, upload_date: string, price: string, description: string, noteID: number, score: number}>;
    search_string : string;

    constructor(public navCtrl: NavController, public http: Http, public plt: Platform,) {
        this.items = [];


        this.plt.ready().then((readySource) => {
            console.log('Platform ready from', readySource);

            // this.http.get("http://sebastianperez.pythonanywhere.com/api/v1/notes")
            // 	.subscribe(data => {
            // 		var res = data.json();
            //     console.log(res);
            // 		// this.items.push( { courseName: res['courseName'],}) etc.
            //     var all_notes = res["all_notes"];
            //     console.log(all_notes.length);
            //     for (let i = 0; i< all_notes.length; i++){
            //       console.log(all_notes[i]);
            //       this.items.push({
            //         title: all_notes[i].title,
            //         course: all_notes[i].course,
            //         upload_date: all_notes[i].upload_date,
            //         price: all_notes[i].price,
            //         note: all_notes[i].notes,
            //         description: all_notes[i].description
            //       });

            //     }


            // 	});

        });


    }


    ionViewDidEnter() {
        console.log('ionViewDidEnter b');
        this.items = [];

        // this.http.get("/api")
        this.http.get("http://52.15.101.44:5000/api/v1/notes")
            .subscribe(data => {
                var res = data.json();
                console.log(res);

                // this.items.push( { courseName: res['courseName'],}) etc.
                var all_notes = res["notes"];
                console.log(all_notes.length);
                for (let i = 0; i < all_notes.length; i++) {
                    console.log(all_notes[i]);
                    this.items.push({
                        title: all_notes[i].title,
                        course: all_notes[i].course,
                        upload_date: all_notes[i].upload_date,
                        price: all_notes[i].price,
                        description: all_notes[i].description,
                        noteID: all_notes[i].id,
                        score: all_notes[i].score
                    });

                }

            });
    }

    launchNoteViewPage(item) {
        console.log("note view page launch")
        console.log(item)
        this.navCtrl.push(NoteViewPage, item);
    }

    itemTapped(event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(NotesPage, {
            item: item
        });
    }


    // makeGetRequest = () : void => {
    //     // this.navCtrl.setRoot(UploadingPage, {
    //     //     images: this.images
    //     // });
    //     console.log(this.test);
    //     }


    // ngOnInit() {
    //        return this.service.getComments().then(data => this.comments = data);
    //    }


// $scope.doThisFunction = function(){
//     document.getElementById("test").innerHTML = "AJOOAOA";
// };

    search() {
        // Declare variables
        var input, filter, list, li, a, i;
        input = document.getElementById('myInput');
        input = this.search_string;
        filter = input.value.toUpperCase();
        list = document.getElementById("myList");
        li = list.getElementsByTagName('button');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("h2")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    };

}
