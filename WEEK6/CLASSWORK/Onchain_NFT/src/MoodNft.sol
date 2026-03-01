//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Base64} from "../lib/openzeppelin-contracts/contracts/utils/Base64.sol";

contract MoodNft is ERC721 {
    uint256 private s_tokenCounter;
    string private s_sadSvgImageUri;
    string private s_happySvgImageUri;

    error MoodNft__NotOwner();

    enum Mood {
        Sad,
        Happy
    }

    mapping(uint256 => Mood) private s_tokenIdToMood;

    constructor(string memory sadSvgImageUri, string memory happySvgImageUri) ERC721("MoodNft", "MNT") {
        s_tokenCounter = 0;
        s_sadSvgImageUri = sadSvgImageUri;
        s_happySvgImageUri = happySvgImageUri;
        mintNFT();
    }

    function mintNFT() public {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
    }

    function flipMood(uint256 tokenId) public {
        //only allow nft owner to flip mood
        if(ownerOf(tokenId) != msg.sender){
            revert MoodNft__NotOwner();
        }
        if(s_tokenIdToMood[tokenId] == Mood.Sad){
            s_tokenIdToMood[tokenId] = Mood.Happy;
        } else {
            s_tokenIdToMood[tokenId] = Mood.Sad;
        }
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory imageURI;
        if (s_tokenIdToMood[tokenId] == Mood.Sad) {
            imageURI = s_sadSvgImageUri;
        } else {
            imageURI = s_happySvgImageUri;
        }
        return string(
            abi.encodePacked(
                _baseURI(),
                bytes(
                    abi.encodePacked(
                        '{"name":"',
                        name(),
                        '", "description":"An NFT that reflects the mood of the owner, 100% on Chain!", ',
                        '"attributes": [{"trait_type": "moodiness", "value": 100}], "image":"',
                        imageURI,
                        '"}'
                    )
                )
            )
        );
    }
}
