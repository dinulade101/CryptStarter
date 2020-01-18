pragma solidity 0.5.16;

// help from here
// https://programtheblockchain.com/posts/2018/01/19/writing-a-crowdfunding-contract-a-la-kickstarter/

contract CryptFunding {
    struct Campaign {
        string title;
        string long_description;
        address owner;
        uint256 deadline;
        uint256 goal;
        uint256 raised;
        mapping (address => uint256) contributions;
    }

    mapping (address => Campaign) campaigns;

    function CreateFund(uint256 numHours, uint256 goalAmount, string newTitle, string newDescription) public {
        campaigns[msg.sender] = Campaign({
            title: newTitle,
            long_description: newDescription,
            owner: msg.sender,
            deadline: now + (numHours * 1 hours),
            goal: goalAmount,
            raised: 0
        });
    }

    function Pledge(uint256 amount) public payable {
        require(now < deadline);
        require(msg.value == amount);

        pledges[msg.sender] += amount;
    }
}