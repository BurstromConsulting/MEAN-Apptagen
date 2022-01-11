import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { employees, People } from '../people';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  people:People[] = employees;
  id!: number;
  person!:People;
  constructor(private route:ActivatedRoute, private router:Router) { }
  


  navigateTo(id: number) { 
    this.router.navigate(['person', id])
    
  }

  ngOnInit(): void {
    this.route.paramMap.pipe().subscribe(p => {
      const localId = p.get('id')
    if (!!localId){
      this.id = +localId;
      console.log(p)
      this.person = this.people.filter(p => p.id === this.id)[0]
    };
  });

  }

}
