
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  headline: text("headline"),
  bio: text("bio"),
  position: text("position"),
  avatarUrl: text("avatar_url"),
  resumeUrl: text("resume_url"),
});

// ... existing profile table
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: integer("position").notNull().default(0),
  iconUrl: text("icon_url"),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  imageUrl2: text("image_url_2"),
  imageUrl3: text("image_url_3"),
  liveDemoUrl: text("live_demo_url"),
  repoUrl: text("repo_url"),
  techStackTags: text("tech_stack_tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
});


