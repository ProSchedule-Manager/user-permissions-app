# ProSchedule Manager

## Summary

ProSchedule Manager is an online cloud based application for business to manage clients, quotes, invoices, schedule, booking, workforce, dispatching, communication, payments, and payroll. 

To get started, one would purchase a subscription to the `ProSchedule Manager Application` in the `ProSchedule Manager Website`, `ProScheduleManager.placeholder`.

A subscription to the **ProSchedule Manager Application** grants business an instance of 4 different powerfull portals giving business owners, managers, staff and client a very intuitive, highend, functional and efficient experience.

1. Business Website

A fully brandable public website with content managment, SEO optimized, and support to custom domain. The website provides users visibility to their services, products, 

    * Custom domain name
    * Website content management
      * Home
      * About
      * Services
      * Products
      * Login
    * SEO
    * Online quote request
    * Online booking

2. Business Admin Portal

3. Business Staff Portal

4. Business Client Portal


sign up, subscribe to one of the available plans, log in, access `ProScheduleManager.placeholder/subscription-dashboard`, and go through the onboarding steps.

- When a user creates an account (signup) at `ProScheduleManager.placeholder`, the user will then have access to `ProScheduleManager.placeholder/my-account`.
- Once the subscription is purchased, the subscription owner can go to `ProScheduleManager.placeholder/dashboard` and proceed to set up the business account. The first step is to input the business name or use the suggested random name, which can be changed later. For this summary, let’s use the company "Cleaning Angels".
- After a name is chosen, the business owner can access the dashboard at `ProScheduleManager.placeholder/cleaning-angels/dashboard` - tenant dashboard.
- The business owner can also add new admins, staff, and client users. These users can log in at `ProScheduleManager.placeholder/cleaning-angels/login` and access their portals:
  - `ProScheduleManager.placeholder/cleaning-angels/admin-portal` - tenant portal
  - `ProScheduleManager.placeholder/cleaning-angels/staff-portal` - staff portal
  - `ProScheduleManager.placeholder/cleaning-angels/client-portal` - client portal

- In the dashboard, the business owner can access all the features, including setting up a public custom white-label website that, when published, can be visited at `ProScheduleManager.placeholder/cleaning-angels` where customers can request quotes and book jobs. This website is optimized for search engine and social media sharing.
- The business owner can replace `ProScheduleManager.placeholder/cleaning-angels` with any domain. For example, `cleaningangels.domain`, which applies to the website, dashboard, and portals:
  - `cleaningangels.domain` - website
  - `cleaningangels.domain/dashboard` - tenant dashboard
  - `cleaningangels.domain/admin-portal` - tenant portal
  - `cleaningangels.domain/staff-portal` - staff portal
  - `cleaningangels.domain/client-portal` - client portal

- Super Admins can access the `ProScheduleManager.placeholder/dashboard` to manage and visualize analytics of the subscriptions. These accounts belong to `ProScheduleManager.placeholder`.

## Technology

ProSchedule Manager will be built leveraging PWA (Progressive Web Apps) with the goal of supporting offline access to fundamental functionalities and native app availability.

The proposed initial stack includes:
- Docker
- Postgres
- Node
- React
- Nginx

## Portals

## ProSchedule Manager Website

* Public
    * http://ProScheduleManager.placeholder
    * http://ProScheduleManager.placeholder/plans
    * http://ProScheduleManager.placeholder/checkout
    * http://ProScheduleManager.placeholder/login

## ProSchedule Manager Website - Tenant Portal

* Authenticated
    * http://ProScheduleManager.placeholder/account
    * http://ProScheduleManager.placeholder/subscription
    * http://ProScheduleManager.placeholder/payment
    * http://ProScheduleManager.placeholder/profile

## Business Website
## Business Website - Admin Portal
## Business Website - Staff Portal
## Business Website - Client Portal

## User Stories

### Guest User

- A guest user should be able to view the subscriptions plans on the ProScheduleManager Website.
- A guest user should be able to purchase a subscription plan.
- A guest user should be able to send ProScheduleManager emails.

### Tenant User

- A tenant should be able to log in to the ProSchedule Manager website and access the tenant dashboard.
- A tenant should be able to access the tenant portal via a link in the tenant dashboard. A tenant is by default an admin.
- A tenant should be able to view the subscription details in the tenant dashboard.
- A tenant should be able to cancel the subscription in the tenant dashboard which will disable the account once the current subscription expires.
- A tenant should be able to toggle auto-renew on/off for active subscriptions in the tenant dashboard.
- A tenant should be able to change the business name and URL business name in the tenant dashboard.
- A tenant should be able to set up a custom domain in the tenant dashboard.
- A tenant should be able to view the subscription payment history in the tenant dashboard.
- A tenant should be able to edit the payment method information in the tenant dashboard.
- A tenant should be able to log in to the white-label website to the tenant portal.
- A tenant should be able to do everything an admin user can in the tenant portal.
- A tenant should be able to create admin users in the tenant portal.
- A tenant should be able to invite admin users in the tenant portal.
- A tenant should be able to view the admin table in the tenant portal.
- A tenant should be able to view admin details in the tenant portal.
- A tenant should be able to edit admin details in the tenant portal.
- A tenant should be able to disable admin access to the staff portal in the tenant portal.
- A tenant should be able to choose one of the available templates for the white-label website in the tenant portal.
- A tenant should be able to choose the primary, secondary, and tertiary colors for the white-label website in the tenant portal.
- A tenant should be able to upload the business logo to be used in the white-label website in the tenant portal.
- A tenant should be able to edit the white-label website home page content in the tenant portal.
- A tenant should be able to edit the white-label website services page content in the tenant portal.
- A tenant should be able to edit the white-label website quotes page content in the tenant portal.
- A tenant should be able to edit the white-label website serviced areas content in the tenant portal.
- A tenant should be able to edit the white-label website about us content in the tenant portal.
- A tenant should be able to edit the white-label website contact content in the tenant portal.

### Admin User

- An admin should be able to log in to the white-label website to the tenant portal.
- An admin should be able to create staff users.
- An admin should be able to invite staff users.
- An admin should be able to view the staff table.
- An admin should be able to view staff details.
- An admin should be able to edit staff details.
- An admin should be able to disable staff access to the staff portal.
- An admin should be able to create client users.
- An admin should be able to invite client users.
- An admin should be able to view the clients table.
- An admin should be able to view client details.
- An admin should be able to edit client details.
- An admin should be able to disable client access to the client portal.
- An admin should be able to add job locations to a client.
- An admin should be able to view all client locations.
- An admin should be able to edit a client job locations.
- An admin should be able to view the schedule in list view.
- An admin should be able to view the schedule in calendar view.
- An admin should be able to view the schedule in map view.
- An admin should be able to add jobs to the schedule.
- An admin should be able to edit jobs in the schedule.
- An admin should be able to cancel jobs in the schedule.
- An admin should be able to add tasks to the schedule.
- An admin should be able to edit tasks in the schedule.
- An admin should be able to assign staff to a job.
- An admin should be able to define staff compensation for a job.
- An admin should be able to create quotes.
- An admin should be able to view the quotes table.
- An admin should be able to edit quotes.
- An admin should be able to void quotes.
- An admin should be able to create job orders from a quote.
- An admin should be able to generate invoices from quotes.
- An admin should be able to generate invoices from job orders.
- An admin should be able to create invoices.
- An admin should be able to view the invoices table.
- An admin should be able to edit invoices.
- An admin should be able to void invoices.
- An admin should be able to send messages to staff.
- An admin should be able to view messages from staff.
- An admin should be able to send messages to clients.
- An admin should be able to view messages from clients.
- An admin should be able to view jobs.
- An admin should be able to view rides.
- An admin should be able to view leads.
- An admin should be able to view job requests.

### Staff User

- Staff should be able to log in to the white-label website to the staff portal.
- Staff should be able to check in to a job.
- Staff should be able to check out from a job.
- Staff should be able to track rides.
- Staff should be able to add notes to an ongoing or past job visible only to admin users.
- Staff should be able to add pictures to an ongoing or past job visible only to admin users.
- Staff should be able to view completed job history.
- Staff should be able to view completed job details.
- Staff should be able to view current balance.
- Staff should be able to view payment history.
- Staff should be able to see messages in the inbox.
- Staff should be able to send messages visible only to admin users.
- Staff should be able to edit profile information.
- Staff should be able to edit tax information.

### Client User

- A client should be able to log in to the client portal via the tenant website.
- A client should be able to update his/hers profile information.
- A client should be able to save payment history information.
- A client should be able to save payment information.
- A client should be able to see upcoming jobs in a list view.
- A client should be able to see upcoming jobs in a calendar view.
- A client should be able to make requests for upcoming jobs.
- A client should be able to see upcoming job details.
- A client should be able to see ongoing job details.
- A client should be able to see job history.
- A client should be able to see completed job details.
- A client should be able to see invoices.
- A client should be able to make payments.
- A client should be able to set up auto pay to be charged after job completion.
- A client should be able to see payment history.
- A client should be able to see messages in the inbox.
- A client should be able to send messages visible only to admin users.
- A client should be able to request a quote for a job.
- A client should be able to request job cancellation.

### Super Admin

- A super admin should be able to view the subscriptions table.
- A super admin should be able to filter the subscriptions table by active/expired.
- A super admin should be able to search the subscriptions table by business name, domain name, owner first and last name, and owner email.
- A super admin should be able to sort the subscriptions table by any of the table’s columns.
- A super admin should be able to view payments table.
- A super admin should be able to view payment details.
- A super admin should be able to view owner tickets table.
- A super admin should be able to view owner ticket details.
- A super admin should be able to reply to owner tickets.


## Features

- Drag & drop scheduling
- Dispatching & navigation
- Create estimates, issue invoices, and get paid

### Subscriptions table

  - Business name
  - Domain name
  - Owner first and last name
  - Owner email
  - Plan
  - Start date
  - End date
  - Status

### Staff table

### Clients table

### Places table

### Jobs table

### Invoices table

### Calendar

### Map


## Flows

url: http://ProScheduleManager.placeholder - psm.com

1. Sign up
    1. Select a subscription plan in the plans page - psm.com/plans
    2. Complete the purchase in checkout page - psm.com/checkout
    3. Click on the link on the email. That should take the user to the email confirmation page and enable the "tenant user account" - psm.com/confirm-email
    4. Login to the account panel - psm.com/login

2. Tenant Portal
    1. Go to "Account" - psm.com/account
    2. Setup Business information - psm.com/account/business
    3. Setup User Profile information - psm.com/account/profile

3. Admin Portal

4. Staff Portal

5. Client Portal

- Guest purchase a subscription.
- Tenant user setup website.
- Tenant user create admin user profile.
- Tenant invite admin to create user authentication.
- Tenant user create staff user profile.
- Tenant invite staff to create user authentication.
- Tenant user create cliet user profile.
- Tenant invite staff to create user authentication.
- Client create user authentication and profile on the tenant website.
- Tenant or admin user creates a job. 
- Cliente requests a job. 
- Tenant or admin users approves a requested job.
- Cliente requests a recurring job.
- Tenant or admin users approves a requested recurring job.
- Staff checkin to a job. 
- Staff checkout from a job.
- Staff adds note to a job.
- Invoice is generated once a job is completed.


## Endpoints

### Create user profile

POST api/v1/user


### Get events

GET api/v1/events

This endpoint will return a collection of jobs and tasks. 

- If user is tenant return all events.
- If user is admin return all events.
- If user is staff return only events assigned to the staff user making the request.
- If user is client return only events assigned to the client user making the request.
- For recurring jobs, if a actual job doesn't exist on the database for a given date/time, return a job based on the recurrence_patterns.
- If a recurring job date/time is modified, a canceled job should be created on the place of the original time and a new job should be created o the new date/time. The original job should have a referece to new job on its log and new job should have a reference to the original job on its log.
- The events dates range to show will be defined via query params (start_date and end_date).
- Whether to return both or only one type (jobs or tasks) can be manage via query params.