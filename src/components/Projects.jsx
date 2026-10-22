import { Box, Button, Card, Chip, Grid, Typography } from "@mui/material";
import { Github, ExternalLink } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import Section from "./Section";
import Reveal from "./Reveal";
import { projects } from "../data/portfolioData";

function ProjectCard({ p }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 15 });
  const move = (e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); };
  const leave = () => { mx.set(0); my.set(0); };
  return (
    <motion.div onPointerMove={reduce ? undefined : move} onPointerLeave={leave} style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformPerspective: 900, height: "100%" }}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {p.image ? (
          <Box component="img" src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" sx={{ width: "100%", height: 170, objectFit: "cover" }} />
        ) : (
          <Box role="img" aria-label={`Preview placeholder for ${p.title}`} sx={{ height: 170, background: "linear-gradient(135deg, rgba(185,167,255,.25), rgba(124,140,255,.08))" }} />
        )}
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1.5, flexGrow: 1 }}>
          <Typography variant="h6" component="h3">{p.title}</Typography>
          <Typography variant="body2" color="text.secondary"><b>Problem:</b> {p.problem}</Typography>
          <Typography variant="body2" color="text.secondary"><b>Solution:</b> {p.solution}</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>{p.stack.map((s) => <Chip key={s} size="small" label={s} />)}</Box>
          <Box sx={{ display: "flex", gap: 1, mt: "auto", pt: 1 }}>
            {p.github && <Button size="small" variant="outlined" href={p.github} target="_blank" rel="noopener noreferrer" startIcon={<Github size={16} />}>Code</Button>}
            {p.demo && <Button size="small" variant="contained" href={p.demo} target="_blank" rel="noopener noreferrer" startIcon={<ExternalLink size={16} />}>Live demo</Button>}
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="Featured projects">
      <Grid container spacing={3}>
        {projects.map((p, i) => (
          <Grid item xs={12} md={4} key={p.title + i}>
            <Reveal delay={0.08 * i} style={{ height: "100%" }}><ProjectCard p={p} /></Reveal>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
