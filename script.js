const $=id=>document.getElementById(id);
const rules={
first:v=>v.trim()?"":"กรุณากรอกชื่อ",
last:v=>v.trim()?"":"กรุณากรอกนามสกุล",
email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())?"":"อีเมลไม่ถูกต้อง",
phone:v=>/^0\d{9}$/.test(v)?"":"เบอร์โทรต้องมี 10 หลักและขึ้นต้นด้วย 0",
pw:v=>v.length<8?"รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร":(/\d/.test(v)&&/[^\d]/.test(v)?"":"รหัสผ่านต้องมีทั้งตัวเลขและตัวอักษร"),
pw2:v=>v&&v===$("pw").value?"":"รหัสผ่านไม่ตรงกัน",
terms:()=>$("terms").checked?"":"กรุณายอมรับเงื่อนไขก่อนสมัคร"
};
const touched={};
function check(k,show=true){
  const el=$(k),err=rules[k](k==="terms"?"":el.value);
  const msg=document.querySelector('[data-for="'+k+'"]');
  if(show){
    msg.textContent=err;
    if(k==="terms"){$("termsBox").classList.toggle("invalid",!!err)}
    else{el.classList.toggle("invalid",!!err);el.classList.toggle("valid",!err)}
  }
  return !err;
}
Object.keys(rules).forEach(k=>{
  const ev=k==="terms"?"change":"input";
  $(k).addEventListener(ev,()=>{
    if(k==="phone")$(k).value=$(k).value.replace(/\D/g,"");
    touched[k]=true;check(k);
    if(k==="pw"&&touched.pw2)check("pw2");
    $("banner").classList.remove("show");
  });
});
$("f").addEventListener("submit",e=>{
  e.preventDefault();
  let ok=true;
  Object.keys(rules).forEach(k=>{touched[k]=true;if(!check(k))ok=false});
  if(ok){
    $("f").reset();
    document.querySelectorAll("input").forEach(i=>i.classList.remove("valid","invalid"));
    document.querySelectorAll(".msg").forEach(m=>m.textContent="");
    $("termsBox").classList.remove("invalid");
    Object.keys(touched).forEach(k=>delete touched[k]);
    $("banner").classList.add("show");
    window.scrollTo({top:0,behavior:"smooth"});
  }
});
