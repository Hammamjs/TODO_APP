# Todo App

This is a Todo application built with Vue 3, TypeScript, and Vite. The app allows users to manage their tasks efficiently with features like authentication, task categorization, and status updates.

## Features

- User authentication (Sign Up, Sign In, Forgot Password, Reset Password)
- Add, edit, delete, and mark tasks as completed
- Categorize tasks by status
- Responsive design
- Persistent storage using local storage

## Project Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [pnpm](https://pnpm.io/) (for package management)

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:Hammamjs/TODO_APP.git

   ```

2. Navigate to the project directory:

   ```bash
   cd Todo app
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

Development Server

4. To start the development server, run:

   ```bash
   pnpm install
   ```

The app will be available at `http://localhost:5173.`

Build for Production

4. To build the app for production, run:

   ```bash
   pnpm build
   ```

The production-ready files will be in the `dist` directory.

5. Preview Production Build To preview the production build locally, run:

   ```bash
   pnpm preview
   ```

## 🗂️ Project Structure

This project follows a modular structure for scalability and clarity.

See the breakdown below:

<details>
<summary><strong>📁 Project Structure</strong> (Click to expand)</summary>

```text
Todo-app/
├── data/                 # Contains static data files
│   └── todos.json        # Example todos data
├── public/               # Public assets served as-is
│   └── vite.svg          # Vite logo
├── src/                  # Source code
│   ├── api/              # API modules (e.g., fetchTodos.ts)
│   ├── assets/           # Static assets (images, icons, etc.)
│   ├── components/       # Vue components
│   │   └── ui/           # Reusable UI components (buttons, inputs)
│   ├── composables/      # Vue composables (custom hooks)
│   ├── routes/           # Application routes
│   ├── store/            # Pinia or Vuex stores
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility/helper functions
│   └── views/            # Page-level components (e.g., Home.vue, TodoPage.vue)
├── index.html            # Main HTML entry point
├── package.json          # Project metadata and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── README.md             # Project documentation
```

</details>

## contributing

1. Fork the repository
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your message here"
   ```

4. Push to branch

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

## License

This project is licensed under the MIT License. See the **LICENSE** file for details.

## Acknowledgments

```text
Vue.js
```

```text
Vite
```

```text
TypeScript
```

| Package                                                                            | Description                                                               |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **[@regle/core](https://www.npmjs.com/package/@regle/core)**                       | A reactive validation framework for forms and schemas.                    |
| **[@regle/rules](https://www.npmjs.com/package/@regle/rules)**                     | Predefined validation rules for use with `@regle/core`.                   |
| **[@tailwindcss/vite](https://www.npmjs.com/package/@tailwindcss/vite)**           | Tailwind CSS integration plugin for Vite.                                 |
| **[@tanstack/vue-query](https://www.npmjs.com/package/@tanstack/vue-query)**       | Powerful asynchronous data management for Vue apps (React Query for Vue). |
| **[axios](https://www.npmjs.com/package/axios)**                                   | Promise-based HTTP client for browser and Node.js.                        |
| **[pinia](https://www.npmjs.com/package/pinia)**                                   | The official state management library for Vue 3.                          |
| **[tailwindcss](https://www.npmjs.com/package/tailwindcss)**                       | Utility-first CSS framework for rapid UI development.                     |
| **[vue](https://www.npmjs.com/package/vue)**                                       | The progressive JavaScript framework (Vue 3).                             |
| **[vue-router](https://www.npmjs.com/package/vue-router)**                         | Official router for Vue.js for single-page applications.                  |
| **[vue-toast-notification](https://www.npmjs.com/package/vue-toast-notification)** | Lightweight toast notification plugin for Vue 3.                          |
