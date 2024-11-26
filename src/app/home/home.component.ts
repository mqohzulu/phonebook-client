import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactApiService } from '../services/contact-api.service';
import { Contact } from '../Models/contact';
import { ContactFormComponent } from '../contact-list/contact-form/contact-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  totalContacts: number = 0;

  constructor(
    private router: Router,
    private contactService: ContactApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadContactStats();
  }

  loadContactStats(): void {
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.totalContacts = contacts.length;
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
      }
    });
  }

  navigateToContacts(): void {
    this.router.navigate(['/contacts']);
  }

  openContactDialog(contact?: Contact): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '400px',
      data: contact || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.contactService.updateContact(result).subscribe(() => {
            //this.loadContacts();
          });
        } else {
          this.contactService.createContact(result).subscribe(() => {
           // this.loadContacts();
          });
        }
      }
    });
  }
}
