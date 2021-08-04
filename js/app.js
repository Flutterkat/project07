const notification = document.getElementsByClassName('notification')[0];
const popUpWindow = document.createElement('div');
const bellPosition = document.getElementsByClassName('bell')[0];
const popUpStyle = popUpWindow.style;
const alertBox = document.getElementsByClassName('alert-text')[0];
const alertX = document.getElementsByClassName('dismiss')[0];
const alertDiv = document.getElementsByClassName('alert')[0];
let messageBtn = document.getElementsByClassName('message')[0];
const formBtn = document.getElementsByTagName('form')[0];
const body = document.getElementsByTagName('body')[0];
const searchField = document.getElementsByClassName('search-field')[0];
const textArea = document.getElementsByClassName('text-area')[0];

const newMessages = `
    <ul>
    <li><a href="#" style="color:steelblue; margin:10px; text-decoration:none; text-align:left; display:block;">You have 3 unread messages</a>
    <li><a href="#" style="color:steelblue; margin:10px; text-decoration:none; text-align:left; display:block;">You have new friend requests</a>
    </ul>`;

const checkedMessages = `
    <p style="color:steelblue; margin:10px 10px; text-decoration:none; text-align:left; display:block;">No new messages</p>
`;

const sendMessage = `<p style="color:steelblue; margin:10px 10px; text-decoration:none; text-align:left; display:block;">Your message has been sent.</p>`;

const errorMessage = `<p style="color:steelblue; margin:10px 10px; text-decoration:none; text-align:left; display:block;">Message failed to send, please check that both input fields have been filled out correctly.</p>`;


//function that creates pop up windows.
const notificationWindow = (toDisplay, className, trueORfalse) => {
    popUpWindow.className = className;
    popUpStyle.position = 'absolute';
    popUpStyle.height = 'min-content';
    popUpStyle.width = 'min-content';
    popUpStyle.minWidth = '150px';
    popUpStyle.backgroundColor = '#fff';
    popUpStyle.border = '3px solid silver';
    popUpStyle.boxShadow = 'inset 0 0 3px 3px gray';
    popUpWindow.hidden = trueORfalse;
    popUpWindow.innerHTML = toDisplay;
};

//listens to the bell icon and populates appropriate pop up windows. or hides them
notification.addEventListener('click', () => {
    const badge = document.getElementsByClassName('badge')[0];

    if (notification.children[1] === undefined) {
    notificationWindow(checkedMessages, 'notificationPopUp', true);
    notification.appendChild(popUpWindow);
    }

    if(notification.children[1].hidden == true) {
        if (badge.hidden == false) {
            notification.children[1].remove();
            notificationWindow(newMessages, 'notificationPopUp', false);
            notification.appendChild(popUpWindow);
            bellPosition.setAttribute("viewBox", "-20 -25 150 150");
            badge.hidden = true;
        } else if (notification.children[1].hidden == true) {
            notification.children[1].remove();
            notificationWindow(checkedMessages, 'notificationPopUp', false);
            notification.appendChild(popUpWindow);
       }
    } else if (notification.children[1].hidden == false) {
        notification.children[1].hidden = true;
        }
});

//hides the alert message at top of page when clicked
alertDiv.addEventListener('click', () => {
    alertDiv.style.display = 'none';
});

//sets the initial bg color of the 'hourly' button above lineChart.
setHourlyBg = () => {
    const hourly = document.getElementsByClassName('hourly')[0];
    hourly.style.backgroundColor = '#90ee90';
};

setHourlyBg();

const hourlyBg = document.getElementsByClassName('hourly')[0];
const dailyBg = document.getElementsByClassName('daily')[0];
const weeklyBg = document.getElementsByClassName('weekly')[0];
const monthlyBg = document.getElementsByClassName('monthly')[0];

//function to choose bg colors of 'hourly, daily, weekly, monthly' buttons above line chart
let chartBg = (color1, color2, color3, color4) => {
        hourlyBg.style.backgroundColor = color1;
        dailyBg.style.backgroundColor = color2;
        weeklyBg.style.backgroundColor = color3;
        monthlyBg.style.backgroundColor = color4;
};


//sets bg colors of 'hourly, daily, weekly, monthly' buttons above line chart on click.
chartLinks.addEventListener('click', (e) => {
    let target = e.target;
    if (target.className === 'chart-link hourly') {
        chartBg('#90ee90', 'transparent', 'transparent', 'transparent');
    } else if (target.className === 'chart-link daily') {
        chartBg('transparent', '#90ee90', 'transparent', 'transparent');
    } else if (target.className === 'chart-link weekly') {
        chartBg('transparent', 'transparent', '#90ee90', 'transparent');
    } else if (target.className === 'chart-link monthly') {
        chartBg('transparent', 'transparent', 'transparent', '#90ee90');
    }
});

//creates pop up windows and sets them to hidden
notificationWindow(sendMessage, 'messageSent', true);
messageBtn.appendChild(popUpWindow);
notificationWindow(errorMessage, 'messageFailed', true);
messageBtn.appendChild(popUpWindow);


const messageSentWindow = messageBtn.lastElementChild;
const messageFailedWindow = messageBtn.lastElementChild;

//controls the searchField and textArea. changes the bg colors on error, generates and shows pop up windows upon clicking the 'send' button. sets field values to '' after a message is sent.
body.addEventListener('click', (e) => {
    if (e.target.className === "message-button") {

        e.preventDefault();

        searchField.style.backgroundColor = 'rgba(192, 192, 192, 0.575)';
        searchField.style.border = 'none';
        textArea.style.backgroundColor = 'rgba(192, 192, 192, 0.575)';
        textArea.style.border = 'rgba(148, 146, 146, 0.856)';

        if (searchField.value == '' || textArea.value == '') {
            notificationWindow(errorMessage, 'messageFailed', false);
            messageBtn.appendChild(popUpWindow);

            if (searchField.value == '') {
                searchField.style.backgroundColor = 'rgba(255, 0, 0, .2)';
                searchField.style.border = '3px solid rgb(255, 0, 0)';
            }

            if (textArea.value == '') {
                textArea.style.backgroundColor = 'rgba(255, 0, 0, .2)';
                textArea.style.border = '3px solid rgb(255, 0, 0)';
            }
            return;
        }

    notificationWindow(sendMessage, 'messageSent', false);
    messageBtn.appendChild(popUpWindow);
    searchField.value = '';
    textArea.value = '';

    } else {
        if (messageBtn.lastElementChild.className == 'messageSent') {
        messageSentWindow.hidden = true;
        } else if (messageBtn.lastElementChild.className == 'messageFailed') {
        messageFailedWindow.hidden = true;
        }
    }
});

//creates array list for autofill of user search bar.
let listArray = ['Victoria Chambers',
                 'Dale Byrd',
                 'Dawn Wood',
                 'Dan Oliver',
];



// pulled this function from https://www.w3schools.com/howto/howto_js_autocomplete.asp and altered it to fit my project.
// generates autofill functionality for user searchbar.
function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = arr[i].substr(0, val.length);
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
   

    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

autocomplete(searchField, listArray);

const timezone = document.getElementById('timezone');
const btnWrapper = document.getElementsByClassName('save-wrapper')[0];
const emailSwitch = document.getElementsByTagName('input')[1];
const profileSwitch = document.getElementsByTagName('input')[2];

//handles the options area of the page. stores or resets options for email slide bar, profile public slide bar, and timezone.
btnWrapper.addEventListener ('click', (e) => {
    if (e.target.className === 'save btn') {
        let timezoneString = timezone.value;
        localStorage.setItem('timezone', timezoneString);

        let convertEmailToString = emailSwitch.checked.toString();
        localStorage.setItem('emailNotifications', convertEmailToString);
        let convertProfileToString = profileSwitch.checked.toString();
        localStorage.setItem('profileToPublic', convertProfileToString);

    } else if (e.target.className === 'cancel btn') {
        localStorage.clear();
        timezone.value = '';
        emailSwitch.checked = false;
        profileSwitch.checked = false;
    }
});

//checks and then sets the settings saved inside the localStorage upon page refresh.
function settingsFunc() {
    if(localStorage.getItem('timezone') !== null) {
    timezone.value = localStorage.getItem('timezone');
    }
    if (localStorage.getItem('emailNotifications') !== null && localStorage.getItem('emailNotifications') === "true") {
    emailSwitch.checked = Boolean.valueOf(localStorage.getItem('emailNotifications'));
    }
    if (localStorage.getItem('emailNotifications') !== null && localStorage.getItem('profileToPublic') === "true") {
    profileSwitch.checked = Boolean.valueOf(localStorage.getItem('profileToPublic'));
    }
}

settingsFunc();