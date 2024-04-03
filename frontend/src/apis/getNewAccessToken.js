import axios from 'axios';
import React, { useEffect } from 'react'
import getRefreshTokenFromCookie from '../utils/getRefreshTokenFromCookie';

const getNewAccessToken = async () => {
    const refreshToken = getRefreshTokenFromCookie("refreshToken");

    const response = await axios.post(
        "http://localhost:3000/auth/reissue",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const newAccessToken = response.data.access_token

      return newAccessToken

}

export default getNewAccessToken