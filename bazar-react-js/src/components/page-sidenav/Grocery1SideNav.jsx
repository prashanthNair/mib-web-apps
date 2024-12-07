import { Box, styled, useTheme } from "@mui/material";
import Accordion from "components/accordion/Accordion";
import AccordionHeader from "components/accordion/AccordionHeader";
import BazarCard from "components/BazarCard";
import { FlexBetween, FlexBox } from "components/flex-box";
import appIcons from "components/icons";
import NavLink from "components/nav-link/NavLink";
import Scrollbar from "components/Scrollbar";
import { H5, Span } from "components/Typography";
import React from "react";
const NavbarRoot = styled(BazarCard)(({ isfixed }) => ({
  height: "100%",
  boxShadow: "none",
  borderRadius: "8px",
  position: "relative",
  overflow: isfixed ? "auto" : "unset",
  "& .linkList": {
    transition: "all 0.2s",
    padding: "8px 20px",
  },
}));
const StyledList = styled(FlexBox)(({ theme }) => ({
  transition: "all 0.2s",
  padding: "4px 20px",
  alignItems: "center",
  "& .listCircle": {
    background: theme.palette.grey[600],
  },
  "&:hover": {
    "& .listCircle": {
      background: theme.palette.primary[300],
    },
  },
}));
const BorderBox = styled(FlexBetween)(() => ({
  marginTop: 5,
  marginBottom: 15,
  "& span": {
    width: "100%",
  },
}));
const ColorBorder = styled(Span)(({ grey, theme }) => ({
  borderRadius: "2px 0 0 2px",
  height: grey ? "2px" : "3px",
  background: grey ? theme.palette.grey[400] : theme.palette.primary[200],
}));
const Circle = styled("span")(() => ({
  width: "4px",
  height: "4px",
  marginLeft: "2rem",
  marginRight: "8px",
  borderRadius: "3px",
})); // ==================================================================

// ==================================================================
const Grocery1SideNav = (props) => {
  const { isFixed, navList } = props;
  const { palette, shadows } = useTheme();

  const renderChild = (childList) => {
    return childList.map((item, ind) => (
      <NavLink key={ind} href={item.href} color="grey.700">
        <StyledList>
          <Circle className="listCircle" />
          <Span py={0.75} flex="1 1 0">
            {item.title}
          </Span>
        </StyledList>
      </NavLink>
    ));
  };

  return (
    <Scrollbar
      style={
        {
          // maxHeight: "100%",
          // boxShadow: shadows[1],
        }
      }
    >
      <NavbarRoot isfixed={isFixed}>
        {navList.map((item, ind) => {
          return (
            <Box key={ind}>
              <Box padding="16px 20px 5px 20px">
                <H5>{item.category}</H5>
                <BorderBox>
                  <ColorBorder />
                  <ColorBorder grey={1} />
                </BorderBox>
              </Box>

              {item.categoryItem.map((item, ind) => {
                const Icon = appIcons[item.icon];
                return (
                  <Box mb="2px" color="grey.700" key={ind}>
                    {item.child ? (
                      <Accordion>
                        <AccordionHeader
                          px={0}
                          py={0.75}
                          className="linkList"
                          justifyContent="flex-start"
                          sx={{
                            ":hover": {
                              color: palette.primary.main,
                            },
                          }}
                        >
                          <FlexBox gap={1.5} alignItems="center" flex="1 1 0">
                            <Icon fontSize="small" />
                            <Span fontWeight="600" flex="1 1 0">
                              {item.title}
                            </Span>
                          </FlexBox>
                        </AccordionHeader>

                        {item.child ? renderChild(item.child) : null}
                      </Accordion>
                    ) : (
                      <NavLink
                        key={item.title}
                        href={item.href}
                        color="grey.700"
                      >
                        <FlexBox gap={1.5} className="linkList" py={0.75}>
                          <Icon fontSize="small" />

                          <Span fontWeight="600" flex="1 1 0">
                            {item.title}
                          </Span>
                        </FlexBox>
                      </NavLink>
                    )}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </NavbarRoot>
    </Scrollbar>
  );
};

export default Grocery1SideNav;
