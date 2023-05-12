`use strict`

import * as field from './classInput.js';

const dropDownOption = {'legal_face' : 'Юридическое лицо', 'physical_face' : 'Физическое лицо'};
const body = document.querySelector('div.cntFormRegistration');

createForm(dropDownOption, body);

function createForm(dropDownOption,body) {

    const cntFIOStatus = document.createElement('div');
    cntFIOStatus.classList.add('cntFIOStatus');
    body.append(cntFIOStatus);

    const FIO = new field.newField("FIO");
    FIO.createFieldText(); 

    const status = new field.newField("status", dropDownOption);
    status.createListDropDown(); 

    const labelContact = document.createElement('span');
    labelContact.textContent = 'Контактные данные'
    body.append(labelContact);

    const cntEmailPhone = document.createElement('div');
    cntEmailPhone.classList.add('cntEmailPhone');
    body.append(cntEmailPhone);

    const email = new field.newField("email")
    email.createEmail();

    const phone = new field.newField("phone");
    phone.createPhone();


    const labelAdress = document.createElement('span');
    labelAdress.textContent = 'Домашний адрес'
    body.append(labelAdress);

    const cntAdreesUser = document.createElement('div');
    cntAdreesUser.classList.add('cntAdressUser');
    body.append(cntAdreesUser);

    
    const cntCityStreet = document.createElement('div');
    cntCityStreet.classList.add('cntCityStreet');
    body.append(cntCityStreet);

    

    const city = new field.newField("city");
    city.createAdress();

    const street = new field.newField("street");
    street.createAdress();

    const house = new field.newField('house');
    house.createAdress();

    const flat = new field.newField('flat');
    flat.createAdress();


  



    const cntLogin = document.createElement('div');
    cntLogin.classList.add('cntLogin');
    body.append(cntLogin);

    const cntLoginAndPassword = document.createElement('div');
    cntLoginAndPassword.classList.add('cntLoginAndPassword');
    cntPasswordCaptcha.append(cntLoginAndPassword);
    

    const login = new field.newField('login');
    login.createFieldText();

    const cntPassword = document.createElement('div');
    cntPassword.classList.add('cntPassword');
    body.append(cntPassword);

    const password = new field.newField('password');
    password.createFieldText();

    const passwordRetry = new field.newField('password_retry');
    passwordRetry.createFieldText();

    const cntCaptcha = document.createElement('div');
    cntCaptcha.classList.add('cntCaptcha');
    body.append(cntCaptcha);

    const captchaImage = new field.newField('captcha');
    captchaImage.createCaptcha()

    const captchaEnter = new field.newField('enterCaptcha');
    captchaEnter.createFieldText();

    const cntBtn = document.createElement('div');
    cntBtn.classList.add('cntBtn');
    body.append(cntBtn);
    
    const sendAnketa = new field.newField(null, null, 'send')
    sendAnketa.createBtn();

    

}








