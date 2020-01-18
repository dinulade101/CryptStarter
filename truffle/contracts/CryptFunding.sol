pragma solidity 0.5.16;

// help from here
// https://programtheblockchain.com/posts/2018/01/19/writing-a-crowdfunding-contract-a-la-kickstarter/

contract CryptFunding {
    struct Campaign {
        address owner;
        uint256 deadline;
        uint256 goal;
    }

    mapping (address => Campaign) campaigns;

    function Fund(uint256 numDays, uint256 goalAmount) public {
        owner = msg.sender;
        deadline = now + (numDays * 1 days);
        goal = goalAmount;
    }
}