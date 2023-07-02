import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  employee: Employee = new Employee();
  id: number;
  constructor(private employeeService: EmployeeService,
    private route:ActivatedRoute,
    private router:Router){ }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data) => this.employee = data,
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
  })


    // this.employeeService.getEmployeeById(this.id).subscribe(data => {
    //   this.employee = data;
    // },error => console.log(error));
  }

  private updateEmployee(){
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
      console.log(data)
      this.gotoEmployeeList();
    },
    error => console.log(error));
  }

  gotoEmployeeList(){
    this.router.navigate(['/employees']);
  }

  onSubmit(){
    console.log(this.employee);

    this.employeeService.updateEmployee(this.id, this.employee).subscribe({
      next: (data) =>  this.gotoEmployeeList(),
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })

  //   this.employeeService.updateEmployee(this.id, this.employee).subscribe(data =>{
  //       this.gotoEmployeeList();
  //   }
  //   ,error => console.log(error));  
  }
}
