pragma solidity 0.5.12;

// help from here
// https://programtheblockchain.com/posts/2018/01/19/writing-a-crowdfunding-contract-a-la-kickstarter/
// https://medium.com/openberry/creating-a-simple-crowdfunding-dapp-with-ethereum-solidity-and-vue-js-69ddb8e132dd

contract CryptFunding {
    Campaign[] private campaigns;

    // map {address : amount of money pledged}
    mapping(address => uint256) public pledges;

    // external functions use less gas because external functions can be read directly from call data
    function createCampaign(uint256 numHours, uint256 goalAmount, string calldata newTitle, string calldata newDescription) external {    
        Campaign newCampaign = new Campaign(
            msg.sender,
            newTitle,
            newDescription,
            now + (numHours * 1 hours),
            goalAmount
        );

        campaigns.push(newCampaign);
    }

    function getCampagins() external view returns (Campaign[] memory) {
        return campaigns;
    }

    // function DeleteCampaign(uint256 id) public {
    //     require(campaigns[id]);
        
    //     delete campaigns[id];
    // }
}

contract Campaign {
    enum State {
        Fundraising,
        Expired,
        Successful
    }

    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    address payable public owner;
    address id;
    string title;
    string description;
    uint256 deadline;
    uint256 goal;
    uint256 raised;
    State state;

    mapping (address => uint256) contributions;

    constructor(
        address payable _owner,
        string memory _title,
        string memory _description,
        uint256 _deadline,
        uint256 _goal
    ) public {
        id = address(this);
        owner = _owner;
        title = _title;
        description = _description;
        deadline = _deadline;
        goal = _goal;
        raised = 0;
        state = State.Fundraising;
    }

    function contribute() external inState(State.Fundraising) payable {
        require(msg.sender != owner);
        contributions[msg.sender] = contributions[msg.sender] + msg.value;
        raised = raised + msg.value;
        checkIfCampaignComplete();
    }

    function checkIfCampaignComplete() public {
        if (raised >= goal) { 
            state = State.Successful;
            releaseFunds();
        } else if (now > deadline) {
            state = State.Expired;
        }
    }

    function releaseFunds() internal inState(State.Successful) returns (bool) {
        if (owner.send(raised)) {
            state = State.Successful;
            // emit creator paid
            return true;
        } 
        // if code reaches here, money not sent to creator
        return false;
    }

    function returnFunds() public inState(State.Expired) returns (bool) {
        require(contributions[msg.sender] > 0);

        uint256 refundAmount = contributions[msg.sender];
        contributions[msg.sender] = 0;

        if (msg.sender.send(refundAmount)) {
            raised = raised - refundAmount;
            return true;
        }

        return false;
    }

    function getDetails() public view returns(
        address _id,
        address payable _owner,
        string memory _title,
        string memory _description,
        uint256 _deadline,
        State _state,
        uint256 _raised,
        uint256 _goal
    ) {
        _id = id;
        _owner = owner;
        _title = title;
        _description = description;
        _deadline = deadline;
        _state = state;
        _raised = raised;
        _goal = goal;
    }
}