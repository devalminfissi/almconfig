// Script di test per verificare la configurazione email
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Verifica configurazione email...');
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Presente' : '❌ Mancante');

// Test import del servizio email
try {
  console.log('\n🔧 Test import servizio email...');
  const emailService = require('./lib/services/email.ts');
  console.log('✅ Servizio email importato correttamente');
} catch (error) {
  console.log('❌ Errore nell\'import del servizio email:', error.message);

  // Test diretto della chiave API
  console.log('\n🔑 Test diretto chiave API...');
  const { Resend } = require('resend');

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('❌ Chiave API non trovata');
    process.exit(1);
  }

  try {
    const resend = new Resend(apiKey);
    console.log('✅ Istanza Resend creata correttamente');
  } catch (error) {
    console.error('❌ Errore nella creazione dell\'istanza Resend:', error.message);
  }
}
