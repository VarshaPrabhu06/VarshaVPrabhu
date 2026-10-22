import { useState } from "react";
import { Alert, Box, Button, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import { Github, Linkedin, Mail } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { profile } from "../data/portfolioData";

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Enter your name.";
    if (!emailOk(form.email)) err.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) err.message = "Write at least 10 characters.";
    setErrors(err);
    if (Object.keys(err).length) { setStatus(null); return; }

    if (!ENDPOINT) {
      const url = `mailto:${profile.email}?subject=${encodeURIComponent(`Message from ${form.name}`)}&body=${encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`)}`;
      window.location.href = url;
      setStatus({ type: "info", text: "The form isn't connected to an email service yet, so your email app should open with the message. If it doesn't, write to " + profile.email + "." });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus({ type: "success", text: "Message sent. Thank you!" });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({ type: "error", text: "The message couldn't be sent. Check your connection and try again, or email " + profile.email + "." });
    } finally { setBusy(false); }
  };

  return (
    <Section id="contact" title="Let's talk">
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <Reveal>
            <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 420 }}>I'm open to internship opportunities. Send a message and I'll reply as soon as I can.</Typography>
            <Stack spacing={1.5}>
              <Link href={`mailto:${profile.email}`} color="inherit" underline="hover" sx={{ display: "flex", gap: 1.5, alignItems: "center", wordBreak: "break-all" }}><Mail size={18} /> {profile.email}</Link>
              {profile.linkedin && <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer" color="inherit" underline="hover" sx={{ display: "flex", gap: 1.5, alignItems: "center" }}><Linkedin size={18} /> LinkedIn</Link>}
              {profile.github && <Link href={profile.github} target="_blank" rel="noopener noreferrer" color="inherit" underline="hover" sx={{ display: "flex", gap: 1.5, alignItems: "center" }}><Github size={18} /> GitHub</Link>}
            </Stack>
          </Reveal>
        </Grid>
        <Grid item xs={12} md={7}>
          <Reveal delay={0.1}>
            <Box component="form" noValidate onSubmit={submit} aria-label="Contact form" sx={{ display: "grid", gap: 2 }}>
              <TextField label="Name" value={form.name} onChange={set("name")} error={!!errors.name} helperText={errors.name} autoComplete="name" required />
              <TextField label="Email" type="email" value={form.email} onChange={set("email")} error={!!errors.email} helperText={errors.email} autoComplete="email" required />
              <TextField label="Message" value={form.message} onChange={set("message")} error={!!errors.message} helperText={errors.message} multiline minRows={4} required />
              <Box><Button type="submit" variant="contained" size="large" disabled={busy}>{busy ? "Sending..." : "Send message"}</Button></Box>
              {status && <Alert severity={status.type} role="status">{status.text}</Alert>}
            </Box>
          </Reveal>
        </Grid>
      </Grid>
    </Section>
  );
}
