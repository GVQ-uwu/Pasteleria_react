import { applyDiscounts, isDuocMail } from '../src/utils/discounts';

describe('descuentos', ()=>{
  it('detecta correo duoc', ()=>{
    expect(isDuocMail('alguien@duoc.cl')).toBeTrue();
    expect(isDuocMail('otra@duocuc.cl')).toBeTrue();
    expect(isDuocMail('x@example.com')).toBeFalse();
  });
  it('aplica 50% a >=50 años', ()=>{
    const y = new Date().getFullYear() - 55;
    const r = applyDiscounts({ email:'x@x.com', fechaNacimiento:`${y}-01-01`, code:'', itemsTotal: 10000 });
    expect(r.total).toBeCloseTo(5000, 0);
  });
  it('aplica 10% con FELICES50', ()=>{
    const r = applyDiscounts({ email:'x@x.com', fechaNacimiento:'2000-01-01', code:'FELICES50', itemsTotal: 10000 });
    expect(r.total).toBeCloseTo(9000, 0);
  });
});
