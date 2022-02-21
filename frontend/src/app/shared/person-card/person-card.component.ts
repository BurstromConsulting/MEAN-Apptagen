import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
import { Person } from 'src/app/person';
import { StyleService } from 'src/app/_services/style.service';
import { environment } from 'src/environments/environment.prod';


const BACKGROUND_URL = 'images/background/';
const PICTURE_URL = 'images/profile/';
const SERVER_URL = 'http://localhost:8080/';
@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})

export class PersonCardComponent implements OnInit, OnChanges {

  @Input() person?: any;
  @Input() detailed: boolean = false;
  @Input() editMode: boolean = false;
  picture?: any;
  background?: any;
  style?: any;
  url: any;
  screenBackground: boolean = false;
  loadedStyles?: boolean;
  @Output() titleClick: EventEmitter<string> = new EventEmitter();
  @Output() pictureClick: EventEmitter<string> = new EventEmitter();

  constructor(public styleService: StyleService) {
    this.url = 'http://' + environment.serverUrl + ':' + environment.port + '/';
  }
  ngOnChanges(changes: SimpleChanges): void {

    // console.log(changes['person'].currentValue);
    if (!!changes['person']) {
      this.person.image = changes['person'].currentValue.image;
      this.updatePicture();
      this.style = changes['person'].currentValue.style;
      this.updateBackground();
    }
  }

  ngOnInit(): void {
    //console.log('Person',this.person);
    this.styleService.getStyleById(this.person.style._id).pipe(take(1)).subscribe((style: any) => {
      this.style = style;
      this.loadedStyles = true;
    })
    // console.log(this.person);
    this.updateBackground();
    this.updatePicture();
    // this.picture = `url(${this.url}${PICTURE_URL}bild_test.jpg)`;
    // this.background = `url(${this.url}${BACKGROUND_URL}background1.jpg)`;
  }
  onTitleClick(): void {
    this.titleClick.emit(this.person._id);
  }
  onPictureClick(): void {
    if (this.editMode) {
      this.pictureClick.emit(this.person._id);
    }
  }
  updatePicture(): void {
    if (this.person.image == undefined) {
      this.picture = `url(${this.url}${PICTURE_URL}picture_default.png)`;
    }
    else {
      this.picture = `url(${this.url}${PICTURE_URL}${this.person.image})`;
    }
  }
  updateBackground(): void {
    if (this.style == undefined) {
      this.background = `white`;
    } else {
      this.background = `url(${this.url}${BACKGROUND_URL}${this.style.background})`;
    }
  }
  close(): void {

  }
}
