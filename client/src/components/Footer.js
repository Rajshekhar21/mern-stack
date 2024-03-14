import { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useLocation, useNavigate } from "react-router-dom";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PeopleIcon from "@mui/icons-material/People";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [index, setIndex] = useState(-1);
  const colors = ["primary", "danger", "success", "warning"];
  const links = ["/", "/members", "/more"];

  useEffect(() => {
    links.forEach((link, i) => {
      if (location.pathname.indexOf(link) == 0) {
        setIndex(i);
      }
    });
  });

  const onTabChange = (event, value) => {
    navigate(links[value]);
    setIndex(value);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        bgcolor: "background.surface",
      }}
    >
      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        value={index}
        onChange={onTabChange}
        sx={{
          mx: "auto",
          [`& .${tabClasses.root}`]: {
            py: 1,
            flex: 1,
            transition: "0.3s",
            fontWeight: "md",
            fontSize: "xs",
            [`&.${tabClasses.selected}`]: {
              bgcolor: "transparent",
            },
            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.7,
            },
          },
        }}
      >
        <TabList
          variant="plain"
          size="sm"
          disableUnderline
          sx={{ borderRadius: "lg", p: 0 }}
          tabFlex={1}
        >
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 0 && { color: colors[0] })}
          >
            <ListItemDecorator>
              <HomeRoundedIcon />
            </ListItemDecorator>
            Home
          </Tab>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 1 && { color: colors[1] })}
          >
            <ListItemDecorator>
              <PeopleIcon />
            </ListItemDecorator>
            Members
          </Tab>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 3 && { color: colors[3] })}
          >
            <ListItemDecorator>
              <WidgetsIcon />
            </ListItemDecorator>
            More
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
