export class newField {

    constructor(textField, optionDropDown, btn) {
        this.textField = textField;
        this.optionDropDown = optionDropDown;
        this.btn = btn;
    }

    createBtn() {
        const body = document.querySelector('div.cntBtn');
        const newBtn = document.createElement('button');
        newBtn.name = this.btn;
        if (this.btn == 'send') {
            newBtn.textContent = 'Регистрация';
            newBtn.onclick = () => {
                sendAnketa();
            }
        }

        body.append(newBtn);
    }

    createFieldText() {

        const newFieldText = document.createElement('input');
        newFieldText.name = this.textField;

        if (this.textField == 'FIO' || this.textField == 'status') {
            const body = document.querySelector('div.cntFIOStatus');
            newFieldText.type = 'text';
            newFieldText.placeholder = 'Фамилия, имя, отчество';
            body.append(newFieldText);
        }

        if (this.textField == 'password' || this.textField == 'password_retry') {
            const cntLoginAndPass = document.querySelector('div.cntLoginAndPassword');
       
                      newFieldText.type = 'password';
            if (this.textField == 'password') {
                newFieldText.placeholder = 'Укажите пароль';
                newFieldText.oninput = () => {
                    checkPasswordStrength(newFieldText.value);

                }
            
                const cntPasswordCaptcha = document.createElement('div');
                cntPasswordCaptcha.classList.add('cntPassword');
                cntLoginAndPass.append(cntPasswordCaptcha);
                
                cntPasswordCaptcha.append(newFieldText);
           
         
            }
            if (this.textField == 'password_retry') {
                newFieldText.placeholder = 'Повторите пароль';

                newFieldText.oninput = () => {
                    checkEnterPassword(newFieldText.value);
                }
                const cntPasswordCaptcha = document.createElement('div');
                cntPasswordCaptcha.classList.add('cntPassword');
                cntLoginAndPass.append(cntPasswordCaptcha);
                
                cntPasswordCaptcha.append(newFieldText);
            }

        }

        if (this.textField == 'login') { 
            const cntLoginAndPass = document.querySelector('div.cntLoginAndPassword');            const body = document.querySelector('div.cntLogin');
            newFieldText.type = 'text';
            newFieldText.placeholder = 'Укажите логин';
            
            const cntPasswordCaptcha = document.createElement('div');
            cntPasswordCaptcha.classList.add('cntLogin');
            cntLoginAndPass.append(cntPasswordCaptcha);
            
            cntPasswordCaptcha.append(newFieldText);
           
        }

        if (this.textField == 'enterCaptcha') {
            const cntPaswCap = document.querySelector('div.cntPasswordCaptcha'); 
            const cntLoginAndPass = document.querySelector('div.cntLoginAndPassword');
            const body = document.querySelector('div.cntCaptcha');
            newFieldText.type = 'text';
            newFieldText.placeholder = 'Введите капчу';
            body.append(newFieldText);
            cntPaswCap.append(body);
            
        }
    }

    createCaptcha() {
        const body = document.querySelector('div.cntCaptcha');
        const newField = document.createElement('img');
        newField.src = './php/captcha.php';
        newField.alt = 'капча';
        newField.classList.add('captcha');
        body.append(newField);
    }

    createListDropDown() {
        const nameOption = Object.keys(this.optionDropDown);
        const valueOption = Object.values(this.optionDropDown);

        const body = document.querySelector('div.cntFIOStatus');
        const newFieldText = document.createElement('select');
        newFieldText.name = this.textField;
        body.append(newFieldText);

        for (let i = 0; i < nameOption.length; i++) {
            const item = document.createElement('option');
            item.value = nameOption[i];
            item.textContent = valueOption[i];
            newFieldText.append(item);
        }
    }

    createEmail() {
        const body = document.querySelector('div.cntEmailPhone');
        const email = document.createElement('input');
        email.type = 'email';
        email.name = this.textField;
        email.placeholder = 'Укажите свой email';
        body.append(email);

        email.onblur = () => {
            const valid = validEmail(email.value);
            if (valid) {
                email.style.border = '1px solid green';
                email.style.background = 'green';
            } else {
                email.style.border = '1px solid red';
                email.style.background = 'red';
            }
        }

    }

    createPhone() {
        const body = document.querySelector('div.cntEmailPhone');
        const phone = document.createElement('input');
        phone.type = 'text';
        phone.name = this.textField;
        phone.placeholder = "+7 (123)123-45-67";
        phone.pattern = "^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$";
        body.append(phone);

        phone.addEventListener('keypress', function(ev) {
            if (isNaN(String.fromCharCode(ev.keyCode))) {
                ev.preventDefault();
            }

        })
    }

    createAdress() {
        const body = document.querySelector('div.cntCityStreet');
        const adress = document.createElement('input');

        adress.type = 'text';
        adress.name = this.textField;
        body.append(adress);


        if (adress.name === 'city') {
            adress.id = 'city';
            adress.placeholder = 'Город';
            adress.oninput = () => {
                upCaseCity(adress.value);
                sendQueryCity(adress.value);
                checkedInputCity(adress.value);
            }


        }

        if (adress.name === 'street') {
            adress.placeholder = 'Улица';

            adress.oninput = () => {
                upCaseStreet(adress.value);
                sendQueryStreet(adress.value);
                checkedInputStreet(adress.value);
            }

        }

        if (adress.name === 'house') {
            adress.placeholder = 'Дом';
        }

        if (adress.name === 'flat') {
            adress.placeholder = 'Квартира';
        }
    }

}

// Блок подгрузки улиц
///////////////////////////////////////////////////////////////////////////////////////////
function sendQueryStreet(streetValue) {
    if (document.querySelector('div.cntCitySelect'))
        document.querySelector('div.cntCitySelect').remove();

    let arrStreet = {
        'street_name': []
    };
    arrStreet.street_name.reverse();

    fetch('./json/data_street.json', {cache: "force-cache"}).then(response => response.json()).then(data => {



        Object.entries(data.street).forEach(function(street) {

            if (streetValue.length > 1) {

                const str = String(street[1]);
                const res = str.includes(streetValue);
                if (res) {
                    const id_street = street[0];
                    const zap = data.reduction_street[id_street] + '. ' + street[1];
                    arrStreet.street_name.push(zap);
                }
            }
        })
    })



    const inputStreet = document.querySelector('input[name=street]').getBoundingClientRect();
    const cntCity = document.createElement('div');

    const body = document.querySelector('div.cntFormRegistration');

    cntCity.classList.add('cntCitySelect');
    cntCity.style.display = 'none';
    body.append(cntCity);

    setTimeout((function() {
        let uniqArr = [...new Set(arrStreet.street_name)];

        const topY = inputStreet.y + 45;
        cntCity.setAttribute('style', 'position:absolute;left:' + inputStreet.x +
            'px;top:' + topY + 'px;');

        for (let i = 0; i < uniqArr.length; i++) {
            const optionStreet = document.createElement('li');
            optionStreet.innerText = uniqArr[i];
            cntCity.style.display = 'block';
            cntCity.append(optionStreet);
        }

        const el = document.querySelectorAll('div.cntCitySelect li')
        el.forEach(function(item) {
            item.onclick = () => {
                document.querySelector('input[name=street]').value = item.textContent;
                document.querySelector('div.cntCitySelect').remove();
            }
        })


    }), 1000);
}

function checkedInputStreet(value) {
    if (!value) document.querySelector('div.cntCitySelect').remove();
}

function upCaseStreet(value) {
    document.querySelector('input[name=street]').value = value.slice(0, 1).toUpperCase() + value.slice(1);
}


// Блок подгрузки городов
/*///////////////////////////////////////////////////////////////////////////////////*/
function checkedInputCity(value) {
    if (!value) document.querySelector('div.cntCitySelect').remove();
}

function upCaseCity(value) {

    document.querySelector('input[name=city]').value = value.slice(0, 1).toUpperCase() + value.slice(1);

}

function sendQueryCity(cityValue) {
    if (document.querySelector('div.cntCitySelect'))
        document.querySelector('div.cntCitySelect').remove();
    let arr_city = {
        'city': []
    };
    arr_city.city.reverse();

    fetch('./json/data_city.json').then(response => response.json()).then(data => {
        Object.entries(data.city).forEach(function(city) {

            if (cityValue.length > 1) {
                const str = String(city[1]);
                const res = str.includes(cityValue);

                if (res) {
                    const id_city = city[0];
                    const zap = data.reduction_city[id_city] + '. ' + city[1];
                    arr_city.city.push(zap);
                }
            }
        })
    })



    const inputCity = document.querySelector('input[name=city]').getBoundingClientRect();
    const cntCity = document.createElement('div');

    const body = document.querySelector('div.cntFormRegistration');

    cntCity.classList.add('cntCitySelect');
    cntCity.style.display = 'none';
    body.append(cntCity);




    setTimeout((function() {
        let uniqArr = [...new Set(arr_city.city)];

        const topY = inputCity.y + 45;
        cntCity.setAttribute('style', 'position:absolute;left:' + inputCity.x +
            'px;top:' + topY + 'px;');

        for (let i = 0; i < uniqArr.length; i++) {
            const optionCity = document.createElement('li');
            optionCity.innerText = uniqArr[i];
            cntCity.style.display = 'block';
            cntCity.append(optionCity);
        }

        const el = document.querySelectorAll('div.cntCitySelect li')
        el.forEach(function(item) {
            item.onclick = () => {
                document.querySelector('input[name=city]').value = item.textContent;
                document.querySelector('div.cntCitySelect').remove();
            }
        })


    }), 1000);
}
/*//////////////////////////////////////////////////////////////////////////////////////*/
function validEmail(e) {
    let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search(filter) != -1;
}

function checkPasswordStrength(password) {

    const input = document.querySelector('input[name=password]');
    const typeHint = 'password'


    if (password.length < 8) {
        const textHint2 = "Пароль должен содержать не менее 8 символов";

        createHint(textHint2, input, typeHint);
    } else {

        let strength = 0;
        if (password.match(/[a-z]/)) {
            strength += 1;
        }
        if (password.match(/[A-Z]/)) {
            strength += 1;
        }

        if (password.match(/[0-9]/)) {
            strength += 1;
        }

        if (password.match(/[$@#&!]/)) {
            strength += 1;
        }



        switch (strength) {
            case 1:
                const textHint3 = "Пароль очень слабый";

                createHint(textHint3, input, typeHint);
                break;
            case 2:
                const textHint4 = "Пароль средней сложности";

                createHint(textHint4, input, typeHint);
                break;
            case 3:
                const textHint5 = "Пароль сильный";
                createHint(textHint5, input, typeHint);
                break;
            case 4:
                const textHint6 = "Пароль очень сильный";
                createHint(textHint6, input, typeHint)
                break;
        }
    }
}

function createHint(text, input, typeHint) {

    if (typeHint == 'password') {
        if (document.querySelector('div.cntHintStrentghPassword'))
            document.querySelector('div.cntHintStrentghPassword').remove();


        const pos = input.getBoundingClientRect();

        const cntHint = document.createElement('div');
        const body = document.querySelector('div.cntFormRegistration');
        cntHint.classList.add('cntHintStrentghPassword');
        cntHint.textContent = text;

        const posHintX = pos.x;
        const posHintY = pos.y + 40;

        cntHint.setAttribute('style', 'position:absolute;left:' + posHintX + 'px;top:' + posHintY + 'px;');
        body.append(cntHint);
    } else {

        if (typeHint == 'checkedPassword') {

            if (document.querySelector('div.cntHintCheckedPassword'))
                document.querySelector('div.cntHintCheckedPassword').remove();


            const pos = input.getBoundingClientRect();

            const cntHint = document.createElement('div');
            const body = document.querySelector('div.cntFormRegistration');
            cntHint.classList.add('cntHintCheckedPassword');
            cntHint.textContent = text;

            const posHintX = pos.x;
            const posHintY = pos.y +  40;

            cntHint.setAttribute('style', 'position:absolute;left:' + posHintX + 'px;top:' + posHintY + 'px;');
            body.append(cntHint);
        } else {

            if (typeHint == 'errorCookies') {
                if (document.querySelector('div.cntHintErrorCookies'))
                    document.querySelector('div.cntHintErrorCookies').remove();


                const pos = input.getBoundingClientRect();

                const cntHint = document.createElement('div');
                const body = document.querySelector('div.cntFormRegistration');
                cntHint.classList.add('cntHintErrorCookies');
                cntHint.textContent = text;

                const posHintX = pos.x + 320;
                cntHint.setAttribute('style', 'position:absolute;left:' + posHintX + 'px;top:' + pos.y + 'px;');
                body.append(cntHint);
            }
        }
    }


}

function checkEnterPassword(value) {
    const passw1 = document.querySelector('input[name=password]');
    const passw2 = document.querySelector('input[name=password_retry]');

    if (value != passw1.value) {
        const text = 'Пароли не совпадают';
        const typeHint = 'checkedPassword';
        createHint(text, passw2, typeHint);
    } else {
        const text = 'Пароли совпадают!';
        const typeHint = 'checkedPassword';
        createHint(text, passw2, typeHint);
    }
}

function sendAnketa() {
    if (navigator.cookieEnabled === false) {

        const errorCookie = 'У вас выключены куки, включите их!';
        const cnt = document.querySelector('div.cntBtn');
        const typeHint = 'errorCookies';

        createHint(errorCookie, cnt, typeHint);
    } else {

        const fio = document.querySelector('input[name=FIO]').value;
        const email = document.querySelector('input[name=email]').value;
        const phone = document.querySelector('input[name=phone]').value;
        const city = document.querySelector('input[name=city]').value;
        const street = document.querySelector('input[name=street]').value;
        const house = document.querySelector('input[name=house').value;
        const flat = document.querySelector('input[name=flat]').value;
        const login = document.querySelector('input[name=login]').value;
        const password = document.querySelector('input[name=password]').value;
        const rPassword = document.querySelector('input[name=password_retry]').value;
        const eCaptcha = document.querySelector('input[name=enterCaptcha').value;

        const resultCheckedEmpty = checkedInputEmpty(fio, email, phone, city, street, house, flat, login, password, rPassword, eCaptcha);

        if (resultCheckedEmpty) {
            queryCheckedCaptch();
        }

    }
}

function checkedInputEmpty(fio, email, phone, city, street,
    house, flat, login, password, rPassword, eCaptcha) {

    if (!fio) {
        const textError = 'Вы не заполнили обязательное поле фамилия, имя, отчество';
        createErrorEmpty(textError);
        setTimeout((function() {
            document.querySelector('div.textError').remove();
        }), 1000)
    } else {

        if (!email || email) {
            if (!email) {
                const textError = 'Вы не заполнили обязательное поле email';
                createErrorEmpty(textError);
                setTimeout((function() {
                    document.querySelector('div.textError').remove();
                }), 1000)

            } else {
                const pattern = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9_-]+)\.([a-zA-Z]{2,5})$/;

                if (pattern.test(email)) {
                    document.querySelector('input[name=email]').style.border = '1px solid green';

                    if (!phone) {
                        const textError = 'Вы не заполнили обязательное поле телефон';
                        createErrorEmpty(textError);
                        setTimeout((function() {
                            document.querySelector('div.textError').remove();
                        }), 1000)

                    } else {

                        if (!city) {
                            const textError = 'Вы не заполнили обязательное поле город';
                            createErrorEmpty(textError);
                            setTimeout((function() {
                                document.querySelector('div.textError').remove();
                            }), 1000)

                        } else {

                            if (!street) {
                                const textError = 'Вы не заполнили обязательное поле улица';
                                createErrorEmpty(textError);
                                setTimeout((function() {
                                    document.querySelector('div.textError').remove();
                                }), 1000)
                            } else {

                                if (!house) {
                                    const textError = 'Вы не заполнили обязательное поле дом';
                                    createErrorEmpty(textError);
                                    setTimeout((function() {
                                        document.querySelector('div.textError').remove();
                                    }), 1000)
                                } else {
                                    if (!login) {
                                        const textError = 'Вы не заполнили обязательное поле логин';
                                        createErrorEmpty(textError);
                                        setTimeout((function() {
                                            document.querySelector('div.textError').remove();
                                        }), 1000)
                                    } else {
                                        if (!password) {
                                            const textError = 'Вы не заполнили обязательное поле пароль';
                                            createErrorEmpty(textError);
                                            setTimeout((function() {
                                                document.querySelector('div.textError').remove();
                                            }), 1000)
                                        } else {
                                            if (!rPassword) {
                                                const textError = 'Вы не заполнили обязательное поле повтор пароля';
                                                createErrorEmpty(textError);
                                                setTimeout((function() {
                                                    document.querySelector('div.textError').remove();
                                                }), 1000)
                                            } else {

                                                if (!eCaptcha) {
                                                    const textError = 'Вы не ввели капчу';
                                                    createErrorEmpty(textError);
                                                    setTimeout((function() {
                                                        document.querySelector('div.textError').remove();
                                                    }), 1000)
                                                } else {
                                                    return true;
                                                }
                                            }


                                        }
                                    }
                                }

                            }
                        }
                    }
                } else {
                    const textError = 'Введите правильный email: имя вашей почты@хостинг вашей почты . домен';
                    document.querySelector('input[name=email]').style.border = '1px solid red';
                    createErrorEmpty(textError);
                }
                setTimeout((function() {
                    if (document.querySelector('div.textError'))
                        document.querySelector('div.textError').remove();
                }), 1000)
            }


        }
    }
}




function createErrorEmpty(textError) {
    const divMsgError = document.createElement('div');
    const body = document.querySelector('div.cntFormRegistration');
    divMsgError.classList.add('errorEmptyFormReg');
    body.append(divMsgError);

    const text = document.createElement('div');
    text.classList.add('textError');
    text.textContent = textError;
    divMsgError.append(text);

}


function queryCheckedCaptch() {

    const enterCaptcha = 'userCaptcha=' +
        encodeURIComponent(document.querySelector('input[name=enterCaptcha]').value);
    fetch('./php/check_captcha.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: enterCaptcha
    }).then(response => response.text()).then(result => resultCheckedCaptcha(result))

}

function resultCheckedCaptcha(result) {
    if (result === String(true)) {

        const passw1 = document.querySelector('input[name=password]').value;
        const passw2 = document.querySelector('input[name=password_retry]').value;

        if (passw1 != passw2) { 
            const textError = 'Введнные пароли, не совпадают! Проверьте форму регистрации...';
            createErrorEmpty(textError);
            
        setTimeout((function() {
            if (document.querySelector('div.textError'))
                document.querySelector('div.textError').remove();
        }), 1000)

        } else {
            sendNewReg();
        }

    } else {

        const textError = 'Капча введена не верна! Повторите ввод...';
        createErrorEmpty(textError);

        setTimeout((function() {
            if (document.querySelector('div.textError'))
                document.querySelector('div.textError').remove();
        }), 1000)
    }
    

}

function sendNewReg() {
     
    const fio = document.querySelector('input[name=FIO]').value;
    
    const selectElement = document.querySelector('select[name=status]')
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const email = document.querySelector('input[name=email]').value;
    const phone = document.querySelector('input[name=phone]').value;
    const city = document.querySelector('input[name=city]').value;
    const street = document.querySelector('input[name=street]').value;
    const house = document.querySelector('input[name=house').value;
    const flat = document.querySelector('input[name=flat]').value;
    const login = document.querySelector('input[name=login]').value;
    const password = document.querySelector('input[name=password]').value;
   
    const fd = new FormData();
    fd.append('fio', encodeURIComponent(fio));
    fd.append('status', encodeURIComponent(selectedOption.textContent));
    fd.append('email', encodeURIComponent(email));
    fd.append('phone', encodeURIComponent(phone));
    fd.append('city', encodeURIComponent(city));
    fd.append('street', encodeURIComponent(street));
    fd.append('house', encodeURIComponent(house));
    fd.append('flat', encodeURIComponent(flat));
    fd.append('login', encodeURIComponent(login));
    fd.append('password', encodeURIComponent(password));

    fetch('./php/new_register.php',  {  
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
    },
    body: fd
                }).then(response => response.text()).then(result => openPage(result))

}

function openPage(result) {
    const parse = JSON.parse(result);

    if (parse == 'error_login') {
        createErrorEmpty('Такой логин уже зарегистрирован!');
        
        setTimeout((function() {
            if (document.querySelector('div.textError'))
                document.querySelector('div.textError').remove();
        }), 1000)

    } else {
        if (parse == 'error_email') {
            createErrorEmpty('Такой email уже зарегистрирован!');
        
            setTimeout((function() {
                if (document.querySelector('div.textError'))
                    document.querySelector('div.textError').remove();
            }), 1000)

        } else {
            location.href = '?id_user=' + parse;   
        }
    }
}