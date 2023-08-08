import "./loading.scss";
import LoadingSpinner from "@/public/loading_spinner.gif";
import Image from "next/image";
export default function Loading() {
  return (
    <div className="loading ">
      <Image
        className="self-center"
        src={LoadingSpinner}
        alt="loading"
        height={200}
        width={200}
      />
    </div>
  );
}
