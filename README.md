# EuphoriuM

EuphoriuM is a social media web application that allows users to connect, share, and engage with one another in a creative space. 

## Technologies Used

- **Frontend:** React, Vite, CSS/Sass
- **Backend:** Firebase (Firestore, Authentication)
- **Version Control:** Git

## Installation

### 1. Clone the Repository

Open your terminal and run the following command:

```bash
git clone https://github.com/dipayandas24/EuphoriuM.git
```

### 2. Navigate to the Project Directory

Change into the project directory:

```bash
cd EuphoriuM
```

### 3. Install Dependencies

Install the necessary dependencies:

```bash
npm install
```

## Configuration

### 1. Create a Firebase Project

- Go to the Firebase Console.
- Create a new project.
- Set up Firebase Authentication and Firestore Database.

### 2. Add Environment Variables

- Create a file named `.env.local` in the root directory of your project.
- Add your Firebase configuration:

```plaintext
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Usage

### 1. Start the Development Server

Run the following command to start your development server:

```bash
npm start
```

### 2. Open in Browser

Visit http://localhost:3000 to use the application.
