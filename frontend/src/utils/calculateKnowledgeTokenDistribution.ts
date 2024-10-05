export const calculateKnowledgeTokenDistribution = (
  totalAvailableTimeSeconds: number,
  remainingSeconds: number,
  spentTokens: number
): number => {
  const multiplier = 2;

  const tokensToIssue =
    spentTokens * ((remainingSeconds / totalAvailableTimeSeconds) * multiplier);
  console.log(tokensToIssue);
  return Math.round(tokensToIssue);
};

// console.log(calculateKnowledgeTokenDistribution(36, 18, 50));
