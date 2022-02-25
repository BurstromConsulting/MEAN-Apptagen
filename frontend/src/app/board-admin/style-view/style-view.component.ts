import { style } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { forkJoin, take } from 'rxjs';
import { PersonCardComponent } from 'src/app/shared/person-card/person-card.component';
import { StyleService } from 'src/app/_services/style.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-style-view',
  templateUrl: './style-view.component.html',
  styleUrls: ['./style-view.component.css']
})
export class StyleViewComponent implements OnInit {
  @ViewChild("previewCard") previewCard!: PersonCardComponent;
  nullStyle = {
    name: "none",
    _id: null
  };

  styleControl = new FormControl();
  // Image Control is Mostly Depreciated, as it was updated.
  // To-do: Update how Image selection and Control works for front-end while maintaining current upload functionality.
  imageControl = new FormControl();
  allUsers: any = [];
  allImages: any = [];
  selectedUser: any = null;
  selectedStyle: any;
  availableStyles: any = [];
  newFontColor?: string;
  newStyleName?: string;
  UserCompany: any = [];
  constructor(private userService: UserService, public styleService: StyleService, public cdr: ChangeDetectorRef, private router:Router) { }

  ngOnInit(): void {
    // Promises both services will have run, before we call styles and users for our frontend functions
    forkJoin([
      this.styleService.getAllStyles(),
      this.userService.getPublicContent()
    ]).pipe(take(1)).subscribe(([styles, users]) => {
      // Sorts recieved data.
      users.sort((a: any, b: any) => a.name.localeCompare(b.name));
      styles.sort((a: any, b: any) => a.name.localeCompare(b.name));
      this.allUsers = users;
      // Adds the user Images to all images available. Currently not used
      // To-do: Add functionality to select from images already uploaded or in the database assigned to other users, not just locally through uploading them.
      users.forEach((user: any) => {
        if (!!user.image){
          this.allImages.push(user.image);
        }
      })
      this.availableStyles = styles;
      this.selectedUser = this.allUsers[0];
      this.selectedStyle = this.selectedUser.style;
      if (!!this.selectedUser.style) {
        this.styleControl.patchValue(this.availableStyles.filter((style: any) => style._id === this.selectedUser.style._id)[0]);
      }
      if (!!this.selectedUser.image) {
        this.imageControl.patchValue(this.allImages.filter((image: any) => image === this.selectedUser.image)[0]);  
      }
      this.allUsers.forEach((element: any) => {

        if (this.UserCompany.includes(element.company)) {
        }
        else {
          this.UserCompany.push(element.company);
        }
      });
    })
  }
// Sets the style and image control based off of the Selected User
  currentUser(user: any): void {
    this.selectedUser = user;
    if(!!this.selectedUser.style){
      this.styleControl.patchValue(this.availableStyles.filter((style: any) => style._id === this.selectedUser.style._id)[0]);
    }else {
      this.styleControl.patchValue(this.nullStyle);
    }console.log(user,this.allImages);
    this.imageControl.patchValue(this.allImages.filter((image: any) => image === this.selectedUser.image).pop());
  }
  updateUser(): void {

    let styleSettings: any = this.nullStyle;
    if (this.styleControl.value !== this.nullStyle) {
      styleSettings = this.styleControl.value;
    }
    console.log("update User:",styleSettings._id);
    // Style updates are being resolved by the backend.
    this.userService.updateStyle(styleSettings._id, this.selectedUser._id).pipe(take(1)).subscribe((response: any) => {
      this.selectedUser = response;
      this.previewCard.updateBackground();
    });
  }

  //Adjusts User based values, based off of newly selected user.
  selected(event: MatSelectChange): void {
    this.selectedUser.style = event.value;
    this.selectedStyle = event.value;
  }
  // Depreciated functionality for image viewing
  selectedImage(event: MatSelectChange): void {
    this.selectedUser.image = event.value;
  }

  //Updates the font of the currently selected style, using a string, once Style has been updated, it refreshes the component to view the changes on admin end.
  // Devices will update the font color in real time.
  updateFont(event: any): void{
    const body = {
      fontcolor: this.newFontColor
    }
    this.styleService.updateStyle(this.selectedStyle._id, body).pipe(take(1)).subscribe((data: any) => {
      this.availableStyles = data;
      this.selectedUser.style.fontcolor = body.fontcolor;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/style']);
    }); 
    })
    
  }
  // Uploads new style background image alongside the string for its name, saves it to our backend and makes it available to our style selection list.
  onUploadedBackground(event: any): void {
    const file: File = event.target.files[0];
    if (!!file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const formData = new FormData();
        //Appends the File under the File attribute to our form data and the name of our new style under the name attribute.
        formData.append('file', file);
        formData.append('name', this.newStyleName!);
        this.styleService.saveStyle(formData).pipe(take(1)).subscribe((data: any) => {
          this.availableStyles = data;
        })
      };

    }
  }
  // Uploads the image of the new User and sets the values needed for the frontend and then the backend notifies the affected devices.
  onProfileChange(event: any): void {
    const file: File = event.target.files[0];
    if (!!file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const formData = new FormData();
        formData.append('file', file);
        this.userService.updateImage(formData, this.selectedUser._id).pipe(take(1)).subscribe((data: any) => {
          this.selectedUser.image = data.image;
          this.allImages.push(data.image);
          this.imageControl.patchValue(data.image);
          this.previewCard.updatePicture();
        })
      };

    }
  }
}
