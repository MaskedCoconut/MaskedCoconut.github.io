import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  Collapse,
  Backdrop,
} from "@mui/material";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import StepContent from "@mui/material/StepContent";
import { StepButton } from "@mui/material";
import * as React from "react";
import { AirportIcons } from "../icons/icons";
import { useTheme } from "@mui/material/styles";
import { LoadDemo } from "../utils";
import { AppDataContext } from "../context/AppDataContext";
import { AppDataDispatchContext } from "../context/AppDataContext";
import { useContext } from "react";

const steps = [
  {
    label: "Start from a SCHEDULE",
    description: `First and most important thing we need is the Design Day Flight Schedule. This happens on this page. You can upload a file in csv format, then you need to indicate which columns correspond to "Pax" and "Scheduled Time".`,
  },
  {
    label: "Edit SHOW-UP profile",
    description:
      "If needed, you can adjust the Show-up profile for Passengers.",
  },
  {
    label: "Set up the TERMIAL facilities",
    description: `At this stage, you need to add facilities (eg. security, check-in, depature hall) to the Terminal. Each facility can have one or more "previous steps", which will define the passenger path in the terminal.`,
  },
  {
    label: "Check out the RESULTS",
    description: `Finally, you can see the level of service assesment of the terminal for the design day.`,
  },
];

export default function MyCustomNoRowsOverlay() {
  const theme = useTheme();
  const dispatch = useContext(AppDataDispatchContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSteppervisible, setIssteppervisible] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleStartdemo = () => {
    handleOpen();
  };

  return (
    <Box
      height="100%"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
      sx={{ display: "flex" }}
    >
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Box
          sx={{
            maxWidth: 600,
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 8,
            padding: 4,
          }}
        >
          <Stack>
            <Typography color="white">
              In the demo, you already have a design day schedule and a terminal
              configured, you can look around, edit some values and see the
              results changing
              <br />
              <br />
              The Schedule comes from Kansai Airport public page for 14th May
              2023 and random (between 100 and 300) number of Pax was generated
              <br />
              <br />
              The terminal characteristics are arbitrary
            </Typography>
            <Typography color="white" fontSize={40} textAlign="center">
              After demo load, you may want to re-upload the csv
              <br />
              (you will get a csv Schedule during load)
            </Typography>

            <Button onClick={() => LoadDemo(dispatch)} sx={{ color: "white" }}>
              {" "}
              Load Demo{" "}
            </Button>
          </Stack>
        </Box>
      </Backdrop>

      {!isSteppervisible ? (
        <Stack>
          <Typography>upload a .csv format Flight Schedule to start</Typography>
          <Typography>or</Typography>
          <Button onClick={() => setIssteppervisible(true)}>
            <Typography>First time? =&#62; display help &#60;=</Typography>
          </Button>
        </Stack>
      ) : (
        <Box sx={{ width: 600, margin: "auto" }}>
          <Stepper nonLinear activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {step.label}
                </StepButton>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          <Collapse in={activeStep === steps.length}>
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All done - do you want to upload a schedule?
              </Typography>
              <Stack direction="row" spacing={0}>
                <Typography sx={{ textAlign: "center" }}>
                  ... Or would you rather
                </Typography>
                <Button onClick={handleStartdemo} sx={{ mt: 1, mr: 1 }}>
                  start with a demo
                </Button>
              </Stack>
            </Paper>
          </Collapse>
          <Button onClick={() => setIssteppervisible(false)}> hide help</Button>
        </Box>
      )}
    </Box>
  );
}
