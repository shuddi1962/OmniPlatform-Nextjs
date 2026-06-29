import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://krdfdhjzwggsuaqjso.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyd2RmZGhqendnZ3N1YXFhanNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTI3MzksImV4cCI6MjA5ODI4ODczOX0.1yavu3aMaPLDTth18GVBQzEXWo0_r3sm13b_ioDb8Gw";

const supabase = createClient(supabaseUrl, supabaseKey);

const users = [
  {
    email: "admin@omniplatform.demo",
    password: "Demo@1234",
    full_name: "Admin User",
    role: "admin",
  },
  {
    email: "user@omniplatform.demo",
    password: "Demo@1234",
    full_name: "John Doe",
    role: "user",
  },
  {
    email: "manager@omniplatform.demo",
    password: "Demo@1234",
    full_name: "Sarah Manager",
    role: "user",
  },
];

async function createUsers() {
  console.log("Creating demo users...\n");

  for (const user of users) {
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          full_name: user.full_name,
          role: user.role,
        },
      },
    });

    if (error) {
      console.log(`  [FAIL] ${user.email} — ${error.message}`);
    } else {
      console.log(`  [OK]   ${user.email} — User ID: ${data.user?.id}`);
    }
  }

  console.log("\nDone. If email confirmation is enabled in Supabase,");
  console.log("users will need to confirm via the link sent to their inbox.");
  console.log("To disable: Supabase Dashboard > Auth > Providers > Email > Disable confirm email");
}

createUsers();
