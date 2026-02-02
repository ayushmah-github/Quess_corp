# HRMS Lite - Frontend

A modern, professional Human Resource Management System (HRMS) frontend built with React. This is a lightweight HR tool that allows admins to manage employees and track attendance.

## 🚀 Features

### Employee Management
- ✅ Add new employees with unique IDs
- ✅ View list of all employees
- ✅ Delete employees
- ✅ Professional employee cards with department badges
- ✅ Email validation

### Attendance Management
- ✅ Mark daily attendance for employees
- ✅ View attendance records by date
- ✅ Track present/absent status
- ✅ View individual employee attendance history
- ✅ Attendance summary with statistics

### UI/UX Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states with spinner animations
- ✅ Empty states with helpful messages
- ✅ Error handling with meaningful messages
- ✅ Form validation
- ✅ Clean, professional interface
- ✅ Intuitive navigation

## 🛠 Tech Stack

- **Frontend Framework:** React 19.2.4
- **HTTP Client:** Axios
- **Styling:** CSS3
- **State Management:** React Hooks (useState, useEffect)
- **Build Tool:** Create React App

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (FastAPI)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ayushmah-github/Quess_corp.git
cd frontend/Quess_corp/hrms
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Backend URL
Create/Update `.env.local` file in the project root:
```
REACT_APP_API_URL=http://localhost:8000
```

For production, update to your deployed backend URL:
```
REACT_APP_API_URL=https://your-backend-url.com
```

### 4. Start Development Server
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── api/
│   ├── apiClient.js       # Axios instance configuration
│   └── endpoints.js       # API endpoints
├── components/
│   ├── Header.js          # App header
│   ├── Header.css
│   ├── Navigation.js      # Tab navigation
│   ├── Navigation.css
│   ├── EmployeeForm.js    # Add employee form
│   ├── EmployeeList.js    # Employee table
│   ├── EmployeeList.css
│   ├── EmployeeAttendance.js     # Individual employee attendance
│   ├── EmployeeAttendance.css
│   ├── AttendanceForm.js  # Mark attendance form
│   ├── AttendanceRecords.js       # Attendance overview
│   ├── LoadingStates.js   # Loading, error, empty states
│   ├── LoadingStates.css
│   └── Form.css           # Form styling
├── App.js                 # Main app component
├── App.css                # App styling
├── index.js               # React entry point
├── index.css              # Global styles
└── README.md
```

## 🚀 Available Scripts

### Start Development Server
```bash
npm start
```
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `build/` folder.

### Run Tests
```bash
npm test
```
Launches the test runner in interactive watch mode.

## 📡 API Integration

The frontend connects to the FastAPI backend. Ensure your backend has the following endpoints:

### Employee Endpoints
- `GET /employees` - Get all employees
- `POST /employees` - Create new employee
- `GET /employees/{id}` - Get employee by ID
- `DELETE /employees/{id}` - Delete employee

### Attendance Endpoints
- `GET /attendance` - Get all attendance records
- `POST /attendance` - Mark attendance
- `GET /attendance/employee/{employee_id}` - Get employee's attendance records
- `GET /attendance/date/{date}` - Get attendance by date

## 🎨 UI Components

### Form Components
- **EmployeeForm:** Adds new employees with validation
- **AttendanceForm:** Marks attendance with date and status selection

### Display Components
- **EmployeeList:** Shows employees in a professional table
- **AttendanceRecords:** Displays attendance with filtering by date
- **EmployeeAttendance:** Shows individual employee attendance history

### Utility Components
- **Loading:** Loading spinner animation
- **EmptyState:** Friendly empty state messages
- **ErrorMessage:** Error notifications with close button

## 🔐 Assumptions & Limitations

1. **Single Admin User:** No authentication required; assumes trusted admin environment
2. **Date Constraints:** Attendance can only be marked for current or past dates
3. **Unique Employee IDs:** System assumes Employee IDs are unique
4. **Email Format:** Standard email format validation applied
5. **No Role-Based Access:** All users have admin privileges
6. **No Export Features:** Data export functionality not implemented
7. **Browser Compatibility:** Works best on modern browsers (Chrome, Firefox, Safari, Edge)

## 🌍 Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop 'build' folder to Netlify
```

### Environment Variables for Production
Update `.env.production` with your production API URL:
```
REACT_APP_API_URL=https://your-production-backend.com
```

## 🐛 Troubleshooting

### Backend Connection Error
- Ensure backend is running on the configured URL
- Check `REACT_APP_API_URL` in `.env.local`
- Check browser console for CORS errors

### Employee List Not Loading
- Verify backend is running
- Check API endpoint returns correct format
- Look for error messages in browser console

### Form Submission Fails
- Ensure all required fields are filled
- Check email format is valid
- Check backend API response in network tab

## 📝 Form Validation Rules

### Employee Form
- **Employee ID:** Required, alphanumeric
- **Full Name:** Required, text only
- **Email:** Required, valid email format
- **Department:** Required, text only

### Attendance Form
- **Employee:** Required, must be selected from dropdown
- **Date:** Required, cannot be future date
- **Status:** Required, Present or Absent

## 🎯 Bonus Features Implemented

- Date filtering in attendance overview
- Attendance summary for each employee (total, present, absent days)
- Employee attendance details modal with statistics
- Professional dashboard-like interface

## 📞 Support

For issues or questions, please check:
1. Backend is running and accessible
2. API URL is correctly configured
3. Browser console for error messages
4. Network tab in developer tools for API response

## 📄 License

This project is part of a coding assignment for educational purposes.

---

**Version:** 1.0.0  
**Last Updated:** February 2026

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
