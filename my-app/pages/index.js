import { useState, useEffect } from "react"
import { ethers } from "ethers"
import abi from "../../contract-tutorial/artifacts/contracts/W3ArabsNFT.sol/W3ArabsNFT.json"

export default function Home() {
  // Contract Address & ABI
  const contractAddress = "0x72D0850fd8F1c0e271280A2EFDAde74e1cAA0CCE"
  const contractABI = abi.abi

  // ستقوم بتخزين عنوان المحفظة التي ستتصل بالتطبيق من اجل مراقبة ما اذا كانت المحفظة متصلة بالتطبيق او نتمكن من استدعاء عنوان المحفظة المتصلة
  const [currentAccount, setCurrentAccount] = useState("")
  // المقبوضة NFTs تخزين اجمالي عدد
  const [tokenIds, setTokenIds] = useState("0")
  // مالك العقد الذكي address تخزين
  const [owner, setOwner] = useState("")
  // التي يمتلكها الموقع NFTs تخزين اجمالي عدد
  const [balance, setBalance] = useState("0")

  // تعمل هذه الوظيفة على مراقبة اتصال المحفظة بالتطبيق بشكل مستمر
  const isConnectWallet = async () => {
    try {
      // يتم استخدام هذا للوصول إلى كائن اثيريوم والتي من تعد من الكائنات العامة
      const { ethereum } = window

      // يقوم هذا بإرجاع مجموعة من عناوين شبكة اثيريوم المرتبطة بحساب المستخدم ويمكن استخدام هذا للوصول إلى حسابات المستخدم اثيريوم والتفاعل مع شبكة اثيريوم
      const accounts = await ethereum.request({method: "eth_requestAccounts"})
      console.log("accounts: ", accounts)
      setCurrentAccount(accounts[0])

      /**
        يتحقق هذا الرمز من وجود أي حسابات متاحة في المحفظة الخاصة باللمستخدم.
        إذا كان هناك، فإنه يقوم بتعيين الحساب الأول إلى متغير يسمى ويطبع رسالة في وحدة التحكم.
        إذا لم تكن هناك حسابات متاح، فإنها تطبع رسالة في وحدة التحكم.
      */
      if (accounts.length > 0) {
        const account = accounts[0]
        console.log("wallet is connected! ", account)
      } else {
        console.log("make sure MetaMask is connected")
      }
    } catch (error) {
      console.error(error)
    }
  }

  // تعمل هذه الوظيفة على اتصال المحفظة بالتطبيق
  const connectWallet = async () => {
    try {
      // يتم استخدام هذا للوصول إلى كائن اثيريوم والتي من تعد من الكائنات العامة
      const { ethereum } = window

      // يتحقق هذا لمعرفة ما إذا كان موفر شبكة اثيريوم متوفراً. إذا لم يكن متوفراً, فسيخرج رسالة
      if (!ethereum) {
        console.log("please install MetaMask")
      }

      // يقوم هذا بإرجاع مجموعة من عناوين شبكة اثيريوم المرتبطة بحساب المستخدم ويمكن استخدام هذا للوصول إلى حسابات المستخدم اثيريوم والتفاعل مع شبكة اثيريوم
      const accounts = await ethereum.request({method: "eth_requestAccounts"})
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.error(error)
    }
  }

  // للمستخدم NFT يقوم بسك 1
  const mint = async () => {
    try {
      // يتم استخدام هذا للوصول إلى كائن اثيريوم والتي من تعد من الكائنات العامة
      const {ethereum} = window

      if (ethereum) {
        // يستخدم هذا للتفاعل مع البلوكتشين
        const provider = new ethers.providers.Web3Provider(ethereum, "any")
        // كائن مُوقع يتم استخدامه لمصادقة وتفويض المعاملات على البلوكتشين
        const signer = provider.getSigner()
        // يعمل هذا على اخذ مثيل للعقد بحيث نتمكن من التفاعل مع البلوكتشين
        const w3arabs = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        // NFT من العقد الذكي وإعطاء قيمة mint استدعاء الدالة
        const w3arabsTxn = await w3arabs.mint({
          value: ethers.utils.parseEther("0.01"),
        })
        await w3arabsTxn.wait()

        window.alert("You successfully minted a W3ArabsProject!")
      } else {
        console.log("Metamask is not connected");
      }
    } catch (error) {
      console.error(error)
    }
  }

  // المقبوضة وناشر الرمز المميز NFTs جلب اجمالي
  const getTokenIdsAndOwner = async () => {
    try {
      // يتم استخدام هذا للوصول إلى كائن اثيريوم والتي من تعد من الكائنات العامة
      const {ethereum} = window

      if (ethereum) {
        // يستخدم هذا للتفاعل مع البلوكتشين
        const provider = new ethers.providers.Web3Provider(ethereum, "any")
        // يعمل هذا على اخذ مثيل للعقد بحيث نتمكن من التفاعل مع البلوكتشين
        const w3arabs = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        )

        const w3arabsIds = await w3arabs.tokenIds()
        setTokenIds(w3arabsIds.toString())

        const w3arabsOwner = await w3arabs.owner()
        setOwner(w3arabsOwner.toLowerCase())
      } else {
        console.log("Metamask is not connected");
      }
    } catch (error) {
      console.error(error)
    }
  }

  // التي يمتلكها المستخدم المتصل بالموقعNFTs جلب
  const getBalance = async () => {
    try {
      // يتم استخدام هذا للوصول إلى كائن اثيريوم والتي من تعد من الكائنات العامة
      const {ethereum} = window

      if (ethereum) {
        // يستخدم هذا للتفاعل مع البلوكتشين
        const provider = new ethers.providers.Web3Provider(ethereum, "any")
        // يعمل هذا على اخذ مثيل للعقد بحيث نتمكن من التفاعل مع البلوكتشين
        const w3arabs = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        )

        const accounts = await ethereum.request({method: "eth_requestAccounts"})
        const w3arabsBalance = await w3arabs.balanceOf(accounts[0])
        setBalance(w3arabsBalance.toString())
      } else {
        console.log("Metamask is not connected");
      }
    } catch (error) {
      console.error(error)
    }
  }

  // سحب الاموال المتواجدة في العقد الذكي
  const withdraw = async () => {
    try {
      // يتم استخدام هذا للوصول إلى كائن اثيريوم والتي من تعد من الكائنات العامة
      const {ethereum} = window

      if (ethereum) {
        // يستخدم هذا للتفاعل مع البلوكتشين
        const provider = new ethers.providers.Web3Provider(ethereum, "any")
        // كائن مُوقع يتم استخدامه لمصادقة وتفويض المعاملات على البلوكتشين
        const signer = provider.getSigner()
        // يعمل هذا على اخذ مثيل للعقد بحيث نتمكن من التفاعل مع البلوكتشين
        const w3arabs = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        const w3arabsTxn = await w3arabs.withdraw()
        await w3arabsTxn.wait()

        window.alert("You successfully withdraw a W3ArabsProject!")
      } else {
        console.log("Metamask is not connected");
      }
    } catch (error) {
      console.error(error)
    }
  }

  // تمثل المصفوفة في نهاية استدعاء الوظيفة ما هي تغييرات الحالة التي ستؤدي إلى هذا التغيير
  // في هذه الحالة كلما تغيرت قيم الوظيفتين سيتم استدعاء هذا التغيير مباشرة
  useEffect(() => {
    isConnectWallet()
    getTokenIdsAndOwner()
    getBalance()

    // قم بتعيين فاصل زمني للحصول على عدد معرّفات الرمز المميز التي يتم سكها كل 5 ثوانٍ
    setInterval(async function () {
      await getTokenIdsAndOwner()
      await getBalance()
    }, 5 * 1000)
  }, [])

  return (
    <div dir="rtl">
      <p className='text-center italic text-3xl text-rose-700 font-bold mt-10'>W3Arabs Project</p>
      {
        currentAccount ? (
          <div>
            <p className='text-center text-xl text-rose-700 font-bold mt-10'>مجموع NFTs المقبوضة: {tokenIds}</p>
            <p className='text-center text-xl text-rose-700 font-bold mt-10'>مجموع NFTs الخاصة بك: {balance}</p>
            <div className="flex justify-center">
              <button onClick={mint} className="px-4 mr-8 mt-5 py-2 text-white bg-rose-600 rounded-lg duration-150 hover:bg-rose-700 active:shadow-lg">احصل على واحدة</button>
            </div>

            {owner==currentAccount && (
              <div className="flex justify-center">
                <button onClick={withdraw} className="px-4 mr-8 mt-5 py-2 text-white bg-rose-600 rounded-lg duration-150 hover:bg-rose-700 active:shadow-lg">سحب قيمة NFTs</button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <button onClick={connectWallet} className="px-4 mr-8 mt-5 py-2 text-white bg-rose-600 rounded-lg duration-150 hover:bg-rose-700 active:shadow-lg">اتصل بالمحفظة</button>
          </div>
        )
      }
    </div>
  )
}
