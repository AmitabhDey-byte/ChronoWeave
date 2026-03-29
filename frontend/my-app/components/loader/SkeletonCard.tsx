import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard = () => (
  <motion.div 
    initial={{ opacity: 0.5 }}
    animate={{ opacity: [0.5, 0.8, 0.5] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
    className="card-2d" 
    style={{ 
      height: '120px', 
      backgroundColor: '#f0f0f0', 
      borderStyle: 'dashed', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '10px',
      marginBottom: '15px' 
    }}
  >
    <div style={{ width: '60%', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
    <div style={{ width: '90%', height: '15px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
    <div style={{ width: '40%', height: '15px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
  </motion.div>
);