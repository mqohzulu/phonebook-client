import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactApiService } from '../services/contact-api.service';
import { Contact } from '../Models/contact';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
// import { ContactService } from '../../services/contact.service';
// import { Contact } from '../../models/contact';
// import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchTerm: string = '';
  loading = false;
  dataSource: MatTableDataSource<Contact>;
  displayedColumns: string[] = ['name', 'phoneNumber', 'email', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private contactService: ContactApiService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Contact>([]);
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadContacts(): void {
    this.loading = true;
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.dataSource.data = contacts;
        this.loading = false;
        console.log('Contacts loaded successfully:', contacts);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading contacts:', error);
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.contactService.searchContacts(this.searchTerm).subscribe({
        next: (contacts) => {
          this.dataSource.data = contacts;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          console.error('Search error:', error);
        }
      });
    } else {
      this.loadContacts();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
            this.loadContacts();
          });
        } else {
          this.contactService.createContact(result).subscribe(() => {
            this.loadContacts();
          });
        }
      }
    });
  }

  deleteContact(id: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '750px',
      data: {
        label: 'Are you sure you want to delete this contact?'
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.contactService.deleteContact(id).subscribe(() => {
          this.loadContacts();
        });
      }
    });
  }

  getContactsCount(): number {
    return this.dataSource.data.length;
  }
}