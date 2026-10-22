import { useEffect, useRef } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { animate, useInView, useReducedMotion } from "framer-motion";
import Section from "./Section";
import Reveal from "./Reveal";
import { profile, projects, skillGroups, timeline } from "../data/portfolioData";

function Counter({ to, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce || to === 0) { ref.current.textContent = to; return; }
    const c = animate(0, to, { duration: 1.2, onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v); } });
    return () => c.stop();
  }, [inView, to, reduce]);
  return (
    <Box>
      <Typography variant="h5" component="p" sx={{ fontSize: 36, color: "primary.main" }}><span ref={ref}>0</span></Typography>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
  );
}

export default function About() {
  const stats = [
    { to: projects.filter((p) => !p.title.startsWith("[")).length, label: "Projects listed" },
    { to: skillGroups.reduce((n, g) => n + g.items.filter((i) => !i.startsWith("[")).length, 0), label: "Technologies listed" },
    { to: timeline.filter((t) => !t.placeholder).length, label: "Education and experience entries" },
  ];
  return (
    <Section id="about" title="About me">
      <Grid container spacing={6}>
        <Grid item xs={12} md={7}>
          <Reveal>{profile.about.map((p) => <Typography key={p} sx={{ mb: 2, maxWidth: 620 }}>{p}</Typography>)}</Reveal>
        </Grid>
        <Grid item xs={12} md={5}>
          <Reveal delay={0.1}>
            <Card sx={{ p: 3, boxShadow: "0 24px 60px -24px rgba(0,0,0,.7)", background: "linear-gradient(160deg, rgba(185,167,255,.08), transparent)" }}>
              <Typography variant="h6" component="h3">{profile.name}</Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>{profile.role}</Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
                {stats.map((s) => <Counter key={s.label} {...s} />)}
              </Box>
            </Card>
          </Reveal>
        </Grid>
      </Grid>
    </Section>
  );
}
