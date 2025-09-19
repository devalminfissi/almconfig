# Configurazione OAuth Google per ALM Config

## Problema Attuale
L'autenticazione OAuth Google non funziona perché Google non invia il codice di autorizzazione al callback configurato.

## Soluzioni Necessarie

### 1. Configurazione Google Cloud Console

Vai su [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials

**Per l'OAuth Client ID esistente:**

1. Seleziona il tuo OAuth 2.0 Client ID
2. Nella sezione "Authorized redirect URIs", assicurati di avere:
   ```
   http://localhost:3000/
   ```
3. **IMPORTANTE**: Rimuovi qualsiasi altro URI di callback che punta a `/auth/callback`
4. Salva le modifiche

### 2. Verifica Configurazione Supabase

Vai al tuo [Supabase Dashboard](https://supabase.com/dashboard) → Authentication → Providers → Google

Assicurati che:
- **Enabled**: ✅ Sì
- **Client ID**: Il tuo Google OAuth Client ID
- **Client Secret**: Il tuo Google OAuth Client Secret
- **Redirect URLs**: Dovrebbe essere gestito automaticamente da Supabase

### 3. Test del Flusso

Dopo aver configurato correttamente:

1. Apri http://localhost:3000
2. Clicca sul pulsante "Accedi" → "Continua con Google"
3. Dovresti essere reindirizzato a Google per l'autenticazione
4. Dopo l'autenticazione, dovresti essere reindirizzato automaticamente alla home page
5. L'utente dovrebbe essere automaticamente loggato e visibile nel dropdown

### 4. Debug

Se ancora non funziona, controlla:

1. **Console del Browser**: Cerca errori JavaScript
2. **Network Tab**: Verifica che il redirect includa parametri OAuth
3. **Supabase Logs**: Nel Dashboard → Logs → Auth per vedere eventuali errori
4. **Google Cloud Logs**: Per vedere se ci sono problemi lato Google

### 5. Configurazione di Produzione

Quando vai in produzione, dovrai aggiungere l'URL di produzione agli "Authorized redirect URIs" in Google Cloud Console:
```
https://iltuodominio.com/
```

## Note Tecniche

- Stiamo usando il **flusso implicito** di Supabase, non il flusso con codice
- Il redirect avviene direttamente alla home page (`/`)
- L'AuthProvider gestisce automaticamente la sessione utente
- Il wizard store viene aggiornato automaticamente quando l'utente si autentica
