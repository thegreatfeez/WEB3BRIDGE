// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./lib/SVGRenderer.sol";

interface ITokenVault {
    function token() external view returns (address);
    function totalDeposited() external view returns (uint256);
}

interface IERC20Metadata {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

contract VaultNFT is ERC721, Ownable {
    error VaultNFT__OnlyFactory();

    using Strings for uint256;

    struct RenderData {
        string tokenName;
        string tokenSymbol;
        string depositedFormatted;
        string tokenAddrHex;
        string vaultAddrHex;
        string createdAt;
    }

    string private svgTemplate;
    address public factory;
    uint256 private _nextTokenId;

    mapping(uint256 => address) public vaultOf;
    mapping(uint256 => uint256) public mintedAt;

    modifier onlyFactory() {
        if (msg.sender != factory) revert VaultNFT__OnlyFactory();
        _;
    }

    constructor(string memory _svgTemplate, address _factory)
        ERC721("VaultNFT", "VNFT")
        Ownable(msg.sender)
    {
        svgTemplate = _svgTemplate;
        factory = _factory;
    }

    function mint(address to, address vault) external onlyFactory returns (uint256 tokenId) {
        tokenId = _nextTokenId++;
        vaultOf[tokenId] = vault;
        mintedAt[tokenId] = block.timestamp;
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return _tokenURIData(tokenId, vaultOf[tokenId]);
    }

    function imageURI(uint256 tokenId) public view returns (string memory) {
        _requireOwned(tokenId);

        address vault = vaultOf[tokenId];
        ITokenVault v = ITokenVault(vault);
        address tokenAddr = v.token();
        IERC20Metadata meta = IERC20Metadata(tokenAddr);
        SVGRenderer.TemplateData memory data = SVGRenderer.TemplateData({
            tokenId: tokenId,
            tokenSymbol: meta.symbol(),
            depositedFormatted: SVGRenderer.formatAmount(v.totalDeposited(), meta.decimals()),
            tokenAddr: SVGRenderer.toHexString(tokenAddr),
            vaultAddr: SVGRenderer.toHexString(vault),
            createdAt: mintedAt[tokenId].toString()
        });

        return SVGRenderer.buildImageDataURIFromTemplate(svgTemplate, data);
    }

    function _tokenURIData(uint256 tokenId, address vault) internal view returns (string memory) {
        ITokenVault v = ITokenVault(vault);
        address tokenAddr = v.token();
        IERC20Metadata meta = IERC20Metadata(tokenAddr);

        RenderData memory d;
        d.tokenName = meta.name();
        d.tokenSymbol = meta.symbol();
        d.depositedFormatted = SVGRenderer.formatAmount(v.totalDeposited(), meta.decimals());
        d.tokenAddrHex = SVGRenderer.toHexString(tokenAddr);
        d.vaultAddrHex = SVGRenderer.toHexString(vault);
        d.createdAt = mintedAt[tokenId].toString();

        SVGRenderer.TemplateData memory imageData = SVGRenderer.TemplateData({
            tokenId: tokenId,
            tokenSymbol: d.tokenSymbol,
            depositedFormatted: d.depositedFormatted,
            tokenAddr: d.tokenAddrHex,
            vaultAddr: d.vaultAddrHex,
            createdAt: d.createdAt
        });
        string memory image = SVGRenderer.buildImageDataURIFromTemplate(svgTemplate, imageData);

        string memory attributes = SVGRenderer.buildAttributes(
            d.tokenName,
            d.tokenSymbol,
            d.tokenAddrHex,
            d.depositedFormatted,
            d.vaultAddrHex,
            d.createdAt
        );

        string memory metadata = SVGRenderer.buildMetadata(tokenId, d.tokenName, d.tokenSymbol, attributes, image);
        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(bytes(metadata))));
    }

}
