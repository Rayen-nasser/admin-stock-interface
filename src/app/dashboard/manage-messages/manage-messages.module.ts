import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMessagesComponent } from './components/list-messages/list-messages.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ManageMessagesRoutingModule } from './manage-messages-routing.module';



@NgModule({
  declarations: [
    ListMessagesComponent
  ],
  imports: [
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ManageMessagesRoutingModule
  ]
})
export class ManageMessagesModule { }
