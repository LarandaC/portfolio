import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  Grid,
  alpha,
} from "@mui/material";
import { RevealOnScroll } from "../shared/RevealOnScroll";
import { skills } from "@/lib/skills";
import * as MuiIcons from "@mui/icons-material";

const categories = ["todos", "frontend", "backend", "herramientas"];

const DynamicMuiIcon = ({
  name,
  fontSize = 24,
}: {
  name: string;
  fontSize?: number;
}) => {
  let IconComponent = (MuiIcons as any)[name];

  if (name.toLowerCase() === "github") {
    IconComponent = MuiIcons.GitHub;
  }

  if (!IconComponent) {
    return <MuiIcons.CodeRounded sx={{ fontSize, color: "text.primary" }} />;
  }

  return <IconComponent sx={{ fontSize }} />;
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveCategory(newValue);
  };

  const currentCategoryName = categories[activeCategory];
  const filteredSkills = skills.filter(
    (skill) =>
      currentCategoryName === "todos" || skill.category === currentCategoryName
  );

  return (
    <Box
      component="section"
      id="skills"
      sx={{
        py: 12,
        px: 2,
        backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.05),
        position: "relative",
      }}
    >
      <RevealOnScroll>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              textAlign: "center",
              mb: 6,
            }}
          >
            Skills
          </Typography>

          {/* Tabs / Categorías */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
            <Tabs
              value={activeCategory}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "50px",
                p: 0.5,
                boxShadow: (theme) => theme.shadows[2],
                border: "1px solid",
                borderColor: "divider",
                "& .MuiTabs-indicator": {
                  height: "100%",
                  borderRadius: "50px",
                  height: "calc(100% - 6px)",
                  bottom: "3px",
                  transform: "scaleX(0.9)",
                  backgroundColor: "primary.main",
                },
              }}
            >
              {categories.map((category, index) => (
                <Tab
                  key={index}
                  label={category}
                  sx={{
                    zIndex: 1,
                    textTransform: "capitalize",
                    fontWeight: 600,
                    minHeight: "48px",
                    px: 4,
                    fontSize: "1rem",
                    borderRadius: "50px",
                    transition: "0.3s",
                    color: "text.primary",
                    "&.Mui-selected": {
                      color: "primary.contrastText",
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Grid de Skills */}
          <Grid container spacing={3}>
            {filteredSkills.map((skill, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                <Card
                  sx={{
                    p: 3,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid",
                    borderColor: (theme) => alpha(theme.palette.divider, 0.7),
                    backgroundColor: "background.paper",
                    borderRadius: 2,
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02) translateY(-4px)",
                      boxShadow: (theme) => theme.shadows[10],
                      "& .skill-icon": {
                        color: "primary.main",
                        transform: "scale(1.1) rotate(5deg)",
                      },
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 0.5, textAlign: "left" }}
                    >
                      {skill.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", textAlign: "left" }}
                    >
                      {skill.level}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.1),
                      color: "text.primary",
                      transition: "all 0.3s ease",
                      height: "fit-content",
                    }}
                  >
                    <DynamicMuiIcon name={skill.icon} fontSize={48} />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </RevealOnScroll>
    </Box>
  );
};
