# 📝 Next.js Todo List App

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next-auth&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

A Full-Stack Todo List application built with **Next.js**, **React**, **TypeScript**, and **MongoDB**. The project features user authentication, CRUD task management, internationalization, and a clean, responsive design.

---

## 🚀 Features

- **Secure Authentication**: User sign-up and sign-in using NextAuth.js.
- **CRUD Task Management**: Intuitively create, read, update, and delete tasks.
- **User-Specific Tasks**: Each user can only view and manage their own tasks.
- **Mark as Complete**: Functionality to toggle tasks as completed.
- **Additional Descriptions**: Option to add a detailed description to each task.
- **Internationalization (i18n)**: Support for multiple languages (English and Spanish) using `next-intl`.
- **Responsive Design**: User interface that adapts to different screen sizes.
- **Protected Routes**: Middleware to protect dashboard routes and redirect unauthenticated users.
- **Containerized**: Full Docker support for building and running the application in a container.

---

## 🛠️ Technologies Used

- **Framework**: [**Next.js**](https://nextjs.org/) (App Router)
- **UI Library**: [**React**](https://react.dev/)
- **Language**: [**TypeScript**](https://www.typescriptlang.org/)
- **Database**: [**MongoDB**](https://www.mongodb.com/) with [**Mongoose**](https://mongoosejs.com/)
- **Styling**: [**Sass/SCSS**](https://sass-lang.com/) (Modules)
- **Authentication**: [**NextAuth.js**](https://next-auth.js.org/)
- **State Management (Client)**: [**Zustand**](https://zustand-demo.pmnd.rs/)
- **Internationalization**: [**next-intl**](https://next-intl-docs.vercel.app/)
- **Containerization**: [**Docker**](https://www.docker.com/)

---

## 📦 Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js (version 20.x or higher)
- npm or Yarn
- A MongoDB instance (local or cloud-based like MongoDB Atlas)

### Steps

1.  **Clone the repository:**

    ```bash
    git clone <REPOSITORY-URL>
    cd next-todo-list
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the project root and add the following variables:

    ```env
    # Connection URL for your MongoDB database
    MONGODB_URI="mongodb+srv://..."

    # Secret for NextAuth.js (you can generate one with `openssl rand -base64 32`)
    NEXTAUTH_SECRET="your_secret_here"

    # Base URL of your application
    NEXTAUTH_URL="http://localhost:3000"

    # Trust the host when running in a container (for Auth.js)
    AUTH_TRUST_HOST="true"
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 🐳 Running with Docker

This project is fully containerized. Follow these steps to run it using Docker.

### Prerequisites

- Docker installed and running on your machine.
- A `.env.local` file created as described in the installation section above.

### 1. Build the Docker Image

Run the following command in your project's root directory. This command uses Docker's build secrets to securely pass your `.env.local` file to the build process.

```bash
docker build --secret id=dotenv,src=.env.local -t next-todo-app .
```

### 2. Run the Docker Container

Once the image is built, run the container with this command. This command injects the necessary environment variables for the application to run.

```bash
docker run -p 3000:3000 \
  -e MONGODB_URI="your_mongodb_uri_from_env_file" \
  -e NEXTAUTH_SECRET="your_nextauth_secret_from_env_file" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e AUTH_TRUST_HOST="true" \
  --name mi-app-todo \
  --rm \
  next-todo-app
```
*Note: Replace the placeholder values with your actual secrets. The `--rm` flag automatically removes the container when it stops.*

---

## 🎮 How to Use the Application

1.  **Sign Up**: Create a new account on the "Sign Up" page.
2.  **Sign In**: Access your account from the "Sign In" page.
3.  **Dashboard**: Once logged in, you will see your to-do list.
4.  **Add a Todo**: Use the form to add new tasks. You can add a title and, optionally, a description.
5.  **Manage Todos**: Mark tasks as complete using the checkbox or delete them with the corresponding button.
6.  **Settings**: Visit the settings page to manage your profile or preferences (if applicable).
7.  **Change Language**: Use the language selector to switch between English and Spanish.

---

## 📁 Project Structure

The application follows the Next.js App Router structure for a clean and scalable organization.

```
/
├── .next/
├── node_modules/
├── public/ # Static files
├── src/
│   ├── app/ # Routes, pages, and layouts (App Router)
│   │   ├── api/ # Backend API routes
│   │   │   ├── auth/ # Authentication with NextAuth.js
│   │   │   └── todos/ # API for task CRUD
│   │   ├── (auth)/ # Route group for authentication
│   │   ├── dashboard/ # Main user dashboard page
│   │   └── layout.tsx # Main layout
│   ├── components/ # Reusable React components
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── global/
│   ├── lib/ # Libraries and helpers (DB connection)
│   │   └── dbConnect.ts
│   ├── modules/ # Mongoose schemas for MongoDB
│   │   ├── todo.schema.ts
│   │   └── user.schema.ts
│   ├── i18n/ # Internationalization config
│   ├── lang/ # Translation files (JSON)
│   └── middleware.ts # Middleware for protecting routes
├── .gitignore
├── Dockerfile # Configuration for Docker
├── package.json
└── tsconfig.json
```

---

## ⚙️ Core Logic Overview

- **Authentication**: Managed by `NextAuth.js` in `src/app/api/auth/[...nextauth]/route.ts`. The `middleware.ts` intercepts requests to protect routes that require authentication.
- **Todo API**: The routes in `src/app/api/todos/` handle the business logic for creating, reading, updating, and deleting tasks, interacting directly with the database.
- **Data Models**: The `Mongoose` schemas in `src/modules/` define the structure of the `User` and `Todo` documents in MongoDB.
- **Database Connection**: `src/lib/dbConnect.ts` manages an efficient, cached connection to MongoDB.
- **Client-Side State Management**: The `Zustand` hook in `src/components/dashboard/store/` handles the dashboard's UI state, such as the visibility of the description field.

---

## ⌨️ Contributing

Contributions are welcome! If you find a bug, have a suggestion, or want to add a new feature, please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## ✉️ Contact

If you have any questions or comments, feel free to reach out at [emiliod255@gmail.com]
