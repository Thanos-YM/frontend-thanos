import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 URL과 키를 가져옵니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Supabase 클라이언트 인스턴스를 생성하고 내보냅니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,  // URL에서 토큰 자동 감지 비활성화
  },
});