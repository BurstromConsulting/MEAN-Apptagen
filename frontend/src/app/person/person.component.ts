import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Person } from '../person';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

// Initial representation of what a Person would look like, Kept for future uses of making a "sub-page" for on-click events when you click on a Persons Usercard.
// Currently not Implemented
// To-do: Create a sub-page for more information when on click events happen for a Person-card
export class PersonComponent implements OnInit {
  id!: string;
  person!: Person;
  constructor(private userService: UserService, private route:ActivatedRoute, private router:Router) { }


  ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe((p:any) => {
      this.id = p.params.id;
      this.userService.getUserById(this.id).pipe(take(1)).subscribe((json:Person) => {
        //console.log(json);
        this.person = json;
      })
    })
  }

}