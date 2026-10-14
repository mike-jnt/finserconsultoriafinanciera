(()=>{
const cfg=window.SITE_CONFIG||{};
for(const el of document.querySelectorAll('[data-brand]'))el.textContent=cfg.brandName||'Consultorio Financiero';
document.title=(cfg.brandName||'Consultorio Financiero')+' | Asesoría personalizada';
document.getElementById('year').textContent=new Date().getFullYear();
const toggle=document.getElementById('menuToggle'),links=document.getElementById('menuLinks');
toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
document.querySelectorAll('[data-interest]').forEach(a=>a.addEventListener('click',()=>{const select=document.getElementById('interest');select.value=a.getAttribute('data-interest')}));
const form=document.getElementById('leadForm'),status=document.getElementById('formStatus');
form.addEventListener('submit',e=>{
 e.preventDefault();status.textContent='';
 if(!form.reportValidity())return;
 const name=document.getElementById('fullName').value.trim();
 const phone=document.getElementById('phone').value.replace(/[^\d]/g,'');
 if(name.length<3){status.textContent='Por favor escribe tu nombre completo.';return}
 if(phone.length<7||phone.length>15){status.textContent='Revisa el número de WhatsApp que ingresaste.';return}
 const number=String(cfg.whatsappNumber||'').replace(/\D/g,'');
 if(!/^57\d{10}$/.test(number)){
  status.textContent='El WhatsApp de la empresa aún no está configurado. El equipo debe añadir su número oficial en config.js antes de publicar este formulario.';
  return;
 }
 const payer=document.getElementById('payer').value||'No indicada';
 const interest=document.getElementById('interest').value;
 const message=`Hola, quiero recibir asesoría financiera.\n\nNombre: ${name}\nWhatsApp: ${phone}\nPagaduría: ${payer}\nMotivo de consulta: ${interest}\n\nDeseo recibir información sobre las alternativas que puedan aplicar a mi perfil.`;
 const url='https://wa.me/'+number+'?text='+encodeURIComponent(message);
 const w=window.open(url,'_blank','noopener,noreferrer');
 if(!w) status.innerHTML='No se pudo abrir una ventana nueva. <a target="_blank" rel="noopener noreferrer" href="'+url+'">Pulsa aquí para continuar en WhatsApp.</a>';
 else status.textContent='Se abrió WhatsApp. Envía el mensaje para completar tu solicitud.';
});
})();
