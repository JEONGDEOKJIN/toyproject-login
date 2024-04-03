const getRefreshTokenFromCookie = (name) => {
  if (document.cookie && document.cookie != null) {
    const cookiesArr = document.cookie.split(";");

    // console.log("cookiesArr" , cookiesArr);
    /* cookiesArr = ["refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ29vZDEiLCJlbWFpbCI6Imdvb2QxQG5hdmVyLmNvbSIsInR5cGUiOiJsb2NhbCIsImlhdCI6MTcxMjExMzE2OSwiZXhwIjoxNzEyMTk5NTY5fQ.sqHuG1TySfMk96Oq540JIKtASBrgRwD4LxaDz0jE_EE"]
    */

    const cookie = cookiesArr.find((item) =>
      item.trim().startsWith(name + "=")  
    );

    if (cookie) {
      const value = cookie.split("=")[1];
      return decodeURIComponent(value) // 디코딩 하여 반환
    }


  }
};

export default getRefreshTokenFromCookie;
