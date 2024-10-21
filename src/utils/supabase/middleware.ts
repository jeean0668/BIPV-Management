import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SupabaseClient, User } from '@supabase/supabase-js';

interface UpdateSessionResult {
  user: User | null;
  supabaseResponse: NextResponse;
  supabase: SupabaseClient<any, "public", any>;
}

export async function updateSession(request: NextRequest): Promise<UpdateSessionResult | NextResponse> {
  let supabaseResponse = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next();
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // 유저가 없는 경우 /login 또는 /auth 이외의 경로로 접근하려고 할 때 리다이렉트
  if (!user && !pathname.startsWith('/api/auth') && !pathname.startsWith('/login')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';

    // 여기서 다시 /login으로 리디렉션되지 않도록 예외처리
    if (pathname !== '/login') {
      return NextResponse.redirect(url);
    }
  }


  // // 유저가 없는 경우 /login 또는 /auth 이외의 경로로 접근하려고 할 때 리다이렉트
  // if (!user && !pathname.startsWith('/api/auth') && !pathname.startsWith('/login')) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/login';
  //   return NextResponse.redirect(url);
  // }

  // 유저가 있는 경우 /login 경로로 접근을 차단
  if (user && 
     pathname.startsWith('/login')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // /auth/error 또는 /login/email-auth 경로에 직접 접근하는 것을 차단
  if ((pathname === '/error' || pathname === '/login/email-auth') && !request.headers.get('referer')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}