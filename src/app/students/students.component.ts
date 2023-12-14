import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';






interface Student{
  name: string,
  email: string,
  gender:string
}
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
   
  ) {}
 
  studentFrom: FormGroup; 
  isEditing: boolean = false;
  editingIndex: number = -1;
  students: Student[] = [
    {
    name: "hamza",
    email: "hamza@email.com",
    gender:"M"
    },
    {
      name:"omar",
      email: "omar@email.com",
      gender:"M"
    },
    {
      name:"ll",
      email: "ll@email.com",
      gender:"M"
    }
   
   
  ];

  
  get studentName() {
    return this.studentFrom.get('studentName')
  }

  get studentEmail() {
    return this.studentFrom.get('studentEmail')
  }
  get studentGender() {
    return this.studentFrom.get('studentGender')
  }

  edit(i: number): void {
    this.isEditing = true;
    this.editingIndex = i;
    this.studentName.setValue(this.students[i].name);
    this.studentEmail.setValue(this.students[i].email);
    this.studentGender.setValue(this.students[i].email);

  }

  delete(i: number): void {
    this.students.splice(i,1)
  }

  submit(): void {
    if(!this.isEditing){
      this.students.push({
        name: this.studentName.value,
        email: this.studentEmail.value,
        gender:this.studentGender.value
      })
    }else {
      this.students[this.editingIndex].name = this.studentName.value
      this.students[this.editingIndex].email = this.studentEmail.value
      this.students[this.editingIndex].gender=this.studentGender.value
      this.isEditing = false
      this.editingIndex = -1
    }
    
    this.studentFrom.reset();
  }

  ngOnInit(): void {
    this.studentFrom = new FormGroup({
      studentName: new FormControl('', [Validators.required]),
      studentEmail: new FormControl('', [Validators.required, Validators.email]),
      studentGender:new FormControl('',Validators.required)
    });
  }
}
