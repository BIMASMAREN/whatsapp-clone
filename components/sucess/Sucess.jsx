import "./style.css";
import { motion as m } from "framer-motion";
import { BsCheckCircleFill } from "react-icons/bs";
export default function Sucess({ sucess }) {
  const dropVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
    transition: { duration: 0.5 }, // Add a duration of 0.5 seconds
  };
  return (
    <m.div
      variants={dropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="sucess_message"
    >
      <BsCheckCircleFill size={21} style={{ margin: 4, color: "#19C37D" }} />
      {sucess}
    </m.div>
  );
}
