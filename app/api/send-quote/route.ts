import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { QuoteEmailData } from '@/lib/services/email';

// Inizializza Resend lato server seguendo la documentazione Resend
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

// Genera HTML per l'email (stessa funzione del servizio email)
function generateQuoteEmailHTML(data: QuoteEmailData): string {
  const accessoriesList = data.accessories && data.accessories.length > 0
    ? data.accessories.map(acc => `<li>${acc}</li>`).join('')
    : '<li>Nessun accessorio selezionato</li>';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nuova Richiesta Preventivo</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: white; }
        .header { background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 30px 20px; text-align: center; position: relative; overflow: hidden; }
        .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz4KPHBhdGggZD0iTTEwMCA1MEM3NS41IDUwIDUwIDc1LjUgNTEgMTAwQzUxIDEyNC41IDc1LjUgMTUwIDEwMCAxNTBDMTI0LjUgMTUwIDE1MCAxMjQuNSAxNTAgMTAwQzE1MCA3NS41IDEyNC41IDUwIDEwMCA1MFoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+') center/cover; }
        .logo { width: 120px; height: auto; margin-bottom: 15px; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header p { margin: 5px 0 0 0; opacity: 0.9; font-size: 16px; }
        .content { padding: 30px 20px; background: #f8fafc; }
        .section { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-left: 4px solid #3b82f6; }
        .section h3 { margin: 0 0 15px 0; color: #1f2937; font-size: 18px; font-weight: 600; }
        .customer-info { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
        .customer-info div { background: #f1f5f9; padding: 12px; border-radius: 6px; border-left: 3px solid #3b82f6; }
        .customer-info strong { color: #374151; display: block; margin-bottom: 4px; }
        .notes { background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0; }
        .config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
        .config-item { background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; }
        .config-item strong { color: #374151; }
        .actions { background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0; }
        .actions ul { margin: 0; padding-left: 20px; }
        .actions li { margin-bottom: 8px; color: #065f46; }
        .footer { background: #1f2937; color: white; padding: 25px 20px; text-align: center; margin-top: 30px; border-radius: 8px; }
        .footer p { margin: 5px 0; opacity: 0.9; }
        .company-info { border-top: 1px solid rgba(255,255,255,0.1); margin-top: 20px; padding-top: 20px; }
        @media (max-width: 600px) {
          .container { padding: 10px; }
          .header, .content, .footer { padding: 20px 15px; }
          .customer-info { grid-template-columns: 1fr; }
          .config-grid { grid-template-columns: 1fr; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="background: white; padding: 20px; border-radius: 12px; display: inline-block; margin-bottom: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAAA8CAYAAABVTYVfAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfpCREQDi3fUGDqAAARH0lEQVR42u1ca3BU1Zb+9nn0uzsJSZP3gwBXQWWACQ9FMgQsEQsF5eEoCtxSSypqRZFbMgPOL8mUFl4sZHRUGNTLyGgFEEwIEQRGAgaL+GTuXBDSCXl1kk46/X6cx54fgYY26XM60Eac6q/q/Ohz9tl79/r2Wmettdc5QBL/b0CSIri58NVf/wqX0wmdXg+O51F2xx1x38vFurC4uhoawrDHurueDEnybQDkpKh/fSw89TWjZ5kfHsvP/6AzFB6WzGOS2eEPQAY1eQTxqaAkTQNJKvFIQQa788/z5v3HPwGwWq2WcDg8SqPReDiO66WUwm63D3kfE6vD3lAI/eFwmkRpZlK8IwuWMK2kvBwf5uQUi6K4QBTFCZIklcmyPMlut6OkpGR4ZHpEAQFJypKB1KR4RwiUggDgCGml77wDWZZvCwQCk3w+39hQKDSVUjohMzPT3N7ePjwyXYKAkCTnU0qNSSmPHAgQ5himoxjgCSEUAM9xXD4ADSHETQjRUUrjJ/OEw4FQIAiR0jEywCZFPIJkEuLjCbE7q2sEAAGtVvutTqfbxvP8GVmWNZIk9ZMY/suQZB44dw547TVIlI65PEJSyiMEBnDrGKY3rbERABo0Gs0lQsgfOI7rIIScoJQKDz/8cCytHowF+w9AzzKa2k77/oAo3heTzBjqnsT1Q8uyjbelpNzDgPR3P/oSZMjol/sZPdHLANBDe2LeO2Ro0uH3g4KaZUpzYt5JKRhCYOJ5kKTmJgw6RnKKwe1ad+hcGvvvHFgAVjIauKw3JpihY7R+r+gNta5pVSezXxBAgAyJ0tFKA4+zWPBO6WykajRI6uiNgyUsqn7+S8m/nvmyjiHMUCIlDIhs4VI2+ERvbVya6REEaFk2h1JqUdLMMRYLZmVlQcsmfaRE4YP/saXKspQqE2nI6wxh/SA0wLMaBBCIvhZLM8OyXCADeqWBx5jNSSITCEES0OS2XdZBMvgAwBDi0jDaDiM7OGIcRObuc+cgezwQKR1DYyXiLzs+xRZzkoEEwiN40OptVWxDwPSYOGOvhbeok3mktQ103UsQZVkxLGFZFsUWS5KBBKI30Ituv7fiXhZDmLYCfYEnQ5ehTuZFtxtz931mkCgtUAo9TByHfJMpyUAC0eHrQH+4X0EtCVjCthzZfSQ8IXWCOpndwSDswUCKDOQoDTxKp0WWXj+syVJKYx432s/14teaz/XMqdnTAr/ojzUIAIAlbBP+AVhxy2ODmgzyZl3hMFiGWGVK0xVmj2y9AWla7bAm+9lnn2Hv3r1gGCZKEI8++igWLFgQdz+1tbXYvXs3GIaBLMtYuHAhHnnkussi02az4fXXX4ffPyBEi8WCtWvXori4OO4+2trasHnzZjidThBCoNFosG7dOtxyyy3DmkuTqwmQacyMOQGROMI1azRalI0tUyfTLQrQs1yuTKmiDS0wm2Dg+bgn6vF4sG3bNhw9enTQNafTiTlz5kAfp6afPXsWu3btivzOzs6+bjIdDgd2794Nt9sdOSeKIrZu3QqNRqN6vyiKePPNN7F169bIOYPBgCeeeGJYZMpUHiDzMm0xyPTxhG81cUb0IaRsZgVK4QmFIVJaRAFFtSu2WMAOI/Nz+vRpfPPNN0NeO3nyJL777jvcLNi1axf27dsXV9tDhw5hx44dNzxmQAygxdOi2IYhjFPLauxDhSWDyPy3H34E7HaIslxMgaE9WUoBQlBsjt+TlWUZe/bsgdfrjZzjr9Fqp9OJffv23TRk+nw+VFZWwmazKbZrb2/Hpk2b4HK5bnhMZ8iJDl+HsicLpsvCWZwpmlR1Mk91duDV++azEqVFSp6sjuNQZI7fk21qakJdXV3kt9lsxsqVK6PManV1NVpbW28aQr///nu88cYbCIfDQ16XJAlbt25FQ0NDQsbr8nejN9irppmtd6Xf6csxZKuT2eLx4kB7u1GiNF+p01SNBrnG+Pesa2tro1b55MmT8fLLL2PixImRc+fPn8eRI0duGjIB4KOPPkJ1dfWQ1w4fPoz3338/YWO1elrhFbyxGwyEJc3vn94uTc+ark5mXzgMZ1hQrvuhFFa9Dhk6XVyTdLvd2LNnT9S5hx56COPHj8eiRYsi52RZRlVVVcSrvBng8XhQWVmJlpboZ1lnZydeffVVOJ3OhI1lc9sgykJMmRMALGGaYAXmF81XJ9MtCAhIUqYMpCkNnG80wRyHpwcADQ0NOHPmTOR3QUEB7r//fgDAgw8+iMzMq+vm1KlT+Pbbb39TAtPT0zF69NXNosbGRmzZsgWCMCBoSZLw1ltv4eTJk1H3WK3WGxq3yXVxYJuLxPRkwzzhWwycEbMLZsdHZkhWr/spijPBfkXbfD5f5Ny9996LcePGAQAmTpyIsrKr8VJ/fz/27t37m5I5duxYVFRURIUlO3fuRG3twI7T0aNH8d5770WusSyL8vJy3Hrrrdc9ZlgKw+ZWdrYIGA/PaNqMXGxqImQ2+3wIBIMQZbmIxqqnvezJjo0zwX7hwgV88cUXkd8GgwFLly4Fe3kh8DyPZcuWRQmupqZmkFkbaaxcuRILFy68usjdblRWVqKxsRGbNm1Cb+9VR2Xu3Ll4+umnoxIhw4Un7EGbt02xDUNIr57VdZs4kzqZ7//4E/DFYYiUxg5LAHAMgzFxJtgPHjwYRUxJSQlmzpwZ1aa0tBSTJk2KWgCHDx/+zYiklCI1NRUbNmxAQUFB5PyZM2ewYsWKKPNqtVqxYcMGWK1WyPL1F/w7gg50BZQT7ARMZxqf5krlU9XJ/L6nB4+Ur+ElSgsVE+w8j3yjelgylMlcsmQJUlJSos5lZGRg8eLFiqZ5pCFJEqZOnYq1a9eC47jIuXPnzkEUxUi7NWvWoLS09IaIBIB2bwdcIZeikWUJe+nArP2BInOhOpkdfj/+5nabJUrzlAYeqdUi06Cedvv666/ROFBhBgAoKiqKmX9dtGgRsrOzY977W2H16tURZ+2XuPvuu1FeXg5CyA0l+gGgxdOMgBSIZSsAArCEteV9mk/nFM6J2U/k2egMh0EI0mVKrQo2CDkG9QS7JEmDwoz58+cjLy8Ply5dGvTn9Xo9pkyZgs7OTgBXw5nZs2fHVSzmdrvR2tqqqCGUUqSkpCAtLS1uIaekpGDDhg24dOkSent7I8QZDAZs3LgRWVlZCVk0VxPsZGguCaEcw9pgJKj4+wp1Mt0DdT/ZMqUpSgMXmk0wcJzi5H7++eeo557RaMSyZcvg8XiwatUqXLhwIeIEUUpBCEF/f39UH7W1tXjxxRdRVFQEQRAgCAIIIUMm43fv3o1Dhw4pzkkURTz33HNYv349AoEAKKXQ6XSqi6WkpAQHDx5EKBSKkMnzfFRIdSOITrDHMrIkwIJtMXMmeOBRJ9MlCEgjpFCt7qfYYgGjIoCamppo1Ny0adMwbdo0mM1mTJgwAcePH1f9kxcuXEBdXR2eeeYZ7NmzB2+//Tb0ej02b94cWQjXaua1ux6x4HK5cPHiRbzwwgvo7+/H6tWrMXnyZMV7GIaJegQkGn7Br5pgJ4S4tYy2U8NoFMlkAODzlhZIXu+Vuh9mSLeKUoBhVBPsfX19qKqqijq3ZMkSWCwWEEKwdOlSmM3qoQ2lFJ9++ikCgQBaW1tx4sQJfPXVV+jv77/uOl1CCLxeL+rr61FfX4+mpib81nCGnOj0d6ol2HuMnNFh5pVlzwFAbVMT6EtrYd6x43Ldz9CN9SyLQpUEu8/nQ1lZWSQEMRqNUWm76dOn45VXXkF7e7tibEYphdlshsfjwbRp01BRUQGtVovc3FxIkoSKiophxXaSJGHWrFmwWq0oLy+H1+vFrFmzkJmZiWeffTZiegsLC6Ed5qY7z/NYvnw5pk6dGtmczs3Njeteu9+O3mCfYhuWMB35hnxPmIZxHucUzDGAsr37wAD6Uw5HdUCS5sba+so2GHD8wQfwh9RURRKuaMGNIpF93azYe2Evlh96BJIsxoztDYz+Xf8/+9f88b/+iJ3371Q2s93BIDqCAYukVPdDKUbr9UhXSbATQhIm/ET2dbPC5rZBksSYMh/QTNaGfwEWFC9QN7MuQQBDVOp+AOSbjDAPo1QkHs274s3+Ml67QuJQbSilkGV5UPtrHaNrF4EkSVFhC8uyg+qQJEmK6o/juJhzSCQuui5emXAM00kkjuFsvFaD5bcuVyfTIwjQs2yurPQ6AoAxZgs0Caxgb2xsxK5duyIpsfPnz2PLli0oLS3Ffffdh1GjRiEYDOK1117DvHnzMHv2bAQCAVRWVkIQBOTm5kKWZQiCgHHjxuGBBx7Atm3boNPpsGbNGgDA8ePHUV1djby8vAgxLpcLK1aswPjx4yGKIt599110dXUhPX1gLQcCARgMBjz55JMwGo346aefsH37dqxfvx45OTkJ+/8hKQSbu1nZOoH4eYZvNXEmOKH8bGUopXCFwwhTuTBm3c+VUpEEV7C3tbXh888/j5ST9PT0oK6uDl9++SWef/557Ny5E52dnThy5Aiamwf+tCAIqKurg81mg9lsxtixY7Fq1SrMmzcPhBDU19dH7f7/+OOPOH36NPx+P/x+P3w+H+x2e6TUQxAEHDt2DM3NzQgEAvD7/fB4POjo6IhUGdjtdhw4cAAejyeh/98ddqNdNcHOODWM1m5kDar9ce+cPQs4HBBzchKWYL8Rs2symbBx40Z4PB588sknqKmpQXNz8yCzaDKZMHr0aKSnpyMjIyNSdvlLZGVlobS0FCaTKWKeGxoaMGnSJJSUlEAQhIgXajAMCMzn82H//v1YuXLlsDJGw4Uj4EB3oEclLCFdJtbUx8TxySY2ZdFiPD/575jazs6nBFm+LRaZKRoNnr/9NmQbE/eJA0IIrFYrZsyYEcnGpKWlYfr06SgsLMScOXNwxx13IDs7GzNnzkRmZmbE9V+wYAHmzp2LvLy8qOcYy7K4/fbbI2WODocDXq8XGo0GHMeB4zhMmTIlYsYlSYLdbo9kdliWhdFoxD333IOZM2dGtucyMjIwY8aMCOGJwA89P2Dn/34AUcGT5RnNN/NGz/2YZVm5qUolU3RXVRUohfk7p7MuKEl3xgpLxqWk4PiDDwyr9icJZWw/uwNPH33qysoeso2RNW7xNXvXrrt/HTaXbVY2yY5gCI5QKFWmNEvB/iHHYEBqnKUiScSHJrdCqci1YUkOcPeYu1X741yCAJ5hMiWVup9Cswl6lQR7EvFDkiU0udRKRUiYJWyzntdjcdFi1T4ZjyggLMt59MrrCJQOPhBfgj2J+OEXfbikVsEOxqthNG1GNr4aZcYfDEGk8hgKcEO+rUsIGIahYy0pyc8WJBB9QSc6/XblUhFC+nSMrtvEx+encBBFWDj+JwKyiQ795UqqZQT9idaPHv+bQ8pOfi3mxkEIQZe/G13+LsV2LGHs6dpR/QDQjGb1ftUaFG8vBKU0uy3Q8d+CLI5PUpFIVgGlbyzpWcPHf5nx4eP/2fYx3feQ+rs4qntIPimIoCykywSpIBgobUgeiTli+iD08usIjG3pF8voXVl3xbU2VMkMSAEIVBxNVd7XTCKBoAABAUs4G0zAn+78U2LI9Il+CLKQTUG1v3sh/a4sMAlyDNdi5uLPhyuSWd9XDykkQoacT0GZ5BfdR5BMQlwaRtNh4OLPuCmSWfVdFXAWkKiUd2W9JDEyYMA49Iyux8SahnGPAs46zuLRRf/IyVTOHTKZkDx+nQMAQ5iOHH2O2zrE935iQTE/1xvsgyPo0AGwMIT1A5CSOjMi4HjCnT/x2InQ6prVaEB8b2crkskzPGTIwRTe8mJYFgwEyY9XjhCInjV0kEqCY48fw4f4MCmRJJL43eL/AH3UQh1BsgCOAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI1LTA5LTE3VDE2OjAzOjE4KzAwOjAwypH0iAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNS0wOS0xN1QxNTozMTo0OCswMDowMNPxmKIAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjUtMD" alt="ALM Infissi Logo" width="120" height="60" style="display: block; max-width: 100%; height: auto;" />
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">🔔 Nuova Richiesta Preventivo</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 16px;">ID Configurazione: ${data.configurationId}</p>
          </div>
        </div>

        <div class="content">
          <div class="section">
            <h3>👤 Informazioni Cliente</h3>
            <div class="customer-info">
              <div><strong>Nome</strong>${data.customerName}</div>
              <div><strong>Email</strong>${data.customerEmail}</div>
              <div><strong>Telefono</strong>${data.customerPhone}</div>
            </div>
          </div>

          <div class="section">
            <h3>🏗️ Configurazione Richiesta</h3>
            <div class="config-grid">
              <div class="config-item"><strong>Materiale:</strong> ${data.material}</div>
              <div class="config-item"><strong>Categoria:</strong> ${data.category}</div>
              <div class="config-item"><strong>Dimensioni:</strong> ${data.dimensions}</div>
              <div class="config-item"><strong>Tipo Vetro:</strong> ${data.glassType}</div>
            </div>

            ${data.colors ? `
            <div style="margin-top: 15px;">
              <strong>Colori:</strong>
              <div class="config-grid" style="margin-top: 10px;">
                <div class="config-item">Esterno: ${data.colors.esterno}</div>
                <div class="config-item">Interno: ${data.colors.interno}</div>
                <div class="config-item">Profili: ${data.colors.profili}</div>
              </div>
            </div>
            ` : ''}

            ${data.accessories && data.accessories.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>Accessori:</strong>
              <ul style="margin: 10px 0; padding-left: 20px; color: #64748b;">
                ${accessoriesList}
              </ul>
            </div>
            ` : ''}
          </div>

          ${data.notes ? `
          <div class="notes">
            <h3>📝 Note del Cliente</h3>
            <p style="margin: 0; color: #92400e;">${data.notes}</p>
          </div>
          ` : ''}

          <div class="actions">
            <h3 style="margin: 0 0 15px 0; color: #065f46;">⏰ Azioni Richieste</h3>
            <ul>
              <li>Analizzare la configurazione tecnica</li>
              <li>Contattare il cliente per eventuali chiarimenti</li>
              <li>Preparare preventivo dettagliato</li>
              <li>Rispondere entro 24-48 ore</li>
            </ul>
          </div>
        </div>

        <div class="footer">
          <p style="font-size: 14px; margin-bottom: 15px;">
            Questo messaggio è stato generato automaticamente dal configuratore ALM Infissi
          </p>

          <div class="company-info">
            <p style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">
              ALM Infissi di Alessandro Cappello
            </p>
            <p style="margin: 2px 0;">
              <a href="https://maps.app.goo.gl/1AAN1oaNqLJ9g3eF7" style="color: #60a5fa; text-decoration: none;">
                Vicolo della Ferrovia, 10 - Palermo
              </a>
            </p>
            <p style="margin: 2px 0;">
              P.IVA: 06365120820 | Tel. 380 781 5885
            </p>
            <p style="margin: 8px 0 0 0; font-size: 12px;">
              <a href="mailto:info@alminfissi.it" style="color: #60a5fa; text-decoration: none;">info@alminfissi.it</a> |
              <a href="https://alminfissi.it" style="color: #60a5fa; text-decoration: none;">alminfissi.it</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Endpoint GET per test (solo in sviluppo)
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Test endpoint not available in production' }, { status: 403 });
  }

  try {
    // Verifica che la chiave API sia configurata
    if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Dati di test
    const testData: QuoteEmailData = {
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

    // Invia l'email usando Resend con dominio verificato
           const { data: emailData, error } = await resend.emails.send({
             from: 'Configuratore ALM <noreply@ciao.alminfissi.it>',
             to: ['alminfissi@gmail.com'],
      subject: `🧪 TEST - Nuova richiesta preventivo - ${testData.customerName}`,
      html: generateQuoteEmailHTML(testData),
    });

    if (error) {
      console.error('Errore invio email:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

           return NextResponse.json({
             success: true,
             message: 'Test email sent successfully to alminfissi@gmail.com',
             data: emailData,
             testData: testData
           });

  } catch (error: unknown) {
    console.error('Error in test email:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log('📧 POST /api/send-quote - Richiesta ricevuta');
  
  try {
    // Verifica che la chiave API sia configurata
    if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
      console.error('📧 NEXT_PUBLIC_RESEND_API_KEY non configurata');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const data: QuoteEmailData = await request.json();
    console.log('📧 Dati ricevuti:', data);

    // Validazione dei dati richiesti
    if (!data.customerName || !data.customerEmail || !data.configurationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Invia l'email usando Resend
    console.log('📧 Invio email a Resend...');
    const { data: emailData, error } = await resend.emails.send({
      from: 'Configuratore ALM Infissi <noreply@ciao.alminfissi.it>',
      to: ['alminfissi@gmail.com'], // Email di destinazione per le notifiche
      subject: `Nuova richiesta preventivo - ${data.customerName}`,
      html: generateQuoteEmailHTML(data),
    });

    if (error) {
      console.error('📧 Errore invio email:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('📧 Email inviata con successo:', emailData);
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      data: emailData
    });

  } catch (error) {
    console.error('Error in send-quote API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
