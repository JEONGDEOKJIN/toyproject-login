const deleteCookies = (name) => {
  // 마감 시간을 과거로 돌려서, 지운다.
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export default deleteCookies;
