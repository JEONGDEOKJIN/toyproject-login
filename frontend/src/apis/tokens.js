import { useRecoilValue } from "recoil";
import { storedAccessToken } from "../stores";

export const useGetAccessToken = () => {
  const _accessToken = useRecoilValue(storedAccessToken);

  return _accessToken;
};


