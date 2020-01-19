pragma solidity 0.5.12;

// help from here
// https://programtheblockchain.com/posts/2018/01/19/writing-a-crowdfunding-contract-a-la-kickstarter/

contract CryptFunding {
    uint256 campaignCounter;

    struct Campaign {
        uint256 id;
        string title;
        string longDescription;
        address owner;
        uint256 deadline;
        uint256 goal;
        uint256 raised;
        mapping (address => uint256) contributions;
    }

    mapping(uint256 => Campaign) public campaigns;

<<<<<<< HEAD
    // map {address : amount of money pledged}
    mapping(address => uint256) public pledges;

    function CreateCampaign(string _title, string _long_description, address _owner, uint256 _deadline, uint256 _goal, uint256 _raised) public {
        campaignCounter++;

        campaigns[campaginCounter] = Campaign(campaginCounter, _title, _longDescription, _owner, _deadline, _goal, _raised);
    }

    function ReleaseFunds(uint256 id) private {
        
    }

    function ReturnFunds(uint256 id) private {

=======
    function CreateFund(uint256 numHours, uint256 goalAmount, string newTitle, string newDescription) public {
        campaigns[msg.sender] = Campaign({
            title: newTitle,
            long_description: newDescription,
            owner: msg.sender,
            deadline: now + (numHours * 1 hours),
            goal: goalAmount,
            raised: 0
        });
>>>>>>> b008e4fa954b2ae637e10a6b037f583b169ee5bf
    }

    function Pledge(uint256 id, uint256 amount) public payable {
        require(campaigns[id]);

        campaigns[id].raised += amount;

        
    }

    function DeleteCampaign(uint256 id) public {
        require(campaigns[id]);
        
        delete campaigns[id];
    }
}