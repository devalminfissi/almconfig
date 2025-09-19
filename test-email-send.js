// Script di test per inviare una mail di prova
const { sendQuoteNotification } = require('./lib/services/email.ts');

async function testEmailSend() {
  try {
    console.log('🚀 Invio mail di prova a italiagofood@gmail.com...');

    const testData = {
      customerName: 'Mario Rossi',
      customerEmail: 'mario.rossi@example.com',
      customerPhone: '+39 333 123 4567',
      material: 'PVC',
      category: 'finestra',
      dimensions: '120x150 cm',
      glassType: 'doppio vetro temperato',
      colors: {
        esterno: 'Bianco RAL 9010',
        interno: 'Bianco RAL 9010',
        profili: 'Bianco RAL 9010'
      },
      accessories: ['Maniglia ergonomica', 'Zanzariera', 'Serratura di sicurezza'],
      notes: 'Cliente interessato a preventivo urgente per sostituzione finestre esistenti. Preferisce appuntamento in serata.',
      configurationId: 'TEST-2025-001'
    };

    const result = await sendQuoteNotification(testData);
    console.log('✅ Mail inviata con successo!');
    console.log('📧 Risultato:', result);

  } catch (error) {
    console.error('❌ Errore nell\'invio della mail:', error.message);
    console.error('📋 Dettagli errore:', error);
  }
}

testEmailSend();
