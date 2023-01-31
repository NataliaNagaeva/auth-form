const setCookie = (cookieName, cookieValue, exDays = 1) => {
  const date = new Date();
  date.setTime(date.getTime() + (exDays*24*60*60*1000));
  const expires = "expires="+ date.toUTCString();
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
}

const getCookie = (cookieName) => {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for(let i = 0; i < cookieArray.length; i++) {
    let currentCookie = cookieArray[i];

    while (currentCookie.charAt(0) === ' ') {
      currentCookie = currentCookie.substring(1);
    }

    if (currentCookie.indexOf(name) === 0) {
      return currentCookie.substring(name.length, currentCookie.length);
    }
  }

  return "";
}

const deleteCookie = (cookieName) => {
  const date = new Date();
  date.setTime(date.getTime() - 60000);
  const expires = "expires="+ date.toUTCString();
  document.cookie = `${cookieName}= ;${expires};path=/`;
}

const cookie = {set: setCookie, get: getCookie, delete: deleteCookie};

export default cookie;