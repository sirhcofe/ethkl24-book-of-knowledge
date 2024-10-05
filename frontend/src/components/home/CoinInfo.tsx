import { useAuth } from "@/hooks/hooks";
import Card from "../Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { useBalances } from "@/hooks/useBalances";

const CoinInfo = () => {
  const { user } = useAuth();

  const { bokwEthBalance, bokwCpBalance, bokwEpiBalance } = useBalances();

  return (
    <div className="absolute z-20 top-0 left-0 w-screen p-2 sm:p-4 md:p-5 flex justify-end">
      <Card className="py-2 px-2 sm:px-4 md:px-6 flex w-fit space-x-2 sm:space-x-3 md:space-x-4 border-saffron bg-white">
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faMap} />
          <p className="font-poppins">{bokwEthBalance}</p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faMap} />
          <p className="font-poppins">{bokwCpBalance}</p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faMap} />
          <p className="font-poppins">{bokwEpiBalance}</p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faMap} />
          <p className="font-poppins">0</p>
        </div>
        {user && (
          <div
            onClick={() => {
              navigator.clipboard.writeText(user.address as string);
            }}
            className="hover:cursor-pointer"
          >
            <p className="text-mnGreen">
              {user.address?.slice(0, 7)}...{user.address?.slice(-5) || ""}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CoinInfo;
