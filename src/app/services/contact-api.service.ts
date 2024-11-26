
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../Models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  private apiUrl: string;
  constructor(private http: HttpClient, @Inject('ENVIRONMENT') private environment: any) {
    this.apiUrl = environment.apiUrl;
   }

   getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/Contacts`); 
  }

  searchContacts(term: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/Contacts/search?term=${term}`);
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/Contacts/${id}`);
  }

  createContact(contact: Contact): Observable<Contact> {
    console.log("createContact:", contact);
    return this.http.post<Contact>(`${this.apiUrl}/Contacts`, contact);
  }

  updateContact(contact: Contact): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Contacts/${contact.id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Contacts/${id}`);
  }
}
