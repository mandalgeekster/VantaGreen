// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTContract is ERC721, Ownable {
    uint public nft_count;
    mapping(uint => NFT) public nfts;
    // mapping(string => bool) _token_uri_exists;

    struct NFT {
        uint id;
        string uri;
        address owner;
        bool is_minted;
    }

    constructor() ERC721("NFTFood", "NFTFOOD") public { }

    function mint(string memory _URI) public onlyOwner {
        // The _mint function already has a mechanism in place to deal with double-minting
        // require(!_token_uri_exists[_URI], "This NFT has already been minted");
        nfts[nft_count] = NFT(nft_count, _URI, msg.sender, true);
        nft_count += 1;
        _mint(msg.sender, nft_count - 1);
        // _token_uri_exists[_URI] = true;
    }

    // function toUint(string memory s) internal returns(uint result) {
    //     bytes memory b = bytes(s);
    //     uint i;
    //     result = 0;
    //     for (i = 0; i < b.length; i++) {
    //         uint c = uint(b[i]);
    //         if (c >= 48 && c <= 57) {
    //             result = result * 10 + (c - 48);
    //         }
    //     }
    // }

    function toString(uint256 value) internal pure returns(string memory) {
        // Inspired by OraclizeAPI's implementation - MIT license
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol
        if (value == 0) {
            return "0";
        }

        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}