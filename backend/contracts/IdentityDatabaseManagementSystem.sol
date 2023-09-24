// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

contract IdentityDatabaseManagementSystem {
    event InfoCreated(address user, string name, uint nationalID);

    struct UserInfo {
        string name;
        uint256 dateOfBirth;
        uint256 nationalID;
        string phrase; // OffChain hash of the user's password.
    }

    mapping(address user => UserInfo) public users;

    modifier onlyUser(address _user) {
        require(
            msg.sender == _user,
            "Only the user can update their information"
        );
        _;
    }

    function createUser(
        string memory _name,
        uint256 _dateOfBirth,
        uint256 _nationalID,
        string memory _phrase
    ) external {
        require(users[msg.sender].nationalID == 0, "User already exists");
        users[msg.sender] = UserInfo(_name, _dateOfBirth, _nationalID, _phrase);
        emit InfoCreated(msg.sender, _name, _nationalID);
    }

    function generateKey(
        address _user,
        uint _nationalID
    ) external view returns (bytes12) {
        UserInfo storage user = users[_user];
        require(user.nationalID != 0, "User does not exist");
        require(user.nationalID == _nationalID, "You're not allowed to vote");
        require(
            keccak256(
                abi.encodePacked(msg.sender, user.nationalID, user.phrase)
            ) ==
                keccak256(
                    abi.encodePacked(_user, user.nationalID, user.phrase)
                ),
            "Unauthorized access"
        );
        bytes32 infoHash = keccak256(
            abi.encodePacked(user.name, user.dateOfBirth, user.nationalID)
        );
        bytes12 key = bytes12(infoHash);
        return key;
    }

    function verifyKey(
        bytes12 _keyHash,
        address _user
    ) external view returns (bool) {
        uint32 code;
        assembly {
            code := extcodesize(_user)
        }
        require(code > 0, "Function can only be called by Contract");

        UserInfo storage user = users[_user];

        bytes32 infoHash = keccak256(
            abi.encodePacked(user.name, user.dateOfBirth, user.nationalID)
        );
        bytes12 key = bytes12(infoHash);

        return key == _keyHash;
    }

    function updateUser(
        string memory _name,
        uint256 _dateOfBirth,
        uint256 _nationalID,
        string memory _phrase
    ) external onlyUser(msg.sender) {
        UserInfo storage user = users[msg.sender];

        require(
            keccak256(abi.encodePacked(_phrase)) ==
                keccak256(abi.encodePacked(user.phrase)),
            "Invalid phrase"
        );
        user.name = _name;
        user.dateOfBirth = _dateOfBirth;
        user.nationalID = _nationalID;

        emit InfoCreated(msg.sender, _name, _nationalID);
    }
}
