// Servizio email semplificato che usa sempre API routes

export interface QuoteEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  material: string;
  category: string;
  dimensions: string;
  colors?: {
    esterno: string;
    interno: string;
    profili: string;
  };
  glassType: string;
  accessories?: string[];
  notes?: string;
  configurationId: string;
}

export async function sendQuoteNotification(data: QuoteEmailData) {
  // Usa sempre API route per coerenza e sicurezza
  console.log('📧 Invio email notifica con dati:', data);
  
  try {
    const response = await fetch('/api/send-quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('📧 Risposta API:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('📧 Errore API:', errorData);
      throw new Error(errorData.error || 'Failed to send email');
    }

    const result = await response.json();
    console.log('📧 Email inviata con successo:', result);
    return result;
  } catch (error) {
    console.error('📧 Errore invio email tramite API:', error);
    throw error;
  }
}

// Template HTML è ora gestito nell'API route per una migliore separazione delle responsabilità
