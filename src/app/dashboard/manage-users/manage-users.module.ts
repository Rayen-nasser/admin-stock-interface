import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ManageUsersRoutingModule } from './manage-users-routing.module';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ManageUsersRoutingModule
  ]
})
export class ManageUsersModule { }
