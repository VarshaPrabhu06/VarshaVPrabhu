import { Box, Container, Typography } from "@mui/material";
import Reveal from "./Reveal";

export default function Section({ id, title, children }) {
  return (
    <Box id={id} component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Reveal><Typography variant="h2" component="h2" sx={{ mb: { xs: 4, md: 6 } }}>{title}</Typography></Reveal>
        {children}
      </Container>
    </Box>
  );
}
