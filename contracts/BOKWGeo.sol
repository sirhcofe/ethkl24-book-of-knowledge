// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AIOracleCallbackReceiver.sol";
import "./IAIOracle.sol";

contract BOKWGeo is ERC20, Ownable, AIOracleCallbackReceiver {
    uint256 public gameIndex;
    string public subject = "Geography";
    // Game ID => Player's address
    mapping (uint256 => address) gameToAddress;
    // requestId => AIOracleRequest
    mapping(uint256 => AIOracleRequest) public requests;
    // modelId => callback gasLimit
    mapping(uint256 => uint64) public callbackGasLimit;

    event PlayGame(address indexed player, uint256 gameIndex, string subject);
    event FinishGame(address indexed player, uint256 gameIndex, uint256 reward);
    event promptsUpdated(uint256 requestId, string output, bytes callbackData);
    event promptRequest(uint256 requestId, address sender, uint256 modelId, string prompt);

    struct AIOracleRequest {
        address sender;
        uint256 modelId;
        bytes input;
        bytes output;
    }

    modifier IsPlayersGame(uint256 gameIdx) {
        require(msg.sender == gameToAddress[gameIdx], "Game Id and Player did not match");
        _;
    }

    constructor(address initialOwner, IAIOracle aiOracle)
        ERC20("BOKW-Geography", "BOKWGEO")
        Ownable(initialOwner)
        AIOracleCallbackReceiver(aiOracle)
    {
        gameIndex = 0;
        callbackGasLimit[50] = 200_000; // SD 500k
        callbackGasLimit[11] = 1_500_000; // llama
        callbackGasLimit[9] = 1_500_000; // grok
    }
    
    function playGame() external {
        uint256 requiredTokens = 50 * 10 ** decimals();
        require(balanceOf(msg.sender) >= requiredTokens, "Not Enough Tokens");
        approve(msg.sender, requiredTokens);
        require(allowance(msg.sender, msg.sender) >= requiredTokens, "Allowance not set or insufficient");
        require(transferFrom(msg.sender, address(this), requiredTokens), "Tokens transfered failed");

        gameToAddress[gameIndex] = msg.sender;
        gameIndex++;

        emit PlayGame(msg.sender, gameIndex, subject);
    }

    function finishGame(address player, uint256 gameIdx, uint256 reward) external onlyOwner {
        require(gameToAddress[gameIdx] == player, "Player not match");
        emit FinishGame(player, gameIndex, reward);
        _mint(player, reward);
    }

    function generateQuestion(uint256 gameIdx, string calldata prompt) external payable IsPlayersGame(gameIdx) {
        bytes memory input = bytes(prompt);
        // we do not need to set the callbackData in this example
        uint256 requestId = aiOracle.requestCallback{value: msg.value}(
            11, input, address(this), callbackGasLimit[11], ""
        );
        emit promptRequest(requestId, msg.sender, 11, prompt);
    }

    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    function setCallbackGasLimit(uint256 modelId, uint64 gasLimit) external onlyOwner {
        callbackGasLimit[modelId] = gasLimit;
    }

    // the callback function, only the AI Oracle can call this function
    function aiOracleCallback(uint256 requestId, bytes calldata output, bytes calldata callbackData) external override onlyAIOracleCallback() {
        emit promptsUpdated(requestId, string(output), callbackData);
    }

    function estimateFee(uint256 modelId) public view returns (uint256) {
        return aiOracle.estimateFee(modelId, callbackGasLimit[modelId]);
    }
}
