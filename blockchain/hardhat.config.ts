import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const Private_Key =
  "52821523f21a5b20d9ea7e0607d696fa425866fdccd1fc03b86d2da6e85f7363";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/sDJZAU5yfGAyK8D3OJcCkWP2BUUi-nig`,
      accounts: [`0x${Private_Key}`],
    },
  },
};

export default config;