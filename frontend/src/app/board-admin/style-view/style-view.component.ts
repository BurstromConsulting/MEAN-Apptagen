import { style } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
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
  imageControl = new FormControl();
  allUsers: any = [];
  allImages: any = [];
  selectedUser: any = null;
  selectedStyle: any;
  availableStyles: any = [];
  newStyleName?: string;
  UserCompany: any = [];
  constructor(private userService: UserService, public styleService: StyleService, public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    forkJoin([
      this.styleService.getAllStyles(),
      this.userService.getPublicContent()
    ]).pipe(take(1)).subscribe(([styles, users]) => {
      console.log(styles, users);
      users.sort((a: any, b: any) => a.name.localeCompare(b.name));
      styles.sort((a: any, b: any) => a.name.localeCompare(b.name));
      this.allUsers = users;
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

        //console.log(element);
        if (this.UserCompany.includes(element.company)) {
        }
        else {
          this.UserCompany.push(element.company);
        }
      });
      //console.log("Device companys", this.devicecompanys);
    })
  }

  currentUser(user: any): void {
    // console.log("User: ", user);
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
    // console.log(this.styleControl.value);
    if (this.styleControl.value !== this.nullStyle) {
      styleSettings = this.styleControl.value;
    }
    console.log("update User:",styleSettings._id);
    this.userService.updateStyle(styleSettings._id, this.selectedUser._id).pipe(take(1)).subscribe((response: any) => {
      //console.log("Device updated");
      this.selectedUser = response;
      this.previewCard.updateBackground();
      // this.socket.sendConfigUpdate(configSettings, this.selectedDevice.uuid);
    });
  }
  selected(event: MatSelectChange): void {
    // console.log(event);
    this.selectedUser.style = event.value;
  }
  selectedImage(event: MatSelectChange): void {
    // console.log(event);
    this.selectedUser.image = event.value;
  }
  onUploadedBackground(event: any): void {
    const file: File = event.target.files[0];
    if (!!file) {
      // this.styleService.createStyle().pipe(take(1)).subscribe(() => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let fileType: any;
        fileType = file.name.split(".").pop();
        // let data = reader.result!.slice(payload, reader.result!.toString().length);
        // // console.log(test);
        // console.log(fileType);
        // console.log(reader.result);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', this.newStyleName!);
        console.log(formData.get('file'));
        this.styleService.saveStyle(formData).pipe(take(1)).subscribe((data: any) => {
          this.availableStyles = data;
          // console.log(data);
        })
      };


      // console.log(file);
    }
  }
  onProfileChange(event: any): void {
    const file: File = event.target.files[0];
    if (!!file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let fileType: any;
        fileType = file.name.split(".").pop();
        let payload = 21 + fileType.toString().length;
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData.get('file'));
        this.userService.updateImage(formData, this.selectedUser._id).pipe(take(1)).subscribe((data: any) => {
          console.log(this.selectedUser.image, data.image);
          this.selectedUser.image = data.image;
          this.allImages.push(data.image);
          this.imageControl.patchValue(data.image);
          this.previewCard.updatePicture();
        })
      };

    }
  }
}
