// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract W3ArabsNFT is ERC721Enumerable, Ownable {
    // parameters إلى سلاسل عند تمريرها كمعلمات uint256 يشير إلى أنه سيتم تحويل قيم
    using Strings for uint256;

    // لكل رمز مميز URI يتم استخدام هذا المتغير لتخزين
    string _tokenURI;

    // 0.01 يقوم بتخصيص قيمة للرمز المميز وهي
    uint256 public _price = 0.01 ether;

    // إجمالي عدد الرموز المميزة التي تم قبضها
    uint256 public tokenIds;

    /**
    * لتحديد اسم ورمز لمشروعنا ERC721 يُستخدم
    * _tokenURI الخاص بمشروعنا في المتغير baseURI يتم تمرير
    */
    constructor (string memory baseURI) ERC721("W3ArabsNFT", "W3AN") {
        _tokenURI = baseURI;
    }

    // NFT تسمح هذه الدالة للمستخدم بقبض 1
    function mint() public payable {
        // يجب ان يمتلك المستخدم ايثير بقيمة اكثر من او يساوي 0.01
        require(msg.value >= _price, "You have not a ether");
        // NFT في كل مرة يقوم المستخدم بسك tokenIds يقوم بزيادة
        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI)) : "";
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) =  _owner.call{value: amount}("");
        require(sent, "Error to send Ether");
    }

    receive() external payable {}

    fallback() external payable {}
}
