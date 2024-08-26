1. User Interface Design
  - Implement the user interface as per the provided design specifications.
2. Search Functionality
  - The page include a search bar that allows users to search the celebrity list by name.
3. User List (Accordion View)
  - Each celebrity is displayed as an accordion item.
    Clicking on an accordion will expand it, collapsing all other accordions.
    Clicking on the same accordion again will collapse it.
    Manage the + and - icons to reflect the open (+) or collapsed (-) state.
4. Data Fetching & Display
  - Fetch and display user details from the provided JSON file.
    Age Calculation: Automatically calculate and display the user's age based on the date of birth.
    Gender Field: Display as a dropdown with options (Male | Female | Transgender | Rather not say | Other).
    Country Field: Display as a text input field.
    Description: Display as a text area for input.
5. Editing & Deleting Users

  5.1 Edit Mode:
    - Allow users to edit details in place
    - Implement validation rules to prevent invalid inputs:
    - No text input allowed in the age field.
    - No numerical input allowed in the nationality field.
    - No fields can be left empty.
6. Provide buttons to Save or Cancel changes:
  - The Save button is disabled by default and only enabled if changes are made.
  - On clicking Save, update the user's details.
  - Cancel will revert to the previous state of the details.
  - Prevent opening another accordion while in edit mode.
7. Delete Mode:
  - Display a confirmation alert before deleting a user.
  - If confirmed, delete the user. If not, retain the user.
