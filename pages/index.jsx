// pages/index.js
import { Button, Container, CssBaseline, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import backgroundImage from "../components/images/scoot_pokemon.jpg";

const HomePage = () => {
  const router = useRouter();

  const handleButtonClick = (route) => {
    router.push(route);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Image
          src={backgroundImage}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h2" color="white" gutterBottom>
            Select tool
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleButtonClick("/PFM_csv_edit")}
          >
            PFM .csv editor
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => handleButtonClick("/LoS_App")}
            style={{ marginTop: "16px" }}
          >
            Airport terminal planner
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
