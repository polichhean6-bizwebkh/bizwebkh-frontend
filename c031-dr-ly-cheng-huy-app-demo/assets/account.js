/* Local account demo. No credentials are stored or sent to a service. */
var demoAccount={name:'Sokha Chan',phone:'+855 12 345 678'};
function accountPhone(id) {
  var value=document.getElementById(id).value.trim();
  if(!/^[+\d\s()-]+$/.test(value)) return null;
  var digits=value.replace(/\D/g,'').replace(/^00855/,'').replace(/^855/,'').replace(/^0/,'');
  if(!/^[1-9]\d{7,8}$/.test(digits)) return null;
  return '+855 '+digits.slice(0,2)+' '+digits.slice(2,5)+' '+digits.slice(5);
}
function accountValidate(formId,phoneId,errorId) {
  var form=document.getElementById(formId),error=document.getElementById(errorId);
  error.textContent=''; if(!form.reportValidity()) return null;
  var phone=accountPhone(phoneId);
  if(!phone) error.textContent='Enter a Cambodian phone number, for example +855 12 345 678.';
  return phone;
}
document.querySelectorAll('.phone-field input').forEach(function(input) {
  input.addEventListener('change',function() {
    var normalized=accountPhone(input.id);
    if(normalized) input.value=normalized.replace('+855 ','');
  });
});
function doLogin() {
  var phone=accountValidate('login-form','login-phone','login-error'); if(!phone) return;
  demoAccount.phone=phone; isLoggedIn=true;
  document.getElementById('login-password').value=''; showScreen('screen-profile');
}
function doSignup() {
  var phone=accountValidate('signup-form','signup-phone','signup-error'); if(!phone) return;
  var name=document.getElementById('signup-name').value.trim();
  if(!name) { document.getElementById('signup-error').textContent='Enter your full name.'; return; }
  if(document.getElementById('signup-password').value!==document.getElementById('signup-confirm').value) {
    document.getElementById('signup-error').textContent='Passwords do not match.'; return;
  }
  demoAccount={name:name,phone:phone}; isLoggedIn=true;
  document.getElementById('signup-password').value='';document.getElementById('signup-confirm').value='';showScreen('screen-profile');
}
function demoPhoneReset() {
  document.getElementById('reset-result').textContent='';
  var phone=accountValidate('reset-form','reset-phone','reset-error'); if(!phone) return;
  document.getElementById('reset-result').textContent='Demo reset requested for '+phone+'. No SMS is sent and no password is changed in this preview.';
}
var originalAccountRenderProfile=renderProfile;
renderProfile=function() {
  originalAccountRenderProfile();
  document.getElementById('account-profile-name').textContent=demoAccount.name;
  document.getElementById('account-profile-phone').textContent=demoAccount.phone;
};
var signoutDialog=document.createElement('dialog');
signoutDialog.className='account-dialog';signoutDialog.id='signout-dialog';signoutDialog.setAttribute('aria-labelledby','signout-title');
signoutDialog.innerHTML='<h2 id="signout-title">Sign out of your account?</h2><div class="btn-row"><button type="button" class="btn-secondary" autofocus onclick="signoutDialog.close()">Cancel</button><button type="button" class="confirm-signout" onclick="confirmDemoSignout()">Sign Out</button></div>';
document.body.appendChild(signoutDialog);
function doLogout() { if(isLoggedIn) signoutDialog.showModal(); }
function confirmDemoSignout() {
  signoutDialog.close();isLoggedIn=false;
  demoAccount={name:'Sokha Chan',phone:'+855 12 345 678'};
  document.querySelectorAll('#screen-login input[type=password],#screen-signup input[type=password]').forEach(function(el){el.value='';});
  showScreen('screen-profile');document.querySelector('#screen-profile .screen-scroll').scrollTop=0;
}
