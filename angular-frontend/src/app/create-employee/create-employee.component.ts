import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {

  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService,
    private router:Router){ }

  ngOnInit(): void {
  }

  private saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe({
      next: (v) =>  this.gotoEmployeeList(),
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
  });


    // this.employeeService.createEmployee(this.employee).subscribe(data => {
    //   console.log(data)
    //   this.gotoEmployeeList();
    // },
    // error => console.log(error));
  }

  gotoEmployeeList(){
    this.router.navigate(['/employees']);
  }

  onSubmit(){
    console.log(this.employee);
    this.saveEmployee();  
  }
}
