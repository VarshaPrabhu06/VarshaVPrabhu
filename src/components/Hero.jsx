import { lazy, Suspense } from "react";
import { Box, Button, Container, Grid, IconButton, Typography, Tooltip } from "@mui/material";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/portfolioData";

const Scene3D = lazy(() => import("./Scene3D"));

export default function Hero() {
  const reduce = useReducedMotion();
  const item = (i) => reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.12 * i, duration: 0.6, ease: "easeOut" } };
  const socials = [
    profile.github && { href: profile.github, label: "GitHub", Icon: Github },
    profile.linkedin && { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ].filter(Boolean);

  return (
    <Box id="home" component="section" sx={{ minHeight: "100svh", display: "flex", alignItems: "center", pt: 10, pb: 6, position: "relative", overflow: "hidden" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div {...item(0)}><Typography color="text.secondary" sx={{ mb: 2 }}>Hello, I'm {profile.name}.</Typography></motion.div>
            <motion.div {...item(1)}><Typography variant="h1" component="h1">Building Digital Experiences with Code.</Typography></motion.div>
            <motion.div {...item(2)}><Typography color="text.secondary" sx={{ mt: 3, maxWidth: 520 }}>{profile.intro}</Typography></motion.div>
            <motion.div {...item(3)}>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 4 }}>
                <Button variant="contained" size="large" href="#projects">Explore My Work</Button>
                <Tooltip title={profile.resumeUrl ? "" : "Add your resume in portfolioData.js"}>
                  <span><Button variant="outlined" size="large" href={profile.resumeUrl || undefined} download disabled={!profile.resumeUrl}>Download Resume</Button></span>
                </Tooltip>
              </Box>
              <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
                {socials.map(({ href, label, Icon }) => (
                  <IconButton key={label} href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" sx={{ border: "1px solid", borderColor: "divider", width: 44, height: 44 }}><Icon size={20} /></IconButton>
                ))}
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: { xs: 280, sm: 360, md: 520 } }}>
              <Suspense fallback={null}><Scene3D /></Suspense>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
