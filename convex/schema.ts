import { defineSchema, defineTable } from "convex/server";
import { Validator, v } from "convex/values";

// The users, accounts, sessions and verificationTokens tables are modeled
// from https://authjs.dev/getting-started/adapters#models

// business schemas
export const gigSchema = {
  title: v.string(),
  description: v.string(),
  sellerId: v.id("users"),
  subcategoryId: v.id("subcategories"),
  published: v.optional(v.boolean()),
  clicks: v.number(),
};

export const gigMediaSchema = {
  storageId: v.id("_storage"),
  format: v.string(),
  gigId: v.id("gigs"),
};

export const categoriesSchema = {
  name: v.string(),
};
export const subCategoriesSchema = {
  categoryId: v.id("categories"),
  name: v.string(),
};

export const languageSchema = {
  language: v.string(),
  userId: v.id("users"),
};

export const countrySchema = {
  countryName: v.string(),
  userId: v.id("users"),
};
export const offerSchema = {
  gigId: v.id("gigs"),
  title: v.string(),
  description: v.string(),
  tier: v.union(
    v.literal("Basic"),
    v.literal("Standard"),
    v.literal("Premium")
  ),
  price: v.number(),
  delivery_days: v.number(),
  revisions: v.number(),
  stripePriceId: v.string(),
};

export const orderSchema = {
  offerId: v.id("offers"),
  gigId: v.id("gigs"),
  buyerId: v.id("users"),
  fulfillmentStatus: v.string(),
  fulfilmentTime: v.optional(v.number()),
};
export const userFavoriteSchema = {
  userId: v.id("users"),
  gigId: v.id("gigs"),
};

// business schemas

export const userSchema = {
  email: v.string(),
  name: v.optional(v.string()),
  emailVerified: v.optional(v.number()),
  image: v.optional(v.string()),
  stripeAccountId: v.optional(v.string()),
  stripeAccountSetupComplete: v.optional(v.boolean()),
};

export const sessionSchema = {
  userId: v.id("users"),
  expires: v.number(),
  sessionToken: v.string(),
};

export const accountSchema = {
  userId: v.id("users"),
  type: v.union(
    v.literal("email"),
    v.literal("oidc"),
    v.literal("oauth"),
    v.literal("webauthn")
  ),
  provider: v.string(),
  providerAccountId: v.string(),
  refresh_token: v.optional(v.string()),
  access_token: v.optional(v.string()),
  expires_at: v.optional(v.number()),
  token_type: v.optional(v.string() as Validator<Lowercase<string>>),
  scope: v.optional(v.string()),
  id_token: v.optional(v.string()),
  session_state: v.optional(v.string()),
};

export const verificationTokenSchema = {
  identifier: v.string(),
  token: v.string(),
  expires: v.number(),
};

export const authenticatorSchema = {
  credentialID: v.string(),
  userId: v.id("users"),
  providerAccountId: v.string(),
  credentialPublicKey: v.string(),
  counter: v.number(),
  credentialDeviceType: v.string(),
  credentialBackedUp: v.boolean(),
  transports: v.optional(v.string()),
};

const authTables = {
  users: defineTable(userSchema).index("email", ["email"]),
  sessions: defineTable(sessionSchema)
    .index("sessionToken", ["sessionToken"])
    .index("userId", ["userId"]),
  accounts: defineTable(accountSchema)
    .index("providerAndAccountId", ["provider", "providerAccountId"])
    .index("userId", ["userId"]),
  verificationTokens: defineTable(verificationTokenSchema).index(
    "identifierToken",
    ["identifier", "token"]
  ),
  authenticators: defineTable(authenticatorSchema)
    .index("userId", ["userId"])
    .index("credentialID", ["credentialID"]),
};
const businessTables = {
  gigs: defineTable(gigSchema)
    .index("by_sellerId", ["sellerId"])
    .index("by_subcategoryId", ["subcategoryId"])
    .index("by_published", ["published"])
    .searchIndex("search_title", {
      searchField: "title",
    }),
  gigMedia: defineTable(gigMediaSchema)
    .index("by_gigId", ["gigId"])
    .index("by_storageId", ["storageId"]),

  categories: defineTable(categoriesSchema),

  subcategories: defineTable(subCategoriesSchema)
    .index("by_category", ["categoryId"])
    .index("by_name", ["name"]),

  languages: defineTable(languageSchema).index("by_userId", ["userId"]),

  countries: defineTable(countrySchema).index("by_userId", ["userId"]),

  offers: defineTable(offerSchema)
    .index("by_gigId", ["gigId"])
    .index("by_tier", ["tier"])
    .index("by_gigId_tier", ["gigId", "tier"]),

  orders: defineTable(orderSchema)
    .index("by_buyerId", ["buyerId"])
    .index("by_gigId", ["gigId"]),

  userFavorites: defineTable(userFavoriteSchema)
    .index("by_gig", ["gigId"])
    .index("by_user_gig", ["userId", "gigId"])
    .index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...businessTables,
  numbers: defineTable({
    value: v.number(),
  }),
});
