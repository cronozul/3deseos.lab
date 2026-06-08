// Netlify Function: send-contact.js
// Envía emails del formulario de contacto via Resend API
//
// Variables de entorno requeridas en Netlify (Settings → Environment Variables):
//   RESEND_API_KEY  — API key de resend.com (Plan gratuito: 100 emails/día)
//   CONTACT_EMAIL   — email de destino (opcional, por defecto 3deseos.lab@gmail.com)
//
// Pasos para configurar:
//   1. Regístrate gratis en https://resend.com
//   2. Crea una API Key en el dashboard de Resend
//   3. Agrega RESEND_API_KEY como variable de entorno en Netlify
//   4. Opcional: verifica tu dominio para enviar desde un email personalizado

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const headers = { 'Content-Type': 'application/json' };

  try {
    let name, email, message;
    const contentType = (event.headers['content-type'] || '').toLowerCase();

    if (contentType.includes('application/json')) {
      const data = JSON.parse(event.body);
      ({ name, email, message } = data);
    } else {
      const params = new URLSearchParams(event.body);
      name    = params.get('name')    || '';
      email   = params.get('email')   || '';
      message = params.get('message') || '';
    }

    name    = String(name).trim();
    email   = String(email).trim();
    message = String(message).trim();

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Por favor completa todos los campos.' }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'El correo electrónico no es válido.' }),
      };
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL       = process.env.CONTACT_EMAIL || '3deseos.lab@gmail.com';

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY no configurada en variables de entorno de Netlify.');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'El servicio de correo no está configurado.' }),
      };
    }

    const htmlBody = `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.07)">
        <div style="background:linear-gradient(135deg,#402C5A 0%,#316DBC 100%);padding:32px;text-align:center">
          <h1 style="margin:0;font-size:22px;font-weight:700;letter-spacing:-0.02em">3deseos.lab</h1>
          <p style="margin:8px 0 0;opacity:0.8;font-size:13px">Nuevo mensaje desde el formulario web</p>
        </div>
        <div style="padding:32px">
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;width:90px;vertical-align:top">Nombre</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-weight:500">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
                <a href="mailto:${escapeHtml(email)}" style="color:#316DBC;text-decoration:none">${escapeHtml(email)}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top:24px">
            <p style="color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px">Mensaje</p>
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px;white-space:pre-wrap;line-height:1.7;font-size:15px">${escapeHtml(message)}</div>
          </div>
          <div style="margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.05)">
            <a href="mailto:${escapeHtml(email)}?subject=Re: Tu mensaje a 3deseos.lab" style="display:inline-block;background:#316DBC;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600">
              Responder a ${escapeHtml(name)}
            </a>
          </div>
        </div>
        <div style="padding:16px 32px;text-align:center;color:rgba(255,255,255,0.25);font-size:11px">
          3deseos.lab &bull; Impresión 3D artesanal &bull; Bogotá, Colombia
        </div>
      </div>`;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Formulario 3deseos.lab <onboarding@resend.dev>',
        to: [TO_EMAIL],
        reply_to: email,
        subject: `✨ Mensaje de ${name} — 3deseos.lab`,
        html: htmlBody,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend API error:', resendRes.status, errText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'No se pudo enviar el correo. Intenta de nuevo más tarde.' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Error en send-contact:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error interno. Intenta de nuevo.' }),
    };
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
