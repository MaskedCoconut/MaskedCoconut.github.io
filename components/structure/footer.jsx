import { Stack, Box, Typography, Divider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "static",
        width: "100%",
        bottom: 0,
        pb: "0.5em",
        pl: "0.5em",
        pr: "0.5em",
        maxHeight: "5vh",
      }}
    >
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        padding={1}
      >
        <a
          target="_blank"
          href="https://github.com/AntoineGlacet/test-app-react"
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
          >
            <GitHubIcon sx={{ color: theme.palette.primary.dark }} />
            <Typography variant="subtitle2"></Typography>
          </Stack>
        </a>
        <Typography variant="subtitle2"></Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
