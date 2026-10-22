import { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItemButton, ListItemText, Container } from "@mui/material";
import { Menu, X } from "lucide-react";
import { profile } from "../data/portfolioData";

const links = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((l) => { const el = document.getElementById(l.toLowerCase()); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: "blur(14px)", background: "rgba(22,21,26,.72)", borderBottom: "1px solid", borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Box component="a" href="#home" aria-label="Home" sx={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 22, color: "text.primary", textDecoration: "none", flexGrow: 1 }}>{profile.monogram}</Box>
          <Box component="nav" aria-label="Primary" sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            {links.map((l) => (
              <Button key={l} href={`#${l.toLowerCase()}`} color="inherit" aria-current={active === l.toLowerCase() ? "true" : undefined}
                sx={{ color: active === l.toLowerCase() ? "primary.main" : "text.secondary", position: "relative", px: 1.5,
                  "&::after": { content: '""', position: "absolute", left: 14, right: 14, bottom: 4, height: 2, borderRadius: 2, background: "currentColor", transform: active === l.toLowerCase() ? "scaleX(1)" : "scaleX(0)", transition: "transform .25s" } }}>
                {l}
              </Button>
            ))}
          </Box>
          <Button variant="contained" href="#contact" sx={{ display: { xs: "none", md: "inline-flex" } }}>Let's Talk</Button>
          <IconButton aria-label="Open menu" onClick={() => setOpen(true)} sx={{ display: { md: "none" } }}><Menu /></IconButton>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 260, p: 2, background: "#16151a" } }}>
        <IconButton aria-label="Close menu" onClick={() => setOpen(false)} sx={{ alignSelf: "flex-end" }}><X /></IconButton>
        <List>
          {links.map((l) => (
            <ListItemButton key={l} component="a" href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} sx={{ minHeight: 48, borderRadius: 2 }}><ListItemText primary={l} /></ListItemButton>
          ))}
        </List>
        <Button variant="contained" href="#contact" onClick={() => setOpen(false)}>Let's Talk</Button>
      </Drawer>
    </AppBar>
  );
}
