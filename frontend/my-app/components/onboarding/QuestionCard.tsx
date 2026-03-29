import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { Card } from "../ui/card";


export const QuestionCard = ({
  question,
  description,
  children,
}: {
  question: string;
  description: string;
  children: ReactNode;
}) => (
  <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
    <Card className="question-card">
      <p className="eyebrow">{description}</p>
      <h2 className="question-card__title">{question}</h2>
      {children}
    </Card>
  </motion.div>
);
