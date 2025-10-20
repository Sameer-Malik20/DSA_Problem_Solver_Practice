# CodeMaster - DSA Problem Solving Platform

A premium, full-stack MERN application for practicing Data Structures and Algorithms with company-wise interview questions, built-in code editor, and progress tracking.

![CodeMaster](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 🎯 **Real LeetCode Problems** - 50+ actual problems fetched from LeetCode's public API
- 🔌 **API Integration** - Fetch problems dynamically with real data
- 🏢 **Company-Wise Questions** - Practice problems from top tech companies (Google, Amazon, Microsoft, etc.)
- 💻 **Premium Code Editor** - Monaco Editor with syntax highlighting and multi-language support
- 📊 **Progress Tracking** - Detailed statistics and submission history
- 🎨 **Modern UI/UX** - Premium design with smooth animations and transitions
- 🌙 **Dark/Light Theme** - Toggle between themes for comfortable coding
- 🔐 **User Authentication** - Secure JWT-based authentication
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Real-time Code Execution** - Submit and test your solutions instantly

## 🛠️ Tech Stack

### Frontend
- **React** (with Vite)
- **Tailwind CSS** - Utility-first styling
- **Monaco Editor** - VSCode-like code editor
- **React Router** - Client-side routing
- **Axios** - API calls
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
cd dsa-platform
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file with the following:
PORT=5000
MONGO_URI=mongodb://localhost:27017/dsa-platform
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development

# Seed the database with REAL LeetCode problems (Recommended)
npm run seed:api

# OR use sample data (faster for testing)
npm run seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## 📁 Project Structure

```
dsa-platform/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Problem.js            # Problem model
│   │   ├── Company.js            # Company model
│   │   └── Submission.js         # Submission model
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── problems.js           # Problem routes
│   │   ├── companies.js          # Company routes
│   │   ├── submissions.js        # Submission routes
│   │   └── user.js               # User routes
│   ├── middleware/
│   │   └── auth.js               # Auth middleware
│   ├── utils/
│   │   └── generateToken.js     # JWT token generation
│   ├── seed/
│   │   └── seed.js               # Database seeding script
│   ├── .env                      # Environment variables
│   ├── server.js                 # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── ProblemCard.jsx   # Problem card component
│   │   │   ├── CompanyCard.jsx   # Company card component
│   │   │   ├── StatCard.jsx      # Statistics card
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── ProblemsPage.jsx  # Problems list
│   │   │   ├── ProblemDetail.jsx # Problem detail with editor
│   │   │   ├── CompaniesPage.jsx # Companies list
│   │   │   ├── Dashboard.jsx     # User dashboard
│   │   │   ├── Login.jsx         # Login page
│   │   │   └── Register.jsx      # Registration page
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Authentication context
│   │   │   └── ThemeContext.jsx  # Theme context
│   │   ├── utils/
│   │   │   └── api.js            # API utility functions
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

## 🎮 Usage

### For Users

1. **Register/Login** - Create an account or sign in
2. **Browse Problems** - Filter by difficulty, category, or company
3. **Solve Problems** - Use the built-in code editor to write solutions
4. **Submit Solutions** - Test your code and get instant feedback
5. **Track Progress** - Monitor your improvement in the dashboard

### Sample Problems Included

- Two Sum (Easy - Array)
- Valid Parentheses (Easy - Stack)
- Reverse Linked List (Easy - Linked List)
- Maximum Subarray (Medium - Dynamic Programming)
- Longest Substring Without Repeating Characters (Medium - String)
- Binary Tree Inorder Traversal (Easy - Tree)
- LRU Cache (Medium - Design)
- Merge K Sorted Lists (Hard - Linked List)
- Word Ladder (Hard - Graph)
- Clone Graph (Medium - Graph)

### Sample Companies

- Google
- Amazon
- Microsoft
- Meta (Facebook)
- Apple
- Netflix

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Problems
- `GET /api/problems` - Get all problems (with filters)
- `GET /api/problems/:slug` - Get problem by slug
- `GET /api/problems/random/problem` - Get random problem

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:slug` - Get company by slug

### Submissions
- `POST /api/submissions` - Submit solution (protected)
- `GET /api/submissions/user/:userId` - Get user submissions (protected)

### User
- `GET /api/user/profile` - Get user profile (protected)
- `GET /api/user/stats` - Get user statistics (protected)

## 🎨 Features in Detail

### Code Editor
- Multi-language support (JavaScript, Python, Java, C++)
- Syntax highlighting
- Auto-completion
- Dark/Light theme support
- Starter code templates

### Problem Filtering
- Filter by difficulty (Easy, Medium, Hard)
- Filter by category (Array, String, Tree, Graph, etc.)
- Search by title or tags
- Filter by company

### User Dashboard
- Total problems solved
- Breakdown by difficulty
- Progress visualization
- Recent activity
- Submission history

## 🌐 MongoDB Setup

### Local MongoDB
Make sure MongoDB is running on your machine:
```bash
mongod
```

### MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGO_URI` in `.env` file

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- CORS enabled
- Input validation

## 🚧 Future Enhancements

- [ ] Real code execution engine (Docker containers)
- [ ] Discussion forums for each problem
- [ ] Video solutions
- [ ] Contest mode
- [ ] Leaderboard
- [ ] Email verification
- [ ] Social login (Google, GitHub)
- [ ] Code sharing and collaboration
- [ ] Interview preparation roadmaps
- [ ] Mock interviews

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for developers preparing for technical interviews

## 📧 Support

For support, email sameermalik63901@gmail.com or open an issue in the repository.

---

**Happy Coding! 🚀**
