import { useAuth } from "@/hooks/hooks";
import Card from "../Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";

const CoinInfo = () => {
  const { user } = useAuth();

  return (
    <div className="absolute z-20 top-0 left-0 w-screen p-2 sm:p-4 md:p-5 flex justify-end">
      <Card className="py-2 px-2 sm:px-4 md:px-6 flex w-fit space-x-2 sm:space-x-3 md:space-x-4 border-saffron bg-white">
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faMap} />
          <p className="font-poppins">0</p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faMap} />
          <p className="font-poppins">0</p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faMap} />
          <p className="font-poppins">0</p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faMap} />
          <p className="font-poppins">0</p>
        </div>
      </Card>
    </div>
  );
};

export default CoinInfo;
