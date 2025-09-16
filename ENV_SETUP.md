# Environment Variables Setup

Create a `.env.local` file in the root of your project with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email service (optional - for quote notifications)
RESEND_API_KEY=your_resend_api_key
```

## How to get Supabase credentials:

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to Settings > API
3. Copy the Project URL and anon/public key
4. Replace the placeholder values above

## Database Setup:

After setting up Supabase, you'll need to run the SQL migrations to create the required tables. The SQL files will be provided in the `/supabase/migrations` directory.
