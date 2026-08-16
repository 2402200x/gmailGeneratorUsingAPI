# AI Cold Mail Generator 📩

A full-stack web app that helps you write personalized cold emails without starting from a blank page.

You give it a few details about the person/company you're reaching out to, and the app uses AI to generate a professional **email, subject line, LinkedIn message, and follow-up** for you.

I built this project to explore how AI can be combined with a MERN-style application to make everyday professional outreach a little easier.

## ✨ What it can do

* Create personalized cold emails using AI
* Generate email subject lines
* Generate LinkedIn messages
* Generate follow-up emails
* User signup and login
* Email verification using OTP
* JWT-based authentication
* Save generated emails to your history
* MongoDB database for storing users and email history
* Responsive React frontend

## 🛠️ Tech Stack

**Frontend**

* React
* Vite
* Tailwind CSS
* React Router
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Nodemailer

**AI**

* Groq API
* Llama 3.3 70B

## 📁 Project Structure

```text
gmailGeneratorUsingAPI/
│
├── client/
│   └── ai-cold-male-generator/
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   ├── pages/
│       │   └── utils/
│       └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── modles/
│   ├── routers/
│   ├── utils/
│   └── server.js
│
├── package.json
└── .gitignore
```

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/2402200x/gmailGeneratorUsingAPI.git
cd gmailGeneratorUsingAPI
```

Install the dependencies:

```bash
npm run install-all
```

Create a `.env` file inside the `server` folder and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

Then start the project:

```bash
npm run dev
```

The frontend and backend will start together.

## 🔄 How it works

The basic flow is pretty simple:

```text
User enters details
        ↓
React frontend
        ↓
Express API
        ↓
Groq AI
        ↓
Personalized email content
        ↓
Saved to MongoDB
        ↓
Displayed to the user
```

The authentication system also handles signup, OTP verification, login, and JWT-based protected routes.

## 📌 Why I built this

Cold emailing can be surprisingly time-consuming, especially when you want every message to feel personalized rather than copied from a template.

This project was built as a way to experiment with:

* AI API integration
* Full-stack authentication
* REST APIs
* MongoDB
* Email services
* React state management
* Connecting an AI model to a real-world application

## 🔮 Things I'd like to add

There are still a few things I'd like to work on, such as:

* Direct Gmail integration
* Sending emails directly from the app
* Better personalization using resumes/job descriptions
* Email scheduling
* More customization for writing tone
* Email analytics
* Better deployment and production setup

## 👩‍💻 Author

**Anchal**

GitHub: https://github.com/2402200x

---

If you find the project interesting, feel free to explore the code or suggest improvements!
