import { utilService } from "./util.service";
import { loggerService } from './logger.service';

const elAlertContainer = document.createElement('div');
elAlertContainer.classList.add('alert-container');
document.body.appendChild(elAlertContainer);

export const alertService = {
    success,
    error
};

function success(key) {
    let txt = key;
    const msg = { status: 'success', txt };
    _showAlert(msg);
}

function error(key, err) {
    let txt = key;
    loggerService.error(err); 
    const msg = { status: 'error', txt };
    _showAlert(msg);
}

function _showAlert(msg) {
    const id = utilService.makeId();
    const elAlert = createAlert(msg, id);
    elAlertContainer.appendChild(elAlert);
    setTimeout(() => {
        closeAlert(id);
    }, 3000);
}

function closeAlert(id) {
    const elAlert = document.getElementById(id);
    if (elAlert) elAlert.remove();
}

function createAlert(msg, id) {
    const elAlert = document.createElement('div');
    elAlert.className = `alert ${msg.status}`;
    elAlert.id = id;

    var elTxt = document.createElement('p');
    elTxt.innerText = msg.txt;

    var elCloseBtn = document.createElement('button');
    elCloseBtn.className = 'close-btn';
    elCloseBtn.innerText = 'X';
    elCloseBtn.onclick = () => closeAlert(id);

    elAlert.appendChild(elTxt);
    elAlert.appendChild(elCloseBtn);

    return elAlert;
}