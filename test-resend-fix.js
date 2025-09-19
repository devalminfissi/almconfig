// Script di test per verificare la correzione della configurazione Resend
require('dotenv').config({ path: '.env.local' });
const { Resend } = require('resend');

console.log('🔍 Test configurazione Resend con NEXT_PUBLIC_RESEND_API_KEY...');
console.log('NEXT_PUBLIC_RESEND_API_KEY:', process.env.NEXT_PUBLIC_RESEND_API_KEY ? '✅ Presente' : '❌ Mancante');

const apiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;
if (!apiKey) {
  console.error('❌ Chiave API non trovata');
  process.exit(1);
}

try {
  const resend = new Resend(apiKey);
  console.log('✅ Istanza Resend creata correttamente con NEXT_PUBLIC_RESEND_API_KEY');
  console.log('API Key:', apiKey.substring(0, 10) + '...');
} catch (error) {
  console.error('❌ Errore nella creazione dell\'istanza Resend:', error.message);
}
