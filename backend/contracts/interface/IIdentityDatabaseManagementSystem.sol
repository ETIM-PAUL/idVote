// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

interface IIdentityDatabaseManagementSystem {
    function generateKey(
        address _user,
        uint _nationalID
    ) external view returns (bytes12);

    function verifyKey(
        bytes12 _keyHash,
        address _user
    ) external view returns (bool);

    function createUser(
        string memory _name,
        uint256 _dateOfBirth,
        uint256 _nationalID,
        string memory _phrase
    ) external;

    function updateUser(
        string memory _name,
        uint256 _dateOfBirth,
        uint256 _nationalID,
        string memory _phrase
    ) external;
}
