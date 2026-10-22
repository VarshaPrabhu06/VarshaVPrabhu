import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({ children, delay = 0, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) return <div {...rest}>{children}</div>;
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: "easeOut" }} {...rest}>
      {children}
    </motion.div>
  );
}
