import React, { useState } from "react";
import styled from "@emotion/styled";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";
import axios from "axios";

const FormContent = () => {
  const [name, setName] = useState("");
  const [participationStatus, setParticipationStatus] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isResponseSent, setIsResponseSent] = useState(false);

  const handleSend = () => {
    // Check if name is empty or participationStatus is not selected
    if (!name || !participationStatus) {
      setSubmissionStatus("error");
      return; // Exit early if validation fails
    }

    const messageText = `${name}    ${participationStatus}`;
    axios
      .post(
        `https://api.telegram.org/bot6557386352:AAEbMqo56A1KsSkrsWfWfSICNqTah91w_ec/sendMessage?chat_id=@weddingadamsany&text=${messageText}  `
      )
      .then((response) => {
        setSubmissionStatus("success");
        setIsResponseSent(true); // Set the flag to true

        // Set a timer to clear the submissionStatus after 5 seconds
        setTimeout(() => {
          setSubmissionStatus(null);
        }, 2000);
      })
      .catch((error) => {
        setSubmissionStatus("error");

        // Set a timer to clear the submissionStatus after 5 seconds
        setTimeout(() => {
          setSubmissionStatus(null);
        }, 5000);
      });
  };

  return (
    <TextContentWrapper>
      {isResponseSent ? (
        <Button
          style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
          fullWidth={true}
          color="success"
          variant="contained"
        >
          Сіздің жауабыңыз жіберілді!
        </Button>
      ) : (
        <>
          <TitleText>
            Аты жөніңіз ( жұбайыңызбен келетін <br /> болсаңыз, екеуіңіздің де
            атыңызды
            <br />
            жазуыңызды өтінеміз)
          </TitleText>
          <FormControl
            id="form"
            style={{
              width: "-webkit-fill-available",
              padding: "0 40px",
              gap: "20px",
            }}
          >
            <TextField
              error={submissionStatus === "error"}
              required
              helperText="Аты-жөніңізді жазыңыз"
              id="outlined-basic"
              label="Аты-жөніңіз"
              variant="standard"
              size="small"
              fullWidth={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormLabel id="demo-radio-buttons-group-label">
              Қатысуыңыз
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={participationStatus}
              onChange={(e) => setParticipationStatus(e.target.value)}
            >
              <FormControlLabel
                value="қатысамын"
                control={<Radio />}
                label="қатысамын"
              />
              <FormControlLabel
                value="қатыса алмаймын"
                control={<Radio />}
                label="қатыса алмаймын"
              />
            </RadioGroup>
            {submissionStatus === "success" && (
              <Alert
                severity="success"
                onClose={() => setSubmissionStatus(null)}
              >
                Сіздің жауабыңыз сәтті сақталды!
              </Alert>
            )}
            {submissionStatus === "error" && (
              <Alert severity="error" onClose={() => setSubmissionStatus(null)}>
                Толықтай форманы толтырыңыз
              </Alert>
            )}
            <Button
              variant="contained"
              onClick={handleSend}
              endIcon={<SendIcon />}
            >
              Жіберу
            </Button>
          </FormControl>
        </>
      )}
    </TextContentWrapper>
  );
};

const TextContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
`;

const TitleText = styled.h2`
  font-family: "BKANTKZ", Arial, sans-serif;
  font-size: 18px;
  text-align: start;
  margin: 0;
  font-weight: 200;
  padding-left: 40px;
`;

export default FormContent;
