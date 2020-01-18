pragma solidity 0.5.16;

// help from here
// https://programtheblockchain.com/posts/2018/01/19/writing-a-crowdfunding-contract-a-la-kickstarter/

contract CryptFunding {
    address owner;
    uint256 deadline;
    uint256 goal;

    // map {address : amount of money pledged}
    mapping(address => uint256) public pledges;

    function Fund(uint256 numDays, uint256 goalAmount) public {
        owner = msg.sender;
        deadline = now + (numDays * 1 days);
        goal = goalAmount;
    }

    function Pledge(uint256 amount) public payable {
        require(now < deadline);
        require(msg.value == amount);

        pledges[msg.sender] += amount;
    }
}