import { Box, Typography } from "@mui/material";
import Section from "./Section";
import Reveal from "./Reveal";
import { timeline } from "../data/portfolioData";

export default function Experience() {
  return (
    <Section id="experience" title="Experience and education">
      <Box sx={{ position: "relative", pl: { xs: 3, sm: 4 }, borderLeft: "1px solid", borderColor: "divider", maxWidth: 760 }}>
        {timeline.map((t) => (
          <Reveal key={t.title} style={{ position: "relative", marginBottom: 40 }}>
            <Box sx={{ position: "absolute", left: { xs: -31, sm: -39 }, top: 8, width: 14, height: 14, borderRadius: "50%", background: t.placeholder ? "transparent" : "#b9a7ff", border: "2px solid #b9a7ff" }} />
            <Typography variant="body2" color="primary">{t.period}</Typography>
            <Typography variant="h6" component="h3">{t.title}</Typography>
            <Typography color="text.secondary">{t.place}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{t.text}</Typography>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
