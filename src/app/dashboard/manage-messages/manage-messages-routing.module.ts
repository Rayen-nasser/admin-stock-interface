import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMessagesComponent } from './components/list-messages/list-messages.component';

const routes: Routes = [
  {path:'',
  component: ListMessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageMessagesRoutingModule { }
