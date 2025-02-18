# Certificate Upload & Verification App

## Overview
This app allows users to upload certificates in PNG format and generate a unique hash code for each upload. The system stores all data locally on your computer, making it perfect for personal certificate management.

## Features

### Upload Certificate
- Input user name
- Input college name  
- Upload certificate (PNG format only)
- Generate a unique hash code
- Store data locally with the hash code as reference
- Creates a dedicated folder structure in your local drive

### Verification
- Input a unique hash code
- Retrieve and display the corresponding certificate from local storage

### Storage Structure
- Base Directory: `./certificates`
- Certificate Storage: `./certificates/images`
- Data Storage: `./certificates/data.json`

## App Flow

### Home Screen
The app opens with a clean and simple interface with two main options:
- Upload Certificate
- Verification

Users can switch between the two tabs as needed.

### Upload Certificate Tab
1. User enters their name
2. User enters their college name
3. User uploads a certificate (PNG format only)
4. User clicks Submit
5. The app:
   - Generates a unique hash code
   - Creates necessary directories if they don't exist
   - Saves the certificate image to `./certificates/images/{hash}.png`
   - Stores metadata (name, college, hash) in `data.json`
   - Uses the unique hash code as the reference for retrieval
6. The app displays the unique hash code for future verification

### Verification Tab
1. User enters their unique hash code
2. User clicks Verify
3. The app:
   - Reads the `data.json` file
   - Searches for the matching hash code
   - Retrieves the corresponding image from `./certificates/images`
   - Displays the certificate and associated information

### Data Storage Format
The `data.json` file will maintain the following structure:
