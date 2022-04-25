# BlackBerry Coding Test - Matthew Davis

This application has a RESTful API and a frontend which allows users to view all GUIDs. GUIDs can be created, edited, and deleted from this page.

## Directory structure

- **\_\_tests\_\_/**: Just a few tests utilizing the Jest testing framework.
- **components/**: React components.
- **lib/**: Functions for making database and cache calls.
- **pages/**:
  - **api/**: API endpoints. Most are in pages/api/guid/[guid].ts.
  - **index.tsx**: Entry point for frontend application.
