import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent {
  
  employee: Employee = new Employee();
  id: number;
  constructor(private employeeService: EmployeeService,
    private route:ActivatedRoute,
    private router:Router){ }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    },error => console.log(error));
  }

  private deleteEmployee(){
    this.employeeService.deleteEmployee(this.id).subscribe(data => {
      console.log(data)
      this.gotoEmployeeList();
    },
    error => console.log(error));
  }

  gotoEmployeeList(){
    this.router.navigate(['/employees']);
  }

  onClick(){
    console.log(this.employee);
    this.deleteEmployee();  
  }
}
