import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactListComponent } from './contact-list/contact-list.component';



const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
  //  data: { animation: 'HomePage' }
  },
  { 
    path: 'contacts', 
    component: ContactListComponent,
  //  data: { animation: 'ContactsPage' }
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
