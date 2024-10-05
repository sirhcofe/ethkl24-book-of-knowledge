import { useAuth } from "@/hooks/hooks";
import Card from "../Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faMap,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { useBalances } from "@/hooks/useBalances";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

const CoinInfo = () => {
  const { user } = useAuth();

  const { bokwGeoBalance } = useBalances();

  return (
    <div className="absolute z-20 top-0 left-0 w-screen p-2 sm:p-4 md:p-5 flex justify-end">
      <Card className="py-2 px-2 sm:px-4 md:px-6 flex w-fit space-x-3 sm:space-x-4 md:space-x-5 border-saffron bg-white">
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faMap} />
          <p className="font-poppins">{bokwGeoBalance}</p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faNotesMedical} />
          <p className="font-poppins">0</p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faEthereum} />
          <p className="font-poppins">0</p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faCity} />
          <p className="font-poppins">0</p>
        </div>
        {user && (
          <>
            <div className="w-[1px] h-full bg-mnGreen" />
            <div
              onClick={() => {
                navigator.clipboard.writeText(user.address as string);
              }}
              className="hover:cursor-pointer"
            >
              <p className="text-mnGreen">
                {user.address?.slice(0, 5)}...{user.address?.slice(-3) || ""}
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default CoinInfo;
