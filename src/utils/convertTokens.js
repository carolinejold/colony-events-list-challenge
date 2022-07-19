export const convertTokens = (tokenAddress) => {
  if (tokenAddress === "0x6B175474E89094C44Da98b954EedeAC495271d0F") {
    return "DAI";
      } else if (tokenAddress === "0x0dd7b8f3d1fa88FAbAa8a04A0c7B52FC35D4312c") {
        return "BLNY";
  } else {
    return console.error(
      `No token symbol listed for token address "${tokenAddress}"`
    );
  }
};
