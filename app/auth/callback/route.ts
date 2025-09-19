// Questo callback non è più necessario poiché usiamo il flusso implicito
// Supabase gestisce automaticamente l'OAuth senza callback custom
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { origin } = new URL(request.url)

  // Reindirizza semplicemente alla home page
  // Supabase avrà già gestito la sessione automaticamente
  console.log('OAuth callback accessed - redirecting to home (implicit flow)')
  return NextResponse.redirect(`${origin}/`)
}
