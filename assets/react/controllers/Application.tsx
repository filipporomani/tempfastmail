import React, {useEffect, useState} from 'react';
import Inbox from "../components/email/inbox";
import Generator from "../components/email/generator";
import axios from "axios";
import {TemporaryEmailBox, ValidateEmailBoxResponseDto} from "../types/types";

const Application = () => {
  const [temporaryEmailBox, setTemporaryEmailBox] = useState<TemporaryEmailBox|null>(null);

  const handleRegenerateEmail = () => {
    axios.post('/api/email-box').then(r => {
      const generatedEmailBox = r.data as TemporaryEmailBox;
      localStorage.setItem('email', generatedEmailBox.email);
      localStorage.setItem('email-uuid', generatedEmailBox.uuid);

      setTemporaryEmailBox(generatedEmailBox);
    })
  }

  useEffect(() => {
    if (temporaryEmailBox === null) {
      const savedEmail = localStorage.getItem("email");
      const savedUuid = localStorage.getItem("email-uuid");

      if (savedEmail === null || savedUuid === null) {
        handleRegenerateEmail();
        return;
      }

      if (savedEmail && savedUuid) {
        axios.post('/api/email-box/validate', {
          email: savedEmail,
          uuid: savedUuid
        }).then((r) => {
          const validationResponse = r.data as ValidateEmailBoxResponseDto;

          if (validationResponse.is_valid) {
            console.log('valid');
            setTemporaryEmailBox({
              email: savedEmail,
              uuid: savedUuid
            });
          } else {
            console.log('not valid');
            handleRegenerateEmail();
          }
        })
      }
    }
  }, [])

  return (
    <>
      <Generator temporaryEmailBox={temporaryEmailBox} handleRegenerateEmail={handleRegenerateEmail}/>
      <Inbox temporaryEmailBox={temporaryEmailBox} />
    </>
  );
}

export default Application;
