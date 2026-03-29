import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Spinner = () => (
  <motion.div 
    animate={{ rotate: 360 }} 
    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    style={{ display: 'inline-block' }}
  >
    <Loader2 size={32} />
  </motion.div>
);