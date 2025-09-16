// Script di test per verificare la connessione Supabase
const { createClient } = require('@supabase/supabase-js');

// Carica le variabili d'ambiente
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Verifica connessione Supabase...');
console.log('URL:', supabaseUrl ? '✅ Presente' : '❌ Mancante');
console.log('Key:', supabaseAnonKey ? '✅ Presente' : '❌ Mancante');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variabili d\'ambiente mancanti!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('\n🔌 Test connessione...');

    // Test connessione di base
    const { data, error } = await supabase.from('configurations').select('count').limit(1);

    if (error) {
      console.error('❌ Errore connessione:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return;
    }

    console.log('✅ Connessione riuscita!');
    console.log('📊 Risposta:', data);

    // Verifica tabelle
    console.log('\n📋 Verifica tabelle...');

    const tables = ['configurations', 'quote_requests'];
    for (const table of tables) {
      try {
        const { data: tableData, error: tableError } = await supabase
          .from(table)
          .select('*')
          .limit(1);

        if (tableError) {
          console.error(`❌ Tabella "${table}" non accessibile:`, tableError.message);
        } else {
          console.log(`✅ Tabella "${table}" accessibile`);
        }
      } catch (err) {
        console.error(`❌ Errore tabella "${table}":`, err.message);
      }
    }

  } catch (err) {
    console.error('❌ Errore generale:', err.message);
  }
}

testConnection();
