import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  json,
  pgEnum,
  time,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core';

// Enums
export const userStatusEnum = pgEnum('user_status', ['active', 'inactive']);
export const userRoleEnum = pgEnum('user_role', ['admin', 'manager', 'audit', 'user']);
export const showPopupEnum = pgEnum('show_popup', ['0', '1']);

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  status: userStatusEnum('status').default('active'),
  role: userRoleEnum('role').default('user'),
  show_popup: showPopupEnum('show_popup').default('0'),
  password: varchar('password', { length: 255 }),
  client_first_name: varchar('client_first_name', { length: 255 }),
  client_last_name: varchar('client_last_name', { length: 255 }),
  full_name: varchar('full_name', { length: 255 }),
  address: text('address'),
  phone_number: varchar('phone_number', { length: 50 }),
  client_logo: varchar('client_logo', { length: 255 }),
  created_by: varchar('created_by', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Projects table
export const projects = pgTable('project', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  audit_user_id: integer('audit_user_id').references(() => users.id),
  project_name: varchar('project_name', { length: 255 }),
  slug: varchar('slug', { length: 255 }),
  type_of_project: varchar('type_of_project', { length: 255 }),
  client_name: varchar('client_name', { length: 255 }),
  product_name: varchar('product_name', { length: 255 }),
  project_version: integer('project_version'),
  company_logo: varchar('company_logo', { length: 255 }),
  pin_project: varchar('pin_project', { length: 10 }),
  pin_project_date: time('pin_project_date'),
  retailers: json('retailers'),
  brands: json('brands'),
  products: json('products'),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  date_created: timestamp('date_created').notNull().defaultNow(),
});

// Models table
export const models = pgTable('model', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  project_id: integer('project_id').references(() => projects.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  output_file: json('output_file'),
  model_version: integer('model_version'),
  is_default_model: integer('is_default_model'),
  is_model_completed: integer('is_model_completed'),
  is_data_fetched: integer('is_data_fetched'),
  event_id: varchar('event_id', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Model logs table
export const modelLogs = pgTable('model_logs', {
  id: serial('id').primaryKey(),
  model_id: integer('model_id').references(() => models.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  log_data: json('log_data'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Insights table
export const insights = pgTable('project_insights', {
  id: serial('id').primaryKey(),
  project_id: integer('project_id').references(() => projects.id),
  model_id: integer('model_id').references(() => models.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Admin questions table
export const adminQuestions = pgTable('admin_questions', {
  id: serial('id').primaryKey(),
  question: text('question'),
  type: varchar('type', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Insights questions table
export const insightsQuestions = pgTable('insights_questions', {
  id: serial('id').primaryKey(),
  insights_id: integer('insights_id').references(() => insights.id),
  admin_question_id: integer('admin_question_id').references(() => adminQuestions.id),
  question: text('question'),
  type: varchar('type', { length: 255 }),
  is_admin_question: integer('is_admin_question'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Charts table
export const charts = pgTable('charts', {
  id: serial('id').primaryKey(),
  insights_id: integer('insights_id').references(() => insights.id),
  slide_id: integer('slide_id').references(() => insightsQuestions.id),
  chart_name: varchar('chart_name', { length: 255 }),
  chart_data: json('chart_data'),
  chart_type: varchar('chart_type', { length: 100 }),
  is_admin_chart: integer('is_admin_chart'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Notes table
export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  slide_id: integer('slide_id').references(() => insightsQuestions.id),
  note_text: text('note_text'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Takeaways table
export const takeaways = pgTable('takeaways', {
  id: serial('id').primaryKey(),
  slide_id: integer('slide_id').references(() => insightsQuestions.id),
  takeaway_text: text('takeaway_text'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Slide names table
export const slideNames = pgTable('slide_names', {
  id: serial('id').primaryKey(),
  slide_id: integer('slide_id').references(() => insightsQuestions.id),
  slide_name: varchar('slide_name', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Insights filters table
export const insightsFilters = pgTable('insights_filters', {
  id: serial('id').primaryKey(),
  insights_id: integer('insights_id').references(() => insights.id),
  filter_data: json('filter_data'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Global filters table
export const insightsGlobalFilters = pgTable('insights_global_filters', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  filter_data: json('filter_data'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Categories table
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  category_name: varchar('category_name', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Products table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  category_id: integer('category_id').references(() => categories.id),
  product_name: varchar('product_name', { length: 255 }),
  product_code: varchar('product_code', { length: 100 }),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Operators table
export const operators = pgTable('operators', {
  id: serial('id').primaryKey(),
  operator_name: varchar('operator_name', { length: 255 }),
  operator_type: varchar('operator_type', { length: 100 }),
  description: text('description'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Operator nodes table
export const operatorNodes = pgTable('operator_nodes', {
  id: serial('id').primaryKey(),
  operator_id: integer('operator_id').references(() => operators.id),
  node_name: varchar('node_name', { length: 255 }),
  node_type: varchar('node_type', { length: 100 }),
  node_data: json('node_data'),
  position_x: decimal('position_x', { precision: 10, scale: 2 }),
  position_y: decimal('position_y', { precision: 10, scale: 2 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Operator node parameters table
export const operatorNodeParameters = pgTable('operator_node_parameters', {
  id: serial('id').primaryKey(),
  operator_node_id: integer('operator_node_id').references(() => operatorNodes.id),
  parameter_name: varchar('parameter_name', { length: 255 }),
  parameter_value: text('parameter_value'),
  parameter_type: varchar('parameter_type', { length: 100 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Events table
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  start_date: timestamp('start_date'),
  end_date: timestamp('end_date'),
  event_type: varchar('event_type', { length: 100 }),
  is_recurring: boolean('is_recurring').default(false),
  recurrence_pattern: json('recurrence_pattern'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Event TPO table
export const eventTpo = pgTable('event_tpo', {
  id: serial('id').primaryKey(),
  event_id: integer('event_id').references(() => events.id),
  tpo_data: json('tpo_data'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  auditProjects: many(projects),
  models: many(models),
  events: many(events),
  globalFilters: many(insightsGlobalFilters),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.user_id],
    references: [users.id],
  }),
  auditUser: one(users, {
    fields: [projects.audit_user_id],
    references: [users.id],
  }),
  models: many(models),
  insights: many(insights),
}));

export const modelsRelations = relations(models, ({ one, many }) => ({
  user: one(users, {
    fields: [models.user_id],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [models.project_id],
    references: [projects.id],
  }),
  insights: many(insights),
  logs: many(modelLogs),
}));

export const insightsRelations = relations(insights, ({ one, many }) => ({
  project: one(projects, {
    fields: [insights.project_id],
    references: [projects.id],
  }),
  model: one(models, {
    fields: [insights.model_id],
    references: [models.id],
  }),
  questions: many(insightsQuestions),
  filters: many(insightsFilters),
  charts: many(charts),
}));

export const insightsQuestionsRelations = relations(insightsQuestions, ({ one, many }) => ({
  insights: one(insights, {
    fields: [insightsQuestions.insights_id],
    references: [insights.id],
  }),
  adminQuestion: one(adminQuestions, {
    fields: [insightsQuestions.admin_question_id],
    references: [adminQuestions.id],
  }),
  charts: many(charts),
  notes: many(notes),
  takeaways: many(takeaways),
  slideNames: many(slideNames),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.category_id],
    references: [categories.id],
  }),
}));

export const operatorsRelations = relations(operators, ({ many }) => ({
  nodes: many(operatorNodes),
}));

export const operatorNodesRelations = relations(operatorNodes, ({ one, many }) => ({
  operator: one(operators, {
    fields: [operatorNodes.operator_id],
    references: [operators.id],
  }),
  parameters: many(operatorNodeParameters),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  user: one(users, {
    fields: [events.user_id],
    references: [users.id],
  }),
  tpo: many(eventTpo),
})); 