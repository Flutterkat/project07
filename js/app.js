const notification = document.getElementsByClassName('notification')[0];
const popUpWindow = document.createElement('div');
const bellPosition = document.getElementsByClassName('bell')[0];
const popUpStyle = popUpWindow.style;
const alertBox = document.getElementsByClassName('alert-text')[0];
const alertX = document.getElementsByClassName('dismiss')[0];
const alertDiv = document.getElementsByClassName('alert')[0];

const newMessages = `
    <ul>
    <li><a href="#" style="color:steelblue; margin:10px; text-decoration:none; text-align:left; display:block;">You have 3 unread messages</a>
    <li><a href="#" style="color:steelblue; margin:10px; text-decoration:none; text-align:left; display:block;">You have new friend requests</a>
    </ul>`;

const checkedMessages = `
    <a href="#" style="color:steelblue; margin:10px; text-decoration:none; text-align:left; display:block;">No new messages</a>
`;

const notificationWindow = (toDisplay) => {
    popUpWindow.className = 'notificationPopUp';
    popUpStyle.position = 'absolute';
    popUpStyle.height = 'min-content';
    popUpStyle.width = 'min-content';
    popUpStyle.minWidth = '150px';
    popUpStyle.backgroundColor = '#fff';
    popUpStyle.border = '3px solid silver';
    popUpStyle.boxShadow = 'inset 0 0 3px 3px gray';
    popUpWindow.hidden = true;
    popUpWindow.innerHTML = toDisplay;
    notification.appendChild(popUpWindow);
}

notificationWindow(checkedMessages);

notification.addEventListener('click', () => {
    const badge = document.getElementsByClassName('badge')[0];
    const checkWindow = document.getElementsByClassName('notificationPopUp')[0];
    if(checkWindow.hidden == true) {
        if (badge.hidden == false) {
            checkWindow.remove();
            notificationWindow(newMessages);
            checkWindow.hidden = false;
            bellPosition.setAttribute("viewBox", "-20 -25 150 150");
            badge.hidden = true;
        } else {
            checkWindow.remove()
            notificationWindow(checkedMessages);
            checkWindow.hidden = false;

       }
    } else {
        checkWindow.hidden = true;
    }
})

alertDiv.addEventListener('click', () => {
    alertDiv.style.display = 'none';
})

setHourlyBg = () => {
    const hourly = document.getElementsByClassName('hourly')[0];
    hourly.style.backgroundColor = '#90ee90';
}

setHourlyBg();

const hourlyBg = document.getElementsByClassName('hourly')[0];
const dailyBg = document.getElementsByClassName('daily')[0];
const weeklyBg = document.getElementsByClassName('weekly')[0];
const monthlyBg = document.getElementsByClassName('monthly')[0];

let chartBg = (color1, color2, color3, color4) => {
        hourlyBg.style.backgroundColor = color1;
        dailyBg.style.backgroundColor = color2;
        weeklyBg.style.backgroundColor = color3;
        monthlyBg.style.backgroundColor = color4;
}

chartLinks.addEventListener('click', (e) => {
    let target = e.target;
    if(target.className === 'chart-link hourly') {
        chartBg('#90ee90', 'transparent', 'transparent', 'transparent')
    } else if (target.className === 'chart-link daily') {
        chartBg('transparent', '#90ee90', 'transparent', 'transparent')
    } else if (target.className === 'chart-link weekly') {
        chartBg('transparent', 'transparent', '#90ee90', 'transparent')
    } else if (target.className === 'chart-link monthly') {
        chartBg('transparent', 'transparent', 'transparent', '#90ee90')
    }
})