import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelectors } from "../store/slices/auth/auth";
import { OpenAIAgent } from "../clients/OpenAI/OpenAI";
import { OpenAIBaseClient } from "../clients/OpenAI/OpenAIBaseClient";

export const AuthLoader: React.FC = () => {
  const dispatch = useDispatch();
  const akey = useSelector(authSelectors.getKey);

  React.useEffect(() => {
    if (!akey) {
      const key = localStorage.getItem("API_KEY");
      if (key) {
        OpenAIAgent.setApiKey(key);
        OpenAIBaseClient.API_KEY = key;
        dispatch(authActions.setKey(key));
      }
    }
  }, [akey]);
  return null;
};
