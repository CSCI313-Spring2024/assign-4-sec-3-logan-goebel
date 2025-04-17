import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';


export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-contact-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})


export class ContactListComponent {
  firstName = '';
  lastName = '';
  phone = '';
  email = '';
  contactList: Contact[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', phone: '123-456-7890', email: 'johnDoe@gmail.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '987-654-3210', email: 'janeSmith@gmail.com'},
    { id: 3, firstName: 'Bob', lastName: 'Johnson', phone: '555-555-5555', email: 'bobJohnson@gmail.com'},
    { id: 4, firstName: 'Alice', lastName: 'Williams', phone: '444-444-4444', email: 'aliceWilliams@gmail.com'},
  ];

  private nextId = 1;
  editingId: number | null = null;

  onClick(): void {
    if (this.editingId !== null) {
      // Update existing contact
      const index = this.contactList.findIndex(c => c.id === this.editingId);
      if (index !== -1) {
        this.contactList[index] = {
          id: this.editingId,
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          email: this.email
        };
      }
      this.editingId = null;
    } else {
      // Add new contact
      const newContact: Contact = {
        id: this.nextId++,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        email: this.email
      };
      this.contactList.push(newContact);
    }

    this.resetForm();
  }

  editContact(id: number): void {
    const contact = this.contactList.find(c => c.id === id);
    if (contact) {
      this.editingId = id;
      this.firstName = contact.firstName;
      this.lastName = contact.lastName;
      this.phone = contact.phone;
      this.email = contact.email;
    }
  }

  deleteContact(id: number): void {
    this.contactList = this.contactList.filter(c => c.id !== id);
    if (this.editingId === id) this.resetForm();
  }

  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.phone = '';
    this.email = '';
    this.editingId = null;
  }
}
