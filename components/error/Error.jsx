import { motion as m } from "framer-motion";
import "./style.css";
import { BiSolidErrorCircle } from "react-icons/bi";
export default function Error({ error }) {
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
      className="errorMessage"
    >
      <BiSolidErrorCircle size={22} style={{ marginRight: 3, color: "red" }} />
      {error}
    </m.div>
  );
}
