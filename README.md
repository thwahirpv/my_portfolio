# Hey there! 👋 Welcome to My Portfolio

Thanks for checking out the code behind my personal portfolio website. I built this project not just to showcase my work, but to demonstrate my ability to build modern, full-stack applications that look good and function smoothly.

It's more than just a static page—it's a fully dynamic application with a custom Admin Dashboard that lets me update my projects and skills without touching a line of code.

## 🛠️ The Tech Stack

I chose a stack that balances performance, developer experience, and scalability:

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router) - For that fast, server-side rendered goodness.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) - Because types save lives (and time).
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - For rapid, beautiful UI development.
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) - To give everything that "premium" feel.
*   **Database**: [Neon](https://neon.tech/) (Serverless Postgres) - Fast, scalable, and easy to manage.
*   **ORM**: [Drizzle](https://orm.drizzle.team/) - Lightweight and type-safe database interaction.
*   **Auth**: [NextAuth.js](https://next-auth.js.org/) - Secure login for the admin panel.
*   **Emails**: [Nodemailer](https://nodemailer.com/) - For the contact form (direct-to-inbox).
*   **Media**: [Cloudinary](https://cloudinary.com/) - Hosting project images and icons.

## ✨ Cool Features

1.  **Admin Dashboard**: A protected area where I can add, edit, or delete projects and skills. No more hardcoding text!
2.  **Glassmorphism UI**: I went for a modern, dark-themed aesthetic with subtle glows and blurs.
3.  **Direct Contact Form**: Messages sent via the site land strictly in my email inbox. No database clutter.
4.  **Smart Reply-To**: When I hit "Reply" to a contact form email, it automatically addresses the person who sent it.
5.  **Responsive**: Looks great on everything from a massive monitor to a mobile phone.

## 🚀 How to Run It Locally

If you want to spin this up on your own machine to play around with it:

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/yourusername/my_portfolio.git
    cd my_portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory. You'll need credentials for Neon DB, Cloudinary, and NextAuth.
    *(Check `env.example` if I added one, otherwise you know the drill!)*

4.  **Run the dev server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) and take a look!

## 📄 License

Feel free to use this code for inspiration or learning!

---
*Built with ❤️ (and a lot of coffee).*
