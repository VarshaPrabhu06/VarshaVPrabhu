import { Box, Container, IconButton, Typography } from "@mui/material";
import { ArrowUp, Github, Linkedin } from "lucide-react";
import { profile } from "../data/portfolioData";

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: "1px solid", borderColor: "divider", py: 4 }}>
      <Container maxWidth="lg" sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="body2" color="text.secondary">&copy; {new Date().getFullYear()} {profile.name}</Typography>
          <Typography variant="body2" color="text.secondary">Designed and built with React</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {profile.github && <IconButton href={profile.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer"><Github size={20} /></IconButton>}
          {profile.linkedin && <IconButton href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></IconButton>}
          <IconButton aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} sx={{ border: "1px solid", borderColor: "divider" }}><ArrowUp size={20} /></IconButton>
        </Box>
      </Container>
    </Box>
  );
}
