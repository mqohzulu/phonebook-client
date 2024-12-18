Phonebook Application
A full-stack contact management application built with Angular and .NET Core Web API.

Project Structure
Frontend (Angular)
src/app/

components/
confirmation-dialog/
contact-list/
contact-form/
home/
models/
confirm.ts
contact.ts
services/
shared/
Backend (.NET Core)
PhonebookApi/

Controllers/
ContactsController.cs
Models/
Contact.cs
Data/
phonebook.db
Repositories/
Interfaces/
IContactRepository.cs
ContactRepository.cs
Program.cs

**Setup Instructions**
Frontend
Install dependencies:
bash
**npm install**
Run the application:
bash
**ng serve**
Backend
Restore packages:
bash
**dotnet restore**
Run the API:
bash
**dotnet run**
Technologies Used
Frontend: **Angular with Material UI**
Backend: **.NET Core Web API**
Database: **SQLite**
Development **Servers**
Frontend: http://localhost:4200
Backend: http://localhost:7160
