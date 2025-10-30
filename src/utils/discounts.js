export function yearsBetween(dateStr){
  const d = new Date(dateStr);
  const now = new Date();
  let y = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if(m < 0 || (m===0 && now.getDate() < d.getDate())) y--;
  return y;
}
export function isDuocMail(email){
  if(!email) return false;
  const e = email.toLowerCase().trim();
  return e.endsWith('@duoc.cl') || e.endsWith('@duocuc.cl');
}
export function isBirthdayToday(dateStr){
  const d = new Date(dateStr);
  const now = new Date();
  return d.getMonth()===now.getMonth() && d.getDate()===now.getDate();
}
export function applyDiscounts({email, fechaNacimiento, code, itemsTotal}){
  let total = itemsTotal;
  let applied = [];

  if(isDuocMail(email) && isBirthdayToday(fechaNacimiento)){
    applied.push({ key:'duoc-cumple', desc:'Duoc: torta gratis en tu cumpleaños' });
    total = 0;
    return { total, applied };
  }
  if(fechaNacimiento && yearsBetween(fechaNacimiento) >= 50){
    applied.push({ key:'senior-50', desc:'Descuento 50% por ser mayor de 50 años' });
    total = total * 0.5;
  }
  if(code && code.toUpperCase().trim() === 'FELICES50'){
    applied.push({ key:'felices50', desc:'10% de por vida (FELICES50)' });
    total = total * 0.9;
  }
  return { total, applied };
}
