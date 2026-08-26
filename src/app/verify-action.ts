'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

export async function verifySisterPassword(password: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('app_config')
      .select('value')
      .eq('key', 'sister_password')
      .single();
      
    let correctPassword = 'thuduyen';
    
    if (!error && data && data.value) {
      correctPassword = data.value;
    }
    
    return password.toLowerCase() === correctPassword.toLowerCase();
  } catch (error) {
    return password.toLowerCase() === 'thuduyen';
  }
}
