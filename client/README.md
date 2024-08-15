# Lost and Found Application

## Idea

The Lost and Found Application is designed to assist users in finding their lost belongings. Users can create and post articles detailing their missing items, allowing others to provide helpful information or tips. Each user has control over their own articles, with the ability to edit or delete them.

## Public Part (Accessible without Authentication)

-   **Access to the Register Page:** Users can sign up for an account to create and manage posts about their lost items.
-   **Access to the Login Page:** Users can log in to manage their articles and interact with other users.
-   **Access to the Home Page:** Displays all articles about lost and found items posted by users.
-   **Access to the Details Page:** Each article has a dedicated page with detailed information about the missing item.
-   **Access to the About Us Page:** Provides information about the platform, its purpose, and its community-driven mission.

## Private Part (Accessible with Authentication - Basic User)

-   **Access to the Profile Page:** Users can manage their profile, view their posted articles, and logout.
-   **Enhanced Details Page:**
    -   Users can edit or delete their own articles.

## Functionality

### Basic User

-   **Create an Account:** Users can sign up to post about their lost and found belongings.
-   **Profile Page:** Quick access to manage posted articles and a logout option.
-   **Create an Article:** Users can create detailed posts about their missing items.
-   **Edit/Delete Article:** Users can edit or delete their own articles.

## Protected Routes

-   **Authentication-Based Access:** Users must be logged in to post articles or edit them

## Available Scripts

### Server / REST API

-   **`npm run dev`:** Starts the application in Development Mode.

### Client Side

-   **`npm run dev`:** Starts the client-side application in Development Mode.
