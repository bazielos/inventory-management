import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY) {
	throw new Error('Missing Supabase environment variables');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY,
	{
		auth: {
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: true,
		},
		db: {
			schema: 'public',
		},
		headers: {
			'x-timezone': 'Asia/Jerusalem',
		},
	}
);
