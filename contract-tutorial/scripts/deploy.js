const hre = require("hardhat");

async function main() {
  /**
    لنشر عقود ذكية جديدة getContractFactory يستخدم
  */
  const w3arabsContract = await hre.ethers.getContractFactory("W3ArabsNFT");

  // Pinata التي قمنا برفعها على metadata البيانات الوصفية CID هنا نقوم برفع العقد وندخل
  const w3arabs = await w3arabsContract.deploy(
    "https://copper-colonial-lamprey-141.mypinata.cloud/ipfs/QmXMopr62DB3AHrT2McJnjd6GwNB1ufqv1N"
  );

  // انتظر حتى تنتهي عملية الرفع
  await w3arabs.deployed();

  // طباعة عنوان العقد المنشور
  console.log("W3ArabsProject deployed to:", w3arabs.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
