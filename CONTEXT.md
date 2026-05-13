PROJECT CONTEXT: Java Spring Boot + React TypeScript Car Wash Reservation Website

Goal:
Create a Java Spring Boot web application for a car washing/detailing business. The website should allow customers to view services and submit reservation requests with a date, time, car details, and additional information. The project should use at least 2 external libraries and should be realistic enough to potentially deploy on a real domain later.

Important architecture decision:
Instead of using Thymeleaf, use a JavaScript/TypeScript frontend.

Original idea:
- Backend: Java Spring Boot
- Frontend: Thymeleaf
- Database: H2/PostgreSQL

Updated better idea:
- Backend: Java Spring Boot REST API
- Frontend: React + TypeScript
- Database: H2 for development, PostgreSQL later

This means Spring Boot will not generate HTML pages directly.
Instead, Spring Boot will expose REST API endpoints that return JSON.
The React TypeScript frontend will call those API endpoints and display the website.

Project idea:
Build a car washing booking website where customers can view services, choose a reservation date, enter their car/contact details, and submit a booking request. The business owner can later view reservations through a simple admin page.

Possible project names:
- ShineDrive
- CleanRide
- AutoGlow
- DetailPro
- FreshWheels

Recommended final tech stack:
- Backend: Java + Spring Boot
- Backend API style: REST API
- Frontend: React + TypeScript
- Frontend build tool: Vite
- Styling: Bootstrap, Tailwind CSS, or plain CSS
- Database for development: H2
- Database for production later: PostgreSQL
- ORM: Spring Data JPA / Hibernate
- Validation: Jakarta Bean Validation
- Optional Java helper library: Lombok
- Optional frontend HTTP library: Axios

Recommended project structure:
carwash-project
 ├── backend
 │   └── Spring Boot application
 │
 └── frontend
     └── React TypeScript application

Backend purpose:
The Spring Boot backend should handle:
- REST API endpoints
- Reservation saving
- Service data
- Database access
- Validation
- Business logic
- Admin reservation management
- Reservation status updates
- Preventing invalid bookings

Frontend purpose:
The React TypeScript frontend should handle:
- Displaying pages
- Navigation
- Reservation form UI
- Calling backend APIs
- Showing success/error messages
- Displaying admin reservation table
- Styling and responsive layout

Required backend dependencies:
1. Spring Boot Starter Web
   Purpose:
   Build REST API endpoints such as GET /api/services and POST /api/reservations.

2. Spring Boot Starter Data JPA
   Purpose:
   Save reservations, services, and customers into a database.

3. H2 Database
   Purpose:
   Simple in-memory/local database for development and school demo.

4. Spring Boot Starter Validation
   Purpose:
   Validate form input, such as required name, valid email, valid phone, and future reservation date.

5. Lombok
   Purpose:
   Reduce boilerplate code like getters, setters, constructors, and builders.

Possible backend Gradle dependencies:
implementation 'org.springframework.boot:spring-boot-starter-web'
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
implementation 'org.springframework.boot:spring-boot-starter-validation'
compileOnly 'org.projectlombok:lombok'
annotationProcessor 'org.projectlombok:lombok'
runtimeOnly 'com.h2database:h2'

Optional production database dependency:
runtimeOnly 'org.postgresql:postgresql'

Required frontend libraries:
1. React
   Purpose:
   Build reusable frontend components and pages.

2. TypeScript
   Purpose:
   Add type safety to JavaScript and make the frontend code cleaner and more professional.

3. Vite
   Purpose:
   Fast development server and build tool for the React app.

4. Axios
   Purpose:
   Send HTTP requests from React to the Spring Boot backend.

5. Bootstrap or Tailwind CSS
   Purpose:
   Style the website and make it responsive.

Possible frontend setup:
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install axios
npm install bootstrap

Alternative styling options:
- Bootstrap: easier and faster for a school project
- Tailwind CSS: more modern and flexible
- Plain CSS: simpler if avoiding too many frontend tools

Recommended styling choice:
Use Bootstrap if the goal is to finish faster.
Use Tailwind CSS if the goal is to make the website look more modern.

Main website features:
1. Home page
   - Business name
   - Short description
   - Hero section
   - Photos or placeholders
   - Call-to-action button: “Book a wash”
   - Short explanation of services
   - Why choose us section

2. Services page
   - Interior cleaning
   - Exterior wash
   - Full detailing
   - Polishing
   - Optional add-ons
   - Prices
   - Estimated duration
   - Service cards

3. Reservation form page
   Fields:
   - Customer name
   - Phone number
   - Email
   - Car brand/model
   - Selected service
   - Preferred date
   - Preferred time
   - Additional notes

4. Booking confirmation / success message
   - Shows after the user submits a reservation
   - Example: “Your reservation request has been received.”
   - Optionally displays submitted reservation details
   - Explains that the booking is pending until confirmed by the business owner

5. Admin reservation list
   - Simple admin page where the owner can view all reservations
   - Shows customer info, selected service, date, time, car model, notes, and status

6. Contact page
   - Phone number
   - Email
   - Business location or placeholder location
   - Social media links
   - Business working hours

React frontend pages/routes:
- /
  Home page

- /services
  Services page

- /book
  Reservation form page

- /admin/reservations
  Admin reservation dashboard

- /contact
  Contact page

Backend API routes:
- GET /api/services
  Returns all available services.

- GET /api/services/{id}
  Returns one service by ID.

- POST /api/reservations
  Creates a new reservation request.

- GET /api/reservations
  Returns all reservations for admin view.

- GET /api/reservations/{id}
  Returns one reservation by ID.

- PATCH /api/reservations/{id}/status
  Updates reservation status.

- DELETE /api/reservations/{id}
  Deletes a reservation.

Example API flow:
React page:
User fills reservation form.

React sends request:
POST /api/reservations

Spring Boot:
Receives JSON data.
Validates the data.
Saves reservation to database.
Returns response JSON.

React:
Shows success message or validation errors.

Example reservation request JSON:
{
  "customerName": "John Smith",
  "email": "john@example.com",
  "phone": "+421900123456",
  "carModel": "BMW 3 Series",
  "serviceId": 1,
  "reservationDate": "2026-06-15",
  "reservationTime": "14:00",
  "additionalNotes": "Please focus on interior cleaning."
}

Example reservation response JSON:
{
  "id": 1,
  "customerName": "John Smith",
  "email": "john@example.com",
  "phone": "+421900123456",
  "carModel": "BMW 3 Series",
  "serviceName": "Full Detailing",
  "reservationDate": "2026-06-15",
  "reservationTime": "14:00",
  "additionalNotes": "Please focus on interior cleaning.",
  "status": "PENDING",
  "createdAt": "2026-05-10T18:30:00"
}

Suggested backend package structure:
com.example.carwash
 ├── controller
 ├── model
 ├── repository
 ├── service
 ├── dto
 ├── exception
 └── config

Backend package explanation:
controller:
Contains REST controllers that handle HTTP requests.

model:
Contains database entities such as Reservation and Service.

repository:
Contains Spring Data JPA repositories.

service:
Contains business logic.

dto:
Contains request and response objects used by the API.

exception:
Contains custom exceptions and error handling.

config:
Contains configuration such as CORS settings.

Suggested frontend folder structure:
frontend
 ├── src
 │   ├── api
 │   ├── components
 │   ├── pages
 │   ├── types
 │   ├── App.tsx
 │   ├── main.tsx
 │   └── index.css

Frontend folder explanation:
api:
Contains Axios setup and API functions.

components:
Contains reusable UI pieces such as Navbar, Footer, ServiceCard, ReservationForm.

pages:
Contains full pages such as HomePage, ServicesPage, BookingPage, AdminReservationsPage, ContactPage.

types:
Contains TypeScript interfaces such as Reservation, Service, ReservationStatus.

Suggested database entities:

1. Reservation
Fields:
- id
- customerName
- email
- phone
- carModel
- service
- reservationDate
- reservationTime
- additionalNotes
- status
- createdAt

2. Service
Fields:
- id
- name
- description
- price
- durationMinutes

Possible Reservation entity fields:
id: Long
customerName: String
email: String
phone: String
carModel: String
service: Service
reservationDate: LocalDate
reservationTime: LocalTime
additionalNotes: String
status: ReservationStatus
createdAt: LocalDateTime

Possible Service entity fields:
id: Long
name: String
description: String
price: BigDecimal
durationMinutes: Integer

ReservationStatus enum:
PENDING
CONFIRMED
CANCELLED
COMPLETED

Important realistic feature:
Reservations should start as PENDING instead of automatically confirmed.
This makes sense because the business owner may need to manually approve times.

Reservation status flow:
PENDING → CONFIRMED → COMPLETED

Alternative status flow:
PENDING → CONFIRMED
PENDING → CANCELLED
CONFIRMED → COMPLETED
CONFIRMED → CANCELLED

Validation rules:
- Customer name cannot be empty
- Email must be valid
- Phone number cannot be empty
- Car model should not be empty
- Service must be selected
- Reservation date must be in the future or today, depending on business rules
- Reservation time must be selected
- Additional notes can be optional
- Reservation date and time should not already be booked

Backend validation examples:
- @NotBlank for customerName
- @Email for email
- @NotBlank for phone
- @NotNull for serviceId
- @FutureOrPresent for reservationDate
- @NotNull for reservationTime

Business logic rules:
- A reservation cannot be created in the past.
- A reservation should start with status PENDING.
- Two reservations should not have the same date and time if duplicate booking prevention is implemented.
- Admin can update reservation status.
- Admin can delete reservations if needed.
- Service must exist before a reservation can be created.

Admin page:
Frontend route:
- /admin/reservations

Backend route:
- GET /api/reservations

Purpose:
Show all reservations in a table.

Table columns:
- Name
- Service
- Date
- Time
- Phone
- Email
- Car model
- Status
- Notes
- Actions

Possible admin actions:
- Confirm reservation
- Cancel reservation
- Mark as completed
- Delete reservation

Possible admin improvements:
- Change reservation status
- Delete reservation
- Filter reservations by date
- Search by customer name
- Sort by newest reservation
- View only pending reservations
- View reservations by status
- Highlight reservations happening today

User experience improvements:
- Add service cards with prices
- Make the layout responsive for phones
- Add success and error messages after form submission
- Add navigation bar
- Add footer with contact info
- Add Google Maps section or placeholder location
- Add gallery section with before/after photos
- Add business working hours
- Add phone number and social media links
- Add testimonials/reviews section
- Add FAQ section
- Add estimated service duration
- Add clear call-to-action buttons
- Add loading states when forms are submitting
- Add client-side validation in React
- Add backend validation in Spring Boot

Example services:
1. Exterior Wash
   Price: €20
   Duration: 30 minutes
   Description: Basic outside wash, rinse, and dry.

2. Interior Cleaning
   Price: €30
   Duration: 45 minutes
   Description: Vacuuming, dashboard cleaning, window cleaning, and basic interior refresh.

3. Full Detailing
   Price: €70
   Duration: 120 minutes
   Description: Complete interior and exterior cleaning.

4. Polishing
   Price: €100
   Duration: 180 minutes
   Description: Paint polishing to improve shine and remove light scratches.

5. Premium Package
   Price: €150
   Duration: 240 minutes
   Description: Full detailing, polishing, and deep interior cleaning.

Minimum viable version:
The first working version should include:
- React home page
- React services page
- React reservation form
- POST reservation data to Spring Boot
- Save reservation to H2 database
- Show confirmation/success message
- React admin reservation list
- GET reservations from Spring Boot

This is already a strong Spring Boot school project because it demonstrates:
- Java backend development
- REST API design
- Spring Boot controllers
- DTO usage
- Form handling
- Validation
- Database persistence
- Spring Data JPA
- React frontend development
- TypeScript usage
- HTTP communication between frontend and backend
- Basic full-stack web application structure

Recommended development phases:

Phase 1: Project setup
- Create a main project folder called car_wash_booking.
- Inside it, create backend and frontend folders.
- Create Spring Boot backend using Spring Initializr.
- Create React TypeScript frontend using Vite.
- Test that both apps run separately.

Backend dependencies:
- Spring Web
- Spring Data JPA
- H2 Database
- Validation
- Lombok

Frontend dependencies:
- React
- TypeScript
- Vite
- Axios
- Bootstrap or Tailwind CSS

Phase 2: Backend basic setup
- Create backend package structure.
- Configure application.properties.
- Enable H2 console.
- Configure database connection.
- Add CORS configuration so React can call the Spring Boot API.
- Test a simple endpoint such as GET /api/health.

Phase 3: Create backend models
- Create Reservation entity.
- Create Service entity.
- Create ReservationStatus enum.
- Define relationships between Reservation and Service.
- Add createdAt timestamp.

Phase 4: Create repositories
- Create ReservationRepository.
- Create ServiceRepository.
- Add useful methods such as:
  - findAllByOrderByReservationDateAscReservationTimeAsc
  - existsByReservationDateAndReservationTime
  - findByStatus

Phase 5: Create DTOs
- Create ReservationRequest DTO.
- Create ReservationResponse DTO.
- Create ServiceResponse DTO.
- Create UpdateReservationStatusRequest DTO.

Reason for DTOs:
DTOs make the API cleaner and prevent exposing database entities directly.

Phase 6: Create backend service layer
- Create ReservationService.
- Create CarWashService or ServiceService.
- Add business logic here instead of putting everything inside controllers.

ReservationService responsibilities:
- Create reservation
- Validate that selected service exists
- Prevent bookings in the past
- Optionally prevent duplicate date/time bookings
- Return reservations for admin
- Update reservation status
- Delete reservation

Phase 7: Create backend controllers
- Create ServiceController.
- Create ReservationController.
- Create AdminReservationController or use ReservationController for admin routes.

Suggested controller endpoints:
GET /api/services
GET /api/services/{id}
POST /api/reservations
GET /api/reservations
GET /api/reservations/{id}
PATCH /api/reservations/{id}/status
DELETE /api/reservations/{id}

Phase 8: Add example data
- Add services automatically when the app starts.
- Use CommandLineRunner or data.sql.
- Insert services such as Exterior Wash, Interior Cleaning, Full Detailing, and Polishing.

Phase 9: Frontend setup
- Create React project with Vite and TypeScript.
- Install Axios.
- Install Bootstrap or Tailwind CSS.
- Create frontend folder structure.
- Set up React Router if using multiple pages.
- Create API client file for backend communication.

Possible frontend libraries:
- react-router-dom for page routing
- axios for HTTP requests
- bootstrap for styling

Possible install command:
npm install axios react-router-dom bootstrap

Phase 10: Create frontend types
Create TypeScript interfaces:
- Service
- Reservation
- ReservationRequest
- ReservationStatus

Example Service type:
id: number
name: string
description: string
price: number
durationMinutes: number

Example Reservation type:
id: number
customerName: string
email: string
phone: string
carModel: string
serviceName: string
reservationDate: string
reservationTime: string
additionalNotes: string
status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
createdAt: string

Phase 11: Create frontend API functions
Create functions such as:
- getServices()
- createReservation(data)
- getReservations()
- updateReservationStatus(id, status)
- deleteReservation(id)

Phase 12: Create frontend pages
Create:
- HomePage
- ServicesPage
- BookingPage
- AdminReservationsPage
- ContactPage

Phase 13: Create reusable frontend components
Create:
- Navbar
- Footer
- ServiceCard
- ReservationForm
- ReservationTable
- StatusBadge
- LoadingSpinner
- ErrorMessage
- SuccessMessage

Phase 14: Build home page
Home page should include:
- Hero section
- Business name
- Short business description
- Call-to-action button linking to /book
- Short list of popular services
- Why choose us section
- Contact call-to-action

Phase 15: Build services page
Services page should:
- Fetch services from GET /api/services
- Display services as cards
- Show name, description, price, and duration
- Include a “Book this service” button

Phase 16: Build reservation form page
Booking page should:
- Fetch available services from backend
- Display form fields
- Validate required fields on frontend
- Send POST request to /api/reservations
- Show success message after submit
- Show backend validation errors if something is wrong

Reservation form fields:
- customerName
- email
- phone
- carModel
- serviceId
- reservationDate
- reservationTime
- additionalNotes

Phase 17: Build admin reservations page
Admin page should:
- Fetch reservations from GET /api/reservations
- Display reservations in a table
- Show reservation status
- Allow status update
- Optionally allow delete
- Optionally filter reservations by status or date

Phase 18: Styling and responsiveness
- Add navbar
- Add footer
- Style service cards
- Style booking form
- Style admin table
- Make the website responsive for phones and tablets
- Use consistent colors
- Use clean spacing
- Make buttons clear and easy to use

Phase 19: Error handling
Backend:
- Return clear error messages for validation errors.
- Return 404 if service or reservation does not exist.
- Return 400 for invalid booking requests.

Frontend:
- Display errors clearly to the user.
- Show loading states during API calls.
- Show success message after reservation is created.

Phase 20: Final improvements
- Add validation error messages
- Add example services
- Add duplicate booking prevention
- Add basic status management
- Improve design
- Prepare README file
- Add screenshots
- Test full flow from booking to admin view

CORS configuration:
Because the React frontend and Spring Boot backend run on different ports during development, CORS must be configured.

Example:
Frontend runs on:
http://localhost:5173

Backend runs on:
http://localhost:8080

Spring Boot must allow requests from the frontend origin.

Development URLs:
Frontend:
http://localhost:5173

Backend:
http://localhost:8080

H2 console:
http://localhost:8080/h2-console

Typical development flow:
1. Start Spring Boot backend.
2. Start React frontend.
3. Open frontend in browser.
4. Submit booking form.
5. React sends request to backend.
6. Backend saves reservation to H2 database.
7. Admin page fetches and displays reservations.

Future deployment idea:
There are two common deployment options.

Option 1:
Deploy backend and frontend separately.
- Frontend deployed on Vercel or Netlify.
- Backend deployed on Render, Railway, Fly.io, or VPS.
- Database hosted separately, usually PostgreSQL.

Option 2:
Build React app and serve static frontend files from Spring Boot.
- React is built into static files.
- Spring Boot serves the built frontend.
- One backend server hosts both API and frontend.

For school project:
Use separate frontend and backend during development.
Deployment can be explained as a future improvement.

Production improvements:
- Replace H2 with PostgreSQL.
- Use environment variables for database credentials.
- Add Spring profiles such as dev and prod.
- Add admin login with Spring Security.
- Add email confirmation with JavaMailSender.
- Add real domain later.
- Add HTTPS.
- Add database backups.
- Add Docker.

Optional advanced features:
1. Prevent booking in the past
   - Reject reservation dates before today.

2. Prevent duplicate bookings
   - If a customer books a specific date and time, another customer should not be able to book the same slot.

3. Add unavailable time slots
   - Allow the owner to block certain times.

4. Add email confirmation
   - Use JavaMailSender later to send confirmation emails to customers.

5. Add admin login
   - Use Spring Security later to protect the admin reservation page.

6. Add PostgreSQL for production
   - Use H2 for school/demo version.
   - Switch to PostgreSQL before real deployment.

7. Add image gallery
   - Show before/after photos of cleaned cars.

8. Add reviews/testimonials
   - Display customer feedback.

9. Add working hours
   - Prevent users from booking outside business hours.

10. Add service duration logic
   - Prevent overlapping reservations based on how long each service takes.

11. Add price calculation
   - Show selected service price before submitting reservation.

12. Add contact form
   - Let users send general questions.

13. Add admin dashboard summary
   - Total reservations
   - Pending reservations
   - Reservations today
   - Completed reservations

Possible README sections:
- Project description
- Features
- Technologies used
- Backend setup
- Frontend setup
- How to run the project
- API endpoints
- Screenshots
- Future improvements
- Author

Suggested README project description:
This project is a full-stack car washing/detailing reservation website. Customers can view available services and submit booking requests. The backend is built with Java Spring Boot and exposes a REST API. The frontend is built with React and TypeScript. Reservations are stored in a database using Spring Data JPA. The admin page allows the business owner to view and manage reservations.

Why React TypeScript instead of Thymeleaf:
React TypeScript makes the frontend more modern and interactive.
Spring Boot focuses only on backend logic and REST API.
This architecture is closer to real-world full-stack applications.
The project becomes easier to expand later.
The frontend and backend can be deployed separately.
React gives better user experience for forms, admin tables, and dynamic UI.

When Thymeleaf might still be better:
Use Thymeleaf if the class is focused only on Java and Spring Boot.
Use Thymeleaf if the project must be simpler.
Use Thymeleaf if the teacher does not want a separate frontend framework.

Recommended choice:
Use Java Spring Boot REST API + React TypeScript frontend.

Reason:
It is modern, realistic, professional, and still strongly demonstrates Java backend skills.

Final minimum version:
Backend:
- Spring Boot REST API
- Reservation entity
- Service entity
- H2 database
- Validation
- Reservation creation endpoint
- Services endpoint
- Admin reservations endpoint

Frontend:
- React TypeScript app
- Home page
- Services page
- Booking form
- Admin reservations page
- Axios API calls
- Responsive styling

Final project summary:
This project is a full-stack Java Spring Boot and React TypeScript web application for a small car washing/detailing business. Customers can view available services and submit reservation requests with contact information, car details, preferred date and time, selected service, and notes. The Spring Boot backend exposes REST API endpoints, validates input, stores data using Spring Data JPA, and manages reservation statuses. The React TypeScript frontend displays the website, handles user interaction, submits booking forms, and shows an admin reservation dashboard. The project uses multiple external libraries, including Spring Web, Spring Data JPA, H2 Database, Validation, Lombok, React, TypeScript, Axios, and Bootstrap or Tailwind CSS. It is suitable for a school Java project and can later be extended into a real deployable website.