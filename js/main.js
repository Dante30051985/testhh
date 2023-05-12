menu = document.querySelector('div#menu');
visibleMenu = document.querySelector('div.menu');


document.body.onload = () => {
    createFormAuthoirzed();
 
}

menu.onclick = (e) => {
    rect =  menu.getBoundingClientRect();
    coordX = rect.left;
    coordY = rect.top+50;

    visibleMenu.style.left = coordX+'px';
    visibleMenu.style.top = coordY+'px';
    visibleMenu.style.display = 'block';
    
}   

function addEventBtn() {
    
    const btnReg = document.querySelector('button.btnReg');
    
    btnReg.onclick = () => {
        location.href = '?reg=new_user';
    }
}

function createFormAuthoirzed() {
    const cntAuth = document.querySelector('div.cntAuth');
    
    const cntForm = document.createElement('div');
    cntForm.classList.add('cntForm');
    cntAuth.append(cntForm);
    
    const titleAuth = document.createElement('span');
    titleAuth.textContent = 'Вход в личный кабинет';
    cntForm.append(titleAuth);

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.name = 'email';
    inputEmail.placeholder = 'Укажите эл. почту';
    cntForm.append(inputEmail);

    const inputPassw = document.createElement('input');
    inputPassw.type = 'password';
    inputPassw.name = 'passw';
    inputPassw.placeholder = 'Укажите пароль';  
    cntForm.append(inputPassw);

    const cntBtn = document.createElement('div');
    cntBtn.classList.add('cntBtn');
    cntForm.append(cntBtn);

    const btnOk = document.createElement('button');
    btnOk.textContent = 'Войти';
    cntBtn.append(btnOk);

    const btnRecovery = document.createElement('button');
    btnRecovery.textContent = 'Забыл пароль';
    cntBtn.append(btnRecovery);

    const lines = document.createElement('hr');
    cntForm.append(lines);

    const btnReg = document.createElement('button');
    btnReg.textContent = 'Регистрация';
    btnReg.classList.add('btnReg');
    cntForm.append(btnReg);
    addEventBtn();
}