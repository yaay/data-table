import { Component, OnInit} from '@angular/core';
import { DataService } from '../../Domain/data.service';
import { Data } from '../../Domain/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'data-table';
  editBox = false;
  addUser: boolean =false;
  selectedUser: Data[]  = []

  constructor(private dataService: DataService) {}

  tableData!: Data[] 

  ngOnInit() {
    this.fetchData()

  }

  fetchData() {
    this.dataService.getAll().subscribe(
      (usersData) => {
        this.tableData = usersData
      }
    )
  }


  deleteUser(id: any) {
    this.dataService.delete(id)
      .subscribe(() => {
        this.fetchData()  
      })
  }

  openEdit(user: any) {
    this.editBox=true
    this.selectedUser=user
    this.addUser=false
  }
  
  openAdd() {
    this.editBox=true
    this.addUser=true
  }

  onCloseForm() {
    this.editBox = false
    this.ngOnInit()
  }
}
