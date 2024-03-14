import * as React from "react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb({
  navigation,
  title,
  backLink,
  menu,
  onBack,
  ...props
}) {
  const navigate = useNavigate();

  const goBack = () => {
    if (typeof backLink === "function") {
      backLink();
      return;
    }
    navigate(backLink || -1);
  };

  return (
    <Box
      component="header"
      className="Header"
      {...props}
      sx={[
        {
          p: 2,
          gap: 2,
          bgcolor: "background.surface",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          top: 0,
          zIndex: 1000,
          height: "50px",
          width: "calc(100vw - 32px)",
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {!navigation === false && (
        <IconButton
          onClick={goBack}
          sx={{ borderRadius: "50%" }}
          variant="soft"
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <Stack sx={{ minWidth: 0, flexGrow: 1 }}>
        {typeof title === "string" ? (
          <Typography
            fontWeight="lg"
            fontSize="lg"
            component="h2"
            level="body-sm"
            noWrap
          >
            {title}
          </Typography>
        ) : (
          <Box sx={{ width: "90%" }}>{title}</Box>
        )}
      </Stack>
      {menu && <Stack direction="row">{menu}</Stack>}
    </Box>
  );
}
