// import { v } from "convex/values";
// import { mutation } from "./_generated/server";

import { v } from "convex/values";
import { mutation } from "./_generated/server";

// export const CreateNewUSer = mutation({
//   args: {
//     name: v.string(),
//     email: v.string(),
//     pictureURL: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const users = await ctx.db.query("users")
//       .filter((q) => q.eq(q.field("email"), args.email))
//       .collect();
//     console.log(users)
//     if (!users[0]?.email) {
//       const result = await ctx.db.insert("users", {
//         name: args.name,
//         email: args.email,
//         pictureURL: args.pictureURL,
//         credits: 3,
//       });
//       return result;
//     }

//     return users[0];
//   },
// });

export const CreateNewUSer = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    pictureURL: v.string(),
  },
  handler: async (ctx, args) => {
    // if not user 
    const user = await ctx.db.query("users")
      .filter((q) => q.eq(q.field("email"), args.email)).collect();

    if (!user[0]?.email) {
      const userData = {
        name: args.name,
        email: args.email,
        pictureURL: args.pictureURL,
        credits: 3,
      }
      // if not a record insert it
      await ctx.db.insert("users", userData);
      return userData
    }
    return user[0];
  }
})
