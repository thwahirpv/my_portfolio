"use server";

import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

export async function submitMessage(formData: { name: string; email: string; message: string }) {
    try {
        const { name, email, message } = formData;

        if (!name || !email || !message) {
            return { error: "All fields are required." };
        }

        // 0. Validate Env Vars
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Missing email credentials in .env.local");
        }

        // 1. Send Email Notification directly (No DB storage)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            replyTo: email, // This allows you to reply directly to the user
            subject: `New Portfolio Contact from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 2px solid #ccc; padding-left: 10px; color: #555;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
      `,
        };

        await transporter.sendMail(mailOptions);

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error submitting message:", error);

        const msg = error instanceof Error ? error.message : String(error);

        if (msg.includes("Missing credentials") || msg.includes("Username and Password not accepted")) {
            return { error: "Email configuration error. Check .env.local" };
        }

        return { error: "Something went wrong. Please try again later." };
    }
}
