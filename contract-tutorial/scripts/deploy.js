const hre = require("hardhat");

async function main() {
  /**
    لنشر عقود ذكية جديدة getContractFactory يستخدم
  */
  const w3arabsContract = await hre.ethers.getContractFactory("W3ArabsProject");

  // Filebase البيانات الوصفية التي قمنا برفعها على URI هنا نقوم برفع العقد وندخل
  const w3arabs = await w3arabsContract.deploy("https://ipfs.filebase.io/ipfs/add_your_ipfs_cid");

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