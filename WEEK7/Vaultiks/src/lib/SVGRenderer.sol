// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

library SVGRenderer {
    using Strings for uint256;

    struct TemplateData {
        uint256 tokenId;
        string tokenSymbol;
        string depositedFormatted;
        string tokenAddr;
        string vaultAddr;
        string createdAt;
    }

    function replaceAll(
        string memory subject,
        string memory search,
        string memory replacement
    ) internal pure returns (string memory) {
        bytes memory s = bytes(subject);
        bytes memory f = bytes(search);
        bytes memory r = bytes(replacement);

        if (f.length == 0 || s.length < f.length) {
            return subject;
        }

        uint256 matches = 0;
        for (uint256 i = 0; i <= s.length - f.length;) {
            bool matchFound = true;
            for (uint256 j = 0; j < f.length; j++) {
                if (s[i + j] != f[j]) {
                    matchFound = false;
                    break;
                }
            }
            if (matchFound) {
                matches++;
                i += f.length;
            } else {
                i++;
            }
        }

        if (matches == 0) {
            return subject;
        }

        uint256 outLen;
        if (r.length >= f.length) {
            outLen = s.length + matches * (r.length - f.length);
        } else {
            outLen = s.length - matches * (f.length - r.length);
        }

        bytes memory out = new bytes(outLen);
        uint256 k;
        for (uint256 i = 0; i < s.length;) {
            bool matchFound = i + f.length <= s.length;
            if (matchFound) {
                for (uint256 j = 0; j < f.length; j++) {
                    if (s[i + j] != f[j]) {
                        matchFound = false;
                        break;
                    }
                }
            }

            if (matchFound) {
                for (uint256 j = 0; j < r.length; j++) {
                    out[k++] = r[j];
                }
                i += f.length;
            } else {
                out[k++] = s[i];
                i++;
            }
        }

        return string(out);
    }

    function formatAmount(uint256 amount, uint8 decimals) internal pure returns (string memory) {
        uint256 factor = 10 ** decimals;
        uint256 whole = amount / factor;
        uint256 remainder = (amount % factor) / (10 ** (decimals > 2 ? decimals - 2 : 0));
        return string(abi.encodePacked(whole.toString(), ".", remainder < 10 ? "0" : "", remainder.toString()));
    }

    function toHexString(address addr) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes20 value = bytes20(addr);
        bytes memory str = new bytes(42);
        str[0] = "0";
        str[1] = "x";
        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i] & 0x0f)];
        }
        return string(str);
    }

    function renderTemplate(string memory svgTemplate, TemplateData memory d) internal pure returns (string memory) {
        string memory svg = svgTemplate;
        svg = replaceAll(svg, "{{VAULT_ID}}", d.tokenId.toString());
        svg = replaceAll(svg, "{{TOKEN_SYMBOL}}", d.tokenSymbol);
        svg = replaceAll(svg, "{{DEPOSITED}}", d.depositedFormatted);
        svg = replaceAll(svg, "{{TOKEN_ADDR}}", d.tokenAddr);
        svg = replaceAll(svg, "{{VAULT_ADDR}}", d.vaultAddr);
        svg = replaceAll(svg, "{{CREATED_AT}}", d.createdAt);
        return svg;
    }

    function buildImageDataURI(string memory renderedSvg) internal pure returns (string memory) {
        return string(abi.encodePacked("data:image/svg+xml;base64,", Base64.encode(bytes(renderedSvg))));
    }

    function buildImageDataURIFromTemplate(string memory svgTemplate, TemplateData memory d)
        internal
        pure
        returns (string memory)
    {
        return buildImageDataURI(renderTemplate(svgTemplate, d));
    }

    function buildAttributes(
        string memory tokenName,
        string memory tokenSymbol,
        string memory tokenAddrHex,
        string memory depositedFormatted,
        string memory vaultHex,
        string memory createdAt
    ) internal pure returns (string memory) {
        return string(
            abi.encodePacked(
                '{"trait_type":"Token","value":"',
                tokenName,
                '"},',
                '{"trait_type":"Symbol","value":"',
                tokenSymbol,
                '"},',
                '{"trait_type":"Token Address","value":"',
                tokenAddrHex,
                '"},',
                '{"trait_type":"Total Deposited","value":"',
                depositedFormatted,
                '"},',
                '{"trait_type":"Vault Address","value":"',
                vaultHex,
                '"},',
                '{"trait_type":"Created At","value":"',
                createdAt,
                '"}'
            )
        );
    }

    function buildMetadata(
        uint256 tokenId,
        string memory tokenName,
        string memory tokenSymbol,
        string memory attributes,
        string memory image
    ) internal pure returns (string memory) {
        return string(
            abi.encodePacked(
                '{"name":"Vault #',
                tokenId.toString(),
                ' - ',
                tokenSymbol,
                '",',
                '"description":"Onchain vault for ',
                tokenName,
                '",',
                '"image":"',
                image,
                '",',
                '"attributes":[',
                attributes,
                "]}"
            )
        );
    }
}
