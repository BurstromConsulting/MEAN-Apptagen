import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { Person } from 'src/app/person';
import { StyleService } from 'src/app/_services/style.service';
import { environment } from 'src/environments/environment.prod';


const BACKGROUND_URL = 'images/card-background/';
const PICTURE_URL = 'images/profile-picture/';
const SERVER_URL = 'http://localhost:8080/';
@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})

export class PersonCardComponent implements OnInit {

  @Input() person?: any;
  @Input() detailed: boolean = false;
  @Input() editMode: boolean = false;
  picture?: any;
  background?: any;
  url: any;
  screenBackground: boolean = false;
  loadedStyles?: boolean;
  @Output() titleClick: EventEmitter<string> = new EventEmitter();

  constructor(public styleService: StyleService) {
    this.url = 'http://' + environment.serverUrl + ':' + environment.port + '/';
  }

  ngOnInit(): void {
    //console.log('Person',this.person);
    this.styleService.getStyleById(this.person.style._id).pipe(take(1)).subscribe((style: any) => {
      this.background = `url(${this.url}${BACKGROUND_URL}${style.background})`;
      this.loadedStyles = true;
    })
    // console.log(this.person);
    if (this.person.image == undefined) {
      this.picture = `url(${this.url}${PICTURE_URL}picture_default.png)`;
    }
    else {
      this.picture = `url(${this.url}${PICTURE_URL}${this.person.image})`;
    }
    // this.picture = `url(${this.url}${PICTURE_URL}bild_test.jpg)`;
    // this.background = `url(${this.url}${BACKGROUND_URL}background1.jpg)`;
  }
  onTitleClick(): void {
    this.titleClick.emit(this.person._id);
  }
  close(): void {

  }
}
