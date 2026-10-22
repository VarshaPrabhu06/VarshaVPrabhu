import { Card, Chip, Grid, Typography, Box } from "@mui/material";
import Section from "./Section";
import Reveal from "./Reveal";
import { skillGroups } from "../data/portfolioData";

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <Grid container spacing={3}>
        {skillGroups.map((g, i) => (
          <Grid item xs={12} sm={6} md={4} key={g.title}>
            <Reveal delay={0.05 * (i % 3)} style={{ height: "100%" }}>
              <Card sx={{ p: 3, height: "100%", transition: "transform .25s, border-color .25s", "&:hover": { transform: "translateY(-4px)", borderColor: "primary.main" } }}>
                <Typography variant="h6" component="h3" sx={{ mb: 2 }}>{g.title}</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>{g.items.map((s) => <Chip key={s} label={s} />)}</Box>
              </Card>
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
