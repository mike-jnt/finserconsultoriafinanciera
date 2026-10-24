(()=>{
'use strict';
const config=window.FINSER_CONFIG||{};
const q=(s)=>document.querySelector(s);
const qa=(s)=>Array.from(document.querySelectorAll(s));
qa('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
const menu=q('#siteNav'), toggle=q('#navToggle');
if(menu&&toggle){
 const closeMenu=()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú')};
 toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')});
 qa('#siteNav a').forEach(el=>el.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
 document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!toggle.contains(e.target))closeMenu()});
}
const interests=q('#leadInterest');
const pensionStatus=q('#leadPensionStatus');
const pensionHint=q('#pensionHint');
if(pensionStatus&&pensionHint){pensionStatus.addEventListener('change',()=>{const notYet=pensionStatus.value.startsWith('Aún no');pensionHint.textContent=notYet?'FinSer atiende principalmente a quienes ya reciben pensión. Puedes enviar tu consulta para confirmar si hay algún servicio aplicable.':'Nuestros servicios principales están dirigidos a personas que ya reciben pensión.';pensionHint.classList.toggle('hint-warning',notYet)})} 
qa('[data-service]').forEach(a=>a.addEventListener('click',()=>{if(interests)interests.value=a.dataset.service||''}));
const fmtNumber=String(config.whatsappNumber||'').replace(/\D/g,'');
const isConfigured=/^57\d{10}$/.test(fmtNumber);
const quick=q('#quickWhatsapp');
if(quick && isConfigured){const msg='Hola, quiero información sobre la asesoría financiera para pensionados de FinSer.';quick.href=`https://wa.me/${fmtNumber}?text=${encodeURIComponent(msg)}`;}
const form=q('#leadForm'),status=q('#leadStatus');
if(!form||!status)return;
const statusMessage=(msg,type='error')=>{status.textContent=msg;status.className=`form-status ${type}`};
form.addEventListener('submit',e=>{
 e.preventDefault();statusMessage('', '');
 if(!form.reportValidity())return;
 const name=q('#leadName').value.trim().replace(/\s+/g,' ');
 const digits=q('#leadPhone').value.replace(/\D/g,'');
 const pensionSituation=pensionStatus?.value||'No informada';
 const payer=q('#leadPayer').value.trim()||'No informada';
 const service=q('#leadInterest').value;
 if(name.length<3||!/^[\p{L} .'-]{3,90}$/u.test(name)){statusMessage('Escribe tu nombre completo con letras.');q('#leadName').focus();return}
 if(digits.length<7||digits.length>15){statusMessage('Verifica el número de teléfono que ingresaste.');q('#leadPhone').focus();return}
 if(!isConfigured){statusMessage('El número de WhatsApp de FinSer no está configurado correctamente.');return}
 const msg=`Hola, FinSer. Quisiera recibir orientación sobre servicios financieros para pensionados.\n\nNombre: ${name}\nWhatsApp de contacto: ${digits}\n¿Ya recibo pensión?: ${pensionSituation}\nEntidad de pensión: ${payer}\nNecesidad: ${service}\n\nDeseo que revisemos las alternativas que podrían ajustarse a mi situación.`;
 const url=`https://wa.me/${fmtNumber}?text=${encodeURIComponent(msg)}`;
 const win=window.open(url,'_blank','noopener,noreferrer');
 if(win===null){status.textContent='';status.className='form-status success';const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Pulsa aquí para abrir WhatsApp y enviar tu mensaje';status.appendChild(a)}
 else statusMessage('WhatsApp se abrió en una pestaña. Envía el mensaje para completar tu consulta.','success');
});
})();
