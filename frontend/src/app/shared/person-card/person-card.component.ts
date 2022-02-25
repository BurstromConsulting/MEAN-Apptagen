import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
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
  // Multiple Input variables created based off of how we're trying to represent the card.
  @Input() person?: any;
  @Input() detailed: boolean = false;
  @Input() editMode: boolean = false;
  @Input() cardCSS: string = "";
  @Input() cardimageCSS: string = "";
  picture?: any;
  background?: any;
  style?: any;
  url: any;
  fontcolor?: string;
  screenBackground: boolean = false;
  loadedStyles?: boolean;
  @Output() titleClick: EventEmitter<string> = new EventEmitter();
  @Output() pictureClick: EventEmitter<string> = new EventEmitter();

  // Constructor sets variable based on the Enviroment we'll be using for the project.
  constructor(public styleService: StyleService) {
    this.url = 'http://' + environment.serverUrl + ':' + environment.port + '/';
  }
  // Angular on Changes, which should be called whenver a Change is being made to the angular component. 
  // Known Issue: this function does not get called for changes to font color.
  // To-do: Make changes to Font Color apply to admin view when editing styles. Not only when Config Rooms get an Update.
  ngOnChanges(changes: SimpleChanges): void {

    if (!!changes['person']) {
      this.person.image = changes['person'].currentValue.image;
      this.style = changes['person'].currentValue.style;
      this.fontcolor = changes['person'].currentValue.style.fontcolor;
      this.updateCard();
    }
  }
  // Gets the style of the person the card is supposed to represent and then force calls an update to get the values assigned to the HTML/CSS
  ngOnInit(): void {
    this.styleService.getStyleById(this.person.style._id).pipe(take(1)).subscribe((style: any) => {
      this.style = style;
      this.loadedStyles = true;
      this.updateCard();
    })
  }
  onTitleClick(): void {
    this.titleClick.emit(this.person._id);
  }
  //If editmode is true, you're in admin view, allowing you to click the profile picture to upload a new image.
  onPictureClick(): void {
    if (this.editMode) {
      this.pictureClick.emit(this.person._id);
    }
  }
  // Update card function to forcefully update all parts of the App-Person-Card where its being used.
  updateCard(): void{
    this.updateBackground();
    this.updatePicture();
    this.updateFont();
  }
  //Read updateCard() comment
  updatePicture(): void {
    if (this.person.image == undefined) {
      this.picture = `url(${this.url}${PICTURE_URL}picture_default.png)`;
    }
    else {
      this.picture = `url(${this.url}${PICTURE_URL}${this.person.image})`;
    }
  }
  //Read updateCard() comment
  updateBackground(): void {
    if (this.style == undefined) {
      this.background = `white`;
    } else {
      this.background = `url(${this.url}${BACKGROUND_URL}${this.style.background})`;
    }
  }
  //Read updateCard() comment
  updateFont(): void {
    if (this.style.fontcolor == undefined) {
      this.fontcolor = `black`;
    } else {
      this.fontcolor = `${this.style.fontcolor}`;
    }
  }
  //Previously used to close when using a detailed and non-detailed view of a person-card, currently not in use.
  close(): void {

  }
}
